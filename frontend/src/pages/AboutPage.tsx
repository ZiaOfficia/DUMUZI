import { useState, useEffect } from "react";
import { SEO } from "../components/common/SEO";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
// import { FeaturedInStrip } from "../components/sections/FeaturedInStrip";
import { ClientsStrip } from "../components/sections/ClientsStrip";
import { ContactSection } from "../components/sections/ContactSection";
// import { AboutSection } from "../components/sections/AboutSection";
import { aboutContent } from "../data/content";
import NewsletterSection from "../components/sections/NewsletterSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const heroImages = [
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
];

export const AboutPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const faqs = [
    {
      question: "When was Aaghaz Foundation started?",
      answer:
        "Aaghaz Foundation was started in 2004 by journalist Mazhar Farooqui and his friends in Lucknow. They started with just Rs 2,000 to help one poor student. We have been helping kids study ever since.",
    },
    {
      question: "Where is Aaghaz based and where do you work?",
      answer:
        "Our main office is in Lucknow, Uttar Pradesh. We work mostly in Uttar Pradesh, but we help poor students all over India. We also have volunteers in Delhi NCR, Mumbai, Pune, Bihar, and other big cities.",
    },
    {
      question: "How do you check if a student really needs help?",
      answer:
        "At least two volunteers visit the student's home and school in person. They check the family's income and the child's school marks to make sure they really need help. We only support verified students.",
    },
    {
      question: "Do I get a tax benefit if I donate to Aaghaz?",
      answer:
        "Yes. Aaghaz Foundation is a registered charity. Donors in India get tax deduction benefits under Section 80G of the Income Tax Act. We send donation receipts within 7 days.",
    },
    {
      question: "How can I help Aaghaz other than donating money?",
      answer:
        "You can join us as a volunteer. You can help by visiting student homes for checking details, or help online with computer work, writing stories, or teaching students. If you have two hours a week, visit our Become a Volunteer page.",
    },
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <SEO
        title="About Us — Aaghaz Foundation"
        description="Aaghaz Foundation is a non-profit founded in 2004 in Lucknow. We support meritorious students from economically weak backgrounds across India through scholarships, financial aid, mentorship and learning centres."
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroSlide}
              src={heroImages[currentHeroSlide]}
              alt="About Hero"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-block border border-white/40 text-xs tracking-[0.3em] uppercase px-4 py-2 mb-6 backdrop-blur-md bg-white/10"
          >
            Since 2004 · Lucknow
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display mb-8"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light tracking-wide max-w-3xl mx-auto opacity-95"
          >
            Helping children study to build a better future.
          </motion.p>
        </div>
      </section>

      {/* Section 1: About Aaghaz Foundation */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center relative min-h-150">
          {/* Mobile Image Fallback - Shown First on Mobile */}
          <div className="w-full md:hidden mb-8">
            <img loading="lazy" decoding="async"
              alt="Children studying — Aaghaz Foundation"
              className="w-full h-100 object-cover"
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
            />
          </div>

          {/* Text Content */}
          <motion.div
            className="w-full md:w-3/5 z-10 md:pr-12"
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="bg-white p-8 md:p-16 shadow-xl border-l-4 border-primary">
              <motion.span
                variants={itemVariants}
                className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
              >
                Founded 2004 · Lucknow
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-6xl font-display text-accent mb-8 leading-tight"
              >
                {aboutContent.heading}
              </motion.h2>

              <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
                {aboutContent.text.map((paragraph, index) => (
                  <motion.p key={index} variants={itemVariants}>
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-12 flex items-center gap-4"
              >
                <div className="h-px w-12 bg-secondary" />
                <div>
                  <p className="font-display text-2xl text-accent">
                    {aboutContent.author.split("—")[0].trim()}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    {aboutContent.author.split("—")[1]?.trim() || "Founder"}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Abstract Image Composition - Desktop Only */}
          <motion.div
            className="w-full md:w-1/2 absolute top-0 right-0 h-full hidden md:block z-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Removed the offset background box to prevent overflow */}
            <div className="w-full h-full bg-primary/10 absolute inset-0 -z-10" />
            <img loading="lazy" decoding="async"
              alt="Children studying — Aaghaz Foundation"
              className="w-full h-full object-cover opacity-95"
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Consultation - Overlapping Layout */}
      <section className="py-32 px-6 bg-stone-100 text-stone-900 overflow-visible">
        <div className="max-w-7xl mx-auto relative lg:h-[800px] flex flex-col lg:flex-row items-center">
          {/* Image Container - takes up 60% approx */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="w-full lg:w-2/3 h-[500px] lg:h-full relative z-0"
          >
            <img loading="lazy" decoding="async"
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1600&q=80"
              alt="Volunteers in conversation — Aaghaz Foundation"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          {/* Text Container - Overlapping */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 bg-white p-12 lg:p-20 max-w-2xl shadow-2xl z-10 lg:-ml-24 mt-[-80px] lg:mt-0"
          >
            <h4 className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold">
              Volunteer-Driven · Verified
            </h4>
            <h2 className="text-4xl md:text-5xl font-display text-accent mb-8">
              How we work — and why it works
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
              We do not give help just by looking at forms. When someone recommends
              a student who needs help with fees, at least two volunteers visit
              their home and school in person. We only help the student when both
              volunteers confirm they really need it. This personal check is the key
              to our work.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 text-accent border-b border-accent pb-1 text-xs font-bold uppercase tracking-widest hover:text-primary hover:border-primary transition-colors"
            >
              Talk to our team{" "}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Section 3: People behind Aaghaz */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
            The People
          </span>
          <h2 className="text-5xl md:text-7xl font-display text-accent mb-6">
            Behind every story, a team
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Founder */}
          <div className="flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="mb-8 relative"
            >
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1559548331-f9cb98280344?auto=format&fit=crop&w=900&q=80"
                alt="Mazhar Farooqui — Founder"
                className="w-full h-[480px] object-cover transition-all duration-1000 ease-out"
              />
            </motion.div>
            <div className="text-left px-4">
              <h3 className="text-4xl font-display text-accent mb-2">
                Mazhar Farooqui
              </h3>
              <p className="text-primary font-serif italic text-lg mb-6">
                Founder &amp; Trustee
              </p>
              <p className="text-gray-600 font-light leading-relaxed">
                Mazhar is a senior journalist who started Aaghaz in 2004 with just
                Rs 2,000 to help one poor student. Even today, he personally reads
                the home visit reports and approves the help. He believes Aaghaz
                has run for 20 years because of our kind donors, teachers, and volunteers.
              </p>
            </div>
          </div>

          {/* Volunteer Lead */}
          <div className="flex flex-col md:mt-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="mb-8 relative"
            >
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                alt="Volunteer Coordinator — Aaghaz Foundation"
                className="w-full h-[480px] object-cover transition-all duration-1000 ease-out"
              />
            </motion.div>
            <div className="text-left px-4">
              <h3 className="text-4xl font-display text-accent mb-2">
                Our Volunteer Network
              </h3>
              <p className="text-primary font-serif italic text-lg mb-6">
                300+ Volunteers across India
              </p>
              <p className="text-gray-600 font-light leading-relaxed">
                Aaghaz runs entirely because of volunteers. Our volunteers visit homes,
                teach students, and manage our study center daily. Many of our old students
                now work as volunteers to teach others. If you want to help, fill the form
                on our Become a Volunteer page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Slider */}
      <TestimonialsSection />

      {/* FAQ Section - Clean Minimal */}
      <section className="py-32 px-6 bg-white text-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-accent">
              Questions?
            </h2>
            <p className="text-gray-600 font-light text-lg">
              Find answers to common questions about Aaghaz Foundation.
            </p>
          </div>

          <div className="divide-y divide-stone-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-8">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left font-display text-xl md:text-2xl hover:text-[#8ca18e] transition-colors"
                >
                  <span className="pr-8">{faq.question}</span>
                  <span
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      transform:
                        activeAccordion === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <ChevronRight size={24} />
                  </span>
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-6 font-light text-gray-600 text-lg leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <ClientsStrip />
      <ContactSection />
    </div>
  );
};
