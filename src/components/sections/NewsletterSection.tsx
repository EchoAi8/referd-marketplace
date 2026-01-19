import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { z } from "zod";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section ref={ref} className="py-32 md:py-48 bg-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage/20 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-sage" />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-medium">
              Stay Updated
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background mb-6"
          >
            Join the Referd
            <br />
            <span className="text-sage">Inner Circle</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-background/60 mb-12 max-w-2xl mx-auto"
          >
            Get exclusive insights on referral strategies, industry trends, and tips to maximize your earnings. Plus early access to new features.
          </motion.p>

          {/* Form / Success State */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-xl mx-auto"
              >
                <div
                  className={`relative flex flex-col sm:flex-row gap-4 p-2 rounded-2xl transition-all duration-500 ${
                    isFocused
                      ? "bg-background/10 shadow-[0_0_60px_-12px_rgba(197,234,134,0.4)]"
                      : "bg-background/5"
                  }`}
                >
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={false}
                    animate={{
                      boxShadow: isFocused
                        ? "inset 0 0 0 2px rgba(197,234,134,0.5)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Input */}
                  <div className="relative flex-1">
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 bg-transparent text-background placeholder:text-background/40 focus:outline-none text-lg"
                      whileFocus={{ scale: 1.01 }}
                    />
                    
                    {/* Floating label effect */}
                    <motion.div
                      className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none"
                      initial={false}
                      animate={{
                        y: isFocused || email ? -28 : 0,
                        scale: isFocused || email ? 0.75 : 1,
                        opacity: isFocused || email ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-sage text-sm">Email address</span>
                    </motion.div>
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex items-center justify-center gap-2 min-w-[160px] disabled:opacity-70"
                    strength={0.3}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Joining...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span>Subscribe</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </MagneticButton>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-rose text-sm mt-3 text-left pl-6"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Privacy Note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-xs text-background/40 mt-4"
                >
                  We respect your privacy. Unsubscribe at any time.
                </motion.p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="relative mb-6"
                >
                  <motion.div
                    className="absolute inset-0 bg-sage/30 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative w-20 h-20 bg-sage rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-foreground" />
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl md:text-3xl font-heading font-bold text-background mb-3"
                >
                  You're in! 🎉
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-background/60 text-lg"
                >
                  Check your inbox for a welcome surprise.
                </motion.p>

                {/* Confetti-like particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ["#C5EA86", "#FFCE00", "#FFACD1"][i % 3],
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                    }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
