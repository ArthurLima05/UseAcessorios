// Serviços do Mercado Pago
export const mercadoPagoService = {
  // Criar preferência de pagamento
  async createPreference(orderData: {
    items: Array<{ productId: string; quantity: number }>;
    customerInfo: {
      email: string;
      name: string;
      phone: string;
      address: string;
      city: string;
      zipCode: string;
    };
  }) {
    try {
      console.log('Enviando orderData para Mercado Pago:', orderData);
      const response = await fetch('http://localhost:4242/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar pagamento');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
      throw error;
    }
  },

  // Verificar status do pagamento
  async getPaymentStatus(paymentId: string) {
    try {
      const response = await fetch(`http://localhost:4242/api/payment-status/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao verificar pagamento');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      throw error;
    }
  }
};