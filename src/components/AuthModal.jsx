import React, { useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import Logo from './Logo';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  // Hooks MUST be called before any early returns!
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Early return AFTER hooks
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Strict domain validation
    const escpRegex = /^[a-zA-Z0-9._%+-]+@edu\.escp\.eu$/;
    
    if (escpRegex.test(email) || email.endsWith('@edu.escp.eu')) {
      onLogin(email);
    } else {
      setError('Access restricted. You must use a valid @edu.escp.eu student email.');
    }
  };
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden ring-1 ring-slate-900/5">
        <div className="bg-blue-950 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <Logo className="w-14 h-14 mx-auto mb-4 text-white relative z-10" />
          <h2 className="text-2xl font-bold font-serif tracking-tight relative z-10">Student Access</h2>
          <p className="text-blue-200 text-sm mt-2 relative z-10">Closed-Loop Verification</p>
        </div>
        <div className="p-8">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start">
            <ShieldCheck className="text-blue-700 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>CampusCloset is exclusive to ESCP.</strong><br/>
              Please authenticate with your student credentials to access the marketplace and locker codes.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ESCP Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="student@edu.escp.eu" 
                className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition text-sm font-medium ${error ? 'border-red-500' : 'border-slate-200'}`}
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition text-sm font-medium" 
                required 
              />
            </div>
            
            {error && (
              <div className="flex items-center text-red-600 text-xs font-bold animate-in slide-in-from-top-1">
                <AlertCircle size={14} className="mr-2"/> {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-4 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              Secure Login
            </button>
          </form>
          <button 
            onClick={onClose} 
            className="w-full mt-6 text-sm text-slate-400 hover:text-slate-600 font-medium"
          >
            Return to Browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
