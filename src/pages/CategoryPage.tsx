import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductGrid } from '../components/ProductGrid';
import { products } from '../data/products';
import { Product } from '../types';

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  onAddToCart,
  onViewProduct
}) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const filteredProducts = categoryId === 'all'
    ? products
    : products.filter(product => product.category === categoryId);

  const getCategoryName = (id: string) => {
    switch (id) {
      case 'chocker': return 'Chokers';
      case 'brincos': return 'Brincos';
      case 'colares': return 'Colares';
      case 'pulseiras': return 'Pulseiras';
      case 'piercing': return 'Piercing';
      default: return 'Produtos';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {getCategoryName(categoryId || '')}
        </h2>
        <p className="text-gray-600">
          Explore nossa coleção completa de {getCategoryName(categoryId || '').toLowerCase()}
        </p>
      </div>

      <ProductGrid
        products={filteredProducts}
        onAddToCart={onAddToCart}
        onViewProduct={onViewProduct}
      />
    </main>
  );
};