
import axios from 'axios';

/**
 * We use the exact environment variable names you requested.
 * We add optional chaining (?.) and fallbacks so the app doesn't go blank
 * if the environment variables aren't yet configured in your Vercel dashboard.
 */

// @ts-ignore
const BASE_URL = import.meta.env?.VITE_API_URL || "https://beauty.neuronextbd.com/wp-json";
// @ts-ignore
const CONSUMER_KEY = import.meta.env?.VITE_WC_CONSUMER_KEY || "ck_50416d9a04117a6fc6ba3611888a892c253d2b96";
// @ts-ignore
const CONSUMER_SECRET = import.meta.env?.VITE_WC_CONSUMER_SECRET || "cs_9a205fc028fd89fc5f58106e08e32d31ddc76ba5";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Dual-auth interceptor:
 * 1. JWT for user-specific data.
 * 2. WooCommerce REST keys for public products.
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('lumiere_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Automatically append WooCommerce credentials for WC REST API routes
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
