import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Gem, Headphones } from 'lucide-react';

const GOLD='#d4a373';

const features = [
  { icon:ShieldCheck, title:'Secure Payment',   desc:'100% encrypted transactions' },
  { icon:Truck,       title:'Fast Delivery',     desc:'Delivered within 2–4 days' },
  { icon:Gem,         title:'Premium Quality',   desc:'Finest cocoa, every time' },
  { icon:Headphones,  title:'24/7 Support',      desc:'Always here to help you' },
];

export const StatsSection = () => (
  <section style={{ background: 'var(--choc-dark)', borderTop: '1px solid rgba(212,163,115,0.15)', borderBottom: '1px solid rgba(212,163,115,0.15)', padding: '48px 0' }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div key={title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex items-center gap-5 cursor-default"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: 'rgba(212,163,115,0.08)', border: '1px solid rgba(212,163,115,0.2)' }}>
              <Icon size={20} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <p className="text-sm tracking-[0.08em] uppercase font-bold mb-0.5" style={{ color: 'var(--cream)' }}>{title}</p>
              <p className="text-xs font-sans" style={{ color: 'var(--muted)' }}>{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
