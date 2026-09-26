import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ShopClient } from '@/components/shop/ShopClient';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';

export const metadata: Metadata = {
  title: 'Shop all products',
  description:
    'Browse the full PULSE range: headphones, earbuds, soundbars, smart home devices, keyboards and charging accessories. Filter by price, rating and category.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop all products | PULSE',
    description:
      'The full PULSE range — filter by category, price, rating and availability.',
    url: '/shop',
  },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The full range"
        title="Shop all products"
        description="Twelve products, one standard. Filter by category, price or rating, and compare up to three side by side before you decide."
      />
      {/* useSearchParams requires a Suspense boundary during static rendering. */}
      <Suspense fallback={<ShopFallback />}>
        <ShopClient />
      </Suspense>
      <section className="container-page pt-8 pb-20">
        <div className="card-surface mx-auto max-w-2xl p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-white">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Join the newsletter for a 10% discount on your first order, plus early access to new
            releases.
          </p>
          <div className="mx-auto mt-6 max-w-sm">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ShopFallback() {
  return (
    <div className="container-page py-20">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[26rem] animate-pulse rounded-2xl border border-white/[0.07] bg-ink-900/60"
          />
        ))}
      </div>
    </div>
  );
}
