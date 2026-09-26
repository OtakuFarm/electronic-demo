import { cx } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cx('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="display-lg text-balance">{title}</h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
