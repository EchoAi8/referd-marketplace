import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import SimpleHeroCarousel from "@/components/hero/SimpleHeroCarousel";
import HeroCarouselCTAs from "@/components/showcase/HeroCarouselCTAs";
import ParallaxClosingSection from "@/components/sections/ParallaxClosingSection";

const Index = () => {
  return (
    <>
      <GridOverlay key="home-grid" />
      <PageTransition>
        <div className="min-h-screen bg-foreground">
          <TwoStepNavigation />

          <div className="menu-vignette" aria-hidden="true" />

          <div className="site-shell">
            <main>
              {/* Hero 3D Carousel Section */}
              <section className="hero-section">
                {/* Hero Title with cinematic glow */}
                <div className="hero-section__header">
                  <h1 className="hero-title font-heading font-black text-4xl md:text-6xl lg:text-7xl text-white tracking-tight mb-3">
                    Referd<span className="text-talent">®</span>
                  </h1>
                  <p className="text-white/70 text-base md:text-lg lg:text-xl font-medium max-w-xl mx-auto px-4">
                    The People Powered <span className="text-talent font-semibold">Recruitment Marketplace</span>
                  </p>
                </div>

                {/* Simple 3D Carousel */}
                <SimpleHeroCarousel />

                {/* CTAs */}
                <HeroCarouselCTAs />

                {/* Ambient glow */}
                <div className="hero-section__glow" />
              </section>

              {/* Parallax Closing Section */}
              <ParallaxClosingSection />
            </main>

            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
