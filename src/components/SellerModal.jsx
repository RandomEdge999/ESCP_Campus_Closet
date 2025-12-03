import React from 'react';
import { X, Star, ShieldCheck, Calendar, Award } from 'lucide-react';

const SellerModal = ({ sellerName, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
        <div className="bg-blue-950 h-24 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><X size={20}/></button>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-blue-900">
                    {sellerName.charAt(0)}
                </div>
            </div>
        </div>
        
        <div className="pt-12 pb-6 px-6 text-center">
            <h2 className="text-xl font-bold text-slate-900">{sellerName}</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Master 1 • Batch 2025</p>
            
            <div className="flex justify-center gap-2 mt-3">
                <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                    <ShieldCheck size={10} /> Verified Student
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 border-t border-b border-slate-100 py-4">
                <div>
                    <p className="text-lg font-bold text-slate-900">4.9</p>
                    <div className="flex justify-center text-yellow-400 text-[10px]"><Star size={10} fill="currentColor"/></div>
                    <p className="text-[10px] text-slate-400 mt-1">Rating</p>
                </div>
                <div className="border-l border-slate-100">
                    <p className="text-lg font-bold text-slate-900">12</p>
                    <div className="flex justify-center text-blue-400 text-[10px]"><Award size={10} /></div>
                    <p className="text-[10px] text-slate-400 mt-1">Sales</p>
                </div>
                <div className="border-l border-slate-100">
                    <p className="text-lg font-bold text-slate-900">98%</p>
                    <div className="flex justify-center text-green-500 text-[10px]"><Calendar size={10} /></div>
                    <p className="text-[10px] text-slate-400 mt-1">On Time</p>
                </div>
            </div>

            <div className="mt-6 text-left">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Recent Reviews</h3>
                <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-lg text-xs">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold text-slate-700">Marie L.</span>
                            <span className="text-yellow-500 flex items-center"><Star size={10} fill="currentColor"/> 5.0</span>
                        </div>
                        <p className="text-slate-500">"Item was in perfect condition and dropped off exactly on time."</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-xs">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold text-slate-700">Thomas B.</span>
                            <span className="text-yellow-500 flex items-center"><Star size={10} fill="currentColor"/> 4.8</span>
                        </div>
                        <p className="text-slate-500">"Great blazer, fit perfectly."</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SellerModal;

