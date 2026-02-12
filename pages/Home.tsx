
import React, { useState } from 'react';
import { store } from '../store';
import { Package, PackageType } from '../types';
import PackageCard from '../components/PackageCard';

interface HomeProps {
  onSelectPackage: (pkg: Package) => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectPackage, onNavigate }) => {
  const packages = store.getPackages();
  const [filter, setFilter] = useState<PackageType>(PackageType.DIAMOND);

  const filteredPackages = packages.filter(p => p.type === filter);

  return (
    <div className="pb-20">
      {/* Hero Slider Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/seed/gaming/1920/1080" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 md:px-20 max-w-7xl mx-auto">
          <div className="inline-block px-3 py-1 bg-emerald-500 rounded-full text-[10px] md:text-xs font-bold text-white mb-4 uppercase tracking-[0.2em]">
            Limited Time Offer: Extra 10% Diamonds
          </div>
          <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white leading-tight mb-6">
            LEVEL UP YOUR <br/>
            <span className="text-emerald-500 neon-text-green">GAMEPLAY</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-lg max-w-lg mb-8">
            Instant delivery of Free Fire Diamonds & Memberships. The fastest and most reliable top-up service in Bangladesh.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => onNavigate('topup')}
              className="px-8 py-4 bg-emerald-500 rounded-xl font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-105 transition"
            >
              Start Topup
            </button>
            <button 
              onClick={() => onNavigate('how-to')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-bold text-white border border-white/20 hover:bg-white/20 transition"
            >
              How to Order?
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: '50K+', color: 'emerald' },
            { label: 'Happy Gamers', value: '12K+', color: 'blue' },
            { label: 'Avg Delivery', value: '3 Min', color: 'amber' },
            { label: 'Support', value: '24/7', color: 'purple' }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black font-orbitron text-white mb-1">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Store Categories */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-orbitron font-black text-white mb-2">
              GAME <span className="text-emerald-500">STORE</span>
            </h2>
            <p className="text-slate-400 text-sm">Select your preferred package from our collection</p>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-xl">
            <button 
              onClick={() => setFilter(PackageType.DIAMOND)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${filter === PackageType.DIAMOND ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Diamonds
            </button>
            <button 
              onClick={() => setFilter(PackageType.MEMBERSHIP)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${filter === PackageType.MEMBERSHIP ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Memberships
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelectPackage} />
          ))}
        </div>
      </section>

      {/* How to Order Steps */}
      <section className="max-w-7xl mx-auto px-4 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-orbitron font-black text-white mb-4">EASY ORDERING PROCESS</h2>
          <p className="text-slate-400">Follow these 3 simple steps to top up your account</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: '01', title: 'Choose Package', desc: 'Select the diamonds or membership package you want from our store.' },
            { step: '02', title: 'Payment Info', desc: 'Enter your Player ID and pay through bKash or Nagad safely.' },
            { step: '03', title: 'Get Diamonds', desc: 'Once verified, your diamonds will be delivered to your game account instantly.' }
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="text-6xl font-orbitron font-black text-slate-900 group-hover:text-emerald-500/10 transition absolute -top-10 -left-4">
                {item.step}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
