import { services } from "../../data/content";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const ServicesGrid = () => {
  return (
    <motion.section
      id="services"
      className="py-12 md:py-24 px-4 md:px-6 bg-mosaic-cream relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4"
          >
            <span className="block w-8 h-px bg-primary" />
            What We Do
            <span className="block w-8 h-px bg-primary" />
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-display text-accent mb-3"
          >
            Our Programs
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-sm md:text-base text-text-muted max-w-2xl mx-auto"
          >
            Whether you donate money or give your time, you can help us. All our programs have one goal: to keep poor children in school.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="divider-arabesque max-w-md mx-auto mt-8"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative h-80 md:h-[26rem] overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <Link to={`/services/${service.id}`} className="block w-full h-full">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,15,15,0.95) 0%, rgba(189,42,72,0.55) 50%, rgba(225,64,96,0.10) 100%)",
                    }}
                  />
                  <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/0 group-hover:bg-secondary flex items-center justify-center text-white transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                  <span className="absolute top-4 left-4 text-secondary font-display text-2xl italic">
                    0{index + 1}
                  </span>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h4 className="font-display text-xl md:text-2xl mb-3 group-hover:text-secondary transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 leading-relaxed text-gray-100 line-clamp-4">
                      {service.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
                      <span className="block w-6 h-px bg-secondary group-hover:w-12 transition-all duration-500" />
                      Learn more
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
