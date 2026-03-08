import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import { motion } from "framer-motion";
import {
  Youtube, ShoppingBag, Globe, TrendingUp, Video, Search,
  ArrowRight, CheckCircle2
} from "lucide-react";
import isrealPortrait from "@/assets/isreal-portrait.png";
import RecentWorkProof from "@/components/RecentWorkProof";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewSubmissionForm from "@/components/ReviewSubmissionForm";

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

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="hero-bg min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase">
                Digital Growth Expert
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Helping Businesses Scale with{" "}
                <span className="text-gradient">YouTube Growth</span>, Shopify Development &amp; High-Converting Websites.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                I help entrepreneurs and businesses build powerful online presences that drive real revenue through proven digital strategies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Hire Me <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="heroOutline" size="lg">
                    View My Work
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 mt-14 text-sm text-muted-foreground">
                {["150+ Projects Delivered", "50+ Happy Clients", "5+ Years Experience"].map((stat) => (
                  <div key={stat} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
                <img
                  src={isrealPortrait}
                  alt="Isreal Levis - Digital Growth Expert"
                  className="relative rounded-2xl w-full max-w-md object-cover shadow-2xl border-2 border-border"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section>
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">What I Do</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">Services That Drive Results</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services">
            <Button variant="heroOutline">
              View All Services <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Portfolio Preview */}
      <Section className="bg-card">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Recent Work</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">Real Results for Real Businesses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-background p-6 hover:border-primary/30 transition-all"
            >
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{p.category}</span>
              <h3 className="font-heading font-semibold text-lg mt-2 mb-3">{p.title}</h3>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={14} className="text-primary" />
                <span className="font-medium text-primary">{p.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/portfolio">
            <Button variant="heroOutline">
              See Full Portfolio <ArrowRight size={16} />
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
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-muted-foreground mb-8">
            Let's work together to build something amazing. Get in touch today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Start a Project <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Index;
