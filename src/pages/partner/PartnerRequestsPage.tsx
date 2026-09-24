import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Inbox, Check, X, Clock, MapPin, Calendar, IndianRupee } from 'lucide-react';

export const PartnerRequestsPage: React.FC = () => {
  const { bookings, currentUser, houseHelps, updateBookingStatus, showToast } = useApp();

  const partner = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];

  const requests = bookings.filter(
    (b) => (b.helperId === partner.id || b.helperName === partner.name) && (b.status === 'confirmed' || b.status === 'accepted')
  );

  const handleAccept = (bookingId: string) => {
    updateBookingStatus(bookingId, 'accepted');
    showToast(`You accepted booking #${bookingId}! Customer has been notified.`, 'success');
  };

  const handleDecline = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
    showToast(`Booking #${bookingId} declined.`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Incoming Booking Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Review customer service requests for your area and accept or decline
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-slate-300 transition-all shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  #{b.id}
                </span>
                <span className="font-bold text-sm text-slate-900">{b.categoryName}</span>
                <span className="text-xs text-slate-500">· {b.durationDays} Day(s)</span>
              </div>
              <StatusBadge status={b.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <p className="font-semibold text-slate-400 mb-0.5">Customer</p>
                <p className="font-bold text-slate-900 text-sm">{b.customerName}</p>
                <p className="text-slate-500">{b.customerPhone}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-400 mb-0.5">Schedule</p>
                <p className="font-bold text-slate-900">{b.timeSlot}</p>
                <p className="text-slate-500">Dates: {b.dates.join(', ')}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-400 mb-0.5">Your Payout</p>
                <p className="text-base font-extrabold text-emerald-700 tabular-nums">
                  ₹{b.dailyRate * b.durationDays}
                </p>
                <p className="text-slate-400">(₹{b.dailyRate}/day)</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-800">Address: {b.customerAddress}</p>
              {b.notes && <p className="italic text-slate-500 mt-1">Note: "{b.notes}"</p>}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => handleDecline(b.id)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Decline</span>
              </button>

              <button
                onClick={() => handleAccept(b.id)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept Job ({b.durationDays} Days)</span>
              </button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-2">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-800 text-sm">No new pending requests</p>
            <p className="text-xs text-slate-500">
              New customer requests matching your preferred area and services will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
