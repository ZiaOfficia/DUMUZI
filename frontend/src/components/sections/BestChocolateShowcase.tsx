import { motion, type Transition } from 'framer-motion';
import { Star, ArrowRight, Flame, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAddToCart } from '../../hooks/useAddToCart';
import { products as allProducts } from '../../data/productsData';

const ease = [0.25, 0.1, 0.25, 1] as const;
const GOLD = '#d4a373';
const GOLDL = '#e5c199';

// Pick 3 showcase products: Signature heart, Display trios large, Bonbon trios
const topThree = [
  { ...allProducts[0],  rank: '#1', icon: Flame,  badge: 'BEST SELLER',  desc: 'Signature heart box with 9 handcrafted gold-foil chocolates.',   featured: true,  rating: 5, reviews: 312, price: allProducts[0].mrp  },
  { ...allProducts[13], rank: '#2', icon: Heart,  badge: null,            desc: '18-piece heart gift box with dual-tone gold & red assortment.',  featured: false, rating: 5, reviews: 228, price: allProducts[13].mrp },
  { ...allProducts[25], rank: '#3', icon: Award,  badge: 'CUSTOMER PICK', desc: 'Cone-shaped acrylic bonbon tower with 9 trios assorted pieces.', featured: false, rating: 5, reviews: 189, price: allProducts[25].mrp },
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

export const BestChocolateShowcase = () => {
  const navigate = useNavigate();
  const addItem = useAddToCart();

  return (
    <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(180deg, var(--choc-dark) 0%, var(--choc-deep) 100%)', position: 'relative' }}>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[150px] pointer-events-none opacity-10"
        style={{ background: GOLD }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14"
        >
          <div>
            <div className="section-label mb-4">Customer Favourites</div>
            <h2 className="font-luxury font-semibold leading-[1.08]"
              style={{ fontSize: 'clamp(2.2rem,3.8vw,3.4rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}>
              The Best of{' '}
              <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>DUMUZI</em>
            </h2>
          </div>
          <button
            onClick={() => navigate('/best-chocolate')}
            className="flex items-center gap-2 text-sm font-semibold tracking-wide whitespace-nowrap self-start sm:self-auto bg-transparent border-none cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={{ color: GOLD }}
          >
            See All Best Chocolates <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {topThree.map((choc, i) => {
            const Icon = choc.icon;
            return (
              <motion.div
                key={choc.id}
                initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.12, ease } as Transition}
                className="group flex flex-col rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  background: choc.featured ? 'rgba(35,22,14,0.95)' : 'rgba(26,18,13,0.7)',
                  border: choc.featured ? `1px solid rgba(212,163,115,0.4)` : '1px solid rgba(212,163,115,0.14)',
                  boxShadow: choc.featured ? `0 20px 60px rgba(212,163,115,0.18), 0 0 0 1px rgba(212,163,115,0.12)` : 'none',
                  backdropFilter: 'blur(20px)',
                  transform: choc.featured ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(212,163,115,0.5)';
                  el.style.transform = choc.featured ? 'scale(1.04)' : 'scale(1.02)';
                  el.style.boxShadow = `0 30px 70px rgba(212,163,115,0.22), 0 0 0 1px rgba(212,163,115,0.2)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = choc.featured ? 'rgba(212,163,115,0.4)' : 'rgba(212,163,115,0.14)';
                  el.style.transform = choc.featured ? 'scale(1.02)' : 'scale(1)';
                  el.style.boxShadow = choc.featured ? '0 20px 60px rgba(212,163,115,0.18), 0 0 0 1px rgba(212,163,115,0.12)' : 'none';
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--choc-mid)' }}>
                  <img
                    src={choc.image}
                    alt={choc.description}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Rank */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider"
                    style={{ background: 'rgba(15,10,7,0.85)', border: `1px solid rgba(212,163,115,0.4)`, color: GOLD, backdropFilter: 'blur(8px)' }}>
                    {choc.rank}
                  </div>

                  {/* Badge */}
                  {choc.badge && (
                    <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-lg"
                      style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--choc-deep)' }}>
                      {choc.badge}
                    </span>
                  )}

                  {/* Origin bottom */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                    <Icon size={12} style={{ color: GOLD }} />
                    <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: GOLDL }}>{choc.brandName}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="font-display text-base leading-snug font-bold" style={{ color: 'var(--cream)' }}>{choc.description}</h3>
                  <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>{choc.desc}</p>

                  <div className="flex items-center gap-2">
                    <Stars rating={choc.rating} />
                    <span className="text-[10px]" style={{ color: 'rgba(212,163,115,0.5)' }}>({choc.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3.5"
                    style={{ borderTop: '1px solid rgba(212,163,115,0.1)' }}>
                    <span className="text-lg font-bold text-gold-gradient">₹{choc.price}</span>
                    <button
                      onClick={() => addItem({ id: choc.id, name: choc.description, price: choc.price, image: choc.image })}
                      className="px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-300"
                      style={{
                        background: choc.featured ? `linear-gradient(135deg,${GOLD},${GOLDL})` : 'rgba(212,163,115,0.1)',
                        color: choc.featured ? 'var(--choc-deep)' : GOLDL,
                        border: choc.featured ? 'none' : `1px solid rgba(212,163,115,0.25)`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg,${GOLD},${GOLDL})`; e.currentTarget.style.color = 'var(--choc-deep)'; }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = choc.featured ? `linear-gradient(135deg,${GOLD},${GOLDL})` : 'rgba(212,163,115,0.1)';
                        e.currentTarget.style.color = choc.featured ? 'var(--choc-deep)' : GOLDL;
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => navigate('/best-chocolate')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-bold bg-transparent border-none cursor-pointer transition-all duration-300"
            style={{ color: GOLD, border: `1.5px solid rgba(212,163,115,0.4)` }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.08)'; e.currentTarget.style.borderColor = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.4)'; }}
          >
            See All 6 Best Chocolates <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
