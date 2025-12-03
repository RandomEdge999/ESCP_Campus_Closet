import React from 'react';
import { X, User, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

const ProductModal = ({ item, isOpen, onClose, mode, onAddToCart, onViewSeller }) => {
  if (!isOpen || !item) return null;

  const total = mode === 'rent' ? item.priceRent + item.deposit : item.priceBuy;
  // Calculation based on business plan: 4% buy fee, 2% rent fee
  const fees = (mode === 'rent' ? item.priceRent * 0.02 : item.priceBuy * 0.04).toFixed(2);
  const feeLabel = mode === 'rent' ? '2% Platform Fee' : '4% Platform Fee';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end sm:justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh]">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-slate-100 relative group h-64 md:h-auto">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-full md:hidden text-slate-900 shadow-sm z-20"
          >
            <ArrowRight className="rotate-180" size={20}/>
          </button>
          <div className="absolute bottom-6 left-6 text-white hidden md:block">
            <p className="text-sm font-medium opacity-90">{item.category}</p>
            <div className="flex items-center gap-2 mt-2">
              {item.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-0.5 border border-white/30 rounded text-[10px] uppercase tracking-wider backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col h-full bg-white overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">{item.title}</h2>
              <div className="flex items-center space-x-3 text-sm text-slate-500 mt-2">
                <button 
                  onClick={() => onViewSeller(item.seller)}
                  className="flex items-center text-blue-900 font-semibold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition"
                >
                  <User size={14} className="mr-1.5"/> {item.seller}
                </button>
                <span>{item.sellerYear}</span>
              </div>
            </div>
            <button onClick={onClose} className="hidden md:block text-slate-300 hover:text-slate-600 transition">
              <X size={28} />
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 text-sm sm:text-base border-l-2 border-blue-900 pl-4 italic">
            "{item.description}"
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8 space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600 font-medium">{mode === 'rent' ? 'Daily Rental Rate' : 'Purchase Price'}</span>
              <span className="text-xl font-bold text-slate-900">€{mode === 'rent' ? item.priceRent : item.priceBuy}</span>
            </div>
            
            {mode === 'rent' && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-1">
                  Security Deposit 
                  <span 
                    className="bg-slate-200 text-slate-500 text-[10px] rounded-full w-4 h-4 flex items-center justify-center cursor-help" 
                    title="Refunded upon return"
                  >
                    ?
                  </span>
                </span>
                <span className="font-semibold text-slate-700">€{item.deposit}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">{feeLabel}</span>
              <span className="font-semibold text-slate-700">€{fees}</span>
            </div>

            <div className="pt-3 flex justify-between items-center">
              <span className="text-slate-900 font-bold text-sm uppercase tracking-wide">Total Due</span>
              <span className="text-3xl font-bold text-blue-900 font-serif">€{(total + parseFloat(fees)).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <button 
              onClick={() => onAddToCart(item)} 
              className="w-full py-4 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition-all shadow-lg hover:shadow-blue-900/20 flex justify-center items-center text-sm uppercase tracking-wide"
            >
              {mode === 'rent' ? 'Book Dates & Pay' : 'Buy Now'}
              <ArrowRight size={18} className="ml-2" />
            </button>
            
            <div className="flex justify-center items-center text-[10px] text-slate-400 gap-4 mt-4">
              <span className="flex items-center"><ShieldCheck size={12} className="mr-1"/> Verified Student</span>
              <span className="flex items-center"><Lock size={12} className="mr-1"/> Secure Locker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

