import { motion } from 'framer-motion';

const GOLD = '#d4a373';

const features = [
  "Forbes",
  "The Guardian",
  "Vogue Living",
  "Condé Nast Traveller",
  "Le Figaro",
  "Saveur Magazine",
  "The Telegraph",
  "Financial Times",
];

export const FeaturedInStrip = () => {
  return (
    <div
      className="py-10 md:py-16 px-4 md:px-0 relative overflow-hidden"
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid rgba(212,163,115,0.12)',
        borderBottom: '1px solid rgba(212,163,115,0.12)',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.3),transparent)' }} />

      <div className="flex justify-center w-full mb-8">
        <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.42em] text-center"
          style={{ color: 'rgba(212,163,115,0.55)' }}>
          <span className="block w-8 h-px" style={{ background: 'rgba(212,163,115,0.4)' }} />
          As Seen In
          <span className="block w-8 h-px" style={{ background: 'rgba(212,163,115,0.4)' }} />
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5 px-8 max-w-6xl mx-auto"
      >
        {features.map((name, i) => (
          <span key={name}
            className="font-display text-lg md:text-xl italic transition-all duration-300 cursor-default select-none"
            style={{ color: 'rgba(212,163,115,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,163,115,0.35)'; }}
          >
            {name}
            {i < features.length - 1 && (
              <span className="hidden md:inline ml-10 text-[8px] align-middle"
                style={{ color: 'rgba(212,163,115,0.2)' }}>◆</span>
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
