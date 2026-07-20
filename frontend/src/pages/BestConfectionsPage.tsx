import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, ShoppingCart, Eye, Award, Leaf, Flame, Heart, ArrowRight, Gem, Sparkles } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { useAddToCart } from '../hooks/useAddToCart';
import { useNavigate } from 'react-router-dom';
import NewsletterSection from '../components/sections/NewsletterSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { products as allProducts, type Product } from '../data/productsData';
import { ProductModal } from '../components/common/ProductModal';

const GOLD = '#d4a373';
const GOLDL = '#e5c199';

const ease = [0.25, 0.1, 0.25, 1] as const;

const icons = [Flame, Heart, Award, Gem, Sparkles, Gem];
const badges = ['BEST SELLER', null, 'CUSTOMER PICK', null, 'TRENDING', 'PREMIUM'] as const;
const badgeSolids = [true, false, true, false, false, false];
const accents = ['#d4a373', '#c9a96e', '#b8976a', '#a08060', '#c9a96e', '#8a6a4a'];

/* ── Curated top-6 products ── */
const bestConfections = [
  allProducts[0],   // DUMUZI Signature
  allProducts[13],  // Heart 18 Duo
  allProducts[25],  // Bonbon 9 Trios
  allProducts[11],  // Heart 12 Trios
  allProducts[23],  // Display 25 Trios
  allProducts[19],  // Display 15 Trios
].map((p, i) => ({
  ...p,
  rank: String(i + 1).padStart(2, '0'),
  price: p.mrp,
  oldPrice: null as number | null,
  rating: i < 3 ? 5 : 4,
  reviews: [312, 228, 189, 156, 134, 98][i],
  badge: badges[i],
  badgeSolid: badgeSolids[i],
  tags: [p.description],
  icon: icons[i],
  accent: accents[i],
}));

const tiers = [
  { label: 'All', value: 'all' },
  { label: 'Heart', value: 'HEART' },
  { label: 'Display', value: 'DISPLAY' },
  { label: 'Bonbon', value: 'BONBON' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11}
          fill={i <= rating ? GOLD : 'none'}
          style={{ color: i <= rating ? GOLD : 'rgba(212,163,115,0.25)' }}
        />
      ))}
    </div>
  );
}

