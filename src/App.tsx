import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { GuidesSection } from './components/GuidesSection';
import { products } from './data/products';
import { useCart } from './hooks/useCart';
import { Product, Guide } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showGuides, setShowGuides] = useState(false);
  const cart = useCart();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setShowGuides(false);
  };

  const handleShowGuides = () => {
    setShowGuides(true);
    setSelectedProduct(null);
  };

  const handlePurchaseGuide = (guide: Guide) => {
    // Implementar lógica de compra do guia
    alert(`Redirecionando para pagamento do guia: ${guide.name}`);
  };

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
        />
        
        <Cart 
          isOpen={cart.isOpen}
          onClose={() => cart.setIsOpen(false)}
          items={cart.items}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          total={cart.getTotal()}
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Coleção</h2>
          <p className="text-gray-600">
            Explore nossa seleção cuidadosamente curada de acessórios exclusivos
          </p>
        </div>
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
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
      />
      
      <Footer />
    </div>
  );
}

export default App;