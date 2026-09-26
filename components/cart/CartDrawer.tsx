'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cx, formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer() {
  const {
    isCartOpen,
    setCartOpen,
    cartLines,
    cartCount,
    cartSubtotal,
    cartShipping,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useStore();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setCartOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setCartOpen]);

  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const progress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[80] bg-ink-950/80 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col border-l border-white/10 bg-ink-900"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-display text-base font-semibold text-white">
                Your cart
                {cartCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({cartCount} item{cartCount === 1 ? '' : 's'})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            {cartLines.length === 0 ? (
              <EmptyCart onClose={() => setCartOpen(false)} />
            ) : (
              <>
                <div className="border-b border-white/10 px-5 py-3">
                  <p className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                    <Truck className="h-3.5 w-3.5 text-pulse-400" aria-hidden />
                    {remainingForFree > 0 ? (
                      <>
                        You&rsquo;re{' '}
                        <span className="font-medium text-white">
                          {formatPrice(remainingForFree)}
                        </span>{' '}
                        away from free delivery
                      </>
                    ) : (
                      <span className="font-medium text-emerald-300">
                        Free delivery unlocked
                      </span>
                    )}
                  </p>
                  <div
                    className="h-1 overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progress toward free delivery"
                  >
                    <div
                      className="h-full rounded-full bg-pulse-400 transition-[width] duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <ul className="flex-1 divide-y divide-white/[0.06] overflow-y-auto px-5">
                  {cartLines.map((line) => (
                    <li key={`${line.product.id}-${line.color}`} className="flex gap-4 py-5">
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-850"
                      >
                        <Image
                          src={line.product.images[0]}
                          alt={line.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${line.product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="text-sm font-medium text-white hover:text-pulse-300"
                          >
                            {line.product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(line.product.id, line.color)}
                            className="shrink-0 rounded p-1 text-slate-500 transition-colors hover:text-coral-400"
                            aria-label={`Remove ${line.product.name} from cart`}
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">{line.color}</p>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center rounded-full border border-white/10">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(line.product.id, line.color, line.quantity - 1)
                              }
                              className="grid h-8 w-8 place-items-center rounded-l-full text-slate-400 transition-colors hover:text-white"
                              aria-label={`Decrease quantity of ${line.product.name}`}
                            >
                              <Minus className="h-3 w-3" aria-hidden />
                            </button>
                            <span className="min-w-[1.75rem] text-center text-sm font-medium tabular-nums text-white">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(line.product.id, line.color, line.quantity + 1)
                              }
                              disabled={line.quantity >= line.product.stockCount}
                              className="grid h-8 w-8 place-items-center rounded-r-full text-slate-400 transition-colors hover:text-white disabled:opacity-30"
                              aria-label={`Increase quantity of ${line.product.name}`}
                            >
                              <Plus className="h-3 w-3" aria-hidden />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-white">
                            {formatPrice(line.product.price * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-white/10 px-5 py-5">
                  <dl className="mb-4 space-y-2 text-sm">
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
                    <div className="flex justify-between border-t border-white/10 pt-2 text-base">
                      <dt className="font-medium text-white">Total</dt>
                      <dd className="font-display font-semibold text-white">
                        {formatPrice(cartTotal)}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="block w-full rounded-full bg-pulse-400 py-3.5 text-center text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
                  >
                    Review cart & checkout
                  </Link>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-2.5 w-full py-2 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    Continue shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-white/[0.05]">
        <ShoppingBag className="h-7 w-7 text-slate-500" aria-hidden />
      </span>
      <p className="mb-2 font-display text-lg font-semibold text-white">Your cart is empty</p>
      <p className="mb-6 text-sm text-slate-400">
        Browse the range and add something engineered to last.
      </p>
      <Link
        href="/shop"
        onClick={onClose}
        className="rounded-full bg-pulse-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
      >
        Start shopping
      </Link>
    </div>
  );
}
