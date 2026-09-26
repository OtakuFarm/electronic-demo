import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/lib/utils';

interface ProductImageProps {
  primary: string;
  secondary: string;
  alt: string;
  href: string;
  priority?: boolean;
  hovered: boolean;
}

export function ProductImage({
  primary,
  secondary,
  alt,
  href,
  priority = false,
  hovered,
}: ProductImageProps) {
  return (
    <Link
      href={href}
      className="relative block aspect-[4/3] overflow-hidden bg-ink-850"
      aria-label={alt}
    >
      <Image
        src={primary}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
        className={cx(
          'object-cover transition-all duration-500 ease-out',
          hovered && 'scale-[1.04] opacity-0',
        )}
      />
      <Image
        src={secondary}
        alt=""
        fill
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
        className={cx(
          'scale-[1.06] object-cover opacity-0 transition-all duration-500 ease-out',
          hovered && 'scale-100 opacity-100',
        )}
      />
    </Link>
  );
}
