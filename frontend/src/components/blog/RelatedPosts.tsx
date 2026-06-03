import { useEffect, useState } from "react";
import { blogPosts as staticBlogPosts, type BlogPost } from "../../data/blogData";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentPostId: string | number;
  category: string;
}

export const RelatedPosts = ({
  currentPostId,
  category,
}: RelatedPostsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try fetching by category first
    let filteredPosts = staticBlogPosts.filter(
      (post) =>
        String(post.id) !== String(currentPostId) &&
        (category && post.category.toLowerCase() === category.toLowerCase())
    );

    // 2. If not enough posts, fetch recent posts as fallback
    if (filteredPosts.length < 3) {
      const fallbackArray = staticBlogPosts.filter(
        (p) =>
          String(p.id) !== String(currentPostId) &&
          !filteredPosts.find((fp) => fp.id === p.id)
      );

      filteredPosts = [...filteredPosts, ...fallbackArray];
    }

    setPosts(filteredPosts.slice(0, 3));
    setLoading(false);
  }, [category, currentPostId]);

  if (loading || posts.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl font-display text-gray-900 mb-8 border-l-4 border-primary pl-4">
          Related Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
