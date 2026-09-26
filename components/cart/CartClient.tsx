'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cx, formatPrice } from '@/lib/utils';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';

const FREE_SHIPPING_THRESHOLD = 150;
const TAX_RATE = 0.08;

export function CartClient() {
  const {
    cartLines,
    cartCount,
    cartSubtotal,
    cartShipping,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  if (cartLines.length === 0) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
            <ShoppingBag className="h-8 w-8 text-slate-500" aria-hidden />
          </span>
          <h1 className="display-md">Your cart is empty</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Nothing here yet. Browse the range and add something engineered to last — everything
            ships with a 2–3 year warranty.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-pulse-400 px-7 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
          >
            Shop the range
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  const tax = cartSubtotal * TAX_RATE;
  const total = cartSubtotal + cartShipping + tax;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const progress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="container-page py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="display-lg">
          Your cart{' '}
          <span className="text-slate-500">
            ({cartCount} item{cartCount === 1 ? '' : 's'})
          </span>
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-coral-500/40 hover:text-coral-400"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="card-surface mb-6 p-5">
            <p className="mb-2.5 flex items-center gap-2 text-sm text-slate-400">
              <Truck className="h-4 w-4 text-pulse-400" aria-hidden />
              {remaining > 0 ? (
                <>
                  Add <span className="font-medium text-white">{formatPrice(remaining)}</span> for
                  free delivery
                </>
              ) : (
                <span className="font-medium text-emerald-300">
                  You&rsquo;ve unlocked free delivery
                </span>
              )}
            </p>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress toward free delivery"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-pulse-400"
              />
            </div>
          </div>

          <ul className="space-y-4">
            {cartLines.map((line) => (
              <li key={`${line.product.id}-${line.color}`} className="card-surface p-4 sm:p-5">
                <div className="flex gap-4 sm:gap-5">
                  <Link
                    href={`/product/${line.product.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-850 sm:h-28 sm:w-28"
                  >
                    <Image
                      src={line.product.images[0]}
                      alt={line.product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${line.product.slug}`}
                          className="font-display text-base font-semibold text-white hover:text-pulse-300 sm:text-lg"
                        >
                          {line.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-slate-500">
                          {line.color} · SKU {line.product.sku}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.product.id, line.color)}
                        className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors hover:bg-coral-500/10 hover:text-coral-400"
                        aria-label={`Remove ${line.product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                      <QuantityStepper
                        value={line.quantity}
                        onChange={(q) => updateQuantity(line.product.id, line.color, q)}
                        max={line.product.stockCount}
                        size="sm"
                      />
                      <div className="text-right">
                        <p className="font-display text-lg font-semibold text-white">
                          {formatPrice(line.product.price * line.quantity)}
                        </p>
                        {line.quantity > 1 && (
                          <p className="text-xs text-slate-500">
                            {formatPrice(line.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/shop" className="link-underline mt-8">
            <ArrowRight className="h-3.5 w-3.5 rotate-180" aria-hidden />
            Continue shopping
          </Link>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-semibold text-white">Order summary</h2>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-400">Subtotal</dt>
                <dd className="font-medium text-white">{formatPrice(cartSubtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Delivery</dt>
                <dd
                  className={cx(
                    'font-medium',
                    cartShipping === 0 ? 'text-emerald-300' : 'text-white',
                  )}
                >
                  {cartShipping === 0 ? 'Free' : formatPrice(cartShipping)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Estimated tax</dt>
                <dd className="font-medium text-white">{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 text-base">
                <dt className="font-medium text-white">Total</dt>
                <dd className="font-display text-xl font-semibold text-white">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              disabled
              className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 text-sm font-semibold text-slate-400"
              title="Payments are disabled in this portfolio demo"
            >
              <Lock className="h-4 w-4" aria-hidden />
              Checkout (demo only)
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
              This is a portfolio demonstration. No payment is processed and no order is placed.
            </p>
          </div>

          <div className="card-surface mt-5 p-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Join for 10% off
            </h2>
            <NewsletterForm variant="footer" />
          </div>
        </aside>
      </div>
    </div>
  );
}
