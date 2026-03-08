import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "How to Grow Your YouTube Channel from 0 to 10K Subscribers",
    excerpt: "Proven strategies to build a loyal YouTube audience from scratch using SEO, content planning, and community engagement.",
    date: "2026-03-01",
    category: "YouTube Growth",
  },
  {
    title: "5 Shopify Store Mistakes That Kill Your Conversion Rate",
    excerpt: "Common Shopify store design and UX mistakes that drive customers away — and how to fix them fast.",
    date: "2026-02-20",
    category: "Shopify",
  },
  {
    title: "WordPress Speed Optimization: A Complete Guide",
    excerpt: "Step-by-step guide to making your WordPress site load in under 2 seconds for better rankings and user experience.",
    date: "2026-02-10",
    category: "WordPress",
  },
  {
    title: "The Ultimate Dropshipping Product Research Strategy",
    excerpt: "How to find winning products using data-driven research methods that reduce risk and maximize profit potential.",
    date: "2026-01-28",
    category: "Dropshipping",
  },
];

const Blog = () => {
  return (
    <main className="pt-16">
      <Section className="hero-bg">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Blog</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Digital Marketing <span className="text-gradient">Tips & Insights</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Actionable strategies to grow your business online.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group cursor-pointer"
            >
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{post.category}</span>
              <h2 className="font-heading font-semibold text-xl mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={12} />
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Blog;
