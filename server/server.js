import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import { productService, orderService } from './services/firebase.js';

dotenv.config();

const app = express();
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  options: { timeout: 5000 }
});
const preference = new Preference(client);
console.log('Token Mercado Pago:', process.env.MERCADO_PAGO_ACCESS_TOKEN);
// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting rigoroso
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: 'Muitas tentativas. Tente novamente em 15 minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // máximo 3 tentativas de pagamento por minuto
  message: {
    error: 'Muitas tentativas de pagamento. Aguarde 1 minuto.',
    code: 'PAYMENT_RATE_LIMIT'
  }
});

app.use(generalLimiter);

// Middleware para parsing JSON (exceto para webhook)
app.use(express.json({
  limit: '1mb',
  strict: true
}));

// Middleware para log de segurança
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${ip}`);
  next();
});

// Validações rigorosas
const validatePaymentIntent = [
  body('items')
    .isArray({ min: 1, max: 20 })
    .withMessage('Items deve ser um array com 1-20 produtos'),

  body('items.*.productId')
    .isString()
    .isLength({ min: 1, max: 50 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('ID do produto inválido'),

  body('items.*.quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantidade deve ser entre 1 e 10'),

  body('customerInfo.email')
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email inválido'),

  body('customerInfo.name')
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),

  body('customerInfo.phone')
    .isString()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)
    .withMessage('Telefone deve estar no formato (11) 99999-9999'),

  body('customerInfo.address')
    .isString()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Endereço deve ter entre 10 e 200 caracteres'),

  body('customerInfo.city')
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Cidade deve conter apenas letras'),

  body('customerInfo.zipCode')
    .isString()
    .matches(/^\d{5}-?\d{3}$/)
    .withMessage('CEP deve estar no formato 00000-000')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`[SECURITY] Dados inválidos recebidos de ${req.ip}:`, errors.array());
    return res.status(400).json({
      error: 'Dados inválidos',
      code: 'VALIDATION_ERROR',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Health check público
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Use Acessórios API',
    version: '2.0.0'
  });
});

// Endpoint para criar Preferência do Mercado Pago - ULTRA SEGURO
app.post('/api/create-preference',
  paymentLimiter,
  validatePaymentIntent,
  handleValidationErrors,
  async (req, res) => {

    try {
      const { items, customerInfo } = req.body;

      console.log(`[MERCADO_PAGO] Iniciando pagamento para: ${customerInfo.email}`);
      console.log(`[PAYMENT] Items recebidos:`, items.map(i => `${i.productId}:${i.quantity}`));

      // VALIDAÇÃO CRÍTICA DE SEGURANÇA - PREÇOS SEMPRE DO BACKEND
      console.log(`[SECURITY] Validando produtos e preços no Firebase...`);

      // 1. VALIDAR PRODUTOS NO FIREBASE (PREÇOS REAIS)
      const validatedItems = await productService.validateProducts(items);
      console.log(`[PAYMENT] Produtos validados:`, validatedItems.length);

      // 2. VERIFICAÇÃO ANTI-FRAUDE - Comparar valores
      const backendTotal = validatedItems.reduce((sum, item) => sum + item.total, 0);
      console.log(`[SECURITY] Total calculado no backend: R$${backendTotal / 100}`);

      // Se houver tentativa de manipulação de preços, bloquear
      if (req.body.clientTotal && Math.abs(req.body.clientTotal - backendTotal) > 1) {
        console.error(`[FRAUD_ATTEMPT] Tentativa de fraude detectada!`);
        console.error(`[FRAUD_ATTEMPT] IP: ${req.ip}, Email: ${customerInfo.email}`);
        console.error(`[FRAUD_ATTEMPT] Total cliente: ${req.body.clientTotal}, Total real: ${backendTotal}`);

        return res.status(400).json({
          error: 'Valores inconsistentes detectados. Operação bloqueada por segurança.',
          code: 'SECURITY_VIOLATION'
        });
      }

      // 3. RESERVAR ESTOQUE TEMPORARIAMENTE
      const reservationId = await productService.reserveStock(validatedItems);
      console.log(`[PAYMENT] Estoque reservado: ${reservationId}`);

      // 4. CALCULAR VALORES NO BACKEND (IMPOSSÍVEL MANIPULAR)
      const subtotal = validatedItems.reduce((sum, item) => sum + item.total, 0);
      const shipping = 0; // Frete será calculado externamente
      const total = subtotal + shipping;

      console.log(`[MERCADO_PAGO] Valores calculados - Subtotal: R$${subtotal / 100}, Total: R$${total / 100}`);

      // 5. CRIAR PREFERÊNCIA NO MERCADO PAGO
      const preferenceData = {
        items: validatedItems.map(item => ({
          title: item.productName,
          unit_price: item.price / 100, // Mercado Pago usa valores em reais
          quantity: item.quantity,
          currency_id: 'BRL'
        })),
        payer: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: {
            number: customerInfo.phone.replace(/\D/g, '')
          },
          address: {
            street_name: customerInfo.address,
            city_name: customerInfo.city,
            zip_code: customerInfo.zipCode.replace(/\D/g, '')
          }
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL_TEST || 'http://localhost:5173'}/payment/success`,
          failure: `${process.env.FRONTEND_URL_TEST || 'http://localhost:5173'}/payment/failure`,
          pending: `${process.env.FRONTEND_URL_TEST || 'http://localhost:5173'}/payment/pending`
        },
        auto_return: 'approved',
        external_reference: reservationId,
        notification_url: `${process.env.BACKEND_URL || 'http://localhost:4242'}/api/webhook`
      };
      console.log('[DEBUG] Dados da preferência:', JSON.stringify(preferenceData, null, 2));
      const mpPreference = await preference.create({ body: preferenceData });

      // 6. CRIAR PEDIDO PENDENTE NO FIREBASE
      const orderData = {
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        customerCity: customerInfo.city,
        customerZipCode: customerInfo.zipCode,
        items: validatedItems,
        subtotal,
        shipping,
        total,
        status: 'pending',
        preferenceId: mpPreference.id,
        reservationId: reservationId,
        securityValidated: true,
        ipAddress: req.ip,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const orderId = await orderService.createOrder(orderData);
      console.log(`[MERCADO_PAGO] Pedido criado: ${orderId}`);

      res.json({
        init_point: mpPreference.init_point,
        sandbox_init_point: mpPreference.sandbox_init_point,
        id: mpPreference.id,
        orderId,
        amount: total,
        items: validatedItems.map(item => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        })),
        shipping,
        subtotal,
        reservationId
      });

    } catch (error) {
      console.error('[PAYMENT] Erro ao criar payment intent:', error);

      // Log de segurança para tentativas suspeitas
      if (error.message.includes('Produto') || error.message.includes('estoque')) {
        console.error(`[SECURITY] Tentativa suspeita de ${req.ip}: ${error.message}`);
      }

      console.log('[DEBUG] Respondendo com erro:', error.message);
      res.status(400).json({
        error: error.message || 'Erro ao processar pagamento',
        code: 'PAYMENT_ERROR'
      });
    }
  }
);

