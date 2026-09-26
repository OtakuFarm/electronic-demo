import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How PULSE collects, uses and protects personal data, including what is stored locally in your browser and how long we retain it.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      description="What data we collect, why we collect it, how long we keep it and the controls you have over it."
      updated="12 January 2026"
      intro="We collect as little as we can get away with. This policy explains exactly what that means, including the data that never leaves your device."
      sections={[
        {
          heading: 'What we collect',
          body: [
            'We collect the information you give us directly: your name, email address, delivery address and phone number when you place an order, plus anything you include in a message to the support team.',
            'We also collect limited technical data — IP address, browser type and pages visited — to keep the site secure and understand which parts are useful.',
          ],
          list: [
            'Order data: name, email, delivery address, phone, order contents and value',
            'Account data: email address and, if you create one, saved addresses and preferences',
            'Support data: messages, attachments and any device details you volunteer to help diagnose a fault',
            'Technical data: IP address, browser, and pages viewed with approximate timestamps',
          ],
        },
        {
          heading: 'What stays on your device',
          body: [
            'In this portfolio demonstration, your cart, wishlist and product comparison selections are stored exclusively in your browser’s local storage. That data never reaches our servers, is not transmitted to us, and is deleted when you clear your site data or close the browser session.',
            'We built it this way deliberately: the interactions that demonstrate the architecture — add to cart, save to wishlist, compare specs — work fully offline and without an account.',
          ],
        },
        {
          heading: 'How we use data',
          body: [
            'Order data is used to process and deliver your purchase, provide support, and meet our legal tax and accounting obligations. It is not sold, rented or shared for marketing purposes.',
            'Support data is used only to investigate and resolve your request. Technical data is used to detect fraud and abuse, and to understand aggregate site performance.',
          ],
          list: [
            'We do not sell personal data to anyone, ever',
            'We do not share data with advertising networks',
            'Marketing emails are sent only where you have opted in, and every email has a one-click unsubscribe',
          ],
        },
        {
          heading: 'Cookies and local storage',
          body: [
            'This site uses no advertising or cross-site tracking cookies. It uses browser local storage to remember your cart, wishlist and comparison selections, and nothing else.',
            'Because we do not set advertising cookies, you will not see a cookie consent banner on this demonstration. A production build would add one alongside any analytics or marketing cookies it introduced.',
          ],
        },
        {
          heading: 'How long we keep data',
          body: [
            'Order records are retained for seven years because tax law requires it. Support correspondence is retained for three years so we can refer back to previous issues. Marketing preferences are retained until you unsubscribe.',
            'Data on your device remains there until you clear it. You have full control over that at any time through your browser settings.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'You can request a copy of the personal data we hold about you, ask us to correct anything inaccurate, or ask us to delete data we are not legally required to keep. We respond to all requests within 30 days.',
            'You can also lodge a complaint with your local data protection authority if you are not satisfied with how we have handled a request.',
          ],
        },
        {
          heading: 'Contacting us',
          body: [
            'For any privacy question or data request, use the contact form and select the appropriate topic. Requests are routed to the person who handles data protection rather than a general inbox.',
          ],
        },
      ]}
    />
  );
}
