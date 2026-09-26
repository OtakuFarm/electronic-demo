'use client';

import { useState } from 'react';
import { Check, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cx, discountPercent, formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Rating } from '@/components/ui/Rating';
import { StockBadge } from '@/components/ui/Badge';

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? 'Default');
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const wishlisted = isInWishlist(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const soldOut = product.stock === 'out-of-stock';

  function handleAdd() {
    addToCart(product.id, quantity, selectedColor);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="lg:sticky lg:top-24">
      <div className="mb-4 flex items-center gap-3">
        <StockBadge status={product.stock} count={product.stockCount} />
        <span className="text-xs text-slate-500">SKU {product.sku}</span>
      </div>

      <h1 className="display-lg text-balance">{product.name}</h1>
      <p className="mt-3 text-lg text-slate-400">{product.tagline}</p>

      <div className="mt-5">
        <Rating value={product.rating} reviewCount={product.reviewCount} size="lg" />
      </div>

      <div className="mt-7 flex flex-wrap items-baseline gap-3">
        <span className="font-display text-4xl font-semibold text-white">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="text-lg text-slate-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            {discount && (
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                Save {discount}%
              </span>
            )}
          </>
        )}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        or 4 interest-free payments of {formatPrice(product.price / 4)}
      </p>

      <p className="mt-6 text-sm leading-relaxed text-slate-300">{product.description}</p>

      <ColorPicker
        product={product}
        selected={selectedColor}
        onSelect={setSelectedColor}
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={Math.max(1, product.stockCount)}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className={cx(
            'h-12 flex-1 rounded-full px-8 text-sm font-semibold transition-all active:scale-[0.99]',
            soldOut
              ? 'cursor-not-allowed bg-white/10 text-slate-500'
              : justAdded
                ? 'bg-emerald-400 text-ink-950'
                : 'bg-pulse-400 text-ink-950 hover:bg-pulse-300',
          )}
        >
          {soldOut ? 'Out of stock' : justAdded ? 'Added to cart ✓' : 'Add to cart'}
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={cx(
            'grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors',
            wishlisted
              ? 'border-coral-500/50 bg-coral-500/10 text-coral-400'
              : 'border-white/15 text-white hover:border-pulse-400/50 hover:bg-white/[0.04]',
          )}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={wishlisted}
        >
          <Heart className={cx('h-5 w-5', wishlisted && 'fill-current')} aria-hidden />
        </button>
      </div>

      <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
        {[
          { icon: Truck, text: 'Free delivery over $150 · 2–4 business days' },
          { icon: RotateCcw, text: '60-day returns, even if you have used it' },
          {
            icon: ShieldCheck,
            text: `${product.warranty.period} warranty — ${product.warranty.summary}`,
          },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3 text-sm text-slate-400">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pulse-400" aria-hidden />
            {text}
          </li>
        ))}
      </ul>

      {product.stock === 'in-stock' && product.stockCount < 50 && (
        <p className="mt-5 flex items-center gap-2 text-xs text-amber-300">
          <Check className="h-3.5 w-3.5" aria-hidden />
          In stock and ready to ship — {product.stockCount} units remaining
        </p>
      )}
    </div>
  );
}

function ColorPicker({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: string;
  onSelect: (name: string) => void;
}) {
  if (product.colors.length <= 1) return null;

  return (
    <fieldset className="mt-8">
      <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Colour: <span className="text-white">{selected}</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {product.colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelect(color.name)}
            className={cx(
              'grid h-10 w-10 place-items-center rounded-full border-2 transition-all',
              selected === color.name
                ? 'scale-110 border-pulse-400'
                : 'border-white/15 hover:border-white/40',
            )}
            aria-label={`Select ${color.name}`}
            aria-pressed={selected === color.name}
          >
            <span
              className="h-7 w-7 rounded-full ring-1 ring-inset ring-black/20"
              style={{ backgroundColor: color.hex }}
            />
          </button>
        ))}
      </div>
    </fieldset>
  );
}
