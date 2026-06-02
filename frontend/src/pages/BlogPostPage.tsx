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
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-gradient-soft">
        <h2 className="text-xl font-display text-gray-500 animate-pulse">
          Loading Article...
        </h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-gradient-soft">
        <SEO title="Article Not Found" />
        <h2 className="text-3xl font-display mb-4 text-stone-850">Article Not Found</h2>
        <Link to="/blog" className="text-primary hover:underline font-bold uppercase tracking-wider text-xs">
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-24 bg-gradient-soft bg-impact-pattern min-h-screen relative">
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        keywords={post.metaKeywords}
        image={post.image}
        url={getBlogPostUrl(post.slug, post.createdAt)}
        type="article"
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200/40 z-50">
        <div
          className="h-full bg-primary transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-12 text-center relative z-10 pt-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500 mb-6 font-semibold uppercase tracking-wider">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-stone-300">/</span>
          <Link to="/blog" className="hover:text-primary transition-colors">
            Journal
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 truncate max-w-[200px]">
            {post.title}
          </span>
        </div>

        {/* Category Pill */}
        <span className="inline-block px-4 py-1.5 bg-white border border-stone-200 text-primary text-[10px] uppercase tracking-widest font-bold mb-6 rounded-full shadow-sm">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 leading-tight mb-8">
          {post.title}
        </h1>

        {/* Author / Date / Reading Time Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-stone-500 text-sm font-medium border-t border-b border-stone-200/60 py-5">
          <span className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span className="text-stone-900">{post.author}</span>
          </span>
          <span className="w-1 h-1 bg-stone-300 rounded-full hidden sm:block"></span>
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span>{post.date}</span>
          </span>
          <span className="w-1 h-1 bg-stone-300 rounded-full hidden sm:block"></span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
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
          className="w-full overflow-hidden rounded-2xl shadow-md border border-stone-200/50"
        >
          <img
            loading="lazy"
            decoding="async"
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[600px] object-contain bg-stone-50 mx-auto"
          />
        </motion.div>
      </div>

      {/* Main Prose Card container */}
      <div className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-3xl p-8 md:p-14 lg:p-16 border border-stone-150 shadow-sm"
        >
          <article className="w-full">
            {/* HTML Content */}
            <div
              className="prose prose-lg prose-stone w-full max-w-none wrap-break-word [hyphens:none] [word-break:normal]
                          prose-headings:font-display prose-headings:font-semibold prose-headings:text-stone-900
                          prose-p:font-sans prose-p:text-stone-700 prose-p:leading-loose prose-p:mb-6
                          prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                          prose-strong:font-bold prose-strong:text-stone-900
                          prose-ul:list-disc prose-ul:font-sans prose-ul:text-stone-700 prose-ul:pl-6 prose-ul:ml-4 [&_ul]:list-disc [&_ul]:list-outside! [&_ul]:pl-6
                          prose-ol:list-decimal prose-ol:font-sans prose-ol:text-stone-700 prose-ol:pl-6 prose-ol:ml-4 [&_ol]:list-decimal [&_ol]:list-outside! [&_ol]:pl-6
                          prose-li:marker:text-primary prose-li:my-2 [&_li]:list-item [&_li]:ml-4
                          prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:h-auto prose-img:my-10
                          [&_img]:my-10! [&_img]:block!
                          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-stone-50 prose-blockquote:py-5 prose-blockquote:px-8 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:font-display prose-blockquote:text-lg prose-blockquote:text-stone-855 prose-blockquote:rounded-r-xl
                          **:max-w-full! **:min-w-0!
                          [&_iframe]:w-full [&_video]:w-full"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Social Share & Tags Block */}
            <div className="mt-12 pt-8 border-t border-stone-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 uppercase font-bold tracking-widest mr-2">
                    <Tag size={14} /> Tags:
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
                      className="px-3 py-1 bg-stone-50 text-xs text-stone-600 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors cursor-default font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Share buttons */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">Share Story:</span>
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
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
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
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm"
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
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm"
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
                className="inline-flex items-center text-primary text-xs font-bold uppercase tracking-widest hover:text-stone-900 transition-colors gap-1.5 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> Back to Journal
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
