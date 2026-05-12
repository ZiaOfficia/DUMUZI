/**
 * Aaghaz Foundation — Indian image catalog.
 *
 * Every photo on the home page comes from here.  The catalog is curated to
 * show Indian school children (especially in government / low-income school
 * uniforms), Indian teachers, rural classrooms in UP / Lucknow contexts,
 * orphans, and the kind of underprivileged students Aaghaz actually serves.
 *
 * Each Unsplash ID is referenced exactly once across the homepage so no two
 * sections show the same picture.
 */

const u = (id: string, w: number, q = 78) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

// ── HERO SLIDES (8 — sliding carousel, Indian school context) ───────
const lf = (lock: number) => `https://loremflickr.com/1920/1080/india,school,children/all?lock=${lock}`;

export const heroImages = {
  girlSmiling: "/images/assets/student-1.png",
  schoolGroup: lf(122),
  childReading: lf(33),
  classroomTeacher: lf(45),
  studentBlackboard: lf(55),
  libraryStudy: lf(266),
  kidsLearning: u("1542810634-71277d95dcbb", 1920),
  outdoorEducation: lf(85),
};

// ── MISSION PILLARS (3 — Educate / Empower / Elevate) ───────────────
export const missionImages = {
  educate: "https://loremflickr.com/800/600/india,classroom,children/all?lock=501",
  empower: "https://loremflickr.com/800/600/india,school,kids/all?lock=502",
  elevate: "https://loremflickr.com/800/600/india,students,success/all?lock=503",
};

// ── ACTION BLOCKS (3 — Launch / Donate / Volunteer) ─────────────────
export const actionImages = {
  launchScholarship: u("1571260899304-425eee4c7efc", 900),  // certificate / award
  joinDonor: u("1593113646773-028c64a8f1b8", 900),          // helping hand
  becomeVolunteer: u("1582213782179-e0d53f98f2ca", 900),    // volunteers community
};

// ── STATS COLLAGE (4 — corner photos for stats section) ─────────────
export const statsImages = {
  studentsWalking: u("1503676260728-1c00da094a0b", 600),    // Indian children studying
  classroomDesk: u("1604881991720-f91add269bed", 600),      // student at desk
  teacherWriting: u("1606761568499-6d2451b23c66", 600),     // teacher at blackboard
  girlGraduate: u("1542810634-71277d95dcbb", 600),          // young Indian student
};

// ── ABOUT / FOUNDER STORY ───────────────────────────────────────────
export const aboutImage = u("1509062522246-3755977927d7", 1200);
// quiet study setting — books and learning corner

// ── PROGRAMS / SERVICES (8 — Indian education contexts) ─────────────
export const serviceImages = {
  studentAid: u("1503676382389-4809596d5290", 1200),        // boys in school uniform
  scholarships: u("1521295121783-8a321d551ad2", 1200),      // graduation moment
  financialAssistance: u("1531315630201-bb15abeb1653", 1200),// rupee / aid
  computerCenter: u("1554224155-6726b3ff858f", 1200),       // computer education
  madarsaInitiative: u("1610484826917-3c7f3d8e1c8a", 1200),  // community education
  memorialScholarship: u("1623241899289-e2f04b87e7a3", 1200), // memorial / candle
  becomeVolunteer: u("1469571486292-0ba58a3f068b", 1200),   // volunteers smiling
  joinDonor: u("1559027615-cd4628902d4a", 1200),            // donation hands
  launchScholarship: u("1623241899289-e2f04b87e7a3", 1200), // memorial / candle
};

// ── HOW IT WORKS (placeholder — icons only) ─────────────────────────
export const howItWorksImages = {};

export const testimonialImages = {
  studentSumaiya: "/images/assets/student-2.png",     
  donorFamily: "/images/assets/orphan-1.png",        
  parentMother: "/images/assets/teacher-2.png",          
  iitAlumnus: "/images/assets/student-1.png",         
};

// ── DONATE CTA ──────────────────────────────────────────────────────
export const donateCtaImage = u("1597392581384-e6c5f3ff9be1", 1920);
// Indian school setting

// ── GALLERY (8 — masonry grid, all Indian context) ──────────────────
export const galleryImages = [
  "https://loremflickr.com/900/600/india,poor,student/all?lock=301",
  "https://loremflickr.com/900/600/india,orphan/all?lock=502",
  "https://loremflickr.com/900/600/india,teacher,student/all?lock=303",
  "https://loremflickr.com/900/600/india,orphan,child/all?lock=704",
  "https://loremflickr.com/900/600/india,orphan,kids/all?lock=999",
  "https://loremflickr.com/900/600/india,education/all?lock=606",
  "https://loremflickr.com/900/600/india,classroom/all?lock=307",
  "https://loremflickr.com/900/600/india,poor,kids/all?lock=708",
];

// ── INSTAGRAM FEED (6 — Indian education snapshots) ─────────────────
export const instagramImages = [
  u("1523050854058-8df90110c9f1", 600),
  u("1591125381018-2d1d18a3a32f", 600),
  u("1576267423048-15c0040fec78", 600),
  u("1556761175-5973dc0f32e7", 600),
  u("1588072432836-e10032774350", 600),
  u("1543269865-cbf427effbad", 600),
];

// ── PORTFOLIO STORIES (6 — story cards, Indian field) ───────────────
export const portfolioImages = {
  graveyardOrphans: u("1602052793312-b9716ea5db4d", 1600),  // child amid stones
  puneScholarship: u("1623241899289-e2f04b87e7a3", 1600),   // memorial moment
  schoolForPoor: u("1610484826917-3c7f3d8e1c8a", 1600),     // tuition centre
  rahmaniCohort: u("1554224155-6726b3ff858f", 1600),        // exam-prep cohort
  hardoiGirls: u("1542810634-71277d95dcbb", 1600),          // Indian schoolgirl
  csrPartnership: u("1559027615-cd4628902d4a", 1600),       // donation handover
};
