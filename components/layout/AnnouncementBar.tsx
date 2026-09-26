import { Truck, ShieldCheck, Recycle, Sparkles } from 'lucide-react';

const messages = [
  { icon: Truck, text: 'Free delivery over $150' },
  { icon: ShieldCheck, text: '2–3 year warranties' },
  { icon: Recycle, text: 'Repairable by design' },
  { icon: Sparkles, text: 'New: PULSE Keyboard & Charging Station' },
];

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-ink-900">
      <div className="flex animate-marquee w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {messages.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-2 whitespace-nowrap px-8 py-2 text-xs font-medium tracking-wide text-slate-400"
              >
                <Icon className="h-3.5 w-3.5 text-pulse-400" aria-hidden />
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
