import { motion } from "framer-motion";

/**
 * A branding card that displays "Referd - The People Powered Recruitment Marketplace"
 * within the 3D rotating carousel.
 */
const ReferdBrandingCard = () => {
  return (
    <div className="showcase-card relative rounded-2xl overflow-hidden bg-black" style={{ width: '100%', height: '100%' }}>
      {/* Referd Green Glow Effect - More intense for branding */}
      <div 
        className="absolute -inset-2 rounded-2xl opacity-80 blur-2xl animate-pulse pointer-events-none"
        style={{ 
          background: 'linear-gradient(135deg, hsl(150 60% 70% / 0.5), hsl(150 60% 45% / 0.3))',
          zIndex: 0
        }}
      />
      
      {/* Card Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-talent/50 bg-black flex flex-col items-center justify-center p-6">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(150 60% 70% / 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, hsl(150 60% 70% / 0.2) 0%, transparent 50%)`
          }} />
        </div>
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-4"
        >
          <span className="font-heading font-black text-3xl md:text-4xl text-white tracking-tight">
            Referd<span className="text-talent">®</span>
          </span>
        </motion.div>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 text-center text-sm md:text-base text-white/90 font-medium leading-relaxed"
        >
          The People Powered
          <br />
          <span className="text-talent font-semibold">Recruitment Marketplace</span>
        </motion.p>
        
        {/* Decorative line */}
        <div className="relative z-10 w-16 h-0.5 bg-gradient-to-r from-transparent via-talent to-transparent mt-6 opacity-60" />
        
        {/* Inner glow ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-talent/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default ReferdBrandingCard;
