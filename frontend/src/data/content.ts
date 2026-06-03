// Aaghaz Foundation — Content & Copy
// Pehla qadam. Phir taleem. Phir tabdeeli.
// (The first step. Then education. Then transformation.)

import { heroImages } from "./imageAssets";

export const heroSlides = [
  {
    title: "Aaghaz · A Beginning",
    subtitle: "Every child has the right to study. We make sure they get that chance.",
    image: heroImages.girlSmiling,
  },
  {
    title: "Twenty Years. One Promise.",
    subtitle: "Helping children study since 2004.",
    image: heroImages.schoolGroup,
  },
  {
    title: "From Rs 2,000 to a Movement",
    subtitle: "We started with one student. Now we help thousands across India.",
    image: heroImages.childReading,
  },
  {
    title: "Verified. Volunteer-Led. Honest.",
    subtitle: "We meet every student at home. We track every rupee you donate.",
    image: heroImages.classroomTeacher,
  },
  {
    title: "Coaching That Cracks Codes",
    subtitle: "Free coaching classes for IIT, NEET, and CA exams in UP.",
    image: heroImages.studentBlackboard,
  },
  {
    title: "A Quiet Room To Study",
    subtitle: "Free study center and library for children in Lucknow since 2011.",
    image: heroImages.libraryStudy,
  },
  {
    title: "One Donation. One Future.",
    subtitle: "Many children in India still cannot read or write. Help us change this today.",
    image: heroImages.kidsLearning,
  },
  {
    title: "Honour Their Name. Fund Their Dream.",
    subtitle: "Start a scholarship in memory of a loved one to help a child study.",
    image: heroImages.outdoorEducation,
  },
];

export const introContent = {
  heading: "Pehla Qadam. Phir Taleem. Phir Tabdeeli.",
  text: [
    "We started in 2004 in Lucknow. Three friends came together with Rs 2,000 to help one poor student. Today, our goal is still the same: no child should stop going to school just because their family has no money.",
    "We do not just give money and leave. Our volunteers visit every student's home to meet their family. We pay the school fees directly, keep check on the child's progress, and update the donor who helped them.",
  ],
};

export const portfolioContent = {
  heading: "Twenty Years. Thousands of Stories.",
  description:
    "Read these true stories of children who got help, families who found hope, and donors who supported them. We still keep in touch with these families. Read their stories to know more about our work.",
};

export const services = [
  {
    ...heroSlides[0],
    id: "student-aid",
    description:
      "Help with school and college fees for children from poor families. We cover school fees, books, exam fees, and uniforms so they can keep studying.",
  },
  {
    ...heroSlides[1],
    id: "scholarships",
    description:
      "Scholarships funded by donors to help students study. We track every rupee and send reports to the donors.",
  },
  {
    ...heroSlides[2],
    id: "financial-assistance",
    description:
      "School and college fee help given to good students from poor families after our volunteers visit their homes.",
  },
  {
    ...heroSlides[4],
    id: "computer-center",
    description:
      "Free computer classes and digital training for children from poor families in Lucknow.",
  },
  {
    ...heroSlides[5],
    id: "madarsa-initiative",
    description:
      "Helping madarsa students learn modern subjects, computer skills, and get job guidance.",
  },
  {
    ...heroSlides[7],
    id: "memorial-scholarship",
    description:
      "Start a scholarship in the memory of a loved one to pay for a child's school fees. We send you yearly progress updates.",
  },
  {
    ...heroSlides[3],
    id: "become-volunteer",
    description:
      "Aaghaz runs because of volunteers. Our team meets students, checks their homes, and guides them in their studies.",
  },
  {
    ...heroSlides[6],
    id: "join-as-donor",
    description:
      "Your donation pays for school fees, hostel rent, books, and study help for poor students. We send you their photos and progress reports.",
  },
  {
    ...heroSlides[7],
    id: "launch-scholarship",
    description:
      "Start a scholarship in the name of a parent, teacher, or friend. You choose who to help, and we send you yearly reports.",
  },
];

export const whyChooseContent = {
  heading: "Why Donors and Volunteers Trust Us",
  description:
    "We are a small group working since 2004. People trust us because we keep our promises. Our donors stay with us, our volunteers keep helping, and students we once helped now donate to help others.",
  points: [
    "Working on the ground for 20 years with the same office, email, and phone number.",
    "At least two volunteers visit every student's house before we give any help.",
    "Our founders pay for office costs — so 100% of your donation goes to the child.",
    "Our study center in Lucknow has been open every weekday since 2011.",
    "Our partnership with Rahmani 30 helps village students pass IIT and NEET exams.",
  ],
  footer:
    "School fees are not a luxury, and education is not a favor. It is the best way to help families escape poverty, so we keep this support going.",
};

export const aboutContent = {
  heading: "About Aaghaz Foundation",
  text: [
    "Aaghaz Foundation is a registered charity. It was started in Lucknow in 2004 by journalist Mazhar Farooqui and his friends. They began with just Rs 2,000 to help one poor student. Today, it is one of the most trusted education charities in North India.",
    "Over the years, we have helped thousands of children across India through our scholarships and fee support. We do not approve cases blindly. Our volunteers meet every student and visit their homes to understand their real needs.",
    "We work with a large group of donors, teachers, and volunteers. We all believe that every child in India has the right to read, write, and study, and we must do our part to help.",
  ],
  author: "Mazhar Farooqui — Founder",
};