const BestConfectionsPage = () => {
  const addItem = useAddToCart();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [hovered, setHovered] = useState<number | null>(null);
  const [viewed, setViewed] = useState<Product | null>(null);

  const filtered = filter === 'all'
    ? bestConfections
    : bestConfections.filter(c => c.description.includes(filter));

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>
      <ProductModal product={viewed} onClose={() => setViewed(null)} />
      <SEO
        title="Best Confections — DUMUZI"
        description="Our most celebrated, highest-rated confections — from our signature Noir Intense 85% to hand-rolled gourmet bites and award-winning filled delicacies."
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-dark) 60%, var(--bg-warm) 100%)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        {/* Ambient glows */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20" style={{ background: GOLD }} />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-[120px] pointer-events-none opacity-10" style={{ background: GOLDL }} />

        {/* Floating particles */}
        {[
          { top: '12%', left: '6%', size: 5, delay: 0 },
          { top: '70%', left: '48%', size: 7, delay: 1.2 },
          { top: '22%', right: '8%', size: 4, delay: 0.6 },
          { top: '60%', left: '12%', size: 6, delay: 2 },
        ].map((p, i) => (
          <motion.div key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: p.size, height: p.size, top: p.top, left: (p as any).left, right: (p as any).right, background: GOLD, boxShadow: `0 0 8px ${GOLD}`, opacity: 0.35 }}
            animate={{ y: [0, -14, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-14 sm:py-24 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
              <span className="text-[11px] tracking-[0.32em] uppercase font-bold text-gold-gradient font-sans">
                Curated by our Master Confectioners
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              className="font-display leading-[1.08] mb-6 font-bold text-cream"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              The Best of<br />
              <span className="text-gold-gradient font-display italic">DUMUZI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-sans text-muted"
            >
              Six exceptional confections — chosen by our confectioners and loved most by our customers. Each one is a study in precision, flavour, and pure craftsmanship.
            </motion.p>

            {/* Award pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32, ease }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Award, label: '3 Award-Winning Selections' },
                { icon: Star, label: '4.9 Average Rating' },
                { icon: Leaf, label: '100% Organic Ingredient' },
              ].map(({ icon: Icon, label }) => (
                <div key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(212,163,115,0.1)', border: `1px solid rgba(212,163,115,0.25)`, color: GOLDL }}
                >
                  <Icon size={13} style={{ color: GOLD }} />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{ background: 'var(--bg-dark)', borderBottom: '1px solid rgba(212,163,115,0.12)', borderTop: '1px solid rgba(212,163,115,0.12)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center gap-3 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.28em] font-bold mr-2" style={{ color: 'rgba(212,163,115,0.5)' }}>Filter:</span>
          {tiers.map(t => (
            <button key={t.value}
              onClick={() => setFilter(t.value)}
              className="px-5 py-2 rounded-full text-[11px] uppercase tracking-wider font-bold transition-all duration-300 border-none cursor-pointer"
              style={{
                background: filter === t.value ? `linear-gradient(135deg,${GOLD},${GOLDL})` : 'rgba(212,163,115,0.07)',
                color: filter === t.value ? 'var(--bg-deep)' : GOLDL,
                border: filter === t.value ? 'none' : `1px solid rgba(212,163,115,0.2)`,
                boxShadow: filter === t.value ? `0 6px 20px rgba(212,163,115,0.3)` : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONFECTIONS GRID ── */}
      <section className="py-12 lg:py-20" style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.09, ease }}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex flex-col rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'rgba(26,18,13,0.7)',
                    border: hovered === item.id ? `1px solid rgba(212,163,115,0.55)` : '1px solid rgba(212,163,115,0.14)',
                    boxShadow: hovered === item.id ? `0 30px 70px rgba(212,163,115,0.18), 0 10px 30px rgba(0,0,0,0.7)` : '0 10px 40px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
                  }}
                >
                  {/* Image area */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--bg-mid)' }}>
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Rank badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-[11px] tracking-wider"
                      style={{ background: 'rgba(15,10,7,0.85)', border: `1px solid rgba(212,163,115,0.4)`, color: GOLD, backdropFilter: 'blur(8px)' }}>
                      {item.rank}
                    </div>

                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-lg"
                        style={{
                          background: item.badgeSolid ? `linear-gradient(135deg,${GOLD},${GOLDL})` : 'rgba(212,163,115,0.15)',
                          color: item.badgeSolid ? 'var(--bg-deep)' : GOLDL,
                          border: item.badgeSolid ? 'none' : `1px solid rgba(212,163,115,0.3)`,
                        }}>
                        {item.badge}
                      </span>
                    )}

                    {/* Hover quick actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: 'rgba(15,10,7,0.45)', backdropFilter: 'blur(4px)' }}>
                      <button
                        onClick={() => addItem({ id: item.id, name: item.description, price: item.price, image: item.image })}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-none cursor-pointer"
                        style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--bg-deep)' }}>
                        <ShoppingCart size={17} />
                      </button>
                      <button
                        onClick={() => setViewed(item)}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-none cursor-pointer"
                        style={{ color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                        <Eye size={17} />
                      </button>
                    </div>

                    {/* Origin tag at bottom */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                      <Icon size={13} style={{ color: GOLD }} />
                      <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: GOLDL }}>{item.brandName}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold"
                          style={{ background: 'rgba(212,163,115,0.08)', border: `1px solid rgba(212,163,115,0.18)`, color: 'rgba(212,163,115,0.65)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-lg leading-snug font-bold" style={{ color: 'var(--cream)' }}>{item.description}</h3>
                    <p className="text-[12px] leading-relaxed font-sans flex-1" style={{ color: 'rgba(220,214,205,0.6)' }}>{item.productName} · {item.brandName}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <Stars rating={item.rating} />
                      <span className="text-[10px]" style={{ color: 'rgba(212,163,115,0.5)' }}>({item.reviews} reviews)</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4"
                      style={{ borderTop: '1px solid rgba(212,163,115,0.1)' }}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gold-gradient">₹{item.price}</span>
                        {item.oldPrice && <span className="text-[11px] line-through opacity-35" style={{ color: 'var(--cream)' }}>₹{item.oldPrice}</span>}
                      </div>
                      <button
                        onClick={() => addItem({ id: item.id, name: item.description, price: item.price, image: item.image })}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border-none cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg,${GOLD},${GOLDL})`,
                          color: 'var(--bg-deep)',
                          boxShadow: '0 6px 18px rgba(212,163,115,0.3)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,163,115,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 18px rgba(212,163,115,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <ShoppingCart size={13} />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA to full collections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mt-20"
          >
            <p className="text-sm mb-6 font-sans" style={{ color: 'rgba(220,214,205,0.55)' }}>
              Discover the full range — over 40 handcrafted confections in our collection
            </p>
            <button
              onClick={() => navigate('/collections')}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-xs tracking-[0.18em] uppercase font-bold transition-all duration-300 border-none cursor-pointer"
              style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--bg-deep)', boxShadow: '0 12px 35px rgba(212,163,115,0.38)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 50px rgba(212,163,115,0.55)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 12px 35px rgba(212,163,115,0.38)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Explore All Collections <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── WHY THESE ARE THE BEST ── */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(212,163,115,0.12)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: `linear-gradient(90deg,transparent,${GOLD})` }} />
              <span className="text-[10px] tracking-[0.32em] uppercase font-bold text-gold-gradient">Why These Six</span>
              <div className="h-px w-12" style={{ background: `linear-gradient(90deg,${GOLD},transparent)` }} />
            </div>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--cream)' }}>
              Chosen by craft, confirmed by<br />
              <span className="text-gold-gradient italic font-display">customer love</span>
            </h2>
            <p className="text-sm max-w-lg mx-auto font-sans" style={{ color: 'var(--muted)' }}>
              These are not random picks. Each confection was tested over months of tastings, refined until it met our standard, and confirmed by the ratings of thousands of customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Tasted & Approved', desc: 'Every bar and gourmet bite goes through multiple sensory trials before it ever reaches a customer.' },
              { icon: Star, title: 'Customer-Rated', desc: 'These six hold the highest average ratings across all our products — with hundreds of verified reviews.' },
              { icon: Leaf, title: 'Ingredient Integrity', desc: 'Only single-origin organic ingredient. No fillers, no artificial flavours, no shortcuts.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.12, ease }}
                className="p-6 lg:p-8 rounded-3xl glass-card glass-card-hover flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(212,163,115,0.1)', border: `1px solid rgba(212,163,115,0.2)` }}>
                  <Icon size={24} style={{ color: GOLD }} />
                </div>
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--cream)' }}>{title}</h3>
                <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── NEWSLETTER ── */}
      <NewsletterSection />
    </div>
  );
};

export default BestConfectionsPage;
