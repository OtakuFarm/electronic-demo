import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/categories';
import { Reveal } from '@/components/ui/Reveal';

export function CategoryTiles() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {categories.map((category, i) => {
        const count =
          category.slug === 'audio' ? 4 : category.slug === 'smart-devices' ? 3 : 5;

        return (
          <Reveal key={category.slug} delay={i * 0.08}>
            <Link
              href={`/${category.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900"
            >
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                <Image
                  src={category.image}
                  alt={`${category.name} — ${category.tagline}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-pulse-300">
                    {count} products
                  </p>
                  <h3 className="display-md">{category.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {category.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                    Explore {category.name}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
