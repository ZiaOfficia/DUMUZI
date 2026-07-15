import { SEO } from '../components/common/SEO';

const TrackOrderPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'var(--choc-deep)' }}>
      <SEO
        title="Track Order — DUMUZI"
        description="Track the status of your DUMUZI order."
      />
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-display text-cream">Track Order</h1>
      </section>
    </div>
  );
};

export default TrackOrderPage;
