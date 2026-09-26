import type { Product, SortOption } from './types';

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/** Normalised haystack used by the search overlay and /search page. */
export function searchHaystack(product: Product): string {
  return [
    product.name,
    product.tagline,
    product.description,
    product.sku,
    product.category,
    product.features.join(' '),
    product.compatibility.join(' '),
  ]
    .join(' ')
    .toLowerCase();
}

export function filterAndSortProducts(
  products: Product[],
  {
    query = '',
    categories = [],
    minPrice = 0,
    maxPrice = Number.POSITIVE_INFINITY,
    inStockOnly = false,
    minRating = 0,
    sort = 'featured',
  }: {
    query?: string;
    categories?: Product['category'][];
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    minRating?: number;
    sort?: SortOption;
  } = {},
): Product[] {
  const q = query.trim().toLowerCase();

  const result = products.filter((product) => {
    if (q) {
      const haystack = searchHaystack(product);
      const terms = q.split(/\s+/).filter(Boolean);
      const matchesAll = terms.every((term) => haystack.includes(term));
      if (!matchesAll) return false;
    }
    if (categories.length > 0 && !categories.includes(product.category)) return false;
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (inStockOnly && product.stock === 'out-of-stock') return false;
    if (product.rating < minRating) return false;
    return true;
  });

  const sorted = [...result];
  switch (sort) {
    case 'newest':
      sorted.sort((a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt));
      break;
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sorted.sort(
        (a, b) =>
          Number(b.isBestSeller) - Number(a.isBestSeller) ||
          Number(b.isNew) - Number(a.isNew) ||
          b.rating - a.rating,
      );
  }
  return sorted;
}

export const PRICE_BOUNDS = { min: 0, max: 500 };

export const CATEGORY_LABELS: Record<Product['category'], string> = {
  audio: 'Audio',
  'smart-devices': 'Smart Devices',
  accessories: 'Accessories',
};
