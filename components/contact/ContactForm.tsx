'use client';

import { useState } from 'react';
import { Check, Mail, MessageSquare, Send, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cx } from '@/lib/utils';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = [
  'Order or delivery',
  'Product setup',
  'Warranty claim',
  'Repair or spare parts',
  'Something else',
];

type Errors = Partial<Record<'name' | 'email' | 'topic' | 'message', string>>;

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const { pushToast } = useStore();

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Please tell us your name.';
    if (!email.trim()) next.email = 'An email address is required so we can reply.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'That email address does not look right.';
    if (!topic) next.topic = 'Pick the closest topic.';
    if (message.trim().length < 20) {
      next.message = 'Please add a little more detail (at least 20 characters).';
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      pushToast({
        title: 'Check the form',
        description: 'A few fields still need attention.',
        variant: 'error',
      });
      return;
    }
    setSubmitted(true);
    pushToast({
      title: 'Message sent',
      description: 'We reply within one business day.',
      variant: 'success',
    });
  }

  if (submitted) {
    return (
      <div className="card-surface flex flex-col items-center p-10 text-center">
        <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15">
          <Check className="h-7 w-7 text-emerald-300" aria-hidden />
        </span>
        <h2 className="display-md">Message received</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
          Thanks {name.split(' ')[0]} — a support engineer will reply to{' '}
          <span className="text-white">{email}</span> within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setName('');
            setEmail('');
            setTopic('');
            setMessage('');
            setSubmitted(false);
          }}
          className="mt-6 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-pulse-400/50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Your name"
          icon={User}
          value={name}
          onChange={setName}
          error={errors.name}
          placeholder="Alex Rivera"
          autoComplete="name"
        />
        <Field
          id="contact-email"
          label="Email address"
          icon={Mail}
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <fieldset className="mt-5">
        <legend className="field-label">What is this about?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setTopic(option);
                setErrors((prev) => ({ ...prev, topic: undefined }));
              }}
              className={cx(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                topic === option
                  ? 'border-pulse-400/60 bg-pulse-400/10 text-pulse-200'
                  : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white',
              )}
              aria-pressed={topic === option}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.topic && (
          <p className="mt-2 text-xs text-coral-400" role="alert">
            {errors.topic}
          </p>
        )}
      </fieldset>

      <MessageField
        value={message}
        onChange={(value) => {
          setMessage(value);
          if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
        }}
        error={errors.message}
      />

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-pulse-400 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-pulse-300 sm:w-auto sm:px-8"
      >
        <Send className="h-4 w-4" aria-hidden />
        Send message
      </button>
    </form>
  );
}

function MessageField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="mt-5">
      <label htmlFor="contact-message" className="field-label">
        Message
      </label>
      <div className="relative">
        <MessageSquare
          className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500"
          aria-hidden
        />
        <textarea
          id="contact-message"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          placeholder="Tell us what happened, which product it involves, and your order number if you have one."
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'contact-message-error' : undefined}
          className={cx(
            'field resize-y pl-11',
            error && 'border-coral-500/70 focus:ring-coral-500/50',
          )}
        />
      </div>
      {error && (
        <p id="contact-message-error" className="mt-2 text-xs text-coral-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  icon: typeof User;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cx('field pl-11', error && 'border-coral-500/70 focus:ring-coral-500/50')}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-coral-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

