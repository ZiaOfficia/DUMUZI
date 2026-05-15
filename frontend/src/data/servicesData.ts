// Aaghaz Foundation — Programs / "What We Do"
// The shape mirrors the original ServiceData interface so existing components keep working.

export interface ServiceData {
  id: string;
  title: string;
  heroImage: string;
  heroTitle: string;
  intro: {
    heading: string;
    subheading: string;
    description: string[];
  };
  whyChooseUs: {
    title: string;
    items: { title: string; description: string }[];
  };
  signatureServices: {
    title: string;
    items: { title: string; description: string; features?: string[] }[];
  };
  process: {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  testimonials?: {
    quote: string;
    author: string;
    location: string;
  }[];
  portfolioImages: string[];
  /** Optional: extra FAQ block rendered after testimonials (used by Memorial Scholarship). */
  faqs?: { question: string; answer: string }[];
  /** Optional: list of named scholarships / programmes already running under this service. */
  namedScholarships?: string[];
  /** Optional: direct contact card for this service. */
  contact?: {
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
    note?: string;
  };
}

import { serviceImages } from "./imageAssets";

export const servicesData: ServiceData[] = [
  {
    id: "student-aid",
    title: "Student Aid",
    heroImage: serviceImages.studentAid,
    heroTitle: "STUDENT AID — KEEPING DESERVING CHILDREN IN SCHOOL",
    intro: {
      heading: "STUDENT AID PROGRAM",
      subheading:
        "Need-based financial assistance for school and college students across India.",
      description: [
        "Before you continue to apply for financial assistance, please read the eligibility criteria below and agree to our terms and conditions. Aaghaz Foundation supports meritorious students from economically weak backgrounds — we cover school fees, college tuition, exam fees, books, uniforms and hostel rent for those who genuinely cannot afford them.",
        "Every applicant is reviewed by our volunteer team through an in-person pre-scholarship survey. We do not run a generic application form — every story is verified, and every rupee is tracked.",
      ],
    },
    whyChooseUs: {
      title: "Who is eligible",
      items: [
        {
          title: "Genuine financial need",
          description:
            "Annual family income should ordinarily fall below the threshold defined by your state for an Economically Weaker Section household.",
        },
        {
          title: "Consistent academic record",
          description:
            "We support meritorious students — typically a minimum of 60% in the most recent qualifying exam, with some flexibility for first-generation learners.",
        },
        {
          title: "Recommended through a verifiable source",
          description:
            "A teacher, neighbour, journalist, social worker or earlier Aaghaz beneficiary should be able to vouch for the student's circumstances.",
        },
      ],
    },
    signatureServices: {
      title: "What student aid covers",
      items: [
        {
          title: "School Fees & Exam Fees",
          description:
            "From Class I to Class XII — annual fees, board exam fees, lab fees and re-admission charges for verified students.",
        },
        {
          title: "College & University Tuition",
          description:
            "Graduation, post-graduation and professional course tuition, partially or fully covered depending on family circumstances.",
        },
        {
          title: "Books, Uniforms & Stationery",
          description:
            "One-time and annual support for textbooks, school uniforms, school bags and basic stationery.",
        },
        {
          title: "Hostel & Daily Living",
          description:
            "For students who study away from home, support towards hostel rent, mess fees and travel back to family during holidays.",
        },
      ],
    },
    process: {
      title: "How to apply",
      description:
        "From recommendation to disbursement, here's exactly what happens:",
      steps: [
        {
          title: "1. Submit the application",
          description:
            "Use the Apply for Student Aid form on our website with basic details and supporting documents.",
        },
        {
          title: "2. Pre-scholarship survey",
          description:
            "A minimum of two volunteers visit the family and the student's school to verify the application in person.",
        },
        {
          title: "3. Aaghaz committee review",
          description:
            "The verified case is presented to our committee, which approves the amount and the duration of support.",
        },
        {
          title: "4. Disbursement & follow-up",
          description:
            "Funds are paid directly to the school or college wherever possible, and our volunteers stay in touch with the student through the year.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "I was about to drop out after Class X because my father could not pay the board fees. Aaghaz volunteers came home, met my mother, and within a week the fees were paid. Today I am in the second year of my B.Sc.",
        author: "Sumaiya R.",
        location: "Lucknow, UP",
      },
      {
        quote:
          "We had no idea organisations like this existed. The volunteers were respectful, the process was clear, and we never felt like we were begging.",
        author: "Mother of an Aaghaz beneficiary",
        location: "Hardoi, UP",
      },
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "scholarships",
    title: "Scholarships",
    heroImage: serviceImages.scholarships,
    heroTitle: "SCHOLARSHIPS — INVESTING IN A STUDENT'S FUTURE",
    intro: {
      heading: "AAGHAZ SCHOLARSHIPS",
      subheading:
        "Annual, merit-cum-means and memorial scholarships for students across India.",
      description: [
        "Many of our donors choose to support Aaghaz by offering scholarships. They can choose to launch a memorial scholarship — in the name of a parent, a sibling, a teacher or a friend — or contribute to our annual general scholarship pool that funds the highest-priority cases.",
        "Every scholarship is awarded after a verified pre-scholarship survey, and donors receive an annual report on the students their contribution has supported.",
      ],
    },
    whyChooseUs: {
      title: "Why launch a scholarship with Aaghaz",
      items: [
        {
          title: "Verified, transparent disbursement",
          description:
            "Every recipient is met in person before approval. Funds are paid directly to the institution wherever possible.",
        },
        {
          title: "Co-designed criteria",
          description:
            "You decide the broad criteria — region, gender, course of study, academic threshold — and we operate within it.",
        },
        {
          title: "Annual reports to donors",
          description:
            "We share photographs, results and short notes from the students every year so you can see the difference your scholarship makes.",
        },
      ],
    },
    signatureServices: {
      title: "Types of scholarships",
      items: [
        {
          title: "Memorial Scholarship",
          description:
            "Honour someone you love by funding a child's school or college education in their name. Starts at Rs 50,000 per year per student; we are happy to design something at any budget.",
        },
        {
          title: "Annual General Scholarship",
          description:
            "Contribute any amount to our central scholarship pool. We allocate it across the highest-priority verified cases.",
        },
        {
          title: "Corporate / CSR Scholarship",
          description:
            "Companies can launch a CSR-funded scholarship cohort, adopt a class or fund a learning centre — with full reporting suitable for CSR audits.",
        },
        {
          title: "Subject-Specific Awards",
          description:
            "Targeted scholarships for girls in STEM, first-generation college-goers, or students preparing for civil services and competitive exams.",
        },
      ],
    },
    process: {
      title: "How a scholarship is launched",
      description: "",
      steps: [
        {
          title: "1. Initial conversation",
          description:
            "Tell us about who you'd like to honour, your budget and the kind of student you want to support.",
        },
        {
          title: "2. Criteria & MOU",
          description:
            "We co-write the criteria, sign a simple MOU and confirm the disbursement schedule.",
        },
        {
          title: "3. Selection & disbursement",
          description:
            "We select students from our verified pipeline and pay the institutions directly.",
        },
        {
          title: "4. Annual reporting",
          description:
            "Each year you receive a report with the student's progress, photographs and a personal note.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "We launched a scholarship in our son's name. Knowing that three students are completing their education because of him every year — that has helped our family heal in a way we did not expect.",
        author: "A donor family",
        location: "Pune",
      },
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "financial-assistance",
    title: "Financial Assistance",
    heroImage: serviceImages.financialAssistance,
    heroTitle: "FINANCIAL ASSISTANCE — TIMELY HELP WHEN A FAMILY NEEDS IT MOST",
    intro: {
      heading: "FINANCIAL ASSISTANCE PROGRAM",
      subheading:
        "Emergency and recurring financial support for educational expenses.",
      description: [
        "Sometimes a family is doing everything right and is still one missed fee instalment away from a child dropping out. Aaghaz Foundation provides timely financial assistance — sometimes a one-time intervention, sometimes ongoing year-on-year — so that a temporary crisis does not become a permanent loss of education.",
        "We work case-by-case. Every appeal is verified by our volunteer team before approval, but we move fast: most genuine emergencies are resolved within seven working days.",
      ],
    },
    whyChooseUs: {
      title: "What we cover",
      items: [
        {
          title: "Last-minute fee crises",
          description:
            "Board exam admit cards being withheld, college fees due, or hostel deposits — we step in where the difference between continuing and dropping out is a single payment.",
        },
        {
          title: "Loss of an earning parent",
          description:
            "Where a family has lost the primary earner, we fund the children's continuing education for the rest of the academic year.",
        },
        {
          title: "Medical emergencies that derail education",
          description:
            "When a parent's medical emergency wipes out savings meant for school, we help bridge the gap so the children stay enrolled.",
        },
      ],
    },
    signatureServices: {
      title: "Types of assistance",
      items: [
        {
          title: "One-time emergency aid",
          description:
            "Fast-tracked payment of an urgent fee directly to the institution.",
        },
        {
          title: "Recurring monthly support",
          description:
            "For long-term cases, regular monthly assistance until the family stabilises or the child finishes the course.",
        },
        {
          title: "Coaching & mentorship",
          description:
            "Where the gap is academic rather than financial, free access to LCGC and our partner Rahmani 30 centres.",
        },
      ],
    },
    process: {
      title: "How we move on a case",
      description: "",
      steps: [
        {
          title: "1. Recommendation",
          description:
            "A teacher, neighbour, journalist or volunteer flags the case to us.",
        },
        {
          title: "2. Same-week verification",
          description:
            "Two volunteers visit the family and the institution; reports are submitted within 72 hours.",
        },
        {
          title: "3. Committee approval",
          description:
            "The Aaghaz committee approves the amount and the disbursement route.",
        },
        {
          title: "4. Direct payment & follow-up",
          description:
            "Funds are paid to the institution; the volunteer team checks in monthly until the academic year is complete.",
        },
      ],
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "computer-center",
    title: "Computer Learning Center",
    heroImage: "/images/computercenter/Screenshot 2026-05-15 111019.png",
    heroTitle:
      "AAGHAZ FOUNDATION COMPUTER LEARNING CENTER (AFCLC) — LUCKNOW",
    intro: {
      heading: "Unlock Your Future With Aaghaz Foundation's Free Computer Training Program",
      subheading:
        "Free, certified, job-oriented computer training for women, minorities and economically weaker sections — in the heart of Lucknow.",
      description: [
        "The Aaghaz Foundation Computer Learning Center (AFCLC) was founded as part of Aaghaz Foundation's skill-development programme, in partnership with IICL. Started by Co-Founder Suhel Khaleel and operating under the general secretaryship of Mr Tariq Khan, the centre is housed in our Balda Colony office near the New Hyderabad Post Office in Lucknow — and runs entirely free of cost.",
        "More than a training facility, AFCLC is a beacon of hope for underprivileged youth bridging the digital divide. Thirteen full batches have already graduated, with the 14th and 15th batches currently in progress and more than 150 alumni who have built confidence, skills and livelihoods through the programme.",
        "Under the daily supervision of our centre in-charge Mr Mohd Ebad (M.Sc., B.Ed.) — trained under our experienced teacher and founder Mr Waheed Uz Zama — students receive practical, step-by-step training, personal attention and regular practice tests. We do not just teach; we build skills.",
      ],
    },
    whyChooseUs: {
      title: "Our Vision",
      items: [
        {
          title: "Make digital education accessible to everyone",
          description:
            "AFCLC is open to all — minorities, women, economically weaker sections, and any young person who has been kept on the wrong side of the digital divide.",
        },
        {
          title: "Create skilled and confident individuals",
          description:
            "Through practical-based training, easy step-by-step learning and personal attention, every graduate leaves with a real, demonstrable command of computers.",
        },
        {
          title: "Bridge the gap between education and employment",
          description:
            "Our curriculum is paired with the government-recognised NIELIT 'CCC' certificate — a gateway to numerous jobs in government and the private sector.",
        },
      ],
    },
    signatureServices: {
      title: "Our Comprehensive Curriculum",
      items: [
        {
          title: "Fundamentals of Computer",
          description:
            "How a computer works, parts of a system, files and folders, safe handling — the foundations every modern worker is expected to know.",
          features: [
            "Hardware basics and components",
            "Files, folders and storage devices",
            "Safe shutdown, backup and care",
          ],
        },
        {
          title: "Operating System (DOS &amp; MS-Windows)",
          description:
            "Hands-on training in both DOS commands and MS-Windows so students can confidently use any PC they sit down at.",
          features: [
            "MS-Windows navigation, settings &amp; shortcuts",
            "DOS commands for file operations",
            "Installing software and managing the desktop",
          ],
        },
        {
          title: "MS-Office Suite",
          description:
            "Practical Word, Excel and PowerPoint with real-world office templates — letters, invoices, reports, presentations and basic spreadsheets.",
          features: [
            "MS-Word — formatting, tables, mail-merge",
            "MS-Excel — formulas, sorting, charts",
            "PowerPoint — presentations and design",
          ],
        },
        {
          title: "Hindi / English Typing",
          description:
            "Structured typing speed and accuracy training in both Hindi and English — a basic requirement for clerical and data-entry roles.",
          features: [
            "Touch-typing technique",
            "Speed and accuracy drills",
            "Hindi typing on Unicode",
          ],
        },
        {
          title: "Internet &amp; E-Commerce",
          description:
            "Safe browsing, email, online forms, e-governance portals, UPI/online payments and the basics of buying and selling online.",
          features: [
            "Search, browsers and email",
            "Online forms &amp; e-governance",
            "Digital payments &amp; e-commerce basics",
          ],
        },
        {
          title: "NIELIT 'CCC' — Course on Computer Concepts",
          description:
            "We prepare every student for the government-recognised NIELIT 'CCC' certificate — a mandatory qualification for many government jobs in India.",
          features: [
            "Full syllabus coverage",
            "Mock tests &amp; revision",
            "Government-recognised certificate on completion",
          ],
        },
      ],
    },
    process: {
      title: "How AFCLC Works",
      description:
        "Practical-based training • Easy step-by-step learning • Personal attention • Regular tests and practice.",
      steps: [
        {
          title: "1. Walk in &amp; enrol",
          description:
            "Visit the centre at 406/2A, Balda Colony, near New Hyderabad Post Office, Lucknow. Only nominal form fees apply — the course itself is free. Seats are limited, first-come first-served.",
        },
        {
          title: "2. Practical-based classroom training",
          description:
            "Small batches at our state-of-the-art lab with one machine per student. Daily hands-on practice under the guidance of Mr Mohd Ebad.",
        },
        {
          title: "3. Regular tests &amp; revision",
          description:
            "Weekly practice tests, mock NIELIT CCC papers and one-on-one revision to make sure every student is exam-ready.",
        },
        {
          title: "4. Certificate &amp; placement support",
          description:
            "On graduation, students receive AFCLC's certificate plus the government-recognised NIELIT 'CCC' certificate — and access to our alumni network for jobs.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "After AFCLC I learnt MS-Office and typing. I now work as a finance clerk and the certificate from the centre is what got me through the interview.",
        author: "Bushra Khan",
        location: "AFCLC alumnus · Finance Clerk",
      },
      {
        quote:
          "I joined as a school-leaver with no computer experience. Today I am a tele-caller executive and I help my younger sister at home with her laptop.",
        author: "Noman Azim",
        location: "AFCLC alumnus · Tele-Caller Executive",
      },
      {
        quote:
          "AFCLC taught me Excel and data entry. Within three months of finishing, I was placed as a Data Entry Operator at a local firm.",
        author: "Mohd Nabi",
        location: "AFCLC alumnus · Data Entry Operator",
      },
      {
        quote:
          "The teachers gave personal attention — I never felt left behind. I now teach at a primary school and the AFCLC certificate is part of my qualifications.",
        author: "Mehvish Ansari",
        location: "AFCLC alumnus · Teacher",
      },
    ],
    portfolioImages: [
      "/images/computercenter/Screenshot 2026-05-15 111019.png",
      "/images/computercenter/Screenshot 2026-05-15 111030.png",
      "/images/computercenter/Screenshot 2026-05-15 111042.png",
      "/images/computercenter/Screenshot 2026-05-15 111053.png",
      "/images/computercenter/Screenshot 2026-05-15 111110.png",
      "/images/computercenter/Screenshot 2026-05-15 111130.png",
      "/images/computercenter/Screenshot 2026-05-15 111152.png",
      "/images/computercenter/Screenshot 2026-05-15 111202.png",
      "/images/computercenter/Screenshot 2026-05-15 111210.png",
      "/images/computercenter/Screenshot 2026-05-15 111220.png",
      "/images/computercenter/Screenshot 2026-05-15 111230.png",
      "/images/computercenter/Screenshot 2026-05-15 111243.png",
    ],
  },

  {
    id: "madarsa-initiative",
    title: "Madarsa Initiative",
    heroImage: serviceImages.madarsaInitiative,
    heroTitle: "MADARSA INITIATIVE — EDUCATION FOR ALL COMMUNITIES",
    intro: {
      heading: "MADARSA INITIATIVE",
      subheading:
        "Supporting madarsa students with modern education and skill development.",
      description: [
        "Our Madarsa Initiative bridges traditional Islamic education with modern academic and vocational skills. We work with madarsas across India to provide additional resources, ensuring students receive a well-rounded education.",
        "The program focuses on language skills, mathematics, science, and vocational training to prepare students for diverse career paths while respecting their cultural and religious backgrounds.",
      ],
    },
    whyChooseUs: {
      title: "Why support madarsa education",
      items: [
        {
          title: "Inclusive education",
          description:
            "Ensuring all communities have access to quality education and opportunities.",
        },
        {
          title: "Cultural sensitivity",
          description:
            "Respecting religious and cultural values while providing modern skills.",
        },
        {
          title: "Holistic development",
          description:
            "Combining religious teachings with academic and vocational training.",
        },
      ],
    },
    signatureServices: {
      title: "Program components",
      items: [
        {
          title: "Academic Support",
          description:
            "Additional classes in mathematics, science, and English to complement madarsa curriculum.",
        },
        {
          title: "Vocational Training",
          description:
            "Skills like computer literacy, tailoring, and basic entrepreneurship.",
        },
        {
          title: "Career Counseling",
          description:
            "Guidance on higher education and job opportunities.",
        },
        {
          title: "Community Engagement",
          description:
            "Involving parents and community leaders in the educational process.",
        },
      ],
    },
    process: {
      title: "How it works",
      description: "",
      steps: [
        {
          title: "1. Partnership",
          description:
            "Collaborate with madarsa administrators to integrate our programs.",
        },
        {
          title: "2. Student assessment",
          description:
            "Evaluate students' needs and interests for personalized support.",
        },
        {
          title: "3. Program delivery",
          description:
            "Conduct classes and workshops at the madarsa or nearby facilities.",
        },
        {
          title: "4. Monitoring and evaluation",
          description:
            "Track progress and adjust programs for better outcomes.",
        },
      ],
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "memorial-scholarship",
    title: "Memorial Scholarship",
    heroImage: serviceImages.memorialScholarship,
    heroTitle: "MEMORIAL SCHOLARSHIPS — HONOURING LEGACIES THROUGH EDUCATION",
    intro: {
      heading: "MEMORIAL SCHOLARSHIPS",
      subheading:
        "A meaningful way to cherish the memory of someone special who is no longer with us.",
      description: [
        "Educational scholarships are a meaningful way to cherish the memory of someone special who is no longer with us. Through our Memorial Scholarship Program, you can establish a scholarship in the name of a departed loved one and help a deserving student who is struggling to continue their education due to financial hardship.",
        "At present, we run nearly 80 memorial scholarships every year, supporting hundreds of underprivileged students across India.",
      ],
    },
    whyChooseUs: {
      title: "Why Start a Memorial Scholarship?",
      items: [
        {
          title: "Keep their memory alive",
          description:
            "A memorial scholarship is a beautiful way to keep the memory of your loved one alive.",
        },
        {
          title: "Inspire hope &amp; opportunity",
          description:
            "Their name continues to inspire hope and opportunity for students who need support with their education.",
        },
        {
          title: "A lasting tribute",
          description:
            "It is a lasting tribute that makes a real difference in someone&apos;s life.",
        },
      ],
    },
    signatureServices: {
      title: "Donor Preferences &amp; Recognition",
      items: [
        {
          title: "You decide how it is used",
          description:
            "You can choose how your contribution is used — support one student or multiple students, sponsor girls only, or give preference to orphans and other specific categories.",
          features: [
            "Support one student or multiple students",
            "Sponsor girls only",
            "Give preference to orphans or other categories",
          ],
        },
        {
          title: "Personalised artwork",
          description:
            "Once we receive your details, our team creates a personalised artwork for the scholarship and shares it on our website and social-media platforms — so the tribute reaches a wide audience.",
        },
        {
          title: "Thousands of applications, carefully vetted",
          description:
            "Each scholarship typically receives between 5,000 and 10,000 applications — sometimes from as far as the Andaman and Nicobar Islands. Every application is reviewed by our selection committee based on financial need, academic merit and personal circumstances. Priority is often given to orphaned students.",
        },
        {
          title: "Certificates &amp; progress updates",
          description:
            "Selected students receive certificates bearing the name of the person in whose memory the scholarship has been created. We share student profiles, academic reports and photographs so you can follow their progress and see the impact of your contribution.",
        },
      ],
    },
    process: {
      title: "How to Start a Memorial Scholarship",
      description:
        "If you would like to set up a scholarship, please share the following details with us. Minimum annual contribution: Rs 25,000.",
      steps: [
        {
          title: "1. Name of the honoree",
          description:
            "The name of the person in whose memory the scholarship is to be established.",
        },
        {
          title: "2. Photograph",
          description:
            "A photograph of the person — we use it for the personalised artwork.",
        },
        {
          title: "3. A few lines about them",
          description:
            "A short note about who they were, what they cared about, what they would want this scholarship to stand for.",
        },
        {
          title: "4. Annual contribution",
          description:
            "The amount you would like to contribute every year. Minimum annual contribution is Rs 25,000.",
        },
        {
          title: "5. Beneficiary preference",
          description:
            "Any preference for the type of beneficiary — for example orphan, girl student, students from a specific region, etc.",
        },
        {
          title: "6. Tentative start date",
          description:
            "The date when you would like the scholarship to start being awarded.",
        },
        {
          title: "7. Your contact number",
          description:
            "So our team can reach you to confirm the details and get the scholarship live.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "Knowing that students are completing their education in our loved one's name has helped our family heal in a way we did not expect. Every annual report feels like a letter from him.",
        author: "A donor family",
        location: "Pune, India",
      },
      {
        quote:
          "I never imagined a scholarship in my late father's name would reach a girl in the Andaman and Nicobar Islands. That single certificate sent home was worth more than anything we could have given ourselves.",
        author: "Memorial scholarship donor",
        location: "Delhi, India",
      },
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    ],
    faqs: [
      {
        question: "Is there a minimum contribution?",
        answer:
          "Yes — the minimum annual contribution is Rs 25,000. There is no upper limit; many donors choose to fund multiple students or extend the scholarship over several years.",
      },
      {
        question: "How many applications does a scholarship receive?",
        answer:
          "A typical memorial scholarship attracts anywhere between 5,000 and 10,000 applications from across India — sometimes from as far as the Andaman and Nicobar Islands.",
      },
      {
        question: "Can I choose who receives the scholarship?",
        answer:
          "Yes. You can specify your preferences — for example supporting girls, orphans, students from a particular region, or more than one student. We design the scholarship around the criteria you give us.",
      },
      {
        question: "How are students selected?",
        answer:
          "Every application is thoroughly vetted by our team before the final selection is made. Our selection committee weighs financial need, academic merit and personal circumstances. Priority is often given to orphaned students.",
      },
    ],
    namedScholarships: [
      "Rohith Venumla Memorial Scholarship",
      "Kalbe Sadiq Memorial Scholarship",
      "Sir Syed Ahmad Khan Memorial Scholarship",
      "Danish Siddiqui Memorial Scholarship",
      "Kamal Khan Memorial Scholarship",
    ],
    contact: {
      name: "Saima Rehman",
      role: "Memorial Scholarship Coordinator",
      email: "aaghaz.foundation@gmail.com",
      phone: "+91 99716 48900",
      note: "If you would like to honour a loved one by supporting a deserving student, we would be happy to help. Email or WhatsApp us — Saima will personally walk you through the process.",
    },
  },

  {
    id: "become-volunteer",
    title: "Become a Volunteer",
    heroImage: serviceImages.becomeVolunteer,
    heroTitle: "BECOME AN AAGHAZ FIELD VOLUNTEER",
    intro: {
      heading: "AAGHAZ IS A VOLUNTEER-DRIVEN ORGANISATION",
      subheading:
        "Our volunteers are the reason this works. Join us, and a child somewhere finishes school because of it.",
      description: [
        "Aaghaz is a volunteer-driven organisation. Our volunteers identify students in need of financial assistance, conduct pre-scholarship surveys with the core team, and stay in touch with beneficiaries throughout the academic year.",
        "If you have two free hours a week and a willingness to listen, you can change a life. We need volunteers in cities and small towns across India — especially in Uttar Pradesh, Bihar, Maharashtra and the National Capital Region.",
      ],
    },
    whyChooseUs: {
      title: "What volunteers do",
      items: [
        {
          title: "Pre-scholarship field surveys",
          description:
            "Visit a recommended student's home and school to verify the case before approval.",
        },
        {
          title: "Mentorship & follow-up",
          description:
            "Stay in touch with one or two beneficiaries through the academic year — calls, occasional visits, gentle accountability.",
        },
        {
          title: "Online support",
          description:
            "Documentation, social media, fundraising events, donor communication — work that can be done remotely.",
        },
      ],
    },
    signatureServices: {
      title: "Volunteer roles",
      items: [
        {
          title: "Field volunteer",
          description:
            "On-the-ground surveys and mentorship in your own city or district.",
        },
        {
          title: "Online mentor",
          description:
            "Weekly video calls with assigned students for academic and career guidance.",
        },
        {
          title: "Communications & content",
          description:
            "Help us tell stories well — writing, photography, video, social media, donor reports.",
        },
        {
          title: "Fundraising lead",
          description:
            "Organise small-group fundraisers, runs, college events or workplace giving campaigns.",
        },
      ],
    },
    process: {
      title: "How to join",
      description: "",
      steps: [
        {
          title: "1. Register your interest",
          description:
            "Fill the Become a Field Volunteer form on our website with your basic details and city.",
        },
        {
          title: "2. Quick conversation",
          description:
            "A team member will get in touch within a few working days for a short call to understand your interests and availability.",
        },
        {
          title: "3. Orientation",
          description:
            "A short induction on Aaghaz's values, processes and the volunteer code of conduct.",
        },
        {
          title: "4. Your first case",
          description:
            "We assign you your first survey or mentee — and pair you with an experienced volunteer for the first few weeks.",
        },
      ],
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "join-as-donor",
    title: "Join us as Donor",
    heroImage: serviceImages.joinDonor,
    heroTitle: "JOIN US AS A DONOR — FUND A FUTURE",
    intro: {
      heading: "JOIN THE AAGHAZ DONOR BASE",
      subheading:
        "One-time, monthly or memorial — every contribution is tracked and reported.",
      description: [
        "Join the Aaghaz donor base by registering with us. A member of the team will get in touch with you to walk you through the kind of support you'd like to provide and answer any questions you may have.",
        "Donations to Aaghaz Foundation are eligible for tax exemption under Section 80G in India. We absorb our administrative costs through founder funding and volunteer effort, so 100% of your donation goes towards student aid.",
      ],
    },
    whyChooseUs: {
      title: "Ways to give",
      items: [
        {
          title: "One-time donation",
          description:
            "Give any amount, just once. We will use it for the highest-priority verified case currently in our pipeline.",
        },
        {
          title: "Monthly recurring",
          description:
            "Set up a small monthly contribution. It is the single most effective way to keep a child in school year-on-year.",
        },
        {
          title: "Sponsor a child",
          description:
            "Cover one specific student's annual expenses end-to-end and receive that student's progress reports.",
        },
        {
          title: "Launch a memorial scholarship",
          description:
            "Honour a loved one. Co-design the criteria. Receive an annual report.",
        },
      ],
    },
    signatureServices: {
      title: "What your donation pays for",
      items: [
        {
          title: "Rs 1,000",
          description:
            "Buys textbooks, uniforms and stationery for one school child for an academic year.",
        },
        {
          title: "Rs 5,000",
          description:
            "Covers an entire year's school fees for a student in a government-aided school.",
        },
        {
          title: "Rs 25,000",
          description:
            "Covers a year of college tuition or hostel for an undergraduate student.",
        },
        {
          title: "Rs 50,000+",
          description:
            "Funds a full memorial scholarship in your loved one's name, with annual reports.",
        },
      ],
    },
    process: {
      title: "Becoming a donor",
      description: "",
      steps: [
        {
          title: "1. Register",
          description:
            "Fill the Join us as Donor form with your contact details and area of interest.",
        },
        {
          title: "2. We call you back",
          description:
            "A team member walks you through the giving options that best fit your goals.",
        },
        {
          title: "3. Donate online or by transfer",
          description:
            "Standard online payment, NEFT/UPI or international bank transfer for NRIs and foreign donors.",
        },
        {
          title: "4. Receipts & reports",
          description:
            "Tax-exemption receipt within 7 working days, plus annual reports on the students you've supported.",
        },
      ],
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "launch-scholarship",
    title: "Launch Scholarship",
    heroImage: serviceImages.launchScholarship,
    heroTitle: "LAUNCH A SCHOLARSHIP IN A LOVED ONE'S NAME",
    intro: {
      heading: "LAUNCH A MEMORIAL OR NAMED SCHOLARSHIP",
      subheading:
        "Many of our donors choose to support Aaghaz by offering scholarships in someone's name.",
      description: [
        "A memorial scholarship is one of the most enduring tributes we know. It honours a parent, a sibling, a teacher or a friend by ensuring that, every year, one or more deserving students complete the education they could not otherwise afford.",
        "We design each scholarship together with you — its name, its criteria, its duration — and we report back every year on the lives it has touched.",
      ],
    },
    whyChooseUs: {
      title: "What we co-design with you",
      items: [
        {
          title: "Name & dedication",
          description:
            "The scholarship is named exactly as you wish — \"The XYZ Memorial Scholarship\" or any other phrasing.",
        },
        {
          title: "Eligibility criteria",
          description:
            "Region, age, gender, course, academic threshold — defined together and documented in a simple MOU.",
        },
        {
          title: "Duration & cohort size",
          description:
            "Decide whether the scholarship runs for one year or many, and how many students it covers each year.",
        },
        {
          title: "Reporting cadence",
          description:
            "Annual or semester-wise reports with photographs, results and short notes from the students.",
        },
      ],
    },
    signatureServices: {
      title: "Sample scholarship structures",
      items: [
        {
          title: "Single-year, single-student",
          description:
            "Rs 50,000 covers one student's school or college year end-to-end. Ideal for a personal tribute.",
        },
        {
          title: "Three-year cohort",
          description:
            "Rs 1.5–3 lakh over three years sponsors a student through their full graduation programme.",
        },
        {
          title: "Annual rolling cohort",
          description:
            "A long-term commitment that funds 1–5 students every year in perpetuity in your loved one's name.",
        },
        {
          title: "Subject or region-specific",
          description:
            "Scholarships restricted to girls in STEM, students from a specific district, or first-generation learners — your choice.",
        },
      ],
    },
    process: {
      title: "How to launch a scholarship",
      description: "",
      steps: [
        {
          title: "1. Tell us the story",
          description:
            "Share who you'd like to honour and why. We will listen, and we will not rush you.",
        },
        {
          title: "2. Co-design the scholarship",
          description:
            "We agree on the name, criteria, duration and budget — and capture everything in a short, plain-English MOU.",
        },
        {
          title: "3. Selection of students",
          description:
            "Aaghaz selects students from our verified pipeline who match your criteria.",
        },
        {
          title: "4. Disbursement & annual reporting",
          description:
            "Funds are disbursed directly to the institutions, and you receive a detailed report every year.",
        },
      ],
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=900&q=80",
    ],
  },
];
