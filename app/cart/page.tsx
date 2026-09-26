import type { Metadata } from 'next';
import { CartClient } from '@/components/cart/CartClient';

export const metadata: Metadata = {
  title: 'Your cart',
  description: 'Review the items in your PULSE cart before checkout.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
