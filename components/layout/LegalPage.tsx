interface Section {
  heading: string;
  body: string[];
  list?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  intro?: string;
  sections: Section[];
}

/** Shared layout for the policy pages so they stay visually and structurally consistent. */
export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <section className="border-b border-white/10 bg-ink-950">
        <div className="container-page py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="display-lg text-balance">{title}</h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              {description}
            </p>
            <p className="mt-6 text-xs text-slate-500">Last updated: {updated}</p>
          </div>
        </div>
      </section>

      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          {/* Table of contents */}
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:h-fit">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              On this page
            </p>
            <ol className="space-y-2.5 border-l border-white/10 pl-4">
              {sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#section-${i + 1}`}
                    className="block text-sm text-slate-400 transition-colors hover:text-pulse-300"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl">
            {intro && (
              <p className="mb-10 border-l-2 border-pulse-400/40 pl-5 text-base leading-relaxed text-slate-300">
                {intro}
              </p>
            )}

            {sections.map((section, i) => (
              <section key={section.heading} id={`section-${i + 1}`} className="scroll-mt-28">
                <h2 className="mb-4 font-display text-xl font-semibold text-white sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-slate-400">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-5 space-y-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-400"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse-400"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p className="mt-12 rounded-xl border border-white/[0.07] bg-ink-900/60 p-5 text-xs leading-relaxed text-slate-500">
              PULSE is a fictional brand created for a developer portfolio. This page is
              demonstration content and does not constitute a real legal agreement.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
