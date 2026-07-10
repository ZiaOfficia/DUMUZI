import { motion, type Transition } from 'framer-motion';
import { ShoppingCart, Star, ArrowRight, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products as allProducts, type Product } from '../../data/productsData';
import { ProductModal } from '../common/ProductModal';

const products = [
  { ...allProducts[0],  name: allProducts[0].description,  price: allProducts[0].mrp,  tag: 'BEST SELLER', tagSolid: true  },
  { ...allProducts[1],  name: allProducts[1].description,  price: allProducts[1].mrp,  tag: null,          tagSolid: false },
  { ...allProducts[11], name: allProducts[11].description, price: allProducts[11].mrp, tag: 'TRENDING',    tagSolid: false },
  { ...allProducts[15], name: allProducts[15].description, price: allProducts[15].mrp, tag: null,          tagSolid: false },
  { ...allProducts[23], name: allProducts[23].description, price: allProducts[23].mrp, tag: 'PREMIUM',     tagSolid: false },
].map((p, i) => ({ ...p, oldPrice: null as number | null, rating: 5, reviews: [312, 228, 189, 156, 134][i] }));

const ease = [0.25, 0.1, 0.25, 1] as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          fill={i <= rating ? 'var(--gold)' : 'none'}
          style={{ color: i <= rating ? 'var(--gold)' : 'rgba(212,163,115,0.25)' }}
        />
      ))}
    </div>
  );
}

export const ServicesGrid = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [viewed, setViewed] = useState<Product | null>(null);

  return (
    <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(180deg, var(--choc-deep) 0%, var(--choc-dark) 100%)', position: 'relative' }}>
      <ProductModal product={viewed} onClose={() => setViewed(null)} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
              <span className="text-[10px] tracking-[0.32em] uppercase font-bold text-gold-gradient font-sans">Our Collection</span>
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--cream)', lineHeight: 1.1 }}>
              Discover Our Bestsellers
            </h2>
          </div>
          <button
            onClick={() => navigate('/collections')}
            className="flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap self-start sm:self-auto bg-transparent border-none cursor-pointer text-gold-gradient hover:translate-x-1"
            style={{ color: 'var(--gold)' }}
          >
            View All Products <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {products.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 44 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.65, delay: i * 0.1, ease } as Transition}
              className="group flex flex-col rounded-3xl overflow-hidden glass-card glass-card-hover cursor-pointer"
            >
              {/* Image area */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: 'var(--choc-deep)' }}>
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: 'center' }}
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Badge */}
                {p.tag && (
                  <span 
                    className="absolute top-3 left-3 text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-lg z-10"
                    style={{ 
                      background: p.tagSolid ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'rgba(212,163,115,0.15)', 
                      color: p.tagSolid ? 'var(--choc-deep)' : 'var(--gold-light)', 
                      border: p.tagSolid ? 'none' : '1px solid rgba(212,163,115,0.3)' 
                    }}
                  >
                    {p.tag}
                  </span>
                )}

                {/* Hover overlay with Quick actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                  style={{ background: 'rgba(15,10,7,0.45)', backdropFilter: 'blur(4px)' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addItem({ id: p.id, name: p.name, price: p.price, image: p.image }); }}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-none cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--choc-deep)' }}
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setViewed(p); }}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 border-none cursor-pointer backdrop-blur-md"
                    style={{ color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.1)' }}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-4 gap-2">
                <h3 className="font-display text-sm leading-snug font-semibold" style={{ color: 'var(--cream)' }}>{p.name}</h3>
                <div className="flex items-center gap-1.5">
                  <Stars rating={p.rating} />
                  <span className="text-[10px]" style={{ color: 'var(--muted)' }}>({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3.5" style={{ borderTop: '1px solid rgba(212,163,115,0.12)' }}>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-gold-gradient">
                      ₹{p.price}
                    </span>
                    {p.oldPrice && <span className="text-[11px] line-through opacity-40" style={{ color: 'var(--cream)' }}>₹{p.oldPrice}</span>}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addItem({ id: p.id, name: p.name, price: p.price, image: p.image }); }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-[#c59b6c]/10 hover:bg-gradient-to-r hover:from-[#c59b6c] hover:to-[#e5c199] border border-[#c59b6c]/30 hover:border-transparent text-[#c59b6c] hover:text-[#040405] hover:shadow-[0_0_18px_rgba(197,155,108,0.45)] cursor-pointer"
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
