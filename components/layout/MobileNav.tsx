'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/categories';
import { getFeaturedProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

const secondaryNav = [
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Support' },
];

export function MobileNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const featured = getFeaturedProducts(3);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-ink-950/80 backdrop-blur-sm lg:hidden"
        aria-hidden
      />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 38 }}
        className="fixed inset-y-0 right-0 z-[90] flex w-[85vw] max-w-sm flex-col border-l border-white/10 bg-ink-900 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="font-display text-base font-bold tracking-[0.2em] text-white">PULSE</span>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <Link
            href="/shop"
            onClick={onClose}
            className="block border-b border-white/[0.06] py-3.5 font-display text-lg font-semibold text-white"
          >
            Shop all
          </Link>

          <p className="eyebrow mb-3 mt-7">Categories</p>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              onClick={onClose}
              className="block border-b border-white/[0.06] py-3.5 text-base text-slate-300 transition-colors hover:text-pulse-300"
            >
              {category.name}
            </Link>
          ))}

          <p className="eyebrow mb-3 mt-7">Explore</p>
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block border-b border-white/[0.06] py-3.5 text-base text-slate-300 transition-colors hover:text-pulse-300"
            >
              {item.label}
            </Link>
          ))}

          <p className="eyebrow mb-3 mt-7">Featured</p>
          <ul className="space-y-3">
            {featured.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-300">
                    {product.name}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-5">
          <Link
            href="/cart"
            onClick={onClose}
            className="block rounded-full bg-pulse-400 px-5 py-3.5 text-center text-sm font-semibold text-ink-950"
            aria-current={pathname === '/cart' ? 'page' : undefined}
          >
            View cart
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
