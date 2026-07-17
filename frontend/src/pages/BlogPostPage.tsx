import { useParams, Link } from "react-router-dom";
import { SEO } from "../components/common/SEO";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Tag,
  Facebook,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { blogPosts as staticBlogPosts, type BlogPost, getBlogPostUrl } from "../data/blogData";
import { RelatedPosts } from "../components/blog/RelatedPosts";
import { HorizontalEnquiryForm } from "../components/common/HorizontalEnquiryForm";
import { ContactSection } from "../components/sections/ContactSection";

export const BlogPostPage = () => {
  const { slug } = useParams<{
    year?: string;
    month?: string;
    day?: string;
    slug: string;
  }>();
  const [post, setPost] = useState<
    | (BlogPost & {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string;
      })
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = () => {
      try {
        let cleanSlug = slug?.replace(/^\/+/, "") || "";
        const foundPost = staticBlogPosts.find((p) => p.slug === cleanSlug || p.slug === `/${cleanSlug}`);

        if (foundPost) {
          const formattedPost: BlogPost & {
            metaTitle?: string;
            metaDescription?: string;
            metaKeywords?: string;
          } = {
            id: foundPost.id,
            title: foundPost.title,
            slug: foundPost.slug,
            excerpt: foundPost.excerpt || "",
            content: (foundPost.content || "").replace(/\u00AD/g, ""), 
            createdAt: foundPost.createdAt || new Date().toISOString(),
            date: foundPost.date,
            author: foundPost.author,
            category: foundPost.category,
            image: foundPost.image,
            tags: foundPost.tags || "",
            metaTitle: foundPost.title,
            metaDescription: foundPost.excerpt || "",
            metaKeywords: "",
          };
          setPost(formattedPost);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error finding post:", error);
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-choc-deep section-rich">
        <h2 className="text-xl font-display text-muted animate-pulse">
          Loading...
        </h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-choc-deep section-rich">
        <SEO title="Article Not Found" />
        <h2 className="text-3xl font-display mb-4 text-cream">Story Not Found</h2>
        <Link to="/blog" className="text-gold hover:text-cream font-bold uppercase tracking-wider text-xs transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-24 min-h-screen relative bg-choc-deep section-rich">
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        keywords={post.metaKeywords}
        image={post.image}
        url={getBlogPostUrl(post.slug, post.createdAt)}
        type="article"
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[rgba(212,165,90,0.16)] z-50">
        <div
          className="h-full transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'var(--gold)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-12 text-center relative z-10 pt-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted mb-6 font-semibold uppercase tracking-wider">
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span className="text-[rgba(212,165,90,0.45)]">/</span>
          <Link to="/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          <span className="text-[rgba(212,165,90,0.45)]">/</span>
          <span className="text-cream truncate max-w-[200px]">
            {post.title}
          </span>
        </div>

        {/* Category Pill */}
        <span className="inline-block px-4 py-1.5 bg-[rgba(212,165,90,0.12)] border border-[rgba(212,165,90,0.24)] text-gold text-[10px] uppercase tracking-widest font-bold mb-6 rounded-full shadow-sm">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold text-cream leading-tight mb-8">
          {post.title}
        </h1>

        {/* Author / Date / Reading Time Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-muted text-sm font-medium border-t border-b border-[rgba(212,165,90,0.16)] py-5">
          <span className="flex items-center gap-2">
            <User size={16} className="text-gold" />
            <span className="text-cream">{post.author}</span>
          </span>
          <span className="w-1 h-1 bg-[rgba(212,165,90,0.35)] rounded-full hidden sm:block"></span>
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-gold" />
            <span>{post.date}</span>
          </span>
          <span className="w-1 h-1 bg-[rgba(212,165,90,0.35)] rounded-full hidden sm:block"></span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-gold" />
            <span>4 min read</span>
          </span>
        </div>
      </div>

      {/* Featured Img Cover */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full overflow-hidden rounded-2xl shadow-[var(--shadow-card)] border border-[rgba(212,165,90,0.18)] bg-choc-mid"
        >
          <img
            loading="lazy"
            decoding="async"
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[600px] object-contain bg-transparent mx-auto"
          />
        </motion.div>
      </div>

      {/* Main Prose Card container */}
      <div className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-3xl p-8 md:p-14 lg:p-16 border border-[rgba(212,165,90,0.16)]"
        >
          <article className="w-full">
            {/* HTML Content */}
            <div
              className="prose prose-lg prose-invert w-full max-w-none wrap-break-word [hyphens:none] [word-break:normal]
                          prose-headings:font-display prose-headings:font-semibold prose-headings:text-cream
                          prose-p:font-sans prose-p:text-muted prose-p:leading-loose prose-p:mb-6
                          prose-a:text-gold prose-a:font-medium prose-a:no-underline hover:prose-a:text-gold-light
                          prose-strong:font-bold prose-strong:text-cream
                          prose-ul:list-disc prose-ul:font-sans prose-ul:text-muted prose-ul:pl-6 prose-ul:ml-4 [&_ul]:list-disc [&_ul]:list-outside! [&_ul]:pl-6
                          prose-ol:list-decimal prose-ol:font-sans prose-ol:text-muted prose-ol:pl-6 prose-ol:ml-4 [&_ol]:list-decimal [&_ol]:list-outside! [&_ol]:pl-6
                          prose-li:marker:text-gold prose-li:my-2 [&_li]:list-item [&_li]:ml-4
                          prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:h-auto prose-img:my-10
                          [&_img]:my-10! [&_img]:block!
                          prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-[rgba(212,165,90,0.08)] prose-blockquote:py-5 prose-blockquote:px-8 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:font-display prose-blockquote:text-lg prose-blockquote:text-muted prose-blockquote:rounded-r-xl
                          **:max-w-full! **:min-w-0!
                          [&_iframe]:w-full [&_video]:w-full"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Social Share & Tags Block */}
            <div className="mt-12 pt-8 border-t border-[rgba(212,165,90,0.16)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-[rgba(220,214,205,0.75)] uppercase font-bold tracking-widest mr-2">
                    <Tag size={14} className="text-gold" /> Tags:
                  </div>
                  {(post.tags
                    ? post.tags
                        .split(",")
                        .map((t: string) => t.trim())
                        .filter(Boolean)
                    : [post.category]
                  ).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[rgba(212,165,90,0.08)] text-xs text-muted border border-[rgba(212,165,90,0.16)] rounded-lg hover:bg-[rgba(212,165,90,0.14)] transition-colors cursor-default font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Share buttons */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">Share this story:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href,
                          )}`,
                          "_blank",
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(24,119,242,0.14)] text-[#8ec5ff] hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={14} />
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            window.location.href,
                          )}&text=${encodeURIComponent(post.title)}`,
                          "_blank",
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(29,161,242,0.14)] text-[#89d3ff] hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={14} />
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                            window.location.href,
                          )}&title=${encodeURIComponent(post.title)}`,
                          "_blank",
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(10,102,194,0.14)] text-[#9ac6ff] hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm"
                      aria-label="Share on LinkedIn"
                    >
                      <span className="font-bold text-xs">in</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-4">
              <Link
                to="/blog"
                className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest hover:text-cream transition-colors gap-1.5 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> Back to Blog
              </Link>
            </div>
          </article>
        </motion.div>
      </div>

      {post && (
        <RelatedPosts currentPostId={post.id} category={post.category} />
      )}
      <HorizontalEnquiryForm />
      <ContactSection />
    </div>
  );
};
