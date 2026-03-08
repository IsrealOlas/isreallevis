import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Section from "@/components/Section";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";

type Review = {
  name: string;
  role?: string;
  platform: string;
  text: string;
  rating: number;
};

const staticTestimonials: Review[] = [
  { name: "Sarah M.", role: "E-commerce Owner", platform: "Fiverr", text: "Isreal transformed our Shopify store. Revenue increased 340% in 3 months.", rating: 5 },
  { name: "David K.", role: "YouTube Creator", platform: "Upwork", text: "My channel went from 2K to 50K subscribers with Isreal's growth strategies.", rating: 5 },
  { name: "Lisa T.", role: "Business Owner", platform: "Discord", text: "Our WordPress site now loads in under 2 seconds and ranks on page 1.", rating: 5 },
  { name: "JayTech_", role: "Content Creator", platform: "Fiverr", text: "Great experience working together. My YouTube channel analytics improved after the SEO optimization and video strategy. Highly recommend.", rating: 5 },
  { name: "Amanda R.", role: "Freelancer", platform: "Upwork", text: "Delivered a clean and fast WordPress website. Communication was excellent and the project was completed quickly.", rating: 5 },
  { name: "NightOwl#3291", role: "Community Member", platform: "Discord", text: "Helped me fix several bugs on my website and optimized the speed. Very professional and knowledgeable.", rating: 5 },
  { name: "Marcus J.", role: "Store Owner", platform: "Fiverr", text: "My Shopify store was built exactly how I wanted. The design is modern and optimized for sales.", rating: 5 },
  { name: "Elena V.", role: "Brand Manager", platform: "Upwork", text: "Excellent YouTube editing and channel optimization. My engagement and views increased after implementing the strategy.", rating: 5 },
];

const platformColor = (p: string) => {
  switch (p) {
    case "Fiverr": return "bg-green-500/10 text-green-600 dark:text-green-400";
    case "Upwork": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "Discord": return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
    default: return "bg-muted text-muted-foreground";
  }
};

const TestimonialsSection = () => {
  const [allReviews, setAllReviews] = useState<Review[]>(staticTestimonials);

  useEffect(() => {
    const fetchApproved = async () => {
      const { data } = await supabase
        .from("client_reviews")
        .select("name, platform, rating, message")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const dbReviews: Review[] = data.map((r) => ({
          name: r.name,
          platform: r.platform || "Other",
          text: r.message,
          rating: r.rating,
        }));
        setAllReviews([...staticTestimonials, ...dbReviews]);
      }
    };
    fetchApproved();
  }, []);

  return (
    <Section>
      <div className="text-center mb-12">
        <span className="text-sm font-medium text-primary uppercase tracking-wider">Testimonials</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">What Clients Say</h2>
      </div>
      <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-5xl mx-auto">
        <CarouselContent className="-ml-4">
          {allReviews.map((t, i) => (
            <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl bg-card border border-border h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${platformColor(t.platform)}`}>
                    {t.platform}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 flex-1">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 sm:-left-12" />
        <CarouselNext className="-right-4 sm:-right-12" />
      </Carousel>
    </Section>
  );
};

export default TestimonialsSection;
