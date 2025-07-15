import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/firebase';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.getAllProducts();
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = (): Product[] => {
    return products.filter(product => product.featured);
  };

  return {
    products,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    refetch: loadProducts
  };
};