import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gem,
  Gift,
  Heart,
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Sparkles,
  Package,
} from "lucide-react";
import { SEO } from "../components/common/SEO";
import NewsletterSection from "../components/sections/NewsletterSection";
import { useState } from "react";

export const ServicesPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the minimum order for corporate gifting?",
      answer:
        "Our corporate gifting program starts from 50 units. We offer competitive bulk pricing and dedicated account management for regular orders. Contact our corporate team for a personalised quote.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard UK delivery is 2–4 business days. International express delivery is 3–6 business days. All orders are shipped in temperature-controlled packaging to protect your confections.",
    },
    {
      question: "Can I customise the flavours in a gift box?",
      answer:
        "Yes. Our bespoke gift box service lets you hand-pick your preferred selection from our full collection. Simply contact us or use the 'Build Your Box' option at checkout.",
    },
    {
      question: "Do you offer masterclasses for corporate teams?",
      answer:
        "Absolutely. Our corporate masterclass is a popular team-building experience. Sessions are held in our atelier for groups of 8–20 people and can be fully customised. Contact us to discuss a bespoke brief.",
    },
    {
      question: "Are DUMUZI products suitable for gifting at weddings?",
      answer:
        "We specialise in bespoke wedding favours. From custom-molded confections with your initials to monogrammed packaging in your wedding colours, we create favours that double as beautiful table décor.",
    },
  ];

  const collections = [
    {
      id: "dark-collection",
      icon: <Gem className="w-8 h-8 text-primary" />,
      title: "Dark Confection Collection",
      description:
        "Single-origin dark confections and truffles from Madagascar, Ecuador, and Peru. From 72% to 92% intensity — bold, complex, and uncompromising.",
      features: [
        "Single-origin organic ingredients",
        "72% to 92% intensity levels",
        "Hand-tempered in our atelier",
        "No artificial additives",
      ],
      image: "/images/products/LF-D25B.jpeg",
    },
    {
      id: "truffle-collection",
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Truffle Collection",
      description:
        "Velvety ganache truffles handcrafted with organic cream and single-origin ingredients. Seasonal flavour infusions finished with 24k gold leaf, artisan dusting, or crushed nuts.",
      features: [
        "Hand-rolled — never moulded",
        "Seasonal botanical infusions",
        "24k edible gold leaf finish",
        "Fresh small-batch production",
      ],
      image: "/images/products/LF-BN9T.jpeg",
    },
    {
      id: "gift-boxes",
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Gift Boxes",
      description:
        "Elegantly curated assortments in our signature dark paper with gold-foil embossing and satin ribbon. Curated or fully bespoke — delivered in temperature-controlled packaging.",
      features: [
        "Gold-foil embossed signature box",
        "Curated or bespoke assortments",
        "Personalised handwritten card",
        "Temperature-controlled delivery",
      ],
      image: "/images/products/LF-H18D.jpeg",
    },
    {
      id: "pralines-collection",
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Pralines Collection",
      description:
        "Belgian-inspired pralines crafted in hand-polished copper moulds with the finest Piedmont hazelnut and Sicilian pistachio pastes.",
      features: [
        "Hand-polished copper molds",
        "Piedmont hazelnuts & Sicilian pistachios",
        "Mirror-gloss confection shells",
        "Rotating seasonal flavours",
      ],
      image: "/images/products/LF-D12.jpeg",
    },
    {
      id: "corporate-gifting",
      icon: <Package className="w-8 h-8 text-primary" />,
      title: "Corporate Gifting",
      description:
        "Premium corporate gift sets with custom branding, logo molding, and bulk order pricing. Trusted by leading luxury brands, hotels, and financial institutions.",
      features: [
        "Custom logo embossing & molding",
        "Dedicated account management",
        "From 50 units upward",
        "Seasonal corporate collections",
      ],
      image: "/images/products/LF-D25T.jpeg",
    },
    {
      id: "bespoke-orders",
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Bespoke Commissions",
      description:
        "Fully custom confectionery creations — from original flavour commissions to hand-painted bars and sculpted centrepieces for luxury events and venues.",
      features: [
        "Original flavour development",
        "Hand-painted artistic bars",
        "Sculpted confectionery centrepieces",
        "Venue & restaurant programmes",
      ],
      image: "/images/products/DUMUZI.jpeg",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="pt-[60px] md:pt-[50px]">
      <SEO
        title="Our Collections — DUMUZI"
        description="Explore DUMUZI's collections — single-origin dark bars, handcrafted truffles, pralines, gift boxes, corporate gifting, and bespoke commissions."
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            loading="lazy"
            decoding="async"
            src="/images/products/LF-D25T.jpeg"
            alt="DUMUZI confectionery collections"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#d4a373] text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            Our Collections
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display mb-6"
          >
            Handcrafted confections for every occasion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed"
          >
            From single-origin dark bars to bespoke wedding favours — every piece made by hand in our Paris atelier.
          </motion.p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display text-accent mb-8">
            One atelier. Many ways to indulge.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-12">
            Whether you are discovering single-origin confections for the first time, searching for the perfect luxury gift, or commissioning a bespoke confectionery experience for an event — DUMUZI has something extraordinary waiting for you.
          </p>
          <div className="w-24 h-px bg-secondary mx-auto" />
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-24 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <span className="w-3 h-3 bg-[#d4a373] rounded-full animate-pulse"></span>
              <span className="text-[#d4a373] text-sm font-bold uppercase tracking-widest">DUMUZI by the Numbers</span>
              <span className="w-3 h-3 bg-[#d4a373] rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6 leading-tight">
              Fifteen years of craft excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Award, value: "15+", label: "Years of Craft", sub: "Since 2009" },
              { icon: Gem, value: "3", label: "Sourcing Origins", sub: "Madagascar · Ecuador · Peru" },
              { icon: Gift, value: "30+", label: "Countries Shipping", sub: "Worldwide delivery" },
              { icon: Star, value: "100%", label: "Organic Ingredients", sub: "No artificial additives" },
            ].map(({ icon: Icon, value, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 rounded-2xl p-8 text-center border border-white/10"
              >
                <div className="w-16 h-16 bg-[#d4a373]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#d4a373]" />
                </div>
                <div className="text-3xl font-display font-bold text-[#d4a373] mb-2">{value}</div>
                <div className="text-sm text-white uppercase tracking-widest font-bold mb-1">{label}</div>
                <div className="text-xs text-white/50">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto space-y-32">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-primary transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="relative overflow-hidden aspect-[5/6] lg:aspect-[4/5]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="p-4 bg-white border border-primary/20 rounded-full shadow-sm">
                    {collection.icon}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-display text-accent mb-6">
                  {collection.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {collection.description}
                </p>
                <div className="bg-white p-8 border border-primary/10 shadow-sm relative">
                  <h4 className="font-display text-lg mb-4 text-accent">
                    What's included
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-left">
                    {collection.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to={`/services/${collection.id}`}
                    className="inline-flex items-center text-primary uppercase text-xs font-bold tracking-widest hover:text-accent transition-colors"
                  >
                    Explore {collection.title}{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bespoke Spotlight */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/10 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Featured Service</span>
              <Sparkles size={14} className="text-secondary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display text-accent mb-4">
              Bespoke Corporate Gifting
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              DUMUZI's corporate gifting program has been trusted by luxury hotels, financial institutions, and global brands across 30+ countries. From custom logo-embossed packaging to fully branded seasonal collections, we create confectionery gifts that make an unforgettable impression.
            </p>
            <Link
              to="/services/corporate-gifting"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 text-sm uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Corporate Gifting
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-white text-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-accent">
              FAQs
            </h2>
            <p className="text-gray-700 text-xl font-bold">
              Common questions about our collections
            </p>
            <p className="text-gray-500 font-light text-sm mt-2 max-w-2xl mx-auto">
              If you have a question not answered here, email us at{" "}
              <a
                href="mailto:hello@dumuzi.com"
                className="text-primary hover:underline"
              >
                hello@dumuzi.com
              </a>
              .
            </p>
          </div>

          <div className="divide-y divide-stone-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-8">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left font-display text-xl md:text-2xl hover:text-primary transition-colors"
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
                      <p className="pt-6 font-light text-gray-600 text-lg leading-relaxed max-w-2xl">
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
      <NewsletterSection />
    </div>
  );
};
