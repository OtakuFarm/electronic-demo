import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import { getProductBySlug } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

const TEASER_SLUGS = ['air-pro', 'mini', 'watch-one'];

const ROWS = [
  { label: 'Battery life', key: 'batteryLife' as const },
  { label: 'Weight', key: 'weight' as const },
  { label: 'Connectivity', key: 'connectivity' as const },
  { label: 'Water resistance', key: 'waterResistance' as const },
  { label: 'Warranty', key: 'warranty' as const },
];

export function CompareTeaser() {
  const products = TEASER_SLUGS.map(getProductBySlug).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <div className="card-surface overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow mb-2">Side by side</p>
          <h2 className="display-md">Not sure which one?</h2>
          <p className="mt-2 text-sm text-slate-400">
            Compare up to three products across price, battery, weight, connectivity and warranty.
          </p>
        </div>
        <Link
          href="/compare"
          className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-pulse-400 px-5 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
        >
          <Scale className="h-4 w-4" aria-hidden />
          Open comparison
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[40rem] text-left">
          <caption className="sr-only">Comparison teaser of three PULSE products</caption>
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th scope="col" className="w-48 px-8 py-5 text-xs font-medium uppercase tracking-wider text-slate-500">
                Specification
              </th>
              {products.map((product) => (
                <th key={product.id} scope="col" className="px-6 py-5">
                  <Link href={`/product/${product.slug}`} className="group block">
                    <span className="block text-sm font-semibold text-white group-hover:text-pulse-300">
                      {product.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-pulse-300">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {ROWS.map((row) => (
              <tr key={row.key} className="transition-colors hover:bg-white/[0.02]">
                <th
                  scope="row"
                  className="px-8 py-4 text-sm font-medium text-slate-400"
                >
                  {row.label}
                </th>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-sm text-slate-300">
                    {product.compare[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-white/[0.06] md:hidden">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.06}>
            <div className="p-5">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <Link
                  href={`/product/${product.slug}`}
                  className="font-display text-base font-semibold text-white"
                >
                  {product.name}
                </Link>
                <span className="text-sm font-medium text-pulse-300">
                  {formatPrice(product.price)}
                </span>
              </div>
              <dl className="space-y-2">
                {ROWS.map((row) => (
                  <div key={row.key} className="flex justify-between gap-4 text-sm">
                    <dt className="text-slate-500">{row.label}</dt>
                    <dd className="text-right text-slate-300">{product.compare[row.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.07] p-5 sm:px-8">
        <p className="text-xs text-slate-500">
          Full comparison includes price, battery, weight, connectivity, water resistance, warranty
          and key features.
        </p>
        <Link
          href="/compare"
          className="link-underline ml-4 shrink-0"
          aria-label="See the full comparison tool"
        >
          Full specs
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
