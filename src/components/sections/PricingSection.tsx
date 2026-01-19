import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started with referrals",
    features: [
      "Unlimited referrals",
      "Basic tracking dashboard",
      "Email notifications",
      "Standard support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "£49",
    period: "/month",
    description: "For serious referrers building income",
    features: [
      "Everything in Starter",
      "Priority candidate placement",
      "Advanced analytics",
      "Dedicated account manager",
      "Early access to new roles",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and recruiting professionals",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom integrations",
      "White-label options",
      "SLA & premium support",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Pricing
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Referrals are always free. Upgrade for premium features and priority placement.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-8 rounded-3xl ${
                plan.featured
                  ? "bg-foreground text-background"
                  : "bg-gray-50"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-sage text-foreground text-xs uppercase tracking-[0.1em] font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-heading font-semibold mb-2 ${
                  plan.featured ? "text-background" : "text-foreground"
                }`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-fluid-4xl font-heading font-bold ${
                    plan.featured ? "text-background" : "text-foreground"
                  }`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.featured ? "text-background/60" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`mt-3 ${
                  plan.featured ? "text-background/70" : "text-muted-foreground"
                }`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.featured ? "text-sage" : "text-sage"
                    }`} />
                    <span className={plan.featured ? "text-background/80" : "text-foreground/80"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-full font-semibold transition-colors ${
                  plan.featured
                    ? "bg-sage text-foreground hover:bg-sage-light"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
