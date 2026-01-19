import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  type: "referrer" | "referred";
  parentId: number | null;
  name: string;
  earnings: number;
  hireTime?: number;
  pulsePhase: number;
}

interface FloatingMoney {
  id: number;
  x: number;
  y: number;
  amount: number;
  opacity: number;
  vy: number;
}

interface RippleWave {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

const REFERRER_NAMES = [
  "Sarah Chen", "Marcus Williams", "Priya Patel", "James O'Connor", 
  "Elena Rodriguez", "David Kim", "Aisha Johnson", "Tom Bradley",
  "Nina Kowalski", "Raj Sharma", "Emma Thompson", "Carlos Mendez"
];

const REFERRED_NAMES = [
  "Alex Rivera", "Jordan Lee", "Taylor Swift", "Morgan Chen",
  "Casey Adams", "Jamie Park", "Riley Johnson", "Quinn Davis",
  "Avery Wilson", "Sam Mitchell", "Drew Anderson", "Blake Harris"
];

const InteractiveNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const floatingMoneyRef = useRef<FloatingMoney[]>([]);
  const ripplesRef = useRef<RippleWave[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [networkValue, setNetworkValue] = useState(427832);
  const [hoveredParticle, setHoveredParticle] = useState<Particle | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const lastHireTimeRef = useRef(0);
  const networkValueRef = useRef(427832);

  // Initialize particles
  const initializeParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create referrers (green nodes)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.25 + Math.random() * 100;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      particles.push({
        id: i,
        x,
        y,
        vx: 0,
        vy: 0,
        baseX: x,
        baseY: y,
        radius: 20 + Math.random() * 10,
        type: "referrer",
        parentId: null,
        name: REFERRER_NAMES[i % REFERRER_NAMES.length],
        earnings: Math.floor(Math.random() * 15000 + 2000),
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    
    // Create referred (pink nodes) connected to referrers
    for (let i = 0; i < 18; i++) {
      const parentId = i % 12;
      const parent = particles[parentId];
      const offsetAngle = Math.random() * Math.PI * 2;
      const offsetRadius = 80 + Math.random() * 60;
      const x = parent.x + Math.cos(offsetAngle) * offsetRadius;
      const y = parent.y + Math.sin(offsetAngle) * offsetRadius;
      
      particles.push({
        id: 12 + i,
        x,
        y,
        vx: 0,
        vy: 0,
        baseX: x,
        baseY: y,
        radius: 12 + Math.random() * 6,
        type: "referred",
        parentId,
        name: REFERRED_NAMES[i % REFERRED_NAMES.length],
        earnings: Math.floor(Math.random() * 8000 + 1000),
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    
    return particles;
  }, []);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        if (canvasRef.current) {
          const dpr = window.devicePixelRatio || 1;
          canvasRef.current.width = width * dpr;
          canvasRef.current.height = height * dpr;
          canvasRef.current.style.width = `${width}px`;
          canvasRef.current.style.height = `${height}px`;
          
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) ctx.scale(dpr, dpr);
        }
        
        particlesRef.current = initializeParticles(width, height);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [initializeParticles]);

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Check for hover
    const particles = particlesRef.current;
    let found: Particle | null = null;
    for (const p of particles) {
      const dist = Math.sqrt((mouseRef.current.x - p.x) ** 2 + (mouseRef.current.y - p.y) ** 2);
      if (dist < p.radius + 10) {
        found = p;
        break;
      }
    }
    setHoveredParticle(found);
    if (found) {
      setTooltipPos({ x: found.x, y: found.y - found.radius - 20 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
    setHoveredParticle(null);
  }, []);

  // Click ripple effect
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripplesRef.current.push({
      id: Date.now(),
      x,
      y,
      radius: 0,
      opacity: 0.6,
    });
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Physics simulation
      for (const p of particles) {
        // Mouse attraction (within 200px)
        const mouseDist = Math.sqrt((mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2);
        if (mouseDist < 200 && mouseDist > 0) {
          const force = (200 - mouseDist) / 200 * 0.5;
          p.vx += ((mouse.x - p.x) / mouseDist) * force;
          p.vy += ((mouse.y - p.y) / mouseDist) * force;
        }

        // Repulsion from other particles
        for (const other of particles) {
          if (p.id === other.id) continue;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p.radius + other.radius + 30;
          
          if (dist < minDist && dist > 0) {
            const force = (minDist - dist) / dist * 0.3;
            p.vx += dx * force * 0.1;
            p.vy += dy * force * 0.1;
          }
        }

        // Attraction to parent
        if (p.parentId !== null) {
          const parent = particles[p.parentId];
          const dx = parent.x - p.x;
          const dy = parent.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = 100;
          
          if (dist > targetDist) {
            p.vx += dx * 0.002;
            p.vy += dy * 0.002;
          }
        }

        // Drift toward center
        const centerDx = centerX - p.x;
        const centerDy = centerY - p.y;
        p.vx += centerDx * 0.0003;
        p.vy += centerDy * 0.0003;

        // Friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Bounds
        p.x = Math.max(p.radius, Math.min(dimensions.width - p.radius, p.x));
        p.y = Math.max(p.radius, Math.min(dimensions.height - p.radius, p.y));
      }

      // Draw connections with electric glow
      ctx.lineCap = "round";
      for (const p of particles) {
        if (p.parentId !== null) {
          const parent = particles[p.parentId];
          const gradient = ctx.createLinearGradient(parent.x, parent.y, p.x, p.y);
          gradient.addColorStop(0, "rgba(197, 234, 134, 0.6)");
          gradient.addColorStop(1, "rgba(255, 172, 209, 0.6)");
          
          // Electric glow effect
          const pulse = Math.sin(time * 0.003 + p.pulsePhase) * 0.3 + 0.7;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2 * pulse;
          ctx.shadowColor = "rgba(197, 234, 134, 0.8)";
          ctx.shadowBlur = 10 * pulse;
          
          ctx.beginPath();
          ctx.moveTo(parent.x, parent.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Draw particles
      for (const p of particles) {
        const isHovered = hoveredParticle?.id === p.id;
        const pulse = Math.sin(time * 0.002 + p.pulsePhase) * 0.15 + 1;
        const drawRadius = p.radius * (isHovered ? 1.3 : pulse);
        
        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, drawRadius * 2);
        if (p.type === "referrer") {
          gradient.addColorStop(0, "rgba(197, 234, 134, 0.4)");
          gradient.addColorStop(1, "rgba(197, 234, 134, 0)");
        } else {
          gradient.addColorStop(0, "rgba(255, 172, 209, 0.4)");
          gradient.addColorStop(1, "rgba(255, 172, 209, 0)");
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Main circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === "referrer" 
          ? `rgba(197, 234, 134, ${isHovered ? 1 : 0.9})`
          : `rgba(255, 172, 209, ${isHovered ? 1 : 0.9})`;
        ctx.fill();

        // Border
        ctx.strokeStyle = p.type === "referrer"
          ? "rgba(150, 200, 100, 0.8)"
          : "rgba(255, 130, 180, 0.8)";
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();
      }

      // Draw and update ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 8;
        r.opacity -= 0.015;
        
        if (r.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(197, 234, 134, ${r.opacity})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Trigger random hire events
      if (time - lastHireTimeRef.current > 3000 + Math.random() * 5000) {
        lastHireTimeRef.current = time;
        const randomParticle = particles[Math.floor(Math.random() * particles.length)];
        const amount = Math.floor(Math.random() * 3000 + 500);
        
        floatingMoneyRef.current.push({
          id: Date.now(),
          x: randomParticle.x,
          y: randomParticle.y,
          amount,
          opacity: 1,
          vy: -2,
        });

        networkValueRef.current += amount;
        setNetworkValue(networkValueRef.current);
      }

      // Draw and update floating money
      const floatingMoney = floatingMoneyRef.current;
      ctx.font = "bold 16px 'Syne', sans-serif";
      ctx.textAlign = "center";
      
      for (let i = floatingMoney.length - 1; i >= 0; i--) {
        const m = floatingMoney[i];
        m.y += m.vy;
        m.opacity -= 0.012;
        
        if (m.opacity <= 0) {
          floatingMoney.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(197, 234, 134, ${m.opacity})`;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 4;
        ctx.fillText(`+£${m.amount.toLocaleString()}`, m.x, m.y);
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, hoveredParticle]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Network Value Counter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-6 right-6 md:top-8 md:right-8 bg-background/10 backdrop-blur-md rounded-xl px-4 py-3 border border-sage/30"
      >
        <div className="text-xs uppercase tracking-wider text-background/60 mb-1">Network Value</div>
        <motion.div
          key={networkValue}
          initial={{ scale: 1.1, color: "hsl(83, 69%, 72%)" }}
          animate={{ scale: 1, color: "hsl(0, 0%, 100%)" }}
          className="font-heading font-bold text-xl md:text-2xl text-background"
        >
          £{networkValue.toLocaleString()}
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredParticle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute pointer-events-none z-50 bg-background/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border border-foreground/10"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              {hoveredParticle.type === "referrer" ? "Referrer" : "Referred"}
            </div>
            <div className="font-heading font-semibold text-foreground">{hoveredParticle.name}</div>
            <div className={`font-heading font-bold text-lg ${hoveredParticle.type === "referrer" ? "text-sage" : "text-rose"}`}>
              £{hoveredParticle.earnings.toLocaleString()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveNetworkCanvas;
