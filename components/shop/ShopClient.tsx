'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SearchX, SlidersHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import {
  CATEGORY_LABELS,
  cx,
  filterAndSortProducts,
  formatPrice,
  PRICE_BOUNDS,
} from '@/lib/utils';
import type { CategorySlug, SortOption } from '@/lib/types';
import { ProductGrid } from '@/components/product/ProductGrid';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

const RATINGS = [4.8, 4.6, 4.4, 0];

export function ShopClient({
  initialCategory,
  lockedCategory = false,
}: {
  initialCategory?: CategorySlug;
  lockedCategory?: boolean;
}) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') ?? '';
  const sortParam = (searchParams.get('sort') as SortOption | null) ?? 'featured';

  const [query, setQuery] = useState(queryParam);
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [maxPrice, setMaxPrice] = useState(PRICE_BOUNDS.max);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>(sortParam);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => setQuery(queryParam), [queryParam]);
  useEffect(() => setSort(sortParam), [sortParam]);
  useEffect(() => {
    if (lockedCategory && initialCategory) setSelectedCategories([initialCategory]);
  }, [lockedCategory, initialCategory]);

  const results = useMemo(
    () =>
      filterAndSortProducts(products, {
        query,
        categories: selectedCategories,
        maxPrice,
        minRating,
        inStockOnly,
        sort,
      }),
    [query, selectedCategories, maxPrice, minRating, inStockOnly, sort],
  );

  const activeFilterCount =
    selectedCategories.length +
    (maxPrice < PRICE_BOUNDS.max ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  function toggleCategory(slug: CategorySlug) {
    if (lockedCategory) return;
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug],
    );
  }

  function resetFilters() {
    if (!lockedCategory) setSelectedCategories([]);
    setMaxPrice(PRICE_BOUNDS.max);
    setMinRating(0);
    setInStockOnly(false);
  }

  const filterPanel = (
    <FilterPanel
      selectedCategories={selectedCategories}
      toggleCategory={toggleCategory}
      lockedCategory={lockedCategory}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      minRating={minRating}
      setMinRating={setMinRating}
      inStockOnly={inStockOnly}
      setInStockOnly={setInStockOnly}
      resetFilters={resetFilters}
    />
  );

  return (
    <div className="container-page pb-20">
      <div className="flex gap-8 lg:gap-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">{filterPanel}</div>
        </aside>

        <AnimatePresence>
          {filtersOpen && (
            <MobileFilters resultCount={results.length} onClose={() => setFiltersOpen(false)}>
              {filterPanel}
            </MobileFilters>
          )}
        </AnimatePresence>

        <div className="min-w-0 flex-1">
          <ResultsToolbar
            count={results.length}
            query={query}
            sort={sort}
            setSort={setSort}
            activeFilterCount={activeFilterCount}
            onOpenFilters={() => setFiltersOpen(true)}
          />

          <ActiveFilters
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            resetFilters={resetFilters}
          />

          {results.length === 0 ? (
            <NoResults
              onReset={() => {
                resetFilters();
                setQuery('');
              }}
            />
          ) : (
            <ProductGrid products={results} columns={3} />
          )}
        </div>
      </div>
    </div>
  );
}

interface ResultsToolbarProps {
  count: number;
  query: string;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
}

function ResultsToolbar({
  count,
  query,
  sort,
  setSort,
  activeFilterCount,
  onOpenFilters,
}: ResultsToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <p className="text-sm text-slate-400" role="status" aria-live="polite">
        <span className="font-medium text-white">{count}</span> product{count === 1 ? '' : 's'}
        {query && (
          <>
            {' '}for &ldquo;<span className="text-white">{query}</span>&rdquo;
          </>
        )}
      </p>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilters}
          className="flex h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-pulse-400/50 hover:text-white lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
          {activeFilterCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-pulse-400 px-1 text-[11px] font-bold text-ink-950">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="relative">
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-11 appearance-none rounded-full border border-white/10 bg-ink-850/80 pl-4 pr-9 text-sm text-white focus:border-pulse-400/60 focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-ink-900">
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface ActiveFiltersProps {
  selectedCategories: CategorySlug[];
  toggleCategory: (slug: CategorySlug) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  resetFilters: () => void;
}

function ActiveFilters({
  selectedCategories,
  toggleCategory,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  resetFilters,
}: ActiveFiltersProps) {
  const hasAny =
    selectedCategories.length > 0 ||
    maxPrice < PRICE_BOUNDS.max ||
    minRating > 0 ||
    inStockOnly;

  if (!hasAny) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {selectedCategories.map((slug) => (
        <FilterChip
          key={slug}
          label={CATEGORY_LABELS[slug]}
          onRemove={() => toggleCategory(slug)}
        />
      ))}
      {maxPrice < PRICE_BOUNDS.max && (
        <FilterChip
          label={`Under ${formatPrice(maxPrice)}`}
          onRemove={() => setMaxPrice(PRICE_BOUNDS.max)}
        />
      )}
      {minRating > 0 && (
        <FilterChip label={`${minRating}+ stars`} onRemove={() => setMinRating(0)} />
      )}
      {inStockOnly && (
        <FilterChip label="In stock" onRemove={() => setInStockOnly(false)} />
      )}
      <button
        type="button"
        onClick={resetFilters}
        className="text-xs text-slate-400 underline underline-offset-4 transition-colors hover:text-white"
      >
        Clear all
      </button>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-pulse-400/25 bg-pulse-400/10 py-1.5 pl-3 pr-2 text-xs font-medium text-pulse-200">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="grid h-4 w-4 place-items-center rounded-full transition-colors hover:bg-pulse-400/20"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" aria-hidden />
      </button>
    </span>
  );
}

