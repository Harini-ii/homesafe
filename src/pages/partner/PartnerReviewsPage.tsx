import React from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../../components/common/RatingStars';
import { Star, ThumbsUp, ShieldCheck } from 'lucide-react';

export const PartnerReviewsPage: React.FC = () => {
  const { reviews, currentUser, houseHelps } = useApp();

  const partner = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];
  const partnerReviews = reviews.filter((r) => r.helperId === partner.id);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Customer Reviews & Ratings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Feedback received from verified homeowners after completed shifts
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
          <RatingStars rating={partner.rating} size="lg" showScore reviewCount={partnerReviews.length} />
        </div>
      </div>

      <div className="space-y-4">
        {partnerReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3 shadow-2xs"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={rev.customerAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80'}
                  alt={rev.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{rev.customerName}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Booking #{rev.bookingId}</p>
                </div>
              </div>

              <div className="text-right">
                <RatingStars rating={rev.rating} size="sm" showScore />
                <p className="text-[10px] text-slate-400 mt-0.5">{rev.createdAt}</p>
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
                    className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-medium"
                  >
                    ★ {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {partnerReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-xs text-slate-500">
            No customer reviews yet. As you complete jobs, customer testimonials will appear here!
          </div>
        )}
      </div>
    </div>
  );
};
