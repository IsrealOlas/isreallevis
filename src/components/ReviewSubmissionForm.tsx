import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Section from "@/components/Section";

const ReviewSubmissionForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating === 0) {
      toast({ title: "Please fill in all required fields and select a rating.", variant: "destructive" });
      return;
    }
    if (name.length > 100 || message.length > 1000) {
      toast({ title: "Name or message is too long.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("client_reviews").insert({
      name: name.trim(),
      platform: platform || "Other",
      rating,
      message: message.trim(),
    });
    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section>
        <div className="max-w-lg mx-auto text-center py-12">
          <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold mb-2">Thank you for your feedback!</h3>
          <p className="text-muted-foreground">Your review has been submitted and will appear after approval.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="bg-card">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Feedback</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">Share Your Experience</h2>
          <p className="text-muted-foreground mt-2 text-sm">Worked with me? Leave a review to help others.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name / Username *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Platform (Optional)</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Where did we work together?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fiverr">Fiverr</SelectItem>
                <SelectItem value="Upwork">Upwork</SelectItem>
                <SelectItem value="Discord">Discord</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Your Review *</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your experience working with me..."
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1">{message.length}/1000</p>
          </div>

          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default ReviewSubmissionForm;
