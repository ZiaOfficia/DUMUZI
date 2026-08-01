/**
 * VideoShowcase — "DUMUZI in Motion".
 *
 * A strip of short reels that play muted while they're on screen and open
 * into a lightbox (with sound) on click. Cards stay deliberately small:
 * the source clips are ~370px wide, so they read as crisp phone-shot reels
 * rather than a stretched, soft hero video.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { reels, type Reel } from '../../data/videoAssets';

const ease  = [0.25, 0.1, 0.25, 1] as const;
const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Single reel card ──────────────────────────────────────────────────────────
interface ReelCardProps {
  reel: Reel;
  index: number;
  /** true while the lightbox is open — grid clips stand down */
  frozen: boolean;
  onOpen: (index: number) => void;
}

const ReelCard = ({ reel, index, frozen, onOpen }: ReelCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted]     = useState(true);
  const [hovered, setHovered] = useState(false);

  // Play only while the card is actually on screen — no offscreen decoding.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || prefersReducedMotion()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => { /* autoplay blocked — user can tap */ });
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Lightbox open → hush the grid.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !frozen) return;
    v.pause();
    setPlaying(false);
  }, [frozen]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease } as Transition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
      className="group relative flex-shrink-0 rounded-[26px] overflow-hidden cursor-pointer snap-center"
      style={{
        width: '100%',
        aspectRatio: '4 / 5',
        background: 'var(--bg-mid)',
        border: `1px solid rgba(212,163,115,${hovered ? 0.45 : 0.18})`,
        boxShadow: hovered
          ? '0 28px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,163,115,0.12)'
          : '0 16px 44px rgba(0,0,0,0.5)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.45s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.45s ease, border-color 0.45s ease',
      }}
    >
      <video
        ref={videoRef}
        src={reel.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        style={{ transition: 'transform 0.8s cubic-bezier(0.25,0.1,0.25,1)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
      />

      {/* Legibility wash */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,5,3,0.88) 0%, rgba(8,5,3,0.18) 45%, rgba(8,5,3,0.25) 100%)' }} />

      {/* Duration */}
      <span className="absolute top-3 left-3 text-[9px] font-bold tracking-wider px-2 py-1 rounded-full"
        style={{ background: 'rgba(8,5,3,0.55)', color: GOLDL, backdropFilter: 'blur(6px)', border: '1px solid rgba(212,163,115,0.25)' }}>
        {reel.length}
      </span>

      {/* Sound + play controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute clip' : 'Mute clip'}
          className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-200"
          style={{ background: 'rgba(8,5,3,0.55)', color: GOLDL, backdropFilter: 'blur(6px)' }}
        >
          {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause clip' : 'Play clip'}
          className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-200"
          style={{ background: 'rgba(8,5,3,0.55)', color: GOLDL, backdropFilter: 'blur(6px)' }}
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
        </button>
      </div>

      {/* Centre play halo — invites the lightbox */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease' }}
      >
        <span className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
            color: 'var(--bg-deep)',
            boxShadow: '0 10px 30px rgba(212,163,115,0.5)',
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1)',
          }}>
          <Play size={20} style={{ marginLeft: 2 }} />
        </span>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
        <p className="font-display text-[13px] leading-snug" style={{ color: 'var(--cream)' }}>
          {reel.caption}
        </p>
        <span className="text-[9px] uppercase tracking-[0.18em] font-sans" style={{ color: 'rgba(212,163,115,0.7)' }}>
          Watch
        </span>
      </div>
    </motion.div>
  );
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({ index, onClose, onStep }: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) => {
  const reel = reels[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft')  onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8 cursor-zoom-out"
      style={{ background: 'rgba(6,4,2,0.9)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-200 z-10"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)' }}
      >
        <X size={17} />
      </button>

      {reels.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onStep(-1); }}
            aria-label="Previous video"
            className="absolute left-3 md:left-8 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-200 z-10"
            style={{ background: 'rgba(255,255,255,0.08)', color: GOLDL }}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onStep(1); }}
            aria-label="Next video"
            className="absolute right-3 md:right-8 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-200 z-10"
            style={{ background: 'rgba(255,255,255,0.08)', color: GOLDL }}
          >
            <ChevronRight size={19} />
          </button>
        </>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease } as Transition}
        onClick={e => e.stopPropagation()}
        className="relative rounded-[28px] overflow-hidden cursor-default"
        style={{
          width: 'min(460px, 92vw)',
          border: '1px solid rgba(212,163,115,0.3)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.85)',
          background: 'var(--bg-mid)',
        }}
      >
        {/* key forces a fresh element per clip so playback restarts cleanly */}
        <video
          key={reel.src}
          src={reel.src}
          controls
          autoPlay
          loop
          playsInline
          className="w-full h-auto block max-h-[74vh]"
        />
        <div className="px-5 py-4 flex items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(212,163,115,0.14)' }}>
          <p className="font-display text-sm" style={{ color: 'var(--cream)' }}>{reel.caption}</p>
          <span className="text-[10px] uppercase tracking-widest font-sans" style={{ color: 'rgba(212,163,115,0.6)' }}>
            {index + 1} / {reels.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
export const VideoShowcase = () => {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((delta: number) => {
    setOpen(prev => (prev === null ? prev : (prev + delta + reels.length) % reels.length));
  }, []);

  if (reels.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, var(--bg-deep) 0%, var(--bg-dark) 55%, var(--bg-deep) 100%)' }}>

      {/* Ambient glows */}
      <div className="absolute top-10 left-1/4 w-[420px] h-[420px] rounded-full blur-[180px] pointer-events-none opacity-15" style={{ background: GOLD }} />
      <div className="absolute bottom-0 right-1/5 w-[360px] h-[360px] rounded-full blur-[170px] pointer-events-none opacity-10" style={{ background: GOLDL }} />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.35),transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 section-label mb-5"
          >
            <Film size={13} /> Behind the Ribbon
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease } as Transition}
            className="font-luxury font-semibold leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}
          >
            DUMUZI <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>in Motion</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.16, ease } as Transition}
            className="text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans"
            style={{ color: 'var(--muted)' }}
          >
            A few seconds inside the making of every box — tap any clip to watch it full size, with sound.
          </motion.p>
        </div>

        {/* Reel strip — swipeable until there's room for the full row.
            The grid holds one column per reel, so adding a clip to
            videoAssets never leaves an orphan on a second row. */}
        <div
          className="flex gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-3 lg:pb-0 lg:grid"
          style={{ scrollbarWidth: 'none', gridTemplateColumns: `repeat(${reels.length}, minmax(0, 1fr))` }}
        >
          {reels.map((reel, i) => (
            <div key={reel.src} className="flex-shrink-0 w-[62vw] max-w-[260px] lg:w-auto lg:max-w-none">
              <ReelCard reel={reel} index={i} frozen={open !== null} onOpen={setOpen} />
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] font-sans mt-7 lg:hidden" style={{ color: 'rgba(220,214,205,0.3)' }}>
          Swipe to see more →
        </p>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;
