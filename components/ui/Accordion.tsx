'use client';

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cx } from '@/lib/utils';

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

export function Accordion({ items, allowMultiple = false }: { items: AccordionItem[]; allowMultiple?: boolean }) {
  const [open, setOpen] = useState<number[]>([0]);

  function toggle(index: number) {
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return allowMultiple ? [...prev, index] : [index];
    });
  }

  return (
    <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-pulse-300"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
              >
                <span className="font-display text-base font-medium text-white sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={cx(
                    'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/15 text-slate-400 transition-transform',
                    isOpen && 'rotate-45 border-pulse-400/50 text-pulse-300',
                  )}
                  aria-hidden
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-400">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
