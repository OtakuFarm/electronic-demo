import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description:
    'Answers about PULSE orders, delivery, returns, warranties, battery life, pairing, compatibility, repairs and spare parts.',
  alternates: { canonical: '/faq' },
};

const SECTIONS: { id: string; title: string; items: AccordionItem[] }[] = [
  {
    id: 'orders',
    title: 'Orders & payment',
    items: [
      {
        question: 'Can I change or cancel an order?',
        answer:
          'Yes, as long as it has not been dispatched. Contact the support team with your order number and we will amend or cancel it. Once a parcel is with the carrier, the fastest route is to accept the delivery and start a return.',
      },
      {
        question: 'Which payment methods do you accept?',
        answer:
          'This site is a portfolio demonstration, so checkout is disabled and no payment is processed. A production build would connect to a payment provider and support cards, wallets and bank transfer.',
      },
      {
        question: 'Do you offer instalment plans?',
        answer:
          'Product pages show a four-payment illustration, which mirrors how a real store would present instalment pricing. Availability and eligibility would be calculated at checkout.',
      },
      {
        question: 'Is my data safe?',
        answer:
          'The cart, wishlist and comparison selections in this demo are stored only in your browser’s local storage. Nothing is sent to a server, and clearing site data resets them permanently.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery & returns',
    items: [
      {
        question: 'How long does delivery take?',
        answer:
          'Standard delivery is 2–4 business days, and orders over $150 ship free. Express delivery is next business day where available. You receive a tracking link as soon as the parcel is handed to the carrier.',
      },
      {
        question: 'What is the returns window?',
        answer:
          '60 days from delivery, including on products you have opened and used. The only requirement is that the product is not damaged by something outside normal use. Refunds are issued to the original payment method within five business days of the return arriving.',
      },
      {
        question: 'Can I return part of an order?',
        answer:
          'Absolutely. Each item is refunded at its own price, and the original delivery charge is only deducted if every item is being returned.',
      },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty & repairs',
    items: [
      {
        question: 'How long is the warranty?',
        answer:
          'Two years on nearly everything, and three years on the Home Hub. Batteries are covered for two years and guaranteed to hold at least 80% of design capacity over that period. Accidental damage is covered in year one on audio products.',
      },
      {
        question: 'How do I make a warranty claim?',
        answer:
          'Contact support with your order number and a description of the fault. If it is a hardware issue we arrange a replacement without requiring you to prove the fault in detail — we would rather replace than argue.',
      },
      {
        question: 'Does opening a product void the warranty?',
        answer:
          'No. Every product ships with a service guide, and self-repair is explicitly supported. What is not covered is damage caused by a procedure that is not in the guide, or by using the wrong tools.',
      },
    ],
  },
  {
    id: 'compatibility',
    title: 'Compatibility & setup',
    items: [
      {
        question: 'Will PULSE products work with my phone?',
        answer:
          'Any device with Bluetooth 5.2 or later will work with our audio products. The Home Hub and Smart Lamp need the PULSE app, which supports the two most recent major versions of iOS and Android. Every product page lists exact compatibility.',
      },
      {
        question: 'Can I use the products without an app?',
        answer:
          'Most of them, yes. The Air Pro, Mini, Portable Speaker, Soundbar X, PowerBank, Keyboard and Mouse all have full physical controls. The Watch One and Home Hub do need the app for configuration, though both keep working locally afterwards.',
      },
      {
        question: 'Does the Home Hub work without an internet connection?',
        answer:
          'Yes. Automations run on the hub itself in under 20 milliseconds, so lights, sensors and locks respond even with the router unplugged. You only need a connection during setup, and for the optional remote-access feature.',
      },
    ],
  },
  {
    id: 'products',
    title: 'Products & care',
    items: [
      {
        question: 'How should I care for my products?',
        answer:
          'Keep them dry where the IP rating does not cover it, avoid charging below 5°C or above 40°C, and clean with a dry microfibre cloth. Ear cushions and charging contacts are the two things worth checking every few months.',
      },
      {
        question: 'Can I get spare parts?',
        answer:
          'Yes, for seven years after a product launches. Ear cushions, battery packs, charging cables, feet and cases are all stocked as spare parts, and the service guide for each product is published on the support pages.',
      },
      {
        question: 'Why is a product listed as low stock?',
        answer:
          'Low stock means fewer than ten units remain. It is a real number from our fulfilment system, not a marketing device — if you want a specific quantity, the cart will cap it at what is available.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything about orders, delivery, returns, warranties, compatibility and care. If your question is not here, the support team can help."
      />

      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-24 lg:h-fit">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Sections
            </p>
            <ol className="space-y-2.5 border-l border-white/10 pl-4">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-sm text-slate-400 transition-colors hover:text-pulse-300"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <Reveal>
                  <h2 className="mb-6 font-display text-xl font-semibold text-white sm:text-2xl">
                    {section.title}
                  </h2>
                </Reveal>
                <Accordion items={section.items} />
              </section>
            ))}

            <Reveal>
              <div className="card-surface p-8 text-center">
                <h2 className="font-display text-xl font-semibold text-white">
                  Couldn&rsquo;t find what you needed?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                  Send the support team a message and we will answer within one business day.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-12 items-center rounded-full bg-pulse-400 px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
                >
                  Contact us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

