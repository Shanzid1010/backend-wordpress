
import apiClient from './client';
import { Product, Category, User, Order } from '../types';

// Mock data remains as a fallback to ensure the UI stays elegant if the API is slow or errors out
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1, name: "Silk Radiance Foundation", slug: "silk-radiance", price: "55.00", regular_price: "55.00", sale_price: "",
    description: "A weightless foundation for a natural glow.", short_description: "Glowing skin foundation.",
    images: [{ id: 101, src: "https://picsum.photos/seed/makeup1/600/800", name: "foundation" }],
    categories: [{ id: 10, name: "Makeup", slug: "makeup" }], stock_status: "instock", average_rating: "4.8", rating_count: 120
  },
  {
    id: 2, name: "Velvet Rose Lipstick", slug: "velvet-rose", price: "28.00", regular_price: "32.00", sale_price: "28.00",
    description: "Matte finish with long-lasting hydration.", short_description: "Premium matte lipstick.",
    images: [{ id: 102, src: "https://picsum.photos/seed/lipstick/600/800", name: "lipstick" }],
    categories: [{ id: 10, name: "Lipsticks", slug: "lipsticks" }], stock_status: "instock", average_rating: "4.9", rating_count: 85
  },
  {
    id: 3, name: "Midnight Elixir Serum", slug: "midnight-elixir", price: "85.00", regular_price: "85.00", sale_price: "",
    description: "Intense night repair serum for all skin types.", short_description: "Night repair serum.",
    images: [{ id: 103, src: "https://picsum.photos/seed/serum/600/800", name: "serum" }],
    categories: [{ id: 11, name: "Skincare", slug: "skincare" }], stock_status: "instock", average_rating: "5.0", rating_count: 210
  }
];

export const productService = {
  getProducts: async (params?: any): Promise<Product[]> => {
    try {
      const response = await apiClient.get('/wc/v3/products', { 
        params: { 
          status: 'publish',
          ...params 
        } 
      });
      return response.data.length > 0 ? response.data : MOCK_PRODUCTS;
    } catch (e) {
      console.warn("WooCommerce API connection failed, using mock products", e);
      return MOCK_PRODUCTS;
    }
  },
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await apiClient.get(`/wc/v3/products/${id}`);
      return response.data;
    } catch (e) {
      const mock = MOCK_PRODUCTS.find(p => p.id === Number(id)) || MOCK_PRODUCTS[0];
      return mock;
    }
  },
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get('/wc/v3/products/categories', {
        params: { hide_empty: true }
      });
      return response.data;
    } catch (e) {
      return [
        { id: 10, name: "Makeup", slug: "makeup", count: 20 },
        { id: 11, name: "Skincare", slug: "skincare", count: 15 },
        { id: 12, name: "Perfume", slug: "perfume", count: 8 },
        { id: 13, name: "Tools", slug: "tools", count: 5 }
      ];
    }
  }
};

export const authService = {
  login: async (username: string, password: string): Promise<User> => {
    // Note: Requires 'JWT Authentication for WP REST API' plugin on WordPress
    const response = await apiClient.post('/jwt-auth/v1/token', { username, password });
    return response.data;
  },
  register: async (userData: { email: string; username: string; password: string; first_name: string; last_name: string }): Promise<User> => {
    const response = await apiClient.post('/wc/v3/customers', userData);
    return response.data;
  },
  getCurrentUser: async (id: number): Promise<User> => {
    const response = await apiClient.get(`/wc/v3/customers/${id}`);
    return response.data;
  },
  getOrders: async (customerId: number): Promise<Order[]> => {
    try {
      const response = await apiClient.get('/wc/v3/orders', { params: { customer: customerId } });
      return response.data;
    } catch (e) {
      return [];
    }
  }
};
