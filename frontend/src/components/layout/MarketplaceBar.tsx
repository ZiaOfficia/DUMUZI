import { motion } from 'framer-motion';

const GOLD = '#d4a55a';

export const MarketplaceBar = () => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="w-full relative"
    style={{
      background: 'linear-gradient(180deg, #0d0805 0%, #100a06 100%)',
      borderBottom: '1px solid rgba(212,165,90,0.14)',
    }}
  >
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-center gap-4 flex-wrap">
      <p className="text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}>
        Also Available On
      </p>
      <div className="flex items-center gap-3">
        <a
          href="https://amzn.in/d/0ihpOhSG"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Amazon"
          className="flex items-center justify-center rounded-xl px-4 py-2 overflow-hidden transition-transform duration-300 hover:scale-105"
          style={{ background: 'rgba(255,255,255,0.92)' }}
        >
          <img src="/images/pnglogos/AMAZONLOGO.png" alt="Amazon" style={{ height: '36px', width: 'auto' }} />
        </a>
        <a
          href="https://www.meesho.com/LITTLEFUNFOODSBEVERAGESPRIVATELIMITED?ms=2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Meesho"
          className="flex items-center justify-center rounded-xl px-2 py-1.5 overflow-hidden transition-transform duration-300 hover:scale-105"
          style={{ background: 'rgba(255,255,255,0.92)' }}
        >
          <img src="/images/pnglogos/MEESHO.png" alt="Meesho" style={{ height: '46px', width: 'auto' }} />
        </a>
      </div>
    </div>
  </motion.div>
);
