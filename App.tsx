
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderPage from './pages/OrderPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { Package, User, Order } from './types';
import { store } from './store';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(store.getCurrentUser());

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectPackage = (pkg: Package) => {
    if (!currentUser) {
      setCurrentPage('login');
    } else {
      setSelectedPackage(pkg);
      setCurrentPage('checkout');
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleOrderSuccess = (order: Order) => {
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onSelectPackage={handleSelectPackage} onNavigate={handleNavigate} />;
      case 'topup':
        return <Home onSelectPackage={handleSelectPackage} onNavigate={handleNavigate} />;
      case 'membership':
        return <Home onSelectPackage={handleSelectPackage} onNavigate={handleNavigate} />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      case 'checkout':
        return selectedPackage && currentUser ? (
          <OrderPage pkg={selectedPackage} user={currentUser} onOrderSuccess={handleOrderSuccess} />
        ) : <Home onSelectPackage={handleSelectPackage} onNavigate={handleNavigate} />;
      case 'dashboard':
        return currentUser ? <Dashboard user={currentUser} /> : <Login onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      case 'admin':
        return currentUser?.role === 'ADMIN' ? <AdminPanel /> : <Home onSelectPackage={handleSelectPackage} onNavigate={handleNavigate} />;
      case 'faq':
        return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">FAQ Content coming soon...</div>;
      case 'contact':
        return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">Contact Us Content coming soon...</div>;
      default:
        return <Home onSelectPackage={handleSelectPackage} onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout onNavigate={handleNavigate} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
