'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Heart, Scale, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useStore } from '@/context/StoreContext';
import { cx, discountPercent, formatPrice } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { StockBadge } from '@/components/ui/Badge';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

export function ProductCard({ product, priority = false, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useStore();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);
  const comparing = isInCompare(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const soldOut = product.stock === 'out-of-stock';
  const secondaryImage = product.images[1] ?? product.images[0];

  function handleAdd(event: React.MouseEvent) {
    event.preventDefault();
    if (soldOut) return;
    addToCart(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-surface card-hover relative overflow-hidden">
        <div className="pointer-events-none absolute left-4 top-4 z-20 flex flex-col items-start gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className={cx(
                'rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur',
                badge === 'New' ? 'bg-volt-400 text-ink-950' : 'bg-white/90 text-ink-950',
              )}
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={cx(
              'grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink-900/80 backdrop-blur transition-all hover:border-pulse-400/50',
              wishlisted && 'border-coral-500/50 text-coral-400',
            )}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            aria-pressed={wishlisted}
          >
            <Heart className={cx('h-4 w-4', wishlisted && 'fill-coral-500')} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(product.id);
            }}
            className={cx(
              'grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink-900/80 backdrop-blur transition-all hover:border-pulse-400/50',
              comparing && 'border-pulse-400/60 text-pulse-300',
            )}
            aria-label={
              comparing ? `Remove ${product.name} from comparison` : `Compare ${product.name}`
            }
            aria-pressed={comparing}
          >
            <Scale className={cx('h-4 w-4', comparing && 'text-pulse-300')} aria-hidden />
          </button>
        </div>

        <ProductImage
          primary={product.images[0]}
          secondary={secondaryImage}
          alt={`${product.name} — ${product.tagline}`}
          href={`/product/${product.slug}`}
          priority={priority}
          hovered={hovered}
        />

        <div className="p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Rating value={product.rating} reviewCount={product.reviewCount} size="sm" />
            <StockBadge status={product.stock} count={product.stockCount} />
          </div>

          <h3 className="mb-1.5 font-display text-base font-semibold leading-snug text-white">
            <Link href={`/product/${product.slug}`} className="hover:text-pulse-300">
              {product.name}
            </Link>
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {product.tagline}
          </p>

          <div className="flex items-end justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {discount && (
                <span className="text-xs font-medium text-emerald-300">-{discount}%</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={soldOut}
              className={cx(
                'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-300',
                added
                  ? 'bg-emerald-400 text-ink-950'
                  : 'bg-white/[0.06] text-white hover:bg-pulse-400 hover:text-ink-950',
                soldOut && 'cursor-not-allowed opacity-40 hover:bg-white/[0.06] hover:text-white',
              )}
              aria-label={
                soldOut ? `${product.name} is out of stock` : `Add ${product.name} to cart`
              }
            >
              {added ? (
                <Check className="h-4 w-4" aria-hidden />
              ) : (
                <ShoppingBag className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
