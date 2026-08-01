/**
 * videoAssets — short DUMUZI reels shown in the "In Motion" home section.
 *
 * Files live in /public/videos, so the paths are absolute URLs at runtime.
 * Sources are ~370–400px wide, which is why the showcase keeps them in
 * small portrait cards and caps the lightbox width — blown up any further
 * they'd look soft.
 *
 * `caption` is the line shown over the card; edit freely to describe what
 * each clip actually shows.
 */
export interface Reel {
  src: string;
  caption: string;
  /** display-only running time */
  length: string;
}

export const reels: Reel[] = [
  { src: '/videos/dumuzi-reel-1.mp4', caption: 'Inside the atelier',   length: '0:12' },
  { src: '/videos/dumuzi-reel-2.mp4', caption: 'Poured & tempered',    length: '0:08' },
  { src: '/videos/dumuzi-reel-3.mp4', caption: 'Finished by hand',     length: '0:08' },
  { src: '/videos/dumuzi-reel-4.mp4', caption: 'Boxed & ribboned',     length: '0:04' },
  { src: '/videos/dumuzi-reel-5.mp4', caption: 'Ready to gift',        length: '0:08' },
];
