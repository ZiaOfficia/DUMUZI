import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Tag, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from './Toast';
import type { Product } from '../../data/productsData';

const GOLD = '#d4a373';
const GOLDL = '#e5c199';
const BROWN = '#9B6747';

const renderDesc = (desc: string) => {
  const idx = desc.indexOf('SIGNATURE');
  if (idx === -1) return desc;
  return (
    <>
      {desc.slice(0, idx)}
      <span style={{ color: BROWN }}>SIGNATURE</span>
      {desc.slice(idx + 9)}
    </>
  );
};

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addItem }         = useCart();
  const { isAuthenticated } = useAuth();
  const { info }            = useToast();
  const navigate            = useNavigate();

  const handleAddToCart = () => {
    if (!product) return;
    if (!isAuthenticated) {
      info('Please log in to add items to your cart');
      onClose();
      navigate('/login', { state: { from: '/collections' } });
      return;
    }
    addItem({ id: product.id, name: product.description, price: product.mrp, image: product.image });
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ background: 'rgba(8,5,3,0.82)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
          >
            <div
              className="relative w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden pointer-events-auto flex flex-col md:flex-row"
              style={{
                background: 'linear-gradient(135deg, #1a120d 0%, #120c08 100%)',
                border: `1px solid rgba(212,163,115,0.35)`,
                boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,163,115,0.1)`,
                maxHeight: '92vh',
              }}
            >
              {/* Drag handle on mobile */}
              <div className="flex md:hidden justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(212,163,115,0.3)' }} />
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border-none cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(220,214,205,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <X size={15} />
              </button>

              {/* Image */}
              <div
                className="w-full md:w-[42%] flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.03)', minHeight: 200 }}
              >
                <img
                  src={product.image}
                  alt={product.description}
                  className="w-full object-contain p-4 sm:p-6"
                  style={{ maxHeight: 280 }}
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between p-5 sm:p-7 gap-4 flex-1 overflow-y-auto">
                {/* Brand + code */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase font-bold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(212,163,115,0.12)', color: GOLD, border: `1px solid rgba(212,163,115,0.25)` }}
                  >
                    {product.brandName}
                  </span>
                  <span className="text-[10px] tracking-wider font-mono" style={{ color: 'rgba(212,163,115,0.45)' }}>
                    {product.productName}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <h2
                    className="font-display font-bold leading-tight mb-2"
                    style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', color: 'var(--cream)' }}
                  >
                    {renderDesc(product.description)}
                  </h2>
                  <div className="h-px w-12 mt-3" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
                </div>

                {/* Info rows */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Package size={14} style={{ color: GOLD }} />
                    <span className="text-xs font-sans" style={{ color: 'var(--muted)' }}>
                      Handcrafted chocolate gift box · DUMUZI Luxury Chocolates
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag size={14} style={{ color: GOLD }} />
                    <span className="text-xs font-sans" style={{ color: 'var(--muted)' }}>
                      Gold foil wrapped · Premium packaging · Perfect for gifting
                    </span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div
                  className="flex items-center justify-between pt-5 mt-auto"
                  style={{ borderTop: '1px solid rgba(212,163,115,0.12)' }}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(212,163,115,0.4)' }}>
                      MRP
                    </span>
                    <div className="text-3xl font-bold font-display" style={{ color: GOLD }}>
                      ₹{product.mrp}
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[12px] font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                      color: 'var(--choc-deep)',
                      boxShadow: `0 8px 24px rgba(212,163,115,0.35)`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 14px 36px rgba(212,163,115,0.55)`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = `0 8px 24px rgba(212,163,115,0.35)`;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <ShoppingCart size={15} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
