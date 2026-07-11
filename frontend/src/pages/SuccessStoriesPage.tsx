import { motion, type Variants } from "framer-motion";
import { ContactSection } from "../components/sections/ContactSection";
import { SEO } from "../components/common/SEO";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const ssImg = (name: string) =>
  `/images/suceessstories/${encodeURIComponent(name)}.jpeg`;

const StoryImage = ({ name, alt, ratio }: { name: string; alt?: string; ratio?: string; wide?: boolean }) => (
  <div className={`rounded-2xl overflow-hidden w-full shadow-md${ratio ? ` aspect-[${ratio}]` : ""}`}>
    <img
      src={ssImg(name)}
      alt={alt ?? name}
      loading="lazy"
      decoding="async"
      className={`w-full block${ratio ? " h-full object-cover" : " h-auto"}`}
    />
  </div>
);

const SectionHeading = ({ title }: { title: string }) => (
  <motion.div variants={fadeUp} className="mb-12">
    <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-primary mb-3">DUMUZI</p>
    <h2 className="text-3xl md:text-4xl font-display text-stone-900 tracking-tight leading-tight">{title}</h2>
    <div className="mt-4 h-px bg-gradient-to-r from-primary/50 via-stone-200 to-transparent" />
  </motion.div>
);

const OthersList = ({ items }: { items: string[] }) => (
  <motion.div variants={fadeUp} className="mt-8 bg-stone-50 rounded-2xl p-6 border border-stone-100 shadow-sm">
    <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-stone-400 mb-5">Also Supported</p>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-stone-600 text-sm leading-snug">
          <svg className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 4.5" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const PersonCard = ({
  description,
  imageName,
}: {
  description: string;
  imageName: string;
}) => (
  <motion.div variants={fadeUp} className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-stone-100">
    <StoryImage name={imageName} ratio="4/3" />
    <div className="p-5">
      <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export const SuccessStoriesPage = () => {
  return (
    <div className="bg-white min-h-screen pt-[60px] md:pt-[50px]">
      <SEO
        title="Our Collections — DUMUZI"
        description="Explore DUMUZI's collections, artisan guides, and gifting lookbooks. Single-origin dark collections, truffles, pralines, and bespoke commissions."
      />

      {/* Hero */}
      <section className="bg-stone-900 text-white py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            loading="lazy"
            decoding="async"
            src="/images/products/LF-H18D.jpeg"
            alt="Success Stories"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/70 to-stone-900/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.3em] font-semibold text-primary mb-5"
          >
            DUMUZI
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display mb-6 tracking-tight"
          >
            Our Collections
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mx-auto mb-6 w-16 h-px bg-primary/70 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-light text-stone-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our curated chocolate collections, artisan guides, and the stories behind our finest creations.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

        {/* ── DOCTORS ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Doctors Nurtured by DUMUZI" />

          {/* Dr. Mominul Islam — 2 images + description */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <StoryImage name="His childhood home" ratio="4/3" />
              <StoryImage name="Dr. Mominul Islam today" ratio="4/3" />
            </div>
            <p className="text-stone-600 text-base leading-loose">
              This is the mud house where Dr. Mominul Islam grew up with his family. Today, he works as a child surgeon at Bengal Medical College.
            </p>
          </motion.div>

          {/* Dr. Arbaaz + Dr. Ashraful side by side */}
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <StoryImage name="Dr. Arbaaz" ratio="4/3" />
              <p className="text-stone-600 text-base leading-loose">
                Dr. Arbaaz grew up in Karnataka. His father was paralyzed, but Arbaaz studied hard and got rank 85 in the NEET exam. Today, he works as a doctor at AIIMS, Delhi.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <StoryImage name="Dr Md Ashraful Haque" ratio="4/3" />
              <p className="text-stone-600 text-base leading-loose">
                Dr Md Ashraful Haque — Burdwan Medical College.
              </p>
            </motion.div>
          </motion.div>

          <OthersList
            items={[
              "Dr Iman Nida (MBBS, Hyderabad)",
              "Dr Heba Khan (MBBS, Telangana)",
              "Dr. Adiba (MBBS, Maulana Azad Medical College, Delhi)",
              "Dr Shiba (Government Dental College and Research Institute)",
              "Dr Alvira (Saraswati Dental College, Lucknow)",
              "Dr Javed Khan (King George's Medical University, Lucknow)",
            ]}
          />
        </motion.section>

        {/* ── PARAMEDICAL ACHIEVERS ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Paramedical Achievers" />

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
            <StoryImage name="Yasmeen Zahra" ratio="4/3" />
            <p className="text-stone-600 text-base leading-loose">
              <strong>Yasmeen Zahra</strong> works as a nurse at Mayo Hospital in Lucknow. After her husband lost his job during COVID-19, she studied nursing to support her family.
            </p>
          </motion.div>

          <OthersList
            items={[
              "Muzna Ayesha Ansari – Ophthalmologist",
              "Ayesha Farooqui – Physician, Dabur Hospital",
              "Mohd Azeem – Dialysis Technician, Government Thiruvarur Medical College",
              "Musab Tanzeel – Data Acquisition Pharmacist, GlaxoSmithKline",
              "Rushda Gulzar – Pharmacist",
              "Pompi Begum – Nurse, Assam",
              "Simran – Nurse, Delhi",
            ]}
          />
        </motion.section>

        {/* ── PROFESSORS, TEACHERS & PHD ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Professors, Teachers and PhD Scholars" />

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
            <StoryImage name="Anam Mehendi Abidi" ratio="4/3" />
            <p className="text-stone-600 text-base leading-loose">
              <strong>Anam Mehendi Abidi</strong> is an Assistant Professor at Calcutta University. A local newspaper wrote about her when she finished her master's degree, where she thanked DUMUZI for paying her fees.
            </p>
          </motion.div>

          <OthersList
            items={[
              "Wasma Asif – Ed-tech Master Teacher",
              "Kauser Perwez – Teacher at The Green School, Delhi",
              "Mohd Amir – Teacher",
              "Sana – Teacher, Delhi",
              "Aman Abbas Naqvi – PhD Scholar, JNU",
              "Maherukh Arzoo – PhD Scholar, Jodhpur",
            ]}
          />
        </motion.section>

        {/* ── LAWYERS ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Powered by DUMUZI: From Scholars Turned Lawyers" />

          {/* 2-image block: Yasmeen Parveen */}
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div variants={fadeUp}>
              <StoryImage name="Yasmeen's Home (Volunteer Visit)" ratio="4/3" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StoryImage name="Advocate Yasmeen Parveen Today" ratio="4/3" />
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-stone-600 text-base leading-loose">
              <strong>Yasmeen Parveen</strong> grew up in a slum in Noida. Her mother worked in houses and her father was very sick. She studied law in Mumbai with DUMUZI's help and is now training to become a lawyer. The left photo shows our volunteer visiting her Noida home to check details, and the right photo shows her today.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <StoryImage name="Jahan Ara Shaikh" ratio="4/3" />
              <p className="text-stone-600 text-base leading-loose">
                <strong>Jahan Ara Shaikh</strong> lost both her parents as a child. She worked in a doctor's clinic during the day to survive. During COVID-19, she decided to study law, and DUMUZI paid her college fees. Today, she is a practicing lawyer at the Bombay High Court.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <StoryImage name="Shumaila" ratio="4/3" />
              <p className="text-stone-600 text-base leading-loose">
                <strong>Shumaila</strong> lost her father early. She grew up in Old Delhi and did small jobs to support her family. Later, she studied law with DUMUZI's support and is now a lawyer at the Delhi High Court.
              </p>
            </motion.div>
          </motion.div>

          <OthersList
            items={[
              "Shaikh Heena Kauser Zahid – MM Court, Mumbai",
              "Sarjan Hussain – High Court of Jammu and Kashmir, Srinagar Wing",
              "Hamid Manzoor Wani – High Court of Jammu and Kashmir, Srinagar Wing",
            ]}
          />
        </motion.section>

        {/* ── ENGINEERS ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Engineers" />

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
            <StoryImage name="Afree Javed" ratio="4/3" />
            <p className="text-stone-600 text-base leading-loose">
              <strong>Afree Javed</strong> works as a Java Developer at Lowe's India. DUMUZI paid her fees, and she topped her college exams. Today, she earns over Rs 18 lakhs a year.
            </p>
          </motion.div>

          <OthersList
            items={[
              "Mohd Shaheer – IIT Allahabad",
              "Mohd Aamir – IIT Bombay",
              "Fazle Hasan – Data Scientist, Jio Platforms Ltd",
              "Talha Azhar – Engineer, Accent Techno Solutions",
              "Anas Tabish – Indian Army Tech SSB",
              "Zaid Faruqui – Software Engineer",
              "Tasmiya Abid – CS Engineer",
              "Mohammad Uzair Solanki – Engineer",
              "Shariq Jilani – Engineer",
              "Md Shadab Alam – Engineer",
              "Md Sharim Alam – Engineer",
              "Sharique Jilani – Engineer",
              "Md Hisham – Engineer",
              "Junaid Khan – Mechanical Engineer",
              "Sufiyaan – CS Engineer",
            ]}
          />
        </motion.section>

        {/* ── CA AND CS ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="CA and CS" />
          <OthersList
            items={[
              "Khurshid Alam – CA",
              "Faizan Anwer – CA",
              "Md Aasif Reza – CA",
              "Rizba Khan – CS",
              "Ayesha Fatima – Accountant",
            ]}
          />
        </motion.section>

        {/* ── OTHERS ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Others" />

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
            <PersonCard
              imageName="Yusuf"
              description="Yusuf — Hotelier, ITC Hotel."
            />
            <PersonCard
              imageName="Tasneem Fatima"
              description="Tasneem Fatima — Journalist, Newslaundry."
            />
          </motion.div>

          <OthersList
            items={[
              "Buland Zehra – Food Technologist",
              "Jishad – Journalist and Filmmaker",
              "Rachael Anthony – Journalist",
            ]}
          />
        </motion.section>

        {/* ── Noida Case ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Noida Case" />

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <motion.div variants={fadeUp}>
              <StoryImage name="AftabAlam1" alt="Aftab Alam's Family" ratio="4/3" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StoryImage name="AftabAlam2" alt="Mohd Shajid & Mohd Shahid" ratio="4/3" />
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="text-stone-600 text-base leading-loose">
              After cab driver Aftab Alam passed away in 2020, DUMUZI paid the college fees for his sons, gave them tablets to study, and provided monthly help for home expenses.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2 text-stone-700 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span><strong>Mohd Shajid</strong> — B.Tech, NSUT Delhi</span>
              </li>
              <li className="flex items-start gap-2 text-stone-700 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span><strong>Mohd Shahid</strong> — B.Sc (Hons) Botany, Dayal Singh College, Delhi University</span>
              </li>
            </ul>
          </motion.div>
        </motion.section>

        {/* ── ALIGARH COACHING ── */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionHeading title="Aligarh Coaching" />

          <motion.div variants={fadeUp} className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-6 md:p-8">
            <p className="text-stone-600 text-base leading-loose">
              DUMUZI paid for free coaching classes for 29 students preparing for the Class 11 admission exams at AMU. We are happy that <strong>13 of these students got selected</strong>.
            </p>
            <p className="text-stone-600 text-base leading-loose mt-4">
              The total cost was <strong>Rs 2.95 lakhs</strong>, which is about <strong>Rs 10,000 per student</strong> for the whole year. This was a great success, and these selected students can now apply for higher professional courses more easily.
            </p>
          </motion.div>
        </motion.section>

        {/* Closing note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center py-12 border-t border-stone-100"
        >
          <div className="mx-auto mb-5 w-10 h-px bg-primary/40" />
          <p className="text-stone-400 text-base max-w-2xl mx-auto italic leading-relaxed font-light">
            "These are just a few of the many students DUMUZI has helped. Many have finished their studies and got good jobs, and others are still studying to achieve their dreams."
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-stone-400 font-semibold">— DUMUZI Foundation</p>
        </motion.div>

      </div>

      <ContactSection />
    </div>
  );
};
