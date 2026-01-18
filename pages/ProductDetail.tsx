
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../api/services';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const data = await productService.getProductById(id);
        setProduct(data);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-serif text-2xl italic">Lumière...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product Not Found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Gallery */}
        <div className="lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[3/4] rounded-2xl overflow-hidden bg-nude-100 shadow-xl"
          >
            <img
              src={product.images[0]?.src || 'https://picsum.photos/800/1200'}
              className="w-full h-full object-cover"
              alt={product.name}
            />
          </motion.div>
        </div>

        {/* Info */}
        <div className="lg:w-1/2 py-8">
          <nav className="flex mb-8 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <button onClick={() => navigate('/')} className="hover:text-rose-gold">Home</button>
            <span className="mx-3">/</span>
            <button onClick={() => navigate('/shop')} className="hover:text-rose-gold">Shop</button>
            <span className="mx-3">/</span>
            <span className="text-luxury-black">{product.name}</span>
          </nav>

          <h1 className="text-5xl font-serif mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="text-2xl font-light text-rose-gold">${product.price}</span>
            <div className="flex text-yellow-400 scale-90">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-400 text-xs ml-2">({product.rating_count} Reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 mb-10 leading-relaxed tracking-wide font-light" dangerouslySetInnerHTML={{ __html: product.short_description || product.description }} />

          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="flex border border-nude-200">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-nude-50"
                >-</button>
                <span className="px-6 py-3 flex items-center border-x border-nude-200 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 hover:bg-nude-50"
                >+</button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-grow bg-luxury-black text-white py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-nude-300 transition-colors"
              >
                Add to Luxury Cart
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="flex items-center space-x-3 text-xs uppercase tracking-widest text-gray-500 hover:text-rose-gold transition-colors font-bold"
            >
              <svg className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-rose-gold text-rose-gold' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-nude-100 grid grid-cols-3 gap-8 text-center">
             <div>
               <div className="w-10 h-10 bg-nude-100 rounded-full flex items-center justify-center mx-auto mb-3">
                 <svg className="w-5 h-5 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest">Cruelty Free</span>
             </div>
             <div>
               <div className="w-10 h-10 bg-nude-100 rounded-full flex items-center justify-center mx-auto mb-3">
                 <svg className="w-5 h-5 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest">Vegan</span>
             </div>
             <div>
               <div className="w-10 h-10 bg-nude-100 rounded-full flex items-center justify-center mx-auto mb-3">
                 <svg className="w-5 h-5 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest">Dermatology Tested</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
