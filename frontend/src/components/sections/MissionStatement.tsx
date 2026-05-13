import { useState } from "react";
import { BookOpen, Sparkles, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { missionImages } from "../../data/imageAssets";

const pillars = [
  {
    icon: BookOpen,
    word: "Educate",
    sub: "Open the door",
    body: "We pay verified school and college fees, supply books, uniforms, and exam fees, and partner with Rahmani 30 for free intensive coaching. No child loses an academic year because their family ran out of money.",
    accent: "from-primary/15 via-primary/5 to-transparent",
    iconBg: "bg-primary",
    image: missionImages.educate,
    link: "/services",
  },
  {
    icon: Sparkles,
    word: "Empower",
    sub: "Stand beside them",
    body: "Field volunteers visit every applicant in person. Mentors stay in touch through the academic year. The Lucknow Coaching &amp; Guidance Centre (LCGC) is the daily quiet room many of our students never had at home.",
    accent: "from-secondary/15 via-secondary/5 to-transparent",
    iconBg: "bg-secondary",
    image: missionImages.empower,
    link: "/success-stories",
  },
  {
    icon: TrendingUp,
    word: "Elevate",
    sub: "Watch them rise",
    body: "First-generation college graduates. IIT and NEET qualifiers from villages. Daughters who stayed in school instead of being married off. The numbers we share aren&apos;t targets — they&apos;re the names we&apos;ve called this morning.",
    accent: "from-accent/15 via-accent/5 to-transparent",
    iconBg: "bg-accent",
    image: missionImages.elevate,
    link: "/about",
  },
];

export const MissionStatement = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-12 md:py-24 px-4 md:px-6 bg-gradient-soft overflow-hidden">
      {/* Decorative arabesques */}
      <span className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <span className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4">
            <span className="block w-8 h-px bg-primary" />
            Why We Exist
            <span className="block w-8 h-px bg-primary" />
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-accent mb-4 leading-tight">
            Educate. Empower.
            <span className="text-gradient-primary"> Elevate.</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Three words on our logo. Three commitments we&apos;ve kept since
            2004. Here&apos;s what each one really means in practice.
          </p>
        </div>

        {/* Pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.word}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative"
              >
                {/* Offset shadow card */}
                <div className="absolute -inset-1 rounded-tl-[3rem] rounded-br-[3rem] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg, #E14060 0%, #F5811C 100%)"
                        : i === 1
                        ? "linear-gradient(135deg, #F5811C 0%, #0F0F0F 100%)"
                        : "linear-gradient(135deg, #0F0F0F 0%, #E14060 100%)",
                  }}
                />

                <div
                  className={`relative bg-white border border-primary/10 rounded-tl-[3rem] rounded-br-[3rem] h-full overflow-hidden transition-shadow duration-500 group-hover:shadow-2xl`}
                >
                  {/* Pillar image — interacts on hover */}
                  <div 
                    className="relative h-44 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(pillar.image)}
                  >
                    <img
                      src={pillar.image}
                      alt={pillar.word}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(135deg, rgba(225,64,96,0.65) 0%, rgba(225,64,96,0.25) 60%, transparent 100%)"
                            : i === 1
                            ? "linear-gradient(135deg, rgba(245,129,28,0.65) 0%, rgba(245,129,28,0.25) 60%, transparent 100%)"
                            : "linear-gradient(135deg, rgba(15,15,15,0.75) 0%, rgba(15,15,15,0.25) 60%, transparent 100%)",
                      }}
                    />
                    {/* Big number on the image */}
                    <span className="absolute top-3 right-5 font-display text-6xl font-black text-white/30 leading-none select-none">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Icon safely outside image container to prevent clipping */}
                  <div
                    className={`absolute top-[148px] left-7 w-14 h-14 ${pillar.iconBg} rounded-tl-2xl rounded-br-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 z-10`}
                  >
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <div className="relative p-8 pt-12 lg:p-10 lg:pt-14">
                  {/* Background gradient wash */}
                  <div
                    className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-radial ${pillar.accent} opacity-50 pointer-events-none`}
                  />

                  <p className="relative text-[10px] uppercase tracking-[0.4em] text-secondary font-bold mb-2">
                    {pillar.sub}
                  </p>
                  <h3 className="relative font-display text-3xl md:text-4xl font-bold text-accent mb-4">
                    {pillar.word}
                  </h3>
                  <p
                    className="relative text-text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: pillar.body }}
                  />

                  <Link 
                    to={pillar.link}
                    className="relative mt-6 pt-6 border-t border-primary/10 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:text-primary-dark transition-colors"
                  >
                    <span className="block w-6 h-px bg-primary group-hover:w-12 transition-all duration-500" />
                    What this looks like &rarr;
                  </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom signature line */}
        <div className="mt-16 flex items-center justify-center gap-3 text-text-muted text-sm">
          <span className="block w-12 h-px bg-secondary" />
          <span className="font-display italic">
            Pehla qadam. Phir taleem. Phir tabdeeli.
          </span>
          <span className="block w-12 h-px bg-secondary" />
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Mission preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
