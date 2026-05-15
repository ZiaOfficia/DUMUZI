import { useState } from "react";
import { Menu, X, ChevronDown, Heart, Award, Users, GraduationCap } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { servicesData } from "../../data/servicesData";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const location = useLocation();

  // Smooth scroll interpolation
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(15, 15, 15, 1)", "rgba(15, 15, 15, 0.8)"]);
  const backdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(16px)"]);
  const paddingTop = useTransform(scrollY, [0, 100], ["1rem", "0.75rem"]);
  const paddingBottom = useTransform(scrollY, [0, 100], ["1rem", "0.75rem"]);
  const borderBottomColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "What We Do", path: "/services", hasDropdown: true },
    { name: "Gallery", path: "/gallery" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "News", path: "/blog" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter, // For Safari support
        paddingTop,
        paddingBottom,
        borderBottomColor,
        borderBottomWidth: "1px",
      }}
      className="sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/" className="flex items-center">
            <img
              src="/images/assets/aaghaz-logo.png"
              alt="Aaghaz Foundation — Educate, Empower"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-white/85">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.hasDropdown && setIsProgramsOpen(true)}
              onMouseLeave={() => link.hasDropdown && setIsProgramsOpen(false)}
            >
              <Link
                to={link.path}
                className={clsx(
                  "hover:text-secondary transition-colors duration-300 relative group flex items-center gap-1",
                  location.pathname === link.path && "text-secondary",
                )}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} />}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-secondary"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              {link.hasDropdown && (
                <AnimatePresence>
                  {isProgramsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72"
                    >
                      <div className="bg-accent border border-secondary/30 rounded-xl shadow-2xl overflow-hidden py-2">
                        {servicesData.map((service) => (
                          <Link
                            key={service.id}
                            to={`/services/${service.id}`}
                            className="block px-6 py-3 text-[10px] text-white/80 hover:text-secondary hover:bg-primary/15 transition-colors font-bold uppercase tracking-widest"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="text-xs uppercase tracking-widest font-bold text-white/85 hover:text-secondary transition-colors"
          >
            Volunteer
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-tl-2xl rounded-br-2xl shadow-md hover:shadow-lg"
          >
            <Heart size={14} fill="currentColor" />
            Donate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-accent border-t border-primary/30 overflow-y-auto shadow-lg"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <div className="flex flex-col space-y-4 p-6 text-sm font-medium uppercase tracking-widest text-white/90 pb-20">
              {navLinks.map((link, i) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-secondary transition-colors flex justify-between items-center py-2"
                    onClick={(e) => {
                      if (link.hasDropdown) {
                        e.preventDefault();
                        setIsProgramsOpen(!isProgramsOpen);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.name}
                    </motion.span>
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={clsx(
                          "transition-transform",
                          isProgramsOpen && "rotate-180",
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsProgramsOpen(!isProgramsOpen);
                        }}
                      />
                    )}
                  </Link>

                  {link.hasDropdown && isProgramsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-primary/10 rounded-lg overflow-hidden ml-4 mt-2"
                    >
                      {servicesData.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="block px-4 py-3 text-xs text-white/80 border-b border-white/10 last:border-none"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="bg-primary text-white px-6 py-3 text-center text-xs font-bold uppercase tracking-widest mt-4 block rounded-tl-2xl rounded-br-2xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Donate Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-secondary text-secondary px-6 py-3 text-center text-xs font-bold uppercase tracking-widest block rounded-tl-2xl rounded-br-2xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Volunteer With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
