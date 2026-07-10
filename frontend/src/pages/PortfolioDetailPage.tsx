import { useParams, Link, Navigate } from "react-router-dom";
import { SEO } from "../components/common/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { ArrowRight, MapPin, Calendar, X } from "lucide-react";
import { useState } from "react";
import { getOptimizedImage } from "../utils/imageUtils";
import { ContactSection } from "../components/sections/ContactSection";

export const PortfolioDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const portfolio = portfolioData.find((p) => p.id === id);

  if (!portfolio) {
    return <Navigate to="/gallery" replace />;
  }

  // Find other portfolios for "See More" section
  const otherPortfolios = portfolioData.filter((p) => p.id !== id);

  return (
    <div className="bg-stone-50 min-h-screen">
      <SEO
        title={`${portfolio.title} — DUMUZI`}
        description={`${portfolio.title} — a DUMUZI collection from ${portfolio.location}.`}
        image={portfolio.heroImage}
      />
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async"
            src={getOptimizedImage(portfolio.heroImage, 1920)}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20"
          >
            <span className="text-xs uppercase tracking-widest font-bold">
              {portfolio.services}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display mb-6"
          >
            {portfolio.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm md:text-base font-light tracking-wide"
          >
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              {portfolio.location}
            </div>
            <div className="hidden md:block w-px h-4 bg-white/40" />
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              {portfolio.date}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-gray-900 mb-8">
            How We Helped
          </h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
            {portfolio.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mixed Gallery */}
      <section className="py-20 px-4 md:px-12 bg-stone-100">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Video if exists - Takes 2 cols if possible or just 1 */}
            {portfolio.videoUrl && (
              <div className="md:col-span-2 aspect-video bg-black rounded-lg overflow-hidden shadow-lg relative group">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${portfolio.videoUrl}`}
                  title="DUMUZI Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {/* Images */}
            {portfolio.galleryImages
              .slice(0, portfolio.videoUrl ? 4 : 6)
              .map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer overflow-hidden rounded-lg shadow-md aspect-square relative group"
                  onClick={() => setSelectedImage(img)}
                >
                  <img loading="lazy" decoding="async"
                    src={getOptimizedImage(img, 800)}
                    alt={`${portfolio.title} ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
          </div>
          {portfolio.galleryImages.length > 4 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 italic">
                And many more moments captured...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Testimonial */}
      {portfolio.testimonial && (
        <section className="py-32 px-6 bg-stone-900 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-primary">★★★★★</div>
            <blockquote className="text-2xl md:text-4xl font-display leading-tight mb-8">
              "{portfolio.testimonial.quote}"
            </blockquote>
            <cite className="not-italic text-sm font-bold uppercase tracking-widest text-primary">
              - {portfolio.testimonial.author}
            </cite>
          </div>
        </section>
      )}

      {/* 5. More Weddings */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-display text-gray-900">
              Other Impact Stories
            </h3>
            <Link
              to="/gallery"
              className="text-primary hover:text-stone-900 text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherPortfolios.map((p) => (
              <Link key={p.id} to={`/portfolio/${p.id}`} className="group">
                <div className="aspect-3/4 overflow-hidden bg-gray-100 mb-4 relative">
                  <img loading="lazy" decoding="async"
                    src={getOptimizedImage(p.heroImage, 600)}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs uppercase tracking-widest block mb-1">
                      {p.services}
                    </span>
                    <span className="font-display text-xl">{p.location}</span>
                  </div>
                </div>
                <h4 className="text-xl font-display text-gray-900 group-hover:text-primary transition-colors">
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Lightbox */}
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
    </div>
  );
};
