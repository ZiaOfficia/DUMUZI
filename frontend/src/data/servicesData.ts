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
    heroTitle: "STUDENT AID — HELPING DESERVING KIDS STAY IN SCHOOL",
    intro: {
      heading: "STUDENT AID PROGRAM",
      subheading:
        "Help with fees for school and college students in India.",
      description: [
        "Before you apply for financial help, please read the rules below. Aaghaz Foundation helps bright students from poor families. We cover school fees, college fees, exam fees, books, uniforms, and hostel costs.",
        "Our volunteer team will visit every applicant's home in person. We do not approve applications blindly. We check every detail and track every rupee."
      ],
    },
    whyChooseUs: {
      title: "Who Can Get Help",
      items: [
        {
          title: "Real need for money",
          description:
            "Your family's total income must be low, matching your state's limits for poor families.",
        },
        {
          title: "Good marks in school",
          description:
            "We support students who study hard. Usually, you need at least 60% marks in your last exams. We are flexible if you are the first in your family to study.",
        },
        {
          title: "A known reference",
          description:
            "A teacher, neighbor, journalist, or social worker must be able to confirm your family's situation.",
        },
      ],
    },
    signatureServices: {
      title: "What Student Aid Covers",
      items: [
        {
          title: "School & Exam Fees",
          description:
            "From Class 1 to Class 12 — we cover yearly school fees, board exam fees, and admission charges.",
        },
        {
          title: "College Tuition",
          description:
            "We cover college fees for degrees and professional courses, depending on how much help your family needs.",
        },
        {
          title: "Books, Uniforms & Bags",
          description:
            "We help pay for school uniforms, textbooks, notebooks, and bags.",
        },
        {
          title: "Hostel & Food",
          description:
            "If a student has to live away from home, we help pay for their hostel rent and food.",
        },
      ],
    },
    process: {
      title: "How to Apply",
      description:
        "Here is what happens when you apply for student aid:",
      steps: [
        {
          title: "1. Fill the form",
          description:
            "Submit the Apply for Student Aid form on our website with your basic details and marksheets.",
        },
        {
          title: "2. Volunteer visit",
          description:
            "At least two volunteers will visit your home and school to meet your family.",
        },
        {
          title: "3. Team review",
          description:
            "We review the case and decide how much help we can give you.",
        },
        {
          title: "4. Fee payment",
          description:
            "We pay the fees directly to your school or college. Our volunteers keep in touch with you throughout the year.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "I was going to leave school after Class 10 because my father could not pay the board exam fees. Aaghaz volunteers came to our home and paid the fees within a week. Today, I am studying in college.",
        author: "Sumaiya R.",
        location: "Lucknow, UP",
      },
      {
        quote:
          "We did not know there was help like this. The volunteers were very polite and respectful. They made us feel comfortable.",
        author: "Mother of a student",
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
        "Scholarships for school and college students across India.",
      description: [
        "Many donors support Aaghaz by funding scholarships. You can start a scholarship in memory of a parent, child, teacher, or friend. You can also donate to our general scholarship pool to help students who need it most.",
        "Every scholarship is given after our volunteers visit the student's home. Donors get a yearly report showing how their money helped the student."
      ],
    },
    whyChooseUs: {
      title: "Why Start a Scholarship with Aaghaz",
      items: [
        {
          title: "Honest and direct help",
          description:
            "We meet every student in person before paying. We pay fees directly to the school or college.",
        },
        {
          title: "You choose the rules",
          description:
            "You can decide who to help — such as girls only, a specific study course, or students from a particular town.",
        },
        {
          title: "Yearly progress reports",
          description:
            "We share photos, marksheets, and small thank-you notes from the students every year so you can see the impact.",
        },
      ],
    },
    signatureServices: {
      title: "Types of Scholarships",
      items: [
        {
          title: "Memorial Scholarship",
          description:
            "Honor a loved one by starting a scholarship in their name. It starts at Rs 25,000 per year, and we can design it to fit your budget.",
        },
        {
          title: "General Scholarship Pool",
          description:
            "Donate any amount to our general pool. We use this to help the highest priority cases.",
        },
        {
          title: "Company & CSR Scholarships",
          description:
            "Companies can fund a group of students. We provide all the reports needed for CSR audits.",
        },
        {
          title: "Special Scholarships",
          description:
            "Scholarships for girls studying science, first-generation college students, or students preparing for competitive exams.",
        },
      ],
    },
    process: {
      title: "How to Start a Scholarship",
      description: "",
      steps: [
        {
          title: "1. Talk to us",
          description:
            "Tell us who you want to honor, your budget, and what kind of student you want to help.",
        },
        {
          title: "2. Set the rules",
          description:
            "We set the rules together and write down a simple agreement.",
        },
        {
          title: "3. Select students",
          description:
            "We select matching students from our checked list and pay their college or school directly.",
        },
        {
          title: "4. Get reports",
          description:
            "Every year, you will get a report with the student's marks, photos, and a personal note.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "We started a scholarship in our son's name. Knowing that three students are completing their studies because of him every year has helped our family heal in a way we did not expect.",
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
    heroTitle: "FINANCIAL ASSISTANCE — HELP IN DIFFICULT TIMES",
    intro: {
      heading: "FINANCIAL ASSISTANCE PROGRAM",
      subheading:
        "Emergency and regular help for study expenses.",
      description: [
        "Sometimes, a family is doing their best but faces a sudden problem. A temporary money crisis should not stop a child from studying. Aaghaz provides quick help — sometimes one-time, sometimes every year — to keep children in school.",
        "Our volunteers check every emergency case. We act fast, and most urgent cases are resolved within a week."
      ],
    },
    whyChooseUs: {
      title: "What We Help With",
      items: [
        {
          title: "Sudden fee problems",
          description:
            "If school fees are due, or board admit cards are held back due to unpaid fees, we pay immediately.",
        },
        {
          title: "Loss of a parent",
          description:
            "If the earning parent passes away, we pay the children's fees for the rest of the year.",
        },
        {
          title: "Medical emergencies",
          description:
            "If a parent's medical bills take away the money kept for school, we pay the fees to keep the kids in school.",
        },
      ],
    },
    signatureServices: {
      title: "How We Provide Help",
      items: [
        {
          title: "Emergency fee help",
          description:
            "We pay the urgent school or college fees directly to the institution.",
        },
        {
          title: "Monthly support",
          description:
            "For difficult cases, we give monthly money help until the family's situation improves.",
        },
        {
          title: "Coaching & study help",
          description:
            "We give free access to our study center in Lucknow and coaching centers in UP.",
        },
      ],
    },
    process: {
      title: "How We Resolve Cases",
      description: "",
      steps: [
        {
          title: "1. Student is recommended",
          description:
            "A teacher, neighbor, journalist, or volunteer alerts us about a student in trouble.",
        },
        {
          title: "2. Quick check",
          description:
            "Two volunteers visit the family and submit a report within 3 days.",
        },
        {
          title: "3. Approval",
          description:
            "Our committee reviews the report and approves the money.",
        },
        {
          title: "4. Payment",
          description:
            "We pay the fees directly to the school or college. Volunteers keep check on the family every month.",
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
      "AAGHAZ FOUNDATION FREE COMPUTER CENTER — LUCKNOW",
    intro: {
      heading: "Learn Computers for Free with Aaghaz Foundation",
      subheading:
        "Free, certified computer training for girls and poor youth in Lucknow.",
      description: [
        "Our Computer Learning Center (AFCLC) is located in Balda Colony, near the New Hyderabad Post Office in Lucknow. It is run for free by Co-Founder Suhel Khaleel and Tariq Khan.",
        "We help poor students learn computer skills to find jobs. More than 150 students have completed our courses, built their confidence, and found good jobs.",
        "Under our center head, Mr. Mohd Ebad, and teacher Waheed Uz Zama, students get hands-on computer practice and mock tests. We make sure every student gets proper attention."
      ],
    },
    whyChooseUs: {
      title: "Our Goal",
      items: [
        {
          title: "Free computer training",
          description:
            "The center is open to all poor youth, especially girls and minorities who want to learn computers.",
        },
        {
          title: "Practical training",
          description:
            "We focus on real practice. Every student gets a computer to practice on, with easy, step-by-step guidance.",
        },
        {
          title: "Government certificates",
          description:
            "We prepare students for the government-approved NIELIT 'CCC' exam, which helps them apply for government and private jobs.",
        },
      ],
    },
    signatureServices: {
      title: "What We Teach",
      items: [
        {
          title: "Computer Basics",
          description:
            "How a computer works, parts of the system, files, folders, and safety rules.",
          features: [
            "Computer parts and how they work",
            "Managing files and folders",
            "Saving files and shut down rules",
          ],
        },
        {
          title: "Windows Operating System",
          description:
            "How to use Windows, files, and computer settings.",
          features: [
            "Windows navigation & shortcuts",
            "Command line basics",
            "Installing programs",
          ],
        },
        {
          title: "MS Office (Word, Excel, PowerPoint)",
          description:
            "How to write letters, create sheets with formulas, and make slides.",
          features: [
            "MS Word - writing and tables",
            "MS Excel - formulas and charts",
            "PowerPoint - creating slides",
          ],
        },
        {
          title: "Hindi and English Typing",
          description:
            "Learn fast and correct typing, which is needed for data-entry and office jobs.",
          features: [
            "Correct typing posture",
            "Speed and accuracy tests",
            "Hindi Unicode typing",
          ],
        },
        {
          title: "Internet & Online Work",
          description:
            "Safe internet search, email, filling forms online, and digital payments.",
          features: [
            "Email and search basics",
            "Online forms and government sites",
            "UPI and digital payments",
          ],
        },
        {
          title: "NIELIT 'CCC' Prep",
          description:
            "Full training and practice tests for the government's Course on Computer Concepts.",
          features: [
            "Complete syllabus coverage",
            "Mock tests & revision",
            "Government certificate on passing",
          ],
        },
      ],
    },
    process: {
      title: "How AFCLC Works",
      description:
        "Practical classes • Simple step-by-step lessons • Personal help • Weekly practice tests",
      steps: [
        {
          title: "1. Visit & Enrol",
          description:
            "Visit us at 406/2A, Balda Colony, near New Hyderabad Post Office, Lucknow. The course is completely free. Seats are limited, so we take students on first-come, first-served basis.",
        },
        {
          title: "2. Practice in Lab",
          description:
            "Every student gets a computer to practice on. Our teacher Mohd Ebad guides you every day.",
        },
        {
          title: "3. Tests & Revision",
          description:
            "We hold weekly tests and mock CCC exams to make sure you are ready.",
        },
        {
          title: "4. Get Certified",
          description:
            "After passing, get our center certificate and the government NIELIT CCC certificate to apply for jobs.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "I learned MS-Office and typing here. Today, I work as an office clerk. The certificate from this center helped me pass my interview.",
        author: "Bushra Khan",
        location: "AFCLC alumnus · Finance Clerk",
      },
      {
        quote:
          "I did not know how to use computers. Today, I work as a support executive and help my sister study on her laptop.",
        author: "Noman Azim",
        location: "AFCLC alumnus · Tele-Caller Executive",
      },
      {
        quote:
          "The center taught me Excel and data entry. Within three months of finishing the course, I got a job as a Data Entry Operator.",
        author: "Mohd Nabi",
        location: "AFCLC alumnus · Data Entry Operator",
      },
      {
        quote:
          "The teachers gave me personal attention. I now teach at a school and use my computer skills every day.",
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
    heroTitle: "MADARSA INITIATIVE — MODERN EDUCATION FOR ALL",
    intro: {
      heading: "MADARSA INITIATIVE",
      subheading:
        "Helping madarsa students learn modern school subjects and skills.",
      description: [
        "Our Madarsa program helps students learn regular school subjects along with their religious studies. We work with madarsas to provide books and teachers for math, science, and computers.",
        "This program teaches language, math, science, and computer skills to help madarsa students find good jobs and go for higher studies.",
      ],
    },
    whyChooseUs: {
      title: "Why We Help Madarsa Students",
      items: [
        {
          title: "Education for everyone",
          description:
            "Making sure all children get a chance to learn modern school subjects.",
        },
        {
          title: "Respect for culture",
          description:
            "We respect religious values while teaching modern science and math.",
        },
        {
          title: "Useful skills",
          description:
            "Teaching computer and job skills along with regular studies.",
        },
      ],
    },
    signatureServices: {
      title: "What We Provide",
      items: [
        {
          title: "School Subject Classes",
          description:
            "Extra classes for math, science, and English inside the madarsa.",
        },
        {
          title: "Computer & Job Skills",
          description:
            "Classes for basic computer usage, sewing, and small business skills.",
        },
        {
          title: "Career Guidance",
          description:
            "Helping students choose the right college and apply for jobs.",
        },
        {
          title: "Parent Meetings",
          description:
            "We talk to parents and local leaders to help them support the children's studies.",
        },
      ],
    },
    process: {
      title: "How it works",
      description: "",
      steps: [
        {
          title: "1. Partner with Madarsas",
          description:
            "We work with madarsa heads to set up classes.",
        },
        {
          title: "2. Check student needs",
          description:
            "We check what subjects and skills the children need to learn.",
        },
        {
          title: "3. Start classes",
          description:
            "Our teachers hold regular classes and workshops inside the madarsa.",
        },
        {
          title: "4. Track progress",
          description:
            "We take tests to make sure students are learning well.",
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
    heroTitle: "MEMORIAL SCHOLARSHIPS — HONORING LEGACIES THROUGH EDUCATION",
    intro: {
      heading: "MEMORIAL SCHOLARSHIPS",
      subheading:
        "A meaningful way to remember someone special who is no longer with us.",
      description: [
        "Starting a scholarship in the name of a loved one who has passed away is a beautiful tribute. Your gift will pay for the school or college fees of a poor student who is struggling to study.",
        "Today, we run around 80 memorial scholarships every year, helping hundreds of poor students across India.",
      ],
    },
    whyChooseUs: {
      title: "Why Start a Memorial Scholarship",
      items: [
        {
          title: "Keep their memory alive",
          description:
            "Starting a scholarship is a beautiful way to remember your loved one.",
        },
        {
          title: "Give hope to students",
          description:
            "Their name will inspire and help a child finish school or college.",
        },
        {
          title: "A lasting tribute",
          description:
            "It is a gift that makes a real difference in a student's life.",
        },
      ],
    },
    signatureServices: {
      title: "Donor Options & Information",
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
          title: "Tribute page & card",
          description:
            "We create a tribute card with your loved one's photo and details, and share it on our website and social media.",
        },
        {
          title: "Careful student selection",
          description:
            "Each year we get thousands of applications. Our team checks every application to select students who really need help.",
        },
        {
          title: "Progress reports",
          description:
            "Students receive certificates with your loved one's name on them. We send you their photos and marksheets every year.",
        },
      ],
    },
    process: {
      title: "How to Start a Memorial Scholarship",
      description:
        "To start a scholarship, please share the following details with us. The minimum support is Rs 25,000 per year.",
      steps: [
        {
          title: "1. Name of the person",
          description:
            "The name of the loved one you want to remember.",
        },
        {
          title: "2. Photo",
          description:
            "A photograph of the person to put on the tribute card.",
        },
        {
          title: "3. A short note about them",
          description:
            "A few lines about who they were and what they cared about.",
        },
        {
          title: "4. Yearly donation",
          description:
            "The amount you want to give every year (minimum is Rs 25,000).",
        },
        {
          title: "5. Who to help",
          description:
            "Any preference you have, like helping girl students or orphans.",
        },
        {
          title: "6. Start date",
          description:
            "When you want us to start giving the scholarship.",
        },
        {
          title: "7. Your phone number",
          description:
            "So our team can contact you to set everything up.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "Knowing that children are studying in our loved one's name has helped us heal. Every report feels like a letter from him.",
        author: "A donor family",
        location: "Pune, India",
      },
      {
        quote:
          "I never thought a scholarship in my father's name would reach a girl in a distant island. That certificate was worth everything to us.",
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
        question: "What is the minimum donation?",
        answer:
          "The minimum donation is Rs 25,000 per year. You can choose to fund more than one student or run it for multiple years.",
      },
      {
        question: "How many students apply?",
        answer:
          "Each scholarship gets thousands of applications from all over India. We filter them carefully.",
      },
      {
        question: "Can I choose who gets the money?",
        answer:
          "Yes. You can choose to help girls, orphans, or students from a specific city. We set up the rules according to your choice.",
      },
      {
        question: "How are students selected?",
        answer:
          "Our team checks the marks, home, and family income of every applicant. We give preference to students who have lost their parents or are in extreme need.",
      },
    ],
    namedScholarships: [
      "Rohith Vemula Memorial Scholarship",
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
      note: "If you want to start a scholarship in memory of a loved one, we are here to help. Send us an email or WhatsApp message, and Saima will guide you.",
    },
  },

  {
    id: "become-volunteer",
    title: "Become a Volunteer",
    heroImage: serviceImages.becomeVolunteer,
    heroTitle: "BECOME AN AAGHAZ FIELD VOLUNTEER",
    intro: {
      heading: "AAGHAZ RUNS BECAUSE OF VOLUNTEERS",
      subheading:
        "Our volunteers are the heart of Aaghaz. Join us to help a child finish school.",
      description: [
        "Aaghaz is a volunteer-run group. Volunteers help us find students who need help, visit their homes to check details, and guide the students through their school year.",
        "If you have two hours a week and want to help, you can make a big difference. We need volunteers in cities and towns across India, especially in UP, Bihar, Maharashtra, and Delhi NCR.",
      ],
    },
    whyChooseUs: {
      title: "What Volunteers Do",
      items: [
        {
          title: "Home visits",
          description:
            "Visit a student's home and school to check their details in person before we approve fees.",
        },
        {
          title: "Mentorship",
          description:
            "Stay in touch with one or two students, call them, and help them with their studies.",
        },
        {
          title: "Online help",
          description:
            "Help us with typing work, writing stories, managing social media, or talking to donors.",
        },
      ],
    },
    signatureServices: {
      title: "Volunteer Roles",
      items: [
        {
          title: "Field Volunteer",
          description:
            "Do home visits and check details in your own town or city.",
        },
        {
          title: "Online Mentor",
          description:
            "Talk to a student weekly over video calls to guide them in their studies and career.",
        },
        {
          title: "Story writing & Content",
          description:
            "Help us write stories, take photos, or manage our social media pages.",
        },
        {
          title: "Fundraising Help",
          description:
            "Help us organize small events to raise funds for poor students.",
        },
      ],
    },
    process: {
      title: "How to Join",
      description: "",
      steps: [
        {
          title: "1. Fill the form",
          description:
            "Submit the Become a Field Volunteer form on our website.",
        },
        {
          title: "2. Simple phone call",
          description:
            "A team member will call you to talk about your interests and free hours.",
        },
        {
          title: "3. Orientation",
          description:
            "A quick introduction to Aaghaz's rules and how we work.",
        },
        {
          title: "4. Your first case",
          description:
            "We will assign you your first home visit, pairing you with an experienced volunteer first.",
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
    heroTitle: "JOIN US AS A DONOR — FUND A CHILD'S FUTURE",
    intro: {
      heading: "BECOME AN AAGHAZ DONOR",
      subheading:
        "One-time, monthly, or memorial donations — we track and report every rupee.",
      description: [
        "Register on our website to join our group of donors. A team member will call you to explain how you can help and answer any questions.",
        "Donations to Aaghaz get tax deduction benefits under Section 80G in India. Our founders pay for all office costs, so 100% of your donation is spent on paying student fees.",
      ],
    },
    whyChooseUs: {
      title: "Ways to Donate",
      items: [
        {
          title: "One-time donation",
          description:
            "Donate any amount once. We will use it for the student who needs it most right now.",
        },
        {
          title: "Monthly donation",
          description:
            "Set up a small monthly donation. This is the best way to help a child finish school year after year.",
        },
        {
          title: "Sponsor a child",
          description:
            "Pay the full yearly fees of one specific student and get their progress updates.",
        },
        {
          title: "Memorial Scholarship",
          description:
            "Start a scholarship in the name of a loved one and get yearly reports.",
        },
      ],
    },
    signatureServices: {
      title: "What Your Donation Pays For",
      items: [
        {
          title: "Rs 1,000",
          description:
            "Pays for books, uniforms, and notebooks for one school child for a year.",
        },
        {
          title: "Rs 5,000",
          description:
            "Pays the full yearly school fees for a student in a government school.",
        },
        {
          title: "Rs 25,000",
          description:
            "Pays a year's college fees or hostel rent for a college student.",
        },
        {
          title: "Rs 50,000+",
          description:
            "Funds a full memorial scholarship in your loved one's name with yearly progress reports.",
        },
      ],
    },
    process: {
      title: "How to Become a Donor",
      description: "",
      steps: [
        {
          title: "1. Register online",
          description:
            "Fill the Join us as Donor form on our website.",
        },
        {
          title: "2. Simple phone call",
          description:
            "We will call you to discuss how you would like to help.",
        },
        {
          title: "3. Donate online",
          description:
            "Donate via online payment, bank transfer (NEFT/UPI), or foreign transfer.",
        },
        {
          title: "4. Receipts & reports",
          description:
            "Get your 80G tax receipt within 7 days, and yearly progress updates of the kids you helped.",
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
    heroTitle: "Start a Scholarship in a Loved One's Name",
    intro: {
      heading: "Start a Memorial or Named Scholarship",
      subheading:
        "Start a scholarship in the name of a parent, teacher, or friend.",
      description: [
        "A memorial scholarship is a beautiful way to remember someone special. It pays for the fees of a poor student who would otherwise have to leave school.",
        "We set up the rules together with you (name, criteria, and budget) and send you a progress report of the student every year.",
      ],
    },
    whyChooseUs: {
      title: "What You Can Decide",
      items: [
        {
          title: "Name & Dedication",
          description:
            "Choose the name for the scholarship, like 'The XYZ Memorial Scholarship'.",
        },
        {
          title: "Who is eligible",
          description:
            "Choose the region, age, gender, or study course for the students you want to help.",
        },
        {
          title: "Duration & number of kids",
          description:
            "Decide how many years you want to run the scholarship and how many kids it covers.",
        },
        {
          title: "Report updates",
          description:
            "We send yearly updates with photos and marks of the students you helped.",
        },
      ],
    },
    signatureServices: {
      title: "Example Scholarship Plans",
      items: [
        {
          title: "1 Year, 1 Student",
          description:
            "Rs 50,000 pays for one student's school or college fees for one year. Great for a personal tribute.",
        },
        {
          title: "3-Year Scholarship",
          description:
            "Sponsor a student for their full 3-year college degree.",
        },
        {
          title: "Yearly Rolling Scholarship",
          description:
            "A long-term promise to sponsor one or more students every year.",
        },
        {
          title: "Specific Help",
          description:
            "Scholarships only for girls studying science, or kids from a particular poor district.",
        },
      ],
    },
    process: {
      title: "How to Launch",
      description: "",
      steps: [
        {
          title: "1. Share the story",
          description:
            "Tell us about the person you want to honor and what they cared about.",
        },
        {
          title: "2. Set up the rules",
          description:
            "We agree on the name, rules, and budget, and write down a simple agreement.",
        },
        {
          title: "3. Student selection",
          description:
            "Aaghaz finds matching students from our checked list.",
        },
        {
          title: "4. Payments & updates",
          description:
            "We pay the fees directly to the school, and send you progress reports every year.",
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
