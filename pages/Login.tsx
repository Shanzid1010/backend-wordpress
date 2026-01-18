
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-cream/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-2xl shadow-xl shadow-nude-100/50"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Welcome Back</h1>
          <p className="text-gray-400 text-sm tracking-wide">Enter your details to access your luxury sanctuary.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Username or Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-nude-200 py-3 outline-none focus:border-rose-gold transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-nude-200 py-3 outline-none focus:border-rose-gold transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-luxury-black text-white py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-rose-gold transition-colors shadow-lg ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-nude-100">
          <p className="text-sm text-gray-500 mb-2">New to Lumière?</p>
          <Link to="/register" className="text-xs uppercase font-bold tracking-[0.2em] text-rose-gold hover:text-luxury-black transition-colors">
            Create an Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
