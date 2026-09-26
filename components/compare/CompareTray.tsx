'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Scale, X } from 'lucide-react';
import { useStore, MAX_COMPARE } from '@/context/StoreContext';
import { cx } from '@/lib/utils';

/** Sticky bottom bar that appears as soon as products are selected for comparison. */
export function CompareTray() {
  const { compareProducts, removeFromCompare, clearCompare, pushToast } = useStore();

  const visible = compareProducts.length > 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-ink-900/95 backdrop-blur-xl"
          role="region"
          aria-label="Product comparison tray"
        >
          <div className="container-page flex items-center gap-4 py-3.5">
            <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
              <Scale className="h-4 w-4 text-pulse-400" aria-hidden />
              <span className="font-medium text-white">
                {compareProducts.length}
              </span>
              <span>/{MAX_COMPARE}</span>
            </div>

            <ul className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
              {compareProducts.map((product) => (
                <li key={product.id} className="shrink-0">
                  <div className="relative">
                    <span
                      className="block h-14 w-14 overflow-hidden rounded-lg bg-ink-850"
                      title={product.name}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full border border-white/10 bg-ink-800 text-slate-300 transition-colors hover:border-coral-500/50 hover:text-coral-400"
                      aria-label={`Remove ${product.name} from comparison`}
                    >
                      <X className="h-3 w-3" aria-hidden />
                    </button>
                  </div>
                </li>
              ))}

              {Array.from({ length: Math.max(0, MAX_COMPARE - compareProducts.length) }).map(
                (_, i) => (
                  <li
                    key={`slot-${i}`}
                    className="hidden h-14 w-14 shrink-0 rounded-lg border border-dashed border-white/10 sm:block"
                    aria-hidden
                  />
                ),
              )}
            </ul>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  clearCompare();
                  pushToast({ title: 'Comparison cleared', variant: 'default' });
                }}
                className="rounded-full px-3.5 py-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className={cx(
                  'rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                  compareProducts.length >= 2
                    ? 'bg-pulse-400 text-ink-950 hover:bg-pulse-300'
                    : 'pointer-events-none bg-white/10 text-slate-500',
                )}
                aria-disabled={compareProducts.length < 2}
                title={
                  compareProducts.length < 2
                    ? 'Add at least two products to compare'
                    : 'Open comparison'
                }
              >
                Compare
              </Link>
            </div>
          </div>

          {compareProducts.length === 1 && (
            <p className="container-page pb-2.5 text-center text-xs text-slate-500 sm:text-right">
              Add one more product to start comparing
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
