
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: { id: number; src: string; name: string }[];
  categories: { id: number; name: string; slug: string }[];
  stock_status: 'instock' | 'outofstock';
  average_rating: string;
  rating_count: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  token?: string;
}

export interface Order {
  id: number;
  status: string;
  total: string;
  date_created: string;
  line_items: { name: string; quantity: number; total: string }[];
}
