import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import { motion } from "framer-motion";
import {
  Youtube, ShoppingBag, Globe, TrendingUp, Video, Search,
  ArrowRight, Star, CheckCircle2
} from "lucide-react";
import isrealPortrait from "@/assets/isreal-portrait.png";

const services = [
  { icon: Youtube, title: "YouTube Growth & SEO", desc: "Channel optimization, audience growth, and video SEO strategies." },
  { icon: Video, title: "Video Editing", desc: "Professional editing that keeps viewers watching and subscribing." },
  { icon: ShoppingBag, title: "Shopify Development", desc: "Custom stores built to convert visitors into paying customers." },
  { icon: TrendingUp, title: "Dropshipping Setup", desc: "End-to-end dropshipping store setup with winning products." },
  { icon: Globe, title: "WordPress Design", desc: "Beautiful, fast WordPress sites with SEO built in." },
  { icon: Search, title: "Digital Marketing", desc: "Data-driven strategies to grow your online presence." },
];

const testimonials = [
  { name: "Sarah M.", role: "E-commerce Owner", text: "Isreal transformed our Shopify store. Revenue increased 340% in 3 months.", rating: 5 },
  { name: "David K.", role: "YouTube Creator", text: "My channel went from 2K to 50K subscribers with Isreal's growth strategies.", rating: 5 },
  { name: "Lisa T.", role: "Business Owner", text: "Our WordPress site now loads in under 2 seconds and ranks on page 1.", rating: 5 },
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
          <div className="max-w-3xl">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-8 mt-14 text-sm text-muted-foreground"
            >
              {["150+ Projects Delivered", "50+ Happy Clients", "5+ Years Experience"].map((stat) => (
                <div key={stat} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>{stat}</span>
                </div>
              ))}
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

      {/* Testimonials */}
      <Section>
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">What Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

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
