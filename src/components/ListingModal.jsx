import React, { useState } from 'react';
import { X, Upload, Info } from 'lucide-react';

const ListingModal = ({ isOpen, onClose, onAddItem }) => {
  // Hooks MUST be called before any early returns!
  const [formData, setFormData] = useState({
    title: '',
    category: 'Casual',
    size: 'M',
    priceBuy: '',
    priceRent: '',
    description: '',
    image: '', // Start empty
    condition: 'Good'
  });

  // Early return AFTER hooks
  if (!isOpen) return null;

  // Business Plan Logic: Tiered Deposits 
  const getSuggestedDeposit = (cat) => {
    if (cat === 'Formal' || cat === 'Gala') return 75;
    if (cat === 'Outerwear' || cat === 'Coat') return 30;
    return 10;
  };

  const handleSimulateUpload = () => {
    // Simulates uploading an image by picking a random fashion image from Unsplash
    const images = [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?auto=format&fit=crop&q=80&w=800"
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setFormData({...formData, image: randomImage});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const deposit = getSuggestedDeposit(formData.category);
    
    const newItem = {
      id: Date.now(),
      ...formData,
      // Use placeholder if no image provided
      image: formData.image || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
      priceBuy: Number(formData.priceBuy),
      priceRent: Number(formData.priceRent),
      deposit: deposit,
      tags: [formData.category.toLowerCase(), 'new-arrival'],
      seller: "You (Student)",
      sellerRating: 5.0,
      sellerYear: "Batch 2025",
    };

    onAddItem(newItem);
    // Reset form
    setFormData({
      title: '',
      category: 'Casual',
      size: 'M',
      priceBuy: '',
      priceRent: '',
      description: '',
      image: '',
      condition: 'Good'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-blue-950 p-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-xl font-bold font-serif">List an Item</h2>
            <p className="text-blue-200 text-xs">Earn money from your unused wardrobe</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition"><X size={24}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Item Title</label>
            <input 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm"
              placeholder="e.g. Navy Blue Blazer"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Item Photo</label>
            <div className="flex gap-2">
              <input 
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                placeholder="Paste Image URL..."
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
              <button 
                type="button"
                onClick={handleSimulateUpload}
                className="px-4 py-2 bg-slate-200 text-slate-600 text-xs font-bold uppercase rounded-lg hover:bg-slate-300 transition"
              >
                Upload
              </button>
            </div>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-3 w-full h-32 object-cover rounded-lg border border-slate-200" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Casual">Casual / Essentials</option>
                <option value="Formal">Formal / Gala</option>
                <option value="Outerwear">Coats / Outerwear</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Condition</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm"
                value={formData.condition}
                onChange={e => setFormData({...formData, condition: e.target.value})}
              >
                <option value="New">Brand New (A)</option>
                <option value="Like New">Like New (A-)</option>
                <option value="Good">Good (B)</option>
                <option value="Fair">Fair (C)</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <Info size={16} className="text-blue-900 mt-0.5" />
              <div className="text-xs text-blue-800">
                <span className="font-bold">Smart Deposit:</span> Based on the <strong>{formData.category}</strong> category, 
                we will automatically set the borrower deposit to <strong>€{getSuggestedDeposit(formData.category)}</strong>.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rent Price / Day</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400">€</span>
                <input 
                  type="number" required min="1"
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                  placeholder="5"
                  value={formData.priceRent}
                  onChange={e => setFormData({...formData, priceRent: e.target.value})}
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Buy Price</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400">€</span>
                <input 
                  type="number" required min="1"
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                  placeholder="25"
                  value={formData.priceBuy}
                  onChange={e => setFormData({...formData, priceBuy: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-xl flex justify-center items-center gap-2">
            <Upload size={18} /> Publish to Market
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListingModal;
