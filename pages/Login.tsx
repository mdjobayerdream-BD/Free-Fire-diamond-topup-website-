
import React, { useState } from 'react';
import { store } from '../store';
import { User } from '../types';
import { ADMIN_UID } from '../constants';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    uid: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Demo logic: Find user by phone
      const users = store.getUsers();
      let user = users.find(u => u.phone === formData.phone);
      
      // Special check for Admin Login via UID
      if (formData.uid === ADMIN_UID) {
        user = {
          id: 'admin-' + Date.now(),
          uid: ADMIN_UID,
          name: 'Super Admin',
          phone: formData.phone || '01619789895',
          role: 'ADMIN'
        };
      }

      if (user) {
        store.setCurrentUser(user);
        onLoginSuccess(user);
      } else {
        setError('User not found. Please register.');
      }
    } else {
      // Registration
      if (!formData.name || !formData.phone) {
        setError('Please fill all fields');
        return;
      }
      
      const newUser: User = {
        id: 'u-' + Date.now(),
        uid: formData.uid || '',
        name: formData.name,
        phone: formData.phone,
        role: 'USER'
      };

      store.setCurrentUser(newUser);
      onLoginSuccess(newUser);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Aesthetic background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-400 text-sm">
              {isLogin ? 'Login to your account to track orders' : 'Join JioFFTopup community today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
              <input 
                type="tel"
                required
                placeholder="01XXXXXXXXX"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                Admin UID <span className="text-[10px] normal-case text-slate-600">(Only for Admin)</span>
              </label>
              <input 
                type="text"
                placeholder="Enter UID for Admin login"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition"
                value={formData.uid}
                onChange={(e) => setFormData({...formData, uid: e.target.value})}
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 rounded-xl text-white font-bold text-lg shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 text-emerald-400 font-bold hover:underline"
              >
                {isLogin ? 'Register Now' : 'Login Now'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
