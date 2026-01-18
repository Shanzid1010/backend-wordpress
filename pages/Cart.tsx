
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl font-serif mb-6 italic text-gray-400">Your bag is empty</h2>
        <p className="mb-8 text-gray-500 tracking-wide">Continue exploring our curated collections to find your perfect match.</p>
        <Link to="/shop" className="bg-luxury-black text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-rose-gold transition-colors">
          Begin Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif mb-12">Shopping Bag</h1>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3">
          <div className="border-t border-nude-100">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex py-8 border-b border-nude-100"
                >
                  <img
                    src={item.product.images[0]?.src}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover rounded shadow-sm flex-shrink-0"
                  />
                  <div className="ml-8 flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg mb-1">{item.product.name}</h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">{item.product.categories[0]?.name}</p>
                      </div>
                      <span className="font-light">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 border border-nude-200 px-2 py-1">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-rose-gold">-</button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-rose-gold">+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <aside className="lg:w-1/3">
          <div className="bg-nude-100/50 p-8 rounded-xl sticky top-32">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 border-b border-nude-200 pb-2">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="uppercase text-[10px] font-bold tracking-widest text-green-600">Complimentary</span>
              </div>
              <div className="border-t border-nude-200 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              to="/checkout"
              className="block w-full text-center bg-luxury-black text-white py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-rose-gold transition-colors"
            >
              Checkout Now
            </Link>
            <p className="mt-4 text-[10px] text-gray-400 text-center tracking-wider">
              Secure payments handled by Stripe & PayPal.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
