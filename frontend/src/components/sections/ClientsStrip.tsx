import { motion } from 'framer-motion';

const GOLD = '#d4a373';

const partners = [
  { name: "Forbes", initials: "FBS" },
  { name: "The Guardian", initials: "TG" },
  { name: "Vogue Living", initials: "VL" },
  { name: "Condé Nast", initials: "CN" },
  { name: "Saveur Mag", initials: "SV" },
  { name: "Harrods", initials: "HD" },
];

export const ClientsStrip = () => {
  return (
    <section
      className="py-10 md:py-16 px-4 md:px-0 relative overflow-hidden"
      style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(212,163,115,0.12)', borderBottom: '1px solid rgba(212,163,115,0.12)' }}
    >
      {/* Ambient diamonds */}
      <span className="absolute top-6 left-1/4 text-2xl pointer-events-none select-none" style={{ color: 'rgba(212,163,115,0.2)' }}>✦</span>
      <span className="absolute bottom-6 right-1/4 text-2xl pointer-events-none select-none" style={{ color: 'rgba(212,163,115,0.2)' }}>✦</span>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[0.4em] mb-3 font-bold"
          style={{ color: GOLD }}
        >
          <span className="block w-8 h-px" style={{ background: GOLD }} />
          As Featured In
          <span className="block w-8 h-px" style={{ background: GOLD }} />
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display text-xl md:text-2xl mb-10"
          style={{ color: 'var(--cream)' }}
        >
          Trusted by the world's most discerning palates
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-4"
        >
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center justify-center px-3 py-6 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(212,163,115,0.05)',
                border: '1px solid rgba(212,163,115,0.14)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = 'rgba(212,163,115,0.12)';
                el.style.borderColor = 'rgba(212,163,115,0.4)';
                el.style.boxShadow = '0 8px 25px rgba(212,163,115,0.15)';
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = 'rgba(212,163,115,0.05)';
                el.style.borderColor = 'rgba(212,163,115,0.14)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              <span className="font-display text-2xl font-bold mb-1 transition-colors duration-300"
                style={{ color: GOLD }}>{p.initials}</span>
              <span className="text-[10px] uppercase tracking-widest transition-colors duration-300"
                style={{ color: 'rgba(212,163,115,0.5)' }}>{p.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
