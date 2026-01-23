import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DataPoint {
  x: number;
  y: number;
  value: number;
  label: string;
}

const MarketPulseVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  // Simulated market data points
  const dataPoints: DataPoint[] = [
    { x: 0.1, y: 0.3, value: 45000, label: "Entry" },
    { x: 0.2, y: 0.45, value: 55000, label: "Junior" },
    { x: 0.35, y: 0.55, value: 68000, label: "Mid" },
    { x: 0.5, y: 0.72, value: 85000, label: "Senior" },
    { x: 0.65, y: 0.78, value: 95000, label: "Lead" },
    { x: 0.8, y: 0.85, value: 115000, label: "Principal" },
    { x: 0.95, y: 0.92, value: 145000, label: "Director" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }> = [];

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw grid
      ctx.strokeStyle = "rgba(139, 164, 133, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = (rect.width / 10) * i;
        const y = (rect.height / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      // Draw flowing data lines
      const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
      gradient.addColorStop(0, "rgba(139, 164, 133, 0.8)");
      gradient.addColorStop(0.5, "rgba(199, 165, 95, 0.8)");
      gradient.addColorStop(1, "rgba(139, 164, 133, 0.8)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      dataPoints.forEach((point, i) => {
        const x = point.x * rect.width;
        const y = rect.height - (point.y * rect.height) + Math.sin(time * 2 + i) * 5;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Smooth curve
          const prevPoint = dataPoints[i - 1];
          const prevX = prevPoint.x * rect.width;
          const prevY = rect.height - (prevPoint.y * rect.height) + Math.sin(time * 2 + (i - 1)) * 5;
          const cpX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2);
        }
      });
      ctx.stroke();

      // Draw glow under curve
      const glowGradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      glowGradient.addColorStop(0, "rgba(139, 164, 133, 0.15)");
      glowGradient.addColorStop(1, "rgba(139, 164, 133, 0)");

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      dataPoints.forEach((point, i) => {
        const x = point.x * rect.width;
        const y = rect.height - (point.y * rect.height) + Math.sin(time * 2 + i) * 5;
        if (i === 0) ctx.moveTo(x, y);
        else {
          const prevPoint = dataPoints[i - 1];
          const prevX = prevPoint.x * rect.width;
          const prevY = rect.height - (prevPoint.y * rect.height) + Math.sin(time * 2 + (i - 1)) * 5;
          const cpX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2);
        }
      });
      ctx.lineTo(rect.width, rect.height);
      ctx.lineTo(0, rect.height);
      ctx.closePath();
      ctx.fill();

      // Draw data points with pulse
      dataPoints.forEach((point, i) => {
        const x = point.x * rect.width;
        const y = rect.height - (point.y * rect.height) + Math.sin(time * 2 + i) * 5;
        const pulse = Math.sin(time * 3 + i * 0.5) * 0.3 + 1;

        // Outer glow
        const pointGradient = ctx.createRadialGradient(x, y, 0, x, y, 20 * pulse);
        pointGradient.addColorStop(0, "rgba(139, 164, 133, 0.8)");
        pointGradient.addColorStop(1, "rgba(139, 164, 133, 0)");
        ctx.fillStyle = pointGradient;
        ctx.beginPath();
        ctx.arc(x, y, 20 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = "#8BA485";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FAFAFA";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Flowing particles
      if (Math.random() > 0.9) {
        particles.push({
          x: Math.random() * rect.width,
          y: rect.height,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 3 - 1,
          life: 0,
          maxLife: 60 + Math.random() * 60,
        });
      }

      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        
        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = `rgba(199, 165, 95, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        return p.life < p.maxLife;
      });

      // Scanning line
      const scanX = ((time * 50) % (rect.width + 100)) - 50;
      const scanGradient = ctx.createLinearGradient(scanX - 50, 0, scanX + 50, 0);
      scanGradient.addColorStop(0, "rgba(199, 165, 95, 0)");
      scanGradient.addColorStop(0.5, "rgba(199, 165, 95, 0.3)");
      scanGradient.addColorStop(1, "rgba(199, 165, 95, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(scanX - 50, 0, 100, rect.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x: e.clientX, y: e.clientY });

    // Check if hovering over a data point
    const closest = dataPoints.find((point) => {
      const px = point.x * rect.width;
      const py = rect.height - point.y * rect.height;
      return Math.hypot(px - x, py - y) < 30;
    });

    setHoveredPoint(closest || null);
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ width: "100%", height: "100%" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
      />

      {/* Corner labels */}
      <div className="absolute top-4 left-4 text-sage/60 font-mono text-xs">
        <div>MARKET_PULSE™</div>
        <div className="text-mustard/60">LIVE DATA STREAM</div>
      </div>
      <div className="absolute top-4 right-4 text-sage/60 font-mono text-xs text-right">
        <div>SALARY RANGE</div>
        <div className="text-mustard">£45K—£145K+</div>
      </div>
      <div className="absolute bottom-4 left-4 text-sage/60 font-mono text-xs">
        <div>EXPERIENCE</div>
        <div className="text-mustard/60">0—15+ YRS</div>
      </div>
      <div className="absolute bottom-4 right-4 text-sage/60 font-mono text-xs text-right">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-sage" />
          ANALYZING...
        </motion.div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 40,
            }}
          >
            <div className="bg-foreground/95 backdrop-blur-xl rounded-xl px-4 py-3 border border-sage/30 shadow-2xl">
              <div className="text-sage font-mono text-xs mb-1">{hoveredPoint.label.toUpperCase()}</div>
              <div className="text-background font-heading font-bold text-xl">
                £{hoveredPoint.value.toLocaleString()}
              </div>
              <div className="text-background/50 text-xs">avg. salary</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketPulseVisualization;
