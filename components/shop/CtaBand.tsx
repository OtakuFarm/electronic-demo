import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';

/** Cross-sell band shown under category listings. */
export function CtaBand() {
  return (
    <section className="container-page py-16">
      <div className="card-surface flex flex-col items-center gap-6 p-8 text-center sm:p-12">
        <span className="grid h-12 w-12 place-items-center rounded-xl border border-pulse-400/25 bg-pulse-400/10">
          <Scale className="h-5 w-5 text-pulse-300" aria-hidden />
        </span>
        <div>
          <h2 className="display-md">Still narrowing it down?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
            Add up to three products to your comparison and see price, battery, weight,
            connectivity and warranty side by side.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/compare"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-pulse-400 px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
          >
            Open comparison
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-pulse-400/50 hover:bg-white/[0.04]"
          >
            Browse everything
          </Link>
        </div>
      </div>
    </section>
  );
}
