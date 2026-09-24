import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showScore?: boolean;
  reviewCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showScore = false,
  reviewCount,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';

  const currentVal = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, idx) => {
          const starValue = idx + 1;
          const isFilled = starValue <= currentVal;

          return (
            <button
              key={idx}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={`p-0.5 transition-colors ${
                interactive ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'
              }`}
            >
              <Star
                className={`${starSize} ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300 stroke-[1.5]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="text-xs font-bold text-slate-800 tabular-nums">
          {rating > 0 ? rating.toFixed(1) : 'New'}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-slate-400">({reviewCount})</span>
      )}
    </div>
  );
};
