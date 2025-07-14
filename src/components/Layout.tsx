import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Cart } from './Cart';
import { useCart } from '../hooks/useCart';

interface LayoutProps {
  children: React.ReactNode;
  onGuidesClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onGuidesClick }) => {
  const cart = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    cart.setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => cart.setIsOpen(true)}
        cartItemsCount={cart.getItemsCount()}
        onGuidesClick={onGuidesClick}
      />

      {children}

      <Cart
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        total={cart.getTotal()}
        onCheckout={handleCheckout}
      />

      <Footer />
    </div>
  );
};