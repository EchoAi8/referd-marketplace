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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = rect.top / viewportHeight;

      const moveY = progress * intensity * -6;

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      animationFrame.current = requestAnimationFrame(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${moveY}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          top: "0%",
          left: "0",
          height: "105%",
          width: "100%",
          objectFit: "cover",
          willChange: "transform",
          borderRadius,
        }}
      />
    </div>
  );
}

export default ParallaxImage;
