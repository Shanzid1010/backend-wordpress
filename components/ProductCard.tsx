
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const hasDiscount = product.sale_price !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-nude-100 rounded-lg">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]?.src || 'https://picsum.photos/600/800'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-rose-gold text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter rounded">
            Sale
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white text-luxury-black hover:bg-nude-100'
            }`}
          >
            <svg className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Quick Add To Cart */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-luxury-black text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-xs font-bold uppercase tracking-widest"
        >
          Quick Add
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">
          {product.categories[0]?.name || 'Beauty'}
        </span>
        <Link to={`/product/${product.id}`} className="text-sm font-medium hover:text-nude-300 transition-colors text-center">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center space-x-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold">${product.sale_price}</span>
              <span className="text-xs text-gray-400 line-through">${product.regular_price}</span>
            </>
          ) : (
            <span className="text-sm font-semibold">${product.price}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
