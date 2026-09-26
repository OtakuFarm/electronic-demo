'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Scale, Search, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cx } from '@/lib/utils';
import { SearchDialog } from './SearchDialog';
import { MobileNav } from './MobileNav';
import { MegaMenu } from './MegaMenu';
import { AnnouncementBar } from './AnnouncementBar';

interface HeaderRowProps {
  isApple: boolean;
  megaOpen: boolean;
  setMegaOpen: (open: boolean) => void;
  setMobileOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  isActive: (href: string) => boolean;
}

function HeaderRow({
  isApple,
  megaOpen,
  setMegaOpen,
  setMobileOpen,
  setSearchOpen,
  setCartOpen,
  cartCount,
  wishlistCount,
  compareCount,
  isActive,
}: HeaderRowProps) {
  return (
    <div className="container-page flex h-16 items-center gap-4">
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="-ml-2 grid h-10 w-10 place-items-center rounded-full text-slate-200 transition-colors hover:bg-white/[0.06] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <Link href="/" className="flex items-center gap-2.5" aria-label="PULSE home">
        <span className="relative grid h-8 w-8 place-items-center">
          <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-pulse-400 to-pulse-600 opacity-90" />
          <span className="absolute inset-0 animate-pulse-ring rounded-lg bg-pulse-400/40" />
          <span className="relative h-2 w-2 rounded-full bg-ink-950" />
        </span>
        <span className="font-display text-base font-bold tracking-[0.22em] text-white">
          PULSE
        </span>
      </Link>

      <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Main">
        <Link
          href="/shop"
          className={cx(
            'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
            isActive('/shop') ? 'text-pulse-300' : 'text-slate-300 hover:text-white',
          )}
        >
          Shop
        </Link>

        <div className="relative" onMouseEnter={() => setMegaOpen(true)}>
          <button
            type="button"
            onClick={() => setMegaOpen(!megaOpen)}
            className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            aria-expanded={megaOpen}
            aria-haspopup="true"
          >
            Categories
            <ChevronDownIcon open={megaOpen} />
          </button>
          <AnimatePresence>
            {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
          </AnimatePresence>
        </div>

        {utilityNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cx(
              'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
              isActive(item.href) ? 'text-pulse-300' : 'text-slate-300 hover:text-white',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <HeaderActions
        isApple={isApple}
        setSearchOpen={setSearchOpen}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        compareCount={compareCount}
      />
    </div>
  );
}
function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cx('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface HeaderActionsProps {
  isApple: boolean;
  setSearchOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
}

function HeaderActions({
  isApple,
  setSearchOpen,
  setCartOpen,
  cartCount,
  wishlistCount,
  compareCount,
}: HeaderActionsProps) {
  return (
    <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="hidden h-10 items-center gap-2.5 rounded-full border border-white/10 px-3.5 text-sm text-slate-400 transition-colors hover:border-pulse-400/40 hover:text-white sm:flex"
        aria-label="Search products"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span>Search</span>
        <kbd className="ml-2 rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
          {isApple ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-full text-slate-200 transition-colors hover:bg-white/[0.06] sm:hidden"
        aria-label="Search products"
      >
        <Search className="h-5 w-5" aria-hidden />
      </button>

      <IconButton href="/wishlist" label="Wishlist" count={wishlistCount}>
        <Heart className="h-5 w-5" aria-hidden />
      </IconButton>

      <IconButton href="/compare" label="Compare" count={compareCount}>
        <Scale className="h-5 w-5" aria-hidden />
      </IconButton>

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="relative grid h-10 w-10 place-items-center rounded-full text-slate-200 transition-colors hover:bg-white/[0.06]"
        aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-pulse-400 px-1 text-[10px] font-bold text-ink-950"
            >
              {cartCount > 99 ? '99+' : cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

function IconButton({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative hidden h-10 w-10 place-items-center rounded-full text-slate-200 transition-colors hover:bg-white/[0.06] sm:grid"
      aria-label={count > 0 ? `${label}, ${count} item${count === 1 ? '' : 's'}` : label}
    >
      {children}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-white/15 px-1 text-[10px] font-bold text-white">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  );
}

const utilityNav = [
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Support' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { cartCount, wishlist, compare, setCartOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // ⌘K vs Ctrl+K depending on platform, for a native feel.
  const isApple =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <AnnouncementBar />

      <header
        className={cx(
          'sticky top-0 z-50 border-b transition-colors duration-300',
          isScrolled
            ? 'border-white/10 bg-ink-950/85 backdrop-blur-xl'
            : 'border-transparent bg-ink-950',
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <HeaderRow
          isApple={isApple}
          megaOpen={megaOpen}
          setMegaOpen={setMegaOpen}
          setMobileOpen={setMobileOpen}
          setSearchOpen={setSearchOpen}
          setCartOpen={setCartOpen}
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          compareCount={compare.length}
          isActive={isActive}
        />
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
