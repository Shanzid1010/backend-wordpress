
import React, { useEffect, useState } from 'react';
import { productService } from '../api/services';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('menu_order');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const query = new URLSearchParams(useLocation().search);
  const initialCategory = query.get('category');

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params: any = { orderby: sortBy === 'price-desc' ? 'price' : 'date', order: sortBy === 'price-desc' ? 'desc' : 'asc' };
      if (activeCategory) params.category = activeCategory;
      
      const data = await productService.getProducts(params);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [activeCategory, sortBy]);

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await productService.getCategories();
      setCategories(cats);
    };
    fetchCats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-serif mb-4">The Collection</h1>
        <p className="text-gray-500 tracking-widest text-xs uppercase">Curated essentials for the modern muse</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 border-b border-nude-100 pb-2">Categories</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`text-sm tracking-wide transition-colors ${!activeCategory ? 'text-rose-gold font-bold' : 'text-gray-600 hover:text-luxury-black'}`}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`text-sm tracking-wide transition-colors ${activeCategory === cat.slug ? 'text-rose-gold font-bold' : 'text-gray-600 hover:text-luxury-black'}`}
                  >
                    {cat.name} <span className="text-[10px] text-gray-400 ml-1">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 border-b border-nude-100 pb-2">Sort By</h3>
             <select 
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="w-full bg-transparent border border-nude-200 py-2 px-3 text-sm focus:outline-none"
             >
               <option value="menu_order">Default Sorting</option>
               <option value="date">Newest Arrivals</option>
               <option value="price">Price: Low to High</option>
               <option value="price-desc">Price: High to Low</option>
             </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
               {Array(6).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-nude-100 aspect-[3/4] rounded-lg mb-4"></div>
                  <div className="h-4 bg-nude-100 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-nude-100 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400">
                  No products found in this category.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
