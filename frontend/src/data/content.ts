// Aaghaz Foundation — Content & Copy
// Pehla qadam. Phir taleem. Phir tabdeeli.
// (The first step. Then education. Then transformation.)

import { heroImages } from "./imageAssets";

export const heroSlides = [
  {
    title: "Aaghaz · A Beginning",
    subtitle: "Every child deserves a beginning. We just make sure they get one.",
    image: heroImages.girlSmiling,
  },
  {
    title: "Twenty Years. One Promise.",
    subtitle: "Education out of reach for no one — since 2004.",
    image: heroImages.schoolGroup,
  },
  {
    title: "From Rs 2,000 to a Movement",
    subtitle: "What started with one student is now thousands across India.",
    image: heroImages.childReading,
  },
  {
    title: "Verified. Volunteer-Led. Honest.",
    subtitle: "Every case is met. Every rupee is traced. Every promise is kept.",
    image: heroImages.classroomTeacher,
  },
  {
    title: "Coaching That Cracks Codes",
    subtitle: "Rahmani 30 with Aaghaz — IIT, NEET, CA, free of cost in UP.",
    image: heroImages.studentBlackboard,
  },
  {
    title: "A Quiet Room To Study",
    subtitle: "LCGC has welcomed Lucknow's children, free, every day since 2011.",
    image: heroImages.libraryStudy,
  },
  {
    title: "One Donation. One Future.",
    subtitle: "Three Indians out of ten cannot read. Help us change that — today.",
    image: heroImages.kidsLearning,
  },
  {
    title: "Honour Their Name. Fund Their Dream.",
    subtitle: "Launch a memorial scholarship — and let love finish school.",
    image: heroImages.outdoorEducation,
  },
];

export const introContent = {
  heading: "Pehla Qadam. Phir Taleem. Phir Tabdeeli.",
  text: [
    "It began in 2004 with two thousand rupees, three friends, and one student in Lucknow who had nowhere else to turn. Twenty years later, that same idea — that nobody should be left out of a classroom because their family ran out of money — still runs everything we do.",
    "Aaghaz is not a charity that drops gifts and disappears. We meet every student, visit every home, sit with every family. Then we pay the school directly, follow the child through the year, and report back to the donor who made it possible.",
  ],
};

export const portfolioContent = {
  heading: "Twenty Years. Ten Thousand Stories.",
  description:
    "Each story below is a child whose life turned, a family that breathed again, a donor who said yes. They are not poster cases — they are people we still call and check in on. Browse a few; they say more about us than any brochure could.",
};

export const services = [
  {
    ...heroSlides[0],
    id: "student-aid",
    description:
      "Need-based financial assistance for school and college students from underprivileged families. Tuition, books, exam fees, uniforms — whatever stands between a child and the next class.",
  },
  {
    ...heroSlides[1],
    id: "scholarships",
    description:
      "Annual and memorial scholarships funded by donors who want to honour a loved one or simply invest in a child's future. Every rupee is tracked, every report shared.",
  },
  {
    ...heroSlides[2],
    id: "financial-assistance",
    description:
      "Merit-cum-means scholarships of varying amounts awarded after a verified pre-scholarship survey by our volunteer team — never before.",
  },
  {
    ...heroSlides[4],
    id: "computer-center",
    description:
      "Free computer education and digital skills training for underprivileged children in Lucknow, bridging the digital divide.",
  },
  {
    ...heroSlides[5],
    id: "madarsa-initiative",
    description:
      "Supporting madarsa students with modern education, vocational training, and career counseling to ensure holistic development.",
  },
  {
    ...heroSlides[7],
    id: "memorial-scholarship",
    description:
      "Create lasting legacies by funding education in honor of loved ones, with customizable criteria and annual impact reports.",
  },
  {
    ...heroSlides[3],
    id: "become-volunteer",
    description:
      "Aaghaz is a volunteer-driven organisation. Our field volunteers identify, verify and mentor each beneficiary — keeping us honest and our students supported.",
  },
  {
    ...heroSlides[6],
    id: "join-as-donor",
    description:
      "Your donation directly funds school fees, hostel rent, lab equipment and life-changing mentorship for a verified student. We send you photos, progress reports and the occasional thank-you letter.",
  },
  {
    ...heroSlides[7],
    id: "launch-scholarship",
    description:
      "Launch a scholarship in the name of a parent, teacher or friend. We co-design the criteria with you and send annual reports on the students it supports.",
  },
];

