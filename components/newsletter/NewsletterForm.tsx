'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cx } from '@/lib/utils';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface NewsletterFormProps {
  variant?: 'footer' | 'section';
}

export function NewsletterForm({ variant = 'section' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const { pushToast } = useStore();

  function validate(value: string): string | null {
    if (!value.trim()) return 'Enter your email address.';
    if (!EMAIL_RE.test(value.trim())) return 'That email address does not look right.';
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate(email);

    if (error) {
      setStatus('error');
      setMessage(error);
      return;
    }

    setStatus('success');
    setMessage('You’re on the list. Check your inbox for 10% off.');
    pushToast({
      title: 'Subscribed to PULSE updates',
      description: 'Your 10% code is on its way.',
      variant: 'success',
    });
    setEmail('');
  }

  function handleBlur() {
    if (!email.trim()) return;
    const error = validate(email);
    setStatus(error ? 'error' : 'idle');
    setMessage(error ?? '');
  }

  const isFooter = variant === 'footer';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label
        htmlFor={`newsletter-email-${variant}`}
        className={cx('block', isFooter ? 'sr-only' : 'field-label')}
      >
        Email address
      </label>

      <div className="relative">
        <Mail
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          onBlur={handleBlur}
          placeholder="you@example.com"
          aria-invalid={status === 'error'}
          aria-describedby={`newsletter-msg-${variant}`}
          className={cx(
            'w-full rounded-full border bg-ink-850/80 py-3.5 pl-11 pr-32 text-sm text-white placeholder:text-slate-500 transition-colors focus:outline-none',
            status === 'error'
              ? 'border-coral-500/70 focus:ring-1 focus:ring-coral-500/50'
              : 'border-white/10 focus:border-pulse-400/60 focus:ring-1 focus:ring-pulse-400/40',
          )}
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-pulse-400 px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300"
        >
          Subscribe
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <p
        id={`newsletter-msg-${variant}`}
        role={status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        className={cx(
          'mt-2 flex items-center gap-1.5 text-xs',
          status === 'error' && 'text-coral-400',
          status === 'success' && 'text-emerald-300',
          status === 'idle' && !isFooter && 'text-slate-500',
        )}
      >
        {status === 'success' && <Check className="h-3.5 w-3.5" aria-hidden />}
        {message || (isFooter ? null : 'No spam. Unsubscribe any time.')}
      </p>
    </form>
  );
}
