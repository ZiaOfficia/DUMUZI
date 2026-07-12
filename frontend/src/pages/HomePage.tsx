import { HeroSlider }                from '../components/sections/HeroSlider';
import { ServicesGrid }             from '../components/sections/ServicesGrid';
import { AboutSection }             from '../components/sections/AboutSection';
import { StatsSection }             from '../components/sections/StatsSection';
import { HowItWorks }               from '../components/sections/HowItWorks';
import { GiftingCTA }               from '../components/sections/GiftingCTA';
import { CollectionsPreviewSection } from '../components/sections/CollectionsPreviewSection';
import { BestChocolateShowcase }    from '../components/sections/BestChocolateShowcase';
import { CraftBannerSection }       from '../components/sections/CraftBannerSection';
import { BlogPreviewSection }       from '../components/sections/BlogPreviewSection';
import { ContactCTASection }        from '../components/sections/ContactCTASection';
import { TestimonialsSection }      from '../components/sections/TestimonialsSection';
import NewsletterSection            from '../components/sections/NewsletterSection';
import { InstagramFeed }            from '../components/sections/InstagramFeed';
import { FeaturedInStrip }          from '../components/sections/FeaturedInStrip';

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

      {/* 4 — Best Chocolates Showcase (top 3 + CTA to /best-chocolate) */}
      <div className="section-divider" />
      <BestChocolateShowcase />

      {/* 5 — Collections Preview (6 collection cards linking to /collections) */}
      <div className="section-divider" />
      <CollectionsPreviewSection />

      {/* 6 — About / Brand Story */}
      <div className="section-divider" />
      <AboutSection />

      {/* 7 — Craft & Sourcing Banner (linking to /about) */}
      <div className="section-divider" />
      <CraftBannerSection />

      {/* 8 — How It Works: Bean to Box */}
      <div className="section-divider" />
      <HowItWorks />

      {/* 9 — Gifting CTA (linking to /collections) */}
      <div className="section-divider" />
      <GiftingCTA />

      {/* 10 — Testimonials */}
      <div className="section-divider" />
      <TestimonialsSection />

      {/* 11 — Blog Preview (3 latest articles, linking to /blog) */}
      <div className="section-divider" />
      <BlogPreviewSection />

      {/* 12 — Featured In Press Strip */}
      <div className="section-divider" />
      <FeaturedInStrip />

      {/* 13 — Contact CTA (links to /contact) */}
      <div className="section-divider" />
      <ContactCTASection />

      {/* 14 — Instagram Feed */}
      <div className="section-divider" />
      <InstagramFeed />

      {/* 15 — Newsletter */}
      <div className="section-divider" />
      <NewsletterSection />
    </>
  );
};
