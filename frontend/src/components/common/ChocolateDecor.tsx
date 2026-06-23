import { motion } from 'framer-motion';

interface Ball {
  top: string;
  left?: string;
  right?: string;
  size: number;
  opacity: number;
  float: number;
  dur: number;
  delay: number;
  fill: string;
  variant?: 'round' | 'truffle' | 'shard';
}

const PRESETS: Record<string, Ball[]> = {
  hero: [
    { top: '8%',  left:  '3%',   size: 30, opacity: 0.20, float: 14, dur: 5.5, delay: 0,   fill: '#6b3f1f', variant: 'round'   },
    { top: '22%', right: '5%',   size: 18, opacity: 0.16, float: 8,  dur: 4.8, delay: 1.2, fill: '#8b5a2b', variant: 'truffle' },
    { top: '68%', left:  '6%',   size: 24, opacity: 0.18, float: 10, dur: 6,   delay: 0.5, fill: '#5c3317', variant: 'round'   },
    { top: '75%', right: '8%',   size: 34, opacity: 0.14, float: 16, dur: 7,   delay: 2,   fill: '#7a4928', variant: 'truffle' },
    { top: '42%', left:  '1%',   size: 14, opacity: 0.22, float: 6,  dur: 4.2, delay: 0.8, fill: '#9c6b3a', variant: 'round'   },
    { top: '55%', right: '3%',   size: 20, opacity: 0.16, float: 9,  dur: 5.2, delay: 1.6, fill: '#6b3f1f', variant: 'shard'   },
    { top: '88%', left: '18%',   size: 16, opacity: 0.14, float: 7,  dur: 5,   delay: 2.4, fill: '#8b5a2b', variant: 'round'   },
    { top: '12%', right:'22%',   size: 12, opacity: 0.20, float: 5,  dur: 4,   delay: 0.3, fill: '#5c3317', variant: 'truffle' },
    { top: '35%', right:'1%',    size: 10, opacity: 0.15, float: 4,  dur: 3.8, delay: 1.8, fill: '#a07040', variant: 'shard'   },
    { top: '50%', left: '10%',   size: 8,  opacity: 0.18, float: 5,  dur: 4.5, delay: 2.8, fill: '#c08050', variant: 'round'   },
  ],
  section: [
    { top: '10%', right: '2%',   size: 26, opacity: 0.13, float: 10, dur: 5.5, delay: 0,   fill: '#7a4928', variant: 'truffle' },
    { top: '60%', left:  '1%',   size: 18, opacity: 0.11, float: 8,  dur: 6,   delay: 1.4, fill: '#6b3f1f', variant: 'round'   },
    { top: '80%', right: '6%',   size: 14, opacity: 0.15, float: 6,  dur: 4.5, delay: 0.7, fill: '#9c6b3a', variant: 'shard'   },
    { top: '30%', left:  '3%',   size: 20, opacity: 0.10, float: 12, dur: 7,   delay: 2,   fill: '#5c3317', variant: 'round'   },
    { top: '50%', right: '1%',   size: 10, opacity: 0.12, float: 5,  dur: 4,   delay: 1.0, fill: '#8b5a2b', variant: 'truffle' },
  ],
};

/* Round chocolate ball */
const RoundBall = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 48 48" fill="none">
    <radialGradient id={`rg-${fill.slice(1)}`} cx="38%" cy="32%" r="68%">
      <stop offset="0%"   stopColor={fill} stopOpacity="1" />
      <stop offset="100%" stopColor="#1a0a04" stopOpacity="1" />
    </radialGradient>
    <circle cx="24" cy="24" r="22" fill={`url(#rg-${fill.slice(1)})`} />
    <path d="M 6 24 Q 14 18 24 24 Q 34 30 42 24" stroke="rgba(212,165,90,0.38)" strokeWidth="1" fill="none" />
    <path d="M 8 30 Q 18 24 28 30 Q 36 35 43 30" stroke="rgba(212,165,90,0.22)" strokeWidth="0.8" fill="none" />
    <ellipse cx="16" cy="13" rx="6" ry="3.5" fill="rgba(255,255,255,0.14)" />
    <ellipse cx="14" cy="12" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.22)" />
    <circle cx="24" cy="24" r="22" stroke="rgba(212,165,90,0.18)" strokeWidth="1" fill="none" />
  </svg>
);

/* Truffle — slightly irregular shape */
const TruffleBall = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 48 48" fill="none">
    <radialGradient id={`tg-${fill.slice(1)}`} cx="40%" cy="30%" r="70%">
      <stop offset="0%"   stopColor={fill} stopOpacity="1" />
      <stop offset="100%" stopColor="#0f0602" stopOpacity="1" />
    </radialGradient>
    <ellipse cx="24" cy="25" rx="21" ry="20" fill={`url(#tg-${fill.slice(1)})`} />
    {/* Cocoa dusting */}
    <ellipse cx="24" cy="14" rx="10" ry="5" fill="rgba(255,255,255,0.06)" />
    {/* Crack line */}
    <path d="M18 22 Q22 18 26 22 Q30 26 34 22" stroke="rgba(212,165,90,0.25)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <ellipse cx="17" cy="15" rx="5" ry="2.5" fill="rgba(255,255,255,0.18)" />
    <ellipse cx="15" cy="14" rx="2" ry="1.2" fill="rgba(255,255,255,0.26)" />
    <ellipse cx="24" cy="25" rx="21" ry="20" stroke="rgba(212,165,90,0.15)" strokeWidth="0.8" fill="none" />
  </svg>
);

/* Shard — small cocoa flake */
const Shard = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 48 48" fill="none">
    <radialGradient id={`sg-${fill.slice(1)}`} cx="35%" cy="28%" r="72%">
      <stop offset="0%"   stopColor={fill} stopOpacity="1" />
      <stop offset="100%" stopColor="#0a0401" stopOpacity="1" />
    </radialGradient>
    <path d="M8 36 L22 8 L40 20 L36 40 L14 44 Z" fill={`url(#sg-${fill.slice(1)})`} />
    <path d="M14 20 L26 12 L36 22" stroke="rgba(212,165,90,0.3)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <path d="M12 32 Q20 26 30 32" stroke="rgba(212,165,90,0.18)" strokeWidth="0.7" fill="none" />
    <ellipse cx="18" cy="16" rx="4" ry="2" fill="rgba(255,255,255,0.15)" transform="rotate(-20 18 16)" />
    <path d="M8 36 L22 8 L40 20 L36 40 L14 44 Z" stroke="rgba(212,165,90,0.12)" strokeWidth="0.8" fill="none" />
  </svg>
);

const ChocShape = ({ ball }: { ball: Ball }) => {
  const V = ball.variant ?? 'round';
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: ball.top, left: ball.left, right: ball.right, opacity: ball.opacity, width: ball.size, height: ball.size }}
      animate={{ y: [0, -ball.float, 0] }}
      transition={{ duration: ball.dur, repeat: Infinity, delay: ball.delay, ease: 'easeInOut' }}
    >
      {V === 'round'   && <RoundBall fill={ball.fill} />}
      {V === 'truffle' && <TruffleBall fill={ball.fill} />}
      {V === 'shard'   && <Shard fill={ball.fill} />}
    </motion.div>
  );
};

interface ChocolateDecorProps {
  variant?: 'hero' | 'section';
  className?: string;
}

export const ChocolateDecor = ({ variant = 'section', className = '' }: ChocolateDecorProps) => {
  const balls = PRESETS[variant];
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {balls.map((b, i) => <ChocShape key={i} ball={b} />)}
    </div>
  );
};
