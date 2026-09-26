/**
 * Generates the fictional product artwork used across the site.
 * Run with: node scripts/generate-images.mjs
 * Produces deterministic abstract SVG art so no third-party assets are used.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'products');
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 900;

/** Deterministic pseudo-random from a seed string. */
function seeded(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const palettes = {
  audio: ['#12aee0', '#0c6b95', '#33c9f2', '#062b3d'],
  'smart-devices': ['#a3e635', '#12aee0', '#4d7c0f', '#07222a'],
  accessories: ['#f43f5e', '#12aee0', '#9f1239', '#2a1a2a'],
};

function svg({ seed, hues, label, variant = 0 }) {
  const rand = seeded(seed + variant);
  const [c1, c2, c3, dark] = hues;

  let shapes = '';
  const count = 5 + Math.floor(rand() * 4);
  for (let i = 0; i < count; i += 1) {
    const cx = rand() * W;
    const cy = rand() * H;
    const r = 120 + rand() * 320;
    const opacity = (0.1 + rand() * 0.22).toFixed(2);
    shapes += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="url(#g)" opacity="${opacity}" />`;
  }

  const lines = Array.from({ length: 14 }, () => {
    const y = rand() * H;
    const x = rand() * W;
    const len = 100 + rand() * 500;
    return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x + len).toFixed(0)}" y2="${(y + (rand() - 0.5) * 120).toFixed(0)}" stroke="${c3}" stroke-width="1" opacity="0.14" />`;
  }).join('');

  const angle = Math.floor(rand() * 60) - 30;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1120"/>
      <stop offset="55%" stop-color="${dark}"/>
      <stop offset="100%" stop-color="#05070d"/>
    </linearGradient>
    <radialGradient id="g" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="v" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${shapes}
  ${lines}
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <g transform="rotate(${angle} ${W / 2} ${H / 2})" opacity="0.5">
    <ellipse cx="${W / 2}" cy="${H / 2}" rx="${W * 0.32}" ry="${H * 0.16}" fill="none" stroke="${c1}" stroke-width="1.5" opacity="0.5"/>
    <ellipse cx="${W / 2}" cy="${H / 2}" rx="${W * 0.24}" ry="${H * 0.11}" fill="none" stroke="${c2}" stroke-width="1.5" opacity="0.45"/>
  </g>
</svg>`;
}

const catalogue = [
  ['air-pro', 'audio', 4],
  ['mini', 'audio', 4],
  ['portable-speaker', 'audio', 3],
  ['soundbar-x', 'audio', 3],
  ['watch-one', 'smart-devices', 4],
  ['home-hub', 'smart-devices', 3],
  ['smart-lamp', 'smart-devices', 3],
  ['mechanical-keyboard', 'accessories', 3],
  ['wireless-mouse', 'accessories', 3],
  ['powerbank-20k', 'accessories', 3],
  ['usb-c-hub', 'accessories', 3],
  ['charging-station', 'accessories', 3],
];

for (const [slug, cat, count] of catalogue) {
  for (let v = 0; v < count; v += 1) {
    const file = join(OUT, `${slug}-${v + 1}.svg`);
    writeFileSync(file, svg({ seed: slug, hues: palettes[cat], label: slug, variant: v }), 'utf8');
  }
  console.log(`generated ${count} images for ${slug}`);
}

for (const [slug, cat] of [
  ['cat-audio', 'audio'],
  ['cat-smart', 'smart-devices'],
  ['cat-accessories', 'accessories'],
]) {
  writeFileSync(
    join(OUT, `${slug}.svg`),
    svg({ seed: slug, hues: palettes[cat], label: slug, variant: 2 }),
    'utf8',
  );
  console.log(`generated category art for ${slug}`);
}

writeFileSync(
  join(OUT, 'hero-air-pro.svg'),
  svg({ seed: 'hero-air-pro', hues: palettes.audio, label: 'PULSE Air Pro', variant: 1 }),
  'utf8',
);
console.log('generated hero art');
