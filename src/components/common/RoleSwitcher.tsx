import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Shield, Sparkles, User, LogOut, ArrowRight, Eye } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentUser, loginAs, logout, currentPath, navigate } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <aside 
      aria-label="Prototype Demo Controls" 
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end print:hidden pointer-events-auto"
    >
      {isOpen && (
        <div className="mb-2 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="font-bold text-slate-900 text-sm">Demo Persona Switcher</p>
              <p className="text-slate-500 text-[11px]">Instant 1-click role testing</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              title="Close switcher"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5">
            <p className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Switch Demo Account</p>
            
            {/* Customer */}
            <button
              onClick={() => {
                loginAs('customer');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                currentUser?.role === 'customer'
                  ? 'border-teal-500 bg-teal-50/70 text-teal-900 font-medium'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                  PS
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Priya Sharma</p>
                  <p className="text-[11px] text-slate-500">Customer Role</p>
                </div>
              </div>
              {currentUser?.role === 'customer' && (
                <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-medium">Active</span>
              )}
            </button>

            {/* Helper Approved */}
            <button
              onClick={() => {
                loginAs('partner', 'approved');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                currentUser?.role === 'partner' && currentUser?.id === 'hp-001'
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-medium'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  SD
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Sunita Devi</p>
                  <p className="text-[11px] text-emerald-600 font-medium">House Help (Approved)</p>
                </div>
              </div>
              {currentUser?.role === 'partner' && currentUser?.id === 'hp-001' && (
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-medium">Active</span>
              )}
            </button>

            {/* Helper Pending */}
            <button
              onClick={() => {
                loginAs('partner', 'pending');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                currentUser?.role === 'partner' && currentUser?.id === 'hp-005'
                  ? 'border-amber-500 bg-amber-50/70 text-amber-900 font-medium'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Rajesh Kumar</p>
                  <p className="text-[11px] text-amber-600 font-medium">House Help (Pending Approval)</p>
                </div>
              </div>
              {currentUser?.role === 'partner' && currentUser?.id === 'hp-005' && (
                <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-medium">Active</span>
              )}
            </button>

            {/* Admin */}
            <button
              onClick={() => {
                loginAs('admin');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                currentUser?.role === 'admin'
                  ? 'border-indigo-500 bg-indigo-50/70 text-indigo-900 font-medium'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Super Admin</p>
                  <p className="text-[11px] text-indigo-600 font-medium">Full Operations Portal</p>
                </div>
              </div>
              {currentUser?.role === 'admin' && (
                <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">Active</span>
              )}
            </button>
          </div>

          {/* Quick jumps */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
              className="text-slate-600 hover:text-teal-600 flex items-center gap-1 font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              Landing Page
            </button>
            {currentUser && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-full shadow-xl border border-slate-700/60 transition-transform active:scale-95"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
        </span>
        <div className="text-left">
          <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Role Switcher</p>
          <p className="text-xs font-semibold text-white leading-tight capitalize">
            {currentUser ? `${currentUser.role}: ${currentUser.name.split(' ')[0]}` : 'Guest Visitor'}
          </p>
        </div>
        <ArrowRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
    </aside>
  );
};
