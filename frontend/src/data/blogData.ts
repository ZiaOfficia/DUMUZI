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
    title: "From Slums to Court: How Yasmeen Parveen Became a Lawyer",
    excerpt: "Yasmeen's mother worked in houses and her father was very sick. With Aaghaz's help, she finished law school and is now ready to work as a lawyer.",
    content: `
      <p>Growing up in Noida, Yasmeen Parveen's family had very little money. Her father was sick, and her mother worked in other people's houses to buy food. In their situation, going to college and studying law seemed impossible.</p>
      
      <h3>The Turning Point</h3>
      <p>When Yasmeen got a seat to study law in Mumbai, paying the fees and finding a place to live was very hard. Aaghaz Foundation came forward to help. A volunteer visited her house in Noida to check their situation. Since she was a good student who wanted to study, Aaghaz paid her college fees.</p>
      
      <blockquote>
        "Aaghaz did not just give me money. They made me believe that my background does not stop my dreams, and that there are people who want to help me succeed."
      </blockquote>
      
      <h3>A New Advocate for Justice</h3>
      <p>Today, Yasmeen has finished her law studies and is working as an intern. She has shown that if poor children get the right support, they can achieve big things.</p>
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
    title: "Supporting the Sons of Late Cab Driver Aftab Alam",
    excerpt: "After their father passed away, Aaghaz paid the college fees for Mohd Shajid and Mohd Shahid so they could study engineering and science.",
    content: `
      <p>In 2020, cab driver Aftab Alam passed away suddenly. His family was left with no income. His two clever sons, Mohd Shajid and Mohd Shahid, were about to stop going to college.</p>
      
      <h3>Stepping In for Education</h3>
      <p>Aaghaz Foundation stepped in to help. We paid their college fees, gave them tablets to study online, and provided monthly help for home expenses.</p>
      
      <h3>Academic Triumphs</h3>
      <p>With the help of our donors, both brothers did very well in their studies:</p>
      <ul>
        <li><strong>Mohd Shajid</strong> is studying engineering (B.Tech) at Netaji Subhas University in Delhi.</li>
        <li><strong>Mohd Shahid</strong> is studying botany (B.Sc) at Dyal Singh College, Delhi University.</li>
      </ul>
      <p>This shows how Aaghaz helps poor families keep their children in school and college when they face sudden problems.</p>
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
    title: "From a Mud Hut to a Child Surgeon: Dr. Mominul Islam's Story",
    excerpt: "Dr. Mominul Islam grew up in a tiny mud house with nine family members. Today, he is working as a surgeon for children.",
    content: `
      <p>Dr. Mominul Islam spent his childhood in a small mud room with nine other family members in a Bengal village. His father was physically challenged and could not earn much. Going to a medical college to become a doctor was a dream they could never afford.</p>
      
      <h3>A Journey of Perseverance</h3>
      <p>But Mominul got very good marks. When he got a seat in medical college, Aaghaz paid his fees and other expenses. Year after year, Mominul proved that hard work and timely help can solve any problem.</p>
      
      <h3>Serving the Underprivileged</h3>
      <p>Today, he is <strong>Dr. Mominul Islam</strong>, a surgeon for children at Bengal Medical College. His story shows how helping one student can change many lives.</p>
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
    title: "Afree Javed Tops Her College and Gets a High-Paying Software Job",
    excerpt: "Afree Javed topped her college exams and got a job as a developer at Lowe's India, with help from Aaghaz.",
    content: `
      <p>Afree Javed was always excellent at studies. But paying for an engineering course was very hard for her family. They did not have enough money for college fees, books, and lab equipment.</p>
      
      <h3>Unlocking Potential</h3>
      <p>Aaghaz Foundation stepped in and paid her engineering fees. With her fees paid, Afree could focus completely on studying. She not only passed but topped her exams, making her family and college proud.</p>
      
      <h3>Securing Her Future</h3>
      <p>After finishing college, she got a job as a Java Developer at Lowe's India, earning over Rs 18 lakhs a year. She has now transitioned from being a student who needed help to a role model showing how studies can change a family's life.</p>
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
    title: "Shumaila's Journey to Becoming a Lawyer in Delhi High Court",
    excerpt: "Shumaila lost her father early and worked odd jobs to support her family. Aaghaz paid her law college fees, and today she practices at the High Court.",
    content: `
      <p>Losing a parent is very hard for any child. Shumaila grew up in a poor family in Old Delhi. After finishing school, she did small jobs to help her family, but she always wanted to study law.</p>
      
      <h3>Aaghaz's Legal Aid Scholarship</h3>
      <p>When she got a seat to study law, she did not have enough savings to pay the fees. Aaghaz paid her college dues so she could study and participate in court practice sessions. She worked hard and got very good marks.</p>
      
      <h3>Advocating in the Capital</h3>
      <p>Today, Shumaila is a lawyer practicing in the Delhi High Court. Her story shows how Aaghaz helps young people achieve their dreams despite financial problems.</p>
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
    title: "How Jahan Ara Shaikh Became a Lawyer at the Bombay High Court",
    excerpt: "Jahan Ara lost both parents and worked in a clinic while studying. Aaghaz paid her law fees to help her become a lawyer.",
    content: `
      <p>Jahan Ara Shaikh's story is about not giving up. After she lost both her parents, she had to live alone. To survive, she worked in a doctor's clinic during the day.</p>
      
      <h3>The Pursuit of Law</h3>
      <p>During COVID-19, she decided to study law. But her small salary from the clinic was not enough for college fees. She wrote to Aaghaz. Our team checked her case and sponsored her fees.</p>
      
      <h3>From Compounder to Advocate</h3>
      <p>Today, Jahan Ara Shaikh is a lawyer at the Bombay High Court. Her success shows that even if a child loses everything, they can rebuild their life with dignity.</p>
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
    title: "Why Our Volunteers Visit Student Homes Before Giving Aid",
    excerpt: "Aaghaz volunteers personally visit the home and school of every student to check their financial condition and make sure your donations are used honestly.",
    content: `
      <p>At Aaghaz, we believe that honesty is everything. We do not give scholarships just by looking at online forms or certificates. Instead, we check every application in person.</p>
      
      <h3>The Verification Process</h3>
      <p>Our volunteers visit the student's home. At least two volunteers meet the family, talk to the neighbors, and visit the student's school. This helps us check:</p>
      <ol>
        <li>If the family really cannot pay the fees.</li>
        <li>If the child really wants to study and gets good marks.</li>
        <li>If the family has other problems (like sickness or job loss) where we can help.</li>
      </ol>
      
      <h3>Ensuring Direct Impact</h3>
      <p>This personal check makes sure that 100% of your donation goes to a child who really needs it. It builds trust with our donors and creates a personal bond between volunteers and students.</p>
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
    title: "How Arbaaz Beat the Odds to Study at AIIMS Delhi",
    excerpt: "Despite his father being paralyzed, Arbaaz got Rank 85 in NEET and is now a doctor at AIIMS Delhi.",
    content: `
      <p>Arbaaz grew up in a small town in Karnataka. He wanted to be a doctor, but his father suffered a stroke and became paralyzed. The family had no income left. Paying for medical exam preparation and fees became impossible.</p>
      
      <h3>A Bright Mind Supported</h3>
      <p>Knowing how bright Arbaaz was, Aaghaz paid his exam fees and preparation costs. Free from money worries, Arbaaz studied hard and got All India Rank 85 in the NEET exam.</p>
      
      <h3>AIIMS Delhi and Beyond</h3>
      <p>Today, Dr. Arbaaz is working at AIIMS Delhi, India's top medical hospital. His journey shows what poor children can do when we help them.</p>
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
    title: "From Student to Professor: Anam Mehendi Abidi's Story",
    excerpt: "Aaghaz paid Anam's post-graduate fees, and today she is working as an Assistant Professor at Calcutta University.",
    content: `
      <p>Higher studies like master's degrees are often too expensive for poor families. Anam faced this problem when she wanted to study further. Her family could not pay the semester fees.</p>
      
      <h3>The Gift of Learning</h3>
      <p>Aaghaz paid her college fees so she could study and focus on her research. Anam did very well and completed her Master's degree with honors.</p>
      
      <h3>Inspiring the Next Generation</h3>
      <p>Today, Anam Mehendi Abidi is working as an Assistant Professor at the famous University of Calcutta. She now teaches hundreds of students, showing how helping one girl can help many others.</p>
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
    title: "Making a Career in Hotel Management: Yusuf's Success at ITC Hotels",
    excerpt: "Aaghaz paid Yusuf's fees for hotel management, and today he works as a professional at ITC Hotels.",
    content: `
      <p>At Aaghaz, we want students to get jobs and support their families. Along with medicine and law, we also help students study practical courses like hotel management.</p>
      
      <h3>A Hospitality Scholar</h3>
      <p>Yusuf wanted to work in hotels but could not afford the training. Aaghaz paid his fees at a hotel management school where he learned professional skills.</p>
      
      <h3>Working at ITC Hotels</h3>
      <p>After finishing his course, Yusuf got a job at ITC Hotels. He is now earning well, supporting his family, and showing how practical courses can help poor youth get jobs quickly.</p>
    `,
    image: "/images/suceessstories/Yusuf.jpeg",
    date: "Sep 18, 2025",
    author: "Placement Cell",
    category: "Success Stories",
    tags: "Hospitality, Vocational Training, Career Growth",
    createdAt: "2025-09-18T12:00:00.000Z",
  },
];
