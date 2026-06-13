import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { faqs } from "../data/content";
import { Button } from "../components/common/Button";
import NewsletterSection from "../components/sections/NewsletterSection";
import { SEO } from "../components/common/SEO";

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-stone-950 min-h-screen text-stone-200">
      <SEO
        title="FAQs — DUMUZI Luxury Chocolates"
        description="Frequently asked questions about DUMUZI Luxury Chocolates — sourcing, delivery, corporate gifting, masterclasses, bespoke orders, and our subscription boxes."
      />
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 opacity-40">
          {/* Using a high-quality abstract or relevant background image */}
          <img loading="lazy" decoding="async"
            src="/images/products/LF-D25B.jpeg"
            alt="DUMUZI chocolate atelier"
            className="w-full h-full object-cover border-b-6 border-primary"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/15 border border-secondary/40 mb-8 backdrop-blur-md">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-secondary">
                Good to know
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight">
              Frequently Asked{" "}
              <span className="text-secondary italic font-serif">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
              Common questions about DUMUZI Luxury Chocolates — our sourcing, delivery, gifting, and masterclass programmes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "bg-stone-900 border-stone-700 shadow-xl shadow-black/50"
                    : "bg-stone-900/40 border-stone-800 hover:bg-stone-900 hover:border-stone-600 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left px-8 py-8 flex justify-between items-center focus:outline-none"
                >
                  <span
                    className={`font-display text-xl transition-colors duration-300 ${
                      openIndex === index
                        ? "text-primary-400"
                        : "text-stone-200"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                      openIndex === index
                        ? "bg-primary text-white rotate-180"
                        : "bg-stone-800 text-stone-400 group-hover:bg-primary/20 group-hover:text-primary-400"
                    }`}
                  >
                    <ChevronDown size={20} />
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 pt-0">
                        <div className="h-px w-full bg-stone-800 mb-6" />
                        <p className="text-gray-300 leading-relaxed text-lg font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-950 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-8 text-primary-400 shadow-sm border border-stone-800">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-4xl font-display text-white mb-6">
            Still have questions?
          </h2>
          <p className="text-gray-400 mb-10 text-lg font-light">
            Cannot find what you are looking for? Email us at{" "}
            <a
              href="mailto:hello@dumuzi.com"
              className="text-secondary hover:underline"
            >
              hello@dumuzi.com
            </a>{" "}
            — we read and answer every message.
          </p>
          <a href="/contact">
            <Button size="lg" icon={ArrowRight}>
              Contact Us
            </Button>
          </a>
        </div>
      </section>
      <section className="py-1 bg-stone-950 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
        <NewsletterSection />
      </section>
    </div>
  );
};
