import { BadgeCheck, Sparkles } from "lucide-react";

interface ShowcaseTalentCardProps {
  name: string;
  role: string;
  company: string;
  location?: string;
  image: string;
  verified?: boolean;
  topReferrer?: boolean;
  skills?: string[];
  connections?: number;
  endorsements?: number;
  responseTime?: string;
}

/**
 * A compact talent card for the 3D rotating carousel on the Showcase page.
 * Features Referd Green glow and minimal overlay to keep faces visible.
 */
const ShowcaseTalentCard = ({
  name,
  role,
  company,
  image,
  verified = false,
  topReferrer = false,
  skills = [],
}: ShowcaseTalentCardProps) => {
  return (
    <div 
      className="showcase-card relative rounded-2xl overflow-hidden bg-black"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Referd Green Glow Effect */}
      <div 
        className="absolute -inset-1 rounded-2xl opacity-60 blur-xl animate-pulse pointer-events-none"
        style={{ 
          background: 'linear-gradient(135deg, hsl(150 60% 70% / 0.4), hsl(150 60% 50% / 0.2))',
          zIndex: 0
        }}
      />
      
      {/* Card Container with border */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-talent/30 bg-black">
        {/* Top Referrer Badge */}
        {topReferrer && (
          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 rounded-full shadow-lg">
            <Sparkles className="w-3 h-3 text-black" />
            <span className="text-[10px] font-bold text-black tracking-wide uppercase">Top Referrer</span>
          </div>
        )}

        {/* Full-bleed Profile Photo with darker overlay */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
          {/* Darker overlay for black/white aesthetic */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Bottom gradient for text */}
          <div 
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent" 
          />
        </div>

        {/* Minimal Content Overlay - Bottom only */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          {/* Name & Verification */}
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-heading font-bold text-base text-white truncate">
              {name}
            </h3>
            {verified && (
              <BadgeCheck className="w-4 h-4 text-talent flex-shrink-0" />
            )}
          </div>

          {/* Role & Company */}
          <p className="text-xs text-white/80 truncate">{role}</p>
          <p className="text-[11px] text-white/60 truncate">{company}</p>

          {/* Skills - just 2 */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {skills.slice(0, 2).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[9px] font-semibold bg-talent/20 border border-talent/40 text-talent-light rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Subtle inner border with green tint */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-talent/10 pointer-events-none" />
      </div>
    </div>
  );
};

export default ShowcaseTalentCard;
