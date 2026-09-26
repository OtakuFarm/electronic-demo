import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BatteryCharging,
  Bluetooth,
  Home,
  Laptop,
  Package,
  Wrench,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Support centre',
  description:
    'Setup guides, troubleshooting and warranty help for every PULSE product. Find answers on pairing, battery, connectivity, repairs and returns.',
  alternates: { canonical: '/support' },
};

const TOPICS = [
  {
    icon: Bluetooth,
    title: 'Pairing & connectivity',
    body: 'Multipoint, 2.4GHz receivers, Matter and Thread setup.',
    items: 12,
  },
  {
    icon: BatteryCharging,
    title: 'Battery & charging',
    body: 'Runtime, fast charging, capacity health and travel rules.',
    items: 9,
  },
  {
    icon: Home,
    title: 'Smart home setup',
    body: 'Pairing devices, local automations and troubleshooting the hub.',
    items: 15,
  },
  {
    icon: Laptop,
    title: 'Desk & display',
    body: 'Dual 4K output, keyboard layouts and switch compatibility.',
    items: 11,
  },
  {
    icon: Wrench,
    title: 'Repairs & service',
    body: 'Service guides, spare parts and how to open a product safely.',
    items: 8,
  },
  {
    icon: Package,
    title: 'Orders & returns',
    body: 'Delivery windows, returns process and warranty claims.',
    items: 14,
  },
];

const FAQS: AccordionItem[] = [
  {
    question: 'My device will not pair. What should I try?',
    answer:
      'Put both devices in pairing mode, then check three things in order. First, confirm the other device is not already connected to something else — most PULSE products remember up to three paired devices, and a phone will often grab the connection first. Second, move them within a metre of each other and remove any case or obstruction between them. Third, clear the pairing memory: hold the pairing button for ten seconds until the indicator flashes rapidly three times, then start again. If it still fails after a full power cycle, the support team can walk through a firmware check.',
  },
  {
    question: 'How do I check battery health?',
    answer:
      'Open the PULSE app, select the device, and look under Device information. It reports design capacity and current full-charge capacity, which is the number that matters. A battery is considered worn when it drops below 80% of design capacity — at that point the warranty covers a replacement. Audio products also report cycle count, which is useful if you want to know how far a battery has been pushed.',
  },
  {
    question: 'Can I repair my own PULSE product?',
    answer:
      'Yes, for most of the range. Every product ships with a service guide listing the tools, torque specs and step order. Ear cushions, battery packs, USB-C ports and feet are all treated as serviceable parts, and spares are stocked for seven years after a product launches. We strongly recommend reading the guide fully before opening anything — and note that opening a product does not void your warranty, but damage from a procedure not in the guide is not covered.',
  },
  {
    question: 'Why does the Home Hub need to be near my router?',
    answer:
      'For setup, yes — the hub uses your Wi-Fi network to install and register itself. After that it runs entirely locally, and Wi-Fi is only used if you enable a remote-access feature. The Thread and Zigbee radios that talk to your sensors, lights and locks are low-power mesh networks with a much larger range than Wi-Fi, so the hub only needs to sit somewhere reasonably central rather than right next to the router.',
  },
  {
    question: 'Which switches fit the Mechanical Keyboard?',
    answer:
      'Any standard 5-pin MX-compatible switch, including linear, tactile and clicky. The board uses hot-swappable sockets, so you can change switches without a soldering iron. If your switches have five pins, they will seat correctly. Three- and five-pin stabilisers both fit, and the included ones arrive factory-lubed.',
  },
  {
    question: 'Does the USB-C Hub support dual external displays?',
    answer:
      'Yes — both HDMI outputs run at 4K60 simultaneously, as long as your host supports DisplayPort Alt Mode and macOS or Windows has been updated to a version that permits three-display output on that machine. The hub uses a dual-controller design so each display gets its own bandwidth, which means sustained 4K streaming on one screen will not degrade the other.',
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="How can we help?"
        description="Setup guides, troubleshooting and repair information for every PULSE product. Most questions are answered below or in the FAQ."
      />

      <section className="container-page py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map(({ icon: Icon, title, body, items }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <Link href="/faq" className="card-surface card-hover group flex h-full flex-col p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-pulse-400/20 bg-pulse-400/[0.08]">
                  <Icon className="h-5 w-5 text-pulse-300" aria-hidden />
                </span>
                <h2 className="mb-1.5 font-display text-base font-semibold text-white">{title}</h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">{body}</p>
                <span className="flex items-center justify-between text-xs text-slate-500">
                  {items} articles
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900/40 py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="display-md mb-10 text-balance">Common questions</h2>
          </Reveal>
          <Accordion items={FAQS} allowMultiple />
        </div>
      </section>

      <section className="container-page py-16">
        <div className="card-surface flex flex-col items-center gap-5 p-10 text-center">
          <h2 className="display-md text-balance">Still stuck?</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Our support team replies within one business day, and they are engineers — not a
            script. If it is a hardware fault we will sort a replacement without argument.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-pulse-400 px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
            >
              Contact support
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/faq"
              className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-pulse-400/50"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
