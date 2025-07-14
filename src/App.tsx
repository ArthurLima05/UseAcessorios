import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GuidesPage } from './pages/GuidesPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { useCart } from './hooks/useCart';
import { Product, Guide, CartItem } from './types';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const cart = useCart();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleViewAllCategory = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleShowGuides = () => {
    navigate('/guides');
  };

  const handleBuyNow = (items: CartItem[]) => {
    navigate('/checkout', { state: { buyNowItems: items } });
    cart.setIsOpen(false);
  };

  const handlePurchaseGuide = (guide: Guide) => {
    alert(`Redirecionando para pagamento do guia: ${guide.name}`);
  };

  const handleOrderComplete = () => {
    // Lógica para completar o pedido
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Layout 
      onGuidesClick={handleShowGuides}
      cart={cart}
      onCheckout={handleCheckout}
    >
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage
              onCategorySelect={handleCategorySelect}
              onAddToCart={cart.addItem}
              onViewProduct={handleViewProduct}
              onViewAll={handleViewAllCategory}
            />
          } 
        />
        <Route 
          path="/category/:categoryId" 
          element={
            <CategoryPage
              onAddToCart={cart.addItem}
              onViewProduct={handleViewProduct}
            />
          } 
        />
        <Route 
          path="/product/:productId" 
          element={
            <ProductDetailPage
              onAddToCart={cart.addItem}
              onBuyNow={handleBuyNow}
            />
          } 
        />
        <Route 
          path="/guides" 
          element={
            <GuidesPage onPurchaseGuide={handlePurchaseGuide} />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage
              cartItems={cart.items}
              cartTotal={cart.getTotal()}
              onOrderComplete={handleOrderComplete}
              onClearCart={cart.clearCart}
            />
          } 
        />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;