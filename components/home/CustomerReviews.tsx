import { Quote, Star } from 'lucide-react';
import { getTopReviews } from '@/lib/products';
import { formatDate } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { Rating } from '@/components/ui/Rating';

export function CustomerReviews() {
  const reviews = getTopReviews(6);

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, i) => (
        <Reveal key={review.id} delay={i * 0.06}>
          <figure className="card-surface card-hover flex h-full flex-col p-6">
            <Quote className="mb-4 h-6 w-6 text-pulse-400/40" aria-hidden />
            <Rating value={review.rating} size="sm" className="mb-3" />
            <blockquote className="flex-1">
              <p className="mb-4 font-display text-base font-semibold leading-snug text-white">
                {review.title}
              </p>
              <p className="text-sm leading-relaxed text-slate-400">{review.body}</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pulse-400/25 to-pulse-600/25 text-xs font-semibold text-pulse-200"
                aria-hidden
              >
                {review.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {review.author}
                  {review.verified && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5 align-middle text-[11px] font-normal text-emerald-300">
                      <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
                      Verified
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {review.productName} · {formatDate(review.date)}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
