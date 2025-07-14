import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Anel de Ouro 18k com Diamante",
    price: 2850,
    originalPrice: 3200,
    image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "brincos",
    description: "Elegante anel de ouro 18k com diamante natural de 0,25 quilates. Lapidação brilhante com certificado de autenticidade.",
    images: [
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: false,
    featured: true
  },
  {
    id: 2,
    name: "Brincos de Pérola Clássicos",
    price: 1650,
    image: "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "brincos",
    description: "Brincos elegantes com pérolas naturais de água doce. Design clássico e atemporal.",
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
    name: "Brincos de Ouro Rosé",
    price: 1890,
    image: "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "brincos",
    description: "Brincos delicados em ouro rosé 18k com design entrelaçado. Perfeitos para uso diário ou ocasiões especiais.",
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
  },
  {
    id: 7,
    name: "Colar de Ouro com Pingente",
    price: 2200,
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "colares",
    description: "Colar elegante em ouro 18k com pingente de diamante. Peça sofisticada para ocasiões especiais.",
    images: [
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: "Colar Choker Delicado",
    price: 850,
    image: "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "colares",
    description: "Choker delicado em prata com detalhes em ouro rosé. Perfeito para looks modernos.",
    images: [
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 9,
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
    id: 10,
    name: "Pulseira de Prata com Charms",
    price: 1200,
    image: "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "pulseiras",
    description: "Pulseira em prata 925 com charms personalizáveis. Ideal para criar sua própria história.",
    images: [
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 11,
    name: "Pulseira Tennis de Diamantes",
    price: 3500,
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "pulseiras",
    description: "Pulseira tennis com diamantes em ouro branco 18k. Elegância e sofisticação em cada detalhe.",
    images: [
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 12,
    name: "Pulseira Minimalista",
    price: 680,
    image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "pulseiras",
    description: "Pulseira minimalista em ouro 18k. Design clean e moderno para o dia a dia.",
    images: [
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 13,
    name: "Piercing de Ouro Helix",
    price: 450,
    image: "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "piercing",
    description: "Piercing helix em ouro 18k com design anatômico. Hipoalergênico e seguro.",
    images: [
      "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 14,
    name: "Piercing Nostril Delicado",
    price: 320,
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "piercing",
    description: "Piercing nostril em prata 925 com cristal. Design discreto e elegante.",
    images: [
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 15,
    name: "Piercing Tragus Premium",
    price: 580,
    image: "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "piercing",
    description: "Piercing tragus em ouro rosé com diamante. Peça exclusiva e sofisticada.",
    images: [
      "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 16,
    name: "Piercing Conch Moderno",
    price: 720,
    image: "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "piercing",
    description: "Piercing conch em titânio com design geométrico. Resistente e hipoalergênico.",
    images: [
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 17,
    name: "Choker de Veludo Clássico",
    price: 180,
    image: "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "chocker",
    description: "Choker de veludo preto com pingente de pérola. Estilo vintage e romântico.",
    images: [
      "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  },
  {
    id: 18,
    name: "Choker de Corrente Dourada",
    price: 420,
    image: "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "chocker",
    description: "Choker de corrente em ouro 18k com elos delicados. Moderno e versátil.",
    images: [
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 19,
    name: "Choker com Cristais",
    price: 320,
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "chocker",
    description: "Choker com cristais Swarovski em base de prata. Brilho e elegância únicos.",
    images: [
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true
  },
  {
    id: 20,
    name: "Choker Minimalista",
    price: 150,
    image: "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "chocker",
    description: "Choker minimalista em fio de nylon com fecho ajustável. Simplicidade e estilo.",
    images: [
      "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191560/pexels-photo-1191560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1191575/pexels-photo-1191575.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    inStock: true,
    featured: true
  }
];

const categories = [
  { id: 'all', name: 'Todos', count: products.length },
  { id: 'brincos', name: 'Brincos', count: products.filter(p => p.category === 'brincos').length },
  { id: 'colares', name: 'Colares', count: products.filter(p => p.category === 'colares').length },
  { id: 'pulseiras', name: 'Pulseiras', count: products.filter(p => p.category === 'pulseiras').length },
  { id: 'piercing', name: 'Piercing', count: products.filter(p => p.category === 'piercing').length },
  { id: 'chocker', name: 'Chocker', count: products.filter(p => p.category === 'chocker').length }
];

export const jewelryCategories = [
  {
    id: 'brincos',
    name: 'Brincos',
    image: 'https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Elegância para seus ouvidos'
  },
  {
    id: 'colares',
    name: 'Colares',
    image: 'https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Destaque para seu pescoço'
  },
  {
    id: 'pulseiras',
    name: 'Pulseiras',
    image: 'https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Charme para seus pulsos'
  },
  {
    id: 'piercing',
    name: 'Piercing',
    image: 'https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Estilo e personalidade'
  },
  {
    id: 'chocker',
    name: 'Chocker',
    image: 'https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Tendência e modernidade'
  }
];