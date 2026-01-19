import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=90",
    title: "Team Collaboration",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=90",
    title: "Product Launch",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=90",
    title: "Strategy Session",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=90",
    title: "Board Meeting",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&auto=format&fit=crop&q=90",
    title: "Creative Workshop",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=90",
    title: "Office Culture",
  },
];

const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { smoothProgress } = useSmoothScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    stiffness: 100,
    damping: 32,
  });

  const x = useTransform(smoothProgress, [0, 1], ["5%", "-45%"]);

  return (
    <section ref={containerRef} className="py-32 bg-foreground overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4">
            Behind the Scenes
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background">
            Our Process
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <motion.div style={{ x }} className="flex gap-8 pl-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0 w-[400px] md:w-[500px] lg:w-[600px] group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <motion.img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Title */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <p className="text-xl font-heading font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {image.title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <div className="container mx-auto px-6 mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-[2px] bg-background/30" />
          <p className="text-sm text-background/50">Scroll to explore</p>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <span className="text-background/50">→</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
