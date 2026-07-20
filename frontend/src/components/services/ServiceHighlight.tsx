import { motion } from "framer-motion";
import { Award, Heart, ArrowRight, Sparkles, Gift, Users, Package, Leaf, Truck, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import type { ServiceData } from "../../data/servicesData";

/**
 * Highlight section for a collection/service detail page.
 * Shows brand stats, the collection's icon and a short description with CTAs.
 */
export const ServiceHighlight = ({ service }: { service: ServiceData }) => {
  // Icon per collection
  const getIcon = () => {
    switch (service.id) {
      case "dark-collection":
        return <Leaf className="w-8 h-8 text-primary" />;
      case "truffle-collection":
        return <Sparkles className="w-8 h-8 text-primary" />;
      case "gift-boxes":
        return <Gift className="w-8 h-8 text-primary" />;
      case "pralines-collection":
        return <Award className="w-8 h-8 text-primary" />;
      case "wedding-favors":
        return <Heart className="w-8 h-8 text-primary" />;
      case "corporate-gifting":
        return <Users className="w-8 h-8 text-primary" />;
      case "subscription-box":
        return <Truck className="w-8 h-8 text-primary" />;
      case "bespoke-orders":
        return <Package className="w-8 h-8 text-primary" />;
      case "masterclasses":
        return <ChefHat className="w-8 h-8 text-primary" />;
      default:
        return <Sparkles className="w-8 h-8 text-primary" />;
    }
  };

  const briefDescription =
    service.intro.description[0] ||
    "Discover this DUMUZI collection — handcrafted confections made in small batches from single-origin organic ingredients.";

  return (
    <section className="relative py-12 md:py-20 px-4 md:px-6 bg-mesh-rose overflow-hidden">
      {/* Decorative ornaments */}
      <span className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <span className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      {/* Diamond ribbon */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="flex gap-2 -translate-y-1/2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`block w-2 h-2 rotate-45 ${
                i === 4
                  ? "bg-secondary"
                  : i === 3 || i === 5
                  ? "bg-primary"
                  : "bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto relative"
      >
        {/* Outer decorative double frame */}
        <div className="relative">
          <div className="absolute -inset-2 border-2 border-secondary/60 rounded-tl-[3rem] rounded-br-[3rem]" />
          <div className="absolute -inset-4 border border-primary/30 rounded-tl-[3.5rem] rounded-br-[3.5rem]" />

          {/* Main card */}
          <div className="relative bg-white rounded-tl-[3rem] rounded-br-[3rem] shadow-2xl overflow-hidden">
            {/* Top ribbon */}
            <div className="flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-primary via-primary-dark to-primary text-white">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
                What We Make — {service.title}
              </span>
              <Sparkles size={14} className="text-secondary" />
            </div>

            <div className="p-6 md:p-10 lg:p-12">
              {/* Key Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-primary/10">
                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Leaf size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary leading-none">
                      100%
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Organic Ingredients
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">Ethically sourced</p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-secondary text-accent flex items-center justify-center shadow-lg">
                    <Award size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-secondary-dark leading-none">
                      3
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Single Origins
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">Madagascar · Ecuador · Peru</p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                    <ChefHat size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-accent leading-none">
                      Hand
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Tempered
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">In small batches</p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Gift size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary leading-none">
                      9
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Collections
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">For every occasion</p>
                  </div>
                </div>
              </div>

              {/* Collection icon and title */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white border border-primary/20 rounded-full shadow-sm">
                    {getIcon()}
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent leading-tight mb-5">
                  {service.title}
                </h2>
              </div>

              {/* Collection description */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-mosaic-cream rounded-tl-3xl rounded-br-3xl p-6 md:p-8 border-l-4 border-primary relative">
                  <span className="absolute -top-4 -left-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-accent shadow-lg">
                    <Heart size={16} fill="currentColor" />
                  </span>
                  <p className="font-display text-secondary text-[10px] uppercase tracking-[0.4em] font-bold mb-3">
                    {service.title}
                  </p>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed">
                    {briefDescription}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10 pt-8 border-t border-primary/10">
                <Link
                  to="/collections"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Shop the Collection
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl transition-all duration-300"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
