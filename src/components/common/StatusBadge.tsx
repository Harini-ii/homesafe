import React from 'react';
import { BookingStatus, DayServiceStatus, PartnerApprovalStatus } from '../../types';
import { CheckCircle2, Clock, PlayCircle, XCircle, AlertCircle, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
  status: BookingStatus | DayServiceStatus | PartnerApprovalStatus | string;
  type?: 'booking' | 'partner' | 'withdrawal' | 'enquiry';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'booking' }) => {
  const normStatus = status.toLowerCase();

  // Booking statuses
  if (normStatus === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Completed
      </span>
    );
  }

  if (normStatus === 'in_progress') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-md">
        <PlayCircle className="w-3.5 h-3.5 animate-pulse" />
        In Progress
      </span>
    );
  }

  if (normStatus === 'confirmed' || normStatus === 'accepted') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-md">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {normStatus === 'accepted' ? 'Partner Accepted' : 'Confirmed'}
      </span>
    );
  }

  if (normStatus === 'pending' || normStatus === 'requested') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
        <Clock className="w-3.5 h-3.5" />
        {type === 'partner' ? 'Pending Approval' : normStatus === 'requested' ? 'Requested' : 'Pending Confirmation'}
      </span>
    );
  }

  if (normStatus === 'upcoming') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
        <Clock className="w-3.5 h-3.5" />
        Upcoming
      </span>
    );
  }

  if (normStatus === 'approved') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Approved Partner
      </span>
    );
  }

  if (normStatus === 'cancelled' || normStatus === 'rejected') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
        <XCircle className="w-3.5 h-3.5" />
        {normStatus === 'cancelled' ? 'Cancelled' : 'Rejected'}
      </span>
    );
  }

  if (normStatus === 'suspended') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-md">
        <ShieldAlert className="w-3.5 h-3.5" />
        Suspended
      </span>
    );
  }

  if (normStatus === 'open') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
        <AlertCircle className="w-3.5 h-3.5" />
        Open
      </span>
    );
  }

  if (normStatus === 'resolved' || normStatus === 'closed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {normStatus === 'resolved' ? 'Resolved' : 'Closed'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
      {status}
    </span>
  );
};
