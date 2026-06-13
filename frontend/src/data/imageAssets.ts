/**
 * DUMUZI Luxury Chocolates — image catalog.
 * All images use local product photos from /images/products/.
 */

// Real DUMUZI product images (local)
export const productImages = {
  signature:   '/images/products/DUMUZI.jpeg',
  heart3:      '/images/products/LF-H3.jpeg',
  heart5:      '/images/products/LF - H5.jpeg',
  heart8b:     '/images/products/LF-H8B.jpeg',
  heart9p:     '/images/products/LF-H9P .jpeg',
  heart12t:    '/images/products/LF-H12T.jpeg',
  heart12b:    '/images/products/LF-H12B.jpeg',
  heart18b:    '/images/products/LF-H18B.jpeg',
  heart18d:    '/images/products/LF-H18D.jpeg',
  display6:    '/images/products/LF-D6.jpeg',
  display9:    '/images/products/LF-D9.jpeg',
  display12:   '/images/products/LF-D12.jpeg',
  display15:   '/images/products/LF-D15.jpeg',
  display15t:  '/images/products/LF-D15T.jpeg',
  display18t:  '/images/products/LF-D18T.jpeg',
  display25:   '/images/products/LF-D25.jpeg',
  display25b:  '/images/products/LF-D25B.jpeg',
  display25t:  '/images/products/LF-D25T.jpeg',
  bonbon9:     '/images/products/LF- BN9.jpeg',
  bonbon9t:    '/images/products/LF-BN9T.jpeg',
  oval9:       '/images/products/LF-O9.jpeg',
};

export const heroImages = {
  main: '/images/products/DUMUZI.jpeg',
};

export const testimonialImages = {
  studentSumaiya: '/images/products/LF-H3.jpeg',
  donorFamily:    '/images/products/LF-H18D.jpeg',
  parentMother:   '/images/products/LF-D25T.jpeg',
  iitAlumnus:     '/images/products/LF- BN9.jpeg',
};

// Blog & gallery use a rotating set of product images
const blogPool = [
  '/images/products/DUMUZI.jpeg',
  '/images/products/LF-H12T.jpeg',
  '/images/products/LF-D25T.jpeg',
  '/images/products/LF-BN9T.jpeg',
  '/images/products/LF-H18D.jpeg',
  '/images/products/LF-D15T.jpeg',
  '/images/products/LF-D18T.jpeg',
  '/images/products/LF-H18B.jpeg',
  '/images/products/LF-D25B.jpeg',
  '/images/products/LF-O9.jpeg',
];

export const galleryImages = [
  '/images/products/DUMUZI.jpeg',
  '/images/products/LF-D25T.jpeg',
  '/images/products/LF-H12T.jpeg',
  '/images/products/LF-BN9T.jpeg',
  '/images/products/LF-H18D.jpeg',
  '/images/products/LF-D15T.jpeg',
  '/images/products/LF-D18T.jpeg',
  '/images/products/LF- BN9.jpeg',
];

export const instagramImages = blogPool.slice(0, 6);

export const getBlogImage = (index: number) => blogPool[index % blogPool.length];

export const serviceImages = {
  studentAid:          '/images/products/LF-H18D.jpeg',
  scholarships:        '/images/products/LF-D25T.jpeg',
  financialAssistance: '/images/products/LF-D15T.jpeg',
  madarsaInitiative:   '/images/products/LF-BN9T.jpeg',
  memorialScholarship: '/images/products/LF-H12T.jpeg',
  becomeVolunteer:     '/images/products/LF-D18T.jpeg',
  joinDonor:           '/images/products/LF-H18B.jpeg',
  launchScholarship:   '/images/products/DUMUZI.jpeg',
};
