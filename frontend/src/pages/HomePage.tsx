import { HeroSlider }                from '../components/sections/HeroSlider';
import { ServicesGrid }             from '../components/sections/ServicesGrid';
import { AboutSection }             from '../components/sections/AboutSection';
import { StatsSection }             from '../components/sections/StatsSection';
import { HowItWorks }               from '../components/sections/HowItWorks';
import { GiftingCTA }               from '../components/sections/GiftingCTA';
import { CollectionsPreviewSection } from '../components/sections/CollectionsPreviewSection';
import { BestConfectionsShowcase }  from '../components/sections/BestConfectionsShowcase';
import { CraftBannerSection }       from '../components/sections/CraftBannerSection';
import { BlogPreviewSection }       from '../components/sections/BlogPreviewSection';
import { ContactCTASection }        from '../components/sections/ContactCTASection';
import { TestimonialsSection }      from '../components/sections/TestimonialsSection';
import NewsletterSection            from '../components/sections/NewsletterSection';
import { InstagramFeed }            from '../components/sections/InstagramFeed';
import { VideoShowcase }            from '../components/sections/VideoShowcase';
import { OffersShowcase }           from '../components/sections/OffersShowcase';

export const HomePage = () => {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSlider />

      {/* 2 — Trust bar: Secure payment / delivery / quality / support */}
      <StatsSection />

      {/* 3 — Bestselling Products Grid */}
      <div className="section-divider" />
      <ServicesGrid />

      {/* 4 — Offer posters: buy a box, get one free (linking to /offers) */}
      <div className="section-divider" />
      <OffersShowcase />

      {/* 5 — Best Confections Showcase (top 3 + CTA to /best-confections) */}
      <div className="section-divider" />
      <BestConfectionsShowcase />

      {/* 6 — Collections Preview (6 collection cards linking to /collections) */}
      <div className="section-divider" />
      <CollectionsPreviewSection />

      {/* 7 — About / Brand Story */}
      <div className="section-divider" />
      <AboutSection />

      {/* 8 — Craft & Sourcing Banner (linking to /about) */}
      <div className="section-divider" />
      <CraftBannerSection />

      {/* 9 — Video reels: DUMUZI in Motion */}
      <div className="section-divider" />
      <VideoShowcase />

      {/* 10 — How It Works: Bean to Box */}
      <div className="section-divider" />
      <HowItWorks />

      {/* 11 — Gifting CTA (linking to /collections) */}
      <div className="section-divider" />
      <GiftingCTA />

      {/* 12 — Testimonials */}
      <div className="section-divider" />
      <TestimonialsSection />

      {/* 13 — Blog Preview (3 latest articles, linking to /blog) */}
      <div className="section-divider" />
      <BlogPreviewSection />

      {/* 14 — Contact CTA (links to /contact) */}
      <div className="section-divider" />
      <ContactCTASection />

      {/* 15 — Instagram Feed */}
      <div className="section-divider" />
      <InstagramFeed />

      {/* 16 — Newsletter */}
      <div className="section-divider" />
      <NewsletterSection />
    </>
  );
};
