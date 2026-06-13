import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { BlogCard } from "../blog/BlogCard";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/blogData";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const BlogSection = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <motion.section
      id="blog"
      className="py-12 md:py-24 px-4 md:px-6 bg-mosaic-cream relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-secondary" />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <div>
            <motion.p
              variants={itemVariants}
              className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.4em] mb-3"
            >
              <span className="block w-8 h-px bg-primary" />
              News &amp; Stories
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-display text-accent"
            >
              Latest News &amp; Stories
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-text-muted mt-2 max-w-md"
            >
              Artisan guides, sourcing stories, and insights from the DUMUZI atelier.
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="hidden md:block">
            <Button
              variant="text"
              icon={ArrowRight}
              onClick={() => (window.location.href = "/blog")}
            >
              Read All Stories
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {recentPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <Link to="/blog">
            <Button variant="primary" icon={ArrowRight}>
              See All Stories
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
