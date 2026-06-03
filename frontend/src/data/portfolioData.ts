import { portfolioImages } from "./imageAssets";

export interface PortfolioItem {
  id: string;
  title: string;
  services: string;
  date: string;
  location: string;
  heroImage: string;
  description: string[];
  galleryImages: string[];
  videoUrl?: string; // YouTube ID
  testimonial?: {
    quote: string;
    author: string;
  };
}

// Aaghaz Foundation — real-world impact stories
export const portfolioData: PortfolioItem[] = [
  {
    id: "graveyard-orphans",
    title: "Orphans in Lucknow Graveyard",
    services: "Emergency Aid, School Help, Mentorship",
    date: "2018",
    location: "Lucknow, Uttar Pradesh",
    heroImage: portfolioImages.graveyardOrphans,
    description: [
      "A journalist told us about a group of children living in a graveyard near Lucknow. Our volunteers reached them in 48 hours.",
      "We helped them find a safe home, got all of them into a school, and gave monthly food rations to their older sister who looked after them. Our donors promised to support their studies for ten years.",
      "Today, three of these children are studying in college with Aaghaz scholarships, and one passed her Class 12 exams with very good marks.",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    ],
    testimonial: {
      quote:
        "We did not know what we would do tomorrow. Aaghaz volunteers simply came and stayed with us to help.",
      author: "The eldest sister, now studying in college",
    },
  },
  {
    id: "pune-techie-scholarship",
    title: "Memorial Scholarship in Pune",
    services: "Memorial Scholarship, Progress Reports",
    date: "2019",
    location: "Pune, Maharashtra",
    heroImage: portfolioImages.puneScholarship,
    description: [
      "A family in Pune lost their young son, a software developer, to a sudden illness. They wanted to keep his memory alive, so they started a Rs 2 lakh yearly scholarship with Aaghaz.",
      "We decided to help three poor students every year in Maharashtra and UP, giving preference to students who want to become engineers.",
      "In three years, nine students have completed their studies using this scholarship, and the family has met five of them in person.",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=900&q=80",
    ],
    testimonial: {
      quote:
        "Knowing that nine students can study because of our son has helped us heal in a way we did not expect.",
      author: "A donor family",
    },
  },
  {
    id: "school-for-poor",
    title: "Free Study Center in Lucknow",
    services: "After-school classes, Library, Computers",
    date: "2018 — Present",
    location: "Lucknow, Uttar Pradesh",
    heroImage: portfolioImages.schoolForPoor,
    description: [
      "We started a small tuition room in Lucknow in 2011. Today, it is a big study center called the Lucknow Guidance Centre (LCGC). We help over 200 children every week.",
      "Children come for free classes, but they stay to read in our library, use the computers, and do their homework. Many of our senior volunteers today were once LCGC students.",
      "This is the real heart of Aaghaz: not big banners, but a quiet room that says 'come in and study'.",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "rahmani-30-cohort",
    title: "Free Exam Coaching (Rahmani 30)",
    services: "Free Boarding, IIT-JEE and NEET Coaching",
    date: "2020 — 2022",
    location: "Uttar Pradesh",
    heroImage: portfolioImages.rahmaniCohort,
    description: [
      "Aaghaz partnered with Rahmani 30 to give two years of free coaching and stay to 30 bright students from poor districts of UP.",
      "Our volunteers handled the entire setup. They checked family backgrounds, conducted interviews, and helped parents understand the program.",
      "By the end of two years, many students cleared IIT, NEET, and CA exams. Many were the first in their families to sit for these national exams.",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    ],
    testimonial: {
      quote:
        "I had never heard of IIT before. Two years later, I got admission into one.",
      author: "An Aaghaz student",
    },
  },
  {
    id: "girl-students-hardoi",
    title: "Helping Girls in Hardoi Stay in School",
    services: "Fees, Uniforms, Bicycles, Guiding",
    date: "2021 — Present",
    location: "Hardoi, Uttar Pradesh",
    heroImage: portfolioImages.hardoiGirls,
    description: [
      "A teacher told us that many girls in a village in Hardoi were leaving school to work at home. We started a program to give them fees, uniforms, hygiene supplies, and bicycles so they could travel easily.",
      "Our volunteers also talked to their parents patiently to show them why sending girls to school is important.",
      "Three years later, all the girls from that batch are still in school. Two have completed school and are studying nursing with our help.",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
    ],
    testimonial: {
      quote:
        "Now my daughter cycles to school every morning. The neighbors who used to talk now ask me how to apply.",
      author: "Mother of a student, Hardoi",
    },
  },
  {
    id: "csr-employee-giving",
    title: "Corporate Partnerships",
    services: "CSR Partnership, Employee Volunteering",
    date: "2022 — Present",
    location: "Bengaluru & Hyderabad",
    heroImage: portfolioImages.csrPartnership,
    description: [
      "A company in Bengaluru wanted to partner with us. We set up a program where employees donate monthly, visit our study center in Lucknow to teach, and sponsor 25 students every year.",
      "So far, the program has supported over 50 students and brought 80 employees to help in our classrooms.",
      "We write clean reports and paperwork for all our company partners.",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
    ],
  },
];
