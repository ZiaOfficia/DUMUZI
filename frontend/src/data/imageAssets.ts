/**
 * DUMUZI — image catalog.
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
  oval9:       '/images/products/LF-O9.jpeg',
};

export const heroImages = {
  main:            '/images/products/DUMUZI.jpeg',
  heartBox:        '/images/products/LF-H3.jpeg',
  grandDisplay:    '/images/products/LF-D25T.jpeg',
  heartTruffles:   '/images/products/LF-H12T.jpeg',
  classicDisplay:  '/images/products/LF-D18T.jpeg',
  heartDuo:        '/images/products/LF-H18D.jpeg',
  selectionBox:    '/images/products/LF-D15T.jpeg',
  bonbons:         '/images/products/LF-H12T.jpeg',
  ovalBox:         '/images/products/LF-O9.jpeg',
};

export const testimonialImages = {
  connoisseur:      '/images/bg/trios-box.webp',
  weddingCouple:    '/images/bg/gift-worth-sharing.webp',
  giftRecipient:    '/images/bg/memorable-gifting.webp',
  masterclassGuest: '/images/bg/crafted-with-care.webp',
};

// Blog & gallery use a rotating set of product images
const blogPool = [
  '/images/products/DUMUZI.jpeg',
  '/images/products/LF-H12T.jpeg',
  '/images/products/LF-D25T.jpeg',
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
  '/images/products/LF-H18D.jpeg',
  '/images/products/LF-D15T.jpeg',
  '/images/products/LF-D18T.jpeg',
];

export const instagramImages = blogPool.slice(0, 6);

export const getBlogImage = (index: number) => blogPool[index % blogPool.length];

export const missionImages = {
  craft:     '/images/products/LF-H12T.jpeg',
  source:    '/images/products/LF-D25T.jpeg',
  signature: '/images/products/DUMUZI.jpeg',
};

export const actionImages = {
  bespoke:  '/images/products/DUMUZI.jpeg',
  giftBox:  '/images/products/LF-H18B.jpeg',
  explore:  '/images/products/LF-D18T.jpeg',
};

export const serviceImages = {
  darkCollection:    '/images/bg/twenty-five-pieces-gold.webp',
  truffleCollection: '/images/bg/trios-box.webp',
  giftBoxes:         '/images/bg/three-flavours.webp',
  weddingFavors:     '/images/bg/gift-worth-sharing.webp',
  corporateGifting:  '/images/bg/premium-experience.webp',
  subscriptionBox:   '/images/bg/unwrap-share-enjoy.webp',
  bespokeOrders:     '/images/bg/crafted-with-care.webp',
  masterclasses:     '/images/bg/almond-raisin.webp',
};
