import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Gem, Headphones } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    desc: '100% encrypted transactions',
    accent: '#d4a55a',
  },
  {
    icon: Truck,
    title: 'Swift Delivery',
    desc: 'Dispatched within 2–4 days',
    accent: '#e8c07a',
  },
  {
    icon: Gem,
    title: 'Premium Quality',
    desc: 'Finest single-origin cocoa',
    accent: '#d4a55a',
  },
  {
    icon: Headphones,
    title: '24 / 7 Support',
    desc: 'Our team is always here',
    accent: '#e8c07a',
  },
];

export const StatsSection = () => (
  <section
    className="relative"
    style={{
      background: 'linear-gradient(90deg, var(--choc-bark) 0%, var(--choc-dark) 50%, var(--choc-bark) 100%)',
      borderTop:    '1px solid rgba(212,165,90,0.14)',
      borderBottom: '1px solid rgba(212,165,90,0.14)',
      padding: '40px 0',
    }}
  >
    {/* Subtle inner glow */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(212,165,90,0.04) 0%, transparent 70%)' }} />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {features.map(({ icon: Icon, title, desc, accent }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 cursor-default relative"
          >
            {/* Vertical separator (not on first) */}
            {i > 0 && (
              <div
                className="absolute left-0 top-1/4 bottom-1/4 w-px hidden lg:block"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(212,165,90,0.18), transparent)' }}
              />
            )}

            {/* Icon */}
            <div
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-350"
              style={{
                background: `linear-gradient(135deg, rgba(212,165,90,0.1) 0%, rgba(212,165,90,0.05) 100%)`,
                border: '1px solid rgba(212,165,90,0.2)',
              }}
            >
              <Icon size={18} style={{ color: accent, transition: 'all 0.3s' }} />
            </div>

            <div>
              <p
                className="text-[12px] sm:text-[13px] tracking-[0.06em] uppercase font-bold mb-0.5 transition-colors duration-300"
                style={{ color: 'var(--cream)' }}
              >
                {title}
              </p>
              <p className="text-[11px] font-sans" style={{ color: 'var(--muted-dark)' }}>
                {desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
