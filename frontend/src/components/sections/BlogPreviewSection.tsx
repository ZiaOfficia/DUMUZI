import { motion, type Transition } from 'framer-motion';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getBlogPostUrl, blogPosts } from '../../data/blogData';

const ease = [0.25, 0.1, 0.25, 1] as const;
const GOLD = '#d4a373';

// Category accent colours
const catColors: Record<string, string> = {
  Craftsmanship: '#d4a373',
  Sustainability: '#8aac7c',
  Gifting: '#c9a96e',
  Science: '#7ca4b8',
  History: '#b87c6e',
  Heritage: '#c4a86a',
  'Tasting Guide': '#a89670',
};

export const BlogPreviewSection = () => {
  const navigate = useNavigate();
  const posts = blogPosts.slice(0, 3);

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, var(--choc-deep) 0%, var(--choc-dark) 100%)',
        padding: '96px 0',
        position: 'relative',
      }}
    >
      {/* Top line */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.25),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14"
        >
          <div>
            <div className="section-label mb-4">From Our Atelier</div>
            <h2 className="font-luxury font-semibold leading-[1.08]"
              style={{ fontSize: 'clamp(2.2rem,3.8vw,3.4rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}>
              Artisan Guides<br />
              <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>& Stories</em>
            </h2>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-sm font-semibold tracking-wide whitespace-nowrap self-start sm:self-auto bg-transparent border-none cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={{ color: GOLD }}
          >
            Read All Articles <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => {
            const catColor = catColors[post.category] || GOLD;
            const postUrl = getBlogPostUrl(post.slug, post.createdAt);
            const isFeatured = i === 0;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease } as Transition}
                className="group flex flex-col rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  background: isFeatured ? 'rgba(35,22,14,0.9)' : 'rgba(26,18,13,0.65)',
                  border: isFeatured ? '1px solid rgba(212,163,115,0.35)' : '1px solid rgba(212,163,115,0.12)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(212,163,115,0.45)';
                  el.style.transform = 'translateY(-5px)';
                  el.style.boxShadow = '0 28px 60px rgba(212,163,115,0.15), 0 8px 30px rgba(0,0,0,0.7)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = isFeatured ? 'rgba(212,163,115,0.35)' : 'rgba(212,163,115,0.12)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--choc-mid)' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Category */}
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(15,10,7,0.82)', color: catColor, border: `1px solid ${catColor}40`, backdropFilter: 'blur(8px)' }}>
                    {post.category}
                  </span>

                  {isFeatured && (
                    <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full"
                      style={{ background: `linear-gradient(135deg,${GOLD},#e5c199)`, color: 'var(--choc-deep)' }}>
                      Featured
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-[10px]" style={{ color: 'rgba(212,163,115,0.5)' }}>
                    <div className="flex items-center gap-1.5">
                      <Clock size={10} />
                      {post.date}
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={10} />
                      {post.author}
                    </div>
                  </div>

                  {/* Title */}
                  <Link to={postUrl}>
                    <h3 className="font-display text-sm leading-snug font-semibold transition-colors duration-200 group-hover:text-gold-gradient line-clamp-2"
                      style={{ color: 'var(--cream)' }}>
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-[11px] leading-relaxed font-sans line-clamp-3 flex-1"
                    style={{ color: 'rgba(220,214,205,0.55)' }}>
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <Link to={postUrl}
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:gap-3"
                    style={{ color: catColor }}>
                    Read Article <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
