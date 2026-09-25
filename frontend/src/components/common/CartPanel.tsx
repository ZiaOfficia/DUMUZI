import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Plus, Minus, Package, ArrowLeft, Loader2, Banknote, CreditCard, Gift, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart, type GiftItem } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useGuestGate } from '../../context/GuestGateContext';
import { redirectToPayu, rememberPendingPayment } from '../../utils/payu';
import { checkoutApi, ApiError } from '../../services/api';
import { getComboProgress, singleOffers, singleGiftItem } from '../../data/offersData';
import { ONLINE_DISCOUNT_PERCENT, onlineDiscount, payableTotal } from '../../utils/discount';
import { trackInitiateCheckout, trackPurchase, purchaseContextFor, savePendingPurchase } from '../../utils/metaPixel';

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';

// Flip to false to hide "Pay Online" if PayU ever needs to be taken down —
// the backend also returns a 503 with a readable message if its keys are unset.
const ONLINE_PAYMENT_ENABLED = true;

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateQty, removeItem, clearCart, gifts, addGift, removeGift } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { isGuest } = useGuestGate();

  const [step, setStep]       = useState<'cart' | 'checkout'>('cart');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [form, setForm]       = useState<CustomerForm>({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  // Online payment leads — it's the cheaper option for the shopper, so it starts selected
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'payu'>('payu');

  const discount = paymentMethod === 'payu' ? onlineDiscount(totalPrice) : 0;
  const payable  = payableTotal(totalPrice, paymentMethod);

  // Combo-offer progress — drives the "add ₹X more to get Y free" nudge.
  const combo = getComboProgress(totalPrice);

  // ── Every free gift this cart currently qualifies for ──
  // A cart can earn more than one — a qualifying box brings its own gift and
  // may also clear a combo tier — but only one can be taken, so they're
  // offered as a choice and claiming one replaces the last.
  const giftChoices: { gift: GiftItem; note: string }[] = [
    ...singleOffers
      .filter(o => items.some(i => i.id === o.buy.id))
      .map(o => ({ gift: singleGiftItem(o), note: `with ${o.buy.description}` })),
    ...(combo.unlocked
      ? [{
          gift: {
            key: `combo-${combo.unlocked.gift.id}-${combo.unlocked.threshold}`,
            productId: combo.unlocked.gift.id,
            name: combo.unlocked.gift.description,
            image: combo.unlocked.gift.image,
            mrp: combo.unlocked.gift.mrp,
            source: 'combo' as const,
            threshold: combo.unlocked.threshold,
          },
          note: `for spending ₹${combo.unlocked.threshold.toLocaleString('en-IN')}`,
        }]
      : []),
  ];

  const claimedKey = gifts[0]?.key ?? '';
  const mustChoose = giftChoices.length > 1;

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('cart'); setError(''); }, 400);
  };

  const handleFieldChange = (field: keyof CustomerForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleProceedToPayment = async () => {
    setError('');

    // Basic validation
    if (!form.name.trim())  return setError('Please enter your name.');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return setError('Please enter a valid email address.');
    }
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      return setError('Please enter a valid 10-digit Indian mobile number.');
    }
    if (!form.address.trim()) return setError('Please enter your delivery address.');
    if (!form.city.trim())    return setError('Please enter your city.');
    if (!form.state.trim())   return setError('Please enter your state.');
    if (!/^\d{6}$/.test(form.pincode)) return setError('Please enter a valid 6-digit pincode.');

    setLoading(true);
    try {
      const order = await checkoutApi.createOrder({
        items: items.map(({ id, name, price, quantity }) => ({ productId: id, name, price, quantity })),
        // Claimed gifts go over separately. Sending them as ₹0 *items* used to
        // get them re-priced at MRP by the server, which both charged for the
        // gift and inflated the online discount.
        gifts: gifts.map(g => ({ productId: g.productId, source: g.source })),
        customer: { name: form.name, email: form.email, phone: form.phone },
        paymentMethod,
        address: { address: form.address, city: form.city, state: form.state, pincode: form.pincode },
      });

      if (paymentMethod === 'cod') {
        // The order now exists server-side — for COD that's the purchase.
        // Sent before clearCart, while the lines it was created from are here.
        trackPurchase(purchaseContextFor(order, items, 'COD'));
        await clearCart();
        handleClose();
        navigate('/thank-you?type=order');
        setLoading(false);
        return;
      }

      // Online payment — leave the site for PayU's hosted checkout. The order
      // is already saved as pending; PayU's callback marks it paid or failed
      // and sends the shopper back to /thank-you.
      if (!order.payu) throw new Error('Payment gateway is unavailable. Please try Cash on Delivery.');
      rememberPendingPayment(order.orderId);   // so an unfinished round trip can be settled later
      // Reported as a Purchase on /thank-you, only once the server confirms payment
      savePendingPurchase(purchaseContextFor(order, items, 'ONLINE'));
      redirectToPayu(order.payu);
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Your session has expired. Please refresh the page and try again.');
        setLoading(false);
        return;
      }
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,165,90,0.2)',
    borderRadius: 12,
    padding: '11px 14px',
    color: 'var(--cream)',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'Inter, DM Sans, sans-serif',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] cursor-pointer"
            style={{ background: 'rgba(8,5,3,0.75)', backdropFilter: 'blur(4px)' }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            className="fixed top-0 right-0 h-full z-[61] flex flex-col"
            style={{
              width: 'min(420px, 100vw)',
              background: 'linear-gradient(160deg, #1a120d 0%, #100a07 100%)',
              borderLeft: '1px solid rgba(212,165,90,0.2)',
              boxShadow: '-20px 0 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(212,165,90,0.12)' }}
            >
              <div className="flex items-center gap-3">
                {step === 'checkout' && (
                  <button
                    onClick={() => { setStep('cart'); setError(''); }}
                    className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(220,214,205,0.6)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = GOLDL; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(220,214,205,0.6)'; }}
                  >
                    <ArrowLeft size={13} />
                  </button>
                )}
                <ShoppingBag size={18} style={{ color: GOLD }} />
                <h2 className="font-display font-semibold tracking-wide" style={{ fontSize: '1.05rem', color: 'var(--cream)' }}>
                  {step === 'cart' ? 'Your Cart' : 'Checkout'}
                </h2>
                {step === 'cart' && totalItems > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805' }}>
                    {totalItems}
                  </span>
                )}
                {/* Standing reminder of who's shopping — a guest sees it from the
                    moment their first item lands, not only at the details step. */}
                {!isAuthenticated && isGuest && (
                  <span
                    className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(212,165,90,0.12)',
                      color: GOLDL,
                      border: '1px solid rgba(212,165,90,0.3)',
                    }}
                  >
                    <UserRound size={10} /> Guest
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border-none"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(220,214,205,0.6)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,165,90,0.12)'; e.currentTarget.style.color = GOLDL; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(220,214,205,0.6)'; }}
              >
                <X size={15} />
              </button>
            </div>

            {/* ── STEP: CART ── */}
            {step === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-5 py-16">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(212,165,90,0.07)', border: '1px solid rgba(212,165,90,0.14)' }}>
                        <Package size={26} style={{ color: 'rgba(212,165,90,0.4)' }} />
                      </div>
                      <div className="text-center">
                        <p className="font-display text-base mb-1" style={{ color: 'rgba(220,214,205,0.55)' }}>Your cart is empty</p>
                        <p className="text-xs font-sans" style={{ color: 'rgba(220,214,205,0.28)' }}>Add some confections to get started</p>
                      </div>
                      <button
                        onClick={() => { handleClose(); navigate('/collections'); }}
                        className="mt-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border-none cursor-pointer transition-all duration-300"
                        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805', boxShadow: `0 6px 20px rgba(212,165,90,0.28)` }}>
                        Browse Collections
                      </button>
                    </div>
                  ) : (
                    items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.22 }}
                        className="flex gap-3 rounded-2xl p-3"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,165,90,0.1)' }}
                      >
                        {/* Image */}
                        <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
                          style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                        </div>

                        {/* Info + controls */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[12px] font-sans font-medium leading-snug line-clamp-2" style={{ color: 'var(--cream)' }}>
                              {item.name}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all duration-200"
                              style={{ background: 'rgba(255,80,60,0.08)', color: 'rgba(255,120,100,0.5)' }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,60,0.18)'; e.currentTarget.style.color = '#ff7060'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,80,60,0.08)'; e.currentTarget.style.color = 'rgba(255,120,100,0.5)'; }}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Qty controls */}
                            <div className="flex items-center rounded-xl overflow-hidden"
                              style={{ border: '1px solid rgba(212,165,90,0.18)', background: 'rgba(212,165,90,0.05)' }}>
                              <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center cursor-pointer border-none transition-all duration-150"
                                style={{ background: 'transparent', color: 'rgba(212,165,90,0.6)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,165,90,0.1)'; e.currentTarget.style.color = GOLDL; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(212,165,90,0.6)'; }}
                              >
                                <Minus size={11} />
                              </button>
                              <span className="w-7 text-center text-[12px] font-bold font-display" style={{ color: 'var(--cream)' }}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center cursor-pointer border-none transition-all duration-150"
                                style={{ background: 'transparent', color: 'rgba(212,165,90,0.6)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,165,90,0.1)'; e.currentTarget.style.color = GOLDL; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(212,165,90,0.6)'; }}
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            <span className="text-[13px] font-bold font-display" style={{ color: GOLD }}>
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}

                  {/* Claimed free gifts (₹0, removable) */}
                  {gifts.map(g => (
                    <motion.div
                      key={g.key}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.22 }}
                      className="flex gap-3 rounded-2xl p-3"
                      style={{ background: 'rgba(212,165,90,0.07)', border: '1px solid rgba(212,165,90,0.28)' }}
                    >
                      <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center relative"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <img src={g.image} alt={g.name} className="w-full h-full object-contain p-1" />
                        <span className="absolute top-0.5 left-0.5 text-[7px] font-bold px-1 py-0.5 rounded"
                          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805' }}>
                          FREE
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[12px] font-sans font-medium leading-snug line-clamp-2" style={{ color: 'var(--cream)' }}>
                              {g.name}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold mt-0.5"
                              style={{ color: 'rgba(212,165,90,0.7)' }}>
                              <Gift size={9} /> {g.source === 'combo' ? 'Combo gift' : 'Offer gift'}
                            </span>
                          </div>
                          <button
                            onClick={() => removeGift(g.key)}
                            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all duration-200"
                            style={{ background: 'rgba(255,80,60,0.08)', color: 'rgba(255,120,100,0.5)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,60,0.18)'; e.currentTarget.style.color = '#ff7060'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,80,60,0.08)'; e.currentTarget.style.color = 'rgba(255,120,100,0.5)'; }}
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-2">
                          <span className="text-[11px] font-display line-through" style={{ color: 'rgba(220,214,205,0.35)' }}>
                            ₹{g.mrp.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[13px] font-bold font-display uppercase" style={{ color: GOLDL }}>Free</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cart footer */}
                {items.length > 0 && (
                  <div className="flex-shrink-0 px-5 py-5 flex flex-col gap-4"
                    style={{ borderTop: '1px solid rgba(212,165,90,0.12)' }}>

                    {/* ── Free gift — pick one of the offers this cart earns ── */}
                    {giftChoices.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {mustChoose && (
                          <p className="text-[10px] font-sans uppercase tracking-[0.18em] font-bold px-1"
                            style={{ color: 'rgba(212,165,90,0.7)' }}>
                            Choose your free gift · one per order
                          </p>
                        )}
                        {giftChoices.map(({ gift, note }) => {
                          const selected = gift.key === claimedKey;
                          const replacing = !selected && !!claimedKey;
                          return (
                            <div key={gift.key}
                              className="rounded-2xl px-4 py-3 flex items-center gap-3"
                              style={{
                                background: selected ? 'rgba(212,165,90,0.14)' : 'rgba(212,165,90,0.07)',
                                border: selected
                                  ? `1px solid ${GOLD}`
                                  : '1px dashed rgba(212,165,90,0.35)',
                              }}>
                              <img src={gift.image} alt={gift.name}
                                className="w-10 h-10 rounded-lg object-contain flex-shrink-0"
                                style={{ background: 'rgba(255,255,255,0.04)' }} />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-sans leading-tight" style={{ color: 'var(--cream)' }}>
                                  Free <span className="font-bold" style={{ color: GOLDL }}>{gift.name}</span>
                                </p>
                                <p className="text-[9px] font-sans" style={{ color: 'rgba(220,214,205,0.4)' }}>
                                  {note} · worth ₹{gift.mrp.toLocaleString('en-IN')}
                                </p>
                              </div>
                              {selected ? (
                                <span className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                                  style={{ color: GOLDL }}>
                                  Added
                                </span>
                              ) : (
                                <button
                                  onClick={() => addGift(gift)}
                                  className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border-none transition-all duration-200"
                                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805' }}
                                >
                                  <Plus size={11} /> {replacing ? 'Swap' : 'Add'}
                                </button>
                              )}
                            </div>
                          );
                        })}
                        {mustChoose && claimedKey && (
                          <p className="text-[9px] font-sans px-1" style={{ color: 'rgba(220,214,205,0.4)' }}>
                            Swapping replaces the gift already in your cart.
                          </p>
                        )}
                      </div>
                    )}

                    {/* ── Combo-offer nudge ── */}
                    {combo.next && (
                      <div className="rounded-2xl px-4 py-3 flex flex-col gap-2.5"
                        style={{ background: 'rgba(212,165,90,0.07)', border: '1px solid rgba(212,165,90,0.2)' }}>

                        <p className="text-[11px] font-sans leading-snug" style={{ color: 'var(--muted)' }}>
                          Add{' '}
                          <span className="font-bold" style={{ color: GOLD }}>
                            ₹{combo.remaining.toLocaleString('en-IN')}
                          </span>{' '}
                          more to get{' '}
                          <span className="font-bold" style={{ color: 'var(--cream)' }}>
                            {combo.next.gift.description}
                          </span>{' '}
                          free
                        </p>
                        {/* progress bar toward the next tier */}
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(212,165,90,0.12)' }}>
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (totalPrice / combo.next.threshold) * 100)}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLDL})` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-sans font-bold" style={{ color: 'rgba(212,165,90,0.45)' }}>
                        Subtotal
                      </span>
                      <span className="text-xl font-display font-bold" style={{ color: 'var(--cream)' }}>
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[10px] font-sans text-center" style={{ color: 'rgba(212,165,90,0.65)' }}>
                      Pay online at checkout and save {ONLINE_DISCOUNT_PERCENT}% — ₹{onlineDiscount(totalPrice).toLocaleString('en-IN')} off
                    </p>
                    <p className="text-[10px] font-sans text-center" style={{ color: 'rgba(220,214,205,0.3)' }}>
                      Taxes &amp; shipping calculated at checkout
                    </p>
                    <button
                      onClick={() => { trackInitiateCheckout(items, payable); setStep('checkout'); }}
                      className="w-full py-3.5 rounded-full text-[12px] font-bold uppercase tracking-widest border-none cursor-pointer transition-all duration-300"
                      style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805', boxShadow: `0 8px 28px rgba(212,165,90,0.35)` }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 36px rgba(212,165,90,0.55)`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 8px 28px rgba(212,165,90,0.35)`; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="text-[10px] uppercase tracking-widest font-sans text-center w-full cursor-pointer border-none bg-transparent transition-all duration-200"
                      style={{ color: 'rgba(220,214,205,0.25)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,100,80,0.55)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(220,214,205,0.25)'; }}
                    >
                      Clear cart
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ── STEP: CHECKOUT ── */}
            {step === 'checkout' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
                  {/* Order summary (compact) */}
                  <div className="rounded-2xl p-4 flex flex-col gap-2"
                    style={{ background: 'rgba(212,165,90,0.05)', border: '1px solid rgba(212,165,90,0.12)' }}>
                    <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(212,165,90,0.5)' }}>
                      Order Summary
                    </p>
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={item.image} alt={item.name}
                            className="w-8 h-8 rounded-lg object-contain flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.04)' }} />
                          <span className="text-[11px] font-sans truncate" style={{ color: 'var(--muted)' }}>
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold flex-shrink-0" style={{ color: GOLD }}>
                          ×{item.quantity} &nbsp;₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                    {gifts.map(g => (
                      <div key={g.key} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={g.image} alt={g.name}
                            className="w-8 h-8 rounded-lg object-contain flex-shrink-0"
                            style={{ background: 'rgba(212,165,90,0.08)' }} />
                          <span className="text-[11px] font-sans truncate" style={{ color: 'var(--muted)' }}>
                            {g.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold flex-shrink-0 uppercase" style={{ color: GOLDL }}>
                          Free
                        </span>
                      </div>
                    ))}
                    {discount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-sans" style={{ color: 'var(--muted)' }}>
                          Online payment ({ONLINE_DISCOUNT_PERCENT}% off)
                        </span>
                        <span className="text-[11px] font-bold" style={{ color: '#10b981' }}>
                          −₹{discount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(212,165,90,0.12)' }}>
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(212,165,90,0.6)' }}>Total</span>
                      <span className="font-display font-bold text-base" style={{ color: 'var(--cream)' }}>
                        ₹{payable.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {/* COD forfeits the discount — say so where the total is, not
                        just on the payment buttons further down. */}
                    {paymentMethod === 'cod' && totalPrice > 0 && (
                      <p className="text-[10px] font-sans" style={{ color: GOLDL }}>
                        Switch to Pay Online and save ₹{onlineDiscount(totalPrice).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>

                  {/* Customer form */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(212,165,90,0.5)' }}>
                        Your Details
                      </p>
                      {/* Who the order will be placed as — a guest should never
                          have to wonder whether they're signed in. */}
                      <span
                        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          background: isAuthenticated ? 'rgba(16,185,129,0.12)' : 'rgba(212,165,90,0.12)',
                          color: isAuthenticated ? '#10b981' : GOLDL,
                          border: `1px solid ${isAuthenticated ? 'rgba(16,185,129,0.3)' : 'rgba(212,165,90,0.3)'}`,
                        }}
                      >
                        <UserRound size={10} />
                        {isAuthenticated ? (user?.name?.split(' ')[0] || 'Signed in') : 'Guest'}
                      </span>
                    </div>

                    {!isAuthenticated && (
                      <p className="text-[10px] font-sans leading-relaxed -mt-1" style={{ color: 'rgba(220,214,205,0.45)' }}>
                        Checking out as a guest — no account needed.{' '}
                        <button
                          type="button"
                          onClick={() => { onClose(); navigate('/login', { state: { from: '/checkout' } }); }}
                          className="font-semibold underline underline-offset-2"
                          style={{ color: GOLD, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                        >
                          Sign in
                        </button>{' '}
                        to track this order under My Orders.
                      </p>
                    )}

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>Full Name</label>
                      <input
                        type="text"
                        placeholder="Arjun Sharma"
                        value={form.name}
                        onChange={handleFieldChange('name')}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.5)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>Email Address</label>
                      <input
                        type="email"
                        placeholder="arjun@example.com"
                        value={form.email}
                        onChange={handleFieldChange('email')}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.5)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={form.phone}
                        onChange={handleFieldChange('phone')}
                        maxLength={10}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.5)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>Delivery Address</label>
                      <input
                        type="text"
                        placeholder="House no, street, area"
                        value={form.address}
                        onChange={handleFieldChange('address')}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.5)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>City</label>
                        <input
                          type="text"
                          placeholder="Mumbai"
                          value={form.city}
                          onChange={handleFieldChange('city')}
                          style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.5)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>State</label>
                        <input
                          type="text"
                          placeholder="Maharashtra"
                          value={form.state}
                          onChange={handleFieldChange('state')}
                          style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.5)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>Pincode</label>
                      <input
                        type="text"
                        placeholder="400001"
                        value={form.pincode}
                        onChange={handleFieldChange('pincode')}
                        maxLength={6}
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.5)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}
                      />
                    </div>

                    {ONLINE_PAYMENT_ENABLED ? (
                      <div className="flex flex-col gap-2 mt-1">
                        <label className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(220,214,205,0.4)' }}>Payment Method</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('payu')}
                            className="relative flex flex-col items-center gap-1.5 py-3 rounded-xl cursor-pointer transition-all duration-200"
                            style={{
                              background: paymentMethod === 'payu' ? 'rgba(212,165,90,0.14)' : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${paymentMethod === 'payu' ? GOLD : 'rgba(212,165,90,0.15)'}`,
                            }}
                          >
                            <span
                              className="absolute -top-1.5 right-2 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805' }}
                            >
                              {ONLINE_DISCOUNT_PERCENT}% Off
                            </span>
                            <CreditCard size={16} style={{ color: GOLD }} />
                            <span className="text-[11px] font-bold" style={{ color: 'var(--cream)' }}>Pay Online</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            className="flex flex-col items-center gap-1.5 py-3 rounded-xl cursor-pointer transition-all duration-200"
                            style={{
                              background: paymentMethod === 'cod' ? 'rgba(212,165,90,0.14)' : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${paymentMethod === 'cod' ? GOLD : 'rgba(212,165,90,0.15)'}`,
                            }}
                          >
                            <Banknote size={16} style={{ color: GOLD }} />
                            <span className="text-[11px] font-bold" style={{ color: 'var(--cream)' }}>Cash on Delivery</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[10px] text-center font-sans mt-1" style={{ color: 'rgba(220,214,205,0.35)' }}>
                        Cash on Delivery only · online payment coming soon
                      </p>
                    )}

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] font-sans px-3 py-2 rounded-lg"
                        style={{ color: '#ff8070', background: 'rgba(255,80,60,0.08)', border: '1px solid rgba(255,80,60,0.18)' }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Checkout footer */}
                <div className="flex-shrink-0 px-5 py-5 flex flex-col gap-3"
                  style={{ borderTop: '1px solid rgba(212,165,90,0.12)' }}>
                  <button
                    onClick={handleProceedToPayment}
                    disabled={loading}
                    className="w-full py-3.5 rounded-full text-[12px] font-bold uppercase tracking-widest border-none cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: loading ? 'rgba(212,165,90,0.4)' : `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                      color: '#0d0805',
                      boxShadow: loading ? 'none' : `0 8px 28px rgba(212,165,90,0.35)`,
                      cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = `0 12px 36px rgba(212,165,90,0.55)`; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = loading ? 'none' : `0 8px 28px rgba(212,165,90,0.35)`; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {loading
                      ? <><Loader2 size={14} className="animate-spin" /> Processing…</>
                      : paymentMethod === 'cod'
                        ? <><Banknote size={14} /> Place Order — ₹{payable.toLocaleString('en-IN')}</>
                        : <><CreditCard size={14} /> Pay ₹{payable.toLocaleString('en-IN')} via PayU</>
                    }
                  </button>
                  <p className="text-[10px] text-center font-sans" style={{ color: 'rgba(220,214,205,0.28)' }}>
                    {paymentMethod === 'cod' ? 'Pay in cash when your order arrives' : 'Secured by PayU · UPI, Cards, NetBanking & more'}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
