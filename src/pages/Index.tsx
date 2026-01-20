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
    setIntroComplete(true);
    // Small delay before showing grid overlay
    setTimeout(() => setShowGrid(true), 100);
  };

  return (
    <>
      {!introComplete && <TypewriterIntro onComplete={handleIntroComplete} />}
      {showGrid && <GridOverlay key="home-grid" />}
      <CursorFollower />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          
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
      </PageTransition>
    </>
  );
};

export default Index;
