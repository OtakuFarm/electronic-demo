import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/lib/categories';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import { CATEGORY_LABELS } from '@/lib/utils';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchase } from '@/components/product/ProductPurchase';
import { ProductDetails } from '@/components/product/ProductDetails';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/components/shop/CtaBand';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every product page at build time. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };

  return {
    title: `${product.name} — ${product.tagline}`,
    description: `${product.description} ${product.features.slice(0, 3).join('. ')}.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} | PULSE`,
      description: product.description,
      url: `/product/${product.slug}`,
      images: [{ url: product.images[0], width: 1200, height: 900, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const category = categories.find((c) => c.slug === product.category);

  // JSON-LD gives search engines price, availability and rating context.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'PULSE' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability:
        product.stock === 'out-of-stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-white/10 bg-ink-950">
        <ol className="container-page flex items-center gap-2 py-4 text-xs text-slate-500">
          <li>
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <li>
            <Link href="/shop" className="transition-colors hover:text-white">
              Shop
            </Link>
          </li>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" aria-hidden />
              <li>
                <Link
                  href={`/${category.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <ChevronRight className="h-3 w-3" aria-hidden />
          <li className="truncate font-medium text-slate-300" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main */}
      <section className="container-page grid gap-12 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
        <ProductGallery product={product} />
        <ProductPurchase product={product} />
      </section>

      {/* Details */}
      <section className="container-page border-t border-white/10 py-16">
        <ProductDetails product={product} />
      </section>

      {/* Reviews */}
      <section className="border-y border-white/10 bg-ink-900/40 py-16">
        <div className="container-page">
          <ProductReviews product={product} />
        </div>
      </section>

      {/* Related */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="You might also like"
          title="Pairs well with"
          description={`More from ${CATEGORY_LABELS[product.category]} and across the rest of the range.`}
        />
        <ProductGrid products={related} className="mt-10" />
        <CtaBand />
      </section>
    </>
  );
}
