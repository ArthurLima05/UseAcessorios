import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, LogOut } from 'lucide-react';
import { authService } from '../services/api';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
  onGuidesClick?: () => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  cartItemsCount, 
  onGuidesClick,
  showNotification 
}) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setShowUserMenu(false);
    showNotification('Logout realizado com sucesso!', 'success');
  };

  return (
    <>
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
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#970048] transition-colors"
                >
                  <User size={20} />
                  <span className="hidden md:block text-sm font-medium">{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-gray-700 hover:text-[#970048] transition-colors flex items-center space-x-2"
              >
                <User size={20} />
                <span className="hidden md:block text-sm font-medium">Entrar</span>
              </button>
            )}
            
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
    
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      onSuccess={handleAuthSuccess}
      showNotification={showNotification}
    />
    </>
  );
};