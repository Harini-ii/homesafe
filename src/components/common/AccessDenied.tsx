import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { UserRole } from '../../types';

interface AccessDeniedProps {
  requiredRole: UserRole;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ requiredRole }) => {
  const { currentUser, loginAs, navigate } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-2">Access Restricted</h1>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          This portal requires <span className="font-semibold text-slate-800 capitalize">{requiredRole}</span> permissions.
          {currentUser ? (
            <> You are currently signed in as <span className="font-semibold capitalize text-slate-800">{currentUser.name} ({currentUser.role})</span>.</>
          ) : (
            <> Please sign in to view this section.</>
          )}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => loginAs(requiredRole)}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Switch to {requiredRole.toUpperCase()} Demo Role
          </button>

          <button
            onClick={() => {
              if (currentUser?.role === 'customer') navigate('/customer/dashboard');
              else if (currentUser?.role === 'partner') navigate('/partner/dashboard');
              else if (currentUser?.role === 'admin') navigate('/admin/dashboard');
              else navigate('/');
            }}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to My Portal
          </button>
        </div>
      </div>
    </div>
  );
};
