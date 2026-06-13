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
}

const PRESETS: Record<string, Ball[]> = {
  hero: [
    { top: '8%',  left: '3%',   size: 28, opacity: 0.18, float: 12, dur: 5.5, delay: 0,   fill: '#6b3f1f' },
    { top: '22%', right: '5%',  size: 18, opacity: 0.14, float: 8,  dur: 4.8, delay: 1.2, fill: '#8b5a2b' },
    { top: '68%', left: '6%',   size: 22, opacity: 0.16, float: 10, dur: 6,   delay: 0.5, fill: '#5c3317' },
    { top: '75%', right: '8%',  size: 32, opacity: 0.12, float: 14, dur: 7,   delay: 2,   fill: '#7a4928' },
    { top: '42%', left: '1%',   size: 14, opacity: 0.20, float: 6,  dur: 4.2, delay: 0.8, fill: '#9c6b3a' },
    { top: '55%', right: '3%',  size: 20, opacity: 0.15, float: 9,  dur: 5.2, delay: 1.6, fill: '#6b3f1f' },
    { top: '88%', left: '18%',  size: 16, opacity: 0.13, float: 7,  dur: 5,   delay: 2.4, fill: '#8b5a2b' },
    { top: '12%', right: '22%', size: 12, opacity: 0.18, float: 5,  dur: 4,   delay: 0.3, fill: '#5c3317' },
  ],
  section: [
    { top: '10%', right: '2%',  size: 24, opacity: 0.12, float: 10, dur: 5.5, delay: 0,   fill: '#7a4928' },
    { top: '60%', left: '1%',   size: 18, opacity: 0.10, float: 8,  dur: 6,   delay: 1.4, fill: '#6b3f1f' },
    { top: '80%', right: '6%',  size: 14, opacity: 0.14, float: 6,  dur: 4.5, delay: 0.7, fill: '#9c6b3a' },
    { top: '30%', left: '3%',   size: 20, opacity: 0.09, float: 12, dur: 7,   delay: 2,   fill: '#5c3317' },
  ],
};

const ChocBall = ({ ball }: { ball: Ball }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top: ball.top, left: ball.left, right: ball.right, opacity: ball.opacity }}
    animate={{ y: [0, -ball.float, 0] }}
    transition={{ duration: ball.dur, repeat: Infinity, delay: ball.delay, ease: 'easeInOut' }}
  >
    <svg viewBox="0 0 48 48" width={ball.size} height={ball.size} fill="none">
      {/* Base ball */}
      <circle cx="24" cy="24" r="22" fill={ball.fill} />
      {/* Gold foil wrap crinkle lines */}
      <path d="M 6 24 Q 14 18 24 24 Q 34 30 42 24" stroke="rgba(212,163,115,0.4)" strokeWidth="1" fill="none" />
      <path d="M 8 30 Q 18 24 28 30 Q 36 35 43 30" stroke="rgba(212,163,115,0.25)" strokeWidth="0.8" fill="none" />
      {/* Shine highlight */}
      <ellipse cx="16" cy="14" rx="6" ry="4" fill="rgba(255,255,255,0.12)" />
      <ellipse cx="14" cy="13" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.18)" />
      {/* Subtle rim */}
      <circle cx="24" cy="24" r="22" stroke="rgba(212,163,115,0.2)" strokeWidth="1" fill="none" />
    </svg>
  </motion.div>
);

interface ChocolateDecorProps {
  variant?: 'hero' | 'section';
  className?: string;
}

export const ChocolateDecor = ({ variant = 'section', className = '' }: ChocolateDecorProps) => {
  const balls = PRESETS[variant];
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {balls.map((b, i) => <ChocBall key={i} ball={b} />)}
    </div>
  );
};
