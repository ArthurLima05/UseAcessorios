import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Shield, Truck, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
  onOrderComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, total, onBack, onOrderComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [step, setStep] = useState<'payment' | 'details' | 'confirmation'>('payment');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 'payment') {
      setStep('details');
    } else if (step === 'details') {
      setStep('confirmation');
    }
  };

  const handleConfirmOrder = () => {
    onOrderComplete();
  };

  const shipping = total >= 500 ? 0 : 25;
  const finalTotal = total + shipping;

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h2>
              <p className="text-gray-600">Seu pedido foi processado com sucesso</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>R$ {(item.product.price * item.quantity).toLocaleString('pt-BR')}</span>
                  </div>
                ))}
                {shipping > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span>R$ {shipping.toLocaleString('pt-BR')}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>R$ {finalTotal.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            {paymentMethod === 'pix' && (
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Pagamento via PIX</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Você receberá o código PIX por email em até 5 minutos
                </p>
                <div className="bg-white p-4 rounded border-2 border-dashed border-blue-300">
                  <p className="text-xs text-gray-600">Código PIX será enviado para:</p>
                  <p className="font-mono text-sm">{formData.email}</p>
                </div>
              </div>
            )}

            <button
              onClick={onBack}
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

            {step === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Forma de Pagamento</h2>

                <div className="space-y-4">
                  <div
                    onClick={() => setPaymentMethod('pix')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'pix'
                        ? 'border-[#970048] bg-[#f8dbe0]'
                        : 'border-gray-200 hover:border-[#f8dbe0]'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="text-[#970048]" size={24} />
                      <div>
                        <h3 className="font-semibold text-gray-900">PIX</h3>
                        <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'card'
                        ? 'border-[#970048] bg-[#f8dbe0]'
                        : 'border-gray-200 hover:border-[#f8dbe0]'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="text-[#970048]" size={24} />
                      <div>
                        <h3 className="font-semibold text-gray-900">Cartão de Crédito</h3>
                        <p className="text-sm text-gray-600">Visa, Mastercard, Elo</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full mt-6 bg-[#970048] text-white py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}

            {step === 'details' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados Pessoais</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                        placeholder="00000-000"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço Completo
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                      placeholder="Sua cidade"
                    />
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados do Cartão</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome no Cartão
                        </label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                          placeholder="Nome como no cartão"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Validade
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.cardCvv}
                          onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#970048] focus:border-[#970048]"
                          placeholder="000"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNextStep}
                  className="w-full bg-[#970048] text-white py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
                >
                  Revisar Pedido
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
                        R$ {(item.product.price * item.quantity).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {total.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toLocaleString('pt-BR')}`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-[#970048] border-t pt-2">
                  <span>Total</span>
                  <span>R$ {finalTotal.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              {step === 'details' && (
                <button
                  onClick={handleConfirmOrder}
                  className="w-full mt-6 bg-[#970048] text-white py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
                >
                  Finalizar Pedido
                </button>
              )}

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