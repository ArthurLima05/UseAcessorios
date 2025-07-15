import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { useProducts } from '../hooks/useProducts';
import { Product, CartItem } from '../types';

interface ProductDetailPageProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (items: CartItem[]) => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToCart,
  onBuyNow,
  showNotification
}) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById, loading, error } = useProducts();

  const product = productId ? getProductById(productId) : undefined;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#970048] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#970048] text-white px-6 py-2 rounded-lg hover:bg-[#7a0039] transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h2>
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
    <ProductDetail
      product={product}
      onBack={() => navigate(-1)}
      onAddToCart={onAddToCart}
      onCheckout={() => navigate('/checkout')}
      onBuyNow={onBuyNow}
      showNotification={showNotification}
    />
  );
};