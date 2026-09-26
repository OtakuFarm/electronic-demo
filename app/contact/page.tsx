import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Mail, MessageSquare, Phone } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/contact/ContactForm';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Contact us',
  description:
    'Get in touch with the PULSE support team about orders, setup, warranty claims, repairs or spare parts. We reply within one business day.',
  alternates: { canonical: '/contact' },
};

const CHANNELS = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@pulse-demo.example',
    note: 'Replies within one business day',
  },
  {
    icon: MessageSquare,
    title: 'Live chat',
    value: 'Mon–Fri, 09:00–18:00 UTC',
    note: 'Typical wait under two minutes',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 014-8820',
    note: 'Mon–Fri, 09:00–18:00 UTC',
  },
  {
    icon: Clock,
    title: 'Repair desk',
    value: '7 years of parts',
    note: 'Service guides published per product',
  },
];

const CONTACT_FAQS: AccordionItem[] = [
  {
    question: 'What is the fastest way to get an answer?',
    answer:
      'For anything about an existing order, include your order number in the message — it removes a round trip of questions. For hardware faults, a short description of what you hear or see, plus the product serial from the box, gets you to the right engineer immediately.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'In this demonstration, delivery is described for a fictional set of markets. A real store would typically use a zone-based rate table, and the cart and shipping pages here reflect that structure without connecting to a live carrier.',
  },
  {
    question: 'Can I return a product I have used?',
    answer:
      'Yes — 60 days, and opened products are fine as long as they are not damaged by something outside normal use. Refunds go back to the original payment method within five business days of the return arriving.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about an order, help setting something up, or a fault to report — our support team is engineers, and we answer within one business day."
      />

      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <ContactForm />
            <div className="mt-10">
              <h2 className="mb-5 font-display text-lg font-semibold text-white">
                Before you write
              </h2>
              <Accordion items={CONTACT_FAQS} allowMultiple />
            </div>
          </div>

          <aside className="space-y-4">
            {CHANNELS.map(({ icon: Icon, title, value, note }) => (
              <div key={title} className="card-surface p-5">
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-lg border border-pulse-400/20 bg-pulse-400/10">
                  <Icon className="h-4 w-4 text-pulse-300" aria-hidden />
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-white">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{note}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-white/[0.07] bg-ink-900/60 p-5">
              <p className="text-xs leading-relaxed text-slate-500">
                PULSE is a fictional brand built as a developer portfolio. Contact details and
                support copy are demonstration content — no message is actually sent.
              </p>
            </div>

            <Link href="/faq" className="link-underline">
              Read the FAQ first
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
