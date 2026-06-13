import { motion, type Transition } from 'framer-motion';
import { Gem, Heart, Award, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChocolateDecor } from '../common/ChocolateDecor';

const ease = [0.25, 0.1, 0.25, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease } as Transition,
});

export const HeroSlider = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(circle at 60% 40%, var(--choc-dark) 0%, var(--choc-deep) 100%)' }}
    >
      {/* Rich chocolate-gold ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20" style={{ background: 'var(--gold)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-15" style={{ background: 'var(--choc-warm)' }} />

      {/* Chocolate ball decorations */}
      <ChocolateDecor variant="hero" />

      {/* Floating particles */}
      {[
        { top: '15%', left: '8%', size: 6, delay: 0 },
        { top: '75%', left: '42%', size: 8, delay: 1.5 },
        { top: '25%', right: '12%', size: 5, delay: 0.7 },
        { top: '65%', left: '15%', size: 7, delay: 2.2 },
        { top: '80%', right: '20%', size: 6, delay: 1.1 }
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none opacity-30"
          style={{ width: p.size, height: p.size, top: p.top, left: (p as any).left, right: (p as any).right, background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }}
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full pt-10 pb-16 sm:pt-16 sm:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT: Text & Branding */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
              <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-gold-gradient font-sans">
                Experience Luxury Artisanship
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="font-display leading-[1.1] mb-6 font-bold text-cream"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4.4rem)' }}
            >
              Made with love,<br />
              <span className="text-gold-gradient font-display italic">crafted</span> for you
            </motion.h1>

            <motion.p 
              {...fadeUp(0.32)} 
              className="text-base lg:text-lg leading-relaxed mb-9 max-w-[480px] font-sans text-muted" 
            >
              Indulge in the velvety richness of masterfully tempered dark chocolate, sculpted by hand with premium ingredients.
            </motion.p>

            <motion.div {...fadeUp(0.44)} className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => navigate("/collections")}
                className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 gold-glow-hover border-none cursor-pointer"
                style={{ 
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', 
                  color: 'var(--choc-deep)', 
                  boxShadow: '0 10px 30px rgba(212,163,115,0.35)' 
                }}
              >
                Shop Collection
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 bg-transparent cursor-pointer"
                style={{ 
                  color: 'var(--cream)', 
                  border: '1.5px solid rgba(212,163,115,0.4)', 
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.08)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.4)'; }}
              >
                Our Legacy
              </button>
            </motion.div>

            {/* Micro Badges */}
            <motion.div {...fadeUp(0.56)} className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-[480px]">
              {[
                { icon: Gem, label: 'Single-Origin Cocoa' },
                { icon: Heart, label: 'Artisan Finished' },
                { icon: Award, label: 'Gourmet Gold' }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-1.5">
                  <Icon size={16} style={{ color: 'var(--gold)' }} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--muted)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Floating Chocolate Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0 pb-8 lg:pb-0">
            {/* Glowing background behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-25" style={{ background: 'var(--gold)' }} />

            {/* Image Container with Floating motion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] aspect-[4/5] rounded-[24px] lg:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl glass-card animate-floatR"
            >
              <img
                src="/images/products/DUMUZI.jpeg"
                alt="DUMUZI Luxury Chocolates"
                className="w-full h-full object-cover image-zoom-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-choc-dark/70 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-cream border border-white/10 backdrop-blur-md"
                style={{ background: 'rgba(15,10,7,0.6)' }}>
                Signature Collection
              </span>
            </motion.div>

            {/* Floating Product Card — hidden on small phones */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden sm:flex absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-choc-dark/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-2xl items-center gap-3 max-w-[240px] sm:max-w-[280px] animate-float"
              style={{ border: '1px solid rgba(212,163,115,0.25)' }}
            >
              <img
                src="/images/products/LF- BN9.jpeg"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain bg-choc-deep/60 border border-white/10 flex-shrink-0 p-0.5"
                alt="DUMUZI Bonbon 9"
              />
              <div>
                <h4 className="text-[11px] uppercase font-bold text-cream tracking-wider">Bonbon · 9 Pcs</h4>
                <p className="text-[10px] text-muted mb-1">Gold-foil wrapped truffles</p>
                <div className="flex items-center gap-1">
                  <Star size={10} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                  <Star size={10} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                  <Star size={10} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                  <Star size={10} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                  <Star size={10} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                  <span className="text-[10px] text-muted ml-1">(189)</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
