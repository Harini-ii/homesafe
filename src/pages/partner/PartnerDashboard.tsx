import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RatingStars } from '../../components/common/RatingStars';
import {
  CalendarCheck,
  Wallet,
  Star,
  CheckCircle2,
  Clock,
  PlayCircle,
  MapPin,
  Phone,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const PartnerDashboard: React.FC = () => {
  const {
    currentUser,
    houseHelps,
    bookings,
    walletTransactions,
    startServiceDay,
    completeServiceDay,
    updateBookingStatus,
    togglePartnerAvailability,
    navigate,
  } = useApp();

  const partner = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];
  const isPending = partner.approvalStatus === 'pending';

  const partnerBookings = bookings.filter((b) => b.helperId === partner.id || b.helperName === partner.name);

  // Active / in-progress or confirmed bookings
  const activeBookings = partnerBookings.filter(
    (b) => b.status === 'in_progress' || b.status === 'confirmed' || b.status === 'accepted'
  );

  const completedBookings = partnerBookings.filter((b) => b.status === 'completed');

  // Compute wallet balance
  const walletBalance = walletTransactions
    .filter((t) => t.helperId === partner.id && t.status === 'completed')
    .reduce((acc, t) => acc + (t.type === 'credit' ? t.amount : -t.amount), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Pending status banner inside page */}
      {isPending && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-sm text-amber-950">Application Pending Verification</h2>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                Your application has been submitted and is waiting for admin approval. Status: <strong>Pending Approval</strong>.
                Our operations team is currently reviewing your Aadhaar credentials. You will be notified once activated.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/partner/profile')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shrink-0"
          >
            Review Application
          </button>
        </div>
      )}

      {/* Hero Welcome & Availability switch */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Namaste, {partner.name}!
            </h1>
            {partner.approvalStatus === 'approved' && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ Verified Partner
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Preferred service area: <strong>{partner.preferredAreas.join(', ')}</strong> · Rate: <strong>₹{partner.pricePerDay}/day</strong>
          </p>
        </div>

        {/* Live Availability Toggle Card */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center gap-4">
          <div>
            <p className="text-xs font-bold text-slate-900">
              {partner.isAvailable ? 'Available for Jobs' : 'Offline / Unavailable'}
            </p>
            <p className="text-[11px] text-slate-500">
              {partner.isAvailable ? 'Visible to customers nearby' : 'Not receiving new requests'}
            </p>
          </div>
          <button
            onClick={() => togglePartnerAvailability(partner.id)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              partner.isAvailable ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                partner.isAvailable ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Partner Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Wallet Balance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Wallet Balance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              ₹{walletBalance.toLocaleString('en-IN')}
            </p>
            <button
              onClick={() => navigate('/partner/wallet')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-1 inline-flex items-center gap-1"
            >
              <span>Withdraw to Bank</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active & Scheduled</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{activeBookings.length}</p>
            <p className="text-xs text-slate-500 mt-1">Ongoing multi-day shifts</p>
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Jobs</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{partner.completedJobs}</p>
            <p className="text-xs text-slate-500 mt-1">Verified customer ratings</p>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating Score</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {partner.rating > 0 ? partner.rating.toFixed(1) : 'New'}
              </p>
              <RatingStars rating={partner.rating} size="sm" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Based on genuine reviews</p>
          </div>
        </div>
      </div>

      {/* Today's Active Schedule & Shift Controller */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Current Assigned Bookings & Shifts</h2>
            <p className="text-xs text-slate-500">Track and log your daily work. Completing each day immediately credits your wallet.</p>
          </div>
          <button
            onClick={() => navigate('/partner/bookings')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            All Bookings ({partnerBookings.length})
          </button>
        </div>

        <div className="space-y-4">
          {activeBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{booking.id}
                  </span>
                  <span className="font-bold text-sm text-slate-900">{booking.categoryName}</span>
                  <span className="text-xs text-slate-400">({booking.durationDays} Days)</span>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              {/* Customer details & address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-slate-400 font-semibold mb-1">Customer</p>
                  <p className="font-bold text-sm text-slate-900">{booking.customerName}</p>
                  <a
                    href={`tel:${booking.customerPhone}`}
                    className="text-emerald-700 font-semibold hover:underline flex items-center gap-1 mt-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{booking.customerPhone}</span>
                  </a>
                </div>

                <div>
                  <p className="text-slate-400 font-semibold mb-1">Service Address</p>
                  <div className="flex items-start gap-1 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{booking.customerAddress}</span>
                  </div>
                  <p className="text-slate-500 mt-1">Slot: <strong>{booking.timeSlot}</strong></p>
                </div>

                <div>
                  <p className="text-slate-400 font-semibold mb-1">Total Earning</p>
                  <p className="text-base font-extrabold text-slate-900 tabular-nums">
                    ₹{booking.dailyRate * booking.durationDays}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ₹{booking.dailyRate}/day direct to your wallet
                  </p>
                </div>
              </div>

              {/* Day-by-Day Interactive Shift Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Daily Shift Execution
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {booking.workingDays.map((day) => {
                    const isUpcoming = day.status === 'upcoming';
                    const isInProgress = day.status === 'in_progress';
                    const isCompleted = day.status === 'completed';

                    return (
                      <div
                        key={day.dayNumber}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                          isCompleted
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : isInProgress
                            ? 'bg-blue-50/60 border-blue-200 shadow-xs'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-slate-900">Day {day.dayNumber}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                isCompleted
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isInProgress
                                  ? 'bg-blue-100 text-blue-800 animate-pulse'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {isCompleted ? '✓ Completed' : isInProgress ? '● In Progress' : 'Upcoming'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono">{day.date}</p>
                          <p className="text-xs text-slate-700 font-semibold mt-1">₹{day.dailyEarning} payout</p>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-3 mt-2 border-t border-slate-200/60">
                          {isUpcoming && (
                            <button
                              onClick={() => startServiceDay(booking.id, day.dayNumber)}
                              className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <PlayCircle className="w-3.5 h-3.5 text-blue-400" />
                              <span>Start Day {day.dayNumber}</span>
                            </button>
                          )}

                          {isInProgress && (
                            <button
                              onClick={() => completeServiceDay(booking.id, day.dayNumber)}
                              className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Complete & Credit ₹{day.dailyEarning}</span>
                            </button>
                          )}

                          {isCompleted && (
                            <p className="text-[11px] text-emerald-700 font-semibold text-center flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Payout Added to Wallet</span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {activeBookings.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
              <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">No active shifts right now</p>
              <p className="text-xs text-slate-500">
                Make sure your availability switch is ON to receive incoming bookings from homeowners.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
