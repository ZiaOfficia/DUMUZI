import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { BlogPost } from "../../data/blogData";
import { getBlogPostUrl } from "../../data/blogData";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="glass-card glass-card-hover group rounded-2xl h-full flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">
      {/* Image Container */}
      <Link
        to={getBlogPostUrl(post.slug, post.createdAt)}
        className="block overflow-hidden aspect-[16/10] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
          <span className="text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            Read Story <ArrowRight size={14} />
          </span>
        </div>
        <img
          loading="lazy"
          decoding="async"
          src={post.image}
          alt={post.title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          style={{ background: 'var(--bg-mid)' }}
        />
        {/* Category Pill Overlaid */}
        <span
          className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
          style={{ background: 'rgba(15,10,7,0.85)', color: 'var(--gold)', border: '1px solid rgba(212,163,115,0.25)' }}
        >
          {post.category}
        </span>
      </Link>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta information */}
        <div className="flex items-center gap-4 text-xs text-muted mb-3" style={{ opacity: 0.75 }}>
          <span className="flex items-center gap-1">
            <Calendar size={12} style={{ color: 'rgba(212,163,115,0.5)' }} />
            {post.date}
          </span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,163,115,0.3)' }}></span>
          <span className="flex items-center gap-1">
            <User size={12} style={{ color: 'rgba(212,163,115,0.5)' }} />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <Link
          to={getBlogPostUrl(post.slug, post.createdAt)}
          className="block mb-3"
        >
          <h3 className="text-xl font-display font-semibold text-cream group-hover:text-[#d4a373] transition-colors leading-tight line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t" style={{ borderTopColor: 'rgba(212,163,115,0.12)' }}>
            {post.tags.split(",").map((tag) => (
              <span
                key={tag.trim()}
                className="text-[10px] px-2 py-0.5 rounded transition-colors"
                style={{ color: 'rgba(220,214,205,0.6)', background: 'rgba(212,163,115,0.08)', border: '1px solid rgba(212,163,115,0.1)' }}
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <Link
            to={getBlogPostUrl(post.slug, post.createdAt)}
            className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: 'var(--bg-deep)',
              borderColor: 'rgba(212,163,115,0.32)',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              boxShadow: '0 8px 24px rgba(212,163,115,0.18)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = '0 14px 32px rgba(212,163,115,0.3)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = '0 8px 24px rgba(212,163,115,0.18)';
              el.style.transform = 'translateY(0)';
            }}
          >
            <span>Read Full Story</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};
