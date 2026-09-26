import Link from 'next/link';
import { Home, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
        <SearchX className="h-7 w-7 text-slate-500" aria-hidden />
      </span>
      <p className="eyebrow mb-3">Error 404</p>
      <h1 className="display-lg text-balance">We couldn&rsquo;t find that page</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
        The link may be out of date, or the product may have been retired. The full range is
        always available in the shop.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-pulse-400 px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
        >
          <Home className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <Link
          href="/shop"
          className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-pulse-400/50"
        >
          Browse the range
        </Link>
      </div>
    </div>
  );
}
