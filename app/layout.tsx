import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CompareTray } from '@/components/compare/CompareTray';
import { ToastViewport } from '@/components/ui/ToastViewport';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const SITE_URL = 'https://pulse-demo.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PULSE — Technology That Moves With You',
    template: '%s | PULSE',
  },
  description:
    'PULSE designs audio, smart devices and desk accessories built to be repaired, upgraded and kept for years. Explore the full range, compare specs side by side and shop with confidence.',
  keywords: [
    'wireless headphones',
    'true wireless earbuds',
    'smart home hub',
    'USB-C hub',
    'mechanical keyboard',
    'consumer electronics',
    'noise cancelling headphones',
  ],
  authors: [{ name: 'PULSE' }],
  creator: 'PULSE',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'PULSE',
    title: 'PULSE — Technology That Moves With You',
    description:
      'Audio, smart devices and desk accessories engineered to be kept. Compare specs side by side across the full range.',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'PULSE — Technology That Moves With You',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PULSE — Technology That Moves With You',
    description:
      'Audio, smart devices and desk accessories engineered to be kept.',
    images: ['/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: '/' },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#05070d',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-pulse-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <StoreProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <CompareTray />
          <ToastViewport />
        </StoreProvider>
      </body>
    </html>
  );
}
