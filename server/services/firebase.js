import { db } from '../config/firebase-admin.js';

// Serviços para produtos
export const productService = {
  // Buscar produto por ID
  async getProductById(productId) {
    try {
      const productRef = db.collection('products').doc(productId);
      const productSnap = await productRef.get();
      
      if (productSnap.exists) {
        return {
          id: productSnap.id,
          ...productSnap.data()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw new Error('Erro ao buscar produto');
    }
  },

  // Buscar múltiplos produtos por IDs
  async getProductsByIds(productIds) {
    try {
      const products = [];
      
      for (const productId of productIds) {
        const product = await this.getProductById(productId);
        if (product && product.active) {
          products.push(product);
        }
      }
      
      return products;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Erro ao buscar produtos');
    }
  },

  // Verificar se produtos estão ativos e disponíveis
  async validateProducts(items) {
    try {
      const validatedItems = [];
      
      for (const item of items) {
        const product = await this.getProductById(item.productId);
        
        if (!product) {
          throw new Error(`Produto ${item.productId} não encontrado`);
        }
        
        if (!product.active) {
          throw new Error(`Produto ${product.name} não está disponível`);
        }
        
        if (!product.inStock) {
          throw new Error(`Produto ${product.name} está fora de estoque`);
        }
        
        validatedItems.push({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
          total: product.price * item.quantity
        });
      }
      
      return validatedItems;
    } catch (error) {
      console.error('Erro ao validar produtos:', error);
      throw error;
    }
  }
};

// Serviços para pedidos
export const orderService = {
  // Criar pedido
  async createOrder(orderData) {
    try {
      const orderRef = await db.collection('orders').add({
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return orderRef.id;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error('Erro ao criar pedido');
    }
  },

  // Atualizar status do pedido
  async updateOrderStatus(orderId, status, paymentIntentId = null) {
    try {
      const updateData = {
        status,
        updatedAt: new Date()
      };
      
      if (paymentIntentId) {
        updateData.paymentIntentId = paymentIntentId;
      }
      
      await db.collection('orders').doc(orderId).update(updateData);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw new Error('Erro ao atualizar pedido');
    }
  },

  // Buscar pedido por Payment Intent ID
  async getOrderByPaymentIntent(paymentIntentId) {
    try {
      const ordersRef = db.collection('orders');
      const query = ordersRef.where('paymentIntentId', '==', paymentIntentId);
      const querySnapshot = await query.get();
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw new Error('Erro ao buscar pedido');
    }
  }
};