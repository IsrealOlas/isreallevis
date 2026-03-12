import { Link } from "react-router-dom";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Calendar, ArrowRight, Sparkles, Youtube, ShoppingBag, Globe, Bug,
  Megaphone, Search, TrendingUp, BookOpen, Star
} from "lucide-react";
import { useState } from "react";

const blogPosts = [
  {
    id: "youtube-growth-0-to-10k",
    title: "How to Grow Your YouTube Channel from 0 to 10K Subscribers",
    excerpt: "Proven strategies to build a loyal YouTube audience from scratch using SEO, content planning, and community engagement.",
    content: `Growing a YouTube channel from zero is one of the most rewarding challenges in digital marketing. Here are the key strategies that consistently work:

**1. Nail Your Niche**
Don't try to be everything to everyone. Pick a specific topic you're passionate about and become the go-to expert. Channels with a clear niche grow 3x faster than general content creators.

**2. Master YouTube SEO**
Every video needs optimized titles, descriptions, and tags. Use tools like TubeBuddy or VidIQ to research keywords your audience is actually searching for. Include your primary keyword in the first 60 characters of your title.

**3. Create Click-Worthy Thumbnails**
Your thumbnail is your billboard. Use bold text, expressive faces, and contrasting colors. A/B test different styles to find what resonates with your audience.

**4. Consistency is King**
Upload on a regular schedule. YouTube's algorithm rewards consistency. Even one video per week can build significant momentum over 6 months.

**5. Engage Your Community**
Reply to every comment in the first 48 hours. Create polls, community posts, and ask viewers questions. The algorithm pushes videos with high engagement.

**6. Optimize Watch Time**
Structure your videos with hooks in the first 10 seconds, pattern interrupts every 2-3 minutes, and strong calls-to-action. Longer watch time = more recommendations.`,
    date: "2026-03-01",
    category: "YouTube Growth",
    icon: Youtube,
    readTime: "8 min read",
    featured: true,
    relatedService: "YouTube Channel Growth & SEO",
    portfolioCategory: "YouTube",
  },
  {
    id: "shopify-conversion-mistakes",
    title: "5 Shopify Store Mistakes That Kill Your Conversion Rate",
    excerpt: "Common Shopify store design and UX mistakes that drive customers away — and how to fix them fast.",
    content: `If your Shopify store isn't converting, chances are you're making one of these critical mistakes:

**1. Slow Loading Speed**
Every second of delay reduces conversions by 7%. Compress images, minimize apps, and use a fast theme. Your store should load in under 3 seconds.

**2. Poor Mobile Experience**
Over 70% of e-commerce traffic is mobile. If your store isn't mobile-optimized, you're losing the majority of potential customers. Test every page on multiple devices.

**3. Weak Product Descriptions**
Don't just list features — sell benefits. Use bullet points, storytelling, and social proof. Show customers how the product solves their problem.

**4. Complicated Checkout**
Every extra step in checkout loses 10% of buyers. Enable guest checkout, offer multiple payment options, and minimize form fields. One-page checkout is ideal.

**5. No Trust Signals**
Add reviews, security badges, money-back guarantees, and real customer photos. Trust is the #1 factor in online purchase decisions.`,
    date: "2026-02-20",
    category: "Shopify",
    icon: ShoppingBag,
    readTime: "6 min read",
    featured: false,
    relatedService: "Shopify Store Development",
    portfolioCategory: "Shopify",
  },
  {
    id: "wordpress-speed-optimization",
    title: "WordPress Speed Optimization: A Complete Guide",
    excerpt: "Step-by-step guide to making your WordPress site load in under 2 seconds for better rankings and user experience.",
    content: `A fast WordPress site isn't optional — it's essential for SEO and conversions. Here's how to optimize:

**1. Choose Quality Hosting**
Shared hosting is fine for starting out, but as traffic grows, move to managed WordPress hosting. The server response time difference is dramatic.

**2. Optimize Images**
Use WebP format, lazy loading, and proper sizing. A single unoptimized image can add 3+ seconds to your load time. Use plugins like ShortPixel or Imagify.

**3. Minimize Plugins**
Every plugin adds code and database queries. Audit your plugins quarterly — if you're not using it, delete it. Aim for under 20 active plugins.

**4. Enable Caching**
Use a caching plugin like WP Rocket or W3 Total Cache. Browser caching, page caching, and object caching can reduce load times by 50-80%.

**5. Optimize Your Database**
Clean up post revisions, spam comments, and transient options. A bloated database slows every page load.

**6. Use a CDN**
Content Delivery Networks serve your files from the closest server to each visitor. Cloudflare's free tier is a great starting point.`,
    date: "2026-02-10",
    category: "WordPress",
    icon: Globe,
    readTime: "7 min read",
    featured: true,
    relatedService: "WordPress Website Design",
    portfolioCategory: "WordPress",
  },
  {
    id: "dropshipping-product-research",
    title: "The Ultimate Dropshipping Product Research Strategy",
    excerpt: "How to find winning products using data-driven research methods that reduce risk and maximize profit potential.",
    content: `Finding winning products is the difference between a profitable dropshipping store and a failed one. Here's my proven research framework:

**1. Follow the Data, Not Trends**
Use tools like Google Trends, AliExpress analytics, and social media ad libraries to identify products with consistent demand, not just viral moments.

**2. Check Profit Margins**
Your product should have at least a 3x markup. If you're buying for $5, sell for $15+. Factor in shipping, ads, and returns.

**3. Solve a Problem**
The best dropshipping products solve a specific problem. "Problem-solving" products have higher conversion rates and lower return rates.

**4. Test Before You Scale**
Start with $50-100 in ads to validate demand. If you get sales at a reasonable cost-per-acquisition, scale gradually. Never bet big on untested products.

**5. Analyze the Competition**
Study successful stores in your niche. What products are they pushing? What's their pricing strategy? Use this intel to find gaps in the market.`,
    date: "2026-01-28",
    category: "Dropshipping",
    icon: TrendingUp,
    readTime: "6 min read",
    featured: false,
    relatedService: "Dropshipping Store Setup",
    portfolioCategory: "Shopify",
  },
  {
    id: "digital-marketing-strategies",
    title: "7 Digital Marketing Strategies That Actually Work in 2026",
    excerpt: "Cut through the noise with marketing strategies that deliver real ROI for online businesses.",
    content: `The digital marketing landscape evolves fast. Here are the strategies delivering the best results right now:

**1. Short-Form Video Content**
TikTok, YouTube Shorts, and Instagram Reels are the highest-ROI content formats. Repurpose one long video into 5-10 short clips.

**2. Email Marketing Automation**
Email still delivers $42 for every $1 spent. Build automated sequences for welcome, abandoned cart, and post-purchase flows.

**3. SEO-Driven Content Marketing**
Create content that answers your audience's questions. Long-form, in-depth articles still dominate Google rankings.

**4. Community Building**
Discord servers, Facebook groups, and Telegram channels create loyal communities that buy repeatedly and refer others.

**5. Influencer Partnerships**
Micro-influencers (10K-50K followers) deliver better ROI than mega-influencers. Focus on engagement rate, not follower count.

**6. Retargeting Campaigns**
Only 2% of visitors buy on their first visit. Retargeting ads bring back the other 98% at a fraction of the cost.

**7. Conversion Rate Optimization**
Before spending more on traffic, optimize what you have. Small changes to headlines, CTAs, and layouts can double conversions.`,
    date: "2026-01-15",
    category: "Digital Marketing",
    icon: Megaphone,
    readTime: "9 min read",
    featured: false,
    relatedService: "Digital Marketing Solutions",
    portfolioCategory: "YouTube",
  },
  {
    id: "seo-ranking-factors",
    title: "Top SEO Ranking Factors You Need to Focus On",
    excerpt: "The most important SEO ranking factors and how to optimize your website to climb Google's search results.",
    content: `Google uses over 200 ranking factors, but these are the ones that matter most:

**1. Content Quality & Relevance**
Google's helpful content update prioritizes content written for humans, not search engines. Cover topics comprehensively and provide unique value.

**2. Backlink Profile**
Quality backlinks from authoritative sites remain the strongest ranking signal. Focus on earning links through great content, not buying them.

**3. Page Experience**
Core Web Vitals (LCP, FID, CLS) directly impact rankings. Your site needs to be fast, interactive, and visually stable.

**4. Mobile-First Indexing**
Google indexes the mobile version of your site first. If your mobile experience is poor, your rankings will suffer regardless of desktop quality.

**5. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)**
Demonstrate real expertise through author bios, credentials, citations, and original research. This is especially critical for YMYL topics.

**6. Technical SEO**
Proper site structure, XML sitemaps, schema markup, and crawlability ensure Google can find and understand all your content.`,
    date: "2026-01-05",
    category: "SEO",
    icon: Search,
    readTime: "7 min read",
    featured: false,
    relatedService: "Website SEO Optimization",
    portfolioCategory: "SEO",
  },
  {
    id: "common-website-bugs",
    title: "10 Common Website Bugs and How to Fix Them",
    excerpt: "A practical guide to diagnosing and fixing the most frequent website issues that hurt performance and user experience.",
    content: `Website bugs can cost you traffic, sales, and credibility. Here are the most common ones and how to fix them:

**1. Broken Links (404 Errors)**
Use tools like Screaming Frog to crawl your site and find broken links. Redirect them or update the URLs.

**2. Slow Page Load Times**
Compress images, enable caching, minimize JavaScript, and use a CDN. Aim for under 3 seconds on mobile.

**3. Mobile Responsiveness Issues**
Test on real devices, not just browser dev tools. Common issues: overlapping text, unclickable buttons, horizontal scrolling.

**4. Mixed Content Warnings**
If your site is HTTPS but loads HTTP resources, browsers show security warnings. Update all internal links and media to HTTPS.

**5. Plugin Conflicts**
Disable plugins one by one to identify the culprit. Keep plugins updated and remove unused ones.

**6. Form Submission Failures**
Test every form after updates. Common causes: CAPTCHA issues, email delivery problems, and validation errors.

**7. JavaScript Errors**
Check the browser console for errors. Common culprits: outdated jQuery, conflicting scripts, and missing dependencies.

**8. Database Connection Errors**
Usually caused by exceeded connection limits or corrupted tables. Optimize your database and consider upgrading hosting.

**9. CSS Layout Breaking**
Cross-browser testing is essential. Use CSS reset/normalize and test in Chrome, Firefox, Safari, and Edge.

**10. Security Vulnerabilities**
Keep everything updated, use strong passwords, implement 2FA, and install a security plugin like Wordfence.`,
    date: "2025-12-20",
    category: "Bug Fixing",
    icon: Bug,
    readTime: "10 min read",
    featured: false,
    relatedService: "WordPress Bug Fixing & Speed",
    portfolioCategory: "WordPress",
  },
];

