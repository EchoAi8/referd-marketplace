import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section ref={ref} className="py-32 md:py-48 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-8">
              Let's work together
            </h2>
            <p className="text-xl text-background/70 mb-12 max-w-md">
              Ready to transform your hiring? Get in touch and let's discuss how Referd can work for you.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-background/60 mb-2">Email</p>
                <a href="mailto:hello@referd.com" className="text-xl hover:text-primary transition-colors">
                  hello@referd.com
                </a>
              </div>
              <div>
                <p className="text-sm text-background/60 mb-2">Follow Us</p>
                <div className="flex gap-4">
                  <a href="#" className="text-background/70 hover:text-background transition-colors">Twitter</a>
                  <a href="#" className="text-background/70 hover:text-background transition-colors">LinkedIn</a>
                  <a href="#" className="text-background/70 hover:text-background transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-sm text-background/60 mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/40 focus:border-background focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-background/60 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/40 focus:border-background focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="text-sm text-background/60 mb-2 block">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/40 focus:border-background focus:outline-none transition-colors"
                placeholder="Your company"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-background/60 mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/40 focus:border-background focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your needs"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center gap-3 px-8 py-4 bg-background text-foreground rounded-full text-lg font-medium hover:bg-background/90 transition-colors"
            >
              Send Message
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
