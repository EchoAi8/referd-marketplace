import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const steps = [
  {
    number: "01",
    title: "Share opportunities",
    description:
      "Browse open roles and share them with talented people in your network who'd be a perfect fit.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=90",
  },
  {
    number: "02",
    title: "We handle the rest",
    description:
      "Our team reviews applications, coordinates interviews, and keeps you updated on progress.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=90",
  },
  {
    number: "03",
    title: "Get paid instantly",
    description:
      "When your referral gets hired, you receive your bonus directly. No delays, no hassle.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=90",
  },
];

const StickyHowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { smoothProgress } = useSmoothScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    stiffness: 80,
    damping: 30,
  });

  return (
    <section ref={containerRef} className="relative bg-foreground text-background">
      {/* Sticky Container - Takes up 300vh to allow for scroll */}
      <div className="h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="h-full flex flex-col justify-center">
            <div className="container mx-auto px-6">
              {/* Header */}
              <div className="mb-16">
                <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4">
                  How It Works
                </p>
                <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background">
                  Three simple steps
                </h2>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Left - Content */}
                <div className="relative h-[300px]">
                  {steps.map((step, index) => (
                    <StepContent
                      key={index}
                      step={step}
                      index={index}
                      progress={smoothProgress}
                      total={steps.length}
                    />
                  ))}
                </div>

                {/* Right - Image */}
                <div className="relative h-[400px] rounded-3xl overflow-hidden">
                  {steps.map((step, index) => (
                    <StepImage
                      key={index}
                      step={step}
                      index={index}
                      progress={smoothProgress}
                      total={steps.length}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-3 mt-16">
                {steps.map((_, index) => (
                  <StepIndicator
                    key={index}
                    index={index}
                    progress={smoothProgress}
                    total={steps.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepContentProps {
  step: (typeof steps)[0];
  index: number;
  progress: any;
  total: number;
}

const StepContent = ({ step, index, progress, total }: StepContentProps) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  const y = useTransform(progress, [start, start + 0.1, end - 0.1, end], [50, 0, 0, -50]);

  return (
    <motion.div style={{ opacity: index === 0 ? 1 : opacity, y }} className="absolute inset-0">
      <span className="text-xs uppercase tracking-[0.2em] text-sage mb-4 block">{step.number}</span>
      <h3 className="text-fluid-3xl md:text-fluid-4xl font-heading font-semibold text-background mb-6">
        {step.title}
      </h3>
      <p className="text-lg text-background/70 leading-relaxed max-w-md">{step.description}</p>
    </motion.div>
  );
};

interface StepImageProps {
  step: (typeof steps)[0];
  index: number;
  progress: any;
  total: number;
}

const StepImage = ({ step, index, progress, total }: StepImageProps) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const opacity = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);

  const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [1.08, 1, 1, 0.96]);

  return (
    <motion.div style={{ opacity: index === 0 ? 1 : opacity, scale }} className="absolute inset-0">
      <img
        src={step.image}
        alt={step.title}
        className="w-full h-full object-cover rounded-3xl"
      />
    </motion.div>
  );
};

interface StepIndicatorProps {
  index: number;
  progress: any;
  total: number;
}

const StepIndicator = ({ index, progress, total }: StepIndicatorProps) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const scaleX = useTransform(progress, [start, end], [0, 1]);

  return (
    <div className="relative w-16 h-1 bg-background/20 rounded-full overflow-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="absolute inset-0 bg-sage rounded-full"
      />
    </div>
  );
};

export default StickyHowItWorks;
