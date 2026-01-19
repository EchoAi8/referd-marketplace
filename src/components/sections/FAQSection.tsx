import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the referral bonus work?",
    answer: "When you refer a candidate who gets hired, you receive 35% of the placement fee. The candidate also receives 35%, and the platform takes 30%. Payments are processed within 30 days of the candidate's start date."
  },
  {
    question: "What types of roles can I refer candidates for?",
    answer: "We support referrals across all industries and job levels—from entry-level positions to executive roles. Tech, finance, healthcare, and creative industries are our most active sectors, but we're growing every day."
  },
  {
    question: "How do I track my referrals?",
    answer: "Your personalized dashboard shows real-time status updates for all your referrals. You'll see when they apply, interview, and get hired—plus your expected payout at each stage."
  },
  {
    question: "Is there a limit to how many people I can refer?",
    answer: "No limits! Refer as many qualified candidates as you'd like. Many of our top earners treat this as a side income stream by actively matching their network to open roles."
  },
  {
    question: "When and how do I get paid?",
    answer: "Payments are made via bank transfer or PayPal within 30 days of the candidate's confirmed start date. You'll receive an email notification when your payment is processed."
  },
  {
    question: "What happens if the candidate doesn't work out?",
    answer: "If a placed candidate leaves within the first 90 days, the referral bonus is prorated. We believe in fair outcomes for everyone involved in the hiring process."
  },
];

const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick, 
  index 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "border-b border-border/50 group cursor-pointer",
        isOpen && "bg-muted/30"
      )}
      onClick={onClick}
    >
      <div className="py-6 px-6 flex items-center justify-between gap-4">
        <motion.h3 
          className={cn(
            "text-lg md:text-xl font-heading font-medium transition-colors duration-300",
            isOpen ? "text-sage-dark" : "text-foreground group-hover:text-sage"
          )}
        >
          {question}
        </motion.h3>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
            isOpen ? "bg-sage text-foreground" : "bg-muted group-hover:bg-sage/20"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            FAQ
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground mb-6">
            Common Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about earning through referrals
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-border/50 rounded-2xl overflow-hidden bg-card"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
