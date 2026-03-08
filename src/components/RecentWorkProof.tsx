import Section from "@/components/Section";
import { motion } from "framer-motion";
import { TrendingUp, ExternalLink } from "lucide-react";

import proofYoutubeGrowth from "@/assets/proof-youtube-analytics.jpg";
import proofVideoEditing from "@/assets/proof-video-editing.jpg";
import proofShopifyStore from "@/assets/proof-shopify-store.jpg";
import proofDropshipping from "@/assets/proof-dropshipping.jpg";
import proofDigitalMarketing from "@/assets/proof-digital-marketing.jpg";
import proofWordpress from "@/assets/proof-wordpress.jpg";
import proofSeo from "@/assets/proof-seo.jpg";
import proofBugFixing from "@/assets/proof-bug-fixing.jpg";

const proofItems = [
  {
    image: proofYoutubeGrowth,
    title: "YouTube Channel Growth",
    description: "Optimized a YouTube channel using advanced SEO strategies, video optimization, and audience targeting. The results helped the client increase subscribers, channel views, and revenue.",
    result: "1.3M Views · +11.2K Subs · $5,131 Revenue",
    badges: ["+ Subscribers", "+ Views", "+ Revenue"],
  },
  {
    image: proofVideoEditing,
    title: "Professional Video Editing",
    description: "Edited high-quality YouTube videos to improve watch time, engagement, and viewer retention.",
    result: "5x increase in average watch time",
  },
  {
    image: proofShopifyStore,
    title: "Shopify Store Development",
    description: "Developed a professional Shopify store optimized for conversions and user experience.",
    result: "+280% conversion rate increase",
  },
  {
    image: proofDropshipping,
    title: "Dropshipping Store Setup",
    description: "Built a complete dropshipping store including product pages, payment setup, and store design.",
    result: "$15K revenue in first month",
  },
  {
    image: proofDigitalMarketing,
    title: "Digital Marketing Solutions",
    description: "Created digital marketing strategies that helped businesses grow their online reach and sales.",
    result: "300% ROI on ad spend",
  },
  {
    image: proofWordpress,
    title: "WordPress Website Development",
    description: "Designed and developed fast, SEO-optimized WordPress websites for businesses.",
    result: "Page 1 Google rankings in 30 days",
  },
  {
    image: proofSeo,
    title: "SEO Optimization",
    description: "Improved website search engine rankings using on-page SEO and optimization techniques.",
    result: "450% organic traffic growth",
  },
  {
    image: proofBugFixing,
    title: "Website Bug Fixing",
    description: "Resolved website issues, improved performance, and fixed technical errors.",
    result: "95+ PageSpeed score achieved",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } 
  }
};

const RecentWorkProof = () => {
  return (
    <Section>
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
        >
          Portfolio
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl sm:text-4xl font-bold mt-4"
        >
          Recent Work & <span className="text-gradient">Results</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-3 max-w-2xl mx-auto"
        >
          Visual proof of real projects delivered — strategy, execution, and measurable outcomes.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {proofItems.map((item) => (
          <motion.div
            key={item.title}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 group glow-ring"
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <ExternalLink size={14} />
                  View Details
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-heading font-semibold text-base mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-primary">{item.result}</span>
              </div>
              {item.badges && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.badges.map((badge) => (
                    <span key={badge} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default RecentWorkProof;
