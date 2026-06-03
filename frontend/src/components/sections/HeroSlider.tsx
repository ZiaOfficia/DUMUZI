import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { heroSlides } from "../../data/content";

export const HeroSlider = () => {
  const [[currentIndex, direction], setCurrent] = useState<[number, number]>([
    0, 1,
  ]);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (newIndex: number, dir: number) => {
    setCurrent([
      (newIndex + heroSlides.length) % heroSlides.length,
      dir,
    ]);
  };
  const nextSlide = () => goTo(currentIndex + 1, 1);
  const prevSlide = () => goTo(currentIndex - 1, -1);

  // Auto-slide (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    slideTimer.current = setInterval(() => {
      setCurrent(([idx]) => [(idx + 1) % heroSlides.length, 1]);
    }, 6500);
    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current);
    };
  }, [isPaused]);

  const current = heroSlides[currentIndex];

  // Slide transition (image slides horizontally)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0.9,
    }),
  };

  return (
    <section
      className="relative min-h-[85vh] md:min-h-0 md:h-[75vh] lg:h-[calc(100vh-88px)] w-full overflow-hidden bg-accent select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─── Sliding image carousel ─── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="sync">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.6 },
            }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            {/* Light directional overlay — image stays clearly visible */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(15,15,15,0.78) 0%, rgba(15,15,15,0.50) 35%, rgba(15,15,15,0.15) 65%, rgba(15,15,15,0.55) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Decorative diamond ribbon top ─── */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pointer-events-none">
        <div className="flex gap-2 -translate-y-1/2">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className={`block w-2 h-2 rotate-45 ${i === 5
                ? "bg-secondary"
                : i === 4 || i === 6
                  ? "bg-primary"
                  : "bg-white/40"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ─── Decorative corner brackets ─── */}
      <div className="absolute top-12 left-8 w-20 h-20 border-l-2 border-t-2 border-secondary/60 hidden md:block z-10" />
      <div className="absolute bottom-12 right-8 w-20 h-20 border-r-2 border-b-2 border-secondary/60 hidden md:block z-10" />

      {/* ─── Content overlay ─── */}
      <div className="absolute inset-0 z-10 flex items-center pb-24 sm:pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl text-white">
            {/* Animated title chip — only THIS changes with slides */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`chip-${currentIndex}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-6 px-4 py-2 rounded-full border border-secondary/70 bg-secondary/10 backdrop-blur-md text-secondary font-bold"
              >
                <span className="block w-2 h-2 rounded-full bg-secondary animate-pulse" />
                {current.title}
              </motion.span>
            </AnimatePresence>

            {/* Animated headline — fades + slides up */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-4 sm:mb-6 drop-shadow-2xl"
              >
                {current.subtitle}
              </motion.h1>
            </AnimatePresence>

            {/* Decorative double rule */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="h-px w-12 bg-secondary" />
              <span className="text-secondary text-lg">&#x2726;</span>
              <span className="h-px w-24 bg-secondary/50" />
            </div>

            {/* Static descriptive text */}
            <p className="text-sm sm:text-base md:text-xl text-gray-100 max-w-2xl mb-6 sm:mb-10 leading-relaxed drop-shadow-lg">
              Since 2004, Aaghaz Foundation has helped poor children go to school. We check every student's need through our volunteer surveys and send regular updates to our donors.
            </p>

            {/* ─── FIXED BUTTONS — only two, never change ─── */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-dark text-white px-6 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-sm uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Heart size={16} fill="currentColor" />
                Donate Now
                <span className="group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </button>
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 sm:gap-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-accent px-6 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-sm uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl transition-all duration-300"
              >
                Our Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Side arrows ─── */}
      <button
        onClick={prevSlide}
        className="group absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-secondary border border-white/20 hover:border-secondary text-white items-center justify-center backdrop-blur-md transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft
          size={24}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
      </button>
      <button
        onClick={nextSlide}
        className="group absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-secondary border border-white/20 hover:border-secondary text-white items-center justify-center backdrop-blur-md transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight
          size={24}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </button>

      {/* ─── Right vertical slide dots ─── */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
            className="group flex items-center gap-2"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`block transition-all duration-500 ${i === currentIndex
                ? "w-1 h-10 bg-secondary"
                : "w-1 h-3 bg-white/40 group-hover:bg-white/80 group-hover:h-5"
                }`}
            />
          </button>
        ))}
      </div>

      {/* ─── Bottom-left slide counter + progress ─── */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 md:left-12 z-20 flex items-center gap-2 sm:gap-4 text-white">
        <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-secondary">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="w-16 sm:w-24 md:w-32 h-px bg-white/20 relative overflow-hidden">
          <motion.span
            key={`bar-${currentIndex}-${isPaused}`}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "30%" : "100%" }}
            transition={{ duration: isPaused ? 0.4 : 6.5, ease: "linear" }}
            className="absolute left-0 top-0 h-full bg-secondary"
          />
        </div>
        <span className="text-[10px] sm:text-xs tracking-widest text-white/60">
          / {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>


    </section>
  );
};
