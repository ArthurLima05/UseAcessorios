import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { products } from '../data/products';
import { Product, CartItem } from '../types';

interface ProductDetailPageProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (items: CartItem[]) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToCart,
  onBuyNow
}) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(productId));

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
    />
  );
};