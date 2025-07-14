// Simulação de banco de dados - em produção, use um banco real
export const products = [
  {
    id: 1,
    name: "Anel de Ouro 18k com Diamante",
    price: 285000, // preço em centavos
    stock: 5,
    active: true
  },
  {
    id: 2,
    name: "Brincos de Pérola Clássicos",
    price: 165000,
    stock: 10,
    active: true
  },
  {
    id: 3,
    name: "Brincos de Esmeralda",
    price: 420000,
    stock: 3,
    active: true
  },
  {
    id: 4,
    name: "Brincos de Ouro Rosé",
    price: 189000,
    stock: 8,
    active: true
  },
  {
    id: 5,
    name: "Colar de Pérolas Naturais",
    price: 165000,
    stock: 6,
    active: true
  },
  {
    id: 6,
    name: "Colar Gargantilha Moderna",
    price: 98000,
    stock: 12,
    active: true
  },
  {
    id: 7,
    name: "Colar de Ouro com Pingente",
    price: 220000,
    stock: 4,
    active: true
  },
  {
    id: 8,
    name: "Colar Choker Delicado",
    price: 85000,
    stock: 15,
    active: true
  },
  {
    id: 9,
    name: "Pulseira de Ouro Rosé",
    price: 189000,
    stock: 7,
    active: true
  },
  {
    id: 10,
    name: "Pulseira de Prata com Charms",
    price: 120000,
    stock: 20,
    active: true
  },
  {
    id: 11,
    name: "Pulseira Tennis de Diamantes",
    price: 350000,
    stock: 2,
    active: true
  },
  {
    id: 12,
    name: "Pulseira Minimalista",
    price: 68000,
    stock: 25,
    active: true
  },
  {
    id: 13,
    name: "Piercing de Ouro Helix",
    price: 45000,
    stock: 30,
    active: true
  },
  {
    id: 14,
    name: "Piercing Nostril Delicado",
    price: 32000,
    stock: 40,
    active: true
  },
  {
    id: 15,
    name: "Piercing Tragus Premium",
    price: 58000,
    stock: 18,
    active: true
  },
  {
    id: 16,
    name: "Piercing Conch Moderno",
    price: 72000,
    stock: 22,
    active: true
  },
  {
    id: 17,
    name: "Choker de Veludo Clássico",
    price: 18000,
    stock: 50,
    active: true
  },
  {
    id: 18,
    name: "Choker de Corrente Dourada",
    price: 42000,
    stock: 35,
    active: true
  },
  {
    id: 19,
    name: "Choker com Cristais",
    price: 32000,
    stock: 28,
    active: true
  },
  {
    id: 20,
    name: "Choker Minimalista",
    price: 15000,
    stock: 60,
    active: true
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id) && product.active);
};

export const updateStock = (productId, quantity) => {
  const product = getProductById(productId);
  if (product && product.stock >= quantity) {
    product.stock -= quantity;
    return true;
  }
  return false;
};

export const checkStock = (productId, quantity) => {
  const product = getProductById(productId);
  return product && product.stock >= quantity;
};