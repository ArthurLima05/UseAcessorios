import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { productService, orderService } from './services/firebase.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

const shippingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 consultas de frete por minuto
  message: { 
    error: 'Muitas consultas de frete. Aguarde 1 minuto.',
    code: 'SHIPPING_RATE_LIMIT'
  }
});

app.use(generalLimiter);

// Middleware para parsing JSON (exceto para webhook)
app.use('/api/webhook', express.raw({ type: 'application/json' }));
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

const validateShipping = [
  body('zipCode')
    .isString()
    .matches(/^\d{5}-?\d{3}$/)
    .withMessage('CEP deve estar no formato 00000-000'),
  
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
    .withMessage('Quantidade deve ser entre 1 e 10')
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

// Função para calcular frete baseado no CEP
const calculateShipping = (zipCode, totalValue, totalWeight = 1) => {
  // Normalizar CEP
  const cleanZip = zipCode.replace(/\D/g, '');
  const region = parseInt(cleanZip.substring(0, 2));
  
  // Frete grátis acima de R$ 500
  if (totalValue >= 50000) {
    return 0;
  }
  
  // Cálculo por região (primeiros 2 dígitos do CEP)
  let baseShipping = 0;
  
  if (region >= 1 && region <= 19) {
    // Sudeste (SP, RJ, MG, ES)
    baseShipping = 1500; // R$ 15,00
  } else if (region >= 20 && region <= 28) {
    // Rio de Janeiro
    baseShipping = 1800; // R$ 18,00
  } else if (region >= 29 && region <= 39) {
    // Minas Gerais / Espírito Santo
    baseShipping = 2000; // R$ 20,00
  } else if (region >= 40 && region <= 48) {
    // Bahia / Sergipe
    baseShipping = 2500; // R$ 25,00
  } else if (region >= 49 && region <= 56) {
    // Pernambuco / Alagoas
    baseShipping = 2800; // R$ 28,00
  } else if (region >= 57 && region <= 63) {
    // Ceará / Rio Grande do Norte / Paraíba
    baseShipping = 3000; // R$ 30,00
  } else if (region >= 64 && region <= 72) {
    // Piauí / Maranhão / Pará
    baseShipping = 3500; // R$ 35,00
  } else if (region >= 73 && region <= 77) {
    // Bahia interior
    baseShipping = 2800; // R$ 28,00
  } else if (region >= 78 && region <= 78) {
    // Mato Grosso
    baseShipping = 3200; // R$ 32,00
  } else if (region >= 79 && region <= 79) {
    // Mato Grosso do Sul
    baseShipping = 3000; // R$ 30,00
  } else if (region >= 80 && region <= 87) {
    // Paraná
    baseShipping = 2200; // R$ 22,00
  } else if (region >= 88 && region <= 89) {
    // Santa Catarina
    baseShipping = 2400; // R$ 24,00
  } else if (region >= 90 && region <= 99) {
    // Rio Grande do Sul
    baseShipping = 2600; // R$ 26,00
  } else {
    // Outras regiões
    baseShipping = 3500; // R$ 35,00
  }
  
  // Adicionar taxa por peso (simulação)
  const weightFee = Math.ceil(totalWeight) * 200; // R$ 2,00 por kg
  
  return Math.min(baseShipping + weightFee, 5000); // Máximo R$ 50,00
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

// Endpoint para calcular frete
app.post('/api/calculate-shipping',
  shippingLimiter,
  validateShipping,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { zipCode, items } = req.body;
      
      console.log(`[SHIPPING] Calculando frete para CEP: ${zipCode}`);
      
      // Validar produtos e calcular peso/valor
      const validatedItems = await productService.validateProducts(items);
      
      const totalValue = validatedItems.reduce((sum, item) => sum + item.total, 0);
      const totalWeight = validatedItems.reduce((sum, item) => sum + (item.weight || 0.5) * item.quantity, 0);
      
      const shippingCost = calculateShipping(zipCode, totalValue, totalWeight);
      
      // Calcular prazo de entrega baseado na região
      const cleanZip = zipCode.replace(/\D/g, '');
      const region = parseInt(cleanZip.substring(0, 2));
      
      let deliveryDays = 5; // Padrão
      if (region >= 1 && region <= 39) {
        deliveryDays = 3; // Sudeste
      } else if (region >= 80 && region <= 99) {
        deliveryDays = 4; // Sul
      } else {
        deliveryDays = 7; // Norte/Nordeste
      }
      
      res.json({
        zipCode,
        shippingCost,
        deliveryDays,
        freeShipping: totalValue >= 50000,
        totalValue,
        totalWeight: Math.round(totalWeight * 100) / 100
      });
      
    } catch (error) {
      console.error('[SHIPPING] Erro ao calcular frete:', error);
      res.status(400).json({
        error: error.message || 'Erro ao calcular frete',
        code: 'SHIPPING_ERROR'
      });
    }
  }
);

