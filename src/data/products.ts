import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Anel de Ouro 18k com Diamante",
    price: 2850,
    originalPrice: 3200,
    image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "aneis",
    description: "Elegante anel de ouro 18k com diamante natural de 0,25 quilates. Lapidação brilhante com certificado de autenticidade.",
    images: [
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Colar de Pérolas Naturais",
    price: 1650,
    image: "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "colares",
    description: "Colar clássico com pérolas naturais de água doce. Fecho em ouro 18k com sistema de segurança.",
    images: [
      "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Brincos de Esmeralda",
    price: 4200,
    image: "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "brincos",
    description: "Brincos sofisticados com esmeraldas colombianas em ouro branco 18k. Design contemporâneo e elegante.",
    images: [
      "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Pulseira de Ouro Rosé",
    price: 1890,
    image: "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "pulseiras",
    description: "Pulseira delicada em ouro rosé 18k com elos entrelaçados. Perfeita para uso diário ou ocasiões especiais.",
    images: [
      "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Anel Solitário Clássico",
    price: 5500,
    image: "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "aneis",
    description: "Anel solitário em platina com diamante de 0,5 quilates. Lapidação princess com certificado GIA.",
    images: [
      "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 6,
    name: "Colar Gargantilha Moderna",
    price: 980,
    image: "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "colares",
    description: "Gargantilha contemporânea em prata 925 com banho de ródio. Design minimalista e versátil.",
    images: [
      "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  }
];

export const categories = [
  { id: 'all', name: 'Todos', count: products.length },
  { id: 'aneis', name: 'Anéis', count: products.filter(p => p.category === 'aneis').length },
  { id: 'colares', name: 'Colares', count: products.filter(p => p.category === 'colares').length },
  { id: 'brincos', name: 'Brincos', count: products.filter(p => p.category === 'brincos').length },
  { id: 'pulseiras', name: 'Pulseiras', count: products.filter(p => p.category === 'pulseiras').length }
];