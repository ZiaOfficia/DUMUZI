import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BlogSidebar } from "../components/blog/BlogSidebar";
import { BlogCard } from "../components/blog/BlogCard";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts as staticBlogPosts, type BlogPost, getBlogPostUrl } from "../data/blogData";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Filter, X } from "lucide-react";
import { SEO } from "../components/common/SEO";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const BlogListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const pageParam = parseInt(searchParams.get("page") || "1");

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const itemsPerPage = 7; // Asymmetrical count works great with 1 featured + 6 grid cards

  const fetchPosts = useCallback((page: number, search: string, category: string) => {
    setLoading(true);

    let filteredPosts = staticBlogPosts;

    // Apply category filter if present
    if (category) {
      filteredPosts = filteredPosts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply search query filter if present
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower) ||
          (post.tags && post.tags.toLowerCase().includes(searchLower))
      );
    }

    const totalCount = filteredPosts.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

    setBlogPosts(paginatedPosts);
    setPagination({
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts(pageParam, searchQuery, categoryParam);
    window.scrollTo(0, 0);
  }, [pageParam, searchQuery, categoryParam, fetchPosts]);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }
    newParams.set("page", "1"); // Reset to page 1
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Compile list of unique categories dynamically
  const uniqueCategories = useMemo(() => {
    const cats = new Set(staticBlogPosts.map((post) => post.category));
    return Array.from(cats);
  }, []);

  // Show featured spotlight block only on page 1, when no search/filters are active
  const showFeatured = !searchQuery && !categoryParam && pageParam === 1 && blogPosts.length > 0;
  const featuredPost = showFeatured ? blogPosts[0] : null;
  const displayPosts = showFeatured ? blogPosts.slice(1) : blogPosts;

  // Generate page numbers for navigation
  const getVisiblePages = () => {
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="pt-24 md:pt-28 pb-24 px-4 md:px-6 bg-gradient-soft bg-impact-pattern min-h-screen">
      <SEO
        title="Aaghaz Foundation Journal - Stories of Impact"
        description="Explore our latest stories, success narratives, and updates on how Aaghaz Foundation is transforming lives through education."
      />

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles size={12} /> Our Journal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-semibold text-stone-900 tracking-tight mb-5"
          >
            Stories of Impact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 max-w-xl mx-auto leading-relaxed text-sm md:text-base font-light"
          >
            Follow the journeys of our scholars, understand our field operations, and read updates on our programs.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center items-center gap-2 mb-12"
        >
          <button
            onClick={() => handleCategoryChange("")}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm border ${
              !categoryParam
                ? "bg-primary text-white border-primary shadow-primary/20"
                : "bg-white text-stone-600 border-stone-200 hover:border-primary hover:text-primary"
            }`}
          >
            All Stories
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm border ${
                categoryParam.toLowerCase() === cat.toLowerCase()
                  ? "bg-primary text-white border-primary shadow-primary/20"
                  : "bg-white text-stone-600 border-stone-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Filter Details Box */}
        {(searchQuery || categoryParam) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-stone-150 mb-10 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 text-sm text-stone-700">
              <Filter size={16} className="text-primary" />
              <span>
                Showing results for
                {categoryParam && (
                  <span className="font-bold text-stone-900 ml-1">
                    Category: "{categoryParam}"
                  </span>
                )}
                {searchQuery && (
                  <span className="font-bold text-stone-900 ml-1">
                    Search: "{searchQuery}"
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary-dark font-bold uppercase tracking-wider transition-colors"
            >
              Clear Filters <X size={14} />
            </button>
          </motion.div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Main Articles Area */}
          <main className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-24 bg-white/60 rounded-3xl border border-stone-150">
                <p className="text-stone-500 text-sm font-semibold tracking-wide">Loading articles...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-24 bg-white/60 rounded-3xl border border-stone-150 px-6">
                <p className="text-stone-550 text-base font-semibold mb-4">No stories found</p>
                <p className="text-stone-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  We couldn't find any articles matching your filters. Try clearing your search or filters to see all stories.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
                >
                  Show All Stories
                </button>
              </div>
            ) : (
              <div>
                {/* Spotlight Featured Post Card */}
                {showFeatured && featuredPost && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-0 group"
                  >
                    <div className="md:col-span-7 overflow-hidden aspect-[16/10] md:aspect-auto relative min-h-[300px]">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-contain bg-stone-50 transition-transform duration-700 group-hover:scale-102"
                      />
                      <span className="absolute top-6 left-6 z-10 bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                        Spotlight Story
                      </span>
                    </div>
                    <div className="md:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-400 mb-4">
                          <span className="text-primary font-bold uppercase tracking-widest text-[10px]">
                            {featuredPost.category}
                          </span>
                          <span>•</span>
                          <span>{featuredPost.date}</span>
                        </div>
                        <Link to={getBlogPostUrl(featuredPost.slug, featuredPost.createdAt)}>
                          <h2 className="text-2xl lg:text-3xl font-display font-semibold text-stone-900 group-hover:text-primary transition-colors leading-tight mb-4">
                            {featuredPost.title}
                          </h2>
                        </Link>
                        <p className="text-stone-600 text-sm leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      <div>
                        <Link
                          to={getBlogPostUrl(featuredPost.slug, featuredPost.createdAt)}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-stone-900 transition-colors"
                        >
                          <span>Read Featured Story</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Sub-articles Feed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {displayPosts.map((post, idx) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && pagination.totalPages > 1 && (
              <div className="mt-12 md:mt-16 bg-white/40 border border-stone-150/55 rounded-2xl p-4 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  {/* Prev Button */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl border border-stone-250 bg-white text-stone-650 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-stone-250 disabled:hover:text-stone-650 transition-colors shadow-sm"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page List */}
                  <div className="flex items-center gap-1">
                    {getVisiblePages().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="w-8 h-9 flex items-center justify-center text-stone-400 text-sm font-semibold"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as number)}
                          className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold rounded-xl border transition-all ${
                            pagination.currentPage === page
                              ? "bg-primary text-white border-primary shadow-sm shadow-primary/25"
                              : "bg-white text-stone-700 border-stone-250 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl border border-stone-250 bg-white text-stone-650 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-stone-250 disabled:hover:text-stone-650 transition-colors shadow-sm"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-stone-450">
                  Page {pagination.currentPage} of {pagination.totalPages} — {pagination.totalCount} Articles
                </p>
              </div>
            )}
          </main>

          {/* Sticky Sidebar Area */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
