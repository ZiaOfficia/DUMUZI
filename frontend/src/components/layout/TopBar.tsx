import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const messages = [
  'FREE DELIVERY on orders above ₹500',
  'Handcrafted with Finest Single-Origin Cocoa',
  'New Collection — DUMUZI Gold Series Available Now',
  'Artisan Chocolatier · Est. 2009',
  '100% Organic · Ethically Sourced',
  'Luxury Gift Wrapping Included',
];

const Gem = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0 }}>
    <path d="M4 0L5.2 3H8L5.6 4.8L6.5 8L4 6L1.5 8L2.4 4.8L0 3H2.8L4 0Z" fill="#d4a55a" />
  </svg>
);

export const TopBar = () => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full relative overflow-hidden"
    style={{
      background: 'linear-gradient(90deg, #0c0805 0%, #1c1008 20%, #251408 50%, #1c1008 80%, #0c0805 100%)',
      borderBottom: '1px solid rgba(212,165,90,0.2)',
      minHeight: 38,
    }}
  >
    {/* Left/right fade masks */}
    <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(90deg, #0c0805 0%, transparent 100%)' }} />
    <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(-90deg, #0c0805 0%, transparent 100%)' }} />

    {/* Subtle centre glow */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 40% 100% at 50% 50%, rgba(212,165,90,0.06) 0%, transparent 70%)' }} />

    <div style={{ padding: '0' }}>
      <Marquee
        speed={38}
        gradient={false}
        pauseOnHover
        style={{ padding: '9px 0' }}
      >
        {messages.map((msg, i) => (
          <span
            key={i}
            className="flex items-center gap-3"
            style={{
              color: '#e8c07a',
              fontSize: '10px',
              letterSpacing: '0.22em',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontFamily: 'Inter, DM Sans, sans-serif',
              whiteSpace: 'nowrap',
              marginRight: '52px',
            }}
          >
            <Gem />
            {msg}
          </span>
        ))}
      </Marquee>
    </div>
  </motion.div>
);
