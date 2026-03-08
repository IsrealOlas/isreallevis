import { Link } from "react-router-dom";
import { Twitter, Mail, MessageCircle, Facebook } from "lucide-react";

const TelegramIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.855.075 1.644.357 1.898.35.317.728.517.94.613l3.437 1.326a.73.73 0 0 0 .233.04c.155 0 .301-.068.404-.187l8.5-9.597a.272.272 0 0 1 .397.004.272.272 0 0 1-.004.394l-7.63 8.572a.603.603 0 0 0-.078.763l3.38 5.55c.09.148.158.26.298.39.236.218.546.322.849.322a1.19 1.19 0 0 0 1.12-.817l4.293-15.207a2.16 2.16 0 0 0 .084-.618 1.267 1.267 0 0 0-.447-.968 1.457 1.457 0 0 0-.856-.232z"/>
  </svg>
);

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
              <a href="https://www.facebook.com/share/17Fv1cKbYY/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://t.me/Isreal_Levis" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <TelegramIcon size={18} />
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
