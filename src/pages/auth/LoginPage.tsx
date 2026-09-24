import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sparkles,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  User,
  HeartHandshake,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithCredentials, loginAs, navigate } = useApp();

  const [roleTab, setRoleTab] = useState<UserRole>('customer');
  const [email, setEmail] = useState<string>('customer@example.com');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handleRoleTabChange = (role: UserRole) => {
    setRoleTab(role);
    if (role === 'customer') {
      setEmail('customer@example.com');
    } else if (role === 'partner') {
      setEmail('helper@example.com');
    } else {
      setEmail('admin@example.com');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithCredentials(email, password, roleTab);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-teal-600 items-center justify-center text-white shadow-md shadow-teal-500/20 mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to HomeEase
          </h1>
          <p className="text-xs text-slate-500">
            Select your role to access your dedicated dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          {/* Role Selector Tabs (Segmented Control) */}
          <div className="p-1 bg-slate-100 rounded-xl grid grid-cols-2 gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleRoleTabChange('customer')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                roleTab === 'customer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('partner')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                roleTab === 'partner'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>House Help</span>
            </button>
          </div>

          {/* Quick Demo Fillers */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">
              1-Click Demo Logins
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAs('customer');
                }}
                className="p-2 rounded-lg border border-teal-200 bg-teal-50/60 hover:bg-teal-100/70 text-left text-xs transition-colors"
              >
                <p className="font-bold text-teal-900 truncate">Customer Demo</p>
                <p className="text-[11px] text-teal-700">Priya Sharma</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAs('partner', 'approved');
                }}
                className="p-2 rounded-lg border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 text-left text-xs transition-colors"
              >
                <p className="font-bold text-emerald-900 truncate">Partner (Approved)</p>
                <p className="text-[11px] text-emerald-700">Sunita Devi</p>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  loginAs('partner', 'pending');
                }}
                className="p-2 rounded-lg border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-left text-xs transition-colors"
              >
                <p className="font-bold text-amber-900 truncate">Partner (Pending)</p>
                <p className="text-[11px] text-amber-700">Rajesh Kumar</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAs('admin');
                }}
                className="p-2 rounded-lg border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-left text-xs transition-colors"
              >
                <p className="font-bold text-indigo-900 truncate">Admin Portal</p>
                <p className="text-[11px] text-indigo-700">Super Admin</p>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address / Mobile Number
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com or +91 98..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-600">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="font-semibold text-teal-700 hover:text-teal-800"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login as {roleTab === 'partner' ? 'House Help' : roleTab === 'admin' ? 'Administrator' : 'Customer'}</span>
            </button>
          </form>

          {/* Registration link */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            {roleTab === 'customer' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="font-bold text-teal-700 hover:underline"
                >
                  Register as Customer
                </button>
              </p>
            ) : (
              <p>
                Want to work with HomeEase?{' '}
                <button
                  onClick={() => navigate('/become-partner')}
                  className="font-bold text-teal-700 hover:underline"
                >
                  Become a Service Partner
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Encrypted Session & Identity Protected</span>
        </div>
      </div>
    </div>
  );
};
