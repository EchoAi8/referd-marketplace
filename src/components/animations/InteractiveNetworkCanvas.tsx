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
  hue: number;
  referralCount: number;
  joinDate: string;
  successRate: number;
  photoUrl: string;
  fee: number;
}

interface FloatingMoney {
  id: number;
  x: number;
  y: number;
  amount: number;
  opacity: number;
  vy: number;
  scale: number;
}

interface RippleWave {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  hue: number;
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  size: number;
  hue: number;
}

const REFERRER_NAMES = [
  "Sarah Chen", "Marcus Williams", "Priya Patel", "James O'Connor", 
  "Elena Rodriguez", "David Kim", "Aisha Johnson", "Tom Bradley",
  "Nina Kowalski", "Raj Sharma", "Emma Thompson", "Carlos Mendez"
];

const REFERRED_NAMES = [
  "Alex Rivera", "Jordan Lee", "Taylor Morgan", "Morgan Chen",
  "Casey Adams", "Jamie Park", "Riley Johnson", "Quinn Davis",
  "Avery Wilson", "Sam Mitchell", "Drew Anderson", "Blake Harris"
];

// Random professional headshot URLs
const PHOTO_URLS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
];

// Vibrant color palette - Cyan/Electric for referrers, Magenta/Violet for referred
const REFERRER_COLORS = {
  primary: { r: 0, g: 245, b: 255 },    // Cyan
  secondary: { r: 100, g: 200, b: 255 }, // Light blue
  glow: { r: 0, g: 255, b: 200 },       // Teal glow
};

const REFERRED_COLORS = {
  primary: { r: 255, g: 50, b: 200 },   // Magenta
  secondary: { r: 200, g: 100, b: 255 }, // Violet
  glow: { r: 255, g: 100, b: 150 },     // Pink glow
};

const InteractiveNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const floatingMoneyRef = useRef<FloatingMoney[]>([]);
  const ripplesRef = useRef<RippleWave[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [networkValue, setNetworkValue] = useState(427832);
  const [hoveredParticle, setHoveredParticle] = useState<Particle | null>(null);
  const [selectedParticle, setSelectedParticle] = useState<Particle | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const lastHireTimeRef = useRef(0);
  const networkValueRef = useRef(427832);
  const timeRef = useRef(0);

  // Preload images
  useEffect(() => {
    PHOTO_URLS.forEach((url) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        imagesRef.current.set(url, img);
      };
    });
  }, []);

  // Initialize particles
  const initializeParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create referrers (cyan nodes) - bigger nodes
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.28 + Math.random() * 80;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const fee = Math.floor(Math.random() * 15000 + 8000);
      
      particles.push({
        id: i,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseX: x,
        baseY: y,
        radius: 28 + Math.random() * 14, // Bigger nodes for referrers
        type: "referrer",
        parentId: null,
        name: REFERRER_NAMES[i % REFERRER_NAMES.length],
        earnings: Math.floor(Math.random() * 25000 + 5000),
        pulsePhase: Math.random() * Math.PI * 2,
        hue: 180 + Math.random() * 40,
        referralCount: Math.floor(Math.random() * 20 + 5),
        joinDate: `${Math.floor(Math.random() * 12 + 1)}/${2022 + Math.floor(Math.random() * 3)}`,
        successRate: Math.floor(Math.random() * 30 + 70),
        photoUrl: PHOTO_URLS[i % PHOTO_URLS.length],
        fee,
      });
    }
    
    // Create referred (magenta nodes) - smaller nodes
    for (let i = 0; i < 20; i++) {
      const parentId = i % 12;
      const parent = particles[parentId];
      const offsetAngle = Math.random() * Math.PI * 2;
      const offsetRadius = 90 + Math.random() * 70;
      const x = parent.x + Math.cos(offsetAngle) * offsetRadius;
      const y = parent.y + Math.sin(offsetAngle) * offsetRadius;
      const fee = Math.floor(Math.random() * 8000 + 3000);
      
      particles.push({
        id: 12 + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseX: x,
        baseY: y,
        radius: 14 + Math.random() * 8,
        type: "referred",
        parentId,
        name: REFERRED_NAMES[i % REFERRED_NAMES.length],
        earnings: Math.floor(Math.random() * 12000 + 2000),
        pulsePhase: Math.random() * Math.PI * 2,
        hue: 300 + Math.random() * 40,
        referralCount: Math.floor(Math.random() * 5),
        joinDate: `${Math.floor(Math.random() * 12 + 1)}/${2023 + Math.floor(Math.random() * 2)}`,
        successRate: Math.floor(Math.random() * 40 + 60),
        photoUrl: PHOTO_URLS[(i + 6) % PHOTO_URLS.length],
        fee,
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

  // Mouse tracking with trail and velocity
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    prevMouseRef.current = { ...mouseRef.current };
    const newMouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    // Calculate mouse velocity
    mouseVelocityRef.current = {
      x: newMouse.x - mouseRef.current.x,
      y: newMouse.y - mouseRef.current.y,
    };
    
    mouseRef.current = newMouse;

    // Add trail points with velocity-based sizing
    const dx = mouseRef.current.x - prevMouseRef.current.x;
    const dy = mouseRef.current.y - prevMouseRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    if (speed > 2) {
      trailRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        opacity: 1,
        size: Math.min(16, 5 + speed * 0.4),
        hue: (timeRef.current * 0.1) % 360,
      });
      
      // Limit trail length
      if (trailRef.current.length > 60) {
        trailRef.current.shift();
      }
    }

    // Check for hover - prioritize bigger nodes
    const particles = particlesRef.current;
    let found: Particle | null = null;
    let closestDist = Infinity;
    
    for (const p of particles) {
      const dist = Math.sqrt((mouseRef.current.x - p.x) ** 2 + (mouseRef.current.y - p.y) ** 2);
      if (dist < p.radius + 20 && dist < closestDist) {
        found = p;
        closestDist = dist;
      }
    }
    setHoveredParticle(found);
    if (found) {
      setTooltipPos({ x: found.x, y: found.y - found.radius - 30 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
    setHoveredParticle(null);
  }, []);

  // Click handler - ripple + zoom
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple ripples for more drama
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        ripplesRef.current.push({
          id: Date.now() + i,
          x,
          y,
          radius: 0,
          opacity: 0.8 - i * 0.2,
          hue: 180 + i * 60,
        });
      }, i * 100);
    }

    // Check if clicking on a particle for zoom
    const particles = particlesRef.current;
    for (const p of particles) {
      const dist = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2);
      if (dist < p.radius + 10) {
        setSelectedParticle(selectedParticle?.id === p.id ? null : p);
        break;
      }
    }
  }, [selectedParticle]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const animate = (time: number) => {
      timeRef.current = time;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Draw background gradient orbs
      const orbGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, dimensions.width * 0.5
      );
      orbGradient.addColorStop(0, "rgba(0, 255, 255, 0.03)");
      orbGradient.addColorStop(0.5, "rgba(255, 0, 200, 0.02)");
      orbGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orbGradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Get mouse velocity for bounce calculations
      const mouseVx = mouseVelocityRef.current.x;
      const mouseVy = mouseVelocityRef.current.y;
      const mouseSpeed = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy);

      // Physics simulation with cursor bounce and interaction
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const cursorRadius = 80; // Collision radius of cursor
        
        // BOUNCE OFF CURSOR - when cursor collides with particle
        if (mouseDist < cursorRadius + p.radius && mouseDist > 0) {
          // Calculate bounce direction (away from cursor)
          const nx = dx / mouseDist;
          const ny = dy / mouseDist;
          
          // Transfer mouse velocity to particle with amplification
          const bounceForce = Math.max(3, mouseSpeed * 0.8);
          const randomAngle = (Math.random() - 0.5) * 0.5;
          
          p.vx += (nx * bounceForce + mouseVx * 0.3) * Math.cos(randomAngle);
          p.vy += (ny * bounceForce + mouseVy * 0.3) * Math.sin(randomAngle);
          
          // Push particle outside cursor radius
          const overlap = cursorRadius + p.radius - mouseDist;
          p.x += nx * overlap * 0.5;
          p.y += ny * overlap * 0.5;
          
          // Add a ripple on collision
          if (mouseSpeed > 5) {
            ripplesRef.current.push({
              id: Date.now() + Math.random(),
              x: p.x,
              y: p.y,
              radius: 0,
              opacity: 0.5,
              hue: p.type === "referrer" ? 180 : 300,
            });
          }
        }
        // SPEED UP when cursor is nearby (within 200px)
        else if (mouseDist < 200 && mouseDist > cursorRadius + p.radius) {
          const proximityFactor = 1 - (mouseDist / 200);
          const speedBoost = 1 + proximityFactor * 2; // Up to 3x speed boost
          
          // Add some chase/flee behavior based on mouse movement
          if (mouseSpeed > 2) {
            p.vx += (mouseVx * 0.05) * proximityFactor;
            p.vy += (mouseVy * 0.05) * proximityFactor;
          }
          
          // Particles become more energetic near cursor
          p.vx *= 1 + proximityFactor * 0.1;
          p.vy *= 1 + proximityFactor * 0.1;
        }

        // Repulsion from other particles
        for (const other of particles) {
          if (p.id === other.id) continue;
          const pdx = p.x - other.x;
          const pdy = p.y - other.y;
          const dist = Math.sqrt(pdx * pdx + pdy * pdy);
          const minDist = p.radius + other.radius + 40;
          
          if (dist < minDist && dist > 0) {
            const force = (minDist - dist) / dist * 0.2;
            p.vx += pdx * force * 0.08;
            p.vy += pdy * force * 0.08;
          }
        }

        // Attraction to parent with elastic spring
        if (p.parentId !== null) {
          const parent = particles[p.parentId];
          const pdx = parent.x - p.x;
          const pdy = parent.y - p.y;
          const dist = Math.sqrt(pdx * pdx + pdy * pdy);
          const targetDist = 110;
          
          const springForce = (dist - targetDist) * 0.003;
          p.vx += pdx / dist * springForce;
          p.vy += pdy / dist * springForce;
        }

        // Organic drifting motion
        p.vx += Math.sin(time * 0.001 + p.pulsePhase) * 0.02;
        p.vy += Math.cos(time * 0.0012 + p.pulsePhase) * 0.02;

        // Drift toward center - subtle
        const centerDx = centerX - p.x;
        const centerDy = centerY - p.y;
        p.vx += centerDx * 0.0002;
        p.vy += centerDy * 0.0002;

        // Friction - slightly less when near cursor for more dynamic feel
        const nearCursor = mouseDist < 200;
        const friction = nearCursor ? 0.97 : 0.95;
        p.vx *= friction;
        p.vy *= friction;

        // Clamp max velocity
        const maxVel = 15;
        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (vel > maxVel) {
          p.vx = (p.vx / vel) * maxVel;
          p.vy = (p.vy / vel) * maxVel;
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Soft bounds with bounce
        const margin = p.radius + 20;
        if (p.x < margin) { p.vx += 1; p.x = margin; }
        if (p.x > dimensions.width - margin) { p.vx -= 1; p.x = dimensions.width - margin; }
        if (p.y < margin) { p.vy += 1; p.y = margin; }
        if (p.y > dimensions.height - margin) { p.vy -= 1; p.y = dimensions.height - margin; }
      }

      // Draw particle trails (mouse following)
      const trail = trailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.opacity -= 0.03;
        t.size *= 0.97;
        
        if (t.opacity <= 0) {
          trail.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.size);
        gradient.addColorStop(0, `hsla(${t.hue}, 100%, 70%, ${t.opacity})`);
        gradient.addColorStop(1, `hsla(${t.hue}, 100%, 50%, 0)`);
        
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw connections with electric glow effect
      ctx.lineCap = "round";
      for (const p of particles) {
        if (p.parentId !== null) {
          const parent = particles[p.parentId];
          const dx = p.x - parent.x;
          const dy = p.y - parent.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Animated dash pattern
          const dashOffset = (time * 0.05) % 20;
          ctx.setLineDash([8, 12]);
          ctx.lineDashOffset = -dashOffset;
          
          // Electric glow with color animation
          const pulse = Math.sin(time * 0.004 + p.pulsePhase) * 0.4 + 0.6;
          const energyPulse = Math.sin(time * 0.008 + p.pulsePhase * 2) * 0.3 + 0.7;
          
          // Gradient from parent to child
          const gradient = ctx.createLinearGradient(parent.x, parent.y, p.x, p.y);
          gradient.addColorStop(0, `rgba(0, 255, 255, ${0.6 * pulse})`);
          gradient.addColorStop(0.5, `rgba(100, 200, 255, ${0.8 * energyPulse})`);
          gradient.addColorStop(1, `rgba(255, 50, 200, ${0.6 * pulse})`);
          
          // Glow layer
          ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 * pulse})`;
          ctx.lineWidth = 8 * pulse;
          ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
          ctx.shadowBlur = 20 * energyPulse;
          ctx.beginPath();
          ctx.moveTo(parent.x, parent.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          
          // Main line
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5 * pulse;
          ctx.shadowBlur = 10;
          ctx.stroke();
          
          ctx.shadowBlur = 0;
          ctx.setLineDash([]);
        }
      }

      // Draw particles with enhanced effects and photo reveal
      for (const p of particles) {
        const isHovered = hoveredParticle?.id === p.id;
        const isSelected = selectedParticle?.id === p.id;
        const isBigNode = p.radius > 25; // Big nodes show photos on hover
        const pulse = Math.sin(time * 0.003 + p.pulsePhase) * 0.2 + 1;
        const energyPulse = Math.sin(time * 0.006 + p.pulsePhase) * 0.15 + 1;
        
        // Calculate velocity magnitude for visual feedback
        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const velScale = 1 + vel * 0.02; // Slight scale based on velocity
        
        const drawRadius = p.radius * (isHovered ? 1.5 : isSelected ? 1.7 : pulse) * velScale;
        
        const colors = p.type === "referrer" ? REFERRER_COLORS : REFERRED_COLORS;
        
        // Outer glow rings - more intense when moving fast
        for (let ring = 3; ring > 0; ring--) {
          const ringRadius = drawRadius * (1.5 + ring * 0.4) * energyPulse;
          const ringOpacity = (0.15 / ring) * (isHovered ? 1.5 : 1) * (1 + vel * 0.1);
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, ${ringOpacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Velocity trail effect
        if (vel > 2) {
          const trailLength = Math.min(vel * 3, 30);
          const trailGradient = ctx.createLinearGradient(
            p.x + (p.vx / vel) * trailLength,
            p.y + (p.vy / vel) * trailLength,
            p.x,
            p.y
          );
          trailGradient.addColorStop(0, `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0)`);
          trailGradient.addColorStop(1, `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0.3)`);
          
          ctx.beginPath();
          ctx.moveTo(p.x - (p.vx / vel) * trailLength, p.y - (p.vy / vel) * trailLength);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = drawRadius * 0.8;
          ctx.lineCap = "round";
          ctx.stroke();
        }
        
        // Main glow gradient
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, drawRadius * 2.5);
        glowGradient.addColorStop(0, `rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, 0.5)`);
        glowGradient.addColorStop(0.5, `rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, 0.2)`);
        glowGradient.addColorStop(1, `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Check if we should show photo (big node + hovered)
        const showPhoto = isBigNode && isHovered && imagesRef.current.has(p.photoUrl);
        
        if (showPhoto) {
          // Draw photo with circular clip
          const img = imagesRef.current.get(p.photoUrl)!;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
          ctx.clip();
          
          // Draw the image
          ctx.drawImage(
            img,
            p.x - drawRadius,
            p.y - drawRadius,
            drawRadius * 2,
            drawRadius * 2
          );
          
          ctx.restore();
          
          // Border glow around photo
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0.9)`;
          ctx.lineWidth = 4;
          ctx.shadowColor = `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 1)`;
          ctx.shadowBlur = 25;
          ctx.stroke();
          ctx.shadowBlur = 0;
          
          // Draw fee badge
          const badgeX = p.x + drawRadius * 0.7;
          const badgeY = p.y - drawRadius * 0.7;
          const feeText = `£${(p.fee / 1000).toFixed(0)}k`;
          
          // Badge background
          ctx.beginPath();
          ctx.roundRect(badgeX - 25, badgeY - 12, 50, 24, 12);
          ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
          ctx.fill();
          ctx.strokeStyle = `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0.8)`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Badge text
          ctx.font = "bold 12px 'Syne', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `rgb(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b})`;
          ctx.fillText(feeText, badgeX, badgeY);
          
        } else {
          // Regular node rendering (non-photo)
          const mainGradient = ctx.createRadialGradient(
            p.x - drawRadius * 0.3, p.y - drawRadius * 0.3, 0,
            p.x, p.y, drawRadius
          );
          mainGradient.addColorStop(0, `rgba(255, 255, 255, ${isHovered ? 1 : 0.9})`);
          mainGradient.addColorStop(0.3, `rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, ${isHovered ? 1 : 0.95})`);
          mainGradient.addColorStop(1, `rgba(${colors.secondary.r}, ${colors.secondary.g}, ${colors.secondary.b}, 0.9)`);
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
          ctx.fillStyle = mainGradient;
          ctx.shadowColor = `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0.8)`;
          ctx.shadowBlur = isHovered ? 30 : 15;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Animated border
          const borderPulse = Math.sin(time * 0.005 + p.pulsePhase) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + borderPulse * 0.4})`;
          ctx.lineWidth = isHovered ? 3 : 2;
          ctx.stroke();
        }
        
        // Inner sparkle for any hovered/selected
        if (isHovered || isSelected) {
          const sparkleAngle = time * 0.01;
          const sparkleX = p.x + Math.cos(sparkleAngle) * drawRadius * 0.5;
          const sparkleY = p.y + Math.sin(sparkleAngle) * drawRadius * 0.5;
          
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fill();
        }
      }

      // Draw and update ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 12;
        r.opacity -= 0.012;
        
        if (r.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const rippleGradient = ctx.createRadialGradient(r.x, r.y, r.radius - 10, r.x, r.y, r.radius + 10);
        rippleGradient.addColorStop(0, `hsla(${r.hue}, 100%, 70%, 0)`);
        rippleGradient.addColorStop(0.5, `hsla(${r.hue}, 100%, 70%, ${r.opacity})`);
        rippleGradient.addColorStop(1, `hsla(${r.hue}, 100%, 50%, 0)`);
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rippleGradient;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Trigger random hire events with more flair
      if (time - lastHireTimeRef.current > 2500 + Math.random() * 4000) {
        lastHireTimeRef.current = time;
        const randomParticle = particles[Math.floor(Math.random() * particles.length)];
        const amount = Math.floor(Math.random() * 5000 + 1000);
        
        // Multiple floating money for celebration effect
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            floatingMoneyRef.current.push({
              id: Date.now() + i,
              x: randomParticle.x + (Math.random() - 0.5) * 40,
              y: randomParticle.y,
              amount: i === 1 ? amount : 0,
              opacity: 1,
              vy: -2.5 - Math.random(),
              scale: i === 1 ? 1.2 : 0.8,
            });
          }, i * 100);
        }

        networkValueRef.current += amount;
        setNetworkValue(networkValueRef.current);
        
        // Celebration ripple
        ripplesRef.current.push({
          id: Date.now(),
          x: randomParticle.x,
          y: randomParticle.y,
          radius: 0,
          opacity: 0.8,
          hue: randomParticle.type === "referrer" ? 180 : 300,
        });
      }

      // Draw and update floating money
      const floatingMoney = floatingMoneyRef.current;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      for (let i = floatingMoney.length - 1; i >= 0; i--) {
        const m = floatingMoney[i];
        m.y += m.vy;
        m.vy *= 0.98;
        m.opacity -= 0.015;
        m.scale *= 0.995;
        
        if (m.opacity <= 0) {
          floatingMoney.splice(i, 1);
          continue;
        }

        if (m.amount > 0) {
          ctx.font = `bold ${20 * m.scale}px 'Syne', sans-serif`;
          
          // Glow effect
          ctx.shadowColor = "rgba(0, 255, 200, 0.8)";
          ctx.shadowBlur = 15;
          ctx.fillStyle = `rgba(0, 255, 200, ${m.opacity})`;
          ctx.fillText(`+£${m.amount.toLocaleString()}`, m.x, m.y);
          ctx.shadowBlur = 0;
        } else {
          // Sparkle particles
          const sparkleGradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 8 * m.scale);
          sparkleGradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
          sparkleGradient.addColorStop(1, `rgba(255, 200, 100, 0)`);
          
          ctx.beginPath();
          ctx.arc(m.x, m.y, 8 * m.scale, 0, Math.PI * 2);
          ctx.fillStyle = sparkleGradient;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, hoveredParticle, selectedParticle]);

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
        className="absolute top-6 right-6 md:top-8 md:right-8 bg-foreground/5 backdrop-blur-xl rounded-2xl px-5 py-4 border border-primary/20 shadow-2xl"
      >
        <div className="text-xs uppercase tracking-widest text-foreground/50 mb-1 font-medium">Network Value</div>
        <motion.div
          key={networkValue}
          initial={{ scale: 1.15, color: "hsl(170, 100%, 70%)" }}
          animate={{ scale: 1, color: "hsl(var(--foreground))" }}
          transition={{ duration: 0.5 }}
          className="font-heading font-bold text-2xl md:text-3xl"
        >
          £{networkValue.toLocaleString()}
        </motion.div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-foreground/5 backdrop-blur-xl rounded-2xl px-5 py-4 border border-primary/20 shadow-2xl"
      >
        <div className="text-xs uppercase tracking-widest text-foreground/50 mb-3 font-medium">Network Legend</div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.6)]" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400 animate-ping opacity-30" />
            </div>
            <span className="text-sm font-medium text-foreground/80">Referrers</span>
            <span className="text-xs text-foreground/40 ml-auto">Earn 35%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 shadow-[0_0_15px_rgba(255,0,200,0.6)]" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-fuchsia-400 animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
            </div>
            <span className="text-sm font-medium text-foreground/80">Referred</span>
            <span className="text-xs text-foreground/40 ml-auto">Earn 35%</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-foreground/10">
          <p className="text-xs text-foreground/40">Click any node for details</p>
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredParticle && !selectedParticle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute pointer-events-none z-50 bg-foreground/95 backdrop-blur-xl rounded-xl px-5 py-4 shadow-2xl border border-primary/30"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className={`text-xs uppercase tracking-wider mb-1 font-semibold ${
              hoveredParticle.type === "referrer" ? "text-cyan-400" : "text-fuchsia-400"
            }`}>
              {hoveredParticle.type === "referrer" ? "⚡ Referrer" : "✨ Referred"}
            </div>
            <div className="font-heading font-bold text-background text-lg">{hoveredParticle.name}</div>
            <div className={`font-heading font-bold text-xl ${
              hoveredParticle.type === "referrer" ? "text-cyan-300" : "text-fuchsia-300"
            }`}>
              £{hoveredParticle.earnings.toLocaleString()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Detail Panel */}
      <AnimatePresence>
        {selectedParticle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-foreground/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-primary/30 min-w-[320px]"
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedParticle(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/10 flex items-center justify-center text-background/60 hover:text-background hover:bg-background/20 transition-colors cursor-pointer"
            >
              ✕
            </button>
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                selectedParticle.type === "referrer" 
                  ? "bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-cyan-500/30" 
                  : "bg-gradient-to-br from-fuchsia-400 to-fuchsia-600 shadow-fuchsia-500/30"
              }`}>
                {selectedParticle.type === "referrer" ? "⚡" : "✨"}
              </div>
              <div>
                <div className={`text-xs uppercase tracking-wider font-semibold ${
                  selectedParticle.type === "referrer" ? "text-cyan-400" : "text-fuchsia-400"
                }`}>
                  {selectedParticle.type === "referrer" ? "Referrer Profile" : "Referred Profile"}
                </div>
                <div className="font-heading font-bold text-background text-2xl">{selectedParticle.name}</div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background/5 rounded-xl p-4">
                <div className="text-xs text-background/40 uppercase tracking-wider mb-1">Total Earnings</div>
                <div className={`font-heading font-bold text-2xl ${
                  selectedParticle.type === "referrer" ? "text-cyan-300" : "text-fuchsia-300"
                }`}>
                  £{selectedParticle.earnings.toLocaleString()}
                </div>
              </div>
              <div className="bg-background/5 rounded-xl p-4">
                <div className="text-xs text-background/40 uppercase tracking-wider mb-1">Referrals</div>
                <div className="font-heading font-bold text-2xl text-background">
                  {selectedParticle.referralCount}
                </div>
              </div>
              <div className="bg-background/5 rounded-xl p-4">
                <div className="text-xs text-background/40 uppercase tracking-wider mb-1">Success Rate</div>
                <div className="font-heading font-bold text-2xl text-emerald-400">
                  {selectedParticle.successRate}%
                </div>
              </div>
              <div className="bg-background/5 rounded-xl p-4">
                <div className="text-xs text-background/40 uppercase tracking-wider mb-1">Joined</div>
                <div className="font-heading font-bold text-lg text-background">
                  {selectedParticle.joinDate}
                </div>
              </div>
            </div>
            
            {/* Referral History */}
            <div className="bg-background/5 rounded-xl p-4">
              <div className="text-xs text-background/40 uppercase tracking-wider mb-3">Recent Activity</div>
              <div className="space-y-2">
                {[
                  { action: "Successful placement", time: "2 days ago", value: "+£2,450" },
                  { action: "New referral submitted", time: "5 days ago", value: "Pending" },
                  { action: "Bonus earned", time: "1 week ago", value: "+£500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-background/70">{item.action}</span>
                    <span className="text-background/40 text-xs">{item.time}</span>
                    <span className={item.value.startsWith("+") ? "text-emerald-400 font-semibold" : "text-amber-400"}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveNetworkCanvas;
