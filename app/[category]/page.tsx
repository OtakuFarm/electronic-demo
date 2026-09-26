import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { categories } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { PageHeader } from '@/components/layout/PageHeader';
import { ShopClient } from '@/components/shop/ShopClient';
import { CtaBand } from '@/components/shop/CtaBand';
import type { CategorySlug } from '@/lib/types';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_META: Record<
  CategorySlug,
  { eyebrow: string; description: string }
> = {
  audio: {
    eyebrow: 'Engineered sound',
    description:
      'Headphones, earbuds, speakers and a soundbar — every driver tuned in-house and measured in an anechoic chamber before it ships.',
  },
  'smart-devices': {
    eyebrow: 'A calmer kind of connected',
    description:
      'Devices that read the room and stay out of the way. Local-first processing means your home keeps working even when the internet does not.',
  },
  accessories: {
    eyebrow: 'The desk, perfected',
    description:
      'Power, input and input precision. One aluminium chassis language and a single USB-C standard across the entire range.',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const entry = categories.find((c) => c.slug === category);
  if (!entry) return { title: 'Category not found' };

  const count = getProductsByCategory(entry.slug).length;

  return {
    title: `${entry.name} — ${count} products`,
    description: `${entry.tagline}. ${entry.description}`,
    alternates: { canonical: `/${entry.slug}` },
    openGraph: {
      title: `${entry.name} | PULSE`,
      description: entry.description,
      url: `/${entry.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const entry = categories.find((c) => c.slug === category);
  if (!entry) notFound();

  const meta = CATEGORY_META[entry.slug];
  const productCount = getProductsByCategory(entry.slug).length;

  return (
    <>
      <PageHeader
        eyebrow={meta.eyebrow}
        title={entry.name}
        description={meta.description}
        image={entry.image}
      >
        <p className="text-sm text-slate-500">
          {productCount} products · Free delivery over $150 · 2–3 year warranties
        </p>
      </PageHeader>

      <Suspense fallback={null}>
        <ShopClient initialCategory={entry.slug} lockedCategory />
      </Suspense>

      <CtaBand />
    </>
  );
}
