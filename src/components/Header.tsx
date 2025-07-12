import React from 'react';
import { Search, ShoppingBag, Heart, User } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
  onGuidesClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, cartItemsCount, onGuidesClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 pb-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/logoUseAcessorios.png" 
                alt="Use Acessórios" 
                className="h-20 w-auto"
              />
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#970048] transition-colors font-medium">
              Início
            </a>
            <button 
              onClick={onGuidesClick}
              className="text-gray-700 hover:text-[#970048] transition-colors font-medium"
            >
              Guias de Tendência
            </button>
            <a href="#" className="text-gray-700 hover:text-[#970048] transition-colors font-medium">
              Sobre
            </a>
            <a href="#" className="text-gray-700 hover:text-[#970048] transition-colors font-medium">
              Contato
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#970048] transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-700 hover:text-[#970048] transition-colors group">
              <Heart size={20} />
            </button>
            <button 
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-[#970048] transition-colors"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#970048] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};