import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  connections: number[];
  color: string;
  label?: string;
}

const NetworkDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 25 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Generate network nodes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const colors = [
      "hsl(var(--sage))",
      "hsl(var(--mustard))",
      "hsl(var(--rose))",
      "hsl(var(--foreground) / 0.6)",
    ];

    const labels = ["You", "Friend", "Hire", "Company", "Network", "Reward"];
    
    const nodeCount = 18;
    const newNodes: Node[] = [];
    
    // Create center hub
    newNodes.push({
      id: 0,
      x: dimensions.width / 2,
      y: dimensions.height / 2,
      baseX: dimensions.width / 2,
      baseY: dimensions.height / 2,
      size: 24,
      connections: [1, 2, 3, 4, 5],
      color: colors[0],
      label: labels[0],
    });

    // Create connected nodes in rings
    for (let i = 1; i < nodeCount; i++) {
      const ring = i <= 5 ? 1 : i <= 12 ? 2 : 3;
      const radius = ring * (Math.min(dimensions.width, dimensions.height) * 0.15);
      const nodesInRing = ring === 1 ? 5 : ring === 2 ? 7 : 5;
      const indexInRing = ring === 1 ? i - 1 : ring === 2 ? i - 6 : i - 13;
      const angleOffset = ring * 0.3;
      const angle = (indexInRing / nodesInRing) * Math.PI * 2 + angleOffset;
      
      const x = dimensions.width / 2 + Math.cos(angle) * radius;
      const y = dimensions.height / 2 + Math.sin(angle) * radius;
      
      // Connect to previous ring nodes
      const connections: number[] = [];
      if (ring === 1) {
        connections.push(0);
        if (i > 1) connections.push(i - 1);
        if (i < 5) connections.push(i + 1);
        else connections.push(1);
      } else if (ring === 2) {
        connections.push(Math.floor(indexInRing / 1.4) + 1);
        if (i > 6) connections.push(i - 1);
      } else {
        connections.push(Math.floor(indexInRing / 0.7) + 6);
      }

      newNodes.push({
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        size: ring === 1 ? 16 : ring === 2 ? 12 : 8,
        connections,
        color: colors[i % colors.length],
        label: i <= 5 ? labels[i] : undefined,
      });
    }

    setNodes(newNodes);
  }, [dimensions]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(dimensions.width / 2);
    mouseY.set(dimensions.height / 2);
  }, [mouseX, mouseY, dimensions]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden"
    >
      <svg className="w-full h-full" style={{ minHeight: "100%" }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--sage) / 0.5)" />
            <stop offset="100%" stopColor="hsl(var(--mustard) / 0.5)" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes.find((n) => n.id === targetId);
            if (!target) return null;
            return (
              <NetworkLine
                key={`${node.id}-${targetId}`}
                x1={node.baseX}
                y1={node.baseY}
                x2={target.baseX}
                y2={target.baseY}
                mouseX={smoothMouseX}
                mouseY={smoothMouseY}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <NetworkNode
            key={node.id}
            node={node}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
          />
        ))}
      </svg>
    </div>
  );
};

interface NetworkLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mouseX: any;
  mouseY: any;
}

const NetworkLine = ({ x1, y1, x2, y2, mouseX, mouseY }: NetworkLineProps) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  
  const offsetX = useTransform(mouseX, (mx: number) => {
    const dist = Math.sqrt(Math.pow(mx - midX, 2));
    const influence = Math.max(0, 1 - dist / 300);
    return (mx - midX) * influence * 0.15;
  });

  const offsetY = useTransform(mouseY, (my: number) => {
    const dist = Math.sqrt(Math.pow(my - midY, 2));
    const influence = Math.max(0, 1 - dist / 300);
    return (my - midY) * influence * 0.15;
  });

  const pathD = useTransform([offsetX, offsetY], ([ox, oy]: number[]) => {
    const cx = midX + ox;
    const cy = midY + oy;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  });

  return (
    <motion.path
      d={pathD}
      stroke="url(#lineGradient)"
      strokeWidth="1.5"
      fill="none"
      opacity={0.4}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
};

interface NetworkNodeProps {
  node: Node;
  mouseX: any;
  mouseY: any;
}

const NetworkNode = ({ node, mouseX, mouseY }: NetworkNodeProps) => {
  const [isPulsing, setIsPulsing] = useState(false);

  // Random pulse animation for active referral connections
  useEffect(() => {
    const startPulse = () => {
      const delay = Math.random() * 8000 + 2000; // Random delay 2-10s
      const timer = setTimeout(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1500);
        startPulse();
      }, delay);
      return timer;
    };
    
    const timer = startPulse();
    return () => clearTimeout(timer);
  }, []);

  const nodeX = useTransform(mouseX, (mx: number) => {
    const dist = Math.sqrt(
      Math.pow(mx - node.baseX, 2) + Math.pow(mouseY.get() - node.baseY, 2)
    );
    const influence = Math.max(0, 1 - dist / 250);
    return node.baseX + (mx - node.baseX) * influence * 0.2;
  });

  const nodeY = useTransform(mouseY, (my: number) => {
    const dist = Math.sqrt(
      Math.pow(mouseX.get() - node.baseX, 2) + Math.pow(my - node.baseY, 2)
    );
    const influence = Math.max(0, 1 - dist / 250);
    return node.baseY + (my - node.baseY) * influence * 0.2;
  });

  const scale = useTransform([mouseX, mouseY], ([mx, my]: number[]) => {
    const dist = Math.sqrt(
      Math.pow(mx - node.baseX, 2) + Math.pow(my - node.baseY, 2)
    );
    const influence = Math.max(0, 1 - dist / 200);
    return 1 + influence * 0.4;
  });

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: node.id * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {/* Pulse ring animation */}
      <AnimatePresence>
        {isPulsing && (
          <motion.circle
            cx={node.baseX}
            cy={node.baseY}
            r={node.size / 2}
            fill="none"
            stroke={node.color}
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Active connection highlight */}
      {isPulsing && (
        <motion.circle
          cx={node.baseX}
          cy={node.baseY}
          r={node.size * 2}
          fill={node.color}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          filter="url(#glow)"
        />
      )}

      {/* Glow effect */}
      <motion.circle
        cx={nodeX}
        cy={nodeY}
        r={node.size * 1.5}
        fill={node.color}
        opacity={isPulsing ? 0.4 : 0.15}
        style={{ scale }}
        filter="url(#glow)"
      />
      
      {/* Main node */}
      <motion.circle
        cx={nodeX}
        cy={nodeY}
        r={node.size / 2}
        fill={node.color}
        style={{ scale }}
        className="cursor-pointer"
        animate={isPulsing ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
      />

      {/* Label */}
      {node.label && (
        <motion.text
          x={nodeX}
          y={useTransform(nodeY, (y) => y + node.size + 14)}
          textAnchor="middle"
          className="fill-background/80 text-[10px] font-medium uppercase tracking-wider pointer-events-none"
          style={{ scale }}
        >
          {node.label}
        </motion.text>
      )}
    </motion.g>
  );
};

export default NetworkDiagram;
