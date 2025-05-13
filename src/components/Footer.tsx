
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartLine, Mail, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background pt-10 pb-4">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <ChartLine className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TradeAnalytics Pro</span>
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            Professional trading signals, market analysis, and custom indicators for serious traders.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Youtube className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/analysis" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Market Analysis
              </Link>
            </li>
            <li>
              <Link to="/signals" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Trading Signals
              </Link>
            </li>
            <li>
              <Link to="/charts" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Charts Hub
              </Link>
            </li>
            <li>
              <Link to="/indicators" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Custom Indicators
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Trading Education
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Info</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Subscribe</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Get free trading signals and market updates directly to your inbox.
          </p>
          <div className="flex space-x-2">
            <Input placeholder="Email address" className="h-9" />
            <Button size="sm" className="h-9">
              <Mail className="h-4 w-4 mr-2" />
              <span>Subscribe</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t border-border/40">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TradeAnalytics Pro. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Trading involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
