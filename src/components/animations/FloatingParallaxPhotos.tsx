import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface FloatingVisual {
  type: "photo" | "shape";
  src?: string;
  /** CSS top position */
  top: string;
  /** CSS left position */
  left: string;
  /** Width in px */
  width: number;
  /** Height in px */
  height: number;
  /** Parallax speed multiplier */
  speed: number;
  /** Starting rotation */
  rotate?: number;
  /** Border radius in px or string */
  radius?: number | string;
  /** Opacity 0-1 */
  opacity?: number;
  /** Shape color class (for shapes) */
  colorClass?: string;
  /** Blur amount */
  blur?: number;
  /** Whether to show on mobile too */
  showMobile?: boolean;
}

const visuals: FloatingVisual[] = [
  // ── Large atmospheric photos ──
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    top: "8%", left: "-2%", width: 280, height: 200, speed: -0.08, rotate: -4, radius: 24, opacity: 0.35,
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
    top: "22%", left: "82%", width: 260, height: 180, speed: 0.12, rotate: 3, radius: 20, opacity: 0.3,
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop",
    top: "38%", left: "-4%", width: 220, height: 220, speed: -0.15, rotate: 5, radius: "50%", opacity: 0.28,
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
    top: "55%", left: "85%", width: 300, height: 200, speed: 0.1, rotate: -2, radius: 28, opacity: 0.32,
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    top: "72%", left: "0%", width: 240, height: 170, speed: -0.06, rotate: -3, radius: 20, opacity: 0.3,
  },

  // ── Bold geometric shapes for color ──
  {
    type: "shape", colorClass: "bg-sage",
    top: "5%", left: "75%", width: 180, height: 180, speed: 0.18, rotate: 45, radius: 32, opacity: 0.12, blur: 40,
  },
  {
    type: "shape", colorClass: "bg-referrer",
    top: "28%", left: "90%", width: 240, height: 240, speed: -0.1, rotate: 15, radius: "50%", opacity: 0.1, blur: 60,
  },
  {
    type: "shape", colorClass: "bg-talent",
    top: "42%", left: "-5%", width: 200, height: 200, speed: 0.14, rotate: -20, radius: "50%", opacity: 0.1, blur: 50,
  },
  {
    type: "shape", colorClass: "bg-rose",
    top: "60%", left: "80%", width: 160, height: 160, speed: -0.2, rotate: 30, radius: 24, opacity: 0.08, blur: 45,
  },
  {
    type: "shape", colorClass: "bg-brand",
    top: "75%", left: "88%", width: 200, height: 200, speed: 0.06, rotate: -10, radius: "50%", opacity: 0.1, blur: 55,
  },
  {
    type: "shape", colorClass: "bg-mustard",
    top: "15%", left: "-3%", width: 140, height: 140, speed: -0.12, rotate: 60, radius: 20, opacity: 0.1, blur: 35,
  },
];

const FloatingParallaxPhotos = () => {
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {visuals.map((v, i) => (
        <FloatingVisualElement key={i} visual={v} scrollY={scrollY} />
      ))}
    </div>
  );
};

function FloatingVisualElement({ visual, scrollY }: { visual: FloatingVisual; scrollY: any }) {
  const yRaw = useTransform(scrollY, (v: number) => v * visual.speed);
  const y = useSpring(yRaw, { stiffness: 60, damping: 25, restDelta: 0.01 });

  const rotateRaw = useTransform(scrollY, (v: number) => (visual.rotate || 0) + v * visual.speed * 0.015);
  const rotate = useSpring(rotateRaw, { stiffness: 60, damping: 25, restDelta: 0.01 });

  const borderRadius = typeof visual.radius === "string" ? visual.radius : `${visual.radius || 16}px`;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: visual.top,
        left: visual.left,
        width: visual.width,
        height: visual.height,
        y,
        rotate,
      }}
      className={visual.showMobile ? "" : "hidden lg:block"}
    >
      {visual.type === "photo" ? (
        <div
          className="w-full h-full overflow-hidden shadow-2xl border border-foreground/5"
          style={{ borderRadius, opacity: visual.opacity || 0.3 }}
        >
          <img
            src={visual.src}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.3) contrast(1.1)" }}
          />
        </div>
      ) : (
        <div
          className={`w-full h-full ${visual.colorClass}`}
          style={{
            borderRadius,
            opacity: visual.opacity || 0.1,
            filter: `blur(${visual.blur || 40}px)`,
          }}
        />
      )}
    </motion.div>
  );
}

export default FloatingParallaxPhotos;
