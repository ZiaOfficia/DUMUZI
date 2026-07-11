import { useState } from "react";
import { SEO } from "../components/common/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Image as ImageIcon } from "lucide-react";
import { ContactSection } from "../components/sections/ContactSection";

// DUMUZI — featured product showcase films
const videoGallery = [
  {
    id: "dQw4w9WgXcQ",
    title: "DUMUZI Signature Collection — Showcase",
    thumbnail: "/images/products/DUMUZI.jpeg",
    videoLength: "3:42",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Heart Collection — Crafting the Perfect Gift",
    thumbnail: "/images/products/LF-H18D.jpeg",
    videoLength: "2:15",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Bonbon Trios — Gold-Foil Wrapping Process",
    thumbnail: "/images/products/LF-BN9T.jpeg",
    videoLength: "1:48",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Display Trays — Behind the Arrangement",
    thumbnail: "/images/products/LF-D25T.jpeg",
    videoLength: "2:30",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "From Cocoa to Chocolate — The DUMUZI Story",
    thumbnail: "/images/products/LF-D15T.jpeg",
    videoLength: "1:55",
  },
];

// DUMUZI — gallery of all products
const imageGallery = [
  "/images/products/DUMUZI.jpeg",
  "/images/products/LF-H3.jpeg",
  "/images/products/LF - H5.jpeg",
  "/images/products/LF-H8B.jpeg",
  "/images/products/LF-H9P .jpeg",
  "/images/products/LF-H12T.jpeg",
  "/images/products/LF-H12B.jpeg",
  "/images/products/LF-H18B.jpeg",
  "/images/products/LF-H18D.jpeg",
  "/images/products/LF-D6.jpeg",
  "/images/products/LF-D9.jpeg",
  "/images/products/LF-D12.jpeg",
  "/images/products/LF-D15.jpeg",
  "/images/products/LF-D15T.jpeg",
  "/images/products/LF-D18T.jpeg",
  "/images/products/LF-D25.jpeg",
  "/images/products/LF-D25T.jpeg",
  "/images/products/LF- BN9.jpeg",
  "/images/products/LF-BN9T.jpeg",
  "/images/products/LF-O9.jpeg",
];

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="pt-[60px] md:pt-[50px] bg-white min-h-screen">
      <SEO
        title="Photo Gallery — DUMUZI"
        description="Photographs from the field — DUMUZI's scholarship students, the LCGC learning centre in Lucknow, Rahmani 30 cohort and volunteer work across India."
      />
      {/* Hero Section */}
      {/* ------------------- IMAGE GALLERY SECTION ------------------- */}

      {/* 1. Big Image Header for Images */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900 group">
        <div className="absolute inset-0 opacity-60 group-hover:opacity-50 transition-opacity duration-700">
          <img loading="lazy" decoding="async"
            src="/images/products/LF-D25B.jpeg"
            alt="DUMUZI Chocolate Gallery"
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/40 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <ImageIcon size={16} className="text-primary-300" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-100">
              Photography
            </span>
          </div> */}
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-widest text-shadow-lg">
            Photo Gallery
          </h2>
          <p className="mt-4 text-xl font-light text-stone-200 max-w-2xl mx-auto px-6">
            Photos from our work across India over the last 20 years.
          </p>
        </motion.div>
      </section>

      {/* Image Grid */}
      <section className="py-20 px-4 md:px-12 bg-white">
        <div className="max-w-8xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {imageGallery.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Gallery ${index}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 will-change-[opacity]">
                  <div className="p-4 bg-white/90 rounded-full border border-white/20 text-stone-900 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ImageIcon size={28} strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- VIDEO GALLERY SECTION ------------------- */}

      {/* 2. Big Image Header for Videos */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-stone-900 group border-t-8 border-primary/20">
        <div className="absolute inset-0 opacity-60 group-hover:opacity-50 transition-opacity duration-700">
          <img
            loading="lazy"
            decoding="async"
            src="/images/products/LF-D25T.jpeg"
            alt="Video gallery header — students at LCGC"
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/40 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Play
              size={16}
              className="text-secondary-300"
              fill="currentColor"
            />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-100">
              Cinematography
            </span>
          </div> */}
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-widest text-shadow-lg">
            Films &amp; Stories
          </h2>
          <p className="mt-4 text-xl font-light text-stone-200 max-w-2xl mx-auto px-6">
            Short videos about our students, volunteers, donors, and how DUMUZI works.
          </p>
        </motion.div>
      </section>

      {/* Video Grid */}
      <section className="py-20 px-4 md:px-12 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {videoGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
                onClick={() => setSelectedVideo(item.id)}
              >
                <div
                  className={`relative overflow-hidden cursor-pointer ${
                    index === 0
                      ? "aspect-video md:aspect-[21/9]"
                      : "aspect-video"
                  }`}
                >
                  <img loading="lazy" decoding="async"
                    src={item.thumbnail} // Placeholder thumbnail
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center pl-2 shadow-2xl group-hover:scale-110 transition-transform duration-300 text-stone-900">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge (Mock) */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {item.videoLength ||
                      (index === 0 ? "Highlight Reel" : "4:15")}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      DUMUZI Stories
                    </span>
                  </div>
                  <h3
                    className={`font-display mb-3 text-accent ${
                      index === 0 ? "text-3xl" : "text-xl"
                    }`}
                  >
                    {item.title || `DUMUZI Story ${index + 1}`}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                    A short video showing the difference your support makes.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- MODALS ------------------- */}

      {/* Image Modal */}
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
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              alt="Fullscreen"
              className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-5xl aspect-video bg-black rounded shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------- INQUIRY SECTION ------------------- */}
      <ContactSection />
    </div>
  );
};
