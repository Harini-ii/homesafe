import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, UserX, UserCheck, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const { customers, bookings, toggleCustomerStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.city || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Registered homeowner profiles, lifetime bookings, and account controls
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total Customers: <strong className="text-slate-900">{customers.length}</strong>
        </span>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center shadow-2xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, email, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Registered Address</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Account Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => {
                const customerBookings = bookings.filter((b) => b.customerId === c.id || b.customerName === c.name);
                const totalSpent = customerBookings.reduce((sum, b) => sum + b.totalAmount, 0);

                return (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <p className="text-[11px] text-slate-400">Joined {c.joinedDate}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-medium text-slate-800">{c.email}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{c.phone}</p>
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <p className="text-slate-800 truncate">{c.address}</p>
                      <p className="text-[11px] text-slate-500">{c.city} - {c.pincode}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-extrabold text-slate-900 tabular-nums">₹{totalSpent.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-400">{customerBookings.length} bookings</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {c.status === 'active' ? '● Active' : '✕ Blocked'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleCustomerStatus(c.id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          c.status === 'active'
                            ? 'border border-rose-200 text-rose-700 hover:bg-rose-50'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {c.status === 'active' ? 'Block Account' : 'Unblock Account'}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No customers found matching search criteria.
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
