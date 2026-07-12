import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { testimonialImages } from "../../data/imageAssets";

const GOLD = '#d4a373';
const GOLDL = '#e5c199';

interface Story {
  image: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  year: string;
}

const stories: Story[] = [
  {
    image: testimonialImages.connoisseur,
    quote:
      "The Noir Intense 85% is the finest dark chocolate I have ever tasted. It completely redefined what I thought chocolate could be. I now order a box every month.",
    author: "Isabella R.",
    role: "DUMUZI Connoisseur Subscriber",
    location: "London, UK",
    year: "Customer since 2022",
  },
  {
    image: testimonialImages.weddingCouple,
    quote:
      "We commissioned a bespoke chocolate collection for our wedding favours. Every guest commented on them. DUMUZI exceeded every expectation we had.",
    author: "James & Sophie T.",
    role: "Bespoke Wedding Commission",
    location: "Paris, France",
    year: "2024",
  },
  {
    image: testimonialImages.giftRecipient,
    quote:
      "The Rose & Cardamom truffle box was the most thoughtful gift I have ever received. The flavours were extraordinary — like nothing I had ever tasted before.",
    author: "Sophia M.",
    role: "Gift Box Customer",
    location: "New York, USA",
    year: "Customer since 2023",
  },
  {
    image: testimonialImages.masterclassGuest,
    quote:
      "Antoine's Tempering Masterclass was an incredible experience. I walked in as an enthusiastic amateur and left with the skills to produce professional-quality chocolate.",
    author: "Marcus W.",
    role: "Advanced Masterclass Participant",
    location: "Amsterdam, Netherlands",
    year: "Masterclass 2024",
  },
];

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % stories.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [isPaused]);

  const story = stories[index];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section
      className="relative py-12 md:py-28 px-4 md:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--choc-dark) 0%, var(--choc-deep) 100%)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient glows */}
      <span className="absolute -top-40 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10" style={{ background: GOLD }} />
      <span className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-8" style={{ background: GOLDL }} />

      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.25),transparent)' }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">Real Voices</div>
          <h2 className="font-luxury font-semibold mb-4 leading-tight"
            style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', color: 'var(--cream)', letterSpacing: '-0.01em' }}>
            What Our Customers Say
          </h2>
          <p className="max-w-xl mx-auto text-base font-sans"
            style={{ color: 'rgba(220,214,205,0.65)' }}>
            From connoisseurs and gift-givers to corporate clients — hear from the DUMUZI community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image side */}
          <div className="lg:col-span-5 relative">
            {/* Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-tl-[3rem] rounded-br-[3rem] pointer-events-none"
              style={{ border: `2px solid rgba(212,163,115,0.3)` }} />

            <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] shadow-2xl"
              style={{ border: '1px solid rgba(212,163,115,0.15)' }}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src={story.image}
                  alt={story.author}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Author overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                style={{ background: 'linear-gradient(to top, rgba(10,6,4,0.92) 0%, transparent 100%)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`label-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1"
                      style={{ color: GOLDL }}>
                      {story.role}
                    </p>
                    <p className="font-display text-2xl font-bold" style={{ color: 'var(--cream)' }}>
                      {story.author}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(220,214,205,0.6)' }}>
                      {story.location} · {story.year}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Quote side */}
          <div className="lg:col-span-7 relative">
            <Quote
              size={64}
              className="absolute -top-8 -left-2 pointer-events-none"
              fill={`rgba(212,163,115,0.1)`}
              style={{ color: 'rgba(212,163,115,0.1)' }}
            />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`quote-${index}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <p className="font-luxury text-xl md:text-3xl lg:text-[2.4rem] leading-relaxed italic mb-6 md:mb-8"
                  style={{ color: 'var(--cream)', fontWeight: 400, letterSpacing: '-0.005em', lineHeight: 1.5 }}>
                  &ldquo;{story.quote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between gap-6 pt-6"
              style={{ borderTop: '1px solid rgba(212,163,115,0.15)' }}>
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{ border: `2px solid rgba(212,163,115,0.4)`, color: GOLD, background: 'transparent' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = GOLD; el.style.color = 'var(--choc-deep)'; el.style.borderColor = GOLD; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = GOLD; el.style.borderColor = 'rgba(212,163,115,0.4)'; }}
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{ border: `2px solid rgba(212,163,115,0.4)`, color: GOLD, background: 'transparent' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = GOLD; el.style.color = 'var(--choc-deep)'; el.style.borderColor = GOLD; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = GOLD; el.style.borderColor = 'rgba(212,163,115,0.4)'; }}
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress */}
              <div className="flex-1 flex items-center gap-4 max-w-xs">
                <span className="font-display text-2xl font-bold" style={{ color: GOLD }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px relative overflow-hidden" style={{ background: 'rgba(212,163,115,0.15)' }}>
                  <motion.span
                    key={`bar-${index}-${isPaused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "30%" : "100%" }}
                    transition={{ duration: isPaused ? 0.3 : 7, ease: "linear" }}
                    className="absolute left-0 top-0 h-full"
                    style={{ background: GOLD }}
                  />
                </div>
                <span className="text-xs font-sans" style={{ color: 'rgba(212,163,115,0.45)' }}>
                  / {String(stories.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-5 flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className="h-1 rounded-full transition-all duration-500 cursor-pointer border-none"
                  style={{
                    background: i === index ? GOLD : 'rgba(212,163,115,0.25)',
                    width: i === index ? '3rem' : '1rem',
                  }}
                  aria-label={`Story ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
