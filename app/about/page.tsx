import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Leaf, Recycle, Ruler, Wrench } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { getFeaturedProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';

export const metadata: Metadata = {
  title: 'About PULSE',
  description:
    'PULSE is a fictional consumer electronics brand built on one idea: products should be kept, not replaced. Learn about our approach to repairability, materials and testing.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About PULSE',
    description: 'Technology that moves with you — designed to be kept.',
    url: '/about',
  },
};

const TIMELINE = [
  {
    year: '2019',
    title: 'An anechoic chamber',
    body: 'The team started by measuring rather than guessing — building a test room before designing a single product.',
  },
  {
    year: '2021',
    title: 'The first repairable device',
    body: 'The Air Pro shipped with replaceable ear cushions, standard screws and a published service guide from day one.',
  },
  {
    year: '2023',
    title: 'Local-first smart home',
    body: 'The Home Hub moved automation off the cloud entirely, so the house keeps working when the internet does not.',
  },
  {
    year: '2025',
    title: 'Twelve products, one standard',
    body: 'Every product now shares a single USB-C spec, a material passport and a 7-year parts commitment.',
  },
];

const VALUES = [
  {
    icon: Wrench,
    title: 'Repairable before recyclable',
    body: 'A device you can open beats one you can only recycle. We publish exploded diagrams for every product.',
  },
  {
    icon: Recycle,
    title: '72% recycled aluminium',
    body: 'Across the range, and rising each year. Every unit ships with a material passport listing its composition.',
  },
  {
    icon: Ruler,
    title: 'Specs we can defend',
    body: 'Battery figures are measured at a fixed 50% volume on a defined protocol, not quoted from a datasheet.',
  },
  {
    icon: Leaf,
    title: 'Lower power by default',
    body: 'Local processing, efficient silicon and batteries guaranteed to hold 80% capacity for two years.',
  },
];
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Technology that moves with you"
        description="PULSE is a fictional consumer electronics brand created for a developer portfolio. The design philosophy, product copy and reviews are all invented — but the engineering principles are the ones a real company would actually stand behind."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="display-md text-balance">Most electronics are built to be replaced</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-4 text-base leading-relaxed text-slate-400">
              <p>
                The average phone or pair of headphones is designed around a replacement cycle of
                eighteen months. Adhesives where screws should be. Batteries soldered to logic
                boards. Components that can only be replaced in full.
              </p>
              <p>
                We took the opposite position and made it a design constraint rather than a
                marketing line. Every PULSE product opens with standard tools, ships with a
                service guide, and has spare parts guaranteed for seven years after launch.
              </p>
              <p>
                The result is a smaller range that stays in use far longer — which is the only
                honest measure of sustainability we have found.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900/40 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="display-md mb-12 text-balance">What we hold ourselves to</h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-pulse-400/20 bg-pulse-400/[0.08]">
                  <Icon className="h-5 w-5 text-pulse-300" aria-hidden />
                </span>
                <h3 className="mb-2.5 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <h2 className="display-md mb-12 text-balance">How we got here</h2>
        </Reveal>
        <ol className="relative space-y-10 border-l border-white/10 pl-8">
          {TIMELINE.map((entry, i) => (
            <Reveal key={entry.year} delay={i * 0.06}>
              <li className="relative">
                <span
                  className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full border-2 border-pulse-400 bg-ink-950"
                  aria-hidden
                />
                <p className="font-display text-sm font-semibold text-pulse-300">{entry.year}</p>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-white">
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  {entry.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-white/10 bg-ink-900/40 py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-md text-balance">What we make today</h2>
            <Link href="/shop" className="link-underline">
              View the full range
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <ProductGrid products={getFeaturedProducts(4)} />
        </div>
      </section>
    </>
  );
}
