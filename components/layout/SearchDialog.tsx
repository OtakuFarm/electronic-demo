'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/lib/products';
import { filterAndSortProducts, formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

const POPULAR = ['Noise cancelling', 'USB-C', 'Mechanical keyboard', 'Home hub', 'Earbuds'];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    setQuery('');
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const results = useMemo(
    () => (query.trim() ? filterAndSortProducts(products, { query }) : []),
    [query],
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink-950/85 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[90] border-b border-white/10 bg-ink-900/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
          >
            <div className="container-page py-5">
              <form onSubmit={submit} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    aria-hidden
                  />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search headphones, hubs, keyboards…"
                    className="field h-14 pl-12 pr-10 text-base"
                    aria-label="Search products"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 hover:text-white"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition-colors hover:text-white"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </form>

              <SearchResults
                query={query}
                results={results}
                onClose={onClose}
                onSubmit={submit}
                onPickTerm={setQuery}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface SearchResultsProps {
  query: string;
  results: Product[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onPickTerm: (term: string) => void;
}

function SearchResults({
  query,
  results,
  onClose,
  onSubmit,
  onPickTerm,
}: SearchResultsProps) {
  if (!query.trim()) {
    return (
      <div className="mt-5">
        <p className="eyebrow mb-3">Popular searches</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onPickTerm(term)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-pulse-400/50 hover:text-pulse-300"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-slate-400">No products match &ldquo;{query}&rdquo;.</p>
        <button
          type="button"
          onClick={onSubmit}
          className="mt-4 text-sm font-medium text-pulse-300 hover:text-pulse-200"
        >
          Browse the full catalogue instead
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 max-h-[55vh] overflow-y-auto">
        <p className="eyebrow mb-3">
          {results.length} result{results.length === 1 ? '' : 's'}
        </p>
        <ul className="divide-y divide-white/[0.06]">
          {results.slice(0, 6).map((product) => (
            <li key={product.id}>
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 py-3 transition-colors hover:bg-white/[0.03]"
              >
                <span
                  className="h-12 w-12 shrink-0 rounded-lg bg-ink-800 bg-cover"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white">
                    {product.name}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {product.tagline}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-medium text-white">
                  {formatPrice(product.price)}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-600" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onSubmit}
          className="mt-4 w-full rounded-full border border-white/10 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-pulse-400/50 hover:text-pulse-300"
        >
          See all results for &ldquo;{query}&rdquo;
        </button>
      </div>
    </>
  );
}
