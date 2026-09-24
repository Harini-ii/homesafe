import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { IndianRupee, ArrowDownRight, ArrowUpRight, Building2, CheckCircle, XCircle } from 'lucide-react';

export const AdminFinancePage: React.FC = () => {
  const { bookings, withdrawals, walletTransactions, approveWithdrawal, rejectWithdrawal } = useApp();

  const totalGMV = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const platformRevenue = bookings.filter((b) => b.status !== 'cancelled').length * 49;
  const helperEarningsTotal = walletTransactions
    .filter((t) => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'requested' || w.status === 'processing');
  const settledWithdrawals = withdrawals.filter((w) => w.status === 'completed' || w.status === 'rejected');

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Financial Ledger & Partner Settlements
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Monitor platform revenue, processed booking funds, and approve partner bank withdrawals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Transaction Volume</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            ₹{totalGMV.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-500 mt-1">Customer payments across {bookings.length} bookings</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform Retained Revenue</p>
          <p className="text-2xl font-extrabold text-teal-700 mt-2 tabular-nums">
            ₹{platformRevenue.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-500 mt-1">Standard ₹49 platform & insurance fee per job</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Disbursed to Helper Wallets</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-2 tabular-nums">
            ₹{helperEarningsTotal.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-500 mt-1">100% daily wages passed to partners</p>
        </div>
      </div>

      {/* Pending Bank Withdrawals Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Partner Bank Withdrawal Queue</h2>
            <p className="text-xs text-slate-500">Approve payout batches for instant NEFT/IMPS bank transfer</p>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {pendingWithdrawals.length} Pending Actions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Payout ID</th>
                <th className="py-3 px-4">Service Partner</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Bank Details</th>
                <th className="py-3 px-4">Requested On</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Settlement Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingWithdrawals.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">#{w.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{w.helperName}</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 text-sm tabular-nums">₹{w.amount}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{w.bankDetails.bankName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">A/C: {w.bankDetails.accountNumber} · {w.bankDetails.ifsc || w.bankDetails.ifscCode}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{w.requestedDate}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={w.status} type="withdrawal" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => rejectWithdrawal(w.id)}
                        className="px-2.5 py-1 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg text-[11px] font-semibold transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => approveWithdrawal(w.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors shadow-xs"
                      >
                        Approve Transfer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pendingWithdrawals.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    All partner bank withdrawals are settled!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Settled Withdrawals */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
          Settlement History
        </h2>

        <div className="space-y-2.5">
          {settledWithdrawals.map((w) => (
            <div
              key={w.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-500">#{w.id}</span>
                  <span className="font-bold text-slate-900">{w.helperName}</span>
                  <span className="text-slate-400">· {w.bankDetails.bankName}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Requested: {w.requestedDate} {w.processedDate && `· Processed: ${w.processedDate}`}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-sm font-extrabold text-slate-900 tabular-nums">₹{w.amount}</span>
                <StatusBadge status={w.status} type="withdrawal" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
