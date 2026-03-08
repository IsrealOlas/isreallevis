import Section from "@/components/Section";
import { motion } from "framer-motion";
import {
  Youtube, Video, ShoppingBag, TrendingUp, Globe, Bug, Megaphone, Search, Target
} from "lucide-react";
import isrealPhoto from "@/assets/isreal-about-photo.png";

const skills = [
  { icon: Youtube, label: "YouTube Growth & SEO" },
  { icon: Video, label: "Professional Video Editing" },
  { icon: ShoppingBag, label: "Shopify Development" },
  { icon: TrendingUp, label: "Dropshipping Setup" },
  { icon: Globe, label: "WordPress Design & Dev" },
  { icon: Bug, label: "Bug Fixing & Optimization" },
  { icon: Megaphone, label: "Digital Marketing" },
  { icon: Search, label: "SEO Optimization" },
];

const About = () => {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="hero-bg">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">About Me</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-6">
              I'm <span className="text-gradient">Isreal Levis</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Hi, I'm Isreal Levis, a digital expert passionate about helping businesses scale their online presence. I specialize in YouTube growth strategies, professional video editing, Shopify development, dropshipping solutions, WordPress website development, SEO optimization, and technical website fixes.
            </p>
            <p className="text-muted-foreground">
              My goal is to help businesses grow faster with powerful digital solutions. From small startups to established brands, I bring the same dedication: understand the business, craft the right strategy, and deliver measurable results.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
              <img
                src={isrealPhoto}
                alt="Isreal Levis - Digital Growth Expert"
                className="relative rounded-2xl w-full max-w-sm object-cover shadow-2xl border-2 border-border"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Expertise</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">Skills & Expertise</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <s.icon size={20} className="text-primary shrink-0" />
              <span className="text-sm font-medium">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Mission */}
      <Section className="bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Target size={28} className="text-primary" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">My Mission</h2>
          <p className="text-muted-foreground text-lg">
            To empower businesses of all sizes with the digital tools and strategies they need to thrive online. I believe every business deserves a professional online presence that drives real growth — and I'm here to make that happen.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default About;
