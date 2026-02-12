
import React, { useState } from 'react';
import { store } from '../store';
import { User, Order, OrderStatus } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const allOrders = store.getOrders();
  const userOrders = allOrders.filter(o => o.userId === user.id);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case OrderStatus.PROCESSING: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case OrderStatus.COMPLETED: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case OrderStatus.CANCELLED: return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-emerald-500 mb-4 border-2 border-slate-700 shadow-xl">
                {user.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <p className="text-slate-500 text-sm mb-6">{user.phone}</p>
              
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Total Orders</p>
                  <p className="text-lg font-bold text-white">{userOrders.length}</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Level</p>
                  <p className="text-lg font-bold text-emerald-500">Gold</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="glass-card rounded-3xl overflow-hidden border border-slate-800">
            <button className="w-full flex items-center px-6 py-4 bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500 font-bold">
              My Orders
            </button>
            <button className="w-full flex items-center px-6 py-4 text-slate-400 hover:bg-slate-800/50 transition">
              Profile Settings
            </button>
            <button className="w-full flex items-center px-6 py-4 text-slate-400 hover:bg-slate-800/50 transition">
              Help Center
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-orbitron font-bold text-white">Order History</h2>
            <div className="flex space-x-2">
              <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">Recent first</span>
            </div>
          </div>

          {userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div key={order.id} className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center p-2">
                        <img 
                          src="https://pngimg.com/uploads/diamond/diamond_PNG6682.png" 
                          alt="pkg"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-white">{order.packageName}</h4>
                          <span className="text-[10px] text-slate-500 px-2 py-0.5 bg-slate-900 rounded border border-slate-800">{order.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Player ID: <span className="text-slate-300 font-mono">{order.playerUid}</span></p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border mb-2 uppercase tracking-widest ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-lg font-black text-white">৳{order.totalPayable}</p>
                      <p className="text-[10px] text-slate-600 font-medium">
                        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-20 border border-slate-800 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 text-slate-700">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Orders Found</h3>
              <p className="text-slate-500 max-w-sm mb-8">You haven't placed any orders yet. Start topping up your game account today!</p>
              <button className="bg-emerald-500 px-8 py-3 rounded-xl font-bold text-white shadow-xl shadow-emerald-500/20">Go Shop</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
