import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';

export type PolicySection = {
  title: string;
  body?: string;
  points?: string[];
};

type PolicyLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  sections: PolicySection[];
  contactLabel?: string;
  contact: ReactNode;
};

export const PolicyLayout = ({
  eyebrow,
  title,
  intro,
  seoTitle,
  seoDescription,
  sections,
  contactLabel = 'Need help?',
  contact,
}: PolicyLayoutProps) => {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-deep)' }}>
      <SEO title={seoTitle} description={seoDescription} />
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.32em] font-bold mb-4" style={{ color: 'var(--gold)' }}>{eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-display text-cream">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
            {intro}
          </p>
        </div>

        <div className="space-y-5">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border p-6 md:p-8" style={{ background: 'rgba(26,18,13,0.7)', borderColor: 'rgba(212,163,115,0.16)' }}>
              <h2 className="font-display text-xl mb-3" style={{ color: 'var(--cream)' }}>{section.title}</h2>
              {section.body && (
                <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>{section.body}</p>
              )}
              {section.points && (
                <ul className={`space-y-3 ${section.body ? 'mt-4' : ''}`}>
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
                      <span className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border p-6" style={{ background: 'rgba(212,163,115,0.08)', borderColor: 'rgba(212,163,115,0.2)' }}>
          <p className="text-[11px] uppercase tracking-[0.34em] font-bold mb-3" style={{ color: 'var(--gold)' }}>{contactLabel}</p>
          <div className="text-sm leading-relaxed font-sans" style={{ color: 'var(--cream)' }}>{contact}</div>
        </div>

        <div className="mt-10">
          <Link to="/" className="inline-flex items-center text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PolicyLayout;
