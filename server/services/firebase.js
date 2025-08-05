import { db } from '../config/firebase-admin.js';

// Serviços para produtos
export const productService = {
  // Buscar produto por ID com validação completa
  async getProductById(productId) {
    try {
      const productRef = db.collection('products').doc(productId);
      const productSnap = await productRef.get();

      if (productSnap.exists) {
        const data = productSnap.data();
        return {
          id: productSnap.id,
          ...data,
          // Garantir campos obrigatórios
          quantity: data.quantity || 0,
          weight: data.weight || 0.5, // peso padrão 500g
          active: data.active !== false, // ativo por padrão
          inStock: (data.quantity || 0) > 0 && data.active !== false
        };
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw new Error('Erro ao buscar produto');
    }
  },

  // Validar produtos com verificação rigorosa
  async validateProducts(items) {
    try {
      const validatedItems = [];

      for (const item of items) {
        // Buscar produto real no Firebase
        const product = await this.getProductById(item.productId);

        if (!product) {
          throw new Error(`Produto ${item.productId} não encontrado`);
        }

        if (!product.active) {
          throw new Error(`Produto ${product.name} não está mais disponível`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(`Produto ${product.name} tem apenas ${product.quantity} unidades disponíveis`);
        }

        if (item.quantity <= 0 || item.quantity > 10) {
          throw new Error(`Quantidade inválida para ${product.name}`);
        }

        // Usar APENAS dados do Firebase (impossível manipular)
        validatedItems.push({
          productId: product.id,
          productName: product.name,
          price: product.price, // PREÇO REAL DO FIREBASE
          quantity: item.quantity,
          total: product.price * item.quantity, // CÁLCULO SEGURO
          weight: product.weight || 0.5,
          availableQuantity: product.quantity,
        });
      }

      return validatedItems;
    } catch (error) {
      console.error('Erro ao validar produtos:', error);
      throw error;
    }
  },

  // Reservar estoque temporariamente (15 minutos)
  async reserveStock(validatedItems) {
    try {
      const reservationId = `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

      const batch = db.batch();

      // Criar documento de reserva
      const reservationRef = db.collection('stock_reservations').doc(reservationId);
      batch.set(reservationRef, {
        items: validatedItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        status: 'active',
        expiresAt,
        createdAt: new Date()
      });

      // Reduzir quantidade temporariamente
      for (const item of validatedItems) {
        const productRef = db.collection('products').doc(item.productId);
        batch.update(productRef, {
          quantity: item.availableQuantity - item.quantity,
          updatedAt: new Date()
        });
      }

      await batch.commit();

      console.log(`[STOCK] Estoque reservado: ${reservationId}`);
      return reservationId;

    } catch (error) {
      console.error('Erro ao reservar estoque:', error);
      throw new Error('Erro ao reservar estoque');
    }
  },

  // Confirmar redução de estoque após pagamento
  async confirmStockReduction(reservationId) {
    try {
      const reservationRef = db.collection('stock_reservations').doc(reservationId);
      const reservationSnap = await reservationRef.get();

      if (!reservationSnap.exists) {
        console.log(`[STOCK] Reserva não encontrada: ${reservationId}`);
        return;
      }

      const reservation = reservationSnap.data();
      const batch = db.batch();

      // Verificar e desativar produtos com estoque zero
      for (const item of reservation.items) {
        const productRef = db.collection('products').doc(item.productId);
        const productSnap = await productRef.get();

        if (productSnap.exists) {
          const product = productSnap.data();
          const newQuantity = product.quantity || 0;

          // Se quantidade chegou a zero, desativar produto
          if (newQuantity <= 0) {
            batch.update(productRef, {
              quantity: 0,
              inStock: false,
              active: false,
              deactivatedAt: new Date(),
              deactivatedReason: 'out_of_stock',
              updatedAt: new Date()
            });

            console.log(`[STOCK] Produto desativado por falta de estoque: ${item.productId}`);
          }
        }
      }

      // Marcar reserva como confirmada
      batch.update(reservationRef, {
        status: 'confirmed',
        confirmedAt: new Date()
      });

      await batch.commit();
      console.log(`[STOCK] Redução confirmada: ${reservationId}`);

    } catch (error) {
      console.error('Erro ao confirmar redução de estoque:', error);
      throw new Error('Erro ao confirmar redução de estoque');
    }
  },

  // Liberar estoque reservado (pagamento falhou)
  async releaseReservedStock(reservationId) {
    try {
      const reservationRef = db.collection('stock_reservations').doc(reservationId);
      const reservationSnap = await reservationRef.get();

      if (!reservationSnap.exists) {
        console.log(`[STOCK] Reserva não encontrada: ${reservationId}`);
        return;
      }

      const reservation = reservationSnap.data();
      const batch = db.batch();

      // Restaurar quantidades
      for (const item of reservation.items) {
        const productRef = db.collection('products').doc(item.productId);
        const productSnap = await productRef.get();

        if (productSnap.exists) {
          const currentQuantity = productSnap.data().quantity || 0;
          const newQuantity = currentQuantity + item.quantity;

          const updateData = {
            quantity: newQuantity,
            updatedAt: new Date()
          };

          // Se quantidade > 0, reativar produto
          if (newQuantity > 0) {
            updateData.inStock = true;
            updateData.active = true;
          }

          batch.update(productRef, updateData);
        }
      }

      // Marcar reserva como liberada
      batch.update(reservationRef, {
        status: 'released',
        releasedAt: new Date()
      });

      await batch.commit();

      console.log(`[STOCK] Estoque liberado: ${reservationId}`);

    } catch (error) {
      console.error('Erro ao liberar estoque:', error);
      throw new Error('Erro ao liberar estoque');
    }
  },


  // Limpeza automática de reservas expiradas (executar periodicamente)
  async cleanupExpiredReservations() {
    try {
      const now = new Date();
      const expiredQuery = db.collection('stock_reservations')
        .where('status', '==', 'active')
        .where('expiresAt', '<=', now);

      const expiredSnap = await expiredQuery.get();

      if (expiredSnap.empty) {
        return;
      }

      console.log(`[CLEANUP] Limpando ${expiredSnap.size} reservas expiradas`);

      for (const doc of expiredSnap.docs) {
        await this.releaseReservedStock(doc.id);
      }

    } catch (error) {
      console.error('Erro na limpeza de reservas:', error);
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

      console.log(`[ORDER] Pedido criado: ${orderRef.id}`);
      return orderRef.id;

    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error('Erro ao criar pedido');
    }
  },

  // Atualizar status do pedido
  async updateOrderStatus(orderId, status) {
    try {
      await db.collection('orders').doc(orderId).update({
        status,
        updatedAt: new Date(),
        [`${status}At`]: new Date() // Ex: paidAt, shippedAt, etc.
      });

      console.log(`[ORDER] Status atualizado: ${orderId} -> ${status}`);

    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw new Error('Erro ao atualizar pedido');
    }
  },

  // Buscar pedido por Payment Intent ID
  async getOrderByPreferenceId(preferenceId) {
    try {
      const ordersRef = db.collection('orders');
      const query = ordersRef.where('preferenceId', '==', preferenceId);
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
  },

  // Buscar pedido por Reservation ID (para webhook do Mercado Pago)
  async getOrderByReservationId(reservationId) {
    try {
      const ordersRef = db.collection('orders');
      const query = ordersRef.where('reservationId', '==', reservationId);
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
      console.error('Erro ao buscar pedido por reservationId:', error);
      throw new Error('Erro ao buscar pedido');
    }
  },
  // Buscar pedidos por email (para histórico)
  async getOrdersByEmail(email) {
    try {
      const ordersRef = db.collection('orders');
      const query = ordersRef
        .where('customerEmail', '==', email)
        .orderBy('createdAt', 'desc')
        .limit(50);

      const querySnapshot = await query.get();

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    } catch (error) {
      console.error('Erro ao buscar pedidos por email:', error);
      throw new Error('Erro ao buscar pedidos');
    }
  }
};

// Executar limpeza de reservas a cada 5 minutos
setInterval(() => {
  productService.cleanupExpiredReservations();
}, 5 * 60 * 1000);