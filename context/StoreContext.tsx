'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Product, Toast } from '@/lib/types';
import { products } from '@/lib/products';

export const MAX_COMPARE = 3;

interface StoreValue {
  // Cart
  cart: CartLine[];
  cartCount: number;
  cartLines: { product: Product; quantity: number; color: string }[];
  cartSubtotal: number;
  cartShipping: number;
  cartTotal: number;
  addToCart: (productId: string, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Compare
  compare: string[];
  compareProducts: Product[];
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isCompareFull: boolean;

  // Toasts
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: number) => void;

  // Cart drawer
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const STORAGE_KEY = 'pulse-store-v1';

interface PersistedState {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
}

function readStorage(): PersistedState {
  const empty: PersistedState = { cart: [], wishlist: [], compare: [] };
  if (typeof window === 'undefined') return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      compare: Array.isArray(parsed.compare) ? parsed.compare.slice(0, MAX_COMPARE) : [],
    };
  } catch {
    return empty;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  // Hydrate from localStorage once on mount to avoid SSR/client mismatch.
  useEffect(() => {
    const stored = readStorage();
    setCart(stored.cart);
    setWishlist(stored.wishlist);
    setCompare(stored.compare);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, compare }));
    } catch {
      // Storage unavailable — the store still works in memory.
    }
  }, [cart, wishlist, compare, hydrated]);

  const productById = useMemo(() => new Map(products.map((p) => [p.id, p])), []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
      window.setTimeout(() => dismissToast(id), 4000);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (productId: string, quantity = 1, color?: string) => {
      const product = productById.get(productId);
      if (!product) return;
      if (product.stock === 'out-of-stock') {
        pushToast({
          title: 'Out of stock',
          description: `${product.name} is currently unavailable.`,
          variant: 'error',
        });
        return;
      }
      const selectedColor = color ?? product.colors[0]?.name ?? 'Default';
      setCart((prev) => {
        const existing = prev.find(
          (l) => l.productId === productId && l.color === selectedColor,
        );
        if (existing) {
          return prev.map((l) =>
            l === existing
              ? { ...l, quantity: Math.min(l.quantity + quantity, product.stockCount) }
              : l,
          );
        }
        return [...prev, { productId, quantity, color: selectedColor }];
      });
      pushToast({
        title: 'Added to cart',
        description: `${quantity} × ${product.name}`,
        variant: 'success',
      });
    },
    [productById, pushToast],
  );

  const removeFromCart = useCallback((productId: string, color: string) => {
    setCart((prev) => prev.filter((l) => !(l.productId === productId && l.color === color)));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        setCart((prev) => prev.filter((l) => !(l.productId === productId && l.color === color)));
        return;
      }
      const product = productById.get(productId);
      setCart((prev) =>
        prev.map((l) =>
          l.productId === productId && l.color === color
            ? { ...l, quantity: Math.min(quantity, product?.stockCount ?? quantity) }
            : l,
        ),
      );
    },
    [productById],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      const product = productById.get(productId);
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        pushToast({
          title: exists ? 'Removed from wishlist' : 'Saved to wishlist',
          description: product?.name,
          variant: exists ? 'default' : 'success',
        });
        return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [productById, pushToast],
  );

  const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const toggleCompare = useCallback(
    (productId: string) => {
      const product = productById.get(productId);
      setCompare((prev) => {
        if (prev.includes(productId)) return prev.filter((id) => id !== productId);
        if (prev.length >= MAX_COMPARE) {
          pushToast({
            title: 'Comparison is full',
            description: `You can compare up to ${MAX_COMPARE} products at a time.`,
            variant: 'error',
          });
          return prev;
        }
        pushToast({
          title: 'Added to comparison',
          description: product?.name,
          variant: 'success',
        });
        return [...prev, productId];
      });
    },
    [productById, pushToast],
  );

  const removeFromCompare = useCallback((productId: string) => {
    setCompare((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const isInCompare = useCallback((id: string) => compare.includes(id), [compare]);
  const isCompareFull = compare.length >= MAX_COMPARE;

  const compareProducts = useMemo(
    () => compare.map((id) => productById.get(id)).filter((p): p is Product => Boolean(p)),
    [compare, productById],
  );

  const cartLines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = productById.get(line.productId);
          return product
            ? { product, quantity: line.quantity, color: line.color }
            : null;
        })
        .filter((l): l is { product: Product; quantity: number; color: string } => Boolean(l)),
    [cart, productById],
  );

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart]);

  const cartSubtotal = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [cartLines],
  );

  // Free standard shipping over $150, matching the shipping policy copy.
  const cartShipping = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartSubtotal >= 150 ? 0 : 12;
  }, [cartSubtotal]);

  const cartTotal = cartSubtotal + cartShipping;

  const value: StoreValue = {
    cart,
    cartCount,
    cartLines,
    cartSubtotal,
    cartShipping,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    compare,
    compareProducts,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    isCompareFull,
    toasts,
    pushToast,
    dismissToast,
    isCartOpen,
    setCartOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
