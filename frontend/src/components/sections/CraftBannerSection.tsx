import { motion, type Transition } from 'framer-motion';
import { ArrowRight, MapPin, Leaf, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LuxuryDecor } from '../common/LuxuryDecor';

const ease = [0.25, 0.1, 0.25, 1] as const;
const GOLD = '#d4a373';
const GOLDL = '#e5c199';

const origins = [
  { name: 'Madagascar', flag: '🇲🇬', notes: 'Red fruit · Citrus · Vibrant', color: '#d4a373' },
  { name: 'Ecuador', flag: '🇪🇨', notes: 'Jasmine · Orange blossom · Earthy', color: '#c9a96e' },
  { name: 'Peru', flag: '🇵🇪', notes: 'Smoky · Mineral · Highland depth', color: '#b89660' },
];

export const CraftBannerSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, var(--bg-dark) 0%, var(--bg-warm) 50%, var(--bg-dark) 100%)' }}>
      <LuxuryDecor variant="section" />
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-15"
        style={{ background: GOLD }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ background: GOLDL }} />

      {/* Top & bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.4),transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.4),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease } as Transition}
            className="lg:col-span-6"
          >
            <div className="section-label mb-5">Ethical Sourcing</div>

            <h2 className="font-luxury font-semibold leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.2rem,4.2vw,3.6rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}>
              From the World's<br />
              <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Best Sourcing Estates</em>
            </h2>

            <p className="text-base leading-relaxed mb-8 max-w-[480px] font-sans" style={{ color: 'var(--muted)' }}>
              We work directly with farming cooperatives across three continents, paying above fair-trade prices and reinvesting in their drying and fermentation infrastructure. Better processing means better flavour.
            </p>

            {/* Origin Cards */}
            <div className="flex flex-col gap-3 mb-10">
              {origins.map(({ name, flag, notes, color }) => (
                <div key={name}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(15,10,7,0.5)', border: `1px solid ${color}28`, backdropFilter: 'blur(12px)' }}>
                  <span className="text-2xl">{flag}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <MapPin size={11} style={{ color }} />
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color }}>{name}</span>
                    </div>
                    <span className="text-[10px] font-sans" style={{ color: 'rgba(220,214,205,0.5)' }}>{notes}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/about')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-bold border-none cursor-pointer transition-all duration-300"
                style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--bg-deep)', boxShadow: '0 10px 30px rgba(212,163,115,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 18px 45px rgba(212,163,115,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,163,115,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Our Story <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/collections')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-bold bg-transparent border-none cursor-pointer transition-all duration-300"
                style={{ color: 'var(--cream)', border: '1.5px solid rgba(212,163,115,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.08)'; e.currentTarget.style.borderColor = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.35)'; }}
              >
                Shop Collections
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: 0.12 } as Transition}
            className="lg:col-span-6 relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-6 rounded-[50px] opacity-25 blur-2xl pointer-events-none"
              style={{ background: `radial-gradient(circle at center,${GOLD} 0%,transparent 70%)` }} />

            {/* Main image */}
            <div className="relative rounded-[36px] overflow-hidden group"
              style={{ aspectRatio: '4/4.5', background: 'var(--bg-mid)', border: `1.5px solid rgba(212,163,115,0.25)`, boxShadow: '0 50px 120px rgba(0,0,0,0.8)' }}>
              <img
                src="/images/products/LF-D15T.jpeg"
                alt="DUMUZI Display Tray — 15 Trios"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Quote overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <span className="font-display text-4xl mb-3 text-gold-gradient">✦</span>
                <p className="font-display text-lg italic mb-1" style={{ color: 'var(--cream)', fontWeight: 500, lineHeight: 1.4 }}>
                  "We pay above fair-trade so farmers invest in quality."
                </p>
                <p className="text-[10px] uppercase tracking-widest font-semibold mt-1" style={{ color: GOLDL }}>
                  Antoine Laurent, Founder
                </p>
              </div>

              {/* Corner borders */}
              {['top-4 left-4 border-t border-l','top-4 right-4 border-t border-r','bottom-4 left-4 border-b border-l','bottom-4 right-4 border-b border-r'].map((cls,i) => (
                <div key={i} className={`absolute ${cls} w-8 h-8`} style={{ borderColor: 'rgba(212,163,115,0.3)' }} />
              ))}
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease } as Transition}
              className="absolute -bottom-6 -left-6 px-5 py-4 rounded-2xl glass-card flex items-center gap-4"
              style={{ border: '1px solid rgba(212,163,115,0.3)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212,163,115,0.15)' }}>
                <Leaf size={18} style={{ color: GOLD }} />
              </div>
              <div>
                <p className="font-display text-lg font-bold" style={{ color: 'var(--cream)' }}>100%</p>
                <p className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Organic Ingredients</p>
              </div>
              <div className="w-px h-10 mx-1" style={{ background: 'rgba(212,163,115,0.2)' }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212,163,115,0.15)' }}>
                <Award size={18} style={{ color: GOLD }} />
              </div>
              <div>
                <p className="font-display text-lg font-bold" style={{ color: 'var(--cream)' }}>3</p>
                <p className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Award Origins</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
