import type { Metadata } from 'next';
import { WishlistClient } from '@/components/wishlist/WishlistClient';

export const metadata: Metadata = {
  title: 'Your wishlist',
  description: 'Products you have saved for later.',
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