const categories = ["All", "YouTube Growth", "Shopify", "WordPress", "Dropshipping", "Digital Marketing", "SEO", "Bug Fixing"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const Blog = () => {
  const [filter, setFilter] = useState("All");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const filtered = filter === "All" ? blogPosts : blogPosts.filter(p => p.category === filter);
  const featuredPosts = blogPosts.filter(p => p.featured);

  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="hero-bg noise-overlay">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <Sparkles size={14} className="animate-pulse" />
            Blog
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Digital Marketing <span className="text-shimmer">Tips & Insights</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Actionable strategies to grow your business online — from YouTube to Shopify and beyond.
          </p>
        </motion.div>
      </Section>

      {/* Featured Articles */}
      <Section>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Star size={18} className="text-primary" />
            <h2 className="font-heading text-2xl font-bold">Featured Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border-2 border-primary/20 hover:border-primary/40 transition-all group glow-ring relative overflow-hidden cursor-pointer"
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-primary bg-primary/15 px-2.5 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <BookOpen size={10} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((c) => (
            <motion.button
              key={c}
              onClick={() => setFilter(c)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === c
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filtered.map((post) => {
            const isExpanded = expandedPost === post.id;
            const Icon = post.icon;
            return (
              <motion.article
                key={post.id}
                variants={cardVariants}
                layout
                className="rounded-xl bg-card border border-border hover:border-primary/30 transition-all group glow-ring overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">{post.category}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={10} />
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>

                  {/* Expanded content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <div className="prose prose-sm max-w-none text-foreground/90 whitespace-pre-line text-sm leading-relaxed border-t border-border pt-4">
                        {post.content.split("**").map((part, i) =>
                          i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : <span key={i}>{part}</span>
                        )}
                      </div>

                      {/* CTA inside expanded post */}
                      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm font-medium text-foreground mb-3">
                          Need help implementing these strategies? Let me handle it for you.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Link to="/services">
                            <Button variant="hero" size="sm" className="group/btn">
                              View My Services <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          <Link to={`/portfolio?category=${post.portfolioCategory}`}>
                            <Button variant="heroOutline" size="sm" className="group/btn">
                              See Recent Work <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          <Link to="/contact">
                            <Button variant="outline" size="sm">Hire Me</Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                    className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                  >
                    {isExpanded ? "Show Less" : "Read More"} <ArrowRight size={14} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </Button>
                </div>

                {/* Related posts hint */}
                {isExpanded && (
                  <div className="px-6 pb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Related Articles</p>
                    <div className="flex flex-col gap-1">
                      {blogPosts
                        .filter(p => p.id !== post.id && (p.category === post.category || p.featured))
                        .slice(0, 2)
                        .map(related => (
                          <button
                            key={related.id}
                            onClick={(e) => { e.stopPropagation(); setExpandedPost(related.id); }}
                            className="text-left text-sm text-muted-foreground hover:text-primary transition-colors reveal-line py-1"
                          >
                            → {related.title}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14 p-8 rounded-xl bg-card border border-border"
        >
          <h3 className="font-heading text-2xl font-bold mb-2">Ready to Grow Your Business?</h3>
          <p className="text-muted-foreground mb-6">Let me turn these strategies into real results for you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/services">
              <Button variant="hero" size="lg" className="group">
                View My Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="heroOutline" size="lg" className="group">
                See Recent Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Hire Me</Button>
            </Link>
          </div>
        </motion.div>
      </Section>
    </main>
  );
};

export default Blog;
