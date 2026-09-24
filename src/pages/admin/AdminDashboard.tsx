import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RatingStars } from '../../components/common/RatingStars';
import {
  Users,
  ShieldAlert,
  HeartHandshake,
  CalendarCheck,
  IndianRupee,
  LifeBuoy,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    houseHelps,
    bookings,
    customers,
    enquiries,
    withdrawals,
    approvePartner,
    rejectPartner,
    navigate,
  } = useApp();

  const pendingPartners = houseHelps.filter((h) => h.approvalStatus === 'pending');
  const activePartners = houseHelps.filter((h) => h.approvalStatus === 'approved');
  const openEnquiries = enquiries.filter((e) => e.status !== 'resolved');
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'requested' || w.status === 'processing');

  // Revenue metrics
  const totalGMV = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const platformRevenue = bookings.filter((b) => b.status !== 'cancelled').length * 49;

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-bold mb-1">
            <span>HomeEase SuperAdmin Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Platform Overview & Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Monitor real-time bookings, partner background verifications, and financial settlements
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingPartners.length > 0 && (
            <button
              onClick={() => navigate('/admin/partners')}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{pendingPartners.length} Partner Approvals</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Bookings GMV</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-950 tabular-nums">
              ₹{totalGMV.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-teal-700 font-semibold mt-1">
              ₹{platformRevenue} Platform fees earned
            </p>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-950 tabular-nums">{bookings.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              {bookings.filter((b) => b.status === 'completed').length} completed shifts
            </p>
          </div>
        </div>

        {/* Verified Helpers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Partners</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-950 tabular-nums">{activePartners.length}</p>
            <p className="text-[11px] text-amber-700 font-semibold mt-1">
              {pendingPartners.length} awaiting verification
            </p>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Users</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-950 tabular-nums">{customers.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">100% phone verified</p>
          </div>
        </div>
      </div>

      {/* Pending Partner Approvals section */}
      {pendingPartners.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-700" />
              <h2 className="text-base font-bold text-amber-950">
                Partner Applications Awaiting Admin Review ({pendingPartners.length})
              </h2>
            </div>
            <button
              onClick={() => navigate('/admin/partners')}
              className="text-xs font-bold text-amber-800 hover:underline"
            >
              View All Partners
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingPartners.map((helper) => (
              <div
                key={helper.id}
                className="bg-white rounded-xl border border-amber-200 p-4 flex flex-col justify-between space-y-3 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={helper.avatar}
                    alt={helper.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900">{helper.name}</h3>
                    <p className="text-xs text-slate-500">{helper.email} · {helper.phone}</p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {helper.experienceYears}y exp · {helper.city} · Rate: ₹{helper.pricePerDay}/day
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Services: {helper.services.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => rejectPartner(helper.id)}
                    className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => approvePartner(helper.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve & Activate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Columns: Recent Bookings & Support Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Bookings Feed */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Recent Service Bookings</h2>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              All Bookings ({bookings.length})
            </button>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      #{b.id}
                    </span>
                    <span className="font-bold text-xs text-slate-900">{b.categoryName}</span>
                    <span className="text-[11px] text-slate-400">({b.durationDays}d)</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Customer: <strong className="text-slate-800">{b.customerName}</strong> → Helper: <strong className="text-slate-800">{b.helperName}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.dates[0]} · {b.timeSlot}</p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-extrabold text-slate-950 tabular-nums">₹{b.totalAmount}</span>
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Enquiries & Pending Payouts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Support Ticket Queue */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Open Support Enquiries</h2>
              <button
                onClick={() => navigate('/admin/enquiries')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View ({openEnquiries.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {openEnquiries.slice(0, 3).map((e) => (
                <div
                  key={e.id}
                  onClick={() => navigate('/admin/enquiries')}
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-500 font-bold">#{e.ticketNumber}</span>
                    <StatusBadge status={e.status} type="enquiry" />
                  </div>
                  <p className="font-bold text-xs text-slate-900 line-clamp-1">{e.subject}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{e.userName} · {e.category}</p>
                </div>
              ))}

              {openEnquiries.length === 0 && (
                <p className="text-center py-4 text-xs text-slate-400">All customer tickets resolved!</p>
              )}
            </div>
          </div>

          {/* Pending Bank Withdrawals */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Partner Payouts</h2>
              <button
                onClick={() => navigate('/admin/finance')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Finance Console
              </button>
            </div>
            <p className="text-xs text-slate-600">
              {pendingWithdrawals.length} withdrawal requests pending bank transfer settlement.
            </p>
            <button
              onClick={() => navigate('/admin/finance')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Review Payout Batches
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
