'use client';

import { useMemo, useState } from 'react';
import { Check, Scale, X } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/lib/products';
import type { Product } from '@/lib/types';
import { cx, formatPrice } from '@/lib/utils';
import { useStore, MAX_COMPARE } from '@/context/StoreContext';
import { PageHeader } from '@/components/layout/PageHeader';

interface Row {
  label: string;
  get: (p: Product) => string;
  highlight?: 'lowest-price' | 'lowest-weight';
}

const ROWS: Row[] = [
  { label: 'Price', get: (p) => formatPrice(p.price), highlight: 'lowest-price' },
  { label: 'Battery life', get: (p) => p.compare.batteryLife },
  { label: 'Weight', get: (p) => p.compare.weight, highlight: 'lowest-weight' },
  { label: 'Connectivity', get: (p) => p.compare.connectivity },
  { label: 'Water resistance', get: (p) => p.compare.waterResistance },
  { label: 'Warranty', get: (p) => p.compare.warranty },
  { label: 'Main feature', get: (p) => p.compare.mainFeature },
];

/** Pull the leading number out of "254 g" so weights can be ranked. */
function weightValue(raw: string): number {
  const match = raw.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

export function CompareClient() {
  const { compareProducts, removeFromCompare, clearCompare, toggleCompare } = useStore();
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  const rows = useMemo(() => {
    if (!onlyDifferences || compareProducts.length < 2) return ROWS;
    return ROWS.filter((row) => new Set(compareProducts.map((p) => row.get(p))).size > 1);
  }, [onlyDifferences, compareProducts]);

  const lowestPrice = useMemo(
    () => (compareProducts.length > 1 ? Math.min(...compareProducts.map((p) => p.price)) : null),
    [compareProducts],
  );

  const lightestWeight = useMemo(
    () =>
      compareProducts.length > 1
        ? Math.min(...compareProducts.map((p) => weightValue(p.compare.weight)))
        : null,
    [compareProducts],
  );

  const available = products.filter((p) => !compareProducts.some((c) => c.id === p.id));

  return (
    <>
      <PageHeader
        eyebrow="Decision tool"
        title="Compare products"
        description="Put up to three products side by side. We highlight the lowest price and the lightest weight automatically."
      />

      <div className="container-page py-12">
        {compareProducts.length === 0 ? (
          <EmptyCompare available={available} onAdd={toggleCompare} />
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <p className="text-sm text-slate-400" role="status" aria-live="polite">
                Comparing{' '}
                <span className="font-medium text-white">
                  {compareProducts.length} of {MAX_COMPARE}
                </span>
              </p>

              {compareProducts.length > 1 && (
                <label className="ml-auto flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={onlyDifferences}
                    onChange={(e) => setOnlyDifferences(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-ink-850 text-pulse-400 focus:ring-pulse-400/50 focus:ring-offset-0"
                  />
                  Show differences only
                </label>
              )}

              <button
                type="button"
                onClick={clearCompare}
                className={cx(
                  'rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-coral-500/40 hover:text-coral-400',
                  compareProducts.length > 1 && 'ml-auto',
                )}
              >
                Clear all
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[44rem] border-separate border-spacing-0">
                  <caption className="sr-only">
                    Side-by-side comparison of {compareProducts.length} PULSE products
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className="w-44 p-4 text-left">
                        <span className="sr-only">Specification</span>
                      </th>
                      {compareProducts.map((product) => (
                        <th
                          key={product.id}
                          scope="col"
                          className="min-w-[13rem] border-b border-white/10 p-4 text-left align-top"
                        >
                          <ProductHeader
                            product={product}
                            onRemove={() => removeFromCompare(product.id)}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.label}>
                        <th
                          scope="row"
                          className="border-b border-white/[0.06] p-4 text-left align-top text-sm font-medium text-slate-400"
                        >
                          {row.label}
                        </th>
                        {compareProducts.map((product) => (
                          <CompareCell
                            key={product.id}
                            product={product}
                            row={row}
                            striped={i % 2 === 1}
                            isBest={
                              (row.highlight === 'lowest-price' &&
                                product.price === lowestPrice) ||
                              (row.highlight === 'lowest-weight' &&
                                weightValue(product.compare.weight) === lightestWeight)
                            }
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: one card per product */}
              <div className="space-y-5 lg:hidden">
                {compareProducts.map((product) => (
                  <div key={product.id} className="card-surface p-5">
                    <ProductHeader
                      product={product}
                      onRemove={() => removeFromCompare(product.id)}
                      compact
                    />
                    <dl className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                      {rows.map((row) => (
                        <div key={row.label} className="flex justify-between gap-4 text-sm">
                          <dt className="shrink-0 text-slate-500">{row.label}</dt>
                          <dd className="text-right text-slate-300">{row.get(product)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>

              <ComparePicker
                available={available}
                isFull={compareProducts.length >= MAX_COMPARE}
                onAdd={toggleCompare}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

interface ProductHeaderProps {
  product: Product;
  onRemove: () => void;
  compact?: boolean;
}

function ProductHeader({ product, onRemove, compact = false }: ProductHeaderProps) {
  return (
    <div className={compact ? '' : 'pr-2'}>
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/product/${product.slug}`}
          className="font-display text-base font-semibold leading-snug text-white hover:text-pulse-300"
        >
          {product.name}
        </Link>
        <button
          type="button"
          onClick={onRemove}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-coral-400"
          aria-label={`Remove ${product.name} from comparison`}
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
      <p className="mt-1 font-display text-lg font-semibold text-pulse-300">
        {formatPrice(product.price)}
      </p>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
        {product.tagline}
      </p>
    </div>
  );
}

function CompareCell({
  product,
  row,
  striped,
  isBest,
}: {
  product: Product;
  row: Row;
  striped: boolean;
  isBest: boolean;
}) {
  return (
    <td
      className={cx(
        'border-b border-white/[0.06] p-4 align-top text-sm',
        isBest ? 'text-white' : 'text-slate-300',
        striped && 'bg-white/[0.015]',
      )}
    >
      <span className="flex items-start gap-2">
        {row.get(product)}
        {isBest && (
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            <Check className="h-2.5 w-2.5" aria-hidden />
            Best
          </span>
        )}
      </span>
    </td>
  );
}


function ComparePicker({
  available,
  isFull,
  onAdd,
}: {
  available: Product[];
  isFull: boolean;
  onAdd: (id: string) => void;
}) {
  return (
    <div className="lg:w-72">
      <div className="card-surface p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {isFull ? 'Comparison full' : 'Add another product'}
        </h2>
        <ul className="space-y-2">
          {available.slice(0, 8).map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => onAdd(product.id)}
                disabled={isFull}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <span
                  className="h-10 w-10 shrink-0 rounded-lg bg-ink-850 bg-cover"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-medium text-white">
                    {product.name}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {formatPrice(product.price)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        {isFull && (
          <p className="mt-4 border-t border-white/[0.06] pt-4 text-xs text-slate-500">
            Remove a product to swap in a different one.
          </p>
        )}
      </div>
    </div>
  );
}

function EmptyCompare({
  available,
  onAdd,
}: {
  available: Product[];
  onAdd: (id: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
        <Scale className="h-7 w-7 text-pulse-300" aria-hidden />
      </span>
      <h2 className="display-md text-balance">Nothing to compare yet</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
        Add two or three products and we&rsquo;ll line up price, battery, weight, connectivity,
        water resistance and warranty so the differences are obvious at a glance.
      </p>

      <ul className="mt-10 grid gap-3 text-left sm:grid-cols-2">
        {available.slice(0, 6).map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => onAdd(product.id)}
              className="card-surface card-hover flex w-full items-center gap-3 p-3 text-left"
            >
              <span
                className="h-12 w-12 shrink-0 rounded-lg bg-ink-850 bg-cover"
                style={{ backgroundImage: `url(${product.images[0]})` }}
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">
                  {product.name}
                </span>
                <span className="block text-xs text-slate-500">
                  {formatPrice(product.price)}
                </span>
              </span>
              <span className="shrink-0 rounded-full border border-pulse-400/25 px-2.5 py-1 text-[11px] font-medium text-pulse-300">
                Add
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

