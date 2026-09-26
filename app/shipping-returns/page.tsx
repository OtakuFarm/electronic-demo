import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Shipping & returns',
  description:
    'PULSE delivery times, costs, international shipping, the 60-day returns process and warranty claims.',
  alternates: { canonical: '/shipping-returns' },
};

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Shipping & returns"
      description="How we get products to you, what delivery costs, and how to send something back if it is not right."
      updated="12 January 2026"
      intro="We aim to get every order out the same working day if you order before 14:00 UTC. If something goes wrong with a delivery, contact us and we will sort it without argument."
      sections={[
        {
          heading: 'Delivery times',
          body: [
            'Standard delivery takes 2–4 business days once your parcel leaves our warehouse. Express delivery is next business day. Both options are available on every product, and you will receive a tracking link by email as soon as the parcel is handed over.',
            'Orders placed after 14:00 UTC on a working day, or at any time over a weekend, are processed the following working day. Public holidays in the destination country can add one day.',
          ],
          list: [
            'United Kingdom and European Union: 2–4 business days standard, next business day express',
            'United States and Canada: 3–5 business days standard, 2 business days express',
            'Rest of world: 5–10 business days standard',
            'Duties and import taxes are calculated at checkout for international destinations',
          ],
        },
        {
          heading: 'Delivery costs',
          body: [
            'Standard delivery is free on every order over $150. Below that threshold, standard delivery is a flat $12 regardless of how many items you order. Express delivery is calculated by destination and shown before you confirm the order.',
            'We do not charge a restocking or handling fee. The only charges you will ever see are the item price, delivery and any applicable tax.',
          ],
        },
        {
          heading: 'Tracking your order',
          body: [
            'You receive a tracking link by email as soon as your parcel is dispatched, and the same link is available in your order history. Tracking can take up to 24 hours to show the first scan, particularly for international parcels.',
            'If tracking has not updated for more than five business days, contact us and we will open an investigation with the carrier rather than making you wait.',
          ],
        },
        {
          heading: 'Returning a product',
          body: [
            'You have 60 days from delivery to return any product, including products you have opened and used. The only requirement is that the item is not damaged by something outside normal use — scratches from everyday handling are fine.',
            'Start a return through the support team with your order number. We will email you a prepaid label for the EU, UK and US, and a shipping instruction for other destinations. Returns are refunded to the original payment method within five business days of the parcel arriving.',
          ],
          list: [
            'Returns are free for faults under warranty — we cover the return postage',
            'Consumer returns are refunded in full, including the original delivery charge',
            'Part-order refunds do not deduct the original delivery charge',
            'Refunds are processed within five business days of the return arriving',
          ],
        },
        {
          heading: 'Exchanges',
          body: [
            'If you would rather have a different colour or model, we can arrange an exchange instead of a refund. Exchanges are subject to the same stock availability as a new order, so it is worth checking before you send the original back.',
            'Where a direct exchange is not possible, we will refund the original and treat the new order as a fresh purchase, which keeps the queue moving in your favour.',
          ],
        },
        {
          heading: 'Warranty claims',
          body: [
            'Every product carries a two-year limited warranty, extended to three years on the Home Hub. Batteries are covered for two years and guaranteed to hold at least 80% of design capacity over that period.',
            'For a suspected fault, contact support with your order number and a description of the problem. If we agree it is a manufacturing fault, we will send a replacement and cover the return postage — we do not ask you to prove the fault beyond a reasonable description.',
          ],
          list: [
            'Covered: manufacturing defects, premature battery wear, faulty accessories supplied in the box',
            'Not covered: physical damage from accidents, liquid ingress beyond the stated IP rating, and unauthorised repairs',
            'Self-repair is supported and does not void the warranty, provided the service guide procedure was followed',
            'Spare parts remain available for seven years after a product launches',
          ],
        },
        {
          heading: 'Damaged or faulty on arrival',
          body: [
            'If your parcel arrives visibly damaged, photograph it before opening the box and contact us within 48 hours. We will dispatch a replacement immediately and arrange collection of the damaged parcel, so you are not left without a product while the claim is processed.',
          ],
        },
      ]}
    />
  );
}
