import { cx } from '@/lib/utils';
import type { StockStatus } from '@/lib/types';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent';

const tones: Record<Tone, string> = {
  neutral: 'border-white/15 bg-white/[0.06] text-slate-300',
  success: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  warning: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
  danger: 'border-coral-500/30 bg-coral-500/10 text-coral-400',
  accent: 'border-pulse-400/30 bg-pulse-400/10 text-pulse-300',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const stockConfig: Record<StockStatus, { label: string; tone: Tone; dot: string }> = {
  'in-stock': { label: 'In stock', tone: 'success', dot: 'bg-emerald-400' },
  'low-stock': { label: 'Low stock', tone: 'warning', dot: 'bg-amber-400' },
  'out-of-stock': { label: 'Out of stock', tone: 'danger', dot: 'bg-coral-500' },
};

export function StockBadge({
  status,
  count,
  className,
}: {
  status: StockStatus;
  count?: number;
  className?: string;
}) {
  const config = stockConfig[status];
  const label =
    status === 'low-stock' && typeof count === 'number' ? `Only ${count} left` : config.label;

  return (
    <Badge tone={config.tone} className={className}>
      <span className={cx('h-1.5 w-1.5 rounded-full', config.dot)} aria-hidden />
      {label}
    </Badge>
  );
}
