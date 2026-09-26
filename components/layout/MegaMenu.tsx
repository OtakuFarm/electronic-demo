'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

export function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onClose}
      className="absolute left-1/2 top-full z-50 w-[min(90vw,68rem)] -translate-x-1/2 pt-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="card-surface grid gap-6 p-6 shadow-2xl backdrop-blur-2xl md:grid-cols-3">
        {categories.map((category) => {
          const products = getProductsByCategory(category.slug).slice(0, 2);
          return (
            <div key={category.slug}>
              <Link
                href={`/${category.slug}`}
                className="group mb-4 block"
                aria-label={`Shop ${category.name}`}
              >
                <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl bg-ink-850">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-white">
                    {category.name}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 text-pulse-300 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </div>
              </Link>
              <ul className="space-y-1.5">
                {products.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <span
                        className="h-9 w-9 shrink-0 rounded-md bg-ink-800 bg-cover"
                        style={{ backgroundImage: `url(${product.images[0]})` }}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-slate-200">
                          {product.name}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
