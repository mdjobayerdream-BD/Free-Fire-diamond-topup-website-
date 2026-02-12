
import React, { useState, useEffect } from 'react';
import { store } from '../store';
import { User, SiteSettings } from '../types';
import { ADMIN_UID } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(store.getCurrentUser());
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());

  const handleLogout = () => {
    store.setCurrentUser(null);
    setCurrentUser(null);
    onNavigate('home');
  };

  // Define marquee as any to bypass JSX intrinsic element check in TypeScript
  const Marquee = 'marquee' as any;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Marquee Notice */}
      <div className="bg-slate-900 border-b border-slate-800 py-2">
        <Marquee className="text-sm font-medium text-emerald-400">
          {settings.noticeText}
        </Marquee>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-950/80 sticky top-0 z-50 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20">
                J
              </div>
              <span className="text-xl font-orbitron font-bold tracking-tighter">
                Jio<span className="text-emerald-500">FF</span>Topup
              </span>
            </div>

            <div className="hidden md:flex space-x-6 items-center">
              <button onClick={() => onNavigate('home')} className={`text-sm font-medium hover:text-emerald-400 transition ${currentPage === 'home' ? 'text-emerald-400' : 'text-slate-300'}`}>Home</button>
              <button onClick={() => onNavigate('topup')} className={`text-sm font-medium hover:text-emerald-400 transition ${currentPage === 'topup' ? 'text-emerald-400' : 'text-slate-300'}`}>Top Up</button>
              <button onClick={() => onNavigate('membership')} className={`text-sm font-medium hover:text-emerald-400 transition ${currentPage === 'membership' ? 'text-emerald-400' : 'text-slate-300'}`}>Membership</button>
              {currentUser ? (
                <>
                  <button onClick={() => onNavigate('dashboard')} className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">Orders</button>
                  {currentUser.uid === ADMIN_UID && (
                    <button onClick={() => onNavigate('admin')} className="px-4 py-2 rounded-full border border-emerald-500/50 text-emerald-400 text-sm font-bold hover:bg-emerald-500/10 transition">Admin Panel</button>
                  )}
                  <button onClick={handleLogout} className="text-sm font-medium text-red-400 hover:text-red-300 transition">Logout</button>
                </>
              ) : (
                <button 
                  onClick={() => onNavigate('login')} 
                  className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20 transition"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center">
                <button onClick={() => onNavigate('menu')} className="text-slate-300 p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-white font-bold">J</div>
                <span className="text-lg font-orbitron font-bold">JioFFTopup</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Leading Free Fire Diamond top-up platform in Bangladesh. Instant delivery, 24/7 support, and the most secure payment system.
              </p>
              <div className="flex space-x-4">
                <a href={`https://wa.me/${settings.whatsapp}`} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 transition border border-slate-800"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.659 1.432 5.168L2 22l4.968-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8.001 8.001 0 01-4.228-1.201l-.304-.178-3.134.824.839-3.056-.196-.333A7.996 7.996 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg></a>
                <a href={`https://t.me/${settings.telegram}`} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-sky-500 transition border border-slate-800"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.37-.49 1.02-.73 4-1.74 6.67-2.88 8.01-3.44 3.81-1.58 4.61-1.85 5.13-1.86.11 0 .37.03.54.17.14.11.18.27.2.37.02.08.03.22.02.32z"/></svg></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><button onClick={() => onNavigate('topup')} className="hover:text-emerald-400 transition">Diamond Topup</button></li>
                <li><button onClick={() => onNavigate('membership')} className="hover:text-emerald-400 transition">Membership</button></li>
                <li><button onClick={() => onNavigate('faq')} className="hover:text-emerald-400 transition">FAQ</button></li>
                <li><button onClick={() => onNavigate('terms')} className="hover:text-emerald-400 transition">Terms & Conditions</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition">Contact Us</button></li>
                <li><button onClick={() => onNavigate('how-to')} className="hover:text-emerald-400 transition">How to Order</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-emerald-400 transition">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; 2024 JioFFTopup Bangladesh. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span> 24/7 Active Service</span>
              <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Secured Payment</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <a 
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-500 rounded-full shadow-2xl flex items-center justify-center text-white transform hover:scale-110 transition duration-300 animate-bounce"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  );
};

export default Layout;
