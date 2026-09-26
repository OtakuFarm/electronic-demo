# PULSE — Premium Electronics E-Commerce (Portfolio Project)

A fictional consumer electronics store built with **Next.js 15 (App Router)**, **TypeScript**,
**Tailwind CSS**, **Framer Motion** and **Lucide React**.

> **PULSE is not a real company.** All products, prices, stock levels, reviews and company details
> are invented for demonstration. No payment processing is implemented, no orders are placed, and
> there is no association with or endorsement by any real retailer or platform.

**Tagline:** *Technology that moves with you.*

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (`next/core-web-vitals` + TypeScript rules) |
| `npm run verify` | Sanity checks for the catalogue, search, filters, sorting and formatting |
| `npm run images` | Regenerate the local product artwork |

## Architecture

### Layered, with a clear seam for a commerce backend

```
app/                 Routes (App Router) — thin; data pulled from lib/
components/
  ui/                Reusable primitives (Button, Badge, Rating, Accordion, Toast…)
  layout/            Site chrome (header, footer, page headers, policy shell)
  product/           Product card, gallery, purchase box, specs, reviews
  shop/              Catalogue grid, filters, sort, search results
  compare/           Comparison table + sticky compare tray
  cart/ wishlist/…   Feature-scoped client components
context/             StoreContext — cart, wishlist, compare, toasts, drawer state
lib/                 Data + pure functions (no React imports anywhere in here)
scripts/             Local SVG artwork generation
```

The important boundary is **`lib/` ↔ everything else**. `lib/` holds the catalogue, categories,
reviews, and pure helpers (`filterAndSortProducts`, `formatPrice`, `discountPercent`). Nothing in
`lib/` imports React, so it is trivially testable and swappable.

**Swapping in a real commerce backend later** means replacing `lib/products.ts` with a fetch layer.
The catalogue already exposes the shape a Storefront-style API returns (`id`, `slug`, `price`,
`compareAtPrice`, `images`, `variants` as colour lines, `options`, `specs`, `inventory`). Every
component consumes `Product[]` and does not care where it came from, so the change is confined to
that one module plus a cache/loader.

### State: one provider, four concerns

`StoreProvider` owns cart lines, wishlist, comparison and toasts, and persists them to
`localStorage` under a single key.

- **Hydration-safe** — state loads in `useEffect` after mount, so server and client render
  identical markup and React never reports a hydration mismatch.
- **Colour-aware cart** — lines are keyed on `productId + color`, so the same product in two
  colours produces two independent lines.
- **Stock-capped** — quantity can never exceed `product.stockCount`.
- **Compare capped at 3** — enforced inside `toggleCompare`, with a toast explaining the refusal.
- **Toast queue** — max 3 visible, auto-dismiss after 4s, manually dismissible.

### Search, filtering and sorting

`filterAndSortProducts()` in `lib/utils.ts` is one pure function shared by the shop page, all three
category pages and the `/search` route. It matches every whitespace-separated term against a
normalised haystack (name, tagline, description, SKU, features, compatibility), applies category,
price, rating and stock filters, then sorts. Same logic, three surfaces, no duplication.

### Comparison

Every `Product` carries a normalised `compare` record (`batteryLife`, `weight`, `connectivity`,
`waterResistance`, `warranty`, `mainFeature`) so heterogeneous products — a pair of headphones and
a 9-in-1 hub — line up in the same table. Weight is parsed numerically to flag the lightest option,
and "show differences only" reduces the table to rows whose values actually differ. Desktop gets a
semantic `<table>`; mobile gets per-product cards, which is far more readable than a scrolling grid.

### Imagery

All artwork is generated locally as deterministic SVG by `scripts/generate-images.mjs` — no
third-party images, no network requests, no licensing concerns. Rendered through `next/image` with
AVIF/WebP output, `fill` layouts and per-breakpoint `sizes` attributes.

### Animation

Framer Motion is used sparingly and always through shared wrappers, so motion stays consistent and
can be disabled in one place:

- `Reveal`, `StaggerGroup` / `StaggerItem` — scroll-in reveals for section content
- `AnimatePresence` — drawers, modals, toasts, the mobile filter sheet
- `useReducedMotion()` is checked in every wrapper, and the `globals.css` base layer collapses all
  animation and transition durations under `prefers-reduced-motion: reduce`

### Accessibility

- Skip-to-content link, and a single `<h1>` per page
- Visible `:focus-visible` ring on every interactive element
- `aria-label` / `aria-pressed` / `aria-expanded` / `aria-controls` on all custom controls
- Live regions for search results, cart count, quantity and form errors
- Semantic `<table>` with `<caption>` and `<th scope>`, plus a card fallback on mobile
- Form errors are associated via `aria-describedby` and announced with `role="alert"`
- Colour contrast checked against the dark theme

### SEO

- Per-route `metadata` using `title.template`, canonical URLs, and Open Graph images
- `Product` JSON-LD (price, availability, aggregate rating) emitted on every product page
- Generated `sitemap.xml` and `robots.txt`; cart, wishlist and search excluded from indexing
- Static generation for all 12 product pages via `generateStaticParams`

### Performance

- Shared JS bundle ~105 kB; heaviest route ships ~181 kB first-load
- AVIF/WebP via `next/image`, correct `sizes` on every image, `priority` only on LCP images
- Client components are scoped to the smallest interactive leaf (product card, quantity stepper,
  filter panel) so static pages stay server-rendered

## Pages

| Route | Description |
| --- | --- |
| `/` | Hero, featured, categories, best sellers, new tech, comparison teaser, reviews, why PULSE, newsletter |
| `/shop` | Full catalogue with filters and sorting |
| `/audio`, `/smart-devices`, `/accessories` | Category listings (category filter locked) |
| `/product/[slug]` | Gallery, purchase box, specs, compatibility, box contents, warranty, reviews, related products |
| `/compare` | Up-to-3 comparison with difference highlighting |
| `/about`, `/support`, `/contact`, `/faq` | Editorial and support surfaces |
| `/cart`, `/wishlist` | Local-storage-backed |
| `/search?q=` | Full search results |
| `/shipping-returns`, `/privacy`, `/terms` | Shared policy layout with a table of contents |

## Products

Twelve fictional products across three categories, each with a full specification table, feature
list, compatibility list, box contents, warranty terms, stock status, colourways and fictional
verified reviews.

| Category | Products |
| --- | --- |
| Audio | Air Pro, Mini, Portable Speaker, Soundbar X |
| Smart Devices | Watch One, Home Hub, Smart Lamp |
| Accessories | Mechanical Keyboard, Wireless Mouse, PowerBank 20K, USB-C Hub, Charging Station |

## Notes

- No payment integration — the checkout button is deliberately disabled and labelled as a demo.
- No analytics, no tracking cookies, no third-party data requests.
- Cart, wishlist and comparison data never leave the browser.

