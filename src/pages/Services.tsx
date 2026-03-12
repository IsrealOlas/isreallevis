import { Link } from "react-router-dom";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Youtube, Video, ShoppingBag, TrendingUp, Globe, Bug, Megaphone, Search,
  ArrowRight, CheckCircle2, Sparkles
} from "lucide-react";
import { useRef, useCallback } from "react";

const services = [
  {
    icon: Youtube, title: "YouTube Channel Growth & SEO",
    desc: "Grow your YouTube channel with data-driven SEO optimization, audience targeting, and content strategies that increase views, subscribers, and revenue.",
    benefits: ["Channel audit & optimization", "Video SEO & keyword research", "Audience growth strategies", "Monetization guidance"],
    color: "from-red-500/15 to-transparent",
    portfolioCategory: "YouTube",
  },
  {
    icon: Video, title: "Professional Video Editing",
    desc: "Eye-catching video editing that keeps viewers engaged from start to finish. Cuts, transitions, color grading, sound design, and thumbnails.",
    benefits: ["Engaging storytelling edits", "Color grading & effects", "Sound design & mixing", "Custom thumbnails"],
    color: "from-purple-500/15 to-transparent",
    portfolioCategory: "Video Editing",
  },
  {
    icon: ShoppingBag, title: "Shopify Store Development",
    desc: "Custom Shopify stores designed to convert. From product pages to checkout optimization, every detail is built for maximum revenue.",
    benefits: ["Custom theme development", "Conversion optimization", "Payment & shipping setup", "App integrations"],
    color: "from-green-500/15 to-transparent",
    portfolioCategory: "Shopify",
  },
  {
    icon: TrendingUp, title: "Dropshipping Store Setup",
    desc: "End-to-end dropshipping store setup with winning product research, supplier sourcing, and automated fulfillment systems.",
    benefits: ["Winning product research", "Supplier sourcing", "Store automation", "Marketing funnels"],
    color: "from-blue-500/15 to-transparent",
    portfolioCategory: "Shopify",
  },
  {
    icon: Globe, title: "WordPress Website Design",
    desc: "Beautiful, fast, and SEO-optimized WordPress websites that establish trust and drive business growth.",
    benefits: ["Custom design & branding", "Mobile-first responsive", "SEO foundation built-in", "CMS training included"],
    color: "from-sky-500/15 to-transparent",
    portfolioCategory: "WordPress",
  },
  {
    icon: Bug, title: "WordPress Bug Fixing & Speed",
    desc: "Fix broken layouts, plugin conflicts, security issues, and optimize your site speed for better user experience and rankings.",
    benefits: ["Bug diagnosis & fixes", "Speed optimization", "Security hardening", "Plugin conflict resolution"],
    color: "from-amber-500/15 to-transparent",
    portfolioCategory: "WordPress",
  },
  {
    icon: Megaphone, title: "Digital Marketing Solutions",
    desc: "Comprehensive digital marketing strategies including social media, email marketing, and paid advertising to grow your brand.",
    benefits: ["Social media strategy", "Email marketing funnels", "Paid ads management", "Brand positioning"],
    color: "from-orange-500/15 to-transparent",
    portfolioCategory: "YouTube",
  },
  {
    icon: Search, title: "Website SEO Optimization",
    desc: "Technical SEO, on-page optimization, and link building strategies to get your website ranking on the first page of Google.",
    benefits: ["Technical SEO audit", "On-page optimization", "Link building strategy", "Monthly reporting"],
    color: "from-teal-500/15 to-transparent",
    portfolioCategory: "SEO",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } }
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
    rotateX.set(y * -6);
    rotateY.set(x * 6);
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

const Services = () => {
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
            Services
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Solutions That <span className="text-shimmer">Drive Growth</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            From YouTube channels to Shopify stores and WordPress websites — I deliver end-to-end digital solutions.
          </p>
        </motion.div>
      </Section>

      <Section>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {services.map((s, i) => (
            <motion.div key={s.title} variants={itemVariants}>
              <TiltCard>
                <div className="grid md:grid-cols-[1fr_auto] gap-6 p-6 sm:p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group glow-ring relative overflow-hidden">
                  {/* Gradient bg on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1, transition: { duration: 0.4 } }}
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                      >
                        <s.icon size={22} className="text-primary" />
                      </motion.div>
                      <h3 className="font-heading font-semibold text-xl group-hover:text-primary transition-colors">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{s.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 size={14} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex md:items-end relative z-10">
                    <Link to="/contact">
                      <Button variant="hero" size="sm" className="group/btn">
                        Start This Service <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </main>
  );
};

export default Services;
