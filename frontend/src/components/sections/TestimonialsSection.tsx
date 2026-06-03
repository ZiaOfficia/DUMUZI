import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { testimonialImages } from "../../data/imageAssets";

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
    image: testimonialImages.studentSumaiya,
    quote:
      "I was going to leave school after Class 10 because we had no money for board fees. Aaghaz volunteers visited our home, and paid my fees within a week. Now I am studying in my second year of college.",
    author: "Sumaiya R.",
    role: "Aaghaz Scholarship Student",
    location: "Lucknow, UP",
    year: "Class of 2026",
  },
  {
    image: testimonialImages.donorFamily,
    quote:
      "We started a scholarship in our son's name. Knowing that students are finishing their studies in his memory has brought our family peace.",
    author: "The Khan Family",
    role: "Memorial Scholarship Donors",
    location: "Pune, MH",
    year: "Donor since 2019",
  },
  {
    image: testimonialImages.parentMother,
    quote:
      "We did not know there were organizations like this. The volunteers were very respectful and the process was simple. They treated my daughter with love and respect.",
    author: "Shahnaz Begum",
    role: "Mother of a student",
    location: "Hardoi, UP",
    year: "Family supported since 2022",
  },
  {
    image: testimonialImages.iitAlumnus,
    quote:
      "I had never heard of IIT before. Two years after taking the entrance test, I got admission in IIT Delhi. Aaghaz did not just pay my fees — they believed in me first.",
    author: "Mohammad Ayaan",
    role: "Aaghaz × Rahmani 30 Alumnus",
    location: "Now at IIT Delhi",
    year: "Class of 2024",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const story = stories[index];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section
      className="relative py-12 md:py-28 px-4 md:px-6 bg-mesh-rose overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="absolute -top-40 -left-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <span className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4">
            <span className="block w-8 h-px bg-primary" />
            Real Voices
            <span className="block w-8 h-px bg-primary" />
          </p>
          <h2 className="text-3xl md:text-6xl font-display font-bold text-accent mb-4 leading-tight">
            Stories from Our Students and Donors
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
            Read real stories from the students we support and the donors who help us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image side */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/40 rounded-tl-[3rem] rounded-br-[3rem]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] shadow-2xl">
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

              {/* Author label overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,15,15,0.92) 0%, transparent 100%)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`label-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-secondary text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
                      {story.role}
                    </p>
                    <p className="font-display text-2xl font-bold">
                      {story.author}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
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
              className="absolute -top-8 -left-2 text-primary/15"
              fill="currentColor"
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
                <p className="font-display text-xl md:text-3xl lg:text-4xl text-accent leading-relaxed italic mb-6 md:mb-8">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Controls and progress */}
            <div className="flex items-center justify-between gap-6 pt-6 border-t border-primary/15">
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Previous story"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Next story"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Slim progress + counter */}
              <div className="flex-1 flex items-center gap-4 max-w-xs">
                <span className="font-display text-2xl font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-primary/20 relative overflow-hidden">
                  <motion.span
                    key={`bar-${index}-${isPaused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "30%" : "100%" }}
                    transition={{ duration: isPaused ? 0.3 : 7, ease: "linear" }}
                    className="absolute left-0 top-0 h-full bg-primary"
                  />
                </div>
                <span className="text-xs text-text-muted">
                  / {String(stories.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Quick-jump dots */}
            <div className="mt-5 flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "bg-primary w-12" : "bg-primary/30 w-4 hover:bg-primary/60"
                  }`}
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
