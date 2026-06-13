import { motion, type Transition } from 'framer-motion';
import { ArrowRight, Gem, Gift, Star, Package, Heart, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ease = [0.25, 0.1, 0.25, 1] as const;

const collections = [
  {
    id: 'heart-collection',
    icon: Heart,
    label: 'Heart Shaped',
    title: 'Heart Collection',
    desc: 'Romantic heart-shaped gift boxes from 3 to 18 handcrafted chocolates.',
    color: '#d4a373',
    link: '/collections',
    image: '/images/products/LF-H12T.jpeg',
  },
  {
    id: 'bonbon-collection',
    icon: Star,
    label: 'Wrapped Bonbons',
    title: 'Bonbon Collection',
    desc: 'Gold-foil wrapped ball chocolates. Acrylic tower, trios assortment.',
    color: '#c9a96e',
    link: '/collections',
    image: '/images/products/LF- BN9.jpeg',
  },
  {
    id: 'display-collection',
    icon: Gem,
    label: 'Luxury Display',
    title: 'Display Trays',
    desc: 'Elegant display trays with 6 to 25 pieces. Perfect for every occasion.',
    color: '#b89660',
    link: '/collections',
    image: '/images/products/LF-D25T.jpeg',
  },
  {
    id: 'gift-boxes',
    icon: Gift,
    label: 'Luxury Gifting',
    title: 'Gift Boxes',
    desc: 'Gold-foil embossed boxes with silk ribbon. For weddings, birthdays & more.',
    color: '#a08050',
    link: '/collections',
    image: '/images/products/LF-H18D.jpeg',
  },
  {
    id: 'corporate-gifting',
    icon: Package,
    label: 'Corporate',
    title: 'Corporate Gifting',
    desc: 'Bulk display and heart trays with custom presentation. From 12 units.',
    color: '#c9a96e',
    link: '/collections',
    image: '/images/products/LF-D18T.jpeg',
  },
  {
    id: 'signature',
    icon: ChefHat,
    label: 'Signature Line',
    title: 'DUMUZI Signature',
    desc: 'Our iconic collection — the very best of DUMUZI craftsmanship.',
    color: '#d4a373',
    link: '/collections',
    image: '/images/products/DUMUZI.jpeg',
  },
];

export const CollectionsPreviewSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-16 lg:py-24"
      style={{
        background: 'linear-gradient(180deg, var(--choc-deep) 0%, var(--choc-dark) 100%)',
        position: 'relative',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.3),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg,transparent,var(--gold))' }} />
              <span className="text-[10px] tracking-[0.32em] uppercase font-bold text-gold-gradient font-sans">
                Our Collections
              </span>
            </div>
            <h2 className="font-display font-bold leading-[1.1]"
              style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', color: 'var(--cream)' }}>
              Every Craving.<br />
              <span className="text-gold-gradient italic font-display">Covered.</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/collections')}
            className="flex items-center gap-2 text-sm font-semibold tracking-wide whitespace-nowrap self-start sm:self-auto bg-transparent border-none cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={{ color: 'var(--gold)' }}
          >
            View All Collections <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map(({ icon: Icon, label, title, desc, color, link, image }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease } as Transition}
              onClick={() => navigate(link)}
              className="group cursor-pointer rounded-2xl overflow-hidden flex flex-col transition-all duration-400"
              style={{
                background: 'rgba(26,18,13,0.65)',
                border: '1px solid rgba(212,163,115,0.13)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(212,163,115,0.5)';
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 28px 65px rgba(212,163,115,0.16), 0 8px 30px rgba(0,0,0,0.7)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(212,163,115,0.13)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Product image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.025)' }}>
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain p-3 transition-transform duration-600 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {/* Label badge */}
                <span className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(15,10,7,0.8)', color, border: `1px solid ${color}40`, backdropFilter: 'blur(8px)' }}>
                  {label}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Icon + Title row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,163,115,0.1)', border: '1px solid rgba(212,163,115,0.2)' }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <h3 className="font-display text-base font-semibold leading-snug"
                    style={{ color: 'var(--cream)' }}>{title}</h3>
                </div>

                {/* Desc */}
                <p className="text-xs leading-relaxed font-sans flex-1"
                  style={{ color: 'var(--muted)' }}>{desc}</p>

                {/* Arrow CTA */}
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                  style={{ color }}>
                  Explore <ArrowRight size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
