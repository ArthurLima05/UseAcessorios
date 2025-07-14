import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('use-acessorios-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
        setItems([]);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que items mudar
  useEffect(() => {
    localStorage.setItem('use-acessorios-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    console.log('Adicionando produto ao carrinho:', product);
    setItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        const updatedItems = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Produto já existe, aumentando quantidade:', updatedItems);
        return updatedItems;
      }
      const newItems = [...prev, { product, quantity: 1 }];
      console.log('Novo produto adicionado:', newItems);
      return newItems;
    });
  };

  const removeItem = (productId: number) => {
    console.log('Removendo produto do carrinho:', productId);
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    console.log('Atualizando quantidade:', productId, quantity);
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    console.log('Limpando carrinho');
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemsCount
  };
};