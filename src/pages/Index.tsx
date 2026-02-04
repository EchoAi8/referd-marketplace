import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import CursorFollower from "@/components/animations/CursorFollower";
import { GridOverlay } from "@/components/animations/GridTransition";
import HeroSection from "@/components/sections/HeroSection";
import ShockingStatsOpener from "@/components/sections/ShockingStatsOpener";
import SolutionReveal from "@/components/sections/SolutionReveal";
import OriginStory from "@/components/sections/OriginStory";
import AboutSection from "@/components/sections/AboutSection";
import StickyHowItWorks from "@/components/sections/StickyHowItWorks";
import StatsSection from "@/components/sections/StatsSection";
import FeaturePills from "@/components/sections/FeaturePills";
import UserJourneyVisualization from "@/components/sections/UserJourneyVisualization";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingCTABar from "@/components/sections/FloatingCTABar";
import SocialShareMenu from "@/components/ui/SocialShareMenu";
import { useState } from "react";

const Index = () => {
  // Intro temporarily disabled for development
  const [introComplete] = useState(true);
  const [showGrid] = useState(true);

  // Index page has custom intro logic, so it doesn't use PageLayout
  return (
    <>
      {/* TypewriterIntro temporarily disabled */}
      {showGrid && <GridOverlay key="home-grid" />}
      <CursorFollower />
      <SocialShareMenu />
      <FloatingCTABar />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SiteHeader />

          {/* Dim vignette layer for immersive menu effect */}
          <div className="menu-vignette" aria-hidden="true" />

          {/* Shell is used for the immersive blur/scale effect when the menu opens */}
          <div className="site-shell">
            <main>
              {/* STORY-DRIVEN FLOW: Hero → Shocking Stats → Solution → Origin Story → Movement */}
              
              {/* 1. Hero - The Hook */}
              <HeroSection />
              
              {/* 2. Shocking Stats - The Problem (overlaps from hero) */}
              <ShockingStatsOpener />
              
              {/* 3. Solution Reveal - The Answer (parallax overlap) */}
              <SolutionReveal />
              
              {/* 4. Origin Story - The Journey (Airbnb-style timeline) */}
              <OriginStory />
              
              {/* 5. The Movement - Word reveal with highlighted terms */}
              <section id="about">
                <AboutSection />
              </section>
              
              {/* 6. How It Works - Sticky explainer */}
              <StickyHowItWorks />
              
              {/* 7. Traction & Social Proof */}
              <StatsSection />
              
              {/* 8. Feature Pills */}
              <FeaturePills />
              
              {/* 9. User Journey Visualization */}
              <UserJourneyVisualization />
              
              {/* 10. FAQ */}
              <section id="faq">
                <FAQSection />
              </section>
              
              {/* 11. Newsletter */}
              <NewsletterSection />
              
              {/* 12. Pricing */}
              <section id="pricing">
                <PricingSection />
              </section>
              
              {/* 13. Contact */}
              <section id="contact">
                <ContactSection />
              </section>
            </main>

            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