// Endpoint para criar Payment Intent - ULTRA SEGURO
app.post('/api/create-payment-intent',
  paymentLimiter,
  validatePaymentIntent,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { items, customerInfo } = req.body;
      
      console.log(`[PAYMENT] Iniciando pagamento para: ${customerInfo.email}`);
      console.log(`[PAYMENT] Items recebidos:`, items.map(i => `${i.productId}:${i.quantity}`));
      
      // 1. VALIDAR PRODUTOS NO FIREBASE (PREÇOS REAIS)
      const validatedItems = await productService.validateProducts(items);
      console.log(`[PAYMENT] Produtos validados:`, validatedItems.length);
      
      // 2. RESERVAR ESTOQUE TEMPORARIAMENTE
      const reservationId = await productService.reserveStock(validatedItems);
      console.log(`[PAYMENT] Estoque reservado: ${reservationId}`);
      
      // 3. CALCULAR VALORES NO BACKEND (IMPOSSÍVEL MANIPULAR)
      const subtotal = validatedItems.reduce((sum, item) => sum + item.total, 0);
      const totalWeight = validatedItems.reduce((sum, item) => sum + (item.weight || 0.5) * item.quantity, 0);
      const shipping = calculateShipping(customerInfo.zipCode, subtotal, totalWeight);
      const total = subtotal + shipping;
      
      console.log(`[PAYMENT] Valores calculados - Subtotal: R$${subtotal/100}, Frete: R$${shipping/100}, Total: R$${total/100}`);
      
      // 4. CRIAR PAYMENT INTENT NO STRIPE
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          itemsCount: validatedItems.length.toString(),
          subtotal: subtotal.toString(),
          shipping: shipping.toString(),
          reservationId: reservationId,
          timestamp: new Date().toISOString()
        }
      });
      
      // 5. CRIAR PEDIDO PENDENTE NO FIREBASE
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
        paymentIntentId: paymentIntent.id,
        reservationId: reservationId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const orderId = await orderService.createOrder(orderData);
      console.log(`[PAYMENT] Pedido criado: ${orderId}`);
      
      res.json({
        clientSecret: paymentIntent.client_secret,
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
        console.log(`[SECURITY] Tentativa suspeita de ${req.ip}: ${error.message}`);
      }
      
      res.status(400).json({
        error: error.message || 'Erro ao processar pagamento',
        code: 'PAYMENT_ERROR'
      });
    }
  }
);

// Webhook do Stripe - ULTRA SEGURO
app.post('/api/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    // Verificar assinatura do Stripe
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`[WEBHOOK] Assinatura inválida: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`[WEBHOOK] 💰 Pagamento confirmado: ${paymentIntent.id}`);
        
        // Buscar pedido pelo Payment Intent ID
        const order = await orderService.getOrderByPaymentIntent(paymentIntent.id);
        
        if (order) {
          // 1. Atualizar status do pedido
          await orderService.updateOrderStatus(order.id, 'paid');
          
          // 2. Confirmar redução de estoque
          await productService.confirmStockReduction(order.reservationId);
          
          // 3. Desativar produtos sem estoque
          await productService.deactivateOutOfStockProducts(order.items);
          
          console.log(`[WEBHOOK] ✅ Pedido processado: ${order.id}`);
          console.log(`[WEBHOOK] 📦 Cliente: ${order.customerEmail}`);
          console.log(`[WEBHOOK] 💵 Valor: R$${order.total/100}`);
          
        } else {
          console.error(`[WEBHOOK] ❌ Pedido não encontrado para Payment Intent: ${paymentIntent.id}`);
        }
        
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log(`[WEBHOOK] ❌ Pagamento falhou: ${failedPayment.id}`);
        
        // Buscar e cancelar pedido
        const failedOrder = await orderService.getOrderByPaymentIntent(failedPayment.id);
        if (failedOrder) {
          await orderService.updateOrderStatus(failedOrder.id, 'cancelled');
          
          // Liberar estoque reservado
          await productService.releaseReservedStock(failedOrder.reservationId);
          
          console.log(`[WEBHOOK] 🔄 Estoque liberado para pedido: ${failedOrder.id}`);
        }
        
        break;
        
      default:
        console.log(`[WEBHOOK] Evento não tratado: ${event.type}`);
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
app.use('*', (req, res) => {
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
  console.log(`💳 Stripe configurado`);
  console.log(`🛡️ Middlewares de segurança ativados`);
  console.log(`📊 Rate limiting configurado`);
  console.log(`🚫 Rotas sensíveis bloqueadas`);
  console.log(`💰 Preços blindados - sempre do Firebase`);
  console.log(`📦 Controle de estoque ativo`);
  console.log(`🚚 Calculadora de frete ativa`);
});