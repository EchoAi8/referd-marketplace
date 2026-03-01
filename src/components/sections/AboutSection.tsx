import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import WordReveal from "@/components/animations/WordReveal";

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="pt-8 md:pt-16 pb-32 md:pb-48 bg-foreground text-background overflow-hidden relative z-10">
      {/* Parallax overlap from previous section */}
      <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-foreground to-transparent pointer-events-none z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        {/* About Us Label */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4"
        >
          The Movement
        </motion.p>

        {/* Epic Word Reveal */}
        <div className="min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center mb-8">
          <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-heading font-bold leading-[1.1] max-w-6xl">
            <WordReveal text="Like" />
            <span className="inline"> </span>
            <span className="text-mustard"><WordReveal text="Uber" delay={0.05} /></span>
            <span className="inline"> </span>
            <WordReveal text="for transport," delay={0.1} />
            <span className="inline"> </span>
            <span className="text-rose"><WordReveal text="Airbnb" delay={0.15} /></span>
            <span className="inline"> </span>
            <WordReveal text="for hospitality," delay={0.2} />
            <span className="block mt-3">
              <WordReveal text="or" delay={0.25} />
              <span className="inline"> </span>
              <span className="text-sage"><WordReveal text="Spotify" delay={0.28} /></span>
              <span className="inline"> </span>
              <WordReveal text="for music —" delay={0.32} />
            </span>
            <span className="block mt-6">
              <span className="text-talent"><WordReveal text="Referd" delay={0.4} /></span>
              <span className="inline"> </span>
              <WordReveal text="is here to" delay={0.45} />
              <span className="inline"> </span>
              <span className="text-rose font-black"><WordReveal text="DISRUPT." delay={0.5} /></span>
            </span>
          </h2>

          {/* Subtext */}
          <div className="mt-12 max-w-5xl">
            <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold leading-relaxed">
              <WordReveal text="Redefining recruitment" delay={0.6} />
              <span className="inline"> </span>
              <span className="text-referrer"><WordReveal text="one referral" delay={0.65} /></span>
              <span className="inline"> </span>
              <WordReveal text="at a time." delay={0.7} />
            </p>
            <p className="mt-8 text-xl md:text-2xl leading-relaxed text-background/80">
              <WordReveal text="The corporate 'Recruitment Fee' is now" delay={0.75} />
              <span className="inline"> </span>
              <span className="text-sage font-bold"><WordReveal text="redistributed" delay={0.8} /></span>
              <span className="inline"> </span>
              <WordReveal text="to the" delay={0.85} />
              <span className="inline"> </span>
              <span className="text-talent font-bold"><WordReveal text="people." delay={0.88} /></span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 via-background/80 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default AboutSection;
