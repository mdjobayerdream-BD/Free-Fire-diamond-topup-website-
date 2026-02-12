
import React, { useState, useEffect } from 'react';
import { store } from '../store';
import { Package, Order, OrderStatus, User } from '../types';

interface OrderPageProps {
  pkg: Package;
  user: User;
  onOrderSuccess: (order: Order) => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ pkg, user, onOrderSuccess }) => {
  const settings = store.getSettings();
  const serviceCharge = Math.ceil((pkg.price * settings.serviceChargePercent) / 100);
  const totalPayable = pkg.price + serviceCharge;

  const [formData, setFormData] = useState({
    playerUid: '',
    playerName: '',
    paymentMethod: 'bKash',
    senderNumber: '',
    transactionId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newOrder: Order = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: user.id,
        playerUid: formData.playerUid,
        playerName: formData.playerName,
        packageId: pkg.id,
        packageName: pkg.name,
        amount: pkg.amount,
        price: pkg.price,
        serviceCharge,
        totalPayable,
        paymentMethod: formData.paymentMethod,
        senderNumber: formData.senderNumber,
        transactionId: formData.transactionId,
        status: OrderStatus.PENDING,
        createdAt: new Date().toISOString()
      };

      store.addOrder(newOrder);
      onOrderSuccess(newOrder);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-3xl p-8 border border-slate-800 sticky top-24">
            <h2 className="text-xl font-orbitron font-bold text-white mb-6">Order Summary</h2>
            <div className="flex items-center p-4 bg-slate-900 rounded-2xl mb-6">
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center p-2 mr-4">
                 <img 
                    src={pkg.type === 'DIAMOND' ? "https://pngimg.com/uploads/diamond/diamond_PNG6682.png" : "https://static.wikia.nocookie.net/freefire/images/b/b3/Monthly_Membership_Icon.png"} 
                    alt={pkg.name}
                    className="w-full h-full object-contain"
                  />
              </div>
              <div>
                <h4 className="font-bold text-white">{pkg.name}</h4>
                <p className="text-xs text-slate-500">Delivery: {pkg.deliveryTime}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Package Price</span>
                <span className="text-white font-bold">৳{pkg.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Service Charge (5%)</span>
                <span className="text-white font-bold">৳{serviceCharge}</span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between">
                <span className="text-lg font-bold text-white">Total Amount</span>
                <span className="text-2xl font-black text-emerald-500">৳{totalPayable}</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
              <p className="text-xs text-emerald-400 font-medium leading-relaxed">
                * Please double check your Player ID. Diamonds will be sent to the ID provided. Wrong UID = No Refund.
              </p>
            </div>
          </div>
        </div>

        {/* Payment & Info Form */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Game Account */}
            <div className="glass-card rounded-3xl p-8 border border-slate-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">1</div>
                <h3 className="text-lg font-orbitron font-bold text-white">GAME DETAILS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Player UID</label>
                  <input 
                    required
                    type="text"
                    placeholder="Enter Game UID"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition"
                    value={formData.playerUid}
                    onChange={(e) => setFormData({...formData, playerUid: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Account Name (Optional)</label>
                  <input 
                    type="text"
                    placeholder="Enter Account Name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition"
                    value={formData.playerName}
                    onChange={(e) => setFormData({...formData, playerName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="glass-card rounded-3xl p-8 border border-slate-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">2</div>
                <h3 className="text-lg font-orbitron font-bold text-white">PAYMENT INFORMATION</h3>
              </div>
              
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select Payment Method</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['bKash', 'Nagad', 'Binance'].map(method => (
                    <div 
                      key={method}
                      onClick={() => setFormData({...formData, paymentMethod: method})}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${formData.paymentMethod === method ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}
                    >
                      <img 
                        src={method === 'bKash' ? "https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg" : method === 'Nagad' ? "https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg" : "https://www.logo.wine/a/logo/Binance/Binance-Logo.wine.svg"} 
                        alt={method}
                        className="h-8 object-contain"
                      />
                      <span className="text-xs font-bold text-white">{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-8">
                <h4 className="text-emerald-400 font-bold mb-4 flex items-center">
                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                   Payment Instructions
                </h4>
                <div className="space-y-3 text-sm">
                  <p className="text-slate-300">1. Go to your {formData.paymentMethod} App or Dial USSD.</p>
                  <p className="text-slate-300">2. Choose "Send Money" or "Transfer".</p>
                  <p className="text-slate-300">3. Pay <span className="text-white font-bold">৳{totalPayable}</span> to: 
                    <span className="ml-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold border border-emerald-500/30">
                      {formData.paymentMethod === 'bKash' ? settings.bkashNumber : formData.paymentMethod === 'Nagad' ? settings.nagadNumber : settings.binanceId}
                    </span>
                  </p>
                  <p className="text-slate-300">4. Copy the <span className="text-white font-bold">Transaction ID</span> and paste it below.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Sender Phone Number</label>
                  <input 
                    required
                    type="tel"
                    placeholder="From which number you paid"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition"
                    value={formData.senderNumber}
                    onChange={(e) => setFormData({...formData, senderNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Transaction ID (TrxID)</label>
                  <input 
                    required
                    type="text"
                    placeholder="Paste Transaction ID here"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition"
                    value={formData.transactionId}
                    onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl text-white font-black text-xl shadow-2xl transition-all flex items-center justify-center space-x-3 ${isSubmitting ? 'bg-slate-700 cursor-not-allowed' : 'bg-emerald-500 hover:scale-[1.01] shadow-emerald-500/20 active:scale-95'}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Verifying Payment...</span>
                </>
              ) : (
                <>
                  <span>Place Order Now</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
