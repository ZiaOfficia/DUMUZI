import { Search, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
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

  // Compute dynamic categories and counts
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

  return (
    <div className="space-y-8 relative">
      {/* Search Widget */}
      <div className="bg-stone-50/50 backdrop-blur-sm p-6 rounded-2xl border border-stone-100 shadow-sm">
        <h3 className="font-display text-lg font-semibold mb-4 text-stone-900">Search Articles</h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Type search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-primary transition-colors"
            aria-label="Submit search"
          >
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Dynamic Categories Widget */}
      <div className="bg-stone-50/50 backdrop-blur-sm p-6 rounded-2xl border border-stone-100 shadow-sm">
        <h3 className="font-display text-lg font-semibold mb-4 text-stone-900">Categories</h3>
        <ul className="space-y-2.5 text-sm text-stone-600">
          {categoriesWithCounts.map((category) => (
            <li key={category.name} className="border-b border-stone-100/50 pb-2 last:border-0 last:pb-0">
              <Link
                to={`/blog?search=${encodeURIComponent(category.name)}`}
                className="flex justify-between items-center hover:text-primary transition-colors group"
              >
                <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                <span className="text-xs text-stone-450 bg-stone-100 px-2 py-0.5 rounded-full font-mono">
                  ({category.count})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-stone-50/50 backdrop-blur-sm p-6 rounded-2xl border border-stone-100 shadow-sm">
        <h3 className="font-display text-lg font-semibold mb-5 text-stone-900">Recent Stories</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={getBlogPostUrl(post.slug, post.createdAt)}
              className="flex gap-4 group"
            >
              <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl border border-stone-100">
                <img
                  loading="lazy"
                  decoding="async"
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <h4 className="font-display text-sm font-semibold leading-snug text-stone-800 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-[11px] text-stone-400 mt-1">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sponsor a Student Callout */}
      <div className="bg-stone-950 text-white p-8 text-center rounded-2xl border border-stone-850 relative overflow-hidden bg-wedding-texture">
        <div className="relative z-10">
          <span className="text-[9px] text-primary uppercase font-bold tracking-widest bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
            Support Our Mission
          </span>
          <h3 className="font-display text-xl mb-2 font-semibold">Sponsor a Student</h3>
          <p className="text-stone-400 text-xs mb-6 leading-relaxed">
            With just Rs 2,000, you can pay an underprivileged student's school/term fees and protect their future.
          </p>
          <Link to="/contact">
            <Button variant="outline" className="w-full border-primary text-white hover:bg-primary hover:border-primary transition-all duration-300">
              Sponsor Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Social Follow Widget */}
      <div className="bg-stone-50/50 backdrop-blur-sm p-6 rounded-2xl border border-stone-100 shadow-sm">
        <h3 className="font-display text-lg font-semibold mb-4 text-stone-900">Follow Our Journey</h3>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/aaghazfoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white border border-stone-250 flex items-center justify-center text-stone-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-full shadow-sm"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://www.instagram.com/aaghazfoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white border border-stone-250 flex items-center justify-center text-stone-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-full shadow-sm"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://twitter.com/aaghazfoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white border border-stone-250 flex items-center justify-center text-stone-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-full shadow-sm"
            aria-label="Follow us on Twitter X"
          >
            <Twitter size={16} />
          </a>
          <a
            href="https://www.youtube.com/@aaghazfoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white border border-stone-250 flex items-center justify-center text-stone-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-full shadow-sm"
            aria-label="Follow us on YouTube"
          >
            <Youtube size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
