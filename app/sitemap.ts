import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { categories } from '@/lib/categories';

const SITE_URL = 'https://pulse-demo.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/compare`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/support`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/shipping-returns`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/${category.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: new Date(product.releasedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
