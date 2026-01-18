
import axios from 'axios';

// Updated to use process.env to resolve TypeScript errors with ImportMeta in this environment
const BASE_URL = process.env.VITE_API_URL || "https://beauty.neuronextbd.com/wp-json";
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY || "ck_50416d9a04117a6fc6ba3611888a892c253d2b96";
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET || "cs_9a205fc028fd89fc5f58106e08e32d31ddc76ba5";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor to manage two types of authentication:
 * 1. JWT (Bearer) for customer-specific actions (Login, Profile, Orders).
 * 2. WooCommerce REST API Keys (CK/CS) for public catalog access (Products, Categories).
 */
apiClient.interceptors.request.use((config) => {
  // Attach JWT token for user session if it exists
  const token = localStorage.getItem('lumiere_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Attach WooCommerce Consumer credentials for standard REST API endpoints
  // Appending as query parameters is often more reliable for CORS handling on standard WP setups
  if (config.url?.includes('/wc/v3')) {
    config.params = {
      ...config.params,
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    };
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
