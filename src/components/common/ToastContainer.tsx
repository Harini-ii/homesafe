import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icon =
          toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-teal-500 shrink-0" />
          );

        const borderStyle =
          toast.type === 'success'
            ? 'border-emerald-200 bg-white'
            : toast.type === 'error'
            ? 'border-rose-200 bg-white'
            : toast.type === 'warning'
            ? 'border-amber-200 bg-white'
            : 'border-teal-200 bg-white';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${borderStyle}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              {toast.title && <p className="text-xs font-bold text-slate-900 mb-0.5">{toast.title}</p>}
              <p className="text-xs text-slate-600 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
