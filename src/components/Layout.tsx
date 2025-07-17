import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Cart } from './Cart';

interface LayoutProps {
  children: React.ReactNode;
  onGuidesClick: () => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  cart: {
    items: any[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    addItem: (product: any) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemsCount: () => number;
  };
  onCheckout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onGuidesClick, cart, onCheckout, showNotification }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => cart.setIsOpen(true)}
        cartItemsCount={cart.getItemsCount()}
        onGuidesClick={onGuidesClick}
        showNotification={showNotification}
      />

      {children}

      <Cart
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        total={cart.getTotal()}
        onCheckout={onCheckout}
      />

      <Footer />
    </div>
  );
};