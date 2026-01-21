import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import CursorFollower from "@/components/animations/CursorFollower";
import TypewriterIntro from "@/components/animations/TypewriterIntro";
import { GridOverlay } from "@/components/animations/GridTransition";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StickyHowItWorks from "@/components/sections/StickyHowItWorks";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import PricingSection from "@/components/sections/PricingSection";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ContactSection from "@/components/sections/ContactSection";
import { useState } from "react";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const handleIntroComplete = () => {
    // Show grid IMMEDIATELY - no delay
    setShowGrid(true);
    // Then mark intro as complete
    setIntroComplete(true);
  };

  return (
    <>
      {!introComplete && <TypewriterIntro onComplete={handleIntroComplete} />}
      {showGrid && <GridOverlay key="home-grid" />}
      <CursorFollower />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SiteHeader />

          {/* Dim vignette layer for immersive menu effect */}
          <div className="menu-vignette" aria-hidden="true" />

          {/* Shell is used for the immersive blur/scale effect when the menu opens */}
          <div className="site-shell">
            <main>
              <HeroSection />
              <section id="about">
                <AboutSection />
              </section>
              <StickyHowItWorks />
              <StatsSection />
              <section id="projects">
                <ProjectsSection />
              </section>
              <HorizontalGallery />
              <section id="faq">
                <FAQSection />
              </section>
              <NewsletterSection />
              <section id="pricing">
                <PricingSection />
              </section>
              <section id="articles">
                <ArticlesSection />
              </section>
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
