'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cx } from '@/lib/utils';

const variants = {
  default: { icon: Info, ring: 'border-white/10', color: 'text-pulse-300' },
  success: { icon: CheckCircle2, ring: 'border-emerald-400/25', color: 'text-emerald-300' },
  error: { icon: XCircle, ring: 'border-coral-500/30', color: 'text-coral-400' },
  info: { icon: Info, ring: 'border-pulse-400/25', color: 'text-pulse-300' },
} as const;

export function ToastViewport() {
  const { toasts, dismissToast } = useStore();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const config = variants[toast.variant];
          const Icon = config.icon;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 32, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className={cx(
                'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-ink-850/95 p-4 shadow-2xl backdrop-blur-xl',
                config.ring,
              )}
            >
              <Icon className={cx('mt-0.5 h-5 w-5 shrink-0', config.color)} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{toast.title}</p>
                {toast.description && (
                  <p className="mt-0.5 truncate text-sm text-slate-400">{toast.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="-m-1 rounded-lg p-1 text-slate-500 transition-colors hover:text-white"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
