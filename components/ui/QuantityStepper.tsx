'use client';

import { Minus, Plus } from 'lucide-react';
import { cx } from '@/lib/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  label?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  label = 'Quantity',
}: QuantityStepperProps) {
  const btn =
    size === 'sm'
      ? 'h-8 w-8'
      : 'h-11 w-11';
  const icon = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div
      className={cx(
        'inline-flex items-center rounded-full border border-white/10 bg-ink-850/80',
        size === 'sm' ? 'h-9' : 'h-12',
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cx(
          btn,
          'grid place-items-center rounded-l-full text-slate-400 transition-colors hover:text-white disabled:opacity-30',
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={icon} aria-hidden />
      </button>
      <span
        className={cx(
          'min-w-[2.25rem] text-center font-medium tabular-nums text-white',
          size === 'sm' ? 'text-sm' : 'text-base',
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cx(
          btn,
          'grid place-items-center rounded-r-full text-slate-400 transition-colors hover:text-white disabled:opacity-30',
        )}
        aria-label="Increase quantity"
      >
        <Plus className={icon} aria-hidden />
      </button>
    </div>
  );
}
