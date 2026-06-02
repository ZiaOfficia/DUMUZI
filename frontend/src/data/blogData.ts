export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Full HTML/Markdown content
  image: string;
  date: string;
  author: string;
  category: string;
  tags?: string; // Comma-separated tags
  createdAt?: string; // Raw ISO date for URL generation
}

/**
 * Generate a WordPress-style date-based URL for a blog post.
 * e.g., /2026/01/21/post-slug
 */
export const getBlogPostUrl = (slug: string, createdAt?: string): string => {
  const cleanSlug = slug.replace(/^\/+/, "");
  if (createdAt) {
    const d = new Date(createdAt);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `/${year}/${month}/${day}/${cleanSlug}`;
  }
  // Fallback if no createdAt
  return `/blog/${cleanSlug}`;
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "from-noida-slums-to-courtrooms-yasmeen-parveen",
    title: "From Noida Slums to Courtrooms: The Inspiring Story of Yasmeen Parveen",
    excerpt: "The daughter of a domestic worker and a severely ill father, Yasmeen overcame extreme financial hardships to study law and is now preparing to practice at the bar.",
    content: `
      <p>Growing up in a Noida slum, Yasmeen Parveen's childhood was defined by severe financial constraints. Her father was chronically ill, and her mother worked tirelessly as a domestic worker to put food on the table. In such an environment, pursuing higher education—let alone a professional degree like law—seemed like an impossible dream.</p>
      
      <h3>The Turning Point</h3>
      <p>When Yasmeen secured admission to study law at Oriental College, Mumbai, the hurdle of paying college tuition and finding a place to stay seemed insurmountable. It was at this critical moment that Aaghaz Foundation stepped in. A local volunteer visited her Noida home to verify the family's case and assess their genuine need. Recognizing her dedication and brilliant academic promise, Aaghaz approved her scholarship, covering her tuition fees.</p>
      
      <blockquote>
        "The support from Aaghaz wasn't just financial. It gave me the validation that my background did not dictate my future, and that there were people who believed in my dreams."
      </blockquote>
      
      <h3>A New Advocate for Justice</h3>
      <p>Today, Yasmeen has successfully completed her law studies and is interning as she prepares to practice law. She represents a beacon of hope for her family and her community, proving that access to opportunity is the only thing standing between underprivileged students and outstanding success.</p>
    `,
    image: "/images/suceessstories/AdvocateYasmeenParveenToday.jpeg",
    date: "Feb 10, 2026",
    author: "Saima Khan",
    category: "Success Stories",
    tags: "Law, Noida Slums, Women Empowerment",
    createdAt: "2026-02-10T12:00:00.000Z",
  },
  {
    id: "2",
    slug: "supporting-sons-of-late-cab-driver-aftab-alam",
    title: "Rebuilding Lives: Supporting the Sons of Late Cab Driver Aftab Alam",
    excerpt: "Following the tragic demise of their father in 2020, Aaghaz stepped in to cover the engineering and science education fees for Mohd Shajid and Mohd Shahid.",
    content: `
      <p>In 2020, the tragic and sudden demise of cab driver Aftab Alam left his family devastated and facing a highly uncertain future. With the primary breadwinner gone, the education of his two bright sons, Mohd Shajid and Mohd Shahid, was on the verge of being cut short.</p>
      
      <h3>Stepping In for Education</h3>
      <p>Recognizing the urgency, Aaghaz Foundation made a long-term commitment to ensure both brothers could continue their higher studies without financial stress. Aaghaz covered their college tuition fees, provided tablets for online learning, and offered a monthly stipend to help ease the family's day-to-day expenses.</p>
      
      <h3>Academic Triumphs</h3>
      <p>Thanks to the collective support of our donors, both brothers have excelled in their respective academic fields:</p>
      <ul>
        <li><strong>Mohd Shajid</strong> is pursuing a B.Tech degree at the prestigious Netaji Subhas University of Technology (NSUT), Delhi.</li>
        <li><strong>Mohd Shahid</strong> is studying B.Sc (Hons) Botany at Dyal Singh College, Delhi University.</li>
      </ul>
      <p>This case highlights the core mission of Aaghaz: acting as a safety net that protects vulnerable families from dropping out of the academic stream during life's most challenging crises.</p>
    `,
    image: "/images/suceessstories/AftabAlam2.jpeg",
    date: "Jan 28, 2026",
    author: "Mazhar Farooqui",
    category: "Impact Stories",
    tags: "Noida Case, Engineering, Higher Education",
    createdAt: "2026-01-28T12:00:00.000Z",
  },
  {
    id: "3",
    slug: "childhood-mud-hut-to-paediatric-surgeon-dr-mominul-islam",
    title: "From a Mud Hut to Paediatric Surgery: Dr. Mominul Islam's Journey",
    excerpt: "Growing up in a tiny room with a physically challenged father and nine family members, Dr. Mominul Islam is now serving as a paediatric surgeon.",
    content: `
      <p>Dr. Mominul Islam's early life was spent in a small, cramped mud house, shared with nine other family members in rural Bengal. His father was physically challenged, making it extremely difficult to generate a stable livelihood. The idea of attending medical school, let alone becoming a specialized surgeon, was beyond what his family could imagine.</p>
      
      <h3>A Journey of Perseverance</h3>
      <p>Despite his circumstances, Mominul's academic record was stellar. When he secured admission to medical school, Aaghaz Foundation partnered with him, helping cover crucial academic expenses and fees that would have otherwise prevented him from registering. Year after year, Mominul proved that determination, combined with timely support, can break down any barrier.</p>
      
      <h3>Serving the Underprivileged</h3>
      <p>Today, the student who once studied under dim light in a mud house is <strong>Dr. Mominul Islam</strong>, a qualified paediatric surgeon serving at Bengal Medical College. His journey is a powerful testament to the transformative power of education and the profound ripple effect of supporting a single student.</p>
    `,
    image: "/images/suceessstories/Dr.MominulIslamtoday.jpeg",
    date: "Jan 15, 2026",
    author: "Aaghaz Team",
    category: "Success Stories",
    tags: "Medical, Bengal, Rural Education",
    createdAt: "2026-01-15T12:00:00.000Z",
  },
  {
    id: "4",
    slug: "afree-javed-topps-college-secures-eighteen-lakhs-package",
    title: "Topping College & Securing an 18 Lakh Package: Afree Javed's Story",
    excerpt: "Aafree Javed topped her college examinations and secured a developer job at Lowe's India with an annual package of over ₹18 lakhs, supported by Aaghaz.",
    content: `
      <p>Aafree Javed has always been a high achiever. Yet, in her household, funding a professional engineering course was a constant source of anxiety. The costs of tuition, books, and lab equipment threatened to derail her dreams of becoming a software developer.</p>
      
      <h3>Unlocking Potential</h3>
      <p>Aaghaz Foundation stepped in to provide financial backing for her engineering fees. With her tuition secured, Aafree focused entirely on her studies. She did not just pass; she topped all her examinations, eventually becoming the poster girl of her college and an inspiration for other young women in her community.</p>
      
      <h3>Securing Her Future</h3>
      <p>Upon graduation, Aafree secured a position as an Associate Software Engineer (Java Developer) at Lowe's India, with an outstanding starting package exceeding ₹18 lakhs per annum. She has now transitioned from being a beneficiary to a role model, showing how education can uplift an entire family's economic status in a single generation.</p>
    `,
    image: "/images/suceessstories/AfreeJaved.jpeg",
    date: "Dec 30, 2025",
    author: "Education Desk",
    category: "Success Stories",
    tags: "Engineering, Women in STEM, Tech Career",
    createdAt: "2025-12-30T12:00:00.000Z",
  },
  {
    id: "5",
    slug: "shumaila-practicing-at-delhi-high-court",
    title: "Defying Circumstances: Shumaila's Path to the Delhi High Court",
    excerpt: "Having lost her father early and growing up in a lower-middle-class home in Old Delhi, Shumaila did odd jobs before completing law to practice at the High Court.",
    content: `
      <p>Losing a parent early in life places an enormous psychological and financial burden on a child. Shumaila, raised in a lower-middle-class household in the narrow lanes of Old Delhi, faced this exact reality. After completing her graduation, she worked in various minor odd jobs to support her family, but her passion lay in the legal profession.</p>
      
      <h3>Aaghaz's Legal Aid Scholarship</h3>
      <p>When Shumaila got the opportunity to study law, the fees were far beyond her savings. Aaghaz Foundation stepped in to cover her college dues, enabling her to focus on her classes and moot court preparations. Her diligence paid off, and she excelled throughout her semesters.</p>
      
      <h3>Advocating in the Capital</h3>
      <p>Today, Shumaila is a practicing advocate at the Delhi High Court. Her journey from doing odd jobs to wearing the black robe of an advocate represents the core philosophy of Aaghaz: enabling deserving minds to achieve their highest professional goals, regardless of their family background.</p>
    `,
    image: "/images/suceessstories/Shumaila.jpeg",
    date: "Dec 12, 2025",
    author: "Legal Aid Desk",
    category: "Success Stories",
    tags: "Law, Delhi High Court, Women in Law",
    createdAt: "2025-12-12T12:00:00.000Z",
  },
  {
    id: "6",
    slug: "jahan-ara-shaikh-advocate-bombay-high-court",
    title: "Rising from the Ashes: Jahan Ara Shaikh's Journey to Bombay High Court",
    excerpt: "After losing both parents, Jahan Ara worked in a clinic while studying. Aaghaz helped pay her college fees, enabling her to practice at the Bombay High Court.",
    content: `
      <p>Jahan Ara Shaikh's story is one of sheer, unyielding resilience. After tragically losing both of her parents, she lived separately from her four brothers. To survive and pay for her basic needs, she worked as a clinic compounder at a medical center during the day.</p>
      
      <h3>The Pursuit of Law</h3>
      <p>During the COVID-19 pandemic, Jahan Ara made a bold decision: she decided to study law. With her limited earnings as a compounder, paying college tuition was impossible. She reached out to Aaghaz Foundation. After a detailed verification of her circumstances, Aaghaz sponsored her college fees.</p>
      
      <h3>From Compounder to Advocate</h3>
      <p>Today, Jahan Ara Shaikh has transitioned from working in a clinic to arguing cases as an advocate at the Bombay High Court. Her success is a reminder that given a chance, a child who has lost everything can rebuild a life of dignity, impact, and professional excellence.</p>
    `,
    image: "/images/suceessstories/JahanAraShaikh.jpeg",
    date: "Nov 25, 2025",
    author: "Saima Khan",
    category: "Success Stories",
    tags: "Law, Mumbai, Orphan Support",
    createdAt: "2025-11-25T12:00:00.000Z",
  },
  {
    id: "7",
    slug: "why-we-do-pre-scholarship-field-surveys",
    title: "The Core of Our Trust: Why Volunteers Do Pre-Scholarship Field Surveys",
    excerpt: "Transparency is everything. Aaghaz volunteers personally visit the home and school of every applicant to verify their financial background before giving aid.",
    content: `
      <p>At Aaghaz Foundation, we believe that transparency is the absolute cornerstone of non-profit work. We do not approve scholarships based on online forms or generic certificates. Instead, every single application is followed by a physical visit.</p>
      
      <h3>The Verification Process</h3>
      <p>Our volunteer network conducts detailed pre-scholarship field surveys. At least two volunteers visit the applicant's home, meet their parents, talk to their neighbors, and visit their school or college. This process helps us understand:</p>
      <ol>
        <li>The genuine financial condition of the household.</li>
        <li>The academic dedication and record of the student.</li>
        <li>Any underlying family crises (like chronic illness or job loss) that require special attention.</li>
      </ol>
      
      <h3>Ensuring Direct Impact</h3>
      <p>By conducting these extensive field surveys, we guarantee our donors that 100% of their contributions reach students who would otherwise be forced to discontinue their education. It prevents leakage and builds a strong, personal bond between Aaghaz volunteers and the families we support.</p>
    `,
    image: "/images/suceessstories/YasmeensHomeVolunteerVisit.jpeg",
    date: "Nov 10, 2025",
    author: "Field Operations",
    category: "Behind the Scenes",
    tags: "Field Surveys, Transparency, Volunteers",
    createdAt: "2025-11-10T12:00:00.000Z",
  },
  {
    id: "8",
    slug: "dr-arbaaz-journey-to-aiims-delhi",
    title: "Overcoming Adversity: Dr. Arbaaz's Journey to AIIMS Delhi",
    excerpt: "Overcoming his father's paralysis, Dr. Arbaaz secured AIR 85 in NEET and is now proudly serving as a doctor at India's premier medical institute.",
    content: `
      <p>Coming from a small, modest town in Karnataka, Dr. Arbaaz's dreams of entering the medical profession were met with a severe setback when his father suffered a paralyzing stroke. As the family's income collapsed, the cost of medical preparation courses and exam fees seemed out of reach.</p>
      
      <h3>A Bright Mind Supported</h3>
      <p>Recognizing Arbaaz's exceptional talent, Aaghaz Foundation stepped forward to ensure his preparation and entrance fees were covered. Freed from the anxiety of tuition costs, Arbaaz dedicated himself to his studies, scoring an outstanding All India Rank (AIR) of 85 in the highly competitive NEET examination.</p>
      
      <h3>AIIMS Delhi and Beyond</h3>
      <p>Today, Dr. Arbaaz is serving as a resident doctor at AIIMS, Delhi—the country's premier medical institution. His journey from rural Karnataka to AIIMS is a testament to what underprivileged youth can achieve when financial barriers are cleared from their path.</p>
    `,
    image: "/images/suceessstories/Dr.Arbaaz.jpeg",
    date: "Oct 22, 2025",
    author: "Aaghaz Foundation",
    category: "Success Stories",
    tags: "NEET, AIIMS, Karnataka",
    createdAt: "2025-10-22T12:00:00.000Z",
  },
  {
    id: "9",
    slug: "anam-mehendi-abidi-university-of-calcutta",
    title: "From Scholar to Educator: Anam Mehendi Abidi Becomes Assistant Professor",
    excerpt: "Supported by Aaghaz Foundation, Anam Mehendi Abidi completed her master's and is now an Assistant Professor at the prestigious University of Calcutta.",
    content: `
      <p>Higher education in India, especially at the postgraduate level, remains highly out of reach for students from low-income families. Anam Mehendi Abidi faced this exact challenge when pursuing her advanced degrees. Her family struggled to meet the semester fees required for her to continue her academic journey.</p>
      
      <h3>The Gift of Learning</h3>
      <p>Aaghaz Foundation provided the necessary scholarship to cover Anam's post-graduate academic fees. Free to immerse herself in her research and studies, Anam excelled, eventually receiving her Master's degree with honors—a milestone that was featured in a local Kolkata newspaper.</p>
      
      <h3>Inspiring the Next Generation</h3>
      <p>Today, Anam Mehendi Abidi has come full circle, serving as an Assistant Professor at the historic University of Calcutta. She now teaches the next generation of students, demonstrating how supporting one girl's education can have an exponential impact on hundreds of students she teaches.</p>
    `,
    image: "/images/suceessstories/AnamMehendiAbidi.jpeg",
    date: "Oct 05, 2025",
    author: "Academic Relations",
    category: "Success Stories",
    tags: "Academics, Higher Education, Kolkata",
    createdAt: "2025-10-05T12:00:00.000Z",
  },
  {
    id: "10",
    slug: "yusuf-hotelier-itc-hotels",
    title: "Crafting a Career in Hospitality: Yusuf's Success at ITC Hotels",
    excerpt: "Aaghaz Foundation's focus is on sustainable career building. Read about Yusuf's journey from a difficult background to becoming a hotelier at ITC.",
    content: `
      <p>At Aaghaz Foundation, we believe that education should lead directly to sustainable careers and self-reliance. While we support traditional professional streams like medicine, engineering, and law, we also focus on professional vocational careers like hotel management and hospitality.</p>
      
      <h3>A Hospitality Scholar</h3>
      <p>Yusuf came to Aaghaz with a dream of entering the hospitality sector. Recognizing the high job-placement rates of hotel management programs, Aaghaz supported his course fees at a reputed academy, helping him acquire the practical skills and training required for luxury hospitality services.</p>
      
      <h3>Working at ITC Hotels</h3>
      <p>Following his graduation, Yusuf secured a job at the prestigious ITC Hotels. Today, he is a self-sufficient professional, helping support his family and serving as a model for how diversified vocational training can create rapid, sustainable career paths for underprivileged youth.</p>
    `,
    image: "/images/suceessstories/Yusuf.jpeg",
    date: "Sep 18, 2025",
    author: "Placement Cell",
    category: "Success Stories",
    tags: "Hospitality, Vocational Training, Career Growth",
    createdAt: "2025-09-18T12:00:00.000Z",
  },
];
