
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={
                  <div className="h-screen flex flex-col items-center justify-center">
                    <h1 className="text-9xl font-serif text-nude-100">404</h1>
                    <p className="text-xl font-serif -mt-10 italic">Page Vanished</p>
                    <button onClick={() => window.location.href = '/'} className="mt-8 text-xs font-bold uppercase tracking-widest border-b border-luxury-black">Return Home</button>
                  </div>
                } />
              </Routes>
            </main>
            
            <footer className="bg-white border-t border-nude-100 py-20">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                <div className="col-span-1 md:col-span-1">
                  {/* Fixed: Link component now imported from react-router-dom */}
                  <Link to="/" className="text-3xl font-serif tracking-widest text-luxury-black mb-6 block">LUMIÈRE</Link>
                  <p className="text-gray-400 text-xs leading-relaxed tracking-wide">
                    Elevating the ritual of self-care through meticulously crafted cosmetics and skincare.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Concierge</h4>
                  <ul className="space-y-3 text-xs tracking-wide">
                    <li><Link to="/#about" className="hover:text-rose-gold">Our Heritage</Link></li>
                    <li><Link to="/#faq" className="hover:text-rose-gold">Shipping & Returns</Link></li>
                    <li><Link to="/#contact" className="hover:text-rose-gold">Contact Us</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Explore</h4>
                  <ul className="space-y-3 text-xs tracking-wide">
                    <li><Link to="/shop" className="hover:text-rose-gold">All Products</Link></li>
                    <li><Link to="/shop?category=skincare" className="hover:text-rose-gold">Skincare</Link></li>
                    <li><Link to="/shop?category=makeup" className="hover:text-rose-gold">Cosmetics</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Follow Us</h4>
                  <div className="flex justify-center md:justify-start space-x-6">
                    <a href="#" className="text-gray-400 hover:text-rose-gold"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></a>
                    <a href="#" className="text-gray-400 hover:text-rose-gold"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.35a4.35 4.35 0 110-8.7 4.35 4.35 0 010 8.7zm6.406-11.845a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"/></svg></a>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-nude-100 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                <p>&copy; 2024 Lumière Beauty. Artisanal Brilliance.</p>
                <div className="flex space-x-8 mt-4 md:mt-0">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Use</a>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
