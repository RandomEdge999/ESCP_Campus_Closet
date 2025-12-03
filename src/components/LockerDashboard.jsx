import React, { useState, useEffect } from 'react';
import { Lock, X, QrCode, ShoppingBag, CheckCircle, Clock } from 'lucide-react';

const LockerDashboard = ({ isOpen, onClose, activeRentals }) => {
  if (!isOpen) return null;

  // Simulate expiry countdown
  const [expiry, setExpiry] = useState("23:59:59");

  // State to track which items are "picked up"
  const [collectedItems, setCollectedItems] = useState([]);

  const handlePickup = (id) => {
    setCollectedItems([...collectedItems, id]);
  };
  
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
        
        <div className="p-6 bg-slate-50 min-h-[300px] overflow-y-auto max-h-[60vh]">
          {activeRentals.length > 0 ? (
            activeRentals.map(item => {
              const isCollected = collectedItems.includes(item.id);
              
              return (
                <div 
                  key={item.id} 
                  className={`bg-white border rounded-xl p-4 mb-4 shadow-sm relative overflow-hidden transition-all ${isCollected ? 'border-green-200 bg-green-50' : 'border-slate-200'}`}
                >
                  {!isCollected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 animate-pulse"></div>}
                  
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover shadow-inner"/>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          {isCollected ? (
                             <span className="px-2 py-0.5 bg-green-200 text-green-800 text-[10px] font-bold uppercase rounded tracking-wide flex items-center gap-1">
                               <CheckCircle size={10} /> Picked Up
                             </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase rounded tracking-wide flex items-center gap-1">
                              <Clock size={10} /> Ready for Pickup
                            </span>
                          )}
                        </div>
                        {!isCollected && <p className="text-xs text-slate-500 mt-2">Locker B{item.id}</p>}
                      </div>
                    </div>

                    {!isCollected && (
                      <div className="flex flex-col items-center">
                         <QrCode size={40} className="text-slate-900 mb-2"/>
                         <button 
                          onClick={() => handlePickup(item.id)}
                          className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded hover:bg-blue-900 transition"
                         >
                           Simulate Scan
                         </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                <ShoppingBag className="text-slate-300 w-8 h-8"/>
              </div>
              <h3 className="text-slate-900 font-bold mb-1">Your locker is empty</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">
                Items you rent or buy will appear here with their pickup QR codes.
              </p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white border-t border-slate-100 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
            <Lock size={12}/>
            <span>Codes expire in 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockerDashboard;