import { Button } from "../common/Button";
import { portfolioContent } from "../../data/content";
import { motion, type Variants } from "framer-motion";
import { portfolioData, type PortfolioItem } from "../../data/portfolioData";
import { Link } from "react-router-dom";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const PortfolioSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-12 md:py-24 px-4 md:px-0 bg-stripes-warm relative"
      id="portfolio"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary font-bold mb-4"
          >
            <span className="block w-8 h-px bg-primary" />
            Stories of Impact
            <span className="block w-8 h-px bg-primary" />
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display mb-6 text-accent"
          >
            <span className="text-gradient-eggplant">
              {portfolioContent.heading}
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            {portfolioContent.description}
          </motion.p>
          <div className="mt-8">
            <motion.div variants={itemVariants}>
              <Link to="/success-stories">
                <Button className="bg-primary text-white hover:bg-primary-dark border-none px-8 py-3">
                  See All Stories
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioData.slice(0, 3).map((item: PortfolioItem) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <Link to={`/success-stories/${item.id}`}>
                <div className="relative overflow-hidden aspect-4/5 mb-6 rounded-tl-3xl rounded-br-3xl">
                  <motion.img
                    src={item.heroImage}
                    alt={item.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-accent px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-tl-lg rounded-br-lg">
                    {item.services}
                  </div>
                </div>
                <h3 className="font-display text-2xl text-accent group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted mt-2 uppercase tracking-wide">
                  {item.location}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center" variants={itemVariants}>
          <Link to="/success-stories">
            <Button variant="primary">View All Stories</Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
