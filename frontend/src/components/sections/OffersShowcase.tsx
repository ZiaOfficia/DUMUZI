/**
 * OffersShowcase — the campaign posters, on the home page.
 *
 * Each live single offer ships with its own artwork (public/images/offers), and
 * the poster already carries the whole pitch — price, free gift, worth. So the
 * card gets out of its way: full-bleed poster, no overlay copy, and a quiet
 * footer underneath that turns it into something you can actually buy.
 *
 * Tap a poster to read the fine print full size, or follow it through to the
 * Offers page, where the offer is already scrolled to and ringed in gold.
 */
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gift, ArrowRight, X, ChevronLeft, ChevronRight, Sparkles, Maximize2 } from 'lucide-react';
import { posterOffers, singleOfferId, comboTiers, type SingleOffer } from '../../data/offersData';

const ease  = [0.25, 0.1, 0.25, 1] as const;
const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

/** Posters come in 3:4 and 0.84:1 — one frame ratio keeps the row even, and
 *  the ≤5% crop only ever eats decorative ribbon at the edges. */
const POSTER_RATIO = '4 / 5';

// ── Poster card ───────────────────────────────────────────────────────────────
interface OfferCardProps {
  offer: SingleOffer;
  index: number;
  onOpen: (index: number) => void;
  onView: (offer: SingleOffer) => void;
}

