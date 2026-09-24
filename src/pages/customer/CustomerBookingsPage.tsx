import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RatingStars } from '../../components/common/RatingStars';
import { Booking } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  XCircle,
  Star,
  CheckCircle2,
  AlertCircle,
  FileText,
  LifeBuoy,
} from 'lucide-react';

export const CustomerBookingsPage: React.FC = () => {
  const { currentUser, bookings, cancelBooking, addReview, navigate } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'in_progress' | 'completed' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Review Modal state
  const [reviewModalBooking, setReviewModalBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewTags, setReviewTags] = useState<string[]>(['Punctual', 'Respectful']);
  const [reviewComment, setReviewComment] = useState<string>('Exceptional work! Arrived right on time and did a thorough job.');

  const customerBookings = bookings.filter(
    (b) => b.customerId === currentUser?.id || b.customerName === currentUser?.name
  );

  const filtered = customerBookings.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'accepted';
    if (activeTab === 'in_progress') return b.status === 'in_progress';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const availableTags = ['Punctual', 'Thorough', 'Respectful', 'Great Cooking', 'Fast & Quiet', 'Honest'];

  const toggleTag = (tag: string) => {
    setReviewTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalBooking) return;
    addReview({
      bookingId: reviewModalBooking.id,
      helperId: reviewModalBooking.helperId,
      helperName: reviewModalBooking.helperName,
      rating: reviewRating,
      tags: reviewTags,
      comment: reviewComment,
    });
    setReviewModalBooking(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            My Service Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track multi-day service schedules, status, helper details, and ratings
          </p>
        </div>

        <button
          onClick={() => navigate('/customer/book')}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          + Book Another Service
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { key: 'all', label: 'All Bookings', count: customerBookings.length },
          { key: 'upcoming', label: 'Upcoming', count: customerBookings.filter((b) => b.status === 'confirmed' || b.status === 'accepted').length },
          { key: 'in_progress', label: 'In Progress', count: customerBookings.filter((b) => b.status === 'in_progress').length },
          { key: 'completed', label: 'Completed', count: customerBookings.filter((b) => b.status === 'completed').length },
          { key: 'cancelled', label: 'Cancelled', count: customerBookings.filter((b) => b.status === 'cancelled').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.key ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-slate-300 transition-all shadow-2xs space-y-4"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  #{booking.id}
                </span>
                <span className="text-xs text-slate-400">Booked on {booking.createdAt}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-900 tabular-nums">
                  ₹{booking.totalAmount}
                </span>
                <StatusBadge status={booking.status} />
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Service & Helper */}
              <div className="flex items-start gap-3">
                <img
                  src={booking.helperAvatar}
                  alt={booking.helperName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900">{booking.categoryName}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Partner: <strong className="text-slate-900">{booking.helperName}</strong>
                  </p>
                  <a
                    href={`tel:${booking.helperPhone}`}
                    className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1 mt-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{booking.helperPhone}</span>
                  </a>
                </div>
              </div>

              {/* Time slot & Address */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{booking.timeSlot}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="truncate">{booking.customerAddress}</span>
                </div>
              </div>

              {/* Multi-Day Progress Checklist */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Daily Progress ({booking.durationDays} Days)
                </p>
                <div className="space-y-1">
                  {booking.workingDays.map((d) => (
                    <div key={d.dayNumber} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700">Day {d.dayNumber} ({d.date.slice(5)})</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          d.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : d.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {d.status === 'completed'
                          ? 'Done'
                          : d.status === 'in_progress'
                          ? 'In Progress'
                          : 'Upcoming'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Action buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Payment:</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  Prepaid via {booking.paymentMethod}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Rate & Review Button */}
                {booking.status === 'completed' && !booking.hasCustomerReviewed && (
                  <button
                    onClick={() => setReviewModalBooking(booking)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>Rate & Review Helper</span>
                  </button>
                )}

                {booking.hasCustomerReviewed && (
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Reviewed</span>
                  </span>
                )}

                {/* Cancel Booking */}
                {(booking.status === 'confirmed' || booking.status === 'accepted') && (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="px-3 py-1.5 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition-colors"
                  >
                    Cancel Booking
                  </button>
                )}

                {/* Support Ticket */}
                <button
                  onClick={() => navigate('/customer/support')}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors flex items-center gap-1"
                >
                  <LifeBuoy className="w-3.5 h-3.5" />
                  <span>Support</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-800 text-sm">No bookings in this tab</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Book a verified house helper for cleaning, cooking, or household maintenance in just a few clicks.
            </p>
            <button
              onClick={() => navigate('/customer/book')}
              className="mt-2 px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-xl"
            >
              Book Now
            </button>
          </div>
        )}
      </div>

      {/* Review & Rating Modal */}
      {reviewModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">Review {reviewModalBooking.helperName}</h3>
                <p className="text-xs text-slate-500">Booking #{reviewModalBooking.id} · {reviewModalBooking.categoryName}</p>
              </div>
              <button
                onClick={() => setReviewModalBooking(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Interactive Stars */}
              <div className="text-center py-2 space-y-1">
                <p className="text-xs font-bold text-slate-700">How was your service experience?</p>
                <div className="flex justify-center">
                  <RatingStars
                    rating={reviewRating}
                    size="lg"
                    interactive
                    onRatingChange={setReviewRating}
                  />
                </div>
                <p className="text-xs font-semibold text-amber-600">
                  {reviewRating === 5 ? 'Excellent & Flawless' : reviewRating === 4 ? 'Very Good' : reviewRating === 3 ? 'Average' : 'Could Be Better'}
                </p>
              </div>

              {/* Tag selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Highlight Tags
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = reviewTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                          isSelected
                            ? 'bg-teal-50 border-teal-600 text-teal-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Write detailed feedback
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReviewModalBooking(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
