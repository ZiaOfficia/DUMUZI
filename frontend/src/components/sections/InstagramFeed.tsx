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
    <section className="py-12 md:py-24 px-4 md:px-6 overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 rounded-full mb-6"
            style={{ background: 'rgba(212,163,115,0.1)', border: '1px solid rgba(212,163,115,0.25)' }}
          >
            <Instagram className="w-6 h-6" style={{ color: '#d4a373' }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--cream)' }}
          >
            Follow the Craft
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm mb-8"
            style={{ color: 'rgba(212,163,115,0.55)' }}
          >
            @dumuzi_confections
          </motion.p>
          <motion.a
            href="https://www.instagram.com/dumuzi_confections"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-block px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg,#d4a373,#e5c199)',
              color: 'var(--bg-deep)',
              boxShadow: '0 8px 25px rgba(212,163,115,0.35)',
            }}
          >
            Visit Profile
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/dumuzi_confections"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-square group overflow-hidden"
              style={{ background: 'var(--bg-mid)' }}
            >
              <img loading="lazy" decoding="async"
                src={getOptimizedImage(post.image, 600)}
                alt={`Instagram Post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white" style={{ background: 'rgba(10,6,4,0.65)', backdropFilter: 'blur(4px)' }}>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" style={{ fill: '#d4a373', color: '#d4a373' }} />
                  <span className="font-bold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" style={{ fill: '#d4a373', color: '#d4a373' }} />
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
