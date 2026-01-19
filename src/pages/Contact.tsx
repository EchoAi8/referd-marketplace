import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import MagneticButton from "@/components/animations/MagneticButton";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <>
      <GridOverlay />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <main className="pt-32 pb-24">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Left - Info */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    Get in Touch
                  </p>
                  <h1 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground mb-6">
                    Let's work together
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
                    Have a project in mind? We'd love to hear from you. Send us a message and we'll
                    respond as soon as possible.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        Email
                      </p>
                      <a
                        href="mailto:hello@referd.io"
                        className="text-foreground font-heading font-medium hover:text-sage transition-colors"
                      >
                        hello@referd.io
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        Location
                      </p>
                      <p className="text-foreground font-heading font-medium">London, UK</p>
                    </div>
                  </div>
                </motion.div>

                {/* Right - Form */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b-2 ${
                          errors.name ? "border-destructive" : "border-border"
                        } py-4 text-foreground font-heading text-lg focus:outline-none focus:border-sage transition-colors`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b-2 ${
                          errors.email ? "border-destructive" : "border-border"
                        } py-4 text-foreground font-heading text-lg focus:outline-none focus:border-sage transition-colors`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full bg-transparent border-b-2 ${
                          errors.message ? "border-destructive" : "border-border"
                        } py-4 text-foreground font-heading text-lg focus:outline-none focus:border-sage transition-colors resize-none`}
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-6">
                      <MagneticButton
                        className="btn-primary w-full md:w-auto"
                        strength={0.3}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </MagneticButton>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </main>
          <SiteFooter />
        </div>
      </PageTransition>
    </>
  );
};

export default Contact;
