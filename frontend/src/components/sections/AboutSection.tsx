import { motion, type Transition } from 'framer-motion';
import { Award, Leaf, Users } from 'lucide-react';
import { ChocolateDecor } from '../common/ChocolateDecor';

const ease = [0.25, 0.1, 0.25, 1] as const;

export const AboutSection = () => {
  return (
    <section className="py-16 lg:py-24 relative" style={{ background: 'linear-gradient(180deg, var(--choc-dark) 0%, var(--choc-deep) 100%)', overflow: 'hidden' }}>
      <ChocolateDecor variant="section" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Immersive Split Visual (Image + Layered Stats Card) */}
          <div className="lg:col-span-6 relative mb-6 lg:mb-0">
            {/* Soft decorative glow behind the visual card */}
            <div className="absolute -inset-4 rounded-[40px] pointer-events-none opacity-20 blur-xl" style={{ background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)' }} />
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.9, ease } as Transition}
              className="relative w-full rounded-[32px] overflow-hidden group"
              style={{ 
                aspectRatio: '4/4.5', 
                background: 'var(--choc-deep)', 
                border: '1.5px solid rgba(212, 163, 115, 0.22)', 
                boxShadow: '0 40px 90px rgba(0, 0, 0, 0.8)' 
              }}
            >
              <img
                src="/images/products/LF-D25T.jpeg"
                alt="DUMUZI Display Tray — 25 Handcrafted Chocolates"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <span className="font-display text-4xl mb-3 text-gold-gradient">✦</span>
                <p className="font-display text-xl italic mb-1" style={{ color: 'var(--cream)', fontWeight: 500, lineHeight: 1.4 }}>"Pure Cocoa. Pure Passion."</p>
                <p className="text-[10px] uppercase tracking-widest font-semibold mt-1" style={{ color: 'var(--gold-light)' }}>Handcrafted Heritage</p>
              </div>

              {/* Classic corner borders */}
              {['top-4 left-4 border-t border-l','top-4 right-4 border-t border-r','bottom-4 left-4 border-b border-l','bottom-4 right-4 border-b border-r'].map((cls,i)=>(
                <div key={i} className={`absolute ${cls} w-8 h-8`} style={{ borderColor: 'rgba(212, 163, 115, 0.3)' }} />
              ))}
            </motion.div>

            {/* Layered Floating Stats Card for Depth — hidden on small screens to prevent overflow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease } as Transition}
              className="hidden sm:flex absolute -bottom-6 -right-2 lg:-right-6 px-5 py-4 lg:px-6 lg:py-5 rounded-2xl glass-card flex-col gap-3 lg:gap-4 max-w-[200px] lg:max-w-[240px]"
              style={{ border: '1px solid rgba(212, 163, 115, 0.3)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212, 163, 115, 0.15)' }}>
                  <Award size={16} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <p className="font-display text-lg font-bold" style={{ color: 'var(--cream)' }}>15+ Years</p>
                  <p className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Craft Legacy</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212, 163, 115, 0.15)' }}>
                  <Leaf size={16} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <p className="font-display text-lg font-bold" style={{ color: 'var(--cream)' }}>100%</p>
                  <p className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Organic Cocoa</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212, 163, 115, 0.15)' }}>
                  <Users size={16} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <p className="font-display text-lg font-bold" style={{ color: 'var(--cream)' }}>500+</p>
                  <p className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Connoisseurs</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Story Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, ease } as Transition}
            >
              <div className="section-label mb-5">Our Story</div>
              
              <h2 className="font-luxury font-semibold leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}>
                A Passion for<br />
                <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Perfection</em>
              </h2>
              
              <p className="text-base leading-relaxed mb-6 font-sans" style={{ color: 'var(--muted)' }}>
                At DUMUZI, we believe that true luxury lies in the details. Each chocolate is handcrafted by our expert chocolatiers using the finest single-origin organic cocoa beans sourced sustainably from around the globe.
              </p>
              
              <p className="text-sm leading-relaxed mb-10 font-sans" style={{ color: 'rgba(249, 246, 240, 0.75)' }}>
                From our velvety dark truffles to our signature gold collections, every piece is a masterwork of passion and precision — crafted to delight all the senses.
              </p>
              
              <button 
                className="px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 bg-transparent cursor-pointer"
                style={{ 
                  color: 'var(--gold)', 
                  border: '1.5px solid rgba(212, 163, 115, 0.45)', 
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.08)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.45)'; }}
              >
                Learn More
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
