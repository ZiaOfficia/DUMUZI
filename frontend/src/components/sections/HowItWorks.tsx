import { motion, type Transition } from 'framer-motion';
import { Search, Sparkles, Award, Gift } from 'lucide-react';
import { ChocolateDecor } from '../common/ChocolateDecor';

const steps = [
  { icon: Search,   step:'01', title:'Source',  desc:'We hand-select the finest single-origin cocoa beans from premium estates around the equator.', img: '/images/products/LF-D6.jpeg' },
  { icon: Sparkles, step:'02', title:'Craft',   desc:'Our master chocolatiers slowly roast, hand-temper, and sculpt each piece with precision.',      img: '/images/products/LF- BN9.jpeg' },
  { icon: Award,    step:'03', title:'Taste',   desc:'Each chocolate goes through sensory trials and quality checks to guarantee perfection.',          img: '/images/products/LF-BN9T.jpeg' },
  { icon: Gift,     step:'04', title:'Delight', desc:'Elegantly custom wrapped in our signature boxes and delivered in temperature-controlled care.',    img: '/images/products/LF-H18D.jpeg' },
];

const ease = [0.25, 0.1, 0.25, 1] as const;
const GOLD = '#d4a373';

export const HowItWorks = () => (
  <section className="py-16 lg:py-24 relative" style={{ background: 'linear-gradient(180deg, var(--choc-deep) 0%, var(--choc-dark) 100%)' }}>
    <ChocolateDecor variant="section" />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
          <span className="text-[10px] tracking-[0.32em] uppercase font-bold text-gold-gradient font-sans">Our Process</span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        </div>
        <h2 className="font-display mb-4 font-bold" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--cream)' }}>From Bean to Box</h2>
        <p className="text-sm max-w-md mx-auto font-sans" style={{ color: 'var(--muted)' }}>Every DUMUZI chocolate is born through a slow, carefully tempered culinary journey.</p>
      </motion.div>

      {/* Step Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">

        {/* Desktop timeline line */}
        <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-0.5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,163,115,0.3) 20%, rgba(212,163,115,0.3) 80%, transparent)' }} />

        {steps.map(({ icon: Icon, step, title, desc, img }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.12, ease } as Transition}
            className="group flex flex-col rounded-3xl overflow-hidden glass-card glass-card-hover cursor-default"
          >
            {/* Product image at top */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.02)' }}>
              <img
                src={img}
                alt={title}
                className="w-full h-full object-contain p-4 transition-transform duration-600 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              {/* Step badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: `linear-gradient(135deg,${GOLD},#e5c199)`, color: 'var(--choc-deep)', boxShadow: '0 4px 12px rgba(212,163,115,0.4)' }}>
                {step}
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col items-center text-center p-5 gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{ background: 'rgba(212,163,115,0.08)', border: '1.5px solid rgba(212,163,115,0.22)', boxShadow: '0 0 20px rgba(212,163,115,0.1)' }}>
                <Icon size={20} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="font-display text-base font-semibold" style={{ color: 'var(--cream)' }}>{title}</h3>
              <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>{desc}</p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  </section>
);
