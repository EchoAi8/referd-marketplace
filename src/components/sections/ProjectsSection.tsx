import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";

const projects = [
  {
    id: 1,
    title: "Tech Talent Network",
    category: "Software Engineering",
    description: "Connected 500+ engineers with top startups",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Executive Placements",
    category: "Leadership",
    description: "C-suite placements across Fortune 500 companies",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Creative Collective",
    category: "Design & Marketing",
    description: "Building creative teams for agencies worldwide",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Success Stories
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-foreground">
              Featured Projects
            </h2>
          </div>
          <button className="hidden md:block px-6 py-3 border border-border rounded-full text-sm hover:bg-muted transition-colors">
            View All Projects
          </button>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl mb-8">
                <ParallaxImage
                  src={project.image}
                  alt={project.title}
                  intensity={15}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                  <h3 className="text-2xl md:text-3xl font-heading font-medium text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-md">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="md:hidden mt-12 text-center">
          <button className="px-6 py-3 border border-border rounded-full text-sm hover:bg-muted transition-colors">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
