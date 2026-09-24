import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Calendar, Wallet, Shield } from 'lucide-react';

export const PartnerNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigate } = useApp();

  const partnerNotifs = notifications.filter(
    (n) => n.recipientRole === 'partner' || n.recipientRole === 'all'
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return Calendar;
      case 'payment':
        return Wallet;
      default:
        return Bell;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Partner Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Booking requests, daily shift reminders, and wallet payouts
          </p>
        </div>

        <button
          onClick={() => markAllNotificationsRead('partner')}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="space-y-3">
        {partnerNotifs.map((n) => {
          const Icon = getIcon(n.type);
          return (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.linkPath) navigate(n.linkPath);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 bg-white ${
                !n.isRead
                  ? 'border-emerald-300 ring-1 ring-emerald-200/60 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  !n.isRead ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-xs sm:text-sm font-bold ${!n.isRead ? 'text-slate-950' : 'text-slate-800'}`}>
                    {n.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
              </div>

              {!n.isRead && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
              )}
            </div>
          );
        })}

        {partnerNotifs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-xs text-slate-500">
            No notifications at the moment.
          </div>
        )}
      </div>
    </div>
  );
};