// Webhook do Mercado Pago - ULTRA SEGURO
app.post('/api/webhook', express.json(), async (req, res) => {
  try {
    console.log('[WEBHOOK] Body completo recebido:', JSON.stringify(req.body, null, 2));
    console.log('[WEBHOOK] Headers:', JSON.stringify(req.headers, null, 2));

    // Mercado Pago pode enviar diferentes formatos
    let eventType, paymentId;
    
    // Formato 1: { type: "payment", data: { id: "123" } }
    if (req.body.type && req.body.data) {
      eventType = req.body.type;
      paymentId = req.body.data.id;
    }
    // Formato 2: { action: "payment.created", data: { id: "123" } }
    else if (req.body.action && req.body.data) {
      eventType = req.body.action.includes('payment') ? 'payment' : req.body.action;
      paymentId = req.body.data.id;
    }
    // Formato 3: Direto { id: "123", topic: "payment" }
    else if (req.body.id && req.body.topic) {
      eventType = req.body.topic;
      paymentId = req.body.id;
    }
    // Formato 4: Query parameters (backup)
    else if (req.query.id && req.query.topic) {
      eventType = req.query.topic;
      paymentId = req.query.id;
    }
    else {
      console.error('[WEBHOOK] Formato não reconhecido:', req.body);
      return res.status(400).json({ error: 'Formato de webhook não reconhecido' });
    }

    console.log(`[WEBHOOK] Evento processado: ${eventType}, Payment ID: ${paymentId}`);

    if (eventType === 'payment' || eventType.includes('payment')) {
      if (!paymentId) {
        console.error('[WEBHOOK] Payment ID não encontrado');
        return res.status(400).json({ error: 'Payment ID não encontrado' });
      }

      // Verificação de idempotência
      const processedKey = `webhook_${paymentId}_${Date.now()}`;
      console.log(`[WEBHOOK] Processando pagamento: ${paymentId}`);

      // Buscar informações do pagamento no Mercado Pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        }
      });

      if (!paymentResponse.ok) {
        console.error(`[WEBHOOK] Erro ao buscar pagamento: ${paymentResponse.status}`);
        return res.status(400).json({ error: 'Payment not found' });
      }

      const payment = await paymentResponse.json();
      console.log(`[WEBHOOK] Status do pagamento: ${payment.status}`);
      console.log(`[WEBHOOK] Valor: ${payment.transaction_amount}`);
      console.log(`[WEBHOOK] External reference: ${payment.external_reference}`);

      // Buscar pedido pela referência externa (reservationId)
      const order = await orderService.getOrderByReservationId(payment.external_reference);

      if (order) {
        // Verificar se já foi processado (idempotência)
        if (order.webhookProcessed && order.status === 'paid') {
          console.log(`[WEBHOOK] ⚠️ Pagamento já processado: ${paymentId}`);
          return res.json({ received: true, status: 'already_processed' });
        }

        // VALIDAÇÃO CRÍTICA: Verificar valor do pagamento
        const expectedAmount = order.total / 100; // Converter centavos para reais
        if (Math.abs(payment.transaction_amount - expectedAmount) > 0.01) {
          console.error(`[WEBHOOK] ❌ FRAUDE: Valor incorreto!`);
          console.error(`[WEBHOOK] Esperado: R$${expectedAmount}, Recebido: R$${payment.transaction_amount}`);

          await orderService.updateOrderStatus(order.id, 'fraud_detected', {
            fraudReason: 'amount_mismatch',
            expectedAmount,
            receivedAmount: payment.transaction_amount,
            paymentId
          });

          return res.status(400).json({ error: 'Amount mismatch detected' });
        }

        switch (payment.status) {
          case 'approved':
            console.log(`[WEBHOOK] 💰 Pagamento aprovado: ${paymentId}`);

            // DECREMENTAR ESTOQUE APENAS AQUI (APÓS CONFIRMAÇÃO)
            await productService.confirmStockReduction(order.reservationId);

            // Atualizar pedido com dados do pagamento
            await orderService.updateOrderStatus(order.id, 'paid', {
              paymentId,
              paymentMethod: payment.payment_method_id,
              paymentAmount: payment.transaction_amount,
              webhookProcessed: true,
              paidAt: new Date()
            });

            console.log(`[WEBHOOK] ✅ Pedido processado: ${order.id}`);
            break;

          case 'rejected':
          case 'cancelled':
            console.log(`[WEBHOOK] ❌ Pagamento rejeitado/cancelado: ${paymentId}`);
            await orderService.updateOrderStatus(order.id, 'cancelled', {
              paymentId,
              cancelReason: payment.status_detail,
              webhookProcessed: true
            });
            await productService.releaseReservedStock(order.reservationId);
            console.log(`[WEBHOOK] 🔄 Estoque liberado para pedido: ${order.id}`);
            break;

          case 'pending':
          case 'in_process':
            console.log(`[WEBHOOK] ⏳ Pagamento pendente: ${paymentId}`);
            await orderService.updateOrderStatus(order.id, 'pending', {
              paymentId,
              webhookProcessed: true
            });
            break;
        }
      } else {
        console.error(`[WEBHOOK] ❌ Pedido não encontrado para referência: ${payment.external_reference}`);
      }
    } else {
      console.log(`[WEBHOOK] Evento ignorado: ${eventType}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar webhook:', error);
    res.status(500).json({
      error: 'Erro ao processar webhook',
      code: 'WEBHOOK_ERROR'
    });
  }
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()}:`, error);

  // Log de segurança
  console.log(`[SECURITY] Erro para IP ${req.ip} na rota ${req.path}`);

  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR'
  });
});

// Bloquear todas as outras rotas
app.use((req, res) => {
  console.log(`[SECURITY] Tentativa de acesso a rota inexistente: ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  res.status(404).json({
    error: 'Endpoint não encontrado',
    code: 'NOT_FOUND'
  });
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`🔒 Servidor ULTRA SEGURO rodando na porta ${PORT}`);
  console.log(`🔥 Firebase Admin conectado`);
  console.log(`💳 Mercado Pago configurado`);
  console.log(`🛡️ Middlewares de segurança ativados`);
  console.log(`📊 Rate limiting configurado`);
  console.log(`🚫 Rotas sensíveis bloqueadas`);
  console.log(`💰 Preços blindados - sempre do Firebase`);
  console.log(`📦 Controle de estoque ativo`);
});