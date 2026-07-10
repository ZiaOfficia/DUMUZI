import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/common/SEO';

const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

export const CartPage = () => {
  const { items, totalItems, totalPrice, updateQty, removeItem, clearCart, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--choc-deep)' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(212,163,115,0.2)', borderTopColor: GOLD }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--choc-deep)' }}>
      <SEO title="My Cart — DUMUZI" description="Your DUMUZI shopping cart" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--cream)' }}>
              Your Cart
            </h1>
            <p className="text-sm mt-1 font-sans" style={{ color: 'var(--muted)' }}>
              {totalItems === 0 ? 'Empty' : `${totalItems} item${totalItems > 1 ? 's' : ''}`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => clearCart()}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 px-3 py-2 rounded-lg"
              style={{
                color: 'rgba(239,68,68,0.7)',
                border: '1px solid rgba(239,68,68,0.25)',
                background: 'rgba(239,68,68,0.06)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; }}
            >
              <Trash2 size={12} /> Clear All
            </button>
          )}
        </motion.div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'rgba(212,163,115,0.08)', border: '1px solid rgba(212,163,115,0.15)' }}
            >
              <ShoppingCart size={32} style={{ color: 'rgba(212,163,115,0.4)' }} />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--cream)' }}>
              Your cart is empty
            </h2>
            <p className="text-sm mb-8 font-sans" style={{ color: 'var(--muted)' }}>
              Add some DUMUZI chocolates to get started
            </p>
            <Link
              to="/collections"
              className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                color: 'var(--choc-deep)',
                boxShadow: '0 8px 24px rgba(212,163,115,0.3)',
              }}
            >
              <ShoppingBag size={15} /> Shop Collections
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex gap-4 p-4 rounded-2xl"
                    style={{
                      background: 'rgba(26,18,13,0.85)',
                      border: '1px solid rgba(212,163,115,0.12)',
                    }}
                  >
                    {/* Product image */}
                    <div
                      className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,163,115,0.1)' }}
                    >
                      {item.image
                        ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                        : <ShoppingBag size={24} style={{ color: 'rgba(212,163,115,0.3)' }} />
                      }
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2" style={{ color: 'var(--cream)' }}>
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold mt-1" style={{ color: GOLD }}>
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div
                          className="flex items-center rounded-lg overflow-hidden"
                          style={{ border: '1px solid rgba(212,163,115,0.2)' }}
                        >
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center transition-colors"
                            style={{ background: 'rgba(212,163,115,0.07)', color: GOLDL, border: 'none', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.14)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.07)'; }}
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            className="w-10 text-center text-sm font-bold font-mono"
                            style={{ color: 'var(--cream)' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center transition-colors"
                            style={{ background: 'rgba(212,163,115,0.07)', color: GOLDL, border: 'none', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.14)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.07)'; }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold" style={{ color: 'var(--cream)' }}>
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                            style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.6)', border: 'none', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.16)'; e.currentTarget.style.color = '#ef4444'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = 'rgba(239,68,68,0.6)'; }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-1"
            >
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{
                  background: 'rgba(26,18,13,0.85)',
                  border: '1px solid rgba(212,163,115,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <h3 className="font-display text-lg font-bold mb-5" style={{ color: 'var(--cream)' }}>
                  Order Summary
                </h3>

                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex justify-between text-sm font-sans" style={{ color: 'var(--muted)' }}>
                    <span>Subtotal ({totalItems} items)</span>
                    <span style={{ color: 'var(--cream)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans" style={{ color: 'var(--muted)' }}>
                    <span>Shipping</span>
                    <span style={{ color: '#10b981' }}>Free</span>
                  </div>
                  <div
                    className="flex justify-between font-bold text-base pt-3 mt-1"
                    style={{ color: 'var(--cream)', borderTop: '1px solid rgba(212,163,115,0.12)' }}
                  >
                    <span>Total</span>
                    <span style={{ color: GOLD }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                    color: 'var(--choc-deep)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(212,163,115,0.3)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(212,163,115,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,163,115,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Proceed to Checkout <ArrowRight size={15} />
                </button>

                <Link
                  to="/collections"
                  className="block text-center mt-4 text-xs font-semibold transition-colors"
                  style={{ color: 'rgba(212,163,115,0.5)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,163,115,0.5)'; }}
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
