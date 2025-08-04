import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Checkout } from '../components/Checkout';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  cartTotal: number;
  onOrderComplete: () => void;
  onClearCart: () => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  cartTotal,
  onOrderComplete,
  onClearCart,
  showNotification
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pega os itens do buyNow se existirem no state da navegação
  const buyNowItems = location.state?.buyNowItems as CartItem[] | null;
  const items = buyNowItems || cartItems;
  const total = buyNowItems 
    ? buyNowItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    : cartTotal;

  const handleOrderComplete = () => {
    onOrderComplete();
    if (!buyNowItems) {
      onClearCart();
    }
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Checkout
      items={items}
      total={total}
      onBack={handleBack}
      onOrderComplete={handleOrderComplete}
      showNotification={showNotification}
    />
  );
};