import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Users, Briefcase, Building2, ArrowRight, DollarSign, Star, Zap, CheckCircle } from "lucide-react";

interface JourneyNode {
  id: string;
  type: "talent" | "referrer" | "brand";
  icon: React.ElementType;
  title: string;
  description: string;
}

const journeyNodes: JourneyNode[] = [
  {
    id: "talent",
    type: "talent",
    icon: Users,
    title: "Talent",
    description: "Find out your market value, get discovered, earn 35% of the referral fee",
  },
  {
    id: "referrer",
    type: "referrer",
    icon: Star,
    title: "Referrer",
    description: "Monetize your network, refer great people, earn 35% of the fee",
  },
  {
    id: "brand",
    type: "brand",
    icon: Building2,
    title: "Brand",
    description: "Access pre-vetted talent, save 60% on hiring costs, hire faster",
  },
];

const connections = [
  { from: "referrer", to: "talent", label: "Refers" },
  { from: "talent", to: "brand", label: "Gets Hired" },
  { from: "brand", to: "referrer", label: "Pays Fee" },
];

const UserJourneyVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeFlow, setActiveFlow] = useState<number>(0);

  // Cycle through flows automatically
  useState(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % connections.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const getNodePosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90;
    const radius = 140;
    return {
      x: Math.cos((angle * Math.PI) / 180) * radius,
      y: Math.sin((angle * Math.PI) / 180) * radius,
    };
  };

  const getColorClasses = (type: "talent" | "referrer" | "brand") => {
    switch (type) {
      case "talent":
        return {
          bg: "bg-talent",
          border: "border-talent",
          text: "text-talent",
          glow: "shadow-[0_0_40px_hsl(var(--color-talent)/0.6)]",
          gradient: "from-talent/20 to-talent/5",
        };
      case "referrer":
        return {
          bg: "bg-referrer",
          border: "border-referrer",
          text: "text-referrer",
          glow: "shadow-[0_0_40px_hsl(var(--color-referrer)/0.6)]",
          gradient: "from-referrer/20 to-referrer/5",
        };
      case "brand":
        return {
          bg: "bg-brand",
          border: "border-brand",
          text: "text-brand",
          glow: "shadow-[0_0_40px_hsl(var(--color-brand)/0.6)]",
          gradient: "from-brand/20 to-brand/5",
        };
    }
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-background mb-6">
            How It All Connects
          </h2>
          <p className="text-xl md:text-2xl text-background/60 max-w-3xl mx-auto">
            Three stakeholders, one seamless ecosystem. Everyone wins.
          </p>
        </motion.div>

        {/* Circular Journey Visualization */}
        <div className="relative flex justify-center items-center min-h-[500px] md:min-h-[600px]">
          {/* Central Platform Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-sage flex items-center justify-center shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-background/20"
              />
              <span className="font-heading font-bold text-2xl md:text-3xl text-foreground">R</span>
            </div>
            
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-sage/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-sage/20"
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>

          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <defs>
              {/* Gradient definitions for each connection type */}
              <linearGradient id="grad-talent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--color-talent))" />
                <stop offset="100%" stopColor="hsl(var(--color-referrer))" />
              </linearGradient>
              <linearGradient id="grad-referrer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--color-referrer))" />
                <stop offset="100%" stopColor="hsl(var(--color-brand))" />
              </linearGradient>
              <linearGradient id="grad-brand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--color-brand))" />
                <stop offset="100%" stopColor="hsl(var(--color-talent))" />
              </linearGradient>
              
              {/* Animated dash pattern */}
              <pattern id="flow-pattern" patternUnits="userSpaceOnUse" width="20" height="1">
                <motion.rect
                  width="10"
                  height="1"
                  fill="currentColor"
                  animate={{ x: [0, 20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </pattern>
            </defs>
            
            {/* Connection arcs between nodes */}
            {connections.map((conn, i) => {
              const fromIdx = journeyNodes.findIndex((n) => n.id === conn.from);
              const toIdx = journeyNodes.findIndex((n) => n.id === conn.to);
              const fromPos = getNodePosition(fromIdx, journeyNodes.length);
              const toPos = getNodePosition(toIdx, journeyNodes.length);
              
              const centerX = 50;
              const centerY = 50;
              const scale = 2.5;
              
              return (
                <g key={`${conn.from}-${conn.to}`}>
                  {/* Base arc */}
                  <motion.path
                    d={`M ${centerX + fromPos.x / scale}% ${centerY + fromPos.y / scale}% 
                        Q ${centerX}% ${centerY}% 
                        ${centerX + toPos.x / scale}% ${centerY + toPos.y / scale}%`}
                    fill="none"
                    stroke="hsl(var(--color-background) / 0.1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                  />
                  
                  {/* Animated flow line */}
                  <motion.path
                    d={`M ${centerX + fromPos.x / scale}% ${centerY + fromPos.y / scale}% 
                        Q ${centerX}% ${centerY}% 
                        ${centerX + toPos.x / scale}% ${centerY + toPos.y / scale}%`}
                    fill="none"
                    stroke={`url(#grad-${conn.from})`}
                    strokeWidth="3"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isInView && activeFlow === i
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0.3 }
                    }
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Journey Nodes */}
          {journeyNodes.map((node, i) => {
            const pos = getNodePosition(i, journeyNodes.length);
            const colors = getColorClasses(node.type);
            const isHovered = hoveredNode === node.id;
            const isActive = connections[activeFlow]?.from === node.id || connections[activeFlow]?.to === node.id;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
                style={{
                  left: `calc(50% + ${pos.x * 1.8}px)`,
                  top: `calc(50% + ${pos.y * 1.8}px)`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isHovered ? 30 : 15,
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Card */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.8 }}
                  className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${colors.gradient} backdrop-blur-xl border-2 ${colors.border} cursor-pointer transition-all duration-300 ${
                    isHovered || isActive ? colors.glow : ""
                  }`}
                >
                  {/* Pulsing glow when active */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${colors.bg}/20`}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${colors.bg} flex items-center justify-center mb-4 mx-auto`}>
                    <node.icon className="w-7 h-7 md:w-8 md:h-8 text-foreground" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-xl md:text-2xl font-heading font-bold ${colors.text} text-center mb-2`}>
                    {node.title}
                  </h3>
                  
                  {/* Expanded description on hover */}
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={isHovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    className="text-sm text-background/60 text-center max-w-[180px] overflow-hidden"
                  >
                    {node.description}
                  </motion.p>
                  
                  {/* Earnings badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isHovered ? { scale: 1 } : { scale: 0 }}
                    className={`absolute -top-2 -right-2 ${colors.bg} rounded-full px-3 py-1 flex items-center gap-1`}
                  >
                    <DollarSign className="w-3 h-3 text-foreground" />
                    <span className="text-xs font-bold text-foreground">35%</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Flow Description Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Zap, title: "1. Referrer Spots Talent", desc: "Your network is valuable. Refer talented people you know.", color: "referrer" },
            { icon: Briefcase, title: "2. Talent Gets Hired", desc: "Pre-vetted candidates matched with perfect opportunities.", color: "talent" },
            { icon: CheckCircle, title: "3. Everyone Gets Paid", desc: "35% to referrer, 35% to talent, brands save 60%.", color: "brand" },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl bg-${step.color}/10 border border-${step.color}/30 hover:border-${step.color}/60 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-full bg-${step.color} flex items-center justify-center mb-4`}>
                <step.icon className="w-6 h-6 text-foreground" />
              </div>
              <h4 className="text-lg font-heading font-bold text-background mb-2">{step.title}</h4>
              <p className="text-background/60 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserJourneyVisualization;