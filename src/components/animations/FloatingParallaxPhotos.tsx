import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface FloatingPhoto {
  src: string;
  alt: string;
  /** CSS top position */
  top: string;
  /** CSS left position */
  left: string;
  /** Size in px */
  size: number;
  /** Parallax speed multiplier (-1 to 1) */
  speed: number;
  /** Rotation range in degrees */
  rotate?: number;
  /** Border radius in px */
  radius?: number;
  /** Opacity 0-1 */
  opacity?: number;
  /** z-index */
  z?: number;
}

const defaultPhotos: FloatingPhoto[] = [
  // Cluster between RecruitmentIndustry and RecruitmentBroken
  { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face", alt: "Professional", top: "12%", left: "3%", size: 72, speed: -0.15, rotate: -6, radius: 16, opacity: 0.25, z: 30 },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", alt: "Professional", top: "18%", left: "88%", size: 56, speed: 0.1, rotate: 4, radius: 12, opacity: 0.2, z: 30 },
  
  // Cluster between RecruitmentBroken and PowerOfReferrals
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face", alt: "Talent", top: "30%", left: "92%", size: 80, speed: -0.2, rotate: 5, radius: 20, opacity: 0.22, z: 30 },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", alt: "Professional", top: "35%", left: "5%", size: 64, speed: 0.12, rotate: -3, radius: 14, opacity: 0.18, z: 30 },

  // Around PowerOfReferrals  
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face", alt: "Referrer", top: "45%", left: "2%", size: 68, speed: -0.18, rotate: 7, radius: 18, opacity: 0.2, z: 30 },
  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", alt: "Professional", top: "48%", left: "93%", size: 52, speed: 0.14, rotate: -5, radius: 12, opacity: 0.18, z: 30 },
  
  // Crossing into TheReferdWay
  { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face", alt: "Executive", top: "58%", left: "6%", size: 76, speed: -0.22, rotate: -4, radius: 16, opacity: 0.22, z: 30 },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", alt: "Talent", top: "62%", left: "90%", size: 60, speed: 0.16, rotate: 6, radius: 14, opacity: 0.2, z: 30 },

  // Deep into TheReferdWay / About transition
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face", alt: "Professional", top: "72%", left: "4%", size: 48, speed: 0.08, rotate: 3, radius: 10, opacity: 0.15, z: 30 },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", alt: "Referrer", top: "76%", left: "91%", size: 64, speed: -0.12, rotate: -8, radius: 16, opacity: 0.18, z: 30 },
];

/**
 * Full-page floating parallax photos that drift across section boundaries.
 * Positioned absolutely within a container that spans all content sections.
 */
const FloatingParallaxPhotos = () => {
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 30 }}>
      {defaultPhotos.map((photo, i) => (
        <FloatingPhotoElement key={i} photo={photo} scrollY={scrollY} index={i} />
      ))}
    </div>
  );
};

function FloatingPhotoElement({ photo, scrollY, index }: { photo: FloatingPhoto; scrollY: any; index: number }) {
  const yRaw = useTransform(scrollY, (v: number) => v * photo.speed);
  const y = useSpring(yRaw, { stiffness: 80, damping: 30, restDelta: 0.01 });

  const rotateRaw = useTransform(scrollY, (v: number) => (photo.rotate || 0) + v * photo.speed * 0.02);
  const rotate = useSpring(rotateRaw, { stiffness: 80, damping: 30, restDelta: 0.01 });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: photo.top,
        left: photo.left,
        width: photo.size,
        height: photo.size,
        y,
        rotate,
        zIndex: photo.z || 30,
      }}
      className="hidden md:block"
    >
      <div
        className="w-full h-full overflow-hidden border border-background/10 shadow-2xl"
        style={{ borderRadius: photo.radius || 12 }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-cover grayscale"
          style={{ opacity: photo.opacity || 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default FloatingParallaxPhotos;
