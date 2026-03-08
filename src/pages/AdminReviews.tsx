import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, CheckCircle2, XCircle, Trash2, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Review = {
  id: string;
  name: string;
  platform: string | null;
  rating: number;
  message: string;
  approved: boolean;
  created_at: string;
};

// Password is entered by user at login, validated server-side

const AdminReviews = () => {
  const { toast } = useToast();
  const [authed, setAuthed] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    // Use service role through edge function to read all reviews (including unapproved)
    const { data, error } = await supabase.functions.invoke("admin-reviews", {
      body: { action: "list", password: ADMIN_PASSWORD },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Failed to load reviews", variant: "destructive" });
      return;
    }
    setReviews(data?.reviews || []);
  };

  const updateReview = async (id: string, action: "approve" | "reject" | "delete") => {
    const { error } = await supabase.functions.invoke("admin-reviews", {
      body: { action, id, password: ADMIN_PASSWORD },
    });
    if (error) {
      toast({ title: "Action failed", variant: "destructive" });
      return;
    }
    toast({ title: action === "approve" ? "Review approved" : action === "reject" ? "Review rejected" : "Review deleted" });
    fetchReviews();
  };

  useEffect(() => {
    if (authed) fetchReviews();
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-heading text-2xl font-bold text-center">Admin Access</h1>
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="hero" className="w-full">
            <LogIn size={16} /> Sign In
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold mb-8">Review Moderation</h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews to moderate.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{r.name}</span>
                      <span className="text-xs text-muted-foreground">{r.platform}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.approved ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                        {r.approved ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={12} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">"{r.message}"</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!r.approved && (
                      <Button size="sm" variant="outline" onClick={() => updateReview(r.id, "approve")} className="text-green-600">
                        <CheckCircle2 size={14} /> Approve
                      </Button>
                    )}
                    {r.approved && (
                      <Button size="sm" variant="outline" onClick={() => updateReview(r.id, "reject")} className="text-yellow-600">
                        <XCircle size={14} /> Reject
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => updateReview(r.id, "delete")} className="text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
