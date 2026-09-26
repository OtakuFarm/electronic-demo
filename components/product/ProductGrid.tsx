import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { cx } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  priorityCount?: number;
  className?: string;
}

const columnMap = {
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
} as const;

export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
  className,
}: ProductGridProps) {
  return (
    <div className={cx('grid gap-5 sm:gap-6', columnMap[columns], className)}>
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={i}
          priority={i < priorityCount}
        />
      ))}
    </div>
  );
}
