
import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Check for cookie or localStorage to see if the user has dismissed the popup before
  useEffect(() => {
    const hasViewedPopup = localStorage.getItem("newsletterPopupShown");
    
    if (!hasViewedPopup) {
      // Wait for 10 seconds before showing the popup
      const timer = setTimeout(() => {
        setOpen(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      console.log("Newsletter signup:", email);
      setSubmitted(true);
      // Here you would typically call an API to register the email
      
      // Wait 2 seconds, then close the dialog
      setTimeout(() => {
        setOpen(false);
        localStorage.setItem("newsletterPopupShown", "true");
      }, 2000);
    }
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("newsletterPopupShown", "true");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Get Free Trading Signals
          </DialogTitle>
          <DialogDescription>
            Subscribe to our newsletter and get a free eBook on technical analysis
            plus weekly trading signals directly to your inbox.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {submitted ? (
            <div className="flex items-center justify-center p-4 text-center">
              <div className="space-y-2">
                <p className="text-positive font-semibold">Thank you for subscribing!</p>
                <p className="text-sm">Check your email for your free eBook.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="email"
                  placeholder="Your email address"
                  className="col-span-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                />
              </div>
              <Button type="submit" className="w-full">Subscribe Now</Button>
            </form>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={handleClose} className="text-xs">
            Maybe later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
