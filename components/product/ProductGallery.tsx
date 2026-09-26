'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Scale, X } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cx } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { toggleCompare, isInCompare } = useStore();
  const comparing = isInCompare(product.id);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[activeIndex]}
              alt={`${product.name} — view ${activeIndex + 1} of ${product.images.length}`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-white backdrop-blur transition-colors hover:border-pulse-400/50"
            aria-label="View full size image"
          >
            <ExpandIcon />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/10 bg-ink-900/80 p-1.5 backdrop-blur">
          {product.images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cx(
                'h-2 rounded-full transition-all duration-300',
                i === activeIndex ? 'w-6 bg-pulse-400' : 'w-2 bg-white/30 hover:bg-white/60',
              )}
              aria-label={`View image ${i + 1}`}
              aria-current={i === activeIndex}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {product.images.map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cx(
              'relative aspect-square overflow-hidden rounded-xl border transition-all',
              i === activeIndex
                ? 'border-pulse-400 ring-1 ring-pulse-400/40'
                : 'border-white/10 opacity-60 hover:opacity-100',
            )}
            aria-label={`View ${product.name} image ${i + 1}`}
            aria-current={i === activeIndex}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 12vw, 22vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => toggleCompare(product.id)}
        className={cx(
          'mt-4 flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm font-medium transition-colors',
          comparing
            ? 'border-pulse-400/60 bg-pulse-400/10 text-pulse-200'
            : 'border-white/10 text-slate-300 hover:border-pulse-400/50 hover:text-white',
        )}
        aria-pressed={comparing}
      >
        <Scale className="h-4 w-4" aria-hidden />
        {comparing ? 'In comparison — remove' : 'Add to comparison'}
      </button>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            product={product}
            index={activeIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Lightbox({
  product,
  index,
  onClose,
}: {
  product: Product;
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-ink-950/95 p-6 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} full size image`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/[0.06]"
        aria-label="Close image viewer"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="relative aspect-square w-full max-w-3xl overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={product.images[index]}
          alt={`${product.name} enlarged view`}
          fill
          sizes="90vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
