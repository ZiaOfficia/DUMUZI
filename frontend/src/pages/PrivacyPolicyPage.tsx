import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

const sections = [
  {
    title: 'What we collect',
    body: 'We gather the minimum information required to fulfill your order, respond to your enquiries, and provide you with a smooth DUMUZI experience. This may include your name, email, phone number, delivery address, order history, and billing reference.',
  },
  {
    title: 'How we use it',
    body: 'Your information helps us process orders, confirm deliveries, share shipment updates, respond to support requests, and keep you informed about artisan launches, exclusive offers, and our seasonal collection.',
  },
  {
    title: 'How we protect it',
    body: 'We use secure systems and trusted partners to protect your data during checkout and order management. Payment information is handled by compliant processors, while sensitive account details are never stored in plain text.',
  },
  {
    title: 'Your rights',
    body: 'You may request access to, correction of, or deletion of your personal data at any time. You can also unsubscribe from marketing communications whenever you wish.',
  },
];

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--choc-deep)' }}>
      <SEO
        title="Privacy Policy — DUMUZI"
        description="Privacy Policy for DUMUZI. How we collect, use, and protect your personal information."
      />
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.32em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Privacy</p>
          <h1 className="text-4xl md:text-5xl font-display text-cream">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
            We treat your privacy with the same care we give to our chocolates: carefully, respectfully, and without compromise.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border p-6" style={{ background: 'rgba(26,18,13,0.7)', borderColor: 'rgba(212,163,115,0.16)' }}>
              <h2 className="font-display text-xl mb-3" style={{ color: 'var(--cream)' }}>{section.title}</h2>
              <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border p-6" style={{ background: 'rgba(212,163,115,0.08)', borderColor: 'rgba(212,163,115,0.2)' }}>
          <p className="text-[11px] uppercase tracking-[0.34em] font-bold mb-3" style={{ color: 'var(--gold)' }}>Need help?</p>
          <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--cream)' }}>
            If you have questions about your personal data or would like to make a request, email <a href="mailto:privacy@dumuzi.com" style={{ color: 'var(--gold)' }}>privacy@dumuzi.com</a>.
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
