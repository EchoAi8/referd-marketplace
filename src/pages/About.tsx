import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import AboutSection from "@/components/sections/AboutSection";

const About = () => {
  return (
    <>
      <GridOverlay />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SiteHeader />

          {/* Dim vignette layer for immersive menu effect */}
          <div className="menu-vignette" aria-hidden="true" />

          {/* Shell for blur/scale effect when menu opens */}
          <div className="site-shell">
            <main>
              <section className="pt-28">
                <AboutSection />
              </section>
            </main>
            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default About;
