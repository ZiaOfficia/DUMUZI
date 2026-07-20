import { Search, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import { Button } from "../common/Button";
import { getBlogPostUrl, blogPosts as staticBlogPosts } from "../../data/blogData";

interface SidebarPost {
  id: string;
  title: string;
  slug: string;
  createdAt?: string;
  date: string;
  image: string;
}

export const BlogSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentPosts, setRecentPosts] = useState<SidebarPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const formatted = staticBlogPosts.slice(0, 4).map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      createdAt: post.createdAt,
      date: post.date,
      image: post.image,
    }));
    setRecentPosts(formatted);
  }, []);

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    staticBlogPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/blog?search=${encodeURIComponent(searchTerm)}`);
  };

  const widgetClass = "glass-card p-6 rounded-2xl";
  const inputStyle: CSSProperties = {
    background: 'rgba(26,18,13,0.7)',
    border: '1px solid rgba(212,163,115,0.2)',
    color: 'var(--cream)',
  };

  return (
    <div className="space-y-8 relative">
      {/* Search Widget */}
      <div className={widgetClass}>
        <h3 className="font-display text-lg font-semibold mb-4 text-cream">Search Stories</h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
            className="w-full rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none transition-colors focus:border-[#d4a373] placeholder:text-[rgba(220,214,205,0.35)]"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors"
            aria-label="Submit search"
          >
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Dynamic Categories Widget */}
      <div className={widgetClass}>
        <h3 className="font-display text-lg font-semibold mb-4 text-cream">Categories</h3>
        <ul className="space-y-2.5 text-sm text-muted">
          {categoriesWithCounts.map((category) => (
            <li
              key={category.name}
              className="pb-2 last:pb-0"
              style={{ borderBottom: '1px solid rgba(212,163,115,0.1)' }}
            >
              <Link
                to={`/blog?search=${encodeURIComponent(category.name)}`}
                className="flex justify-between items-center hover:text-gold transition-colors group"
              >
                <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ color: 'rgba(212,163,115,0.7)', background: 'rgba(212,163,115,0.1)' }}
                >
                  ({category.count})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className={widgetClass}>
        <h3 className="font-display text-lg font-semibold mb-5 text-cream">Recent Stories</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={getBlogPostUrl(post.slug, post.createdAt)}
              className="flex gap-4 group"
            >
              <div
                className="w-16 h-16 shrink-0 overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(212,163,115,0.2)' }}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <h4 className="font-display text-sm font-semibold leading-snug text-cream group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-[11px] text-muted mt-1" style={{ opacity: 0.65 }}>{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Callout */}
      <div
        className="p-8 text-center rounded-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--bg-warm) 0%, var(--bg-dark) 100%)', border: '1px solid rgba(212,163,115,0.2)' }}
      >
        <div className="relative z-10">
          <span
            className="text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3 inline-block"
            style={{ color: 'var(--gold)', background: 'rgba(212,163,115,0.12)' }}
          >
            Luxury Gifting
          </span>
          <h3 className="font-display text-xl mb-2 font-semibold text-cream">Order DUMUZI</h3>
          <p className="text-muted text-xs mb-6 leading-relaxed">
            Gift someone a moment of pure luxury with our handcrafted confectionery collections.
          </p>
          <Link to="/contact">
            <Button variant="outline" className="w-full border-[#d4a373] text-cream hover:bg-[#d4a373] hover:text-[#1a120d] hover:border-[#d4a373] transition-all duration-300">
              Enquire Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Social Follow Widget */}
      <div className={widgetClass}>
        <h3 className="font-display text-lg font-semibold mb-4 text-cream">Follow Us</h3>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/dumuzi_confections"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center transition-all duration-300 rounded-full text-muted hover:text-[#1a120d]"
            style={{ background: 'rgba(26,18,13,0.6)', border: '1px solid rgba(212,163,115,0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26,18,13,0.6)'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.2)'; }}
            aria-label="Follow us on Facebook"
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://www.instagram.com/dumuzi_confections"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center transition-all duration-300 rounded-full text-muted hover:text-[#1a120d]"
            style={{ background: 'rgba(26,18,13,0.6)', border: '1px solid rgba(212,163,115,0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26,18,13,0.6)'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.2)'; }}
            aria-label="Follow us on Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://twitter.com/dumuzi_confections"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center transition-all duration-300 rounded-full text-muted hover:text-[#1a120d]"
            style={{ background: 'rgba(26,18,13,0.6)', border: '1px solid rgba(212,163,115,0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26,18,13,0.6)'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.2)'; }}
            aria-label="Follow us on Twitter X"
          >
            <Twitter size={16} />
          </a>
          <a
            href="https://www.youtube.com/@dumuzi_confections"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center transition-all duration-300 rounded-full text-muted hover:text-[#1a120d]"
            style={{ background: 'rgba(26,18,13,0.6)', border: '1px solid rgba(212,163,115,0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26,18,13,0.6)'; e.currentTarget.style.borderColor = 'rgba(212,163,115,0.2)'; }}
            aria-label="Follow us on YouTube"
          >
            <Youtube size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
