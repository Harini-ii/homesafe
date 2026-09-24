import React from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../../components/common/RatingStars';
import { Star, MessageSquare, CheckCircle2 } from 'lucide-react';

export const CustomerReviewsPage: React.FC = () => {
  const { reviews, currentUser, reportReview, navigate } = useApp();

  const customerReviews = reviews.filter(
    (r) => r.customerId === currentUser?.id || r.customerName === currentUser?.name
  );

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          My Ratings & Feedback
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Reviews you've submitted for service partners across completed jobs
        </p>
      </div>

      <div className="space-y-4">
        {customerReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-mono">Booking #{rev.bookingId}</p>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  Review for {rev.helperName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <RatingStars rating={rev.rating} showScore />
                <span className="text-xs text-slate-400">· {rev.createdAt}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{rev.comment}"
            </p>

            {rev.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {rev.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-teal-50 text-teal-800 border border-teal-200/60 px-2 py-0.5 rounded-md font-medium"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 text-right">
              <span className="text-[11px] text-slate-400">Published to public partner profile</span>
            </div>
          </div>
        ))}

        {customerReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Star className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-800 text-sm">No reviews submitted yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Once a household service is completed, you can rate and review your partner to help the community.
            </p>
            <button
              onClick={() => navigate('/customer/bookings')}
              className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
            >
              View My Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
