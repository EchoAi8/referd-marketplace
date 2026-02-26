import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Zap, Target, Rocket, Heart, TrendingUp } from "lucide-react";
import DirectionalButton from "@/components/ui/DirectionalButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

const storyBeats = [
  {
    year: "2019",
    title: "The Frustration",
    icon: Heart,
    color: "text-rose",
    bgColor: "bg-rose/20",
    content: "After years in recruitment, we saw the same story: talented people losing out on dream jobs because of 30% agency fees. Employers couldn't afford them. Talent couldn't reach them. The only winners? The middlemen.",
  },
  {
    year: "2020",
    title: "The Realisation",
    icon: Lightbulb,
    color: "text-referrer",
    bgColor: "bg-referrer/20",
    content: "The best hires always came from referrals. Not agencies. Not job boards. People who actually knew the candidates. Yet these referrers got nothing. We thought: what if we flipped the script?",
  },
  {
    year: "2021",
    title: "The Rightmove Moment",
    icon: Zap,
    color: "text-sage",
    bgColor: "bg-sage/20",
    content: "Rightmove disrupted estate agents. Uber disrupted taxis. Airbnb disrupted hotels. Every industry has its moment. Recruitment was next. We started building the marketplace that would give power back to people.",
  },
  {
    year: "2023",
    title: "AI-Powered Evolution",
    icon: Target,
    color: "text-referrer",
    bgColor: "bg-referrer/20",
    content: "We integrated cutting-edge AI and Machine Learning to match talent with opportunities 10x faster than traditional methods. Smart algorithms that learn and improve with every successful placement.",
  },
  {
    year: "2024",
    title: "The Revolution Begins",
    icon: Rocket,
    color: "text-talent",
    bgColor: "bg-talent/20",
    content: "Referd launched. Not as another recruitment agency, but as the anti-agency — a people-powered marketplace where 70% of fees go directly to referrers and talent. The revolution is here.",
  },
];

const OriginStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useGridNavigation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-40 bg-background overflow-hidden"
    >
      {/* Parallax overlap from previous section */}
      <div className="absolute -top-1 left-0 right-0 h-32 bg-gradient-to-b from-foreground to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Our Story
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            From{" "}
            <span className="text-rose">frustration</span>{" "}
            to{" "}
            <span className="text-sage">revolution</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Like Airbnb started with air mattresses, we started with a simple question:
            <span className="block mt-2 text-foreground font-semibold">
              Why don't the people who make hiring happen get paid?
            </span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated progress line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-sage via-mustard to-rose origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Story beats */}
          <div className="space-y-16 md:space-y-24">
            {storyBeats.map((beat, index) => {
              const IconComponent = beat.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={beat.year}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`relative pl-12 md:pl-0 md:w-[45%] ${
                    isEven ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-auto ${
                    isEven ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                  } top-0 w-8 h-8 rounded-full ${beat.bgColor} flex items-center justify-center border-4 border-background z-10`}>
                    <IconComponent className={`w-4 h-4 ${beat.color}`} />
                  </div>

                  {/* Content card */}
                  <div className={`p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-sage/30 transition-colors ${
                    isEven ? "md:text-right" : ""
                  }`}>
                    <span className={`text-sm font-bold ${beat.color}`}>
                      {beat.year}
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-foreground mt-1 mb-3">
                      {beat.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {beat.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* The Vision CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/20 mb-6">
            <TrendingUp className="w-4 h-4 text-sage" />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
              The Next Unicorn
            </span>
          </div>
          
          <h3 className="text-fluid-3xl md:text-fluid-4xl font-heading font-bold text-foreground max-w-3xl mx-auto mb-6">
            Join the{" "}
            <span className="text-talent">people-powered</span>{" "}
            recruitment revolution
          </h3>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Whether you're talent looking to know your worth, a referrer ready to monetize your network, 
            or a brand tired of agency fees — there's a place for you in the herd.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DirectionalButton 
              theme="talent"
              size="xl"
              onClick={() => navigateWithTransition("/career-intelligence")}
            >
              Check My Market Value
            </DirectionalButton>
            <DirectionalButton
              theme="referrer"
              size="xl"
              onClick={() => navigateWithTransition("/opportunities")}
            >
              Start Earning From Referrals
            </DirectionalButton>
          </div>
        </motion.div>
      </div>

      {/* Bottom overlap into next section */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default OriginStory;
