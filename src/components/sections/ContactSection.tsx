import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section ref={ref} className="py-32 md:py-48 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-8">
              Get Started
            </p>
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-semibold leading-[1.1] text-background mb-8">
              Ready to turn your network into income?
            </h2>
            <p className="text-lg text-background/70 mb-12 max-w-lg">
              Join thousands of people already earning through referrals. 
              It only takes a minute to get started.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-background/10 border border-background/20 rounded-full text-background placeholder:text-background/40 focus:outline-none focus:border-sage transition-colors"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Get Started
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-background/40 mb-2">Email</p>
                <a href="mailto:hello@referd.com" className="text-lg text-background hover:text-sage transition-colors">
                  hello@referd.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-background/40 mb-2">Location</p>
                <p className="text-lg text-background">
                  London, United Kingdom
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 lg:mt-0">
              <p className="text-xs uppercase tracking-[0.2em] text-background/40 mb-4">Follow Us</p>
              <div className="flex gap-6">
                {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-background/60 hover:text-sage transition-colors text-sm"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Large CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 pt-16 border-t border-background/10"
        >
          <h3 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold text-background/10 leading-none">
            Let's work
            <br />
            together.
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
