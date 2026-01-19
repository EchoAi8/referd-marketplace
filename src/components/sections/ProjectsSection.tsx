import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";

const projects = [
  {
    id: 1,
    title: "Tech Talent Network",
    subtitle: "Connecting engineers with innovative startups",
    category: "Software Engineering",
    year: "2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=90",
  },
  {
    id: 2,
    title: "Executive Search",
    subtitle: "C-suite placements for Fortune 500",
    category: "Leadership",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=90",
  },
  {
    id: 3,
    title: "Creative Collective",
    subtitle: "Building design teams worldwide",
    category: "Design & Marketing",
    year: "2023",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&auto=format&fit=crop&q=90",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Selected Work
            </p>
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-semibold text-foreground">
              Success Stories
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="self-start md:self-auto btn-secondary text-base py-3"
          >
            View All Cases
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] md:aspect-[21/10] overflow-hidden rounded-xl mb-8">
                <ParallaxImage
                  src={project.image}
                  alt={project.title}
                  intensity={20}
                  className="w-full h-full"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                
                {/* View Project Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="bg-background text-foreground px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                    View Project
                  </span>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {project.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground group-hover:text-sage transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                <p className="text-muted-foreground md:max-w-sm md:text-right">
                  {project.subtitle}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
