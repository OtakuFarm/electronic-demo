import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { getFeaturedProducts, getNewProducts } from '@/lib/products';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Hero } from '@/components/home/Hero';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { CompareTeaser } from '@/components/home/CompareTeaser';
import { WhyPulse, WhyPulseCta } from '@/components/home/WhyPulse';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';

export const metadata: Metadata = {
  title: 'PULSE — Technology That Moves With You',
  description:
    'Premium consumer electronics: adaptive ANC headphones, local-first smart home devices and repairable desk accessories. Compare specs side by side, with 2–3 year warranties.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PULSE — Technology That Moves With You',
    description:
      'Audio, smart devices and desk accessories engineered to be kept. Compare specs side by side across the full range.',
    url: '/',
  },
};

interface SectionBlockProps {
  id: string;
  heading: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'plain' | 'muted';
  children: React.ReactNode;
}

/** Shared rhythm for the home page sections: padding, background tone, heading. */
function SectionBlock({
  id,
  heading,
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  tone = 'plain',
  children,
}: SectionBlockProps) {
  return (
    <section
      className={
        tone === 'muted'
          ? 'border-y border-white/10 bg-ink-900/40 py-20 sm:py-24'
          : 'container-page py-20 sm:py-24'
      }
      aria-labelledby={id}
    >
      <div className={tone === 'muted' ? 'container-page' : undefined}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={action}
          align={align}
        />
        <h2 id={id} className="sr-only">
          {heading}
        </h2>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="container-page pb-8" aria-labelledby="newsletter-heading">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900 px-6 py-14 sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pulse-500/12 blur-[100px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-xl border border-pulse-400/25 bg-pulse-400/10">
            <Mail className="h-5 w-5 text-pulse-300" aria-hidden />
          </span>
          <h2 id="newsletter-heading" className="display-md text-balance">
            Get 10% off your first order
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
            Join for early access to new releases, honest long-term tests and the occasional
            discount. One email a month, no more.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const newTech = getNewProducts(4);

  return (
    <>
      <Hero />

      <SectionBlock
        id="featured-heading"
        eyebrow="Best of the range"
        title="Featured this month"
        description="The products our customers come back to — highest rated, most reviewed, and built to be kept."
        action={
          <Link href="/shop" className="link-underline">
            View all products
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        }
        heading="Featured products"
      >
        <ProductGrid products={featured} priorityCount={2} className="mt-12" />
      </SectionBlock>

      <SectionBlock
        id="categories-heading"
        tone="muted"
        eyebrow="Find your fit"
        title="Shop by category"
        description="Three focused ranges, one shared standard of build quality and repairability."
        heading="Shop by category"
      >
        <CategoryTiles />
      </SectionBlock>

      <SectionBlock
        id="bestsellers-heading"
        eyebrow="Loved by thousands"
        title="Best sellers"
        description="The four products that account for most of our repeat orders."
        action={
          <Link href="/shop?sort=rating" className="link-underline">
            Top rated
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        }
        heading="Best sellers"
      >
        <ProductGrid products={getFeaturedProducts(4)} className="mt-12" />
      </SectionBlock>

      <SectionBlock
        id="newtech-heading"
        tone="muted"
        eyebrow="Just landed"
        title="New technology"
        description="Released in the last few months, and already rated 4.5 stars or better by the first buyers."
        action={
          <Link href="/shop?sort=newest" className="link-underline">
            All new arrivals
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        }
        heading="New technology"
      >
        <ProductGrid products={newTech} className="mt-12" />
      </SectionBlock>

      <SectionBlock
        id="compare-heading"
        eyebrow="Decide with data"
        title="Compare before you commit"
        description="Specs, weight and battery side by side, so you can pick the right product the first time."
        heading="Product comparison"
      >
        <CompareTeaser />
      </SectionBlock>

      <SectionBlock
        id="reviews-heading"
        tone="muted"
        eyebrow="In their words"
        title="What customers say"
        description="Every review below is from a verified purchase. We publish the four-star ones too."
        align="center"
        heading="Customer reviews"
      >
        <CustomerReviews />
      </SectionBlock>

      <SectionBlock
        id="why-heading"
        eyebrow="Our standard"
        title="Why PULSE"
        description="Most electronics are built to be replaced. We took the opposite position and made it a design constraint."
        align="center"
        heading="Why PULSE"
      >
        <WhyPulse />
        <WhyPulseCta />
      </SectionBlock>

      <NewsletterSection />
    </>
  );
}
