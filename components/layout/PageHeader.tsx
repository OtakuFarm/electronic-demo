import Image from 'next/image';
import { cx } from '@/lib/utils';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  children,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cx(
        'relative overflow-hidden border-b border-white/10',
        image ? 'bg-ink-900/50' : 'bg-ink-950',
        className,
      )}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/50" />
        </>
      )}
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-pulse-500/10 blur-[120px]"
        aria-hidden
      />

      <div className="container-page relative py-14 sm:py-20">
        <div className="max-w-2xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="display-lg text-balance">{title}</h1>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
