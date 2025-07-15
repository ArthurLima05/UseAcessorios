import React from 'react';
import { Hero } from '../components/Hero';
import { JewelryCategories } from '../components/JewelryCategories';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

interface HomePageProps {
  onCategorySelect: (categoryId: string) => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onViewAll: (categoryId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onCategorySelect,
  onAddToCart,
  onViewProduct,
  onViewAll
}) => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#970048] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
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

  return (
    <>
      <Hero />
      <JewelryCategories onCategorySelect={onCategorySelect} />
      
      {/* Showcases por categoria */}
      <div className="bg-gray-50">
        <CategoryShowcase
          categoryId="brincos"
          categoryName="Brincos"
          products={products.filter(p => p.category === 'brincos')}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          onViewAll={onViewAll}
        />

        <CategoryShowcase
          categoryId="colares"
          categoryName="Colares"
          products={products.filter(p => p.category === 'colares')}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          onViewAll={onViewAll}
        />

        <CategoryShowcase
          categoryId="pulseiras"
          categoryName="Pulseiras"
          products={products.filter(p => p.category === 'pulseiras')}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          onViewAll={onViewAll}
        />

        <CategoryShowcase
          categoryId="piercing"
          categoryName="Piercing"
          products={products.filter(p => p.category === 'piercing')}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          onViewAll={onViewAll}
        />

        <CategoryShowcase
          categoryId="chocker"
          categoryName="Chokers"
          products={products.filter(p => p.category === 'chocker')}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          onViewAll={onViewAll}
        />
      </div>
    </>
  );
};