import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { BlogPost } from "../../data/blogData";
import { getBlogPostUrl } from "../../data/blogData";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group bg-white rounded-2xl border border-stone-100 hover:border-primary/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">
      {/* Image Container */}
      <Link
        to={getBlogPostUrl(post.slug, post.createdAt)}
        className="block overflow-hidden aspect-[16/10] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
          <span className="text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            Read Article <ArrowRight size={14} />
          </span>
        </div>
        <img
          loading="lazy"
          decoding="async"
          src={post.image}
          alt={post.title}
          className="w-full h-full object-contain bg-stone-50 transition-transform duration-700 group-hover:scale-102"
        />
        {/* Category Pill Overlaid */}
        <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
          {post.category}
        </span>
      </Link>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta information */}
        <div className="flex items-center gap-4 text-xs text-stone-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-stone-300" />
            {post.date}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-200"></span>
          <span className="flex items-center gap-1">
            <User size={12} className="text-stone-300" />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <Link
          to={getBlogPostUrl(post.slug, post.createdAt)}
          className="block mb-3"
        >
          <h3 className="text-xl font-display font-semibold text-stone-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-stone-50">
            {post.tags.split(",").map((tag) => (
              <span
                key={tag.trim()}
                className="text-[10px] text-stone-500 bg-stone-50 hover:bg-stone-100 px-2 py-0.5 rounded transition-colors"
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
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-stone-900 transition-colors gap-1"
          >
            <span>Read Full Story</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};
