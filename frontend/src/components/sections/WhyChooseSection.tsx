import { whyChooseContent } from "../../data/content";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Quote } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const WhyChooseSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-28 bg-texture-gold text-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0, transparent 38px, rgba(255,248,238,0.06) 38px, rgba(255,248,238,0.06) 40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-14"
        >
          <p className="inline-flex items-center gap-3 text-secondary text-xs font-bold uppercase tracking-[0.4em] mb-4">
            <span className="block w-8 h-px bg-secondary" />
            Why Trust Us?
            <span className="block w-8 h-px bg-secondary" />
          </p>
          <h2 className="text-4xl md:text-6xl font-display leading-tight">
            {whyChooseContent.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 bg-white/8 backdrop-blur-sm rounded-tl-3xl rounded-br-3xl border border-white/15 p-10 relative"
          >
            <Quote
              size={48}
              className="text-secondary absolute -top-4 -left-4 bg-accent p-2 rounded-full"
            />
            <h3 className="text-xl font-display tracking-wide border-b border-white/15 pb-5 mb-5 text-secondary uppercase">
              Our Promise
            </h3>
            <p className="text-lg italic leading-relaxed text-white/95 mb-6">
              {whyChooseContent.description}
            </p>
            <div className="h-px w-16 bg-secondary mb-4" />
            <p className="text-sm leading-relaxed text-white/85">
              {whyChooseContent.footer}
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="lg:col-span-7"
          >
            <h3 className="text-xl font-display tracking-wide pb-5 mb-6 text-secondary uppercase border-b border-white/15">
              Our five rules
            </h3>
            <ul className="space-y-5">
              {whyChooseContent.points.map((item, index) => (
                <li key={index} className="flex items-start gap-5 group">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur border-2 border-secondary/60 flex items-center justify-center font-display text-secondary text-lg font-bold transition-all duration-300 group-hover:bg-secondary group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-2">
                    <p className="text-base md:text-lg leading-relaxed">{item}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-secondary">
              <CheckCircle2 size={16} />
              Verified · Run by volunteers · Helping since 2004
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
