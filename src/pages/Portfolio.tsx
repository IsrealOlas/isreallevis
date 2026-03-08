import { Link } from "react-router-dom";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { TrendingUp, ArrowRight, Sparkles, Youtube, ShoppingBag, Globe, Video, Search } from "lucide-react";
import { useState, useRef, useCallback } from "react";

const categories = ["All", "YouTube", "Shopify", "WordPress", "Video Editing", "SEO"];

const categoryIcons: Record<string, typeof Youtube> = {
  YouTube: Youtube,
  Shopify: ShoppingBag,
  WordPress: Globe,
  "Video Editing": Video,
  SEO: Search,
};

const projects = [
  {
    title: "Tech Review Channel Growth", category: "YouTube",
    description: "Complete channel optimization and content strategy for a tech review creator.",
    result: "2K → 85K subscribers in 6 months",
    outcome: "Monetized within 90 days, now earning $3K+/month from ads alone.",
  },
  {
    title: "Fashion E-commerce Store", category: "Shopify",
    description: "Custom Shopify store with optimized product pages, upsells, and checkout flow.",
    result: "+280% conversion rate increase",
    outcome: "Store went from $5K to $22K monthly revenue after launch.",
  },
  {
    title: "Law Firm Corporate Website", category: "WordPress",
    description: "Professional WordPress site with local SEO, fast loading, and lead capture.",
    result: "Page 1 Google rankings in 30 days",
    outcome: "40+ qualified leads per month from organic search.",
  },
  {
    title: "Cooking Channel Rebrand", category: "YouTube",
    description: "Full channel rebrand including thumbnails, intros, SEO, and content planning.",
    result: "5x increase in average views",
    outcome: "Brand deals worth $2K+ per sponsored video.",
  },
  {
    title: "Fitness Dropshipping Store", category: "Shopify",
    description: "Turnkey dropshipping store with winning product research and ad creatives.",
    result: "$15K revenue in first month",
    outcome: "Scaled to $40K/month with Facebook and TikTok ads.",
  },
  {
    title: "Real Estate Agency Site", category: "WordPress",
    description: "High-performance WordPress site with property listings and IDX integration.",
    result: "3x more property inquiries",
    outcome: "Site loads in under 1.5 seconds, 95+ PageSpeed score.",
  },
  {
    title: "Product Demo Videos", category: "Video Editing",
    description: "Professional product demo videos for e-commerce brand social media campaigns.",
    result: "2M+ views across platforms",
    outcome: "Videos directly drove 15% increase in product sales.",
  },
  {
    title: "SaaS Company SEO Overhaul", category: "SEO",
    description: "Technical SEO audit, content optimization, and link building campaign.",
    result: "450% organic traffic growth",
    outcome: "Reduced cost-per-acquisition by 60% vs paid channels.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 1024) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -8);
    rotateY.set(x * 8);
  }, [rotateX, rotateY]);

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="pt-16">
      <Section className="hero-bg noise-overlay">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <Sparkles size={14} className="animate-pulse" />
            Portfolio
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Real Results for <span className="text-shimmer">Real Businesses</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Every project is backed by strategy, execution, and measurable outcomes.
          </p>
        </motion.div>
      </Section>

      <Section>
        {/* Animated Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10 justify-center"
        >
          {categories.map((c) => (
            <motion.button
              key={c}
              onClick={() => setFilter(c)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === c
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const Icon = categoryIcons[p.category];
              return (
                <motion.div
                  key={p.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <TiltCard className="h-full">
                    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group glow-ring relative overflow-hidden h-full">
                      {/* Corner glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full">
                            {p.category}
                          </span>
                          {Icon && (
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                              <Icon size={16} className="text-primary" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-xl mt-2 mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{p.description}</p>

                        <div className="flex items-center gap-2 mb-2 p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                          <TrendingUp size={16} className="text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-semibold text-primary">{p.result}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{p.outcome}</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/contact">
            <Button variant="hero" size="lg" className="group animate-glow-pulse">
              Start Your Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </Section>
    </main>
  );
};

export default Portfolio;
