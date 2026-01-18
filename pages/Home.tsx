
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../api/services';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          productService.getProducts({ featured: true, per_page: 4 }),
          productService.getCategories()
        ]);
        setFeaturedProducts(products);
        setCategories(cats.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img
            src="https://picsum.photos/seed/luxuryhero/1920/1080"
            className="w-full h-full object-cover"
            alt="Hero background"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.5em] mb-6 font-medium text-gray-600"
          >
            The Art of Radiance
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-serif text-luxury-black mb-8 leading-tight"
          >
            Beauty Refined <br /><span className="italic">Beyond Compare</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/shop"
              className="inline-block bg-luxury-black text-white px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold hover:bg-nude-300 transition-colors"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-nude-300 font-bold block mb-2">Curated</span>
            <h2 className="text-4xl font-serif">Featured Beauties</h2>
          </div>
          <Link to="/shop" className="text-sm uppercase tracking-widest border-b-2 border-nude-100 hover:border-nude-300 transition-all pb-1">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-nude-100 aspect-[3/4] rounded-lg mb-4"></div>
                <div className="h-4 bg-nude-100 rounded w-2/3 mx-auto mb-2"></div>
                <div className="h-4 bg-nude-100 rounded w-1/2 mx-auto"></div>
              </div>
            ))
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="py-24 bg-nude-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Shop by Concern</h2>
            <div className="h-1 w-20 bg-rose-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className="group relative h-80 overflow-hidden rounded-lg bg-white"
              >
                <img
                  src={`https://picsum.photos/seed/${cat.slug}/600/800`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  alt={cat.name}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-serif text-white">{cat.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.count} Products
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-luxury-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-6">Join the Inner Circle</h2>
          <p className="text-gray-400 mb-10 tracking-wide font-light">
            Receive exclusive early access to new collections, invitations to private events, and beauty tips from our master artisans.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-grow bg-transparent border-b border-gray-700 py-3 focus:border-rose-gold outline-none text-sm uppercase tracking-widest"
            />
            <button className="bg-white text-luxury-black px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-nude-200 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
