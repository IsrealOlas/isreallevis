import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Twitter, MessageCircle, Mail, Send, Loader2, Facebook } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TelegramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.855.075 1.644.357 1.898.35.317.728.517.94.613l3.437 1.326a.73.73 0 0 0 .233.04c.155 0 .301-.068.404-.187l8.5-9.597a.272.272 0 0 1 .397.004.272.272 0 0 1-.004.394l-7.63 8.572a.603.603 0 0 0-.078.763l3.38 5.55c.09.148.158.26.298.39.236.218.546.322.849.322a1.19 1.19 0 0 0 1.12-.817l4.293-15.207a2.16 2.16 0 0 0 .084-.618 1.267 1.267 0 0 0-.447-.968 1.457 1.457 0 0 0-.856-.232z"/>
  </svg>
);

const contactLinks = [
  { icon: Twitter, label: "Twitter / X", value: "@isreal_levis", href: "https://x.com/isreal_levis" },
  { icon: Facebook, label: "Facebook", value: "Isreal Levis", href: "https://www.facebook.com/share/17Fv1cKbYY/" },
  { icon: TelegramIcon, label: "Telegram", value: "@Isreallevis", href: "https://t.me/Isreallevis" },
  { icon: MessageCircle, label: "Discord", value: "Join Server", href: "https://discord.gg/7DeWtjxn" },
  { icon: Mail, label: "Email", value: "Send me an email", href: "mailto:cyberworldenterprise8@gmail.com" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          message: form.message.trim(),
        },
      });

      if (error) throw error;

      toast({ title: "Message sent!", description: "I'll get back to you within 24 hours." });
      setForm({ name: "", email: "", service: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-16">
      <Section className="hero-bg">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Contact</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Let's <span className="text-gradient">Grow Your Business</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to take your online presence to the next level? Get in touch.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="flex flex-col gap-4">
              {contactLinks.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <c.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-xl bg-card border border-border"
          >
            <h3 className="font-heading text-xl font-semibold mb-6">Quick Project Inquiry</h3>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Service Interested In</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a service</option>
                  <option>YouTube Growth & SEO</option>
                  <option>Video Editing</option>
                  <option>Shopify Development</option>
                  <option>Dropshipping Setup</option>
                  <option>WordPress Design</option>
                  <option>WordPress Bug Fixing</option>
                  <option>Digital Marketing</option>
                  <option>SEO Optimization</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  required
                  maxLength={1000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button variant="hero" size="lg" type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending... <Loader2 size={16} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </Section>
    </main>
  );
};

export default Contact;
