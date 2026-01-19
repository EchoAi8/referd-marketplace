import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "The Future of Talent Referrals",
    excerpt: "How peer-to-peer recruiting is changing the hiring landscape",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Building Your Network Into Revenue",
    excerpt: "Practical strategies for maximizing your referral earnings",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Why Companies Are Embracing Referral Hiring",
    excerpt: "The data behind the most effective hiring channel",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop",
  },
];

const ArticlesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Insights
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-foreground">
              Latest Articles
            </h2>
          </div>
          <button className="hidden md:block px-6 py-3 border border-border rounded-full text-sm hover:bg-background transition-colors">
            View All Articles
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-heading font-medium text-foreground group-hover:text-primary transition-colors flex items-start gap-2">
                  {article.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-muted-foreground">
                  {article.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="md:hidden mt-12 text-center">
          <button className="px-6 py-3 border border-border rounded-full text-sm hover:bg-background transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
