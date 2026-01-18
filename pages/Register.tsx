
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-cream/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white p-12 rounded-2xl shadow-xl shadow-nude-100/50"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Create Your Profile</h1>
          <p className="text-gray-400 text-sm tracking-wide">Join the Lumière circle for exclusive benefits and personalized rituals.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border-b border-nude-200 py-3 outline-none focus:border-rose-gold transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border-b border-nude-200 py-3 outline-none focus:border-rose-gold transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b border-nude-200 py-3 outline-none focus:border-rose-gold transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-nude-200 py-3 outline-none focus:border-rose-gold transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-nude-200 py-3 outline-none focus:border-rose-gold transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-luxury-black text-white py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-rose-gold transition-colors shadow-lg ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-nude-100">
          <p className="text-sm text-gray-500 mb-2">Already have an account?</p>
          <Link to="/login" className="text-xs uppercase font-bold tracking-[0.2em] text-rose-gold hover:text-luxury-black transition-colors">
            Sign In Instead
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
