import { Link } from "react-router-dom";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";

const categories = ["All", "YouTube", "Shopify", "WordPress", "Video Editing", "SEO"];

const projects = [
  {
    title: "Tech Review Channel Growth",
    category: "YouTube",
    description: "Complete channel optimization and content strategy for a tech review creator.",
    result: "2K → 85K subscribers in 6 months",
    outcome: "Monetized within 90 days, now earning $3K+/month from ads alone.",
  },
  {
    title: "Fashion E-commerce Store",
    category: "Shopify",
    description: "Custom Shopify store with optimized product pages, upsells, and checkout flow.",
    result: "+280% conversion rate increase",
    outcome: "Store went from $5K to $22K monthly revenue after launch.",
  },
  {
    title: "Law Firm Corporate Website",
    category: "WordPress",
    description: "Professional WordPress site with local SEO, fast loading, and lead capture.",
    result: "Page 1 Google rankings in 30 days",
    outcome: "40+ qualified leads per month from organic search.",
  },
  {
    title: "Cooking Channel Rebrand",
    category: "YouTube",
    description: "Full channel rebrand including thumbnails, intros, SEO, and content planning.",
    result: "5x increase in average views",
    outcome: "Brand deals worth $2K+ per sponsored video.",
  },
  {
    title: "Fitness Dropshipping Store",
    category: "Shopify",
    description: "Turnkey dropshipping store with winning product research and ad creatives.",
    result: "$15K revenue in first month",
    outcome: "Scaled to $40K/month with Facebook and TikTok ads.",
  },
  {
    title: "Real Estate Agency Site",
    category: "WordPress",
    description: "High-performance WordPress site with property listings and IDX integration.",
    result: "3x more property inquiries",
    outcome: "Site loads in under 1.5 seconds, 95+ PageSpeed score.",
  },
  {
    title: "Product Demo Videos",
    category: "Video Editing",
    description: "Professional product demo videos for e-commerce brand social media campaigns.",
    result: "2M+ views across platforms",
    outcome: "Videos directly drove 15% increase in product sales.",
  },
  {
    title: "SaaS Company SEO Overhaul",
    category: "SEO",
    description: "Technical SEO audit, content optimization, and link building campaign.",
    result: "450% organic traffic growth",
    outcome: "Reduced cost-per-acquisition by 60% vs paid channels.",
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="pt-16">
      <Section className="hero-bg">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Portfolio</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Real Results for <span className="text-gradient">Real Businesses</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Every project is backed by strategy, execution, and measurable outcomes.
          </p>
        </div>
      </Section>

      <Section>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              layout
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{p.category}</span>
              <h3 className="font-heading font-semibold text-xl mt-2 mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.description}</p>

              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-primary" />
                <span className="text-sm font-semibold text-primary">{p.result}</span>
              </div>
              <p className="text-xs text-muted-foreground">{p.outcome}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Start Your Project <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Section>
    </main>
  );
};

export default Portfolio;
