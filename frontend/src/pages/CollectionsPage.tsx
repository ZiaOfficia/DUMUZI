import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, type Transition } from 'framer-motion';
import { ShoppingCart, Eye, Search } from 'lucide-react';
import { useAddToCart } from '../hooks/useAddToCart';
import { products, type Product } from '../data/productsData';
import { ProductModal } from '../components/common/ProductModal';
import { SEO } from '../components/common/SEO';
import NewsletterSection from '../components/sections/NewsletterSection';

const GOLD = '#d4a373';
const GOLDL = '#e5c199';
const BROWN = '#9B6747';
const ease = [0.25, 0.1, 0.25, 1] as const;

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

const FILTERS = [
  { label: 'All',     value: 'ALL'     },
  { label: 'Heart',   value: 'HEART'   },
  { label: 'Display', value: 'DISPLAY' },
  { label: 'Bonbon',  value: 'BONBON'  },
  { label: 'Oval',    value: 'OVAL'    },
];

const CollectionsPage = () => {
  const addItem                = useAddToCart();
  const [searchParams]         = useSearchParams();
  const [filter, setFilter]    = useState('ALL');
  const [query,  setQuery]     = useState(searchParams.get('search') ?? '');
  const [viewed, setViewed]    = useState<Product | null>(null);
  const [hovered, setHovered]  = useState<number | null>(null);

  // Keep the search box in sync when the navbar search sends a new ?search= term
  // (e.g. searching again while already on this page)
  useEffect(() => {
    const term = searchParams.get('search');
    if (term !== null) setQuery(term);
  }, [searchParams]);

  // Auth-guarded addToCart (guard lives in useAddToCart)
  const handleAddToCart = useCallback((p: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addItem({ id: p.id, name: p.description, price: p.mrp, image: p.image });
  }, [addItem]);

  const visible = products.filter(p => {
    const matchCat   = filter === 'ALL' || p.description.startsWith(filter);
    const matchQuery = query === '' || p.description.toLowerCase().includes(query.toLowerCase()) || p.productName.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div style={{ background: 'var(--choc-deep)', minHeight: '100vh' }}>
      <ProductModal product={viewed} onClose={() => setViewed(null)} />

      <SEO
        title="Collections — DUMUZI"
        description="Browse all 27 DUMUZI handcrafted gift boxes. Heart, Display, Bonbon and Oval collections — for every occasion."
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background: 'linear-gradient(160deg, var(--choc-deep) 0%, var(--choc-dark) 60%, var(--choc-warm) 100%)',
          minHeight: '42vh',
        }}
      >
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-15" style={{ background: GOLD }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-12 sm:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-gold-gradient font-sans">
              DUMUZI
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
            className="font-display font-bold leading-[1.08] mb-4 text-cream"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)' }}
          >
            Our Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="text-base leading-relaxed max-w-lg font-sans"
            style={{ color: 'var(--muted)' }}
          >
            {products.length} handcrafted chocolate gift boxes. Heart-shaped, Display, Bonbon towers, and Oval trays — each filled with gold-foil wrapped truffles.
          </motion.p>
        </div>
      </section>

      {/* ── FILTERS + SEARCH ── */}
      <div style={{ background: 'var(--choc-dark)', borderBottom: '1px solid rgba(212,163,115,0.12)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold transition-all duration-250 border-none cursor-pointer"
                style={{
                  background:    filter === f.value ? `linear-gradient(135deg,${GOLD},${GOLDL})` : 'rgba(212,163,115,0.07)',
                  color:         filter === f.value ? 'var(--choc-deep)' : GOLDL,
                  border:        filter === f.value ? 'none' : '1px solid rgba(212,163,115,0.2)',
                  boxShadow:     filter === f.value ? `0 4px 14px rgba(212,163,115,0.3)` : 'none',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(212,163,115,0.5)' }} />
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-full text-[12px] font-sans outline-none"
              style={{
                background: 'rgba(212,163,115,0.07)',
                border: '1px solid rgba(212,163,115,0.2)',
                color: 'var(--cream)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <section className="py-10 sm:py-16 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Count */}
          <p className="text-[11px] uppercase tracking-widest mb-8 font-bold" style={{ color: 'rgba(212,163,115,0.4)' }}>
            {visible.length} {visible.length === 1 ? 'product' : 'products'}
          </p>

          {visible.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl mb-2" style={{ color: 'var(--cream)' }}>No products found</p>
              <p className="text-sm font-sans" style={{ color: 'var(--muted)' }}>Try a different filter or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {visible.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: (i % 10) * 0.05, ease } as Transition}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background:    'rgba(26,18,13,0.7)',
                    border:        hovered === p.id ? '1px solid rgba(212,163,115,0.5)' : '1px solid rgba(212,163,115,0.12)',
                    boxShadow:     hovered === p.id ? `0 20px 50px rgba(212,163,115,0.15), 0 6px 20px rgba(0,0,0,0.6)` : '0 4px 20px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(16px)',
                    transition:    'all 0.35s cubic-bezier(0.25,1,0.5,1)',
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.025)' }}>
                    <img
                      src={p.image}
                      alt={p.description}
                      className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-108"
                    />

                    {/* Hover actions */}
                    <div
                      className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: 'rgba(10,6,3,0.5)', backdropFilter: 'blur(4px)' }}
                    >
                      <button
                        onClick={e => handleAddToCart(p, e)}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-none cursor-pointer"
                        style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--choc-deep)' }}
                        title="Add to Cart"
                      >
                        <ShoppingCart size={15} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); setViewed(p); }}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-none cursor-pointer"
                        style={{ color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
                        title="Quick View"
                      >
                        <Eye size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1.5 p-3.5">
                    <span className="text-[9px] tracking-wider uppercase font-mono" style={{ color: 'rgba(212,163,115,0.4)' }}>
                      {p.productName}
                    </span>
                    <h3
                      className="font-display text-[13px] leading-snug font-semibold line-clamp-2"
                      style={{ color: 'var(--cream)' }}
                    >
                      {renderDesc(p.description)}
                    </h3>

                    <div
                      className="flex items-center justify-between mt-2 pt-2.5"
                      style={{ borderTop: '1px solid rgba(212,163,115,0.1)' }}
                    >
                      <span className="text-sm font-bold" style={{ color: GOLD }}>₹{p.mrp}</span>
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="w-7 h-7 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-250 hover:scale-110"
                        style={{ background: 'rgba(212,163,115,0.1)', color: GOLDL, border: '1px solid rgba(212,163,115,0.25)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg,${GOLD},${GOLDL})`; e.currentTarget.style.color = 'var(--choc-deep)'; }}
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
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default CollectionsPage;
