import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface FeatureItem {
  label: string;
  title: string;
  description: string;
  image: string;
  color: "talent" | "referrer" | "brand";
}

const features: FeatureItem[] = [
  {
    label: "For Talent",
    title: "Know Your Worth",
    description: "AI-powered salary intelligence gives you real-time market data. See exactly where you stand and negotiate with confidence.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80",
    color: "talent",
  },
  {
    label: "For Referrers",
    title: "Earn From Your Network",
    description: "Turn your professional connections into income. Get paid up to 30% of placement fees for successful referrals.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    color: "referrer",
  },
  {
    label: "For Brands",
    title: "Access Hidden Talent",
    description: "Tap into a network-powered talent pool. Find candidates through trusted referrals, not just job boards.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80",
    color: "brand",
  },
  {
    label: "AI Intelligence",
    title: "Market Pulse Reports",
    description: "Get comprehensive salary benchmarks, industry trends, and competitive analysis powered by machine learning.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80",
    color: "talent",
  },
  {
    label: "Transparency",
    title: "Fair Split Model",
    description: "See exactly how referral fees are distributed. 50% to talent, 30% to referrer, 20% platform fee. No hidden costs.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    color: "referrer",
  },
  {
    label: "Community",
    title: "Build Your Herd",
    description: "Join a community of professionals helping each other succeed. The more you refer, the more you earn.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    color: "brand",
  },
];

const colorClasses = {
  talent: {
    bg: "bg-talent/20",
    text: "text-talent",
    border: "border-talent/30",
    activeBg: "bg-talent",
  },
  referrer: {
    bg: "bg-referrer/20",
    text: "text-referrer",
    border: "border-referrer/30",
    activeBg: "bg-referrer",
  },
  brand: {
    bg: "bg-brand/20",
    text: "text-brand",
    border: "border-brand/30",
    activeBg: "bg-brand",
  },
};

const FeaturePills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const collapsedWidths = useRef<number[]>([]);

  // Capture initial collapsed widths
  useEffect(() => {
    collapsedWidths.current = itemRefs.current.map((item) => {
      if (!item) return 0;
      return item.getBoundingClientRect().width;
    });
  }, []);

  const handleItemClick = (index: number) => {
    if (activeIndex === index) {
      // Close current item
      closeItem(index);
      setActiveIndex(null);
      setIsExpanded(false);
    } else {
      // Close previous and open new
      if (activeIndex !== null) {
        closeItem(activeIndex);
      }
      openItem(index);
      setActiveIndex(index);
      setIsExpanded(true);
    }
  };

  const openItem = (index: number) => {
    const item = itemRefs.current[index];
    if (!item) return;

    const inner = item.querySelector("[data-inner]") as HTMLElement;
    if (!inner) return;

    const targetHeight = inner.scrollHeight + 60; // padding
    const targetWidth = 400; // expanded width

    gsap.to(item, {
      height: targetHeight,
      width: targetWidth,
      duration: 0.5,
      ease: "back.out(1.5)",
    });
  };

  const closeItem = (index: number) => {
    const item = itemRefs.current[index];
    if (!item) return;

    const button = item.querySelector("[data-button]") as HTMLElement;
    if (!button) return;

    const targetHeight = button.offsetHeight;
    const targetWidth = collapsedWidths.current[index] || "auto";

    gsap.to(item, {
      height: targetHeight,
      width: targetWidth,
      duration: 0.5,
      ease: "back.out(1.5)",
    });
  };

  const handleClose = () => {
    if (activeIndex !== null) {
      closeItem(activeIndex);
    }
    setActiveIndex(null);
    setIsExpanded(false);
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4">
            The Data Speaks
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background">
            Share Opportunities
          </h2>
        </motion.div>

        {/* Feature Pills Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Pills List */}
            <div className="lg:w-1/2">
              <ul className="flex flex-wrap gap-3 lg:gap-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative overflow-hidden rounded-full transition-all ${
                      activeIndex === index ? "rounded-2xl" : ""
                    }`}
                    style={{
                      height: "auto",
                    }}
                  >
                    {/* Background */}
                    <div
                      className={`absolute inset-0 transition-colors duration-300 ${
                        activeIndex === index
                          ? colorClasses[feature.color].activeBg
                          : "bg-background/10"
                      }`}
                    />

                    {/* Button */}
                    <button
                      data-button
                      onClick={() => handleItemClick(index)}
                      className={`relative z-10 flex items-center gap-2 px-5 py-3 transition-opacity duration-300 ${
                        activeIndex === index ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                    >
                      <span className="text-lg font-medium text-background whitespace-nowrap">
                        {feature.label}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center">
                        <span className="w-2 h-0.5 bg-background" />
                        <span className="absolute w-0.5 h-2 bg-background" />
                      </span>
                    </button>

                    {/* Expanded Content */}
                    <div
                      className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${
                        activeIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden h-full">
                        <div data-inner className="p-6">
                          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Visual Side */}
            <div className="lg:w-1/2 relative aspect-square lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden">
              {/* Cover Image */}
              <motion.div
                className="absolute inset-0 z-10"
                animate={{ opacity: isExpanded ? 0 : 1 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80"
                  alt="Platform overview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              </motion.div>

              {/* Active Feature Images */}
              <AnimatePresence mode="wait">
                {activeIndex !== null && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={features[activeIndex].image}
                      alt={features[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Close Button */}
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ scale: 0, rotate: 135, opacity: 0 }}
                animate={{ scale: 1, rotate: 45, opacity: 1 }}
                exit={{ scale: 0, rotate: 135, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
                onClick={handleClose}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center"
              >
                <span className="w-4 h-0.5 bg-background absolute" />
                <span className="w-0.5 h-4 bg-background absolute" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturePills;