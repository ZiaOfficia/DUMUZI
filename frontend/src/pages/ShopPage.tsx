import { SEO } from '../components/common/SEO';

const ShopPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'var(--bg-deep)' }}>
      <SEO
        title="Shop — DUMUZI"
        description="Explore the full collection of DUMUZI confections."
      />
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-display text-cream">Shop</h1>
      </section>
    </div>
  );
};

export default ShopPage;
