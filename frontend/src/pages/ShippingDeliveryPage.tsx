import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

const sections = [
  {
    title: 'Express dispatch',
    body: 'All orders are packed within 24 hours of confirmation, then dispatched with premium cold-chain handling to preserve freshness and presentation.',
  },
  {
    title: 'Global delivery',
    body: 'We ship to most international destinations, with tracking updates shared as soon as your parcel is scanned by the courier.',
  },
  {
    title: 'Delivery timelines',
    body: 'Domestic parcels typically arrive in 3–6 business days, while international shipping varies by country and customs processing.',
  },
  {
    title: 'Packaging care',
    body: 'Every order is wrapped in insulated luxury packaging with protective cushioning so your confections arrive in immaculate condition.',
  },
];

const ShippingDeliveryPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg-deep)' }}>
      <SEO
        title="Shipping & Delivery — DUMUZI"
        description="Shipping and delivery information for DUMUZI orders."
      />
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.32em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Customer Care</p>
          <h1 className="text-4xl md:text-5xl font-display text-cream">Shipping & Delivery</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>
            From our atelier to your doorstep, every parcel is handled with precision, insulation, and the same care as our confections themselves.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((item) => (
            <div key={item.title} className="rounded-2xl border p-6" style={{ background: 'rgba(26,18,13,0.7)', borderColor: 'rgba(212,163,115,0.16)' }}>
              <h2 className="font-display text-xl mb-3" style={{ color: 'var(--cream)' }}>{item.title}</h2>
              <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border p-6" style={{ background: 'rgba(212,163,115,0.08)', borderColor: 'rgba(212,163,115,0.2)' }}>
          <p className="text-[11px] uppercase tracking-[0.34em] font-bold mb-3" style={{ color: 'var(--gold)' }}>Need help?</p>
          <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--cream)' }}>
            If your order is delayed or you need a delivery update, contact our concierge team at <a href="mailto:hello@dumuzi.com" style={{ color: 'var(--gold)' }}>hello@dumuzi.com</a>.
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

export default ShippingDeliveryPage;
