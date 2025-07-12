import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CategoryShowcaseProps {
  categoryId: string;
  categoryName: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onViewAll: (categoryId: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  categoryId,
  categoryName,
  products,
  onAddToCart,
  onViewProduct,
  onViewAll
}) => {
  const featuredProducts = products.slice(0, 4);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nossos {categoryName}</h2>
            <p className="text-gray-600">Peças selecionadas especialmente para você</p>
          </div>
          <button
            onClick={() => onViewAll(categoryId)}
            className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors group"
          >
            <span className="font-medium">Ver todos</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};