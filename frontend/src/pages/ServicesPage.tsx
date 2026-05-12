import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  HandCoins,
  Heart,
  ArrowRight,
  ChevronRight,
  Users,
  Award,
  Gift,
} from "lucide-react";
import { SEO } from "../components/common/SEO";
import NewsletterSection from "../components/sections/NewsletterSection";
import { useState } from "react";

export const ServicesPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does Aaghaz decide who gets help?",
      answer:
        "Every recommended student is verified through an in-person pre-scholarship survey by at least two volunteers. Only after both reports agree do we onboard the student. We do not run a generic application form — every case is real, met and documented.",
    },
    {
      question: "Are donations tax-exempt?",
      answer:
        "Yes. Aaghaz Foundation is a registered non-profit and donations made by Indian residents are eligible for tax exemption under Section 80G of the Income Tax Act. Receipts are issued within seven working days of every donation.",
    },
    {
      question: "Can I direct my donation to a specific programme?",
      answer:
        "Absolutely. You can earmark your contribution to Student Aid or a memorial scholarship in someone's name — and we will report back specifically on that programme.",
    },
    {
      question: "How do I become a volunteer?",
      answer:
        "Use the Become a Volunteer page to register your interest. A team member will reach out within a few working days to understand your availability and city, walk you through orientation, and pair you with an experienced volunteer for your first survey or mentee.",
    },
    {
      question: "How do I apply for student aid for myself or my child?",
      answer:
        "Use the Apply for Student Aid form on our website. We cover school fees, college tuition, exam fees, books, uniforms and hostel for verified low-income families. Our volunteer team will reach out to schedule a survey, usually within a week.",
    },
  ];

  const programs = [
    {
      id: "student-aid",
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Student Aid",
      description:
        "Need-based financial assistance for school and college students from underprivileged families across India. Tuition, books, exam fees, uniforms — whatever stands between a child and the next class.",
      features: [
        "School &amp; exam fees",
        "College &amp; university tuition",
        "Books, uniforms &amp; stationery",
        "Hostel & daily living support",
      ],
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "scholarships",
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Scholarships",
      description:
        "Annual, merit-cum-means and memorial scholarships for students across India. Every scholarship is awarded after a verified pre-scholarship survey, and donors receive an annual report on the students their contribution has supported.",
      features: [
        "Memorial scholarships",
        "Annual general scholarship pool",
        "Corporate / CSR-funded cohorts",
        "Subject-specific awards (girls in STEM, civil services)",
      ],
      image:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "financial-assistance",
      icon: <HandCoins className="w-8 h-8 text-primary" />,
      title: "Financial Assistance",
      description:
        "Sometimes a family is doing everything right and is still one missed fee instalment away from a child dropping out. We provide timely financial assistance — sometimes a one-time intervention, sometimes ongoing year-on-year.",
      features: [
        "Last-minute fee crises",
        "Loss of an earning parent",
        "Medical emergencies that derail education",
        "Recurring monthly support",
      ],
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "become-volunteer",
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Become a Volunteer",
      description:
        "Aaghaz is a volunteer-driven organisation. If you have two free hours a week and a willingness to listen, you can change a life. We need volunteers in cities and small towns across India — especially in UP, Bihar, Maharashtra and the NCR.",
      features: [
        "Pre-scholarship field surveys",
        "Online mentorship",
        "Communications &amp; content",
        "Fundraising lead",
      ],
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "join-as-donor",
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Join us as Donor",
      description:
        "Join the Aaghaz donor base by registering with us. A team member will get in touch with you to walk you through the kind of support you'd like to provide and answer any questions you may have. 100% of your donation goes towards student aid.",
      features: [
        "One-time or monthly giving",
        "Sponsor a child end-to-end",
        "80G tax-exemption receipts",
        "Annual progress reports",
      ],
      image:
        "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "launch-scholarship",
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Launch Scholarship",
      description:
        "Honour someone you love. Many of our donors choose to support Aaghaz by launching a scholarship in the name of a parent, sibling, teacher or friend. We co-design the criteria with you and report annually on the students it has supported.",
      features: [
        "Single-year, single-student tributes",
        "Three-year cohort scholarships",
        "Annual rolling cohorts in perpetuity",
        "Subject or region-specific awards",
      ],
      image:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="pt-[60px] md:pt-[50px]">
      <SEO
        title="What We Do — Aaghaz Foundation Programs"
        description="Explore Aaghaz Foundation's programs — Student Aid, Scholarships, Financial Assistance, and ways for you to donate or volunteer."
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            loading="lazy"
            decoding="async"
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1920&q=80"
            alt="Children studying — Aaghaz Foundation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-accent/60" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-secondary text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            What We Do
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display mb-6"
          >
            Programs that change a child's trajectory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/95 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Verified scholarships, free coaching centres and the volunteer
            network that keeps it all honest.
          </motion.p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display text-accent mb-8">
            One foundation. Many on-ramps.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-12">
            Whether you are a student looking for financial help, a donor who
            wants to invest in a child's future, a volunteer with a few hours
            each week, or a company looking for a meaningful CSR partnership —
            there is a way in. Browse the programs below to find yours.
          </p>
          <div className="w-24 h-px bg-secondary mx-auto" />
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto space-y-32">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-primary transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="relative overflow-hidden aspect-[5/6] lg:aspect-[4/5]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="p-4 bg-white border border-primary/20 rounded-full shadow-sm">
                    {program.icon}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-display text-accent mb-6">
                  {program.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {program.description}
                </p>
                <div className="bg-white p-8 border border-primary/10 shadow-sm relative">
                  <h4 className="font-display text-lg mb-4 text-accent">
                    What's included
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-left">
                    {program.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to={`/services/${program.id}`}
                    className="inline-flex items-center text-primary uppercase text-xs font-bold tracking-widest hover:text-accent transition-colors"
                  >
                    Learn more about {program.title}{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-white text-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-accent">
              FAQs
            </h2>
            <p className="text-gray-700 text-xl font-bold">
              Common questions about how we work
            </p>
            <p className="text-gray-500 font-light text-sm mt-2 max-w-2xl mx-auto">
              We've answered the questions donors, volunteers and parents ask
              us most often. If yours isn't here, write to{" "}
              <a
                href="mailto:aaghaz.foundation@gmail.com"
                className="text-primary hover:underline"
              >
                aaghaz.foundation@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="divide-y divide-stone-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-8">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left font-display text-xl md:text-2xl hover:text-primary transition-colors"
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
      <NewsletterSection />
    </div>
  );
};
