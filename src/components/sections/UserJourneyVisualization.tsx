import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, Star, Building2, ArrowRight } from "lucide-react";

interface JourneyNode {
  id: string;
  type: "talent" | "referrer" | "brand";
  icon: React.ElementType;
  title: string;
  subtitle: string;
  benefit: string;
}

const journeyNodes: JourneyNode[] = [
  {
    id: "talent",
    type: "talent",
    icon: Users,
    title: "Talent",
    subtitle: "Know your worth",
    benefit: "Earn 35% of the referral fee",
  },
  {
    id: "referrer",
    type: "referrer",
    icon: Star,
    title: "Referrer",
    subtitle: "Monetize your network",
    benefit: "Earn 35% per successful hire",
  },
  {
    id: "brand",
    type: "brand",
    icon: Building2,
    title: "Brand",
    subtitle: "Access hidden talent",
    benefit: "Save 60% on hiring costs",
  },
];

const UserJourneyVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeFlow, setActiveFlow] = useState(0);

  // Cycle through flows automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            The Ecosystem
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground mb-6">
            How It All Connects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three stakeholders, one seamless ecosystem. Everyone wins.
          </p>
        </motion.div>

        {/* Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {journeyNodes.map((node, i) => {
            const isActive = activeFlow === i;
            const isHovered = hoveredNode === node.id;
            
            // Color classes based on type
            const colorClasses = {
              talent: {
                bg: "bg-talent",
                border: "border-talent/30",
                hoverBorder: "hover:border-talent",
                text: "text-talent",
                glow: "shadow-[0_0_30px_hsl(var(--color-talent)/0.4)]",
              },
              referrer: {
                bg: "bg-referrer",
                border: "border-referrer/30",
                hoverBorder: "hover:border-referrer",
                text: "text-referrer",
                glow: "shadow-[0_0_30px_hsl(var(--color-referrer)/0.4)]",
              },
              brand: {
                bg: "bg-brand",
                border: "border-brand/30",
                hoverBorder: "hover:border-brand",
                text: "text-brand",
                glow: "shadow-[0_0_30px_hsl(var(--color-brand)/0.4)]",
              },
            };
            
            const colors = colorClasses[node.type];

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${colors.border} ${colors.hoverBorder} ${
                  isActive || isHovered ? colors.glow : ""
                }`}
              >
                {/* Pulsing background when active */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 rounded-3xl ${colors.bg} opacity-10`}
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6`}
                >
                  <node.icon className="w-8 h-8 text-foreground" />
                </motion.div>

                {/* Content */}
                <h3 className={`text-2xl font-heading font-bold mb-2 ${colors.text}`}>
                  {node.title}
                </h3>
                <p className="text-lg text-foreground mb-4">{node.subtitle}</p>
                <p className="text-muted-foreground">{node.benefit}</p>

                {/* Arrow indicator */}
                {i < journeyNodes.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      animate={activeFlow === i ? { x: [0, 5, 0] } : {}}
                      transition={{ duration: 1, repeat: activeFlow === i ? Infinity : 0 }}
                      className="w-8 h-8 rounded-full bg-background border-2 border-muted flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Flow Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { step: "1", label: "Referrer spots talent", active: activeFlow === 0 },
            { step: "2", label: "Talent gets hired", active: activeFlow === 1 },
            { step: "3", label: "Everyone gets paid", active: activeFlow === 2 },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              animate={item.active ? { scale: 1.05 } : { scale: 1 }}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                item.active
                  ? "bg-sage text-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-bold">
                {item.step}
              </span>
              <span className="font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserJourneyVisualization;
