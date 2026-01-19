import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TextScramble from "@/components/animations/TextScramble";
const logos = [
  "TechCrunch", "Forbes", "Wired", "Bloomberg", "The Guardian", "Fast Company",
  "TechCrunch", "Forbes", "Wired", "Bloomberg", "The Guardian", "Fast Company",
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gray-50 overflow-hidden">
      {/* Featured In - Infinite Ticker */}
      <div className="mb-20">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Featured In
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex whitespace-nowrap"
          >
            {[...logos, ...logos].map((logo, index) => (
              <span
                key={index}
                className="mx-12 text-2xl md:text-3xl font-heading font-bold text-foreground/20"
              >
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground">
            <TextScramble text="Trusted by thousands" className="font-heading" />
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Made £8,000 in my first month just by sharing roles with my network.",
              author: "Sarah K.",
              role: "Product Designer",
              rating: 5,
            },
            {
              quote: "Finally, a platform that values the connections we've built over the years.",
              author: "Marcus T.",
              role: "Engineering Lead",
              rating: 5,
            },
            {
              quote: "The transparency is refreshing. I know exactly where my referrals are in the process.",
              author: "Priya M.",
              role: "Recruiter",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-sage text-lg">★</span>
                ))}
              </div>
              <p className="text-lg text-foreground mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-heading font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
