import { motion, type Transition } from 'framer-motion';
import { Gem, Leaf, Award, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChocolateDecor } from '../common/ChocolateDecor';

const ease = [0.25, 0.1, 0.25, 1] as const;
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.88, delay, ease } as Transition,
});

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';

export const HeroSlider = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-[94vh] flex items-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 70% at 65% 35%, rgba(42,20,8,0.95) 0%, rgba(13,8,5,1) 65%),
          radial-gradient(ellipse 50% 60% at 0% 100%, rgba(61,31,12,0.5) 0%, transparent 60%)
        `,
      }}
    >
      {/* Layered ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: GOLD, opacity: 0.14, animation: 'ambientPulse 8s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'var(--choc-warm)', opacity: 0.22 }} />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: GOLDL, opacity: 0.06 }} />

      {/* Chocolate ball decorations */}
      <ChocolateDecor variant="hero" />

      {/* Floating gold particles */}
      {[
        { top: '14%', left:  '7%',  size: 5,  delay: 0,   dur: 4.5 },
        { top: '72%', left: '40%',  size: 7,  delay: 1.4, dur: 5.2 },
        { top: '22%', right:'10%',  size: 4,  delay: 0.6, dur: 3.8 },
        { top: '62%', left: '13%',  size: 6,  delay: 2.0, dur: 5.8 },
        { top: '82%', right:'18%',  size: 5,  delay: 1.0, dur: 4.2 },
        { top: '40%', right: '3%',  size: 3,  delay: 3.0, dur: 6.0 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size, height: p.size,
            top: p.top,
            left: (p as any).left,
            right: (p as any).right,
            background: GOLD,
            boxShadow: `0 0 ${p.size * 2}px ${GOLD}`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full pt-10 pb-16 sm:pt-16 sm:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">

            {/* Pre-headline badge */}
            <motion.div {...fadeUp(0.08)} className="flex items-center gap-3 mb-7">
              <div
                className="flex items-center gap-2.5 px-4 py-1.5 rounded-full"
                style={{
                  background: 'rgba(212,165,90,0.09)',
                  border: '1px solid rgba(212,165,90,0.22)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD, boxShadow: `0 0 6px ${GOLD}` }} />
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase font-semibold text-gold-gradient">
                  Legacy Since 2013
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.18)}
              className="leading-[1.08] mb-6 font-luxury"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', color: 'var(--cream)', fontWeight: 600, letterSpacing: '-0.01em' }}
            >
              Made with love,<br />
              <em
                className="text-luxury-gradient"
                style={{ fontStyle: 'italic', fontWeight: 500 }}
              >
                crafted
              </em>
              {' '}for you
            </motion.h1>

            {/* Sub copy */}
            <motion.p
              {...fadeUp(0.30)}
              className="text-base lg:text-lg leading-relaxed mb-9 max-w-[480px] font-sans"
              style={{ color: 'rgba(220,214,205,0.72)' }}
            >
              Indulge in the velvety richness of premium gift packs, handcrafted with carefully selected ingredients.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-3 mb-11">
              <button
                onClick={() => navigate('/collections')}
                className="btn-gold"
              >
                Shop Collection <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="btn-outline-gold"
              >
                Our Legacy
              </button>
            </motion.div>

            {/* Micro badges row */}
            <motion.div
              {...fadeUp(0.54)}
              className="grid grid-cols-3 gap-5 pt-6 max-w-[460px]"
              style={{ borderTop: '1px solid rgba(212,165,90,0.12)' }}
            >
              {[
                { icon: Gem,   label: 'Single-Origin Cocoa' },
                { icon: Leaf,  label: 'Artisan Finished' },
                { icon: Award, label: 'Gourmet Gold' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-1.5 group/badge">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(212,165,90,0.08)',
                      border: '1px solid rgba(212,165,90,0.18)',
                    }}
                  >
                    <Icon size={14} style={{ color: GOLD }} />
                  </div>
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold leading-tight" style={{ color: 'var(--muted)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Floating Visual ── */}
          <div className="lg:col-span-6 flex items-center justify-center relative mt-4 lg:mt-0 pb-8 lg:pb-0">

            {/* Glow halo behind image */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[110px] pointer-events-none"
              style={{ background: GOLD, opacity: 0.2 }}
            />

            {/* Decorative ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none animate-spin-slow"
              style={{ border: '1px dashed rgba(212,165,90,0.1)' }}
            />

            {/* Main hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[390px] rounded-[28px] lg:rounded-[36px] overflow-hidden animate-floatR"
              style={{
                aspectRatio: '4/5',
                border: '1px solid rgba(212,165,90,0.2)',
                boxShadow: '0 50px 130px rgba(0,0,0,0.85), 0 20px 50px rgba(212,165,90,0.1)',
                background: 'var(--choc-mid)',
              }}
            >
              <img
                src="/images/products/DUMUZI.jpeg"
                alt="DUMUZI Luxury Chocolates"
                className="w-full h-full object-cover image-zoom-slow"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(13,8,5,0.75) 0%, rgba(13,8,5,0.1) 55%, transparent 100%)',
                }}
              />
              {/* Signature badge top-right */}
              <span
                className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full text-[9px] tracking-[0.22em] uppercase font-semibold backdrop-blur-md"
                style={{
                  background: 'rgba(13,8,5,0.72)',
                  border: '1px solid rgba(212,165,90,0.28)',
                  color: 'rgba(232,192,122,0.9)',
                }}
              >
                Signature Collection
              </span>
              {/* Bottom name overlay */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-luxury text-lg font-semibold leading-tight" style={{ color: 'var(--cream)', letterSpacing: '0.04em' }}>
                  DUMUZI Gold
                </p>
                <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(232,192,122,0.6)' }}>
                  Handcrafted · Limited Edition
                </p>
              </div>

              {/* Corner frame accents */}
              {[
                'top-3 left-3 border-t border-l',
                'top-3 right-3 border-t border-r',
                'bottom-3 left-3 border-b border-l',
                'bottom-3 right-3 border-b border-r',
              ].map((cls, i) => (
                <div key={i} className={`absolute ${cls} w-6 h-6`}
                  style={{ borderColor: 'rgba(212,165,90,0.32)' }} />
              ))}
            </motion.div>

            {/* Floating product card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="hidden sm:flex absolute -bottom-2 -left-4 md:-bottom-4 md:-left-6 items-center gap-3 p-3 sm:p-4 rounded-2xl animate-float"
              style={{
                background: 'rgba(18,12,8,0.96)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,165,90,0.24)',
                boxShadow: '0 18px 50px rgba(0,0,0,0.7), 0 0 30px rgba(212,165,90,0.08)',
                maxWidth: 260,
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src="/images/products/LF- BN9.jpeg"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-contain p-0.5"
                  style={{ background: 'rgba(13,8,5,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
                  alt="Bonbon 9"
                />
                {/* Live dot */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ background: GOLD, boxShadow: `0 0 6px ${GOLD}` }} />
              </div>
              <div>
                <p className="text-[10.5px] uppercase font-bold tracking-wider mb-0.5" style={{ color: 'var(--cream)' }}>
                  Bonbon · 9 Pcs
                </p>
                <p className="text-[9.5px] mb-1.5" style={{ color: 'rgba(220,214,205,0.55)' }}>
                  Gold-foil wrapped truffles
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={9} fill={GOLD} style={{ color: GOLD }} />
                  ))}
                  <span className="text-[9px] ml-1" style={{ color: 'rgba(220,214,205,0.45)' }}>(189)</span>
                </div>
              </div>
            </motion.div>

            {/* Floating stat — top right */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="hidden lg:flex absolute -top-4 -right-4 items-center gap-2 px-4 py-2.5 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                boxShadow: '0 8px 28px rgba(212,165,90,0.45)',
              }}
            >
              <Award size={14} style={{ color: '#0d0805' }} />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#0d0805' }}>Award Winning</p>
                <p className="text-[8px]" style={{ color: 'rgba(13,8,5,0.7)' }}>Chocolatier 2024</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--choc-deep), transparent)' }} />
    </section>
  );
};
