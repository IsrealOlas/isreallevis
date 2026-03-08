import { Link } from "react-router-dom";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Youtube, Video, ShoppingBag, TrendingUp, Globe, Bug, Megaphone, Search, ArrowRight, CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Youtube,
    title: "YouTube Channel Growth & SEO",
    desc: "Grow your YouTube channel with data-driven SEO optimization, audience targeting, and content strategies that increase views, subscribers, and revenue.",
    benefits: ["Channel audit & optimization", "Video SEO & keyword research", "Audience growth strategies", "Monetization guidance"],
  },
  {
    icon: Video,
    title: "Professional Video Editing",
    desc: "Eye-catching video editing that keeps viewers engaged from start to finish. Cuts, transitions, color grading, sound design, and thumbnails.",
    benefits: ["Engaging storytelling edits", "Color grading & effects", "Sound design & mixing", "Custom thumbnails"],
  },
  {
    icon: ShoppingBag,
    title: "Shopify Store Development",
    desc: "Custom Shopify stores designed to convert. From product pages to checkout optimization, every detail is built for maximum revenue.",
    benefits: ["Custom theme development", "Conversion optimization", "Payment & shipping setup", "App integrations"],
  },
  {
    icon: TrendingUp,
    title: "Dropshipping Store Setup",
    desc: "End-to-end dropshipping store setup with winning product research, supplier sourcing, and automated fulfillment systems.",
    benefits: ["Winning product research", "Supplier sourcing", "Store automation", "Marketing funnels"],
  },
  {
    icon: Globe,
    title: "WordPress Website Design",
    desc: "Beautiful, fast, and SEO-optimized WordPress websites that establish trust and drive business growth.",
    benefits: ["Custom design & branding", "Mobile-first responsive", "SEO foundation built-in", "CMS training included"],
  },
  {
    icon: Bug,
    title: "WordPress Bug Fixing & Speed",
    desc: "Fix broken layouts, plugin conflicts, security issues, and optimize your site speed for better user experience and rankings.",
    benefits: ["Bug diagnosis & fixes", "Speed optimization", "Security hardening", "Plugin conflict resolution"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Solutions",
    desc: "Comprehensive digital marketing strategies including social media, email marketing, and paid advertising to grow your brand.",
    benefits: ["Social media strategy", "Email marketing funnels", "Paid ads management", "Brand positioning"],
  },
  {
    icon: Search,
    title: "Website SEO Optimization",
    desc: "Technical SEO, on-page optimization, and link building strategies to get your website ranking on the first page of Google.",
    benefits: ["Technical SEO audit", "On-page optimization", "Link building strategy", "Monthly reporting"],
  },
];

const Services = () => {
  return (
    <main className="pt-16">
      <Section className="hero-bg">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Services</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Solutions That <span className="text-gradient">Drive Growth</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            From YouTube channels to Shopify stores and WordPress websites — I deliver end-to-end digital solutions.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid md:grid-cols-[1fr_auto] gap-6 p-6 sm:p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">{s.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex md:items-end">
                <Link to="/contact">
                  <Button variant="hero" size="sm">
                    Start This Service <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Services;
