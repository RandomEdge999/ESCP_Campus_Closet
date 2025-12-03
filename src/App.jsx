import React, { useState, useEffect } from 'react';
import { 
  Lock, User, ArrowRight, Menu, X, Star, Filter, Plus, Search
} from 'lucide-react';

// Components
import Logo from './components/Logo';
import AuthModal from './components/AuthModal';
import ProductModal from './components/ProductModal';
import LockerDashboard from './components/LockerDashboard';
import ListingModal from './components/ListingModal';
import SellerModal from './components/SellerModal'; // Import it

// Data
import { COLLECTIONS } from './data/collections';
import { MOCK_ITEMS } from './data/items';

const App = () => {
  // Load from local storage or use defaults
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cc_items');
    return saved ? JSON.parse(saved) : MOCK_ITEMS;
  });
  
  const [activeTab, setActiveTab] = useState('buy');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // New Search State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null); // New Seller State
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLocker, setShowLocker] = useState(false);
  const [myRentals, setMyRentals] = useState([]);

  // Called when AuthModal validates and approves login
  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleAddItem = (newItem) => {
    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    localStorage.setItem('cc_items', JSON.stringify(updatedItems));
    
    // Optionally switch to 'all' view to see the new item
    setActiveFilter('all');
    // Scroll to marketplace
    document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      setSelectedItem(null);
      setShowAuthModal(true);
      return;
    }
    setMyRentals([...myRentals, item]);
    setSelectedItem(null);
    setTimeout(() => setShowLocker(true), 300);
  };

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = items.filter(item => {
    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(query) || 
             item.tags.some(tag => tag.includes(query)) ||
             item.category.toLowerCase().includes(query);
    }
    
    // Category Filter
    if (activeFilter === 'all') return true;
    return item.tags.includes(activeFilter) || item.category.toLowerCase() === activeFilter;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={handleLogin} // Pass the smarter login handler
      />
      
      <ProductModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        mode={activeTab} 
        onAddToCart={handleAddToCart}
        onViewSeller={(name) => setSelectedSeller(name)} 
      />
      
      <SellerModal
        sellerName={selectedSeller || ''}
        isOpen={!!selectedSeller}
        onClose={() => setSelectedSeller(null)}
      />
      
      <LockerDashboard 
        isOpen={showLocker} 
        onClose={() => setShowLocker(false)} 
        activeRentals={myRentals} 
      />

      <ListingModal
        isOpen={showListingModal}
        onClose={() => setShowListingModal(false)}
        onAddItem={handleAddItem}
      />

      {/* --- Top Bar --- */}
      <div className="bg-blue-950 text-white text-[10px] sm:text-xs py-2.5 text-center font-medium tracking-widest uppercase relative z-50 flex justify-between px-4 sm:justify-center">
        <span>ESCP Champerret Beta • Batch 2025</span>
        <span className="sm:ml-4 text-blue-300 hidden sm:inline">Swap & Share Day: Oct 15th @ Student Lounge</span>
      </div>

      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-40 transition-all duration-500 border-b ${scrolled ? 'bg-white/90 backdrop-blur-md border-slate-200 py-3' : 'bg-white border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <Logo className="w-9 h-9 text-blue-950" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-blue-950 leading-none">CampusCloset</span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5 group-hover:text-blue-600 transition-colors">Closet Meets Campus</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Search Bar */}
            <div className="relative group">
               <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); if(e.target.value) setActiveFilter('all'); }}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none w-32 focus:w-48 transition-all"
               />
               <Search size={16} className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-900 transition-colors"/>
            </div>

            <a href="#collections" className="text-sm font-medium text-slate-500 hover:text-blue-900 transition-colors">Collections</a>
            <a href="#marketplace" className="text-sm font-medium text-slate-500 hover:text-blue-900 transition-colors">Marketplace</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-500 hover:text-blue-900 transition-colors">Locker System</a>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                 <button 
                  onClick={() => setShowListingModal(true)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <Plus size={14} /> List Item
                </button>
                <button onClick={() => setShowLocker(true)} className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-900 transition group">
                  <div className="relative">
                    <Lock size={18} className="group-hover:text-blue-600 transition"/>
                    {myRentals.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                  </div>
                </button>
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs cursor-help" title="Student Verified">AS</div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="px-5 py-2.5 bg-blue-950 text-white rounded-lg text-sm font-bold hover:bg-blue-900 transition shadow-lg hover:shadow-xl shadow-blue-900/10 flex items-center gap-2">
                <User size={16} /> Connect ID
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <a 
                href="#collections" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition"
              >
                Curated Collections
              </a>
              <a 
                href="#marketplace" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition"
              >
                Marketplace
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition"
              >
                Locker System
              </a>
              
              <div className="pt-4 border-t border-slate-100 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <button 
                      onClick={() => { setShowListingModal(true); setIsMenuOpen(false); }}
                      className="w-full py-3 px-4 bg-slate-900 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> List an Item
                    </button>
                    <button 
                      onClick={() => { setShowLocker(true); setIsMenuOpen(false); }}
                      className="w-full py-3 px-4 bg-blue-50 text-blue-900 font-bold rounded-lg flex items-center justify-center gap-2"
                    >
                      <Lock size={16} /> My Locker
                      {myRentals.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{myRentals.length}</span>}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }}
                    className="w-full py-3 px-4 bg-blue-950 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                  >
                    <User size={16} /> Connect Student ID
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/50 mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wide">Live at Champerret Campus</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.05] mb-8 font-serif tracking-tight">
                Wear it today. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                  Return it tomorrow.
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-light">
                The student-exclusive marketplace solving the <strong>Luggage-Wardrobe Dilemma</strong>. 
                Zero shipping fees. Secure 3rd floor lockers. Verified community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#marketplace" className="px-8 py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center shadow-xl shadow-slate-900/10">
                  Start Renting <ArrowRight size={18} className="ml-2" />
                </a>
                <button 
                  onClick={() => isAuthenticated ? setShowListingModal(true) : setShowAuthModal(true)} 
                  className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-lg font-bold hover:border-blue-900 hover:bg-blue-50 transition"
                >
                  List Item
                </button>
              </div>

              {/* Stats Section - Mobile Responsive */}
              <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">42%</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide mt-1">Lower CO₂</p>
                </div>
                <div className="text-center sm:text-left border-l border-slate-200 pl-4">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">0€</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide mt-1">Shipping</p>
                </div>
                <div className="text-center sm:text-left border-l border-slate-200 pl-4">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">300+</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide mt-1">Students</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative hidden sm:flex h-full min-h-[400px] lg:min-h-[500px] items-center justify-center">
               {/* Hero Card - Hidden on very small screens */}
               <div className="relative w-full max-w-sm lg:max-w-md">
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-2xl border border-slate-100 transform -rotate-3 hover:rotate-0 transition duration-700 ease-out z-20 relative">
                  <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600" className="rounded-lg aspect-[4/5] object-cover w-full mb-3 sm:mb-4 grayscale-[20%] hover:grayscale-0 transition duration-700" alt="Fashion item"/>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Gala Ready</p>
                      <p className="font-serif font-bold text-lg sm:text-xl text-slate-900">Silk Gown</p>
                    </div>
                    <span className="bg-blue-50 text-blue-900 px-2 sm:px-3 py-1 rounded font-bold text-xs sm:text-sm">€25/day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Collections Section --- */}
      <section id="collections" className="py-12 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Curated Collections</h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-lg">Tailored for the ESCP calendar. From study sessions to the Winter Gala.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {COLLECTIONS.map((collection, idx) => (
              <div 
                key={collection.id} 
                onClick={() => { setActiveFilter(collection.id); document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' }); }}
                className={`group cursor-pointer relative overflow-hidden rounded-xl h-48 sm:h-80 ${activeFilter === collection.id ? 'ring-2 ring-blue-900 ring-offset-2 sm:ring-offset-4' : ''}`}
              >
                <img src={collection.image} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-1000 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-4 sm:p-8 flex flex-col justify-end">
                  <span className="text-yellow-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">Collection 0{idx+1}</span>
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-serif mb-0.5 sm:mb-1">{collection.label}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light">{collection.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Marketplace --- */}
      <section id="marketplace" className="py-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 sm:mb-12 gap-6 border-b border-slate-100 pb-6 sm:pb-8">
            <div className="w-full md:w-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif mb-3">Marketplace</h2>
              {/* Dynamic Filter Tags - Scrollable on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
                <button onClick={() => setActiveFilter('all')} className={`px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide transition whitespace-nowrap flex-shrink-0 ${activeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>All Items</button>
                {['gala', 'interview', 'essentials'].map(filter => (
                  <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide transition whitespace-nowrap flex-shrink-0 ${activeFilter === filter ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Rent/Buy Toggle - Full width on mobile */}
            <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-lg w-full sm:w-auto">
              <button onClick={() => setActiveTab('rent')} className={`flex-1 sm:flex-none px-6 sm:px-8 py-2.5 rounded-md text-sm font-bold transition flex items-center justify-center ${activeTab === 'rent' ? 'bg-white text-blue-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>Rent</button>
              <button onClick={() => setActiveTab('buy')} className={`flex-1 sm:flex-none px-6 sm:px-8 py-2.5 rounded-md text-sm font-bold transition flex items-center justify-center ${activeTab === 'buy' ? 'bg-white text-blue-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>Buy</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredItems.map((item) => (
              <div key={item.id} onClick={() => setSelectedItem(item)} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-100 mb-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                  
                  {/* Badges Logic */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.tags.includes('gala') && <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm">Gala Edit</span>}
                    {/* Show deposit requirement on Rent tab */}
                    {activeTab === 'rent' && <span className="bg-blue-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm">Dep: €{item.deposit}</span>}
                  </div>

                  <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition duration-300">
                    <button className="w-full bg-white/95 backdrop-blur text-slate-900 font-bold py-3 rounded shadow-lg text-xs uppercase tracking-wider hover:bg-blue-900 hover:text-white transition-colors">
                      {activeTab === 'rent' ? 'Rent Now' : 'Buy Now'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{item.seller} • {item.sellerYear}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg font-bold text-slate-900">€{activeTab === 'rent' ? item.priceRent : item.priceBuy}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">{activeTab === 'rent' ? 'per day' : 'buy now'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section id="how-it-works" className="py-24 bg-blue-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold font-serif mb-6">The Closed-Loop System</h2>
              <p className="text-blue-200 text-lg leading-relaxed mb-8 font-light">
                We've replaced shipping with trust. Our locker system at Champerret Campus ensures items are exchanged securely, without the need for coordinating schedules or awkward meetups.
              </p>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-blue-700 flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold text-xl">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Book & Deposit</h4>
                    <p className="text-blue-300 text-sm">Secure your item with a tiered deposit (€10, €30, or €75) based on item value.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-blue-700 flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold text-xl">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Locker Drop-off</h4>
                    <p className="text-blue-300 text-sm">Seller places the item in the 3rd Floor Lockers. You receive a secure QR code instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-blue-700 flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold text-xl">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Scan & Slay</h4>
                    <p className="text-blue-300 text-sm">Collect at your convenience. Return to the same locker when your rental period ends.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-2xl border border-blue-800 shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-blue-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs font-mono text-blue-400">locker_sys.v1</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-blue-900/50 p-4 rounded-lg border border-blue-800">
                    <span className="text-sm font-bold text-blue-100">Locker 42 - Champerret</span>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded uppercase tracking-wider">Occupied</span>
                  </div>
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🔐</div>
                    <p className="text-xs text-blue-400 font-mono">SCAN TO UNLOCK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white text-slate-900 py-12 sm:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Logo className="text-blue-950 w-7 h-7 sm:w-8 sm:h-8"/> 
                <span className="text-lg sm:text-xl font-bold tracking-tight text-blue-950">CampusCloset</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 sm:mb-6">
                The first circular economy marketplace verified for ESCP Business School.
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] sm:text-xs font-bold text-blue-900 uppercase tracking-wide">Beta Live</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-400 mb-4 sm:mb-6">Founding Team</h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium text-slate-700">
                <li>Nayab Azhar</li>
                <li>Antonio Santarsiere</li>
                <li>Ina Angebault</li>
                <li>Benedetta Bertin</li>
                <li>Benedikt Bodman</li>
                <li>Kylie Baradeau</li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-400 mb-4 sm:mb-6">Campus Location</h4>
              <div className="flex items-start mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm text-slate-600">
                  ESCP Business School<br/>
                  Champerret Campus<br/>
                  6 Ave de la Porte de Champerret<br/>
                  75017 Paris, France
                </span>
              </div>
              <div className="flex items-center text-slate-600">
                <Lock size={14} className="mr-2 flex-shrink-0"/>
                <span className="text-xs sm:text-sm">3rd Floor Lockers (Hall B)</span>
              </div>
            </div>

            <div className="hidden sm:block">
              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-400 mb-4 sm:mb-6">Support</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-900 transition">How Deposits Work</a></li>
                <li><a href="#" className="hover:text-blue-900 transition">Locker Access Guide</a></li>
                <li><a href="#" className="hover:text-blue-900 transition">Sustainability Report</a></li>
                <li><a href="#" className="hover:text-blue-900 transition">Contact Student Admin</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs text-slate-400 gap-2">
            <p>&copy; 2025 CampusCloset Project. All rights reserved.</p>
            <div>
              Built with purpose in Paris.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;