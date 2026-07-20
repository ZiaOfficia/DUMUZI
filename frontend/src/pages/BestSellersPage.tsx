import { useEffect, useState } from 'react';
import { motion, type Transition } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ProductModal } from '../components/common/ProductModal';
import { useCart } from '../context/CartContext';
import { products, type Product } from '../data/productsData';
import { homeBestSellerProducts } from '../components/sections/ServicesGrid';

const GOLD = '#d4a373';
const GOLDL = '#e5c199';
const ease = [0.25, 0.1, 0.25, 1] as const;

type BestSellerProduct = Product & {
  name?: string;
  price?: number;
  tag?: string | null;
  tagSolid?: boolean;
  oldPrice?: number | null;
  rating?: number;
  reviews?: number;
};

const BestSellersPage = () => {
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [bestProducts, setBestProducts] = useState<BestSellerProduct[]>([]);
  const [viewed, setViewed] = useState<Product | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const sourcedProducts = [...products] as Array<Product & { isBestSeller?: boolean }>;
      const favouriteProducts = sourcedProducts.filter((product) => Boolean(product.isBestSeller));

      if (favouriteProducts.length > 0) {
        setBestProducts(
          favouriteProducts.map((product) => ({
            ...product,
            name: product.description,
            price: product.mrp,
            tag: 'BEST SELLER',
            tagSolid: true,
            oldPrice: null,
            rating: 5,
            reviews: 312,
          }))
        );
      } else {
        setBestProducts(
          homeBestSellerProducts.map((product) => ({
            ...product,
            name: product.name ?? product.description,
            price: product.price ?? product.mrp,
            tag: product.tag ?? 'BEST SELLER',
            tagSolid: product.tagSolid ?? true,
            oldPrice: product.oldPrice ?? null,
            rating: product.rating ?? 5,
            reviews: product.reviews ?? 312,
          }))
        );
      }

      setIsLoading(false);
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center" style={{ background: 'var(--bg-deep)' }}>
        <p className="text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--gold)' }}>Loading best sellers…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'var(--bg-deep)' }}>
      <ProductModal product={viewed} onClose={() => setViewed(null)} />
      <SEO
        title="Best Sellers — DUMUZI"
        description="Discover our most loved and best-selling confections."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-gold-gradient font-sans">
              DUMUZI Favourites
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-cream">Best Sellers</h1>
          <p className="mt-3 text-base leading-relaxed max-w-2xl font-sans" style={{ color: 'var(--muted)' }}>
            Our most-loved gifts and signature confections, curated from the pieces our customers reach for first.
          </p>
        </motion.div>

        {bestProducts.length === 0 ? (
          <div className="rounded-2xl border px-6 py-16 text-center" style={{ borderColor: 'rgba(212,163,115,0.16)', background: 'rgba(26,18,13,0.55)' }}>
            <p className="font-display text-2xl mb-2" style={{ color: 'var(--cream)' }}>No best seller products available yet</p>
            <p className="text-sm font-sans" style={{ color: 'var(--muted)' }}>We’ll add fresh favourites as soon as they’re ready.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {bestProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (index % 10) * 0.05, ease } as Transition}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
                className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'rgba(26,18,13,0.7)',
                  border: hovered === product.id ? '1px solid rgba(212,163,115,0.5)' : '1px solid rgba(212,163,115,0.12)',
                  boxShadow: hovered === product.id ? '0 20px 50px rgba(212,163,115,0.15), 0 6px 20px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.35s cubic-bezier(0.25,1,0.5,1)',
                }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.025)' }}>
                  <img
                    src={product.image}
                    alt={product.description}
                    className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-108"
                  />

                  <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: 'rgba(10,6,3,0.5)', backdropFilter: 'blur(4px)' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); addItem({ id: product.id, name: product.description, price: product.mrp, image: product.image }); }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-none cursor-pointer"
                      style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--bg-deep)' }}
                      title="Add to Cart"
                    >
                      <ShoppingCart size={15} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setViewed(product); }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-none cursor-pointer"
                      style={{ color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
                      title="Quick View"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 p-3.5">
                  <span className="text-[9px] tracking-wider uppercase font-mono" style={{ color: 'rgba(212,163,115,0.4)' }}>
                    {product.productName}
                  </span>
                  <h3 className="font-display text-[13px] leading-snug font-semibold line-clamp-2" style={{ color: 'var(--cream)' }}>
                    {product.description}
                  </h3>

                  <div className="flex items-center justify-between mt-2 pt-2.5" style={{ borderTop: '1px solid rgba(212,163,115,0.1)' }}>
                    <span className="text-sm font-bold" style={{ color: GOLD }}>₹{product.mrp}</span>
                    <button
                      onClick={() => addItem({ id: product.id, name: product.description, price: product.mrp, image: product.image })}
                      className="w-7 h-7 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-250 hover:scale-110"
                      style={{ background: 'rgba(212,163,115,0.1)', color: GOLDL, border: '1px solid rgba(212,163,115,0.25)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg,${GOLD},${GOLDL})`; e.currentTarget.style.color = 'var(--bg-deep)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,163,115,0.1)'; e.currentTarget.style.color = GOLDL; }}
                    >
                      <ShoppingCart size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BestSellersPage;
