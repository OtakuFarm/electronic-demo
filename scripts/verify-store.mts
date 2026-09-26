/**
 * Sanity checks for the pure catalogue helpers.
 * Run with: node --experimental-strip-types scripts/verify-store.mts
 */
import { products } from '../lib/products.ts';
import { filterAndSortProducts, formatPrice, discountPercent } from '../lib/utils.ts';

let failures = 0;
function check(name: string, condition: boolean, detail = '') {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name} ${detail}`);
  }
}

console.log('\nCatalogue integrity');
check('12 products exist', products.length === 12, `got ${products.length}`);
check(
  'slugs are unique',
  new Set(products.map((p) => p.slug)).size === products.length,
);
check(
  'every product has 3+ images',
  products.every((p) => p.images.length >= 3),
);
check(
  'every product has specs, features, compatibility and box contents',
  products.every(
    (p) =>
      p.specs.length > 0 &&
      p.features.length > 0 &&
      p.compatibility.length > 0 &&
      p.whatsInTheBox.length > 0,
  ),
);
check('every product has at least one review', products.every((p) => p.reviews.length > 0));
check(
  'stockCount is positive for non-out-of-stock items',
  products.every((p) => p.stock === 'out-of-stock' || p.stockCount > 0),
);
check(
  'compareAtPrice is always above price',
  products.every((p) => !p.compareAtPrice || p.compareAtPrice > p.price),
);
check(
  'at least one new and one best seller',
  products.some((p) => p.isNew) && products.some((p) => p.isBestSeller),
);

console.log('\nSearch');
const headphones = filterAndSortProducts(products, { query: 'headphones' });
check('search "headphones" finds the Air Pro', headphones.some((p) => p.slug === 'air-pro'));
const usb = filterAndSortProducts(products, { query: 'usb-c' });
check('search "usb-c" finds the hub', usb.some((p) => p.slug === 'usb-c-hub'));
const featureSearch = filterAndSortProducts(products, { query: 'IP67' });
check(
  'search matches feature text, not just names',
  featureSearch.some((p) => p.slug === 'portable-speaker'),
);
check(
  'multi-term search is AND-based',
  filterAndSortProducts(products, { query: 'keyboard wireless' }).every(
    (p) => p.slug === 'mechanical-keyboard',
  ),
);
check('nonsense query returns nothing', filterAndSortProducts(products, { query: 'zzzqqq' }).length === 0);

console.log('\nFilters');
check(
  'category filter works',
  filterAndSortProducts(products, { categories: ['audio'] }).every((p) => p.category === 'audio'),
);
check(
  'max price filter works',
  filterAndSortProducts(products, { maxPrice: 100 }).every((p) => p.price <= 100),
);
check(
  'min rating filter works',
  filterAndSortProducts(products, { minRating: 4.8 }).every((p) => p.rating >= 4.8),
);
check(
  'in-stock filter works',
  filterAndSortProducts(products, { inStockOnly: true }).every(
    (p) => p.stock !== 'out-of-stock',
  ),
);
check(
  'combined filters intersect',
  filterAndSortProducts(products, {
    categories: ['accessories'],
    maxPrice: 100,
  }).every((p) => p.category === 'accessories' && p.price <= 100),
);

console.log('\nSorting');
const byPriceAsc = filterAndSortProducts(products, { sort: 'price-asc' });
check(
  'price-asc is ordered',
  byPriceAsc.every((p, i) => i === 0 || byPriceAsc[i - 1].price <= p.price),
);
const byPriceDesc = filterAndSortProducts(products, { sort: 'price-desc' });
check(
  'price-desc is ordered',
  byPriceDesc.every((p, i) => i === 0 || byPriceDesc[i - 1].price >= p.price),
);
const byRating = filterAndSortProducts(products, { sort: 'rating' });
check(
  'rating sort is ordered',
  byRating.every((p, i) => i === 0 || byRating[i - 1].rating >= p.rating),
);
const byName = filterAndSortProducts(products, { sort: 'name-asc' });
check(
  'name sort is ordered',
  byName.every((p, i) => i === 0 || byName[i - 1].name.localeCompare(p.name) <= 0),
);
const byNewest = filterAndSortProducts(products, { sort: 'newest' });
check(
  'newest sort is ordered',
  byNewest.every(
    (p, i) =>
      i === 0 || +new Date(byNewest[i - 1].releasedAt) >= +new Date(p.releasedAt),
  ),
);
check('sorting preserves the full result set', byPriceAsc.length === products.length);

console.log('\nFormatting');
check('formats whole dollars without cents', formatPrice(79) === '$79');
check('formats cents', formatPrice(79.5) === '$79.50');
check('discount is computed', discountPercent(349, 399) === 13);
check('no discount when not on offer', discountPercent(349, undefined) === null);
check('no discount when not discounted', discountPercent(399, 349) === null);

console.log(
  failures === 0
    ? `\nAll checks passed.\n`
    : `\n${failures} check(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
