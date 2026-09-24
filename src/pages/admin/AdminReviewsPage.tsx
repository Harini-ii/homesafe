import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../../components/common/RatingStars';
import { Star, ShieldAlert, Flag, CheckCircle, Trash2 } from 'lucide-react';

export const AdminReviewsPage: React.FC = () => {
  const { reviews, reportReview } = useApp();
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filtered = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Customer Reviews Moderation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Audit ratings, testimonials, and quality feedback left by homeowners
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 5, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRating(r as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterRating === r ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r === 'all' ? 'All Reviews' : `${r} Star`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className={`p-5 sm:p-6 rounded-2xl border transition-all bg-white shadow-2xs space-y-3 ${
              rev.isReported ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={rev.customerAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80'}
                  alt={rev.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{rev.customerName}</h3>
                  <p className="text-xs text-slate-500">
                    Reviewed partner: <strong className="text-slate-800">{rev.helperName}</strong> · Booking #{rev.bookingId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RatingStars rating={rev.rating} showScore />
                <span className="text-xs text-slate-400">· {rev.createdAt}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{rev.comment}"
            </p>

            {rev.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {rev.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                  >
                    ★ {t}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              {rev.isReported ? (
                <span className="text-rose-700 font-bold flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> Flagged for policy violation
                </span>
              ) : (
                <span className="text-slate-400">Publicly visible on helper profile</span>
              )}

              <button
                onClick={() => reportReview(rev.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                  rev.isReported
                    ? 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    : 'border border-rose-200 text-rose-700 hover:bg-rose-50'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{rev.isReported ? 'Clear Flag' : 'Flag Review'}</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-xs text-slate-400">
            No reviews matching this rating filter.
          </div>
        )}
      </div>
    </div>
  );
};
