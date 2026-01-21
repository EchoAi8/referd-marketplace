import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HorizontalGallery from "@/components/sections/HorizontalGallery";

const Work = () => {
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
              <section className="pt-28" id="projects">
                <ProjectsSection />
              </section>
              <HorizontalGallery />
            </main>
            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Work;
