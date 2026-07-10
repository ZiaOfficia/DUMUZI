import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Plus, Minus, Package, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { loadRazorpayScript } from '../../utils/razorpay';
import { API_BASE_URL } from '../../config';

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
}

export const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateQty, removeItem, clearCart } = useCart();

  const [step, setStep]       = useState<'cart' | 'checkout'>('cart');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [form, setForm]       = useState<CustomerForm>({ name: '', email: '', phone: '' });

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

    setLoading(true);
    try {
      // Step 1 — create Razorpay order on backend
      const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
          customer: { name: form.name, email: form.email, phone: form.phone },
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || 'Failed to create order');

      // Step 2 — load Razorpay checkout.js
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Failed to load payment gateway. Please check your connection.');

      // Step 3 — open Razorpay modal
      const rzp = new window.Razorpay({
        key:         orderData.key,
        amount:      orderData.amount,
        currency:    orderData.currency,
        order_id:    orderData.orderId,
        name:        'DUMUZI',
        description: `Order of ${totalItems} item${totalItems > 1 ? 's' : ''}`,
        image:       '/images/logo.png',
        prefill: {
          name:    form.name,
          email:   form.email,
          contact: form.phone,
        },
        theme: { color: GOLD },
        handler: async (response) => {
          // Step 4 — verify payment signature
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error('Payment verification failed. Contact support.');
            }
            clearCart();
            handleClose();
            navigate('/thank-you?type=order');
          } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Verification failed.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.open();
    } catch (err: unknown) {
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
                        <p className="text-xs font-sans" style={{ color: 'rgba(220,214,205,0.28)' }}>Add some chocolates to get started</p>
                      </div>
                      <button
                        onClick={handleClose}
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
                </div>

                {/* Cart footer */}
                {items.length > 0 && (
                  <div className="flex-shrink-0 px-5 py-5 flex flex-col gap-4"
                    style={{ borderTop: '1px solid rgba(212,165,90,0.12)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-sans font-bold" style={{ color: 'rgba(212,165,90,0.45)' }}>
                        Subtotal
                      </span>
                      <span className="text-xl font-display font-bold" style={{ color: 'var(--cream)' }}>
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[10px] font-sans text-center" style={{ color: 'rgba(220,214,205,0.3)' }}>
                      Taxes &amp; shipping calculated at checkout
                    </p>
                    <button
                      onClick={() => setStep('checkout')}
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
                    <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(212,165,90,0.12)' }}>
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(212,165,90,0.6)' }}>Total</span>
                      <span className="font-display font-bold text-base" style={{ color: 'var(--cream)' }}>
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Customer form */}
                  <div className="flex flex-col gap-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(212,165,90,0.5)' }}>
                      Your Details
                    </p>

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
                      : `Pay ₹${totalPrice.toLocaleString('en-IN')}`
                    }
                  </button>
                  <p className="text-[10px] text-center font-sans" style={{ color: 'rgba(220,214,205,0.28)' }}>
                    Secured by Razorpay · UPI, Cards, NetBanking &amp; more
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