export const blogPosts = [
  {
    title: "Aaghaz Foundation Supports Orphans Living In A Graveyard",
    category: "News",
    excerpt:
      "When a news story showed children living and studying in a graveyard near Lucknow, Aaghaz volunteers reached there within 3 days to help...",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Rs 2 lakh Scholarship in Pune Techie's Name",
    category: "Scholarships",
    excerpt:
      "The family of a young software engineer started a scholarship in his name to pay school fees for three poor students...",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Aaghaz Opens A School For The Poor In Lucknow",
    category: "Projects",
    excerpt:
      "Our study center in Lucknow now helps more than 200 children every week with free classes...",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
  },
];

export const faqs = [
  {
    question: "What does Aaghaz Foundation actually do?",
    answer:
      "Aaghaz Foundation helps clever students from poor families in India finish their education. We provide scholarships, help pay school and college fees, and run free study centers (like LCGC in Lucknow) and coaching classes (like Rahmani 30 in UP).",
  },
  {
    question: "How do you decide who gets a scholarship?",
    answer:
      "Every student who asks for help is visited by our volunteers. At least two volunteers visit the student's home and school to check their financial condition and their marks. We only help students who really need it and want to study.",
  },
  {
    question: "How can I donate?",
    answer:
      "You can donate through our website. 100% of your donation is used to pay school fees for students, because our founders pay for all administrative and office costs. You also get a tax exemption receipt (Section 80G) for your donation.",
  },
  {
    question: "Can I launch a memorial or named scholarship?",
    answer:
      "Yes. You can start a scholarship in memory of a parent, sibling, teacher, or friend. You can choose the rules, like helping only girls or students from a specific area. We send you progress updates of the students who receive your scholarship.",
  },
  {
    question: "How do I become a volunteer?",
    answer:
      "Aaghaz runs on volunteer support. You can help us by visiting students' homes for verification in your city, or help us online with computer work, social media, or guiding students. Please register on our website and we will contact you.",
  },
  {
    question: "What is Rahmani 30 and how is Aaghaz connected to it?",
    answer:
      "Rahmani 30 is a coaching program that prepares poor students for difficult exams like IIT-JEE and NEET. Aaghaz has joined hands with them to run free coaching centers in Uttar Pradesh so village students can get free training.",
  },
  {
    question: "What is the Lucknow Coaching & Guidance Centre (LCGC)?",
    answer:
      "Since 2011, Aaghaz runs a free after-school study center in Lucknow. It has a quiet library, computers, and teachers to help children who do not have these resources at home. Over 200 children study here every week.",
  },
  {
    question: "How do I apply for student aid for myself or my child?",
    answer:
      "Fill the application form on our website. We help pay school fees, college fees, books, and hostel costs for poor families. After you apply, our volunteers will visit your home to check your details.",
  },
  {
    question: "Is Aaghaz Foundation registered? Are donations tax-exempt?",
    answer:
      "Yes. Aaghaz Foundation is a registered charity in India. Indian donors get a tax deduction under Section 80G. We will send you a donation receipt within 7 days.",
  },
  {
    question: "How can my company partner with Aaghaz?",
    answer:
      "Companies can support us through CSR funds. You can sponsor a classroom, fund a scholarship group, or sponsor a coaching center. Write to us at aaghaz.foundation@gmail.com and we will help you set it up.",
  },
];

export const ctaContent = {
  heading: "Help a child finish school this year.",
  text: [
    "Many children in India still do not get the chance to go to school. While we cannot solve this big problem overnight, we can change a child's life one at a time. Your donation will help one child stay in school. Start helping today.",
  ],
};

export const shortVideos = [
  {
    id: 1,
    title: "Listen to one of our students",
    videoUrl:
      "/images/videos/elegantizeevents_reel_11_6_2025_8_30_00-pm3759951878449372084.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "See inside our coaching center",
    videoUrl:
      "/images/videos/djtm_official_reel_12_18_2025_3_23_36-am3789871397074796955.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "A day at our Lucknow study center",
    videoUrl:
      "/images/videos/elegantizeevents_reel_12_12_2024_10_30_00-pm3521561008227581106.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "How we visit and check student homes",
    videoUrl:
      "/images/videos/elegantizeevents_reel_12_29_2025_9_30_33-pm3798394431771591975.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Our founder talks about 20 years of Aaghaz",
    videoUrl:
      "/images/videos/elegantizeevents_reel_12_29_2025_9_30_33-pm3798394431771591975.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "A donor talks about starting a scholarship",
    videoUrl:
      "/images/videos/elegantizeevents_reel_5_27_2022_1_07_26-am2846867921226300535.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "Our volunteers working on the ground",
    videoUrl:
      "/images/videos/elegantizeevents_reel_11_6_2025_8_30_00-pm3759951878449372084.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=600&q=80",
  },
];
