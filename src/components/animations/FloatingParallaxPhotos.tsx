import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Passive network nodes backdrop – decorative dots & connection lines
 * that drift gently with parallax scroll. No interaction / pointer events.
 */

interface BgNode {
  id: number;
  x: number; // 0-1 normalised
  y: number; // 0-1 normalised
  size: number;
  color: string;
  connections: number[];
  speed: number; // parallax multiplier
  phase: number; // drift phase offset
}

const COLORS = [
  "hsl(var(--sage))",
  "hsl(var(--mustard))",
  "hsl(var(--rose))",
  "hsl(var(--brand))",
  "hsl(var(--foreground) / 0.25)",
];

function generateNodes(): BgNode[] {
  const nodes: BgNode[] = [];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const ring = i < 6 ? 0 : i < 16 ? 1 : 2;
    nodes.push({
      id: i,
      x: 0.08 + Math.random() * 0.84,
      y: 0.04 + Math.random() * 0.92,
      size: ring === 0 ? 6 + Math.random() * 4 : ring === 1 ? 4 + Math.random() * 3 : 2 + Math.random() * 2,
      color: COLORS[i % COLORS.length],
      connections: [],
      speed: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    });
  }

  // Build connections – each node connects to 1-3 nearby nodes
  for (let i = 0; i < count; i++) {
    const dists = nodes
      .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d);

    const connCount = 1 + Math.floor(Math.random() * 2);
    nodes[i].connections = dists.slice(0, connCount).map((e) => e.j);
  }

  return nodes;
}

const STATIC_NODES = generateNodes();

const FloatingParallaxPhotos = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1, h: 1 });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDims({ w: width || 1, h: height || 1 });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--sage) / 0.3)" />
            <stop offset="100%" stopColor="hsl(var(--mustard) / 0.3)" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {STATIC_NODES.map((node) =>
          node.connections.map((targetId) => {
            const target = STATIC_NODES[targetId];
            return (
              <line
                key={`l-${node.id}-${targetId}`}
                x1={`${node.x * 100}%`}
                y1={`${node.y * 100}%`}
                x2={`${target.x * 100}%`}
                y2={`${target.y * 100}%`}
                stroke="url(#bg-line-grad)"
                strokeWidth="1"
                opacity="0.25"
              />
            );
          })
        )}
      </svg>

      {/* Nodes as absolutely-positioned divs so we can apply parallax */}
      {STATIC_NODES.map((node) => (
        <ParallaxNode key={node.id} node={node} scrollY={scrollY} />
      ))}
    </div>
  );
};

function ParallaxNode({ node, scrollY }: { node: BgNode; scrollY: any }) {
  const yRaw = useTransform(scrollY, (v: number) => v * node.speed);
  const y = useSpring(yRaw, { stiffness: 50, damping: 30, restDelta: 0.01 });

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
        width: node.size * 2,
        height: node.size * 2,
        y,
        backgroundColor: node.color,
        opacity: 0.35,
        boxShadow: `0 0 ${node.size * 3}px ${node.color}`,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.25, 0.45, 0.25],
      }}
      transition={{
        duration: 4 + node.phase,
        repeat: Infinity,
        ease: "easeInOut",
        delay: node.phase * 0.5,
      }}
    />
  );
}

export default FloatingParallaxPhotos;
