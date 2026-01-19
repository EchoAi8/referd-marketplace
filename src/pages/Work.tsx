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
          <main>
            <section className="pt-28" id="projects">
              <ProjectsSection />
            </section>
            <HorizontalGallery />
          </main>
          <SiteFooter />
        </div>
      </PageTransition>
    </>
  );
};

export default Work;
