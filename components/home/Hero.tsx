'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { getProductBySlug } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { Rating } from '@/components/ui/Rating';
import { StaggerItem, StaggerGroup } from '@/components/ui/Reveal';

const HERO_STATS = [
  { value: '4.7/5', label: 'Average rating' },
  { value: '18k+', label: 'Reviews' },
  { value: '2–3 yr', label: 'Warranty' },
];

export function Hero() {
  const product = getProductBySlug('air-pro');
  const reduce = useReducedMotion();
  const { addToCart } = useStore();
  if (!product) return null;

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-grid-fade grid-lines opacity-60" />
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-pulse-500/15 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-pulse-600/10 blur-[120px]" />
      </div>

      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <StaggerGroup className="max-w-xl">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-pulse-400/25 bg-pulse-400/[0.08] px-3.5 py-1.5 text-xs font-medium text-pulse-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pulse-400" />
              </span>
              New: Air Pro adaptive ANC
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="display-xl mt-6 text-balance">
              Technology that
              <br />
              <span className="bg-gradient-to-r from-pulse-300 via-pulse-400 to-pulse-500 bg-clip-text text-transparent">
                moves with you.
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Audio, smart devices and desk accessories engineered to be repaired, upgraded and
              kept for years — not replaced. Every product ships with a two-year warranty and
              replaceable parts.
            </p>
          </StaggerItem>

          <StaggerItem>
            <Rating value={4.7} reviewCount={18420} size="lg" className="mt-7" />
          </StaggerItem>

          <StaggerItem>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-pulse-400 px-7 text-base font-medium text-ink-950 transition-all hover:bg-pulse-300 active:scale-[0.98]"
              >
                Shop the range
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/compare"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-white/15 px-7 text-base font-medium text-white transition-colors hover:border-pulse-400/50 hover:bg-white/[0.04]"
              >
                Compare products
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-xl font-semibold text-white sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-slate-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </StaggerGroup>

        <HeroVisual reduce={reduce === true} product={product} addToCart={addToCart} />
      </div>
    </section>
  );
}

interface HeroVisualProps {
  reduce: boolean;
  product: NonNullable<ReturnType<typeof getProductBySlug>>;
  addToCart: (id: string, quantity?: number, color?: string) => void;
}

function HeroVisual({ reduce, product, addToCart }: HeroVisualProps) {
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-glow">
        <Image
          src={product.images[0]}
          alt={`${product.name} — ${product.tagline}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 92vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />

        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-ink-900/85 p-5 backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold text-white">{product.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{product.tagline}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-display text-xl font-semibold text-white">
                {formatPrice(product.price)}
              </p>
              {product.compareAtPrice && (
                <p className="text-xs text-slate-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => addToCart(product.id, 1)}
              className="flex-1 rounded-full bg-pulse-400 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
            >
              Add to cart
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-pulse-400/50 hover:bg-white/[0.04]"
              aria-label={`Learn more about ${product.name}`}
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <motion.div
        initial={reduce ? undefined : { opacity: 0, x: -20, y: 20 }}
        animate={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-3 top-10 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-ink-850/90 px-4 py-3 backdrop-blur-xl sm:flex"
      >
        <Star className="h-4 w-4 fill-volt-400 text-volt-400" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-white">4.8 out of 5</p>
          <p className="text-xs text-slate-500">2,841 Air Pro reviews</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
