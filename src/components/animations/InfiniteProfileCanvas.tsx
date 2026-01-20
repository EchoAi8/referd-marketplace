import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Profile {
  id: number;
  name: string;
  role: string;
  image: string;
  x: number;
  y: number;
  scale: number;
  parallaxFactor: number;
}

const profileImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
];

const names = [
  "Sarah Chen", "Marcus Johnson", "Emily Rodriguez", "David Kim",
  "Priya Patel", "James Wilson", "Nina Kowalski", "Alex Thompson",
  "Maya Singh", "Chris Anderson", "Rachel Lee", "Daniel Brown"
];

const roles = [
  "Product Designer", "Software Engineer", "Marketing Lead", "Data Scientist",
  "UX Researcher", "Backend Developer", "Growth Manager", "DevOps Engineer",
  "Frontend Developer", "Product Manager", "Design Lead", "Full Stack Dev"
];

const InfiniteProfileCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.3, y: 0.2 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const generateProfiles = () => {
      const gridSize = 4;
      const cellWidth = 280;
      const cellHeight = 200;
      const newProfiles: Profile[] = [];

      for (let i = 0; i < 12; i++) {
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);
        
        newProfiles.push({
          id: i,
          name: names[i],
          role: roles[i],
          image: profileImages[i],
          x: gridX * cellWidth + (Math.random() - 0.5) * 60,
          y: gridY * cellHeight + (Math.random() - 0.5) * 40,
          scale: 0.8 + Math.random() * 0.4,
          parallaxFactor: 0.5 + Math.random() * 0.5,
        });
      }
      
      setProfiles(newProfiles);
    };

    generateProfiles();
  }, []);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (!isDraggingRef.current) {
        targetOffsetRef.current.x += velocityRef.current.x;
        targetOffsetRef.current.y += velocityRef.current.y;
      }

      setOffset(prev => ({
        x: prev.x + (targetOffsetRef.current.x - prev.x) * 0.08,
        y: prev.y + (targetOffsetRef.current.y - prev.y) * 0.08,
      }));

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      targetOffsetRef.current.x += dx * 0.5;
      targetOffsetRef.current.y += dy * 0.5;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const tileWidth = 280 * 4;
  const tileHeight = 200 * 3;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Render 3x3 grid for infinite tiling */}
      {[-1, 0, 1].map((tileY) =>
        [-1, 0, 1].map((tileX) => (
          <div
            key={`${tileX}-${tileY}`}
            className="absolute"
            style={{
              transform: `translate(${offset.x + tileX * tileWidth}px, ${offset.y + tileY * tileHeight}px)`,
              width: tileWidth,
              height: tileHeight,
            }}
          >
            {profiles.map((profile) => {
              const parallaxX = offset.x * profile.parallaxFactor * 0.1;
              const parallaxY = offset.y * profile.parallaxFactor * 0.1;

              return (
                <motion.div
                  key={profile.id}
                  className="absolute"
                  style={{
                    left: profile.x + parallaxX,
                    top: profile.y + parallaxY,
                    transform: `scale(${profile.scale})`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: profile.scale }}
                  transition={{ duration: 0.6, delay: profile.id * 0.05 }}
                >
                  <div className="group relative">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-background/20 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border border-foreground/10 whitespace-nowrap">
                        <p className="text-sm font-semibold text-foreground">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">{profile.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))
      )}

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-foreground to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-foreground to-transparent" />
      </div>
    </div>
  );
};

export default InfiniteProfileCanvas;
