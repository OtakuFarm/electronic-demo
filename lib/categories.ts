import type { Category } from './types';

/** Fictional brand imagery — all artwork is locally generated, no third-party assets. */
export const categories: Category[] = [
  {
    slug: 'audio',
    name: 'Audio',
    shortName: 'Audio',
    tagline: 'Engineered sound, zero noise',
    description:
      'Headphones, earbuds and speakers built around a custom acoustic architecture. Tuned in-house, measured in an anechoic chamber, finished by hand.',
    image: '/products/cat-audio.svg',
    accent: 'from-pulse-400/30 via-pulse-500/10 to-transparent',
  },
  {
    slug: 'smart-devices',
    name: 'Smart Devices',
    shortName: 'Smart',
    tagline: 'A calmer kind of connected',
    description:
      'Sensors, hubs and lighting that read the room and stay out of the way. Local-first processing keeps your data on your devices.',
    image: '/products/cat-smart.svg',
    accent: 'from-volt-400/25 via-pulse-400/10 to-transparent',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    shortName: 'Accessories',
    tagline: 'The desk, perfected',
    description:
      'Power, input and input precision. Every accessory shares one aluminium chassis language and a single USB-C standard.',
    image: '/products/cat-accessories.svg',
    accent: 'from-coral-400/25 via-pulse-500/10 to-transparent',
  },
];
