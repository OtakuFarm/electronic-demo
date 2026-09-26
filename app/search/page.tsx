import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchClient } from '@/components/shop/SearchClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the full PULSE range by product name, feature or compatibility.',
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchClient />
    </Suspense>
  );
}
