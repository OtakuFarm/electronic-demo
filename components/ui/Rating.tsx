import { Star } from 'lucide-react';
import { cx } from '@/lib/utils';

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
}

const sizeMap = {
  sm: { star: 'h-3 w-3', text: 'text-xs' },
  md: { star: 'h-3.5 w-3.5', text: 'text-sm' },
  lg: { star: 'h-4 w-4', text: 'text-base' },
} as const;

export function Rating({
  value,
  reviewCount,
  size = 'md',
  className,
  showValue = true,
}: RatingProps) {
  const { star, text } = sizeMap[size];
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={cx('flex items-center gap-1.5', className)}>
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${value} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => {
          const fill = Math.max(0, Math.min(1, rounded - i));
          return (
            <span key={i} className="relative inline-block">
              <Star className={cx(star, 'text-white/15')} aria-hidden />
              {fill > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star className={cx(star, 'fill-volt-400 text-volt-400')} aria-hidden />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && <span className={cx(text, 'font-medium text-slate-300')}>{value}</span>}
      {typeof reviewCount === 'number' && (
        <span className={cx(text, 'text-slate-500')}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
