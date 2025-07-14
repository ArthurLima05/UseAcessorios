import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { authenticateToken, generateToken } from './middleware/auth.js';
import { 
  validatePayment, 
  validateRegistration, 
  validateLogin, 
  handleValidationErrors 
} from './middleware/validation.js';
import { getProductById, updateStock, checkStock } from './data/products.js';
import { findUserByEmail, createUser, findUserById } from './data/users.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Middleware de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

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

// Rota de registro
app.post('/register', validateRegistration, handleValidationErrors, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Verificar se usuário já existe
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const user = createUser({
      email,
      password: hashedPassword,
      name
    });

    // Gerar token
    const token = generateToken(user);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de login
app.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = generateToken(user);

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar pagamento (SEGURA)
app.post("/create-payment-intent", 
  paymentLimiter,
  authenticateToken,
  validatePayment, 
  handleValidationErrors,
  async (req, res) => {
    try {
      const { items, userEmail, userName } = req.body;
      
      let totalAmount = 0;
      const orderItems = [];

      // Validar cada item e calcular total real
      for (const item of items) {
        const product = getProductById(item.productId);
        
        if (!product) {
          return res.status(400).json({ 
            error: `Produto com ID ${item.productId} não encontrado` 
          });
        }

        if (!checkStock(item.productId, item.quantity)) {
          return res.status(400).json({ 
            error: `Estoque insuficiente para ${product.name}` 
          });
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;
        
        orderItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          total: itemTotal
        });
      }

      // Calcular frete
      const shipping = totalAmount >= 50000 ? 0 : 2500; // R$ 25 em centavos
      const finalAmount = totalAmount + shipping;

      // Criar payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: "brl",
        metadata: {
          userEmail,
          userName,
          items: JSON.stringify(orderItems),
          shipping: shipping.toString()
        }
      });

      // Reservar estoque temporariamente (em produção, use um sistema de reserva)
      for (const item of items) {
        updateStock(item.productId, item.quantity);
      }

      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: finalAmount,
        items: orderItems,
        shipping
      });

    } catch (error) {
      console.error('Erro ao criar payment intent:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

// Rota para verificar estoque
app.post('/check-stock', authenticateToken, (req, res) => {
  try {
    const { items } = req.body;
    const stockStatus = [];

    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) {
        stockStatus.push({
          productId: item.productId,
          available: false,
          reason: 'Produto não encontrado'
        });
      } else {
        stockStatus.push({
          productId: item.productId,
          available: checkStock(item.productId, item.quantity),
          currentStock: product.stock,
          requestedQuantity: item.quantity
        });
      }
    }

    res.json({ stockStatus });
  } catch (error) {
    console.error('Erro ao verificar estoque:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter produtos (pública)
app.get('/products', (req, res) => {
  try {
    // Retornar apenas informações públicas dos produtos
    const publicProducts = products
      .filter(p => p.active)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        inStock: p.stock > 0
      }));
    
    res.json(publicProducts);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Webhook da Stripe (para confirmar pagamentos)
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Pagamento confirmado:', paymentIntent.id);
      // Aqui você confirmaria o pedido no banco de dados
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`🔒 Servidor seguro rodando na porta ${PORT}`);
  console.log('🛡️ Middlewares de segurança ativados');
});