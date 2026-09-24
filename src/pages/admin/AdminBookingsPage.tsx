import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Search, Calendar, Phone, MapPin, Eye } from 'lucide-react';
import { BookingStatus } from '../../types';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.helperName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Global Bookings Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Audit, track, and manage all customer household service bookings across the platform
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total Bookings: <strong className="text-slate-900">{bookings.length}</strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, customer, partner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors whitespace-nowrap ${
                statusFilter === st ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Partner</th>
                <th className="py-3 px-4">Service & Duration</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Admin Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-mono font-bold text-slate-900">#{b.id}</p>
                    <p className="text-[10px] text-slate-400">{b.createdAt}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{b.customerName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{b.customerPhone}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{b.customerAddress}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{b.helperName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{b.helperPhone}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{b.categoryName}</p>
                    <p className="text-[11px] text-slate-500">{b.durationDays} Day(s) · {b.timeSlot}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{b.dates.join(', ')}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-extrabold text-slate-950 tabular-nums">₹{b.totalAmount}</p>
                    <p className="text-[10px] text-slate-400">Paid ({b.paymentMethod})</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={b.status} />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                      className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-[11px] font-semibold text-slate-800"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="accepted">Accepted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No bookings found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