function MobileFilters({
  children,
  resultCount,
  onClose,
}: {
  children: React.ReactNode;
  resultCount: number;
  onClose: () => void;
}) {
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
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        className="fixed inset-x-0 bottom-0 z-[90] max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-ink-900 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-ink-900 px-5 py-4">
          <h2 className="font-display text-base font-semibold text-white">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-slate-400 hover:text-white"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="px-5 pb-6">{children}</div>
        <div className="sticky bottom-0 border-t border-white/10 bg-ink-900 p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-pulse-400 py-3.5 text-sm font-semibold text-ink-950"
          >
            Show {resultCount} result{resultCount === 1 ? '' : 's'}
          </button>
        </div>
      </motion.div>
    </>
  );
}

function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="card-surface flex flex-col items-center justify-center px-6 py-20 text-center">
      <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-white/[0.05]">
        <SearchX className="h-6 w-6 text-slate-500" aria-hidden />
      </span>
      <h2 className="font-display text-lg font-semibold text-white">No products found</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-400">
        Try widening your price range, clearing a filter, or searching for something else.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-pulse-400/50"
      >
        Reset everything
      </button>
    </div>
  );
}

interface FilterPanelProps {
  selectedCategories: CategorySlug[];
  toggleCategory: (slug: CategorySlug) => void;
  lockedCategory: boolean;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  resetFilters: () => void;
}

function FilterPanel({
  selectedCategories,
  toggleCategory,
  lockedCategory,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  resetFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-8">
      {!lockedCategory && (
        <fieldset>
          <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Category
          </legend>
          <div className="space-y-2.5">
            {categories.map((category) => (
              <label
                key={category.slug}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => toggleCategory(category.slug)}
                  className="h-4 w-4 rounded border-white/20 bg-ink-850 text-pulse-400 focus:ring-pulse-400/50 focus:ring-offset-0"
                />
                {category.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Max price
        </legend>
        <label htmlFor="price-range" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-range"
          type="range"
          min={PRICE_BOUNDS.min + 50}
          max={PRICE_BOUNDS.max}
          step={25}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-pulse-400"
          aria-valuetext={`Up to ${formatPrice(maxPrice)}`}
        />
        <div className="mt-2.5 flex justify-between text-xs text-slate-500">
          <span>{formatPrice(PRICE_BOUNDS.min + 50)}</span>
          <span className="font-medium text-white">
            {maxPrice >= PRICE_BOUNDS.max ? 'Any' : `Up to ${formatPrice(maxPrice)}`}
          </span>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Customer rating
        </legend>
        <div className="space-y-2.5">
          {RATINGS.map((rating) => (
            <label
              key={rating}
              className={cx(
                'flex cursor-pointer items-center gap-3 text-sm transition-colors',
                minRating === rating ? 'text-white' : 'text-slate-300 hover:text-white',
              )}
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="h-4 w-4 border-white/20 bg-ink-850 text-pulse-400 focus:ring-pulse-400/50 focus:ring-offset-0"
              />
              {rating === 0 ? 'Any rating' : `${rating} stars & up`}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Availability
        </legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-ink-850 text-pulse-400 focus:ring-pulse-400/50 focus:ring-offset-0"
          />
          In stock only
        </label>
      </fieldset>

      <button
        type="button"
        onClick={resetFilters}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 py-2.5 text-sm text-slate-300 transition-colors hover:border-pulse-400/50 hover:text-white"
      >
        <Filter className="h-3.5 w-3.5" aria-hidden />
        Clear filters
      </button>
    </div>
  );
}


