
import React from 'react';
import { Package } from '../types';

interface PackageCardProps {
  pkg: Package;
  onSelect: (pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect }) => {
  return (
    <div 
      className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 group cursor-pointer border border-slate-800 hover:border-emerald-500/50"
      onClick={() => onSelect(pkg)}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center p-3">
          <img 
            src={pkg.type === 'DIAMOND' ? "https://pngimg.com/uploads/diamond/diamond_PNG6682.png" : "https://static.wikia.nocookie.net/freefire/images/b/b3/Monthly_Membership_Icon.png"} 
            alt={pkg.name}
            className="w-full h-full object-contain group-hover:rotate-12 transition-transform"
          />
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
          {pkg.deliveryTime}
        </span>
      </div>
      
      <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-emerald-400 transition">
        {pkg.name}
      </h3>
      
      <div className="space-y-1 mb-6">
        <p className="text-3xl font-black text-white flex items-center">
          <span className="text-emerald-500 text-lg mr-1">৳</span>{pkg.price}
        </p>
        <p className="text-xs text-slate-500 line-through">৳{Math.round(pkg.price * 1.2)}</p>
      </div>

      <button className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold group-hover:bg-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all flex items-center justify-center space-x-2">
        <span>Buy Now</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
    </div>
  );
};

export default PackageCard;
