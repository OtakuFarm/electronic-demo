import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of service',
  description:
    'The terms governing use of the PULSE site, purchases, warranties, acceptable use and limitation of liability.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      description="The agreement covering use of this site, purchases, warranties and liability."
      updated="12 January 2026"
      intro="By using this site or placing an order you accept these terms. They are written to be readable — if anything below is unclear, ask us before ordering and we will explain it."
      sections={[
        {
          heading: 'About this site',
          body: [
            'PULSE is a fictional consumer electronics brand. This website was built as a developer portfolio project to demonstrate e-commerce architecture, not as a live store. Product descriptions, specifications, prices, stock levels, reviews and company details are all invented for demonstration purposes.',
            'No order placed on this site results in a real sale, and no payment is processed. If you need real consumer electronics, please visit an actual retailer.',
          ],
        },
        {
          heading: 'Orders and acceptance',
          body: [
            'Your order is an offer to buy. A contract forms only when we send you an order confirmation. We may decline an order where an item is out of stock, priced incorrectly, or where we cannot ship to your destination.',
            'Where we have already taken payment and then decline an order, any amount charged is refunded in full within five business days.',
          ],
        },
        {
          heading: 'Pricing',
          body: [
            'Prices are shown in US dollars and include applicable taxes where stated. Delivery is calculated separately and shown before you confirm the order.',
            'We try to keep pricing accurate, but if a product is listed at an obviously incorrect price we will contact you before dispatch to agree a corrected price, and you may cancel without charge.',
          ],
        },
        {
          heading: 'Product information and specifications',
          body: [
            'We work hard to make specifications accurate, and battery figures are measured on a documented protocol. However, you should not rely on any single specification as a guarantee of performance in your particular environment.',
            'Product colours and finishes may vary slightly from how they appear on your screen. Where that difference is material, we will tell you before dispatch.',
          ],
        },
        {
          heading: 'Acceptable use',
          body: [
            'You may browse, search and use the comparison tools for your own personal, non-commercial purposes. You may not scrape the catalogue, resell product data, or attempt to disrupt or overload the service.',
          ],
          list: [
            'Do not attempt to gain unauthorised access to any system or account',
            'Do not use automated tools to scrape content at a rate that degrades the service for others',
            'Do not misrepresent yourself or impersonate another person when contacting support',
            'Do not use the site for anything unlawful in your jurisdiction',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'The PULSE name, logo, product designs, copy, photography and the design of this site are our intellectual property. You may reference and link to the site freely, but you may not reproduce substantial parts of it for commercial purposes without permission.',
            'All product names shown here are fictional and are not associated with any real manufacturer.',
          ],
        },
        {
          heading: 'Warranties and liability',
          body: [
            'Product warranties are set out on the shipping and returns page and apply in addition to your statutory rights. Nothing in these terms limits rights you have under consumer law that cannot be waived.',
            'To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this site or a product, and our total liability is limited to the amount you paid for the product concerned.',
          ],
        },
        {
          heading: 'Changes to these terms',
          body: [
            'We may update these terms from time to time. The version that applies to your order is the one published at the time you placed it. Material changes will be announced on the site at least 14 days before they take effect.',
          ],
        },
        {
          heading: 'Governing law',
          body: [
            'These terms are governed by the laws of England and Wales, without affecting any mandatory consumer protections available to you where you live.',
            'If a provision of these terms is found unenforceable, the remaining provisions continue in full force.',
          ],
        },
      ]}
    />
  );
}
