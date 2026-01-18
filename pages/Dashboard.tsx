
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/services';
import { Order } from '../types';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      if (user?.id) {
        const data = await authService.getOrders(user.id);
        setOrders(data);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user, isAuthenticated, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-serif">Hello, {user?.first_name || user?.username}</h1>
          <p className="text-gray-400 tracking-widest text-xs uppercase mt-2">Personal Sanctuary Dashboard</p>
        </div>
        <button 
          onClick={() => { logout(); navigate('/'); }}
          className="text-xs uppercase font-bold tracking-widest text-red-500 border border-red-500 px-6 py-2 hover:bg-red-500 hover:text-white transition-all"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-serif mb-6">Recent Orders</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-nude-100">
            {loading ? (
              <div className="p-8 text-center italic text-gray-400">Retrieving your history...</div>
            ) : orders.length > 0 ? (
              <table className="w-full">
                <thead className="bg-nude-50 border-b border-nude-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-[10px] uppercase font-bold tracking-widest text-gray-400">Order ID</th>
                    <th className="px-6 py-4 text-left text-[10px] uppercase font-bold tracking-widest text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-[10px] uppercase font-bold tracking-widest text-gray-400">Date</th>
                    <th className="px-6 py-4 text-right text-[10px] uppercase font-bold tracking-widest text-gray-400">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nude-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-nude-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">#{order.id}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">{order.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.date_created).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold">${order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <p className="text-gray-400 mb-6 italic">No order history found yet.</p>
                <button onClick={() => navigate('/shop')} className="text-xs font-bold uppercase tracking-widest text-rose-gold border-b border-rose-gold">Start a Collection</button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-serif mb-6">Account Details</h2>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-nude-100">
             <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Display Name</p>
                  <p className="text-sm">{user?.username}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Email Address</p>
                  <p className="text-sm">{user?.email}</p>
                </div>
                <div className="pt-6 border-t border-nude-100">
                  <button className="text-[10px] uppercase font-bold tracking-widest text-rose-gold hover:text-luxury-black transition-colors">Update Information</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
