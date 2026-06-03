import { introContent } from "../../data/content";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const IntroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 bg-grain-dark text-white relative overflow-hidden">
      {/* Decorative diamond row at top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden">
        <div className="flex gap-4 -translate-y-1/2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`block w-3 h-3 rotate-45 ${
                i === 4
                  ? "bg-secondary"
                  : i === 3 || i === 5
                  ? "bg-primary"
                  : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side ornaments */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        <span className="block w-1 h-12 bg-primary/60" />
        <span className="block w-1 h-3 bg-secondary" />
        <span className="block w-1 h-12 bg-primary/60" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        <span className="block w-1 h-12 bg-primary/60" />
        <span className="block w-1 h-3 bg-secondary" />
        <span className="block w-1 h-12 bg-primary/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-secondary font-bold mb-6">
          <span className="block w-8 h-px bg-secondary" />
          Who We Are
          <span className="block w-8 h-px bg-secondary" />
        </p>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display leading-tight mb-4">
          <span className="text-gradient-primary">{introContent.heading}</span>
        </h1>
        <p className="italic text-secondary/90 text-sm md:text-base mb-10 tracking-wider">
          (First step. Then education. Then change.)
        </p>

        {introContent.text.map((paragraph, index) => (
          <p
            key={index}
            className="text-gray-200 max-w-2xl mx-auto leading-relaxed text-lg mb-6"
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={() => navigate("/about")}>
            Our Story
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/services")}>
            What We Do
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
