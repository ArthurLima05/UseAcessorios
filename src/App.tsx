import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Notification } from './components/Notification';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GuidesPage } from './pages/GuidesPage';
import { GuideLandingPage } from './pages/GuideLandingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentFailurePage } from './pages/PaymentFailurePage';
import { useCart } from './hooks/useCart';
import { useNotification } from './hooks/useNotification';
import { Product, Guide, CartItem } from './types';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const cart = useCart();
  const notification = useNotification();

  const handleAddToCart = (product: Product) => {
    cart.addItem(product);
    notification.showNotification(`${product.name} adicionado ao carrinho!`, 'success');
  };

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
    notification.showNotification('Pedido realizado com sucesso!', 'success');
  };

  const handleCheckout = () => {
    cart.setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <Layout 
        onGuidesClick={handleShowGuides}
        cart={cart}
        onCheckout={handleCheckout}
        showNotification={notification.showNotification}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                onCategorySelect={handleCategorySelect}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
                onViewAll={handleViewAllCategory}
              />
            } 
          />
          <Route 
            path="/category/:categoryId" 
            element={
              <CategoryPage
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
              />
            } 
          />
          <Route 
            path="/product/:productId" 
            element={
              <ProductDetailPage
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                showNotification={notification.showNotification}
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
            path="/guide/nunca-mais-erre-na-escolha" 
            element={<GuideLandingPage />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage />} 
          />
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage
                cartItems={cart.items}
                cartTotal={cart.getTotal()}
                onOrderComplete={handleOrderComplete}
                onClearCart={cart.clearCart}
                showNotification={notification.showNotification}
              />
            } 
          />
          <Route 
            path="/payment/success" 
            element={<PaymentSuccessPage />} 
          />
          <Route 
            path="/payment/failure" 
            element={<PaymentFailurePage />} 
          />
        </Routes>
      </Layout>
      
      <Notification
        message={notification.notification.message}
        type={notification.notification.type}
        isVisible={notification.notification.isVisible}
        onClose={notification.hideNotification}
      />
    </>
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