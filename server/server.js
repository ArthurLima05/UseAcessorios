import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { productService, orderService } from './services/firebase.js';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: { error: 'Muitas tentativas. Tente novamente em 15 minutos.' }
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // máximo 5 tentativas de pagamento por minuto
  message: { error: 'Muitas tentativas de pagamento. Aguarde 1 minuto.' }
});

app.use(limiter);

// Middleware para parsing JSON (exceto para webhook)
app.use('/api/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));

// Validações
const validatePaymentIntent = [
  body('items').isArray({ min: 1 }).withMessage('Items deve ser um array não vazio'),
  body('items.*.productId').isString().notEmpty().withMessage('ID do produto é obrigatório'),
  body('items.*.quantity').isInt({ min: 1, max: 10 }).withMessage('Quantidade deve ser entre 1 e 10'),
  body('customerInfo.email').isEmail().withMessage('Email inválido'),
  body('customerInfo.name').isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('customerInfo.phone').isLength({ min: 10, max: 15 }).withMessage('Telefone inválido'),
  body('customerInfo.address').isLength({ min: 5, max: 200 }).withMessage('Endereço deve ter entre 5 e 200 caracteres'),
  body('customerInfo.city').isLength({ min: 2, max: 50 }).withMessage('Cidade deve ter entre 2 e 50 caracteres'),
  body('customerInfo.zipCode').isLength({ min: 8, max: 9 }).withMessage('CEP inválido')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

// Endpoint para criar Payment Intent
app.post('/api/create-payment-intent', 
  paymentLimiter,
  validatePaymentIntent,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { items, customerInfo } = req.body;
      
      // Validar produtos no Firebase
      const validatedItems = await productService.validateProducts(items);
      
      // Calcular totais
      const subtotal = validatedItems.reduce((sum, item) => sum + item.total, 0);
      const shipping = subtotal >= 50000 ? 0 : 2500; // R$ 25 em centavos se menor que R$ 500
      const total = subtotal + shipping;
      
      // Criar Payment Intent no Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'brl',
        metadata: {
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          itemsCount: validatedItems.length.toString(),
          subtotal: subtotal.toString(),
          shipping: shipping.toString()
        }
      });
      
      // Criar pedido no Firebase com status pending
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
        paymentIntentId: paymentIntent.id
      };
      
      const orderId = await orderService.createOrder(orderData);
      
      res.json({
        clientSecret: paymentIntent.client_secret,
        orderId,
        amount: total,
        items: validatedItems,
        shipping,
        subtotal
      });
      
    } catch (error) {
      console.error('Erro ao criar payment intent:', error);
      res.status(500).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  }
);

// Webhook do Stripe
app.post('/api/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Processar eventos do Stripe
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('💰 Pagamento confirmado:', paymentIntent.id);
        
        // Atualizar status do pedido no Firebase
        await orderService.updateOrderStatus(
          null, // Não temos o orderId aqui, vamos buscar pelo paymentIntentId
          'paid',
          paymentIntent.id
        );
        
        // Buscar o pedido para log
        const order = await orderService.getOrderByPaymentIntent(paymentIntent.id);
        if (order) {
          console.log('📦 Pedido atualizado:', {
            orderId: order.id,
            customer: order.customerEmail,
            total: order.total / 100, // Converter de centavos para reais
            items: order.items.length
          });
        }
        
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('❌ Pagamento falhou:', failedPayment.id);
        
        // Atualizar status do pedido para cancelled
        await orderService.updateOrderStatus(
          null,
          'cancelled',
          failedPayment.id
        );
        
        break;
        
      default:
        console.log(`Evento não tratado: ${event.type}`);
    }
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Use Acessórios API'
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`🔒 Servidor seguro rodando na porta ${PORT}`);
  console.log('🔥 Firebase conectado');
  console.log('💳 Stripe configurado');
  console.log('🛡️ Middlewares de segurança ativados');
});