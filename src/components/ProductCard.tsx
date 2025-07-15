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
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-[#f8dbe0] transition-colors">
            <Heart size={18} className="text-[#970048]" />
          </button>
        </div>
        {product.featured && (
          <div className="absolute top-4 left-4 bg-[#970048] text-white px-3 py-1 rounded-full text-sm font-medium">
            Destaque
          </div>
        )}
      </div>

      <div className="p-6" onClick={() => onViewProduct(product)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#970048]">
              R$ {(product.price / 100).toLocaleString('pt-BR')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                R$ {(product.originalPrice / 100).toLocaleString('pt-BR')}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-[#970048] text-white p-3 rounded-full hover:bg-[#7a0039] transition-colors group"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};