const OfferCard = ({ offer, index, onOpen, onView }: OfferCardProps) => {
  const [hovered, setHovered] = useState(false);
  const { buy, gift } = offer;

  return (
    <motion.article
      id={`home-${singleOfferId(offer)}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease } as Transition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-[26px] overflow-hidden h-full"
      style={{
        background: 'rgba(26,18,13,0.72)',
        border: `1px solid rgba(212,163,115,${hovered ? 0.45 : 0.16})`,
        backdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? '0 30px 72px rgba(0,0,0,0.62), 0 0 0 1px rgba(212,163,115,0.14)'
          : '0 16px 44px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.45s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.45s ease, border-color 0.45s ease',
      }}
    >
      {/* Poster — the artwork says everything, so nothing sits on top of it */}
      <button
        onClick={() => onOpen(index)}
        aria-label={`Enlarge offer poster — buy ${buy.productName}, get ${gift.productName} free`}
        className="relative block w-full overflow-hidden border-none p-0 cursor-zoom-in"
        style={{ aspectRatio: POSTER_RATIO, background: 'var(--bg-mid)' }}
      >
        <img
          src={offer.poster}
          alt={`Offer: buy ${buy.description} (₹${buy.mrp}) and get ${gift.description} worth ₹${gift.mrp} free`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.9s cubic-bezier(0.25,0.1,0.25,1)',
          }}
        />

        {/* Enlarge affordance — only on hover, only over the corner */}
        <span
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center pointer-events-none"
          style={{
            background: 'rgba(8,5,3,0.6)',
            color: GOLDL,
            border: '1px solid rgba(212,163,115,0.3)',
            backdropFilter: 'blur(6px)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <Maximize2 size={13} />
        </span>
      </button>

      {/* Action footer */}
      <div className="flex flex-col gap-3 p-4 lg:p-5" style={{ borderTop: '1px solid rgba(212,163,115,0.12)' }}>
        <p className="text-[11px] leading-snug font-sans" style={{ color: 'var(--muted)' }}>
          Buy <span style={{ color: 'var(--cream)', fontWeight: 700 }}>{buy.productName}</span>
          {' · '}Get <span style={{ color: GOLD, fontWeight: 700 }}>{gift.productName}</span> free
        </p>

        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xl font-bold text-gold-gradient">₹{buy.mrp}</span>
          <span className="text-[10px] uppercase tracking-[0.14em] font-bold" style={{ color: 'rgba(212,163,115,0.62)' }}>
            + ₹{gift.mrp} free
          </span>
        </div>

        <button
          onClick={() => onView(offer)}
          className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] border-none cursor-pointer"
          style={{
            background: hovered ? `linear-gradient(135deg, ${GOLD}, ${GOLDL})` : 'rgba(212,163,115,0.1)',
            color: hovered ? 'var(--bg-deep)' : GOLDL,
            boxShadow: hovered ? '0 10px 26px rgba(212,163,115,0.34)' : 'none',
            transition: 'background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease',
          }}
        >
          View Offer <ArrowRight size={13} />
        </button>
      </div>
    </motion.article>
  );
};

// ── Closing tile — fills the sixth slot and points at everything else ─────────
const MoreOffersTile = ({ index }: { index: number }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const topGift = comboTiers[comboTiers.length - 1];
  const entry   = comboTiers[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease } as Transition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('/offers?tab=combo')}
      className="flex flex-col items-center justify-center text-center gap-4 rounded-[26px] p-8 h-full cursor-pointer"
      style={{
        background: 'linear-gradient(165deg, rgba(212,163,115,0.14) 0%, rgba(26,18,13,0.8) 55%)',
        border: `1px solid rgba(212,163,115,${hovered ? 0.5 : 0.22})`,
        backdropFilter: 'blur(20px)',
        minHeight: '340px',
        boxShadow: hovered ? '0 30px 72px rgba(0,0,0,0.62)' : '0 16px 44px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.45s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.45s ease, border-color 0.45s ease',
      }}
    >
      <span
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: 'var(--bg-deep)', boxShadow: '0 12px 30px rgba(212,163,115,0.35)' }}
      >
        <Gift size={22} />
      </span>

      <h3 className="font-luxury font-semibold leading-tight" style={{ fontSize: 'clamp(1.35rem,2.2vw,1.75rem)', color: 'var(--cream)' }}>
        Combo <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Rewards</em>
      </h3>

      <p className="text-[13px] leading-relaxed font-sans max-w-[240px]" style={{ color: 'var(--muted)' }}>
        Spend ₹{entry.threshold} and a gift joins your cart — climb to ₹{topGift.threshold} and it becomes
        the {topGift.gift.description.toLowerCase()}, worth ₹{topGift.gift.mrp}.
      </p>

      <span
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{
          background: hovered ? `linear-gradient(135deg, ${GOLD}, ${GOLDL})` : 'transparent',
          color: hovered ? 'var(--bg-deep)' : GOLD,
          border: `1.5px solid rgba(212,163,115,${hovered ? 0 : 0.45})`,
          transition: 'background 0.35s ease, color 0.35s ease',
        }}
      >
        View All Offers <ArrowRight size={14} />
      </span>
    </motion.div>
  );
};

// ── Lightbox — the poster at full size, still one tap from the cart ──────────
const PosterLightbox = ({ index, onClose, onStep, onView }: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
  onView: (offer: SingleOffer) => void;
}) => {
  const offer = posterOffers[index];

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
      style={{ background: 'rgba(6,4,2,0.92)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close offer poster"
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none z-10"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)' }}
      >
        <X size={17} />
      </button>

      {posterOffers.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onStep(-1); }}
            aria-label="Previous offer"
            className="absolute left-3 md:left-8 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-none z-10"
            style={{ background: 'rgba(255,255,255,0.08)', color: GOLDL }}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onStep(1); }}
            aria-label="Next offer"
            className="absolute right-3 md:right-8 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-none z-10"
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
        className="relative rounded-[26px] overflow-hidden cursor-default flex flex-col"
        style={{
          width: 'min(520px, 92vw)',
          maxHeight: '90vh',
          border: '1px solid rgba(212,163,115,0.3)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.85)',
          background: 'var(--bg-mid)',
        }}
      >
        <img
          src={offer.poster}
          alt={`Offer: buy ${offer.buy.description} and get ${offer.gift.description} free`}
          className="w-full h-auto block object-contain"
          style={{ maxHeight: '68vh' }}
        />

        <div
          className="flex items-center justify-between gap-4 px-5 py-4"
          style={{ borderTop: '1px solid rgba(212,163,115,0.14)' }}
        >
          <div className="min-w-0">
            <p className="font-display text-sm truncate" style={{ color: 'var(--cream)' }}>
              {offer.buy.productName} · ₹{offer.buy.mrp}
            </p>
            <p className="text-[11px] font-sans" style={{ color: 'rgba(212,163,115,0.7)' }}>
              {offer.gift.productName} worth ₹{offer.gift.mrp} free
            </p>
          </div>
          <button
            onClick={() => { onView(offer); onClose(); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] border-none cursor-pointer whitespace-nowrap"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: 'var(--bg-deep)', boxShadow: '0 8px 22px rgba(212,163,115,0.3)' }}
          >
            View Offer <ArrowRight size={13} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
export const OffersShowcase = () => {
  const navigate     = useNavigate();
  const [open, setOpen] = useState<number | null>(null);

  // Hand the shopper off to the Offers page — the deep link opens the right tab,
  // scrolls to this offer and rings it in gold, so nothing has to be hunted for.
  const handleView = useCallback((offer: SingleOffer) => {
    navigate(`/offers?tab=single&offer=${singleOfferId(offer)}`);
  }, [navigate]);

  const step = useCallback((delta: number) => {
    setOpen(prev => (prev === null ? prev : (prev + delta + posterOffers.length) % posterOffers.length));
  }, []);

  if (posterOffers.length === 0) return null;

  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, var(--bg-deep) 0%, var(--bg-dark) 55%, var(--bg-deep) 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-16 left-1/5 w-[440px] h-[440px] rounded-full blur-[180px] pointer-events-none opacity-[0.14]" style={{ background: GOLD }} />
      <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] rounded-full blur-[170px] pointer-events-none opacity-10" style={{ background: GOLDL }} />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.35),transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease } as Transition}
            className="inline-flex items-center gap-2 section-label mb-5"
          >
            <Sparkles size={13} /> Limited-Time Rewards
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease } as Transition}
            className="font-luxury font-semibold leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}
          >
            Gifts on <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Us</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.16, ease } as Transition}
            className="text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans"
            style={{ color: 'var(--muted)' }}
          >
            Pick any box below and a second one comes free. Tap a poster to read it full size,
            then head to the offer to claim it.
          </motion.p>
        </div>

        {/* Posters — swipeable strip on phones, tidy grid from tablet up */}
        <div
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 sm:overflow-visible sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3"
          style={{ scrollbarWidth: 'none' }}
        >
          {posterOffers.map((offer, i) => (
            <div key={singleOfferId(offer)} className="flex-shrink-0 w-[74vw] max-w-[300px] snap-center sm:w-auto sm:max-w-none">
              <OfferCard offer={offer} index={i} onOpen={setOpen} onView={handleView} />
            </div>
          ))}
          <div className="flex-shrink-0 w-[74vw] max-w-[300px] snap-center sm:w-auto sm:max-w-none">
            <MoreOffersTile index={posterOffers.length} />
          </div>
        </div>

        <p className="text-center text-[10px] font-sans mt-6 sm:hidden" style={{ color: 'rgba(220,214,205,0.3)' }}>
          Swipe to see more →
        </p>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease } as Transition}
          className="text-center mt-12 lg:mt-14"
        >
          <button
            onClick={() => navigate('/offers')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-bold bg-transparent cursor-pointer transition-all duration-300"
            style={{ color: GOLD, border: '1.5px solid rgba(212,163,115,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.08)'; e.currentTarget.style.borderColor = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.4)'; }}
          >
            Explore Every Offer <ArrowRight size={14} />
          </button>
          <p className="text-[10px] font-sans mt-5" style={{ color: 'rgba(220,214,205,0.3)' }}>
            Offers are subject to availability and may be withdrawn at any time. One free gift per order tier.
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <PosterLightbox index={open} onClose={() => setOpen(null)} onStep={step} onView={handleView} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default OffersShowcase;
