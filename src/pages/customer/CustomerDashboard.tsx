import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RatingStars } from '../../components/common/RatingStars';
import {
  Sparkles,
  CalendarCheck,
  PlusCircle,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Phone,
  ArrowRight,
  Users,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { currentUser, bookings, houseHelps, navigate } = useApp();

  const customerBookings = bookings.filter(
    (b) => b.customerId === currentUser?.id || b.customerName === currentUser?.name
  );

  const activeBooking = customerBookings.find(
    (b) => b.status === 'in_progress' || b.status === 'confirmed' || b.status === 'accepted'
  );

  const completedCount = customerBookings.filter((b) => b.status === 'completed').length;
  const upcomingCount = customerBookings.filter((b) => b.status === 'confirmed' || b.status === 'accepted' || b.status === 'in_progress').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Customer Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'Customer'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Manage your daily household schedules, verified helpers, and upcoming service visits.
          </p>
        </div>

        <button
          onClick={() => navigate('/customer/book')}
          className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Service</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active & Scheduled</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">{upcomingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Jobs</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">{completedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Saved Location</p>
            <p className="text-sm font-bold text-slate-900 mt-1 truncate max-w-[170px]">
              {currentUser?.address ? currentUser.address.split(',')[0] : 'Indiranagar, BLR'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Current / In-Progress Booking Tracker */}
      {activeBooking && (
        <div className="bg-white rounded-2xl border border-teal-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Current Service In Hand</span>
                <span className="text-xs font-mono font-bold text-slate-500">#{activeBooking.id}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{activeBooking.categoryName} ({activeBooking.durationDays} Days)</h2>
            </div>
            <StatusBadge status={activeBooking.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            {/* Helper Info */}
            <div className="flex items-start gap-3">
              <img
                src={activeBooking.helperAvatar}
                alt={activeBooking.helperName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400">Assigned House Help</p>
                <p className="font-bold text-sm text-slate-900">{activeBooking.helperName}</p>
                <a
                  href={`tel:${activeBooking.helperPhone}`}
                  className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3 h-3" />
                  <span>{activeBooking.helperPhone}</span>
                </a>
              </div>
            </div>

            {/* Schedule Info */}
            <div>
              <p className="text-xs font-semibold text-slate-400">Slot & Dates</p>
              <p className="font-bold text-sm text-slate-900">{activeBooking.timeSlot}</p>
              <p className="text-xs text-slate-600 mt-0.5">{activeBooking.dates.join(', ')}</p>
            </div>

            {/* Day Progress Indicator */}
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2">Multi-Day Progress</p>
              <div className="space-y-1.5">
                {activeBooking.workingDays.map((d) => (
                  <div key={d.dayNumber} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Day {d.dayNumber} ({d.date.slice(5)})</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        d.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {d.status === 'completed' ? '✓ Completed' : d.status === 'in_progress' ? '● In Progress' : 'Upcoming'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Address: <strong className="text-slate-800">{activeBooking.customerAddress}</strong>
            </span>
            <button
              onClick={() => navigate('/customer/bookings')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>View Full Booking Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Recent Bookings & Recommended Helpers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Bookings list */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Service History</h2>
            <button
              onClick={() => navigate('/customer/bookings')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              View All ({customerBookings.length})
            </button>
          </div>

          <div className="space-y-3">
            {customerBookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={booking.helperAvatar}
                    alt={booking.helperName}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-slate-900">{booking.categoryName}</p>
                      <span className="text-xs text-slate-400">· {booking.durationDays} day(s)</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      With {booking.helperName} · <span className="font-mono">{booking.dates[0]}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <StatusBadge status={booking.status} />
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    ₹{booking.totalAmount}
                  </span>
                </div>
              </div>
            ))}

            {customerBookings.length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                No past bookings yet. Click "Book New Service" to get started!
              </div>
            )}
          </div>
        </div>

        {/* Right: Recommended Helpers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recommended in Your Area</h2>
            <button
              onClick={() => navigate('/customer/book')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              Explore Helpers
            </button>
          </div>

          <div className="space-y-3">
            {houseHelps.filter((h) => h.approvalStatus === 'approved').slice(0, 3).map((helper) => (
              <div
                key={helper.id}
                className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between gap-3 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={helper.avatar}
                    alt={helper.name}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-slate-900 truncate">{helper.name}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <RatingStars rating={helper.rating} size="sm" showScore />
                      <span>·</span>
                      <span>{helper.experienceYears}y exp</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{helper.services.slice(0, 2).join(', ')}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-extrabold text-slate-900 tabular-nums">₹{helper.pricePerDay}</p>
                  <p className="text-[10px] text-slate-400">/ day</p>
                  <button
                    onClick={() => navigate('/customer/book')}
                    className="mt-1 px-2.5 py-1 bg-slate-900 hover:bg-teal-600 text-white rounded text-[10px] font-semibold transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
