import Link from 'next/link';
import { ArrowRight, Battery, Feather, Leaf, Wrench } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const reasons = [
  {
    icon: Wrench,
    title: 'Repairable by design',
    body: 'Replaceable ear cushions, standard screws and published service guides. We publish exploded diagrams for every product we sell.',
  },
  {
    icon: Battery,
    title: 'Battery-first engineering',
    body: 'Two-year battery guarantees and honest runtime testing at fixed volume. If the spec says 60 hours, you get 60 hours.',
  },
  {
    icon: Leaf,
    title: 'Recycled and traceable',
    body: '72% recycled aluminium across the range, with material passports and take-back for every device we make.',
  },
  {
    icon: Feather,
    title: 'Built to be kept',
    body: 'One chassis language, one USB-C standard, and a support team that will help you for as long as you own it.',
  },
];

export function WhyPulse() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {reasons.map(({ icon: Icon, title, body }, i) => (
        <Reveal key={title} delay={i * 0.07}>
          <div className="h-full">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-pulse-400/20 bg-pulse-400/[0.08]">
              <Icon className="h-5 w-5 text-pulse-300" aria-hidden />
            </span>
            <h3 className="mb-2.5 font-display text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function WhyPulseCta() {
  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
      <Link
        href="/about"
        className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-pulse-400/50 hover:bg-white/[0.04]"
      >
        Read our story
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