export const whyChooseContent = {
  heading: "Why People Stay With Aaghaz",
  description:
    "We're a small foundation that has held on for two decades because we keep our word. Our donors don't leave. Our volunteers come back. And the students we fund tend to fund the next batch themselves, years later.",
  points: [
    "Twenty years on the ground — same office, same email address, same phone.",
    "Two volunteers visit every household before a single rupee is approved.",
    "Founder funding covers our overheads — your donation goes 100% to the child.",
    "LCGC has been open every weekday since 2011. No locks, no waiting list.",
    "Rahmani 30 partnership has produced IIT and NEET qualifiers from villages.",
  ],
  footer:
    "School fees aren't a luxury, and education isn't a favour. It's the one bridge out of poverty we know works — so we keep that bridge open.",
};

export const aboutContent = {
  heading: "About Aaghaz Foundation",
  text: [
    "Aaghaz Foundation is a non-profit organisation that was founded in 2004 by journalist Mazhar Farooqui and a few of his friends in Lucknow with just Rs 2,000 and one needy student. What began as a quiet act of solidarity has grown into one of north India's most trusted education-focused charities.",
    "For over a decade we have impacted thousands of children all over India through our unique scholarship programs, and through our timely intervention in each individual case that is brought to us. We do not run a generic application form — every student is met, every family is visited, every case is built around a real human being.",
    "Our work is sustained by a network of donors, journalists, teachers and field volunteers who share one belief: that 34% of India is illiterate is unacceptable, and that each of us — in whatever capacity — has a role to play in changing that statistic.",
  ],
  author: "Mazhar Farooqui — Founder",
};

export const blogPosts = [
  {
    title: "Aaghaz Foundation Supports Orphans Living In A Graveyard",
    category: "News",
    excerpt:
      "When a Gulf News story revealed children living and studying among graves on the outskirts of Lucknow, Aaghaz volunteers stepped in within 72 hours...",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Rs 2 lakh Scholarship in Pune Techie's Name",
    category: "Scholarships",
    excerpt:
      "A young software engineer's family chose to launch a memorial scholarship in his name — funding three students through their final years of school...",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Aaghaz Opens A School For The Poor In Lucknow",
    category: "Projects",
    excerpt:
      "An update on our community classroom programme — and how the Lucknow Coaching & Guidance Centre is now serving 200+ children every week...",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
  },
];

