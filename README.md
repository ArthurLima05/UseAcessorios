# Use Acessórios - Sistema Seguro com Firebase e Stripe

Sistema de e-commerce seguro para acessórios, integrado com Firebase Firestore, Firebase Storage e Stripe para pagamentos.

## 🔥 Características Principais

### ✅ **Sistema de Checkout Transparente**
- Checkout transparente sem necessidade de login
- Segurança através de regras do Firebase
- Experiência de compra simplificada

### ✅ **Integração Completa com Firebase**
- **Firestore**: Armazenamento de produtos e pedidos
- **Storage**: Imagens dos produtos
- **Regras de Segurança**: Proteção contra manipulação

### ✅ **Pagamentos Seguros com Stripe**
- Processamento seguro de cartões
- Webhook para confirmação de pagamentos
- Validação de preços no backend

### ✅ **Segurança Robusta**
- Preços validados no servidor
- Rate limiting
- Validação de dados
- Headers de segurança

## 🚀 Configuração

### 1. **Firebase Setup**

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative o Firestore Database
3. Ative o Storage
4. Configure as regras de segurança (arquivos incluídos)
5. Gere as credenciais do Admin SDK

### 2. **Stripe Setup**

1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha as chaves de API (pública e secreta)
3. Configure o webhook endpoint: `https://seudominio.com/api/webhook`
4. Eventos do webhook: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 3. **Variáveis de Ambiente**

Copie `.env.example` para `.env` e configure:

```bash
# Firebase
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_PROJECT_ID=seu_project_id
# ... outras configurações

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. **Instalação**

```bash
npm install
```

### 5. **Executar**

```bash
# Frontend
npm run dev

# Backend
npm run start
```

## 🛡️ Regras de Segurança

### **Firestore Rules**
- ✅ Produtos: Leitura pública, escrita restrita
- ✅ Pedidos: Apenas backend via Admin SDK
- ✅ Outras coleções: Acesso negado por padrão

### **Storage Rules**
- ✅ Imagens: Leitura pública, escrita restrita
- ✅ Upload apenas via Admin SDK

## 📦 Estrutura do Projeto

```
src/
├── config/
│   └── firebase.ts          # Configuração Firebase
├── services/
│   ├── firebase.ts          # Serviços Firebase
│   └── stripe.ts            # Serviços Stripe
├── hooks/
│   ├── useProducts.ts       # Hook para produtos
│   └── useCart.ts           # Hook para carrinho
├── components/
│   ├── Checkout.tsx         # Componente de checkout
│   └── ...
└── pages/
    └── ...

server/
├── config/
│   └── firebase-admin.js    # Firebase Admin
├── services/
│   └── firebase.js          # Serviços backend
└── server.js                # Servidor Express
```

## 🔒 Fluxo de Segurança

1. **Frontend**: Envia apenas IDs dos produtos e quantidades
2. **Backend**: Valida produtos no Firebase
3. **Backend**: Calcula preços reais do banco de dados
4. **Stripe**: Processa pagamento com valores validados
5. **Webhook**: Confirma pagamento e salva pedido
6. **Firebase**: Armazena pedido com status atualizado

## 🚀 Deploy

### **Frontend (Vercel/Netlify)**
```bash
npm run build
```

### **Backend (Railway/Heroku)**
```bash
# Configure as variáveis de ambiente
# Deploy o servidor Express
```

### **Firebase**
```bash
# Deploy das regras
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## 📊 Monitoramento

- **Firebase Console**: Monitorar dados e regras
- **Stripe Dashboard**: Acompanhar pagamentos
- **Logs do servidor**: Verificar webhooks e erros

## 🔧 Desenvolvimento

### **Adicionar Produtos**
Use o Firebase Console ou crie um script admin para adicionar produtos:

```javascript
{
  name: "Nome do Produto",
  price: 2500, // em centavos
  image: "url_da_imagem",
  images: ["url1", "url2"],
  category: "brincos",
  description: "Descrição...",
  inStock: true,
  active: true,
  featured: false,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

## ⚠️ Importante

- **Nunca** exponha chaves privadas no frontend
- **Sempre** valide preços no backend
- **Configure** as regras do Firebase corretamente
- **Teste** os webhooks em ambiente de desenvolvimento
- **Monitore** logs de erro e tentativas de manipulação

## 🎯 Próximos Passos

- [ ] Sistema de administração para produtos
- [ ] Notificações por email
- [ ] Rastreamento de pedidos
- [ ] Sistema de cupons
- [ ] Analytics avançado

---

**Sistema pronto para produção com segurança enterprise!** 🚀