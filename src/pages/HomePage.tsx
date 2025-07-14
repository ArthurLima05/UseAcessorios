import React from 'react';
import { Hero } from '../components/Hero';
import { JewelryCategories } from '../components/JewelryCategories';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { products } from '../data/products';
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