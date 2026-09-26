import { Check, Package, Plug, ShieldCheck, Wrench } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Reveal } from '@/components/ui/Reveal';

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="space-y-16">
      {/* Story */}
      <Reveal>
        <section aria-labelledby="story-heading">
          <h2 id="story-heading" className="display-md mb-5">
            Why we built it
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-slate-400">{product.story}</p>
        </section>
      </Reveal>

      {/* Features */}
      <Reveal>
        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="display-md mb-6">
            Key features
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pulse-400/15">
                  <Check className="h-3 w-3 text-pulse-300" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Specs */}
      <Reveal>
        <section aria-labelledby="specs-heading">
          <h2 id="specs-heading" className="display-md mb-6">
            Technical specifications
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {product.specs.map((group) => (
              <div key={group.group} className="card-surface overflow-hidden">
                <h3 className="border-b border-white/[0.07] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-pulse-300">
                  {group.group}
                </h3>
                <dl className="divide-y divide-white/[0.05]">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-wrap justify-between gap-2 px-5 py-3"
                    >
                      <dt className="text-sm text-slate-500">{item.label}</dt>
                      <dd className="text-right text-sm font-medium text-slate-200">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Compatibility + box + warranty */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal>
          <section className="card-surface h-full p-6" aria-labelledby="compat-heading">
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-pulse-400/20 bg-pulse-400/10">
              <Plug className="h-4 w-4 text-pulse-300" aria-hidden />
            </span>
            <h3 id="compat-heading" className="mb-4 font-display text-base font-semibold text-white">
              Compatibility
            </h3>
            <ul className="space-y-2.5">
              {product.compatibility.map((item) => (
                <li key={item} className="text-sm text-slate-400">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.06}>
          <section className="card-surface h-full p-6" aria-labelledby="box-heading">
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-pulse-400/20 bg-pulse-400/10">
              <Package className="h-4 w-4 text-pulse-300" aria-hidden />
            </span>
            <h3 id="box-heading" className="mb-4 font-display text-base font-semibold text-white">
              What&rsquo;s in the box
            </h3>
            <ul className="space-y-2.5">
              {product.whatsInTheBox.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pulse-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <section className="card-surface h-full p-6" aria-labelledby="warranty-heading">
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-pulse-400/20 bg-pulse-400/10">
              <ShieldCheck className="h-4 w-4 text-pulse-300" aria-hidden />
            </span>
            <h3 id="warranty-heading" className="mb-4 font-display text-base font-semibold text-white">
              Warranty & repair
            </h3>
            <p className="mb-3 font-display text-lg font-semibold text-pulse-300">
              {product.warranty.period}
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              {product.warranty.summary}
            </p>
            <p className="mt-4 flex items-start gap-2 border-t border-white/[0.06] pt-4 text-sm text-slate-400">
              <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pulse-400" aria-hidden />
              Service guides and spare parts available for 7 years after launch.
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
