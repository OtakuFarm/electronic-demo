export type CategorySlug = 'audio' | 'smart-devices' | 'accessories';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface SpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  variant?: string;
}

/** Normalised fields that power the comparison table across every product. */
export interface ComparableSpec {
  batteryLife: string;
  weight: string;
  connectivity: string;
  waterResistance: string;
  warranty: string;
  mainFeature: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  tagline: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  description: string;
  story: string;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  specs: SpecGroup[];
  features: string[];
  compatibility: string[];
  whatsInTheBox: string[];
  stock: StockStatus;
  stockCount: number;
  warranty: { period: string; summary: string };
  colors: ProductColor[];
  badges: string[];
  releasedAt: string;
  isNew: boolean;
  isBestSeller: boolean;
  compare: ComparableSpec;
}

export interface CartLine {
  productId: string;
  quantity: number;
  color: string;
}

export interface Toast {
  id: number;
  title: string;
  description?: string;
  variant: 'default' | 'success' | 'error' | 'info';
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'name-asc';

export interface Filters {
  categories: CategorySlug[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
}
