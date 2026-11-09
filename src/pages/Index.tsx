import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Youtube, ShoppingBag, Globe, TrendingUp, Video, Search,
  ArrowRight, CheckCircle2, Sparkles, Zap, Star, Users, Briefcase, Clock
} from "lucide-react";
import growthHero from "@/assets/isreal-growth-hero.jpg";
import RecentWorkProof from "@/components/RecentWorkProof";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewSubmissionForm from "@/components/ReviewSubmissionForm";
import { useRef, useCallback } from "react";
import { useCounter } from "@/hooks/use-counter";

const services = [
  { icon: Youtube, title: "YouTube Growth & SEO", desc: "Channel optimization, audience growth, and video SEO strategies.", color: "from-red-500/20 to-red-600/5" },
  { icon: Video, title: "Video Editing", desc: "Professional editing that keeps viewers watching and subscribing.", color: "from-purple-500/20 to-purple-600/5" },
  { icon: ShoppingBag, title: "Shopify Development", desc: "Custom stores built to convert visitors into paying customers.", color: "from-green-500/20 to-green-600/5" },
  { icon: TrendingUp, title: "Dropshipping Setup", desc: "End-to-end dropshipping store setup with winning products.", color: "from-blue-500/20 to-blue-600/5" },
  { icon: Globe, title: "WordPress Design", desc: "Beautiful, fast WordPress sites with SEO built in.", color: "from-sky-500/20 to-sky-600/5" },
  { icon: Search, title: "Digital Marketing", desc: "Data-driven strategies to grow your online presence.", color: "from-orange-500/20 to-orange-600/5" },
];

const projects = [
  { title: "Fashion Store Redesign", category: "Shopify", result: "+280% conversion rate", icon: ShoppingBag },
  { title: "Tech Review Channel", category: "YouTube Growth", result: "2K → 85K subs in 6 months", icon: Youtube },
  { title: "Law Firm Website", category: "WordPress", result: "Page 1 rankings in 30 days", icon: Globe },
];

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered", icon: Briefcase },
  { value: 50, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 5, suffix: "+", label: "Years Experience", icon: Clock },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
};

/* Tilt card component for services */
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
    rotateX.set(y * -10);
    rotateY.set(x * 10);
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

/* Stat counter component */
const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const { count, ref } = useCounter(stat.value, 2000);
  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="text-center group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
        <stat.icon size={20} className="text-primary" />
      </div>
      <div className="font-heading text-3xl sm:text-4xl font-bold text-primary">
        {count}{stat.suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
    </motion.div>
  );
};

/* Marquee for social proof */
const trustedBy = ["YouTube Creators", "Shopify Stores", "WordPress Sites", "E-commerce Brands", "Digital Agencies", "Content Creators", "SaaS Companies", "Local Businesses"];

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
      <section ref={heroRef} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background pt-16">
        <img
          src={growthHero}
          alt="Isreal Levis in a digital workspace with analytics and creative tools"
          className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background/95 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_78%_45%,hsl(var(--primary)/0.10),transparent_45%)] md:block" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative z-10 mx-auto px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.span
                variants={itemVariants}
                className="mb-5 inline-flex items-center gap-2 border-l-2 border-primary bg-background/60 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary backdrop-blur-sm"
              >
                <Sparkles size={14} className="animate-pulse" />
                Digital Growth Expert
              </motion.span>
              <motion.h1 variants={itemVariants} className="mb-6 max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Helping Businesses Scale with{" "}
                <span className="text-shimmer">YouTube Growth</span>, Shopify Development &amp; High-Converting Websites.
              </motion.h1>
              <motion.p variants={itemVariants} className="mb-8 max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
                I help entrepreneurs and businesses build powerful online presences that drive real revenue through proven digital strategies.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="group animate-glow-pulse relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Hire Me <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="heroOutline" size="lg" className="group bg-background/50 backdrop-blur-sm">
                    View My Work <ArrowRight size={16} className="opacity-0 -ml-2 transition-all group-hover:ml-0 group-hover:opacity-100" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border/70 pt-5 text-sm text-foreground/80">
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> 150+ projects delivered</span>
                <span className="inline-flex items-center gap-2"><Star size={16} className="fill-primary text-primary" /> 50+ happy clients</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trusted by marquee */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border/50 bg-background/75 backdrop-blur-sm">
          <div className="overflow-hidden py-4">
            <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
              {[...trustedBy, ...trustedBy].map((item, i) => (
                <span key={i} className="mx-8 text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-primary/60" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="border-b border-border">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </Section>

      {/* Services */}
      <Section className="relative">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
          >
            What I Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl font-bold mt-4"
          >
            Services That Drive <span className="text-gradient">Results</span>
          </motion.h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group glow-ring shimmer h-full relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300"
                    >
                      <s.icon size={24} className="text-primary" />
                    </motion.div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      Learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </TiltCard>
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
      <Section className="bg-card relative">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
          >
            Recent Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl font-bold mt-4"
          >
            Real Results for <span className="text-gradient">Real Businesses</span>
          </motion.h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="rounded-xl border border-border bg-background p-6 hover:border-primary/30 transition-all glow-ring group h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <p.icon size={18} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-heading font-semibold text-lg mt-2 mb-3">{p.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp size={14} className="text-primary group-hover:scale-125 transition-transform" />
                      <span className="font-medium text-primary">{p.result}</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
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
      <Section className="hero-bg noise-overlay">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto relative"
        >
          <div className="absolute -inset-16 rounded-3xl bg-primary/5 blur-3xl floating" />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20"
            >
              <Sparkles size={28} className="text-primary" />
            </motion.div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Ready to <span className="text-shimmer">Grow Your Business</span>?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
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
