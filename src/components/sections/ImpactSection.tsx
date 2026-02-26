import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DirectionalButton from "@/components/ui/DirectionalButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

interface ImpactSectionProps {
  videoSrc: string;
  label: string;
  headline: string;
  highlight: string;
  description: string;
  stats: { value: string; label: string }[];
  ctaLabel: string;
  ctaLink: string;
  theme: "brand" | "referrer" | "talent";
  reverse?: boolean;
}

const ImpactSection = ({
  videoSrc,
  label,
  headline,
  highlight,
  description,
  stats,
  ctaLabel,
  ctaLink,
  theme,
  reverse = false,
}: ImpactSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useGridNavigation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 0.4, 1], [80, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  const themeColor = {
    brand: "text-brand",
    referrer: "text-referrer",
    talent: "text-talent",
  }[theme];

  const themeBg = {
    brand: "bg-brand/10",
    referrer: "bg-referrer/10",
    talent: "bg-talent/10",
  }[theme];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-foreground overflow-hidden flex items-center"
    >
      {/* Video background */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className={`absolute inset-0 ${reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-foreground/80 via-foreground/40 to-transparent`} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className={`relative z-10 container mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reverse ? 'md:direction-rtl' : ''}`}
      >
        <div className={reverse ? 'md:col-start-2' : ''}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`inline-block text-xs uppercase tracking-[0.3em] font-semibold ${themeColor} ${themeBg} px-4 py-2 rounded-full mb-6`}
          >
            {label}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-background leading-tight"
          >
            {headline}{" "}
            <span className={themeColor}>{highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-background/60 max-w-lg"
          >
            {description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-8 mt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className={`text-3xl font-heading font-bold ${themeColor}`}>{stat.value}</div>
                <div className="text-sm text-background/40">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8"
          >
            <DirectionalButton
              theme={theme}
              size="lg"
              onClick={() => navigateWithTransition(ctaLink)}
            >
              {ctaLabel}
            </DirectionalButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactSection;
