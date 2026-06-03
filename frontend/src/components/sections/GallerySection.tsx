import { Button } from "../common/Button";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { galleryImages } from "../../data/imageAssets";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <motion.section
      id="gallery"
      className="py-12 md:py-24 px-4 md:px-6 bg-impact-pattern text-center relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.4em] mb-3"
        >
          <span className="block w-8 h-px bg-primary" />
          Photo Gallery
          <span className="block w-8 h-px bg-primary" />
        </motion.p>
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-3xl md:text-5xl font-display mb-3 mt-2 text-accent"
        >
          Pictures from our programs
        </motion.h2>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-text-muted max-w-xl mx-auto mb-10"
        >
          Real photos from our school visits, learning centers, and student meetings.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              layoutId={`gallery-image-${index}`}
              variants={itemVariants}
              className="overflow-hidden h-64 group relative cursor-pointer rounded-tl-2xl rounded-br-2xl"
              onClick={() => setSelectedImage(src)}
            >
              <img
                loading="lazy"
                decoding="async"
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 text-white hover:text-secondary transition-colors"
                aria-label="Close"
              >
                <X size={40} />
              </button>
              <motion.img
                layoutId={`gallery-image-${galleryImages.indexOf(selectedImage)}`}
                src={selectedImage}
                alt="Full screen"
                className="max-w-full max-h-[90vh] object-contain rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="mt-12"
        >
          <Link to="/gallery">
            <Button variant="primary">See All Photos</Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
