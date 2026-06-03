import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import { getOptimizedImage } from "../../utils/imageUtils";
import { instagramImages } from "../../data/imageAssets";

const postLikes = [245, 189, 312, 156, 278, 198];
const postComments = [12, 8, 24, 5, 18, 9];

const posts = instagramImages.map((image, i) => ({
  id: i + 1,
  image,
  likes: postLikes[i],
  comments: postComments[i],
}));

export const InstagramFeed = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 bg-stone-100 rounded-full mb-6"
          >
            <Instagram className="w-6 h-6 text-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display text-accent mb-4"
          >
            Follow us on Instagram
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-light text-lg mb-8"
          >
            @aaghazfoundation
          </motion.p>
          <motion.a
            href="https://www.instagram.com/aaghazfoundation"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-block px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-dark rounded-full transition-colors duration-300"
          >
            Visit profile
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/aaghazfoundation"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-square group overflow-hidden bg-gray-100"
            >
              <img loading="lazy" decoding="async"
                src={getOptimizedImage(post.image, 600)}
                alt={`Instagram Post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-white" />
                  <span className="font-bold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span className="font-bold">{post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
