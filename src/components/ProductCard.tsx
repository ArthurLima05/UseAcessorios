import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewProduct }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => onViewProduct(product)}
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-1.5 rounded-full shadow-md hover:bg-[#f8dbe0] transition-colors">
            <Heart size={16} className="text-[#970048]" />
          </button>
        </div>
        {product.featured && (
          <div className="absolute top-2 left-2 bg-[#970048] text-white px-2 py-1 rounded-full text-xs font-medium">
            Destaque
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 lg:p-6" onClick={() => onViewProduct(product)}>
        <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-[#970048]">
              R$ {(product.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through">
                R$ {(product.originalPrice / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-[#970048] text-white p-2 md:p-3 rounded-full hover:bg-[#7a0039] transition-colors group flex-shrink-0"
          >
            <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};