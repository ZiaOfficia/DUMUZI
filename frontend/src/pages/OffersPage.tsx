import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Tag, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import {
  singleOffers, comboTiers, singleGiftItem, singleOfferId, comboOfferId,
  type SingleOffer, type ComboTier,
} from '../data/offersData';
import { useCart } from '../context/CartContext';
import { useAddToCart } from '../hooks/useAddToCart';
import { useToast } from '../components/common/Toast';

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';

type Tab = 'single' | 'combo';

/** Card chrome — gold ring + glow when the shopper arrived via a ribbon link. */
const cardStyle = (highlight: boolean): React.CSSProperties => ({
  border: `1px solid ${highlight ? GOLD : 'rgba(212,165,90,0.16)'}`,
  boxShadow: highlight ? `0 0 0 1px ${GOLD}, 0 12px 40px rgba(212,165,90,0.28)` : 'none',
  transition: 'border-color 0.4s, box-shadow 0.4s',
  scrollMarginTop: '140px',
});

const SingleOfferCard = ({ offer, i, onBuy, highlight }: {
  offer: SingleOffer; i: number; onBuy: (offer: SingleOffer) => void; highlight: boolean;
}) => (
  <motion.div
    id={singleOfferId(offer)}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.07 }}
    className="glass-card rounded-2xl p-5 flex flex-wrap items-center gap-4"
    style={cardStyle(highlight)}
  >
    {/* Buy box */}
    <div className="flex flex-col items-center gap-2 flex-shrink-0 w-24">
      <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <img src={offer.buy.image} alt={offer.buy.description} className="w-full h-full object-contain p-1" />
      </div>
      <span className="text-[10px] text-center font-sans leading-tight" style={{ color: 'var(--muted)' }}>
        {offer.buy.description}
      </span>
      <span className="text-[13px] font-bold font-display" style={{ color: 'var(--cream)' }}>
        ₹{offer.buy.mrp}
      </span>
    </div>

    {/* Arrow / label */}
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: 'rgba(212,165,90,0.5)' }}>Get</span>
      <ArrowRight size={18} style={{ color: GOLD }} />
      <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: GOLDL }}>Free</span>
    </div>

    {/* Gift box */}
    <div className="flex flex-col items-center gap-2 flex-shrink-0 w-24 relative">
      <div
        className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center relative"
        style={{ background: 'rgba(212,165,90,0.08)', border: '1px solid rgba(212,165,90,0.28)' }}
      >
        <img src={offer.gift.image} alt={offer.gift.description} className="w-full h-full object-contain p-1" />
        <span
          className="absolute -top-2 -right-2 text-[8px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805' }}
        >
          FREE
        </span>
      </div>
      <span className="text-[10px] text-center font-sans leading-tight" style={{ color: 'var(--muted)' }}>
        {offer.gift.description}
      </span>
      <span className="text-[11px] font-bold font-display line-through" style={{ color: 'rgba(212,165,90,0.55)' }}>
        ₹{offer.gift.mrp}
      </span>
    </div>

    {/* Buy now — adds the box and drops the free gift straight into the cart */}
    <div className="flex-1 flex flex-col items-stretch sm:items-end gap-1 min-w-[150px]">
      <button
        onClick={() => onBuy(offer)}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border-none cursor-pointer transition-all duration-300"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805', boxShadow: '0 6px 20px rgba(212,165,90,0.28)' }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 28px rgba(212,165,90,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,165,90,0.28)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <ShoppingBag size={13} /> Buy Now
      </button>
      <span className="text-[9px] font-sans text-center sm:text-right" style={{ color: 'rgba(220,214,205,0.35)' }}>
        Gift added automatically
      </span>
    </div>
  </motion.div>
);

const ComboOfferCard = ({ tier, i, highlight }: { tier: ComboTier; i: number; highlight: boolean }) => (
  <motion.div
    id={comboOfferId(tier)}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.07 }}
    className="glass-card rounded-2xl p-6 flex items-center gap-5"
    style={cardStyle(highlight)}
  >
    <div
      className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
      style={{ background: 'rgba(212,165,90,0.1)', border: '1px solid rgba(212,165,90,0.25)' }}
    >
      <span className="text-[8px] uppercase tracking-wider font-bold" style={{ color: 'rgba(212,165,90,0.6)' }}>Spend</span>
      <span className="text-base font-bold font-display leading-none" style={{ color: GOLDL }}>₹{tier.threshold}</span>
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: 'rgba(212,165,90,0.5)' }}>
        Spend ₹{tier.threshold} & get
      </p>
      <p className="font-display text-base" style={{ color: 'var(--cream)' }}>
        {tier.gift.description} <span style={{ color: GOLD }}>FREE</span>
      </p>
      <p className="text-[11px] font-sans mt-0.5" style={{ color: 'var(--muted)' }}>
        Worth <span className="line-through">₹{tier.gift.mrp}</span> — added on us.
      </p>
    </div>

    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center relative"
      style={{ background: 'rgba(212,165,90,0.08)', border: '1px solid rgba(212,165,90,0.28)' }}>
      <img src={tier.gift.image} alt={tier.gift.description} className="w-full h-full object-contain p-1" />
      <span className="absolute -top-2 -right-2 text-[8px] font-bold px-1.5 py-0.5 rounded-full"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805' }}>
        FREE
      </span>
    </div>
  </motion.div>
);

