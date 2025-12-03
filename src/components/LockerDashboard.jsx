import React from 'react';
import { Lock, X, QrCode, ShoppingBag, History } from 'lucide-react';

const LockerDashboard = ({ isOpen, onClose, activeRentals }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
        <div className="bg-blue-950 p-6 flex justify-between items-center text-white">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock size={18} className="text-yellow-400"/>
              <h2 className="text-lg font-bold">Locker Hub</h2>
            </div>
            <p className="text-blue-200 text-xs">Champerret Campus • 3rd Floor</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition">
            <X size={24}/>
          </button>
        </div>
        
        <div className="p-6 bg-slate-50 min-h-[300px]">
          {activeRentals.length > 0 ? (
            activeRentals.map(item => (
              <div 
                key={item.id} 
                className="bg-white border border-slate-200 rounded-xl p-4 mb-4 shadow-sm flex items-center relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover mr-4 shadow-inner"/>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded tracking-wide">
                      Ready for Pickup
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Code expires in 24h</p>
                </div>
                <div className="flex flex-col items-center justify-center pl-4 border-l border-slate-100">
                  <QrCode size={40} className="text-slate-900 mb-1"/>
                  <span className="text-[10px] font-mono font-bold text-slate-400">#8X29</span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                <ShoppingBag className="text-slate-300 w-8 h-8"/>
              </div>
              <h3 className="text-slate-900 font-bold mb-1">No active rentals</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">
                Items you rent or buy will appear here with their pickup codes.
              </p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white border-t border-slate-100 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
            <History size={12}/>
            <span>History: 0 Transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockerDashboard;

