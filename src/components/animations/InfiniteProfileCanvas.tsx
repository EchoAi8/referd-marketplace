import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface OrbitProfile {
  id: number;
  name: string;
  role: string;
  image: string;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  baseScale: number;
  depthLayer: number;
}

const profileImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
];

const names = [
  "Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "David Kim",
  "Priya Patel", "James Wilson", "Aisha Mohammed", "Ryan O'Connor",
  "Sofia Garcia", "Michael Chang", "Emma Thompson", "Carlos Mendez",
  "Nina Kowalski", "Alex Turner", "Mei Lin", "Jordan Blake"
];

const roles = [
  "Product Designer", "Software Engineer", "Marketing Lead", "Data Scientist",
  "UX Researcher", "Backend Developer", "Growth Manager", "DevOps Engineer",
  "Frontend Developer", "Product Manager", "Design Lead", "Full Stack Dev",
  "Brand Strategist", "Tech Lead", "Creative Director", "Solutions Architect"
];

const InfiniteProfileCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [profiles, setProfiles] = useState<OrbitProfile[]>([]);
  const anglesRef = useRef<number[]>([]);
  const animationRef = useRef<number>();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize profiles in orbital layers
  useEffect(() => {
    const orbitLayers = [
      { radius: 100, count: 4, speed: 0.001, baseScale: 0.6, depthLayer: 0.2 },
      { radius: 180, count: 5, speed: 0.0007, baseScale: 0.8, depthLayer: 0.5 },
      { radius: 280, count: 7, speed: 0.0004, baseScale: 1, depthLayer: 0.9 },
    ];

    const initialProfiles: OrbitProfile[] = [];
    let profileIndex = 0;

    orbitLayers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        initialProfiles.push({
          id: profileIndex,
          name: names[profileIndex % names.length],
          role: roles[profileIndex % roles.length],
          image: profileImages[profileIndex % profileImages.length],
          angle,
          orbitRadius: layer.radius + (Math.random() - 0.5) * 30,
          orbitSpeed: layer.speed * (0.9 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1),
          baseScale: layer.baseScale,
          depthLayer: layer.depthLayer,
        });
        profileIndex++;
      }
    });

    setProfiles(initialProfiles);
    anglesRef.current = initialProfiles.map((p) => p.angle);
  }, []);

  // Animation loop
  useEffect(() => {
    if (profiles.length === 0) return;

    const animate = () => {
      // Update angles for continuous rotation
      anglesRef.current = anglesRef.current.map((angle, i) => {
        return angle + profiles[i].orbitSpeed;
      });

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

      setMouseOffset({
        x: mouseRef.current.x * 40,
        y: mouseRef.current.y * 25,
      });

      // Trigger re-render with updated angles
      setProfiles((prev) =>
        prev.map((profile, i) => ({
          ...profile,
          angle: anglesRef.current[i],
        }))
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [profiles.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    }
  };

  const handleMouseLeave = () => {
    targetMouseRef.current = { x: 0, y: 0 };
  };

  // Calculate visual properties based on orbit position
  const getProfileStyle = (profile: OrbitProfile) => {
    // Elliptical orbit (compressed Y for 3D perspective)
    const x = Math.cos(profile.angle) * profile.orbitRadius;
    const y = Math.sin(profile.angle) * profile.orbitRadius * 0.4;

    // Depth based on Y position in orbit (front = bottom, back = top)
    const depthFactor = (Math.sin(profile.angle) + 1) / 2; // 0 (back) to 1 (front)
    
    // Scale: smaller in back, larger in front
    const scale = profile.baseScale * (0.5 + depthFactor * 0.5);
    
    // Opacity: dimmer in back, brighter in front
    const opacity = 0.2 + depthFactor * 0.8;
    
    // Blur: blurry in back, sharp in front
    const blur = (1 - depthFactor) * 6;
    
    // Z-index for proper layering
    const zIndex = Math.floor(depthFactor * 100);

    return {
      x: x + mouseOffset.x * profile.depthLayer,
      y: y + mouseOffset.y * profile.depthLayer,
      scale,
      opacity,
      blur,
      zIndex,
    };
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl" />

      {/* Orbiting profiles container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {profiles
          .slice()
          .sort((a, b) => {
            const styleA = getProfileStyle(a);
            const styleB = getProfileStyle(b);
            return styleA.zIndex - styleB.zIndex;
          })
          .map((profile) => {
            const style = getProfileStyle(profile);

            return (
              <motion.div
                key={profile.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  filter: `blur(${style.blur}px)`,
                  zIndex: style.zIndex,
                }}
              >
                <div className="group relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/40 blur-xl transition-all duration-500 scale-150 group-hover:scale-[2.5]" />

                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-background/30 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-primary/60 group-hover:shadow-primary/30 group-hover:shadow-2xl">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
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

      {/* Edge fade gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
};

export default InfiniteProfileCanvas;
