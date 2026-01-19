import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const articles = [
  {
    id: 1,
    title: "The Future of Referral-Based Hiring",
    excerpt: "How trusted networks are reshaping the recruitment landscape and why companies are shifting away from traditional methods.",
    category: "Industry Insights",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Maximizing Your Referral Earnings",
    excerpt: "A comprehensive guide to building and leveraging your professional network for consistent referral income.",
    category: "Guides",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Building Trust in Remote Hiring",
    excerpt: "Why referrals matter more than ever in a world where first impressions happen through screens.",
    category: "Remote Work",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
  },
];

const ArticlesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Insights
            </p>
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-semibold text-foreground">
              Latest Articles
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="self-start md:self-auto btn-ghost text-base py-3"
          >
            View All Articles →
          </motion.button>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-[0.15em] text-sage-dark font-medium">
                  {article.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>

              <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-sage transition-colors duration-300">
                {article.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
