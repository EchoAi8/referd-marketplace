import PageLayout from "@/components/layout/PageLayout";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HorizontalGallery from "@/components/sections/HorizontalGallery";

const Work = () => {
  return (
    <PageLayout>
      <section className="pt-28" id="projects">
        <ProjectsSection />
      </section>
      <HorizontalGallery />
    </PageLayout>
  );
};

export default Work;
