import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Youtube, ShoppingBag, Globe, TrendingUp, Video, Search,
  ArrowRight, CheckCircle2, Sparkles, Zap
} from "lucide-react";
import isrealPortrait from "@/assets/isreal-portrait.png";
import RecentWorkProof from "@/components/RecentWorkProof";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewSubmissionForm from "@/components/ReviewSubmissionForm";
import { useRef } from "react";

const services = [
  { icon: Youtube, title: "YouTube Growth & SEO", desc: "Channel optimization, audience growth, and video SEO strategies." },
  { icon: Video, title: "Video Editing", desc: "Professional editing that keeps viewers watching and subscribing." },
  { icon: ShoppingBag, title: "Shopify Development", desc: "Custom stores built to convert visitors into paying customers." },
  { icon: TrendingUp, title: "Dropshipping Setup", desc: "End-to-end dropshipping store setup with winning products." },
  { icon: Globe, title: "WordPress Design", desc: "Beautiful, fast WordPress sites with SEO built in." },
  { icon: Search, title: "Digital Marketing", desc: "Data-driven strategies to grow your online presence." },
];

const projects = [
  { title: "Fashion Store Redesign", category: "Shopify", result: "+280% conversion rate" },
  { title: "Tech Review Channel", category: "YouTube Growth", result: "2K → 85K subs in 6 months" },
  { title: "Law Firm Website", category: "WordPress", result: "Page 1 rankings in 30 days" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="hero-bg min-h-screen flex items-center pt-16 relative">
        {/* Decorative floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl"
            style={{ top: "10%", right: "15%" }}
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl"
            style={{ bottom: "10%", left: "10%" }}
            animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4 tracking-wider uppercase bg-primary/10 px-3 py-1.5 rounded-full"
              >
                <Sparkles size={14} />
                Digital Growth Expert
              </motion.span>
              <motion.h1
                variants={itemVariants}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Helping Businesses Scale with{" "}
                <span className="text-gradient">YouTube Growth</span>, Shopify Development &amp; High-Converting Websites.
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground mb-8 max-w-xl"
              >
                I help entrepreneurs and businesses build powerful online presences that drive real revenue through proven digital strategies.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="group animate-glow-pulse">
                    Hire Me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="heroOutline" size="lg" className="group">
                    View My Work <ArrowRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-8 mt-14 text-sm text-muted-foreground"
              >
                {["150+ Projects Delivered", "50+ Happy Clients", "5+ Years Experience"].map((stat) => (
                  <motion.div key={stat} variants={itemVariants} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>{stat}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative floating">
                <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-3xl animate-glow-pulse" />
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                <img
                  src={isrealPortrait}
                  alt="Isreal Levis - Digital Growth Expert"
                  className="relative rounded-2xl w-full max-w-md object-cover shadow-2xl border-2 border-primary/20"
                />
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-4 top-8 bg-card border border-border rounded-xl px-4 py-2.5 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-primary" />
                    <span className="text-xs font-semibold">YouTube & Website Expert</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <Section>
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full"
          >
            What I Do
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-4">Services That Drive Results</h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group glow-ring shimmer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <s.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link to="/services">
            <Button variant="heroOutline" className="group">
              View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Portfolio Preview */}
      <Section className="bg-card">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full"
          >
            Recent Work
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-4">Real Results for Real Businesses</h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
              className="rounded-xl border border-border bg-background p-6 hover:border-primary/30 transition-all glow-ring group"
            >
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{p.category}</span>
              <h3 className="font-heading font-semibold text-lg mt-2 mb-3">{p.title}</h3>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={14} className="text-primary group-hover:scale-125 transition-transform" />
                <span className="font-medium text-primary">{p.result}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link to="/portfolio">
            <Button variant="heroOutline" className="group">
              See Full Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Recent Work Proof */}
      <RecentWorkProof />

      <TestimonialsSection />

      {/* Review Submission */}
      <ReviewSubmissionForm />

      {/* CTA */}
      <Section className="hero-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto relative"
        >
          <motion.div
            className="absolute -inset-12 rounded-3xl bg-primary/5 blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-muted-foreground mb-8">
              Let's work together to build something amazing. Get in touch today.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group animate-glow-pulse">
                  Start a Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
};

export default Index;
