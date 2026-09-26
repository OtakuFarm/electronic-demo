'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cx, formatDate } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';

const FILTERS = [
  { key: 'all', label: 'All reviews' },
  { key: 5, label: '5 star' },
  { key: 4, label: '4 star' },
  { key: 3, label: '3 star & below' },
] as const;

type FilterKey = (typeof FILTERS)[number]['key'];

export function ProductReviews({ product }: { product: Product }) {
  const [filter, setFilter] = useState<FilterKey>('all');

  const visibleReviews = useMemo(() => {
    if (filter === 'all') return product.reviews;
    if (filter === 3) return product.reviews.filter((r) => r.rating <= 3);
    return product.reviews.filter((r) => r.rating === filter);
  }, [product.reviews, filter]);

  // Distribution across the fictional review sample shown on the page.
  const distribution = useMemo(() => {
    const total = product.reviews.length || 1;
    return [5, 4, 3, 2, 1].map((star) => {
      const count = product.reviews.filter((r) => r.rating === star).length;
      return { star, count, percentage: Math.round((count / total) * 100) };
    });
  }, [product.reviews]);

  return (
    <section aria-labelledby="reviews-heading" id="reviews">
      <h2 id="reviews-heading" className="display-md mb-8">
        Customer reviews
      </h2>

      <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
        <div className="card-surface h-fit p-6">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl font-semibold text-white">
              {product.rating}
            </span>
            <div>
              <Rating value={product.rating} size="sm" showValue={false} />
              <p className="mt-1 text-xs text-slate-500">
                {product.reviewCount.toLocaleString()} reviews
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {distribution.map(({ star, percentage, count }) => (
              <li key={star} className="flex items-center gap-3 text-xs">
                <span className="w-8 shrink-0 text-slate-400">{star} ★</span>
                <div
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
                  role="img"
                  aria-label={`${percentage}% of reviews are ${star} star`}
                >
                  <div
                    className="h-full rounded-full bg-volt-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right tabular-nums text-slate-500">
                  {count}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.07] pt-5">
            {FILTERS.map((f) => (
              <button
                key={String(f.key)}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cx(
                  'rounded-full border px-3 py-1.5 text-xs transition-colors',
                  filter === f.key
                    ? 'border-pulse-400/60 bg-pulse-400/10 text-pulse-200'
                    : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white',
                )}
                aria-pressed={filter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {visibleReviews.length === 0 ? (
            <p className="card-surface px-6 py-12 text-center text-sm text-slate-400">
              No reviews match this filter. We publish every rating, including the critical ones.
            </p>
          ) : (
            <ul className="space-y-5">
              {visibleReviews.map((review) => (
                <li key={review.id} className="card-surface p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pulse-400/25 to-pulse-600/25 text-xs font-semibold text-pulse-200"
                      aria-hidden
                    >
                      {review.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">{review.author}</p>
                      <p className="text-xs text-slate-500">
                        {review.location} · {formatDate(review.date)}
                        {review.variant && ` · ${review.variant}`}
                      </p>
                    </div>
                    {review.verified && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" aria-hidden />
                        Verified
                      </span>
                    )}
                  </div>

                  <Rating value={review.rating} size="sm" className="mb-3" />
                  <h3 className="mb-2 font-display text-base font-semibold text-white">
                    {review.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">{review.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
