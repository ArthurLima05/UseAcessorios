import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../types';

// Serviços para produtos
export const productService = {
  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('active', '==', true), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Erro ao carregar produtos');
    }
  },

  // Buscar produto por ID
  async getProductById(productId: string): Promise<Product | null> {
    try {
      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data()
        } as Product;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw new Error('Erro ao carregar produto');
    }
  },

  // Buscar produtos por categoria
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef, 
        where('category', '==', category),
        where('active', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw new Error('Erro ao carregar produtos da categoria');
    }
  },

  // Buscar produtos em destaque
  async getFeaturedProducts(limitCount: number = 8): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        where('featured', '==', true),
        where('active', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Erro ao buscar produtos em destaque:', error);
      throw new Error('Erro ao carregar produtos em destaque');
    }
  }
};

// Serviços para categorias
export const categoryService = {
  async getCategories() {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('active', '==', true));
      const querySnapshot = await getDocs(q);
      
      const categoryCount: { [key: string]: number } = {};
      
      querySnapshot.docs.forEach(doc => {
        const product = doc.data();
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
      });

      const categories = [
        { id: 'all', name: 'Todos', count: querySnapshot.docs.length },
        { id: 'brincos', name: 'Brincos', count: categoryCount['brincos'] || 0 },
        { id: 'colares', name: 'Colares', count: categoryCount['colares'] || 0 },
        { id: 'pulseiras', name: 'Pulseiras', count: categoryCount['pulseiras'] || 0 },
        { id: 'piercing', name: 'Piercing', count: categoryCount['piercing'] || 0 },
        { id: 'chocker', name: 'Chocker', count: categoryCount['chocker'] || 0 }
      ];

      return categories;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new Error('Erro ao carregar categorias');
    }
  }
};