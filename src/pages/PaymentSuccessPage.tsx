import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: any;
}

export const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!externalReference) {
        setError('Referência do pedido não encontrada');
        setLoading(false);
        return;
      }

      try {
        // Buscar pedido pela referência externa (reservationId)
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('reservationId', '==', externalReference));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Pedido não encontrado');
          setLoading(false);
          return;
        }

        const orderDoc = querySnapshot.docs[0];
        const orderFirebaseData = orderDoc.data();

        const orderData: OrderData = {
          id: orderDoc.id,
          customerName: orderFirebaseData.customerName,
          customerEmail: orderFirebaseData.customerEmail,
          customerPhone: orderFirebaseData.customerPhone,
          customerAddress: orderFirebaseData.customerAddress,
          customerCity: orderFirebaseData.customerCity,
          items: orderFirebaseData.items,
          subtotal: orderFirebaseData.subtotal,
          shipping: orderFirebaseData.shipping || 0,
          total: orderFirebaseData.total,
          status: orderFirebaseData.status,
          createdAt: orderFirebaseData.createdAt
        };

        setOrderData(orderData);
      } catch (err) {
        console.error('Erro ao buscar dados do pedido:', err);
        setError('Erro ao carregar informações do pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [externalReference]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#970048] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações do pedido...</p>
        </div>
      </div>
    );
  }

  if (error || status !== 'approved' || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            {error || 'Pagamento não confirmado'}
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível confirmar seu pagamento. Entre em contato conosco se precisar de ajuda.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#970048] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7a0039] transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Pagamento Confirmado!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Seu pedido foi processado com sucesso
          </p>
          <p className="text-lg font-numeric text-[#970048] font-semibold">
            Pedido #{orderData.id}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center">
              <Package className="text-[#970048] mr-3" size={24} />
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-6">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.productName}</h4>
                    <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-numeric font-semibold text-[#970048]">
                      R$ {(item.total / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-numeric">
                  R$ {(orderData.subtotal / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frete</span>
                <span className="font-numeric">
                  {orderData.shipping === 0 ? 'Grátis' : `R$ ${(orderData.shipping / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-[#970048] border-t pt-2">
                <span>Total</span>
                <span className="font-numeric">
                  R$ {(orderData.total / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Dados do Cliente e Entrega */}
          <div className="space-y-8">
            {/* Dados do Cliente */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Dados do Cliente
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-[#970048]" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{orderData.customerName}</p>
                    <p className="text-gray-600">{orderData.customerEmail}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="text-[#970048]" size={20} />
                  <p className="font-numeric text-gray-900">{orderData.customerPhone}</p>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="text-[#970048] mt-1" size={20} />
                  <div>
                    <p className="text-gray-900">{orderData.customerAddress}</p>
                    <p className="text-gray-600">{orderData.customerCity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximos Passos */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6 flex items-center">
                <Truck className="text-blue-600 mr-3" size={24} />
                Próximos Passos
              </h2>

              <div className="space-y-4 text-blue-800">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm">
                    <strong>Confirmação por email:</strong> Você receberá um email de confirmação em {orderData.customerEmail}
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm">
                    <strong>Processamento:</strong> Seu pedido será processado em até 2 dias úteis
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm">
                    <strong>Envio:</strong> Você receberá o código de rastreamento por email
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p className="text-sm">
                    <strong>Entrega:</strong> Prazo de 5 a 10 dias úteis após o envio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="bg-[#970048] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#7a0039] transition-colors mr-4"
          >
            Continuar Comprando
          </button>
          <button
            onClick={() => window.print()}
            className="border border-[#970048] text-[#970048] px-8 py-4 rounded-lg font-medium hover:bg-[#970048] hover:text-white transition-colors"
          >
            Imprimir Comprovante
          </button>
        </div>
      </div>
    </div>
  );
};