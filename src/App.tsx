import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { JewelryCategories } from './components/JewelryCategories';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Footer } from './components/Footer';
import { GuidesSection } from './components/GuidesSection';
import { products } from './data/products';
import { useCart } from './hooks/useCart';
import { Product, Guide, CartItem } from './types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showGuides, setShowGuides] = useState(false);
  const [showCategoryProducts, setShowCategoryProducts] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const cart = useCart();
  const [buyNowItems, setBuyNowItems] = useState<CartItem[] | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleBuyNow = (items: CartItem[]) => {
    setBuyNowItems(items); // só um produto no array
    setShowCheckout(true);
    cart.setIsOpen(false); // fecha o carrinho caso esteja aberto
  };


  // const handleCategoryChange = (category: string) => {
  //  setSelectedCategory(category);
  // };

  const handleCategorySelect = (categoryId: string) => {
    setShowCategoryProducts(categoryId);
    setSelectedCategory(categoryId);
  };

  const handleViewAllCategory = (categoryId: string) => {
    setShowCategoryProducts(categoryId);
    setSelectedCategory(categoryId);
  };
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setShowGuides(false);
    setShowCategoryProducts(null);
    setShowCheckout(false);
  };

  const handleShowGuides = () => {
    setShowGuides(true);
    setSelectedProduct(null);
    setShowCategoryProducts(null);
    setShowCheckout(false);
  };

  const handlePurchaseGuide = (guide: Guide) => {
    // Implementar lógica de compra do guia
    alert(`Redirecionando para pagamento do guia: ${guide.name}`);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    cart.setIsOpen(false);
  };

  const handleOrderComplete = () => {
    cart.clearCart();
    setShowCheckout(false);
  };

  // Mostrar checkout
  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={() => cart.setIsOpen(true)}
          cartItemsCount={cart.getItemsCount()}
          onGuidesClick={handleShowGuides}
        />
        <Elements stripe={stripePromise}>
          <Checkout
            items={buyNowItems || cart.items}
            total={
              buyNowItems
                ? buyNowItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                : cart.getTotal()
            }
            onBack={() => {
              setShowCheckout(false);
              setBuyNowItems(null);                // Limpa o produto comprado direto ao voltar
            }}
            onOrderComplete={handleOrderComplete}
          />
        </Elements>

        <Footer />
      </div>
    );
  }

  // Mostrar produtos de uma categoria específica
  if (showCategoryProducts) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={() => cart.setIsOpen(true)}
          cartItemsCount={cart.getItemsCount()}
          onGuidesClick={handleShowGuides}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button
              onClick={handleBackToProducts}
              className="flex items-center space-x-2 text-[#970048] hover:text-[#7a0039] transition-colors mb-6"
            >
              <span>← Voltar</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
              {showCategoryProducts === 'chocker' ? 'Chokers' : showCategoryProducts}
            </h2>
            <p className="text-gray-600">
              Explore nossa coleção completa de {showCategoryProducts === 'chocker' ? 'chokers' : showCategoryProducts}
            </p>
          </div>

          <ProductGrid
            products={filteredProducts}
            onAddToCart={cart.addItem}
            onViewProduct={handleViewProduct}
          />
        </main>

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
  }
  if (showGuides) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={() => cart.setIsOpen(true)}
          cartItemsCount={cart.getItemsCount()}
          onGuidesClick={() => setShowGuides(false)}
        />

        <GuidesSection onPurchaseGuide={handlePurchaseGuide} />

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
  }

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={() => cart.setIsOpen(true)}
          cartItemsCount={cart.getItemsCount()}
          onGuidesClick={handleShowGuides}
        />

        <ProductDetail
          product={selectedProduct}
          onBack={handleBackToProducts}
          onAddToCart={cart.addItem}
          onCheckout={handleCheckout}
          onBuyNow={handleBuyNow}
        />

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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => cart.setIsOpen(true)}
        cartItemsCount={cart.getItemsCount()}
        onGuidesClick={handleShowGuides}
      />

      <Hero />

      <JewelryCategories onCategorySelect={handleCategorySelect} />

      {/* Showcases por categoria */}
      <div className="bg-gray-50">
        <CategoryShowcase
          categoryId="brincos"
          categoryName="Brincos"
          products={products.filter(p => p.category === 'brincos')}
          onAddToCart={cart.addItem}
          onViewProduct={handleViewProduct}
          onViewAll={handleViewAllCategory}
        />

        <CategoryShowcase
          categoryId="colares"
          categoryName="Colares"
          products={products.filter(p => p.category === 'colares')}
          onAddToCart={cart.addItem}
          onViewProduct={handleViewProduct}
          onViewAll={handleViewAllCategory}
        />

        <CategoryShowcase
          categoryId="pulseiras"
          categoryName="Pulseiras"
          products={products.filter(p => p.category === 'pulseiras')}
          onAddToCart={cart.addItem}
          onViewProduct={handleViewProduct}
          onViewAll={handleViewAllCategory}
        />

        <CategoryShowcase
          categoryId="piercing"
          categoryName="Piercing"
          products={products.filter(p => p.category === 'piercing')}
          onAddToCart={cart.addItem}
          onViewProduct={handleViewProduct}
          onViewAll={handleViewAllCategory}
        />

        <CategoryShowcase
          categoryId="chocker"
          categoryName="Chokers"
          products={products.filter(p => p.category === 'chocker')}
          onAddToCart={cart.addItem}
          onViewProduct={handleViewProduct}
          onViewAll={handleViewAllCategory}
        />
      </div>

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
}

export default App;