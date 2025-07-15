import { loadStripe } from '@stripe/stripe-js';

// Inicializar Stripe
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Serviços do Stripe
export const stripeService = {
  // Criar Payment Intent
  async createPaymentIntent(orderData: {
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
      const response = await fetch('/api/create-payment-intent', {
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
      console.error('Erro ao criar payment intent:', error);
      throw error;
    }
  },

  // Confirmar pagamento
  async confirmPayment(stripe: any, elements: any, clientSecret: string, customerInfo: any) {
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('card'),
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.zipCode,
            },
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentIntent;
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      throw error;
    }
  }
};