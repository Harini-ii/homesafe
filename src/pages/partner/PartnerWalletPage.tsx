import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Wallet, ArrowDownRight, ArrowUpRight, Building, CheckCircle2, Clock, PlusCircle } from 'lucide-react';

export const PartnerWalletPage: React.FC = () => {
  const {
    currentUser,
    houseHelps,
    walletTransactions,
    withdrawals,
    requestWithdrawal,
  } = useApp();

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [bankDetails, setBankDetails] = useState({
    bankName: 'State Bank of India',
    accountNumber: '••••••••8819',
    ifsc: 'SBIN0001234',
    ifscCode: 'SBIN0001234',
    accountHolder: currentUser?.name || 'Sunita Devi',
  });

  const partner = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];

  const myTransactions = walletTransactions.filter((t) => t.helperId === partner.id);
  const myWithdrawals = withdrawals.filter((w) => w.helperId === partner.id);

  // Balances
  const totalEarned = myTransactions
    .filter((t) => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawn = myTransactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const walletBalance = totalEarned - totalWithdrawn;

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0 || withdrawAmount > walletBalance) return;
    requestWithdrawal(partner.id, withdrawAmount, bankDetails);
    setShowWithdrawModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Earnings & Wallet
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Daily shift payouts credit instantly to your HomeEase wallet
          </p>
        </div>

        <button
          onClick={() => setShowWithdrawModal(true)}
          disabled={walletBalance <= 0}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs self-start sm:self-auto"
        >
          <Building className="w-4 h-4" />
          <span>Withdraw to Bank Account</span>
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Available Balance</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
              ₹{walletBalance.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-emerald-700 font-semibold mt-1">Eligible for instant withdrawal</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Earned</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
              ₹{totalEarned.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-slate-500 mt-1">Across all completed shifts</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Withdrawn</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
              ₹{totalWithdrawn.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-slate-500 mt-1">Transferred to bank accounts</p>
          </div>
        </div>
      </div>

      {/* Grid: Transactions + Withdrawals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Wallet Transactions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900">Wallet Activity Log</h2>

          <div className="space-y-3">
            {myTransactions.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      t.type === 'credit'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {t.type === 'credit' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-slate-900 truncate">{t.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{t.description}</p>
                    <p className="text-[10px] text-slate-400">{t.date}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p
                    className={`text-sm font-extrabold tabular-nums ${
                      t.type === 'credit' ? 'text-emerald-700' : 'text-slate-800'
                    }`}
                  >
                    {t.type === 'credit' ? '+' : '-'}₹{t.amount}
                  </p>
                  <span className="text-[10px] text-slate-400 capitalize">{t.status}</span>
                </div>
              </div>
            ))}

            {myTransactions.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400">No transactions recorded yet.</p>
            )}
          </div>
        </div>

        {/* Right: Bank Transfer History */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900">Bank Payout Requests</h2>

          <div className="space-y-3">
            {myWithdrawals.map((w) => (
              <div
                key={w.id}
                className="p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-500">#{w.id}</span>
                  <StatusBadge status={w.status} type="withdrawal" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">{w.bankDetails.bankName}</p>
                    <p className="text-[11px] text-slate-400">A/C: {w.bankDetails.accountNumber}</p>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 tabular-nums">₹{w.amount}</p>
                </div>
                <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  Requested on {w.requestedDate}
                </p>
              </div>
            ))}

            {myWithdrawals.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400">No withdrawal requests yet.</p>
            )}
          </div>
        </div>

      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Withdraw to Bank Account</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                <span className="text-emerald-800">Available to withdraw: </span>
                <strong className="text-emerald-950 font-bold font-mono">₹{walletBalance}</strong>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Withdrawal Amount (₹) *
                </label>
                <input
                  type="number"
                  min="100"
                  max={walletBalance}
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bank Name *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Number *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">IFSC Code *</label>
                <input
                  type="text"
                  required
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl uppercase font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                >
                  Submit Payout Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
