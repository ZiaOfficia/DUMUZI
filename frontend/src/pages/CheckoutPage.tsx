import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Home, CreditCard, Banknote, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { SEO } from '../components/common/SEO';
import { checkoutApi, ApiError } from '../services/api';
import { loadRazorpayScript, type RazorpayResponse } from '../utils/razorpay';

const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

// Razorpay isn't configured on the backend yet — keep online payment hidden
// until that's set up, so customers don't hit a dead-end payment option.
const RAZORPAY_ENABLED = false;

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

const Field = ({
  label, icon, type = 'text', value, onChange, placeholder, required = false, error,
}: {
  label: string; icon?: React.ReactNode; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean; error?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(212,163,115,0.55)' }}>
      {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
    </label>
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(212,163,115,0.15)'}`,
      }}
    >
      {icon && <span style={{ color: 'rgba(212,163,115,0.4)', flexShrink: 0 }}>{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="flex-1 bg-transparent outline-none text-sm font-sans"
        style={{ color: 'var(--cream)' }}
      />
    </div>
    {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
  </div>
);

export const CheckoutPage = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [busy, setBusy] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');

  const set = (key: keyof FormData) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.phone.trim()) errs.phone = 'Required';
    if (!form.address.trim()) errs.address = 'Required';
    if (!form.city.trim()) errs.city = 'Required';
    if (!form.state.trim()) errs.state = 'Required';
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Valid 6-digit pincode required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) { error('Your cart is empty'); return; }

    setBusy(true);
    try {
      // Create the order in the database, tied to the logged-in account
      const order = await checkoutApi.createOrder({
        items: items.map(i => ({
          productId: i.id,
          name:      i.name,
          price:     i.price,
          quantity:  i.quantity,
        })),
        customer: { name: form.name, email: form.email, phone: form.phone },
        paymentMethod,
        address: {
          address: form.address,
          city:    form.city,
          state:   form.state,
          pincode: form.pincode,
          notes:   form.notes || undefined,
        },
      });

      if (paymentMethod === 'cod') {
        await clearCart();
        success('Order placed successfully! Pay in cash when it arrives.');
        navigate('/thank-you?type=order');
        setBusy(false);
        return;
      }

      // Online payment — hand off to Razorpay's checkout modal
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Failed to load payment gateway. Please check your connection.');

      const rzp = new window.Razorpay({
        key:         order.key as string,
        amount:      order.amount,
        currency:    order.currency,
        order_id:    order.orderId,
        name:        'DUMUZI',
        description: `Order of ${totalItems} item${totalItems > 1 ? 's' : ''}`,
        image:       '/images/logo.png',
        prefill:     { name: form.name, email: form.email, contact: form.phone },
        theme:       { color: GOLD },
        handler: async (response: RazorpayResponse) => {
          try {
            const verified = await checkoutApi.verifyPayment(response);
            if (!verified.success) throw new Error('Payment verification failed. Contact support.');
            await clearCart();
            success('Payment successful! Your order has been placed.');
            navigate('/thank-you?type=order');
          } catch (err) {
            error(err instanceof Error ? err.message : 'Payment verification failed.');
          } finally {
            setBusy(false);
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });
      rzp.open();
    } catch (err) {
      // Session expired mid-checkout — payment requires a logged-in customer
      if (err instanceof ApiError && err.status === 401) {
        error('Your session has expired. Please log in to complete your order.');
        navigate('/login', { state: { from: '/checkout' } });
        setBusy(false);
        return;
      }
      error(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4" style={{ background: 'var(--choc-deep)' }}>
        <ShoppingBag size={48} style={{ color: 'rgba(212,163,115,0.3)' }} />
        <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--cream)' }}>No items to checkout</h2>
        <Link
          to="/collections"
          className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: 'var(--choc-deep)' }}
        >
          Browse Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--choc-deep)' }}>
      <SEO title="Checkout — DUMUZI" description="Complete your DUMUZI order" />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2 text-xs font-sans mb-8"
          style={{ color: 'rgba(212,163,115,0.45)' }}
        >
          <Link to="/collections" style={{ color: 'inherit' }} className="hover:opacity-80 transition-opacity">Collections</Link>
          <ChevronRight size={12} />
          <Link to="/cart" style={{ color: 'inherit' }} className="hover:opacity-80 transition-opacity">Cart</Link>
          <ChevronRight size={12} />
          <span style={{ color: GOLD }}>Checkout</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Shipping form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'rgba(26,18,13,0.85)',
                border: '1px solid rgba(212,163,115,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
              }}
            >
              <h2 className="font-display text-xl font-bold mb-6" style={{ color: 'var(--cream)' }}>
                Shipping Details
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" icon={<User size={14} />} value={form.name} onChange={set('name')} placeholder="Your name" required error={errors.name} />
                  <Field label="Phone" icon={<Phone size={14} />} type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" required error={errors.phone} />
                </div>
                <Field label="Email Address" icon={<Mail size={14} />} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required error={errors.email} />
                <Field label="Street Address" icon={<Home size={14} />} value={form.address} onChange={set('address')} placeholder="House no, street name, area" required error={errors.address} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="City" icon={<MapPin size={14} />} value={form.city} onChange={set('city')} placeholder="Mumbai" required error={errors.city} />
                  <Field label="State" value={form.state} onChange={set('state')} placeholder="Maharashtra" required error={errors.state} />
                  <Field label="Pincode" value={form.pincode} onChange={set('pincode')} type="text" placeholder="400001" required error={errors.pincode} />
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(212,163,115,0.55)' }}>
                    Order Notes (optional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={e => set('notes')(e.target.value)}
                    placeholder="Special instructions, gift message…"
                    rows={3}
                    className="bg-transparent outline-none text-sm font-sans resize-none rounded-xl px-4 py-3"
                    style={{
                      color: 'var(--cream)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212,163,115,0.15)',
                    }}
                  />
                </div>

                {/* Payment method */}
                {RAZORPAY_ENABLED ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(212,163,115,0.55)' }}>
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer"
                        style={{
                          background: paymentMethod === 'cod' ? 'rgba(212,163,115,0.12)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${paymentMethod === 'cod' ? GOLD : 'rgba(212,163,115,0.15)'}`,
                        }}
                      >
                        <Banknote size={18} style={{ color: GOLD, flexShrink: 0 }} />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>Cash on Delivery</p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>Pay when your order arrives</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('razorpay')}
                        className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer"
                        style={{
                          background: paymentMethod === 'razorpay' ? 'rgba(212,163,115,0.12)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${paymentMethod === 'razorpay' ? GOLD : 'rgba(212,163,115,0.15)'}`,
                        }}
                      >
                        <CreditCard size={18} style={{ color: GOLD, flexShrink: 0 }} />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>Pay Online</p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>UPI, Cards &amp; NetBanking via Razorpay</p>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl mt-2"
                    style={{ background: 'rgba(212,163,115,0.06)', border: '1px solid rgba(212,163,115,0.15)' }}
                  >
                    <Banknote size={16} style={{ color: GOLD, flexShrink: 0 }} />
                    <p className="text-xs font-sans leading-relaxed" style={{ color: 'var(--muted)' }}>
                      <span style={{ color: GOLDL }}>Cash on Delivery</span> — pay when your order arrives. Online payment is coming soon.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 mt-2"
                  style={{
                    background: busy ? 'rgba(212,163,115,0.4)' : `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                    color: 'var(--choc-deep)',
                    border: 'none',
                    cursor: busy ? 'not-allowed' : 'pointer',
                    boxShadow: busy ? 'none' : '0 8px 24px rgba(212,163,115,0.3)',
                  }}
                >
                  {busy
                    ? <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: 'var(--choc-deep)' }} />
                    : paymentMethod === 'cod'
                      ? <><Banknote size={15} /> Place Order — ₹{totalPrice.toLocaleString('en-IN')}</>
                      : <><CreditCard size={15} /> Pay ₹{totalPrice.toLocaleString('en-IN')} Online</>
                  }
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{
                background: 'rgba(26,18,13,0.85)',
                border: '1px solid rgba(212,163,115,0.15)',
              }}
            >
              <h3 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--cream)' }}>
                Order ({totalItems} items)
              </h3>

              <div className="flex flex-col gap-3 mb-5 max-h-72 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,163,115,0.1)' }}
                    >
                      {item.image
                        ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                        : <ShoppingBag size={18} style={{ margin: 'auto', marginTop: '12px', color: 'rgba(212,163,115,0.3)' }} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-1 font-sans" style={{ color: 'var(--cream)' }}>{item.name}</p>
                      <p className="text-xs mt-0.5 font-sans" style={{ color: 'var(--muted)' }}>Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: GOLD }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="flex flex-col gap-2 pt-4"
                style={{ borderTop: '1px solid rgba(212,163,115,0.12)' }}
              >
                <div className="flex justify-between text-sm font-sans" style={{ color: 'var(--muted)' }}>
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--cream)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-sans" style={{ color: 'var(--muted)' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#10b981' }}>Free</span>
                </div>
                <div className="flex justify-between font-bold text-base mt-2" style={{ color: 'var(--cream)' }}>
                  <span>Total</span>
                  <span style={{ color: GOLD }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