/**
 * Which tab an offer id belongs to. Ids come from the top ribbon links
 * (`?offer=single-24-3` / `?offer=combo-499`) and win over any `?tab=`.
 */
const tabForOffer = (offerId: string | null): Tab | null =>
  offerId ? (offerId.startsWith('combo-') ? 'combo' : 'single') : null;

export const OffersPage = () => {
  const [params, setParams] = useSearchParams();
  const offerId = params.get('offer');
  const initial = tabForOffer(offerId) ?? ((params.get('tab') === 'combo' ? 'combo' : 'single') as Tab);
  const [tab, setTab] = useState<Tab>(initial);
  /** offer to ring + scroll to, cleared once the shopper has seen it */
  const [focused, setFocused] = useState<string | null>(offerId);

  const addToCart      = useAddToCart();
  const { addGift }    = useCart();
  const { success }    = useToast();

  // Buy Now → the qualifying box goes in the cart, its free gift rides along,
  // then the cart panel slides open so the shopper sees both.
  const handleBuyNow = (offer: SingleOffer) => {
    const added = addToCart({
      id:    offer.buy.id,
      name:  offer.buy.description,
      price: offer.buy.mrp,
      image: offer.buy.image,
    });
    if (!added) return;   // first-time shopper — the sign-in/guest prompt is up
    addGift(singleGiftItem(offer));
    success(`${offer.buy.description} added — your free ${offer.gift.description} is in the cart!`);
    window.dispatchEvent(new CustomEvent('dumuzi:open-cart'));
  };

  // Keep tab state in sync when the URL changes (navbar dropdown or ribbon link)
  useEffect(() => {
    const id = params.get('offer');
    setTab(tabForOffer(id) ?? ((params.get('tab') === 'combo' ? 'combo' : 'single') as Tab));
    setFocused(id);
  }, [params]);

  // Ribbon link → bring the linked offer into view once its tab has rendered,
  // then drop the ring so the page settles back to normal.
  useEffect(() => {
    if (!focused) return;
    const scroll = requestAnimationFrame(() => {
      document.getElementById(focused)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    const fade = setTimeout(() => setFocused(null), 3200);
    return () => { cancelAnimationFrame(scroll); clearTimeout(fade); };
  }, [focused]);

  const switchTab = (t: Tab) => {
    setTab(t);
    setFocused(null);
    setParams({ tab: t }, { replace: true });   // drops any ?offer= deep link
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'single', label: 'Single Offer', icon: <Tag size={15} /> },
    { key: 'combo',  label: 'Combo Offer',  icon: <Gift size={15} /> },
  ];

  return (
    <div style={{ background: 'var(--bg-deep)' }} className="min-h-screen">
      <SEO
        title="Offers — DUMUZI"
        description="Exclusive DUMUZI offers — buy select gift boxes and unlock free confections, plus combo rewards when you spend more."
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background: 'linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-dark) 60%, var(--bg-warm) 100%)',
          minHeight: '38vh',
        }}
      >
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-15" style={{ background: GOLD }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-label mb-5 inline-flex items-center gap-2"
          >
            <Sparkles size={13} /> Limited-Time Rewards
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-luxury font-semibold leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', color: 'var(--cream)' }}
          >
            DUMUZI <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Offers</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
            style={{ color: 'var(--muted)' }}
          >
            Every box comes with more. Buy select gift boxes and receive a complimentary confection —
            or spend a little more and unlock our combo rewards.
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 lg:px-8 pt-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12">
            {tabs.map(({ key, label, icon }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => switchTab(key)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                  style={{
                    background: active ? `linear-gradient(135deg, ${GOLD}, ${GOLDL})` : 'rgba(212,165,90,0.06)',
                    color: active ? '#0d0805' : 'rgba(212,165,90,0.6)',
                    border: `1px solid ${active ? 'transparent' : 'rgba(212,165,90,0.2)'}`,
                    boxShadow: active ? '0 8px 24px rgba(212,165,90,0.3)' : 'none',
                  }}
                >
                  {icon} {label}
                </button>
              );
            })}
          </div>

          {tab === 'single' ? (
            <div className="flex flex-col gap-4">
              <p className="text-center text-[13px] font-sans mb-2" style={{ color: 'var(--muted)' }}>
                Hit <span style={{ color: GOLD }}>Buy Now</span> and the matching gift box drops into your cart <span style={{ color: GOLD }}>free</span>.
              </p>
              {singleOffers.map((offer, i) => (
                <SingleOfferCard
                  key={`${offer.buy.id}-${offer.gift.id}-${i}`}
                  offer={offer} i={i} onBuy={handleBuyNow}
                  highlight={focused === singleOfferId(offer)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-center text-[13px] font-sans mb-2" style={{ color: 'var(--muted)' }}>
                The more you spend, the bigger your free gift. Reach a level and add your gift free from the cart.
              </p>
              {comboTiers.map((tier, i) => (
                <ComboOfferCard key={tier.threshold} tier={tier} i={i} highlight={focused === comboOfferId(tier)} />
              ))}
            </div>
          )}

          <p className="text-center text-[10px] font-sans mt-10" style={{ color: 'rgba(220,214,205,0.3)' }}>
            Offers are subject to availability and may be withdrawn at any time. One free gift per order tier.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OffersPage;
