import { useEffect, useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  intensity?: number;
  borderRadius?: number;
  className?: string;
}

export function ParallaxImage({
  src,
  alt = "Parallax image",
  intensity = 20,
  borderRadius = 0,
  className = "",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationFrame = useRef<number | null>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    // Smooth lerp function for buttery parallax
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updatePosition = () => {
      if (!containerRef.current || !imageRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress: 0 when element enters viewport, 1 when it leaves
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const progress = (elementCenter - viewportCenter) / viewportHeight;
      
      // Smoother parallax calculation
      targetY.current = progress * intensity * -4;
    };

    const animate = () => {
      // Smooth interpolation for 60fps smoothness
      currentY.current = lerp(currentY.current, targetY.current, 0.08);
      
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(0, ${currentY.current}px, 0) scale(1.1)`;
      }
      
      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
    updatePosition();
    animate();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePosition);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius,
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          height: "120%",
          width: "110%",
          objectFit: "cover",
          willChange: "transform",
          borderRadius,
          transform: "translate3d(0, 0, 0) scale(1.1)",
        }}
      />
    </div>
  );
}

export default ParallaxImage;
