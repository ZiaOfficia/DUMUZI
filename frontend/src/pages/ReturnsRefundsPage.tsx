import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

const points = [
  'We inspect every return request case-by-case to ensure quality, freshness, and customer satisfaction remain our top priorities.',
  'If the item arrives damaged, incorrect, or compromised, please notify us within 48 hours of delivery so we can assist promptly.',
  'Because our chocolates are perishable and handcrafted, refunds or exchanges are only available when a product arrives in unacceptable condition.',
  'For a successful claim, we may request photos of the item and packaging so we can resolve the issue quickly.',
];

const ReturnsRefundsPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--choc-deep)' }}>
      <SEO
        title="Returns & Refunds — DUMUZI"
        description="Return and refund policy for DUMUZI orders."
      />
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.32em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Service Promise</p>
          <h1 className="text-4xl md:text-5xl font-display text-cream">Returns & Refunds</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
            We believe every order should arrive beautifully, but if something goes wrong, we are here to make it right with care and clarity.
          </p>
        </div>

        <div className="rounded-2xl border p-6 md:p-8" style={{ background: 'rgba(26,18,13,0.7)', borderColor: 'rgba(212,163,115,0.16)' }}>
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
                <span className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border p-6" style={{ background: 'rgba(212,163,115,0.08)', borderColor: 'rgba(212,163,115,0.2)' }}>
          <p className="text-[11px] uppercase tracking-[0.34em] font-bold mb-3" style={{ color: 'var(--gold)' }}>Contact</p>
          <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--cream)' }}>
            Please reach out to our support team at <a href="mailto:orders@dumuzi.com" style={{ color: 'var(--gold)' }}>orders@dumuzi.com</a> with your order number and a brief description of the issue.
          </p>
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

export default ReturnsRefundsPage;
