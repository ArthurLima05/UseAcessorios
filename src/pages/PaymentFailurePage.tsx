import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const PaymentFailurePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cart = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  const handleClearCart = () => {
    cart.clearCart();
    setShowClearConfirm(false);
    navigate('/');
  };

  const handleReturnToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão voltar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar ao início</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status do Pagamento */}
        <div className="text-center mb-12">
          <div className="bg-red-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <XCircle className="text-red-600" size={48} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
            Pagamento Não Realizado
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Seu pagamento não foi processado
          </p>
          {paymentId && (
            <p className="text-sm font-numeric text-gray-500">
              ID: {paymentId}
            </p>
          )}
        </div>

        {/* Opções para o usuário */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
            O que você gostaria de fazer?
          </h2>

          <div className="space-y-4">
            {/* Tentar novamente */}
            <button
              onClick={handleReturnToCheckout}
              className="w-full bg-[#970048] text-white py-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Tentar Pagamento Novamente</span>
            </button>

            {/* Limpar carrinho */}
            <button
              onClick={() => setShowClearConfirm(true)}
              className="w-full border border-gray-300 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 size={20} />
              <span>Limpar Carrinho e Voltar ao Início</span>
            </button>
          </div>

          {/* Informações do carrinho */}
          {cart.items.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Itens no seu carrinho:</h3>
              <div className="space-y-3">
                {cart.items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{item.product.name} x{item.quantity}</span>
                    <span className="font-numeric font-semibold text-[#970048]">
                      R$ {((item.product.price / 100) * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center font-semibold">
                  <span>Total:</span>
                  <span className="font-numeric text-[#970048]">
                    R$ {(cart.getTotal() / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal de confirmação para limpar carrinho */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">
                Confirmar Limpeza do Carrinho
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Tem certeza que deseja limpar seu carrinho? Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Informações de ajuda */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Precisa de ajuda?</h3>
          <div className="text-blue-800 text-sm space-y-2">
            <p>• Verifique se seus dados de pagamento estão corretos</p>
            <p>• Certifique-se de que há saldo suficiente no cartão</p>
            <p>• Entre em contato conosco se o problema persistir</p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/contact')}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Falar com o Suporte →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};