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
 * Minimal overlay to keep faces visible.
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
      className="relative w-full h-full rounded-xl overflow-hidden bg-black"
      style={{
        boxShadow: '0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.15), 0 0 100px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.2)'
      }}
    >
      {/* Top Referrer Badge */}
      {topReferrer && (
        <div className="absolute top-2 left-2 z-30 flex items-center gap-1 px-2 py-0.5 bg-white/90 rounded-full shadow-md">
          <Sparkles className="w-2.5 h-2.5 text-black" />
          <span className="text-[8px] font-bold text-black tracking-wide">Top Referrer</span>
        </div>
      )}

      {/* Full-bleed Profile Photo with dark overlay */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
        {/* Dark overlay for black/white aesthetic */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Bottom gradient for text */}
        <div 
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/80 to-transparent" 
        />
      </div>

      {/* Minimal Content Overlay - Bottom only */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        {/* Name & Verification */}
        <div className="flex items-center gap-1 mb-0.5">
          <h3 className="font-heading font-bold text-sm text-white truncate">
            {name}
          </h3>
          {verified && (
            <BadgeCheck className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
          )}
        </div>

        {/* Role & Company */}
        <p className="text-[10px] text-white/70 truncate">{role}</p>
        <p className="text-[9px] text-white/50 truncate">{company}</p>

        {/* Skills - just 2 */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {skills.slice(0, 2).map((skill, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 text-[7px] font-semibold bg-white/10 border border-white/20 text-white/80 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Subtle inner border glow */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
};

export default ShowcaseTalentCard;
