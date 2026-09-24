import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { currentPath, navigate, currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single element brand wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:bg-teal-700 transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-950 font-sans">
                Home<span className="text-teal-600">Ease</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => navigate('/')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                currentPath === '/' ? 'text-slate-950 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/services')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                currentPath === '/services' ? 'text-slate-950 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Services
            </button>
            <button
              onClick={() => {
                navigate('/#how-it-works');
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                navigate('/#about');
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate('/customer/support')}
              className="hover:text-slate-900 transition-colors"
            >
              Help & FAQ
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (currentUser.role === 'customer') navigate('/customer/dashboard');
                    else if (currentUser.role === 'partner') navigate('/partner/dashboard');
                    else navigate('/admin/dashboard');
                  }}
                  className="px-4 py-2 text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Go to {currentUser.role === 'partner' ? 'Partner' : currentUser.role === 'admin' ? 'Admin' : 'Customer'} Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-slate-500 hover:text-rose-600 font-medium px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/become-partner')}
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
                >
                  Become a Partner
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-sm"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 font-medium text-slate-800"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/services');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 font-medium text-slate-800"
              >
                Services Catalog
              </button>
              <button
                onClick={() => {
                  navigate('/#how-it-works');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 font-medium text-slate-800"
              >
                How It Works
              </button>
              <button
                onClick={() => {
                  navigate('/customer/support');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 font-medium text-slate-800"
              >
                Help & FAQ
              </button>
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate('/become-partner');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl border border-teal-600 text-teal-700 font-semibold text-sm"
              >
                Become a Service Partner
              </button>
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm"
              >
                Register as Customer
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer id="about" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Home<span className="text-teal-400">Ease</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Modern household care platform connecting families with background-verified, respectful, and reliable house helpers, cooks, and maintenance professionals.
              </p>
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>100% Verified Partners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-teal-400" />
                  <span>Fair Daily Wages</span>
                </div>
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Services</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => navigate('/services')} className="hover:text-white transition-colors">House Cleaning</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-white transition-colors">Cooking & Kitchen</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-white transition-colors">Washroom Sanitation</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-white transition-colors">Water Tank Cleaning</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-white transition-colors">Balcony & Gardening</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-white transition-colors">Laundry & Wardrobe</button></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Company</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => navigate('/#about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/become-partner')} className="hover:text-white transition-colors">Become a Partner</button></li>
                <li><button onClick={() => navigate('/customer/support')} className="hover:text-white transition-colors">Customer Reviews</button></li>
                <li><button onClick={() => navigate('/customer/support')} className="hover:text-white transition-colors">Safety Standards</button></li>
                <li><button onClick={() => navigate('/customer/support')} className="hover:text-white transition-colors">Terms of Service</button></li>
              </ul>
            </div>

            {/* Col 4: Quick Portals */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Portals</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Customer Login</button></li>
                <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Partner Portal</button></li>
                <li><button onClick={() => navigate('/admin/login')} className="hover:text-white transition-colors">Admin Console</button></li>
                <li><button onClick={() => navigate('/register')} className="hover:text-white transition-colors">Register Account</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© 2026 HomeEase Technologies Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Bengaluru · Mumbai · Delhi NCR · Hyderabad · Pune</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
