import { motion, type Transition } from 'framer-motion';
import { Gift } from 'lucide-react';
import { ChocolateDecor } from '../common/ChocolateDecor';

const ease = [0.25, 0.1, 0.25, 1] as const;
const occasions = ['Birthday', 'Anniversary', 'Corporate Gift', 'Holiday Season', 'Wedding favors'];

export const DonateCTA = () => (
  <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(145deg, var(--choc-dark) 0%, var(--choc-deep) 100%)', position: 'relative', overflow: 'hidden' }}>
    <ChocolateDecor variant="section" />
    {/* Soft backdrop radial light */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 70% at 75% 50%, rgba(212,163,115,0.08) 0%, transparent 70%)' }} />
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* LEFT: Text & Occasions */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.9, ease } as Transition} 
          className="lg:col-span-6 flex flex-col justify-center text-left"
        >
          <div className="section-label mb-5">Artisanal Gifting</div>

          <h2 className="font-luxury font-semibold leading-[1.08] mb-7" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}>
            Gift Luxury,<br />
            <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Share Delight</em>
          </h2>
          
          <p className="text-base leading-relaxed mb-9 max-w-[480px] font-sans" style={{ color: 'var(--muted)' }}>
            Every celebration deserves an exquisite touch. Choose from our hand-selected assortment of premium truffles, packaged in handcrafted boxes and finished with silk ribbons. Make their special day unforgettable.
          </p>
          
          {/* Occasion tag pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {occasions.map((tag) => (
              <span 
                key={tag} 
                className="text-[10px] uppercase tracking-wider px-4 py-2 rounded-full font-bold transition-all duration-300 cursor-default border"
                style={{ 
                  background: 'rgba(212, 163, 115, 0.06)', 
                  borderColor: 'rgba(212, 163, 115, 0.2)', 
                  color: 'var(--gold-light)' 
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.background = 'rgba(212, 163, 115, 0.16)'; 
                  e.currentTarget.style.borderColor = 'var(--gold)'; 
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 163, 115, 0.2)';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.background = 'rgba(212, 163, 115, 0.06)'; 
                  e.currentTarget.style.borderColor = 'rgba(212, 163, 115, 0.2)'; 
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <button 
            className="self-start px-9 py-4 rounded-full text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 gold-glow-hover border-none cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', 
              color: 'var(--choc-deep)', 
              boxShadow: '0 10px 30px rgba(212,163,115,0.35)' 
            }}
          >
            Explore Gifting Collections
          </button>
        </motion.div>

        {/* RIGHT: Emotional Visual Card & Price Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.9, ease, delay: 0.15 } as Transition} 
          className="lg:col-span-6 relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-[480px] mx-auto">
            <div className="absolute -inset-8 rounded-[60px] pointer-events-none opacity-30 blur-2xl" style={{ background: 'radial-gradient(circle at center, var(--gold) 0%, transparent 70%)' }} />
            
            <div 
              className="relative rounded-[28px] overflow-hidden group"
              style={{ 
                aspectRatio: '4/3.2', 
                background: 'var(--choc-deep)', 
                border: '1.5px solid rgba(212, 163, 115, 0.28)', 
                boxShadow: '0 45px 120px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              }}
            >
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src="/images/products/LF-H18D.jpeg"
                  alt="DUMUZI Heart 18 Duo Gift Box"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
              </div>

              {/* Complimentary Ribbon Tag */}
              <div className="absolute bottom-6 left-6 right-6 px-5 py-4 rounded-2xl flex items-center justify-between" style={{ background: 'rgba(15, 10, 7, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212, 163, 115, 0.22)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gold-gradient">
                    <Gift size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white" style={{ color: 'var(--cream)' }}>Complimentary Gift Wrap</p>
                    <p className="text-[9px] tracking-wide" style={{ color: 'var(--muted)' }}>Wrapped in satin ribbon with custom cards</p>
                  </div>
                </div>
              </div>

              {/* Corner borders */}
              {['top-4 left-4 border-t border-l','top-4 right-4 border-t border-r','bottom-4 left-4 border-b border-l','bottom-4 right-4 border-b border-r'].map((cls,i)=>(
                <div key={i} className={`absolute ${cls} w-8 h-8`} style={{ borderColor: 'rgba(212, 163, 115, 0.28)' }} />
              ))}
            </div>

            {/* Glowing Price Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:block absolute -top-5 -right-4 px-5 py-3 rounded-2xl text-center"
              style={{ 
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', 
                boxShadow: '0 8px 32px rgba(212, 163, 115, 0.45)' 
              }}
            >
              <p className="text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: 'var(--choc-deep)' }}>Boxes From</p>
              <p className="font-display text-xl font-bold" style={{ color: 'var(--choc-deep)' }}>₹45</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);
