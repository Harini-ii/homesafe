import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Calendar, Clock, MapPin, Phone, PlayCircle, CheckCircle2 } from 'lucide-react';

export const PartnerBookingsPage: React.FC = () => {
  const { bookings, currentUser, houseHelps, startServiceDay, completeServiceDay } = useApp();
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'upcoming' | 'completed'>('all');

  const partner = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];

  const partnerBookings = bookings.filter(
    (b) => b.helperId === partner.id || b.helperName === partner.name
  );

  const filtered = partnerBookings.filter((b) => {
    if (filter === 'all') return true;
    if (filter === 'in_progress') return b.status === 'in_progress';
    if (filter === 'upcoming') return b.status === 'confirmed' || b.status === 'accepted';
    if (filter === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Service Bookings & Schedule
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Full schedule of past, current, and scheduled shifts
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { key: 'all', label: 'All Jobs', count: partnerBookings.length },
          { key: 'in_progress', label: 'In Progress', count: partnerBookings.filter((b) => b.status === 'in_progress').length },
          { key: 'upcoming', label: 'Upcoming', count: partnerBookings.filter((b) => b.status === 'confirmed' || b.status === 'accepted').length },
          { key: 'completed', label: 'Completed', count: partnerBookings.filter((b) => b.status === 'completed').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filter === tab.key
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filter === tab.key ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div className="space-y-4">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  #{b.id}
                </span>
                <span className="font-bold text-sm text-slate-900">{b.categoryName}</span>
                <span className="text-xs text-slate-500">· {b.durationDays} Day(s)</span>
              </div>
              <StatusBadge status={b.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-semibold mb-0.5">Customer & Contact</p>
                <p className="font-bold text-slate-900 text-sm">{b.customerName}</p>
                <a
                  href={`tel:${b.customerPhone}`}
                  className="text-emerald-700 font-semibold hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3 h-3" />
                  <span>{b.customerPhone}</span>
                </a>
              </div>

              <div>
                <p className="text-slate-400 font-semibold mb-0.5">Time Slot & Address</p>
                <p className="font-bold text-slate-900">{b.timeSlot}</p>
                <div className="flex items-start gap-1 text-slate-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="truncate">{b.customerAddress}</span>
                </div>
              </div>

              <div>
                <p className="text-slate-400 font-semibold mb-0.5">Total Earning</p>
                <p className="text-base font-extrabold text-slate-900 tabular-nums">
                  ₹{b.dailyRate * b.durationDays}
                </p>
                <p className="text-slate-500">Rate: ₹{b.dailyRate}/day</p>
              </div>
            </div>

            {/* Daily shift status row */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Shift Execution & Wallet Payouts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {b.workingDays.map((d) => (
                  <div
                    key={d.dayNumber}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">Day {d.dayNumber}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            d.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : d.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {d.status === 'completed' ? 'Done' : d.status === 'in_progress' ? 'Active' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] font-mono">{d.date}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-200">
                      {d.status === 'upcoming' && (
                        <button
                          onClick={() => startServiceDay(b.id, d.dayNumber)}
                          className="w-full py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          <PlayCircle className="w-3 h-3 text-blue-400" />
                          <span>Start Day</span>
                        </button>
                      )}
                      {d.status === 'in_progress' && (
                        <button
                          onClick={() => completeServiceDay(b.id, d.dayNumber)}
                          className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Complete & Credit</span>
                        </button>
                      )}
                      {d.status === 'completed' && (
                        <span className="text-[11px] text-emerald-700 font-semibold block text-center">
                          ✓ ₹{d.dailyEarning} Credited
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-xs text-slate-500">
            No bookings found in this view.
          </div>
        )}
      </div>
    </div>
  );
};
