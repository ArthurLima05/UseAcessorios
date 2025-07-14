const API_BASE_URL = 'http://localhost:4242';

// Função para obter o token do localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Função para fazer requests autenticados
const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expirado ou inválido
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    window.location.href = '/login';
    throw new Error('Sessão expirada');
  }

  return response;
};

// Serviços de autenticação
export const authService = {
  async register(userData: { name: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro no registro');
    }

    // Salvar token e dados do usuário
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user_data', JSON.stringify(data.user));
    
    return data;
  },

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro no login');
    }

    // Salvar token e dados do usuário
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user_data', JSON.stringify(data.user));
    
    return data;
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  getCurrentUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  }
};

// Serviços de pagamento
export const paymentService = {
  async createPaymentIntent(paymentData: {
    items: Array<{ productId: number; quantity: number }>;
    userEmail: string;
    userName: string;
  }) {
    const response = await authenticatedFetch('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao processar pagamento');
    }

    return data;
  },

  async checkStock(items: Array<{ productId: number; quantity: number }>) {
    const response = await authenticatedFetch('/check-stock', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao verificar estoque');
    }

    return data;
  }
};

// Serviços de produtos
export const productService = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    return response.json();
  }
};