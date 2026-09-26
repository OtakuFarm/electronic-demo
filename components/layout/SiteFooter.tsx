import Link from 'next/link';
import { Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { categories } from '@/lib/categories';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';

const shopLinks = categories.map((c) => ({ href: `/${c.slug}`, label: c.name }));

const supportLinks = [
  { href: '/support', label: 'Support centre' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact us' },
  { href: '/shipping-returns', label: 'Shipping & returns' },
];

const companyLinks = [
  { href: '/about', label: 'About PULSE' },
  { href: '/compare', label: 'Compare products' },
  { href: '/wishlist', label: 'Your wishlist' },
  { href: '/cart', label: 'Your cart' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms of service' },
];

const socials = [
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://youtube.com', label: 'YouTube', Icon: Youtube },
  { href: 'https://github.com', label: 'GitHub', Icon: Github },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-900">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <span className="relative grid h-8 w-8 place-items-center">
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-pulse-400 to-pulse-600 opacity-90" />
                <span className="relative h-2 w-2 rounded-full bg-ink-950" />
              </span>
              <span className="font-display text-base font-bold tracking-[0.22em] text-white">
                PULSE
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              Technology that moves with you. Designed to be repaired, upgraded and kept — not
              replaced. PULSE is a fictional brand created for a portfolio project.
            </p>
            <NewsletterForm variant="footer" />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Support" links={supportLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-slate-500">
            © {new Date().getFullYear()} PULSE. A fictional brand built as a developer portfolio.
            No real transactions are processed.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-pulse-400/50 hover:text-pulse-300"
                aria-label={label}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
