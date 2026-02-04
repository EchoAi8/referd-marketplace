import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Users, Briefcase, Building2, X } from "lucide-react";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

const FloatingCTABar = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { scrollY } = useScroll();

  // Show after scrolling past hero (roughly 100vh)
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (!isDismissed) {
        setIsVisible(latest > window.innerHeight * 0.8);
      }
    });
    return () => unsubscribe();
  }, [scrollY, isDismissed]);

  const opacity = useTransform(scrollY, [0, 400], [0, 1]);

  const ctaOptions = [
    {
      label: "I'm Talent",
      sublabel: "Know your worth",
      icon: Users,
      theme: "talent" as const,
      path: "/career-intelligence",
    },
    {
      label: "I'm a Referrer",
      sublabel: "Earn from referrals",
      icon: Briefcase,
      theme: "referrer" as const,
      path: "/opportunities",
    },
    {
      label: "I'm a Brand",
      sublabel: "Hire smarter",
      icon: Building2,
      theme: "brand" as const,
      path: "/how-it-works",
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="relative bg-foreground/95 backdrop-blur-xl rounded-full px-2 py-2 shadow-2xl border border-background/10">
            {/* Dismiss button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3 text-background" />
            </button>

            <div className="flex items-center gap-2">
              {ctaOptions.map((cta, index) => {
                const IconComponent = cta.icon;
                const bgColor = 
                  cta.theme === "talent" ? "bg-talent hover:bg-talent-dark" :
                  cta.theme === "referrer" ? "bg-referrer hover:bg-referrer-dark" :
                  "bg-brand hover:bg-brand-dark";

                return (
                  <motion.button
                    key={cta.label}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigateWithTransition(cta.path)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-full ${bgColor} text-foreground font-semibold text-sm transition-all duration-300 hover:scale-105`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{cta.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTABar;
