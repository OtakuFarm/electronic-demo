'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchX } from 'lucide-react';
import { products } from '@/lib/products';
import { filterAndSortProducts } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductGrid } from '@/components/product/ProductGrid';

const SUGGESTIONS = ['Headphones', 'USB-C hub', 'Keyboard', 'Smart home', 'Charging'];

export function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [input, setInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  const results = filterAndSortProducts(products, { query });

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={query ? `Results for “${query}”` : 'Search products'}
        description={
          query
            ? `${results.length} product${results.length === 1 ? '' : 's'} matched your search.`
            : 'Search across the full PULSE range by name, feature or compatibility.'
        }
      />

      <div className="container-page py-12">
        {/* Inline search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(input.trim());
            window.history.replaceState(null, '', `/search?q=${encodeURIComponent(input.trim())}`);
          }}
          className="mx-auto mb-10 flex max-w-xl gap-2"
          role="search"
        >
          <label htmlFor="search-input" className="sr-only">
            Search products
          </label>
          <input
            id="search-input"
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search headphones, hubs, keyboards…"
            className="field h-12 flex-1"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-xl bg-pulse-400 px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
          >
            Search
          </button>
        </form>

        {query && results.length === 0 ? (
          <div className="card-surface flex flex-col items-center px-6 py-20 text-center">
            <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-white/[0.05]">
              <SearchX className="h-6 w-6 text-slate-500" aria-hidden />
            </span>
            <h2 className="font-display text-lg font-semibold text-white">No matches</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              We couldn&rsquo;t find anything for &ldquo;{query}&rdquo;. Try a broader term.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setInput(term);
                    setQuery(term);
                  }}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-pulse-400/50 hover:text-pulse-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </>
  );
}
