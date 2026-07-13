import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag, Clock, CheckCircle, XCircle, Truck, PackageCheck } from 'lucide-react';
import { checkoutApi } from '../services/api';
import type { MyOrder } from '../types';
import { SEO } from '../components/common/SEO';

const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

const STATUS_META: Record<MyOrder['status'], { label: string; color: string; icon: React.ReactNode }> = {
  pending:   { label: 'Pending',   color: '#f59e0b', icon: <Clock size={13} /> },
  paid:      { label: 'Paid',      color: '#10b981', icon: <CheckCircle size={13} /> },
  shipped:   { label: 'Shipped',   color: '#3b82f6', icon: <Truck size={13} /> },
  delivered: { label: 'Delivered', color: '#10b981', icon: <PackageCheck size={13} /> },
  cancelled: { label: 'Cancelled', color: '#78716c', icon: <XCircle size={13} /> },
  failed:    { label: 'Failed',    color: '#ef4444', icon: <XCircle size={13} /> },
};

export const MyOrdersPage = () => {
  const [orders, setOrders]   = useState<MyOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState<string | null>(null);

  useEffect(() => {
    checkoutApi
      .getMyOrders()
      .then(setOrders)
      .catch(e => setErr(e instanceof Error ? e.message : 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--choc-deep)' }}>
      <SEO title="My Orders — DUMUZI" description="Your DUMUZI order history" />

      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2 text-xs font-sans mb-8"
          style={{ color: 'rgba(212,163,115,0.45)' }}
        >
          <Link to="/" style={{ color: 'inherit' }} className="hover:opacity-80 transition-opacity">Home</Link>
          <ChevronRight size={12} />
          <span style={{ color: GOLD }}>My Orders</span>
        </motion.div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--cream)' }}>
          My Orders
        </h1>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(212,163,115,0.2)', borderTopColor: GOLD }} />
          </div>
        )}

        {!loading && err && (
          <p className="text-sm font-sans py-10 text-center" style={{ color: '#ef4444' }}>{err}</p>
        )}

        {!loading && !err && orders.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20">
            <Package size={48} style={{ color: 'rgba(212,163,115,0.3)' }} />
            <p className="text-sm font-sans" style={{ color: 'var(--muted)' }}>You haven't placed any orders yet.</p>
            <Link
              to="/collections"
              className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: 'var(--choc-deep)' }}
            >
              Browse Collections
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {orders.map((order, idx) => {
            const meta = STATUS_META[order.status] ?? STATUS_META.pending;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl p-5 sm:p-6"
                style={{
                  background: 'rgba(26,18,13,0.85)',
                  border: '1px solid rgba(212,163,115,0.15)',
                }}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-sans" style={{ color: 'var(--muted)' }}>
                      Order <span style={{ color: GOLDL }}>#{order.id}</span> ·{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                    </p>
                  </div>
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ color: meta.color, background: `${meta.color}18`, border: `1px solid ${meta.color}40` }}
                  >
                    {meta.icon} {meta.label}
                  </span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ShoppingBag size={14} style={{ color: 'rgba(212,163,115,0.4)', flexShrink: 0 }} />
                      <p className="flex-1 text-sm font-sans line-clamp-1" style={{ color: 'var(--cream)' }}>{item.name}</p>
                      <span className="text-xs font-sans" style={{ color: 'var(--muted)' }}>× {item.quantity}</span>
                      <span className="text-sm font-bold" style={{ color: GOLD }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div
                  className="flex justify-between pt-3 text-sm font-bold"
                  style={{ borderTop: '1px solid rgba(212,163,115,0.12)', color: 'var(--cream)' }}
                >
                  <span>Total</span>
                  <span style={{ color: GOLD }}>₹{(order.amount / 100).toLocaleString('en-IN')}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
