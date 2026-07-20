import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

const clauses = [
  'By placing an order with DUMUZI, you confirm that you are authorised to make the purchase and that the provided delivery details are accurate.',
  'All product descriptions, images, and pricing are intended to reflect our current offerings and may be updated from time to time.',
  'We reserve the right to refuse or cancel orders if payment verification, fraud checks, or stock availability require us to do so.',
  'DUMUZI products are crafted with care and are intended for personal consumption; any resale or commercial redistribution without permission is prohibited.',
];

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-deep)' }}>
      <SEO
        title="Terms & Conditions — DUMUZI"
        description="Terms and conditions for shopping with DUMUZI."
      />
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.32em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Policy</p>
          <h1 className="text-4xl md:text-5xl font-display text-cream">Terms & Conditions</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
            Please read these terms carefully before purchasing from DUMUZI. They govern your shopping experience, order acceptance, and the use of our services.
          </p>
        </div>

        <div className="rounded-2xl border p-6 md:p-8" style={{ background: 'rgba(26,18,13,0.7)', borderColor: 'rgba(212,163,115,0.16)' }}>
          <ul className="space-y-4">
            {clauses.map((clause) => (
              <li key={clause} className="flex gap-3 text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
                <span className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span>{clause}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border p-6" style={{ background: 'rgba(212,163,115,0.08)', borderColor: 'rgba(212,163,115,0.2)' }}>
          <p className="text-[11px] uppercase tracking-[0.34em] font-bold mb-3" style={{ color: 'var(--gold)' }}>Questions?</p>
          <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--cream)' }}>
            If anything in these terms is unclear, please contact our team at <a href="mailto:hello@dumuzi.com" style={{ color: 'var(--gold)' }}>hello@dumuzi.com</a>.
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

export default TermsAndConditionsPage;
