'use client';

import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { products } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { formatPrice } from '@/lib/utils';

export function WishlistClient() {
  const { wishlist, toggleWishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
            <Heart className="h-8 w-8 text-slate-500" aria-hidden />
          </span>
          <h1 className="display-md">Your wishlist is empty</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Tap the heart on any product to save it here. Your wishlist is stored on this device, so
            it will still be here when you come back.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-pulse-400 px-7 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
          >
            Browse products
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  const total = saved.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="container-page py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-lg">Your wishlist</h1>
          <p className="mt-2 text-sm text-slate-400">
            {saved.length} saved product{saved.length === 1 ? '' : 's'} ·{' '}
            {formatPrice(total)} total
          </p>
        </div>
        <Link href="/compare" className="link-underline">
          Compare saved items
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <ProductGrid products={saved} />

      <div className="mt-12 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-6 text-center">
        <p className="text-sm text-slate-400">
          Your wishlist lives in this browser&rsquo;s local storage. Clearing site data will reset
          it.
        </p>
        <button
          type="button"
          onClick={() => saved.forEach((product) => toggleWishlist(product.id))}
          className="mt-4 rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition-colors hover:border-coral-500/40 hover:text-coral-400"
        >
          Clear wishlist
        </button>
      </div>
    </div>
  );
}
