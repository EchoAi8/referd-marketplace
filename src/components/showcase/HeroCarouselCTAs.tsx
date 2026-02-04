import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Building2 } from "lucide-react";

/**
 * Three CTAs for the hero carousel section:
 * 1. How much are you actually worth? (Talent)
 * 2. Refer & Earn (Referrer)
 * 3. Hire Smarter (Brand)
 */
const HeroCarouselCTAs = () => {
  const ctas = [
    {
      label: "How much are you actually worth?",
      href: "/salary-intelligence",
      icon: TrendingUp,
      color: "talent", // Green
      description: "Get your market value"
    },
    {
      label: "Refer & Earn",
      href: "/referrer",
      icon: Users,
      color: "referrer", // Blue
      description: "Monetize your network"
    },
    {
      label: "Hire Smarter",
      href: "/brands",
      icon: Building2,
      color: "brand", // Pink
      description: "Cut hiring costs by 60%"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 0.03, 0.26, 1] as const
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {ctas.map((cta, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Link
            to={cta.href}
            className={`hero-cta-button hero-cta-button--${cta.color} group relative flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105`}
          >
            {/* Pulsing glow ring */}
            <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-300 bg-${cta.color}`} />
            
            <cta.icon className="w-5 h-5 relative z-10" />
            
            <div className="relative z-10 text-left">
              <span className="block font-semibold text-sm sm:text-base leading-tight">
                {cta.label}
              </span>
              <span className="block text-xs opacity-70 mt-0.5">
                {cta.description}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroCarouselCTAs;
