import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";

const projects = [
  {
    id: 1,
    title: "Korten",
    subtitle: "Turning tradition into a modern brand",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=90",
  },
  {
    id: 2,
    title: "Meridian Tech",
    subtitle: "Building the future of remote work",
    category: "Design",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&fit=crop&q=90",
  },
  {
    id: 3,
    title: "Lumina Health",
    subtitle: "Healthcare reimagined for modern life",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&auto=format&fit=crop&q=90",
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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Selected Work
            </p>
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground">
              Success Stories
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="self-start md:self-auto px-8 py-4 border-2 border-foreground text-foreground rounded-full font-semibold hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            View All Cases
          </motion.button>
        </motion.div>

        {/* Projects - Large Vertical Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              {/* Vertical Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                <ParallaxImage
                  src={project.image}
                  alt={project.title}
                  intensity={25}
                  className="w-full h-full"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full text-xs uppercase tracking-[0.1em] font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-2 group-hover:text-sage transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">
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
