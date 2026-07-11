import { motion } from "framer-motion";
import { Award, Heart, Calendar, ArrowRight, Sparkles, GraduationCap, HandCoins, Users, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import type { ServiceData } from "../../data/servicesData";

/**
 * Dynamic highlight component that shows different content based on the service
 * For memorial-scholarship: shows memorial scholarship content
 * For others: shows brief content about that service
 */
export const ServiceHighlight = ({ service }: { service: ServiceData }) => {
  // Special handling for memorial scholarship
  if (service.id === "memorial-scholarship") {
    return <MemorialScholarshipHighlight />;
  }

  // For other services, show service-specific highlight
  return <ServiceSpecificHighlight service={service} />;
};

const MemorialScholarshipHighlight = () => {
  return (
    <section className="relative py-12 md:py-20 px-4 md:px-6 bg-mesh-rose overflow-hidden">
      {/* Decorative ornaments */}
      <span className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <span className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      {/* Diamond ribbon */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="flex gap-2 -translate-y-1/2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`block w-2 h-2 rotate-45 ${
                i === 4
                  ? "bg-secondary"
                  : i === 3 || i === 5
                  ? "bg-primary"
                  : "bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto relative"
      >
        {/* Outer decorative double frame */}
        <div className="relative">
          <div className="absolute -inset-2 border-2 border-secondary/60 rounded-tl-[3rem] rounded-br-[3rem]" />
          <div className="absolute -inset-4 border border-primary/30 rounded-tl-[3.5rem] rounded-br-[3.5rem]" />

          {/* Main card */}
          <div className="relative bg-white rounded-tl-[3rem] rounded-br-[3rem] shadow-2xl overflow-hidden">
            {/* Top ribbon */}
            <div className="flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-primary via-primary-dark to-primary text-white">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
                DUMUZI — Bespoke Commission Program
              </span>
              <Sparkles size={14} className="text-secondary" />
            </div>

            <div className="p-6 md:p-10 lg:p-12">
              {/* Hero stat row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pb-10 border-b border-primary/10">
                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Award size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary leading-none">
                      80+
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Memorial scholarships across India
                    </p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-secondary text-accent flex items-center justify-center shadow-lg">
                    <Heart size={22} strokeWidth={1.8} fill="currentColor" />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-secondary-dark leading-none">
                      Rs 1 Crore
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Given every year
                    </p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                    <Calendar size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-accent leading-none">
                      30 Days
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Ramadan campaign · 30+ scholarships
                    </p>
                  </div>
                </div>
              </div>

              {/* Headline + lead */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7">
                  <p className="inline-flex items-center gap-3 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-4">
                    <span className="block w-8 h-px bg-primary" />
                    A Way to Remember
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent leading-tight mb-5">
                    Remember a loved one.{" "}
                    <span className="text-gradient-primary">
                      Help a child learn.
                    </span>
                  </h2>
                  <div className="space-y-4 text-text-muted leading-relaxed text-sm md:text-base">
                    <p>
                      DUMUZI runs{" "}
                      <strong className="text-accent">
                        more than 80 memorial scholarships
                      </strong>{" "}
                      in India. We give nearly{" "}
                      <strong className="text-accent">
                        Rs 1 crore every year
                      </strong>{" "}
                      to help hundreds of poor students. Many of these students are orphans or come from families struggling to pay for school.
                    </p>
                    <p>
                      We start many of these scholarships during our annual Ramadan campaign,{" "}
                      <strong className="text-primary italic">
                        &ldquo;30 Days | 30 Plus Scholarships&rdquo;
                      </strong>
                      . Families and donors fund them to remember their loved ones and support good students.
                    </p>
                  </div>
                </div>

                {/* Right column — quote-style block */}
                <div className="lg:col-span-5">
                  <div className="bg-mosaic-cream rounded-tl-3xl rounded-br-3xl p-6 md:p-8 border-l-4 border-primary relative">
                    <span className="absolute -top-4 -left-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-accent shadow-lg">
                      <Heart size={16} fill="currentColor" />
                    </span>
                    <p className="font-display text-secondary text-[10px] uppercase tracking-[0.4em] font-bold mb-3">
                      Memorial Scholarships
                    </p>
                    <p className="font-display text-base md:text-lg text-accent leading-relaxed italic mb-4">
                      &ldquo;Starting a scholarship is a beautiful way to remember someone special who has passed away.&rdquo;
                    </p>
                    <p className="text-text-muted text-sm leading-relaxed">
                      With our Memorial Scholarship Program, you can start a scholarship in the name of a loved one who has passed away. This helps poor students continue their education and keeps your loved one's memory alive through their success.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-10 pt-8 border-t border-primary/10">
                <Link
                  to="/services/memorial-scholarship"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Heart size={14} fill="currentColor" />
                  Start a Memorial Scholarship
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl transition-all duration-300"
                >
                  Talk to us
                </Link>
                <p className="text-xs text-text-muted italic flex items-center gap-2 ml-auto">
                  <span className="block w-6 h-px bg-secondary" />
                  Minimum amount per year: Rs 25,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ServiceSpecificHighlight = ({ service }: { service: ServiceData }) => {
  // Get appropriate icon for the service
  const getIcon = () => {
    switch (service.id) {
      case "student-aid":
        return <GraduationCap className="w-8 h-8 text-primary" />;
      case "scholarships":
        return <Award className="w-8 h-8 text-primary" />;
      case "financial-assistance":
        return <HandCoins className="w-8 h-8 text-primary" />;
      case "become-volunteer":
        return <Users className="w-8 h-8 text-primary" />;
      case "join-as-donor":
        return <Heart className="w-8 h-8 text-primary" />;
      case "launch-scholarship":
        return <Gift className="w-8 h-8 text-primary" />;
      default:
        return <GraduationCap className="w-8 h-8 text-primary" />;
    }
  };

  // Get brief description for the service
  const getBriefDescription = () => {
    switch (service.id) {
      case "student-aid":
        return "Need-based financial assistance for school and college students from underprivileged families. Covers tuition, books, uniforms, and hostel fees.";
      case "scholarships":
        return "Annual, merit-cum-means scholarships for students across India. Every scholarship is awarded after verified pre-scholarship surveys.";
      case "financial-assistance":
        return "Timely financial assistance for families facing unexpected crises. One-time or ongoing support to prevent educational disruption.";
      case "become-volunteer":
        return "Volunteer-driven organization with field surveys and mentorship. Join our network of dedicated volunteers across India.";
      case "join-as-donor":
        return "Join our donor community. Support specific programs or sponsor children end-to-end. 100% of donations go to student aid.";
      case "launch-scholarship":
        return "Honor loved ones by launching memorial scholarships. We co-design criteria and provide annual progress reports.";
      default:
        return service.intro.description[0] || "Learn more about this DUMUZI program.";
    }
  };

  return (
    <section className="relative py-12 md:py-20 px-4 md:px-6 bg-mesh-rose overflow-hidden">
      {/* Decorative ornaments */}
      <span className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <span className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      {/* Diamond ribbon */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="flex gap-2 -translate-y-1/2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`block w-2 h-2 rotate-45 ${
                i === 4
                  ? "bg-secondary"
                  : i === 3 || i === 5
                  ? "bg-primary"
                  : "bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto relative"
      >
        {/* Outer decorative double frame */}
        <div className="relative">
          <div className="absolute -inset-2 border-2 border-secondary/60 rounded-tl-[3rem] rounded-br-[3rem]" />
          <div className="absolute -inset-4 border border-primary/30 rounded-tl-[3.5rem] rounded-br-[3.5rem]" />

          {/* Main card */}
          <div className="relative bg-white rounded-tl-[3rem] rounded-br-[3rem] shadow-2xl overflow-hidden">
            {/* Top ribbon */}
            <div className="flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-primary via-primary-dark to-primary text-white">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">
                What We Do — {service.title}
              </span>
              <Sparkles size={14} className="text-secondary" />
            </div>

            <div className="p-6 md:p-10 lg:p-12">
              {/* Key Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-primary/10">
                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Award size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary leading-none">
                      80+
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Memorial Scholarships
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">Across India</p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-secondary text-accent flex items-center justify-center shadow-lg">
                    <Heart size={22} strokeWidth={1.8} fill="currentColor" />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-secondary-dark leading-none">
                      Rs 1 Crore
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Given every year
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">For education</p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                    <Users size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-accent leading-none">
                      1000+
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Students Supported
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">Annually</p>
                  </div>
                </div>

                <div className="text-center md:text-left flex items-center md:items-start gap-4">
                  <span className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-tl-2xl rounded-br-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <GraduationCap size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary leading-none">
                      6
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
                      Types of help
                    </p>
                    <p className="text-[9px] text-text-muted mt-1">For different needs</p>
                  </div>
                </div>
              </div>

              {/* Service icon and title */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white border border-primary/20 rounded-full shadow-sm">
                    {getIcon()}
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent leading-tight mb-5">
                  {service.title}
                </h2>
              </div>

              {/* Service description */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-mosaic-cream rounded-tl-3xl rounded-br-3xl p-6 md:p-8 border-l-4 border-primary relative">
                  <span className="absolute -top-4 -left-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-accent shadow-lg">
                    <Heart size={16} fill="currentColor" />
                  </span>
                  <p className="font-display text-secondary text-[10px] uppercase tracking-[0.4em] font-bold mb-3">
                    {service.title}
                  </p>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed">
                    {getBriefDescription()}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10 pt-8 border-t border-primary/10">
                <Link
                  to={`/services/${service.id}`}
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Learn More About {service.title}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-tl-2xl rounded-br-2xl transition-all duration-300"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};