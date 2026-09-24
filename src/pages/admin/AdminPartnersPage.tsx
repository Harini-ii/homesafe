import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RatingStars } from '../../components/common/RatingStars';
import {
  HeartHandshake,
  Search,
  CheckCircle,
  XCircle,
  ShieldAlert,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit2,
} from 'lucide-react';

export const AdminPartnersPage: React.FC = () => {
  const { houseHelps, approvePartner, rejectPartner, suspendPartner, updatePartnerProfile } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected' | 'suspended'>('all');

  const filteredPartners = houseHelps.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || p.approvalStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Service Partners Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage house help verification, approvals, daily rates, and status
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Total Partners: <strong className="text-slate-900">{houseHelps.length}</strong>
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'approved', 'pending', 'rejected', 'suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {status} ({status === 'all' ? houseHelps.length : houseHelps.filter((h) => h.approvalStatus === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Partners Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Partner Profile</th>
                <th className="py-3 px-4">Experience & Services</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Daily Rate</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.map((helper) => (
                <tr key={helper.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={helper.avatar}
                        alt={helper.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{helper.name}</p>
                        <p className="text-[11px] text-slate-400">{helper.email}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{helper.phone}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <RatingStars rating={helper.rating} size="sm" showScore />
                        <span className="text-slate-400">· {helper.experienceYears}y exp</span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1">
                        {helper.services.join(', ')}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {helper.completedJobs} completed jobs
                      </p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{helper.city}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {helper.preferredAreas.slice(0, 2).join(', ')}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-extrabold text-slate-950 tabular-nums">₹{helper.pricePerDay}</p>
                    <p className="text-[10px] text-slate-400">per day</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={helper.approvalStatus} type="partner" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {helper.approvalStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => approvePartner(helper.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectPartner(helper.id)}
                            className="px-2.5 py-1 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg text-[11px] font-semibold transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {helper.approvalStatus === 'approved' && (
                        <button
                          onClick={() => suspendPartner(helper.id)}
                          className="px-2.5 py-1 border border-amber-300 text-amber-800 hover:bg-amber-50 rounded-lg text-[11px] font-semibold transition-colors"
                        >
                          Suspend
                        </button>
                      )}

                      {helper.approvalStatus === 'suspended' && (
                        <button
                          onClick={() => approvePartner(helper.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors"
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPartners.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No service partners found matching your search.
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