export const faqs = [
  {
    question: "What does Aaghaz Foundation actually do?",
    answer:
      "Aaghaz Foundation is a non-profit organisation supporting meritorious students from economically weak backgrounds across India. We run scholarships, need-based financial assistance for school and college fees, the Rahmani 30 coaching tie-up in Uttar Pradesh, and the Lucknow Coaching & Guidance Centre (LCGC). We were founded in 2004 by journalist Mazhar Farooqui and his friends in Lucknow with just Rs 2,000 and one needy student.",
  },
  {
    question: "How do you decide who gets a scholarship?",
    answer:
      "Every student is recommended to us — usually by a teacher, neighbour, journalist or earlier beneficiary. Once recommended, we ask our volunteers to conduct a pre-scholarship survey: a minimum of two volunteers visit the student's home and school to verify the family's financial situation, the child's academic record and their genuine willingness to study. Only after both surveys agree do we onboard the student. This process keeps us honest and protects donors' trust.",
  },
  {
    question: "How can I donate?",
    answer:
      "You can donate any amount, one-time or monthly, through our donation page. 100% of your contribution goes towards student aid — our administrative costs are absorbed by founder funding and volunteer effort. Donations to Aaghaz Foundation are eligible for tax exemption under Section 80G in India. After donating, you will receive a receipt and, if you wish, periodic updates on the students your contribution supports.",
  },
  {
    question: "Can I launch a memorial or named scholarship?",
    answer:
      "Yes. Many of our donors choose to support Aaghaz by launching a scholarship — often in memory of a parent, sibling, teacher or friend. We work with you to define the criteria (age, gender, region, course of study) and the duration, and we send you annual reports on the students it supports. A typical memorial scholarship starts at Rs 50,000 per student per year, but we are happy to design something at any budget.",
  },
  {
    question: "How do I become a volunteer?",
    answer:
      "Aaghaz is a volunteer-driven organisation, and we are always looking for more hands. Field volunteers help with pre-scholarship surveys in their own city or town. Online volunteers help with documentation, social media, mentoring students remotely and organising fundraising. Just register through our Become a Field Volunteer page and a member of the team will get in touch within a few working days.",
  },
  {
    question: "What is Rahmani 30 and how is Aaghaz connected to it?",
    answer:
      "Rahmani 30 is a well-known coaching initiative that prepares students from underprivileged backgrounds for IIT-JEE, NEET, CA and other competitive exams. Aaghaz Foundation has tied up with Rahmani 30 to open and run learning centres in Uttar Pradesh, where deserving students undergo intensive residential and day-school coaching at no cost to their families.",
  },
  {
    question: "What is the Lucknow Coaching & Guidance Centre (LCGC)?",
    answer:
      "Since 2011, Aaghaz has been successfully running a facility in Lucknow called the Lucknow Coaching & Guidance Centre (LCGC). It offers structured after-school tuition, a quiet library, computer access and one-on-one career counselling for children from neighbourhoods where these resources simply do not exist. LCGC currently serves 200+ children every week.",
  },
  {
    question: "How do I apply for student aid for myself or my child?",
    answer:
      "Use the Apply for Student Aid form on our website. Before applying, please read the eligibility criteria and our terms — we cover school fees, college fees, books, hostel, exam fees and similar academic expenses for verified low-income families. We do not provide aid for travel abroad, capitation fees or non-academic expenses. Once your application is submitted, our volunteer team will reach out to schedule a survey.",
  },
  {
    question: "Is Aaghaz Foundation registered? Are donations tax-exempt?",
    answer:
      "Yes. Aaghaz Foundation is a registered non-profit organisation in India. Donations made by Indian residents are eligible for tax exemption under Section 80G of the Income Tax Act, and we issue receipts within seven working days of every donation. For NRIs and foreign donors please contact us at aaghaz.foundation@gmail.com to discuss the most appropriate route.",
  },
  {
    question: "How can my company partner with Aaghaz?",
    answer:
      "We welcome corporate partnerships — under CSR commitments, employee giving, payroll-linked donations or skill-based volunteering. Your team can adopt a class, launch a corporate-named scholarship, sponsor a learning centre or mentor students online. Write to aaghaz.foundation@gmail.com with your CSR focus areas and we will design a partnership that genuinely moves the needle.",
  },
];

export const ctaContent = {
  heading: "Become the reason one child finishes school this year.",
  text: [
    "One in three Indians cannot read this sentence. That's the largest population of unschooled children in the world — bigger than the entire population of most countries. The number is too big to fix overnight, but it shrinks by exactly one every time you fund one child. Today is a good day to be that one.",
  ],
};

export const shortVideos = [
  {
    id: 1,
    title: "Hear from a scholarship student",
    videoUrl:
      "/images/videos/elegantizeevents_reel_11_6_2025_8_30_00-pm3759951878449372084.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Inside the Rahmani 30 centre",
    videoUrl:
      "/images/videos/djtm_official_reel_12_18_2025_3_23_36-am3789871397074796955.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "A day at LCGC, Lucknow",
    videoUrl:
      "/images/videos/elegantizeevents_reel_12_12_2024_10_30_00-pm3521561008227581106.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "How a pre-scholarship survey works",
    videoUrl:
      "/images/videos/elegantizeevents_reel_12_29_2025_9_30_33-pm3798394431771591975.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Founder Mazhar Farooqui on 20 years of Aaghaz",
    videoUrl:
      "/images/videos/elegantizeevents_reel_12_29_2025_9_30_33-pm3798394431771591975.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "A donor on launching a memorial scholarship",
    videoUrl:
      "/images/videos/elegantizeevents_reel_5_27_2022_1_07_26-am2846867921226300535.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "Volunteers in the field",
    videoUrl:
      "/images/videos/elegantizeevents_reel_11_6_2025_8_30_00-pm3759951878449372084.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=600&q=80",
  },
];
