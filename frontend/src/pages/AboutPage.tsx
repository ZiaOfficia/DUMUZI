import { useState, useEffect } from "react";
import { SEO } from "../components/common/SEO";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ClientsStrip } from "../components/sections/ClientsStrip";
import { ContactSection } from "../components/sections/ContactSection";
import { aboutContent } from "../data/content";
import NewsletterSection from "../components/sections/NewsletterSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const heroImages = [
  "/images/products/DUMUZI.jpeg",
  "/images/products/LF-D25T.jpeg",
  "/images/products/LF-H18D.jpeg",
  "/images/products/LF-BN9T.jpeg",
];

export const AboutPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const faqs = [
    {
      question: "When was DUMUZI founded?",
      answer:
        "DUMUZI Legacy Since 2013 was founded in 2013. It was merged with Little Fun Foods & Beverages Private Limited in 2026, growing from a small Indian brand into an online confectionery brand.",
    },
    {
      question: "Where do you source your ingredients?",
      answer:
        "We source single-origin organic ingredients directly from farming cooperatives in Madagascar, Ecuador, and Peru. We pay above fair-trade prices to ensure sustainable farming practices and to build long-term relationships with the communities we work with.",
    },
    {
      question: "What makes DUMUZI different from other luxury confectionery brands?",
      answer:
        "We never mass-produce. Every truffle, bar, and praline is crafted to order by our team of artisans. We use carefully selected ingredients and never add artificial preservatives, palm oil, or artificial flavourings.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes. We ship to over 30 countries using express temperature-controlled couriers. All orders are packed in insulated boxes with food-grade gel packs to ensure your confectionery arrives in perfect condition.",
    },
    {
      question: "Can I book a masterclass at your atelier?",
      answer:
        "Absolutely. We offer hands-on masterclasses for individuals, couples, corporate team-building groups, and private events. Sessions are led by Antoine Laurent or one of our senior confectioners. Booking is available on our website, and gift vouchers are available year-round.",
    },
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div style={{ background: 'var(--bg-deep)' }} className="min-h-screen">
      <SEO
        title="About DUMUZI"
        description="DUMUZI Legacy Since 2013 was founded in 2013. It was merged with Little Fun Foods & Beverages Private Limited in 2026."
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroSlide}
              src={heroImages[currentHeroSlide]}
              alt="DUMUZI Atelier"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-block border border-white/40 text-xs tracking-[0.3em] uppercase px-4 py-2 mb-6 backdrop-blur-md bg-white/10"
          >
            Legacy Since 2013
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display mb-8"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light tracking-wide max-w-3xl mx-auto opacity-95"
          >
            Crafting premium confectionery experiences since 2013.
          </motion.p>
        </div>
      </section>

      {/* Section 1: About DUMUZI */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center relative min-h-150">
          {/* Mobile Image */}
          <div className="w-full md:hidden mb-8">
            <img loading="lazy" decoding="async"
              alt="DUMUZI confectioners at work"
              className="w-full h-100 object-cover"
              src="/images/products/LF-D25B.jpeg"
            />
          </div>

          {/* Text Content */}
          <motion.div
            className="w-full md:w-3/5 z-10 md:pr-12"
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div
              className="glass-card p-8 md:p-16"
              style={{ borderLeft: '4px solid var(--gold)' }}
            >
              <motion.span
                variants={itemVariants}
                className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
              >
                Legacy Since 2013
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-6xl font-display text-cream mb-8 leading-tight"
              >
                {aboutContent.heading}
              </motion.h2>

              <div className="space-y-6 text-muted font-light text-lg leading-relaxed">
                {aboutContent.text.map((paragraph, index) => (
                  <motion.p key={index} variants={itemVariants}>
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-12 flex items-center gap-4"
              >
                <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
                <div>
                  <p className="font-display text-2xl text-cream">
                    {aboutContent.author.split("—")[0].trim()}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {aboutContent.author.split("—")[1]?.trim() || "Founder"}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Desktop Image */}
          <motion.div
            className="w-full md:w-1/2 absolute top-0 right-0 h-full hidden md:block z-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full absolute inset-0 -z-10" style={{ background: 'rgba(212,163,115,0.08)' }} />
            <img loading="lazy" decoding="async"
              alt="DUMUZI confectioners at work"
              className="w-full h-full object-cover opacity-95"
              src="/images/products/LF-D25B.jpeg"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Our Craft */}
      <section className="py-32 px-6 overflow-visible" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-7xl mx-auto relative lg:h-[800px] flex flex-col lg:flex-row items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="w-full lg:w-2/3 h-[500px] lg:h-full relative z-0"
          >
            <img loading="lazy" decoding="async"
              src="/images/products/LF-D15T.jpeg"
              alt="Master confectioner at work — DUMUZI"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="glass-card relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 p-12 lg:p-20 max-w-2xl z-10 lg:-ml-24 mt-[-80px] lg:mt-0"
          >
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-bold">
              Hand-Tempered · Single-Origin
            </h4>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-8">
              The DUMUZI standard of craft
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8 font-light">
              Every piece we make passes through the same four-step process: direct sourcing,
              slow roasting, hand tempering, and meticulous finishing. We never rush any stage,
              because great confectionery cannot be hurried.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 border-b pb-1 text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ color: 'var(--gold)', borderBottomColor: 'var(--gold)' }}
            >
              Talk to our team{" "}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Our Confectioners */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
            The People
          </span>
          <h2 className="text-5xl md:text-7xl font-display text-cream mb-6">
            Behind every confectionery creation, expert craftsmanship
          </h2>
          <div className="h-1 w-24 mx-auto" style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="flex flex-col" />
          <div className="flex flex-col md:mt-32" />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <section className="py-32 px-6" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-cream">
              Questions?
            </h2>
            <p className="text-muted font-light text-lg">
              Common questions about DUMUZI.
            </p>
          </div>

          <div className="divide-y divide-[rgba(212,163,115,0.2)]">
            {faqs.map((faq, index) => (
              <div key={index} className="py-8">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left font-display text-xl md:text-2xl text-cream hover:text-[#d4a373] transition-colors"
                >
                  <span className="pr-8">{faq.question}</span>
                  <span
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      transform:
                        activeAccordion === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <ChevronRight size={24} />
                  </span>
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-6 font-light text-muted text-lg leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <ClientsStrip />
      <ContactSection />
    </div>
  );
};
