import Section from "@/components/Section";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Youtube, Video, ShoppingBag, TrendingUp, Globe, Bug, Megaphone, Search, Target,
  Sparkles, Zap, Star, Award
} from "lucide-react";
import isrealPhoto from "@/assets/isreal-about-photo.png";
import { useRef, useCallback } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useCounter } from "@/hooks/use-counter";

const skills = [
  { icon: Youtube, label: "YouTube Growth & SEO", color: "from-red-500/20 to-red-600/5" },
  { icon: Video, label: "Professional Video Editing", color: "from-purple-500/20 to-purple-600/5" },
  { icon: ShoppingBag, label: "Shopify Development", color: "from-green-500/20 to-green-600/5" },
  { icon: TrendingUp, label: "Dropshipping Setup", color: "from-blue-500/20 to-blue-600/5" },
  { icon: Globe, label: "WordPress Design & Dev", color: "from-sky-500/20 to-sky-600/5" },
  { icon: Bug, label: "Bug Fixing & Optimization", color: "from-amber-500/20 to-amber-600/5" },
  { icon: Megaphone, label: "Digital Marketing", color: "from-orange-500/20 to-orange-600/5" },
  { icon: Search, label: "SEO Optimization", color: "from-teal-500/20 to-teal-600/5" },
];

const milestones = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Satisfied Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const MilestoneCounter = ({ item }: { item: typeof milestones[0] }) => {
  const { count, ref } = useCounter(item.value, 2000);
  return (
    <motion.div ref={ref} variants={itemVariants} className="text-center">
      <div className="font-heading text-4xl sm:text-5xl font-bold text-primary">
        {count}{item.suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
    </motion.div>
  );
};

const About = () => {
  const mouse = useMousePosition();

  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="hero-bg noise-overlay">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
            >
              <Sparkles size={14} className="animate-pulse" />
              About Me
            </motion.span>
            <motion.h1 variants={itemVariants} className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
              I'm <span className="text-shimmer">Isreal Levis</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-4">
              Hi, I'm Isreal Levis, a digital expert passionate about helping businesses scale their online presence. I specialize in YouTube growth strategies, professional video editing, Shopify development, dropshipping solutions, WordPress website development, SEO optimization, and technical website fixes.
            </motion.p>
            <motion.p variants={itemVariants} className="text-muted-foreground">
              My goal is to help businesses grow faster with powerful digital solutions. From small startups to established brands, I bring the same dedication: understand the business, craft the right strategy, and deliver measurable results.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <motion.div
              className="relative flex flex-col items-center"
              style={{
                x: mouse.normalizedX * -10,
                y: mouse.normalizedY * -10,
              }}
            >
              <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-3xl animate-glow-pulse blob" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/25 via-transparent to-accent/25" />
              <img
                src={isrealPhoto}
                alt="Isreal Levis - Digital Growth Expert"
                className="relative rounded-2xl w-full max-w-sm object-cover shadow-2xl border-2 border-primary/20"
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="relative mt-4 inline-flex items-center gap-2 bg-card border border-border text-sm font-bold px-4 py-2 rounded-full shadow-lg"
              >
                <Zap size={14} className="text-primary animate-pulse" />
                YouTube &amp; Website Expert
              </motion.span>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -right-4 top-8 bg-card border border-border rounded-xl px-3 py-2 shadow-lg floating hidden lg:flex items-center gap-2"
              >
                <Award size={14} className="text-primary" />
                <span className="text-xs font-semibold">5+ Years</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Milestones */}
      <Section className="border-b border-border">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {milestones.map((m) => (
            <MilestoneCounter key={m.label} item={m} />
          ))}
        </motion.div>
      </Section>

      {/* Skills */}
      <Section>
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
          >
            Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl font-bold mt-4"
          >
            Skills & <span className="text-gradient">Expertise</span>
          </motion.h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group glow-ring relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
              <div className="relative z-10 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all"
                >
                  <s.icon size={20} className="text-primary" />
                </motion.div>
                <span className="text-sm font-medium">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Mission */}
      <Section className="bg-card">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <motion.div
            className="absolute -inset-16 rounded-3xl bg-primary/5 blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20"
            >
              <Target size={28} className="text-primary" />
            </motion.div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              My <span className="text-shimmer">Mission</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              To empower businesses of all sizes with the digital tools and strategies they need to thrive online. I believe every business deserves a professional online presence that drives real growth — and I'm here to make that happen.
            </p>
          </div>
        </motion.div>
      </Section>
    </main>
  );
};

export default About;
