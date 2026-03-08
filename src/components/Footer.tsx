import { Link } from "react-router-dom";
import { Twitter, Mail, MessageCircle, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl font-bold mb-3">
              Isreal<span className="text-gradient">Levis</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Helping businesses scale with YouTube growth strategies, Shopify development, and high-converting websites.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://x.com/isreal_levis" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://discord.gg/7DeWtjxn" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="mailto:cyberworldenterprise8@gmail.com" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
              <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm">Services</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>YouTube Growth</span>
              <span>Shopify Development</span>
              <span>WordPress Design</span>
              <span>Digital Marketing</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Isreal Levis. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
