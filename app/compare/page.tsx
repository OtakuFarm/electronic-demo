import type { Metadata } from 'next';
import { CompareClient } from '@/components/compare/CompareClient';

export const metadata: Metadata = {
  title: 'Compare products',
  description:
    'Compare up to three PULSE products side by side across price, battery life, weight, connectivity, water resistance, warranty and key features.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Compare products | PULSE',
    description:
      'Line up price, battery, weight and warranty across up to three products.',
    url: '/compare',
  },
};

export default function ComparePage() {
  return <CompareClient />;
}
