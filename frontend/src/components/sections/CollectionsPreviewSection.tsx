import { motion, type Transition } from 'framer-motion';
import { ArrowRight, Gem, Gift, Star, Package, Heart, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ease = [0.25, 0.1, 0.25, 1] as const;

const collections = [
  {
    id: 'heart-collection',
    icon: Heart,
    label: 'Romantic Gifting',
    title: 'Heart Collection',
    desc: 'Romantic heart-shaped gift boxes from 3 to 18 handcrafted confections.',
    color: '#d4a55a',
    link: '/collections',
    image: '/images/products/LF-H12T.jpeg',
  },
  {
    id: 'bonbon-collection',
    icon: Star,
    label: 'Wrapped Bonbons',
    title: 'Bonbon Collection',
    desc: 'Gold-foil wrapped confections. Acrylic tower, trios assortment.',
    color: '#e8c07a',
    link: '/collections',
    image: '/images/products/LF- BN9.jpeg',
  },
  {
    id: 'display-collection',
    icon: Gem,
    label: 'Luxury Display',
    title: 'Display Trays',
    desc: 'Elegant display trays with 6 to 25 pieces. Perfect for every occasion.',
    color: '#c89050',
    link: '/collections',
    image: '/images/products/LF-D25T.jpeg',
  },
  {
    id: 'gift-boxes',
    icon: Gift,
    label: 'Luxury Gifting',
    title: 'Gift Boxes',
    desc: 'Gold-foil embossed boxes with silk ribbon. For weddings, birthdays & more.',
    color: '#d4a55a',
    link: '/collections',
    image: '/images/products/LF-H18D.jpeg',
  },
  {
    id: 'corporate-gifting',
    icon: Package,
    label: 'Corporate',
    title: 'Corporate Gifting',
    desc: 'Bulk display and heart trays with custom presentation. From 12 units.',
    color: '#e8c07a',
    link: '/collections',
    image: '/images/products/LF-D18T.jpeg',
  },
  {
    id: 'signature',
    icon: ChefHat,
    label: 'Signature Line',
    title: 'DUMUZI Signature',
    desc: 'Our iconic collection — the very best of DUMUZI craftsmanship.',
    color: '#d4a55a',
    link: '/collections',
    image: '/images/products/DUMUZI.jpeg',
  },
];

export const CollectionsPreviewSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-18 lg:py-28 relative"
      style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)', overflow: 'hidden' }}
    >
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(212,165,90,0.06)', top: '-80px' }} />

      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,165,90,0.32),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-16"
        >
          <div>
            <div className="section-label mb-4">Our Collections</div>
            <h2
              className="font-luxury font-semibold leading-[1.08]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}
            >
              Every Craving.{' '}
              <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Covered.</em>
            </h2>
          </div>
          <button
            onClick={() => navigate('/collections')}
            className="flex items-center gap-2 text-sm font-semibold tracking-wide whitespace-nowrap self-start sm:self-auto bg-transparent border-none cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={{ color: 'var(--gold)', fontFamily: 'Inter, sans-serif' }}
          >
            View All <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map(({ icon: Icon, label, title, desc, color, link, image }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09, ease } as Transition}
              onClick={() => navigate(link)}
              className="group cursor-pointer rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(160deg, rgba(30,20,13,0.9) 0%, rgba(13,8,5,0.95) 100%)',
                border: '1px solid rgba(212,165,90,0.13)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.55)',
                transition: 'all 0.45s cubic-bezier(0.25,1,0.5,1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(212,165,90,0.44)';
                el.style.transform   = 'translateY(-6px)';
                el.style.boxShadow   = '0 32px 80px rgba(0,0,0,0.75), 0 10px 30px rgba(212,165,90,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(212,165,90,0.13)';
                el.style.transform   = 'translateY(0)';
                el.style.boxShadow   = '0 10px 40px rgba(0,0,0,0.55)';
              }}
            >
              {/* Product image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '16/9', background: 'rgba(13,8,5,0.8)' }}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.07]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                {/* Corner accents */}
                {['top-2.5 left-2.5 border-t border-l','top-2.5 right-2.5 border-t border-r'].map((cls, i) => (
                  <div key={i} className={`absolute ${cls} w-5 h-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
                    style={{ borderColor: 'rgba(212,165,90,0.5)' }} />
                ))}

                {/* Label badge */}
                <span
                  className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.22em] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(13,8,5,0.82)',
                    color,
                    border: `1px solid ${color}38`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
                      border: `1px solid ${color}28`,
                    }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <h3
                    className="font-luxury text-[15px] font-semibold leading-snug"
                    style={{ color: 'var(--cream)', letterSpacing: '0.02em' }}
                  >
                    {title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="text-[12px] leading-relaxed font-sans flex-1"
                  style={{ color: 'rgba(220,214,205,0.6)' }}
                >
                  {desc}
                </p>

                {/* CTA arrow */}
                <div
                  className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                  style={{ color, marginTop: 4 }}
                >
                  <span>Explore</span>
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
