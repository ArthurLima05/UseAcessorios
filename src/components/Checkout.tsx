import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Truck, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { stripeService } from '../services/stripe';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
  onOrderComplete: () => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  items,
  total,
  onBack,
  onOrderComplete,
  showNotification
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [installments, setInstallments] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const stripe = useStripe();
  const elements = useElements();

  // Calcular valor das parcelas
  const calculateInstallmentValue = (totalValue: number, installmentCount: number) => {
    if (installmentCount === 1) return totalValue;
    
    // Aplicar juros: 4% por parcela adicional
    const interestRate = (installmentCount - 1) * 0.04;
    const totalWithInterest = totalValue * (1 + interestRate);
    return totalWithInterest / installmentCount;
  };

  const getInstallmentText = (installmentCount: number) => {
    if (installmentCount === 1) {
      return `À vista - R$ ${(total / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    
    const installmentValue = calculateInstallmentValue(total, installmentCount);
    const totalWithInterest = installmentValue * installmentCount;
    
    return `${installmentCount}x de R$ ${(installmentValue / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (Total: R$ ${(totalWithInterest / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 'details') {
      // Validar dados antes de prosseguir
      if (!formData.email || !formData.name || !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
      }
      setStep('payment');
    }
  };

  const handleConfirmOrder = async () => {
    if (!stripe || !elements) {
      showNotification('Erro ao carregar sistema de pagamento', 'error');
      return;
    }

    setLoading(true);

    try {
      // Preparar dados dos itens para o backend
      const orderItems = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));

      // Criar payment intent no backend seguro
      const paymentData = await stripeService.createPaymentIntent({
        items: orderItems,
        customerInfo: formData
      });

      // Confirmar pagamento com cartão
      const paymentIntent = await stripeService.confirmPayment(
        stripe,
        elements,
        paymentData.clientSecret,
        formData
      );

      if (paymentIntent.status === 'succeeded') {
        setOrderData({
          orderId: paymentData.orderId,
          paymentIntentId: paymentIntent.id,
          items: paymentData.items,
          subtotal: paymentData.subtotal,
          shipping: 0, // Frete será calculado externamente
          total: paymentData.amount / 100 // Converter de centavos para reais
        });
        setStep('confirmation');
        showNotification('Pagamento processado com sucesso!', 'success');
      }

    } catch (error) {
      console.error('Erro no checkout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao processar pagamento';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const shipping = 0; // Frete será calculado externamente
  const finalTotal = total + shipping;

  if (step === 'confirmation' && orderData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h2>
              <p className="text-gray-600">Seu pedido foi processado com sucesso</p>
              <p className="text-sm text-gray-500 mt-2">
                ID do Pedido: <span className="font-mono">{orderData.orderId}</span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm">
                {orderData.items.map((item: any) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>{item.productName} x{item.quantity}</span>
                    <span>R$ {(item.total / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
                {orderData.shipping > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span>R$ {(orderData.shipping / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>R$ {orderData.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Próximos Passos</h3>
              <div className="text-blue-700 text-sm space-y-1">
                <p>✅ Pagamento confirmado</p>
                <p>📧 Confirmação enviada para {formData.email}</p>
                <p>📦 Pedido será processado em até 2 dias úteis</p>
                <p>🚚 Você receberá o código de rastreamento por email</p>
              </div>
            </div>

            <button
              onClick={() => {
                onOrderComplete();
                onBack();
              }}
              className="bg-[#970048] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao carrinho</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
              <p className="text-gray-600">Complete seus dados para finalizar o pedido</p>
            </div>

            {step === 'details' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados Pessoais</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CEP *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                      placeholder="00000-000"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                    placeholder="Rua, número, complemento"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                    placeholder="Sua cidade"
                    required
                  />
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full mt-6 bg-[#970048] text-white py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
                >
                  Continuar para Pagamento
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados do Cartão</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forma de Pagamento
                  </label>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map(count => (
                      <label key={count} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="installments"
                          value={count}
                          checked={installments === count}
                          onChange={(e) => setInstallments(parseInt(e.target.value))}
                          className="text-[#970048] focus:ring-[#970048]"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {getInstallmentText(count)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Informações do Cartão
                  </label>
                  <div className="w-full px-3 py-3 border border-gray-300 rounded-lg focus-within:ring-[#970048] focus-within:border-[#970048]">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#374151',
                            '::placeholder': {
                              color: '#9CA3AF',
                            },
                          },
                        }
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  disabled={loading}
                  className="w-full bg-[#970048] text-white py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      <span>Finalizar Pedido</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#970048]">
                        R$ {((item.product.price / 100) * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {(total / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${(shipping / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-[#970048] border-t pt-2">
                  <span>Total</span>
                  <span>
                    {installments === 1 
                      ? `R$ ${(finalTotal / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                      : `${installments}x de R$ ${(calculateInstallmentValue(finalTotal, installments) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                    }
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-[#970048]" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck size={16} className="text-[#970048]" />
                  <span>Frete grátis acima de R$ 500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};