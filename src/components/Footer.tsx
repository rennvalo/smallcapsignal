
import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rss } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send subscription request to our backend API
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // Clear the input and show the message from the API
      setEmail("");
      toast(data.message, {
        description: `Email: ${data.email}`
      });
    } catch (error) {
      toast("Subscription failed", {
        description: "Please try again later."
      });
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black border-t border-maga-red py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/site-uploads/fd97ccba-8dde-4e7a-9a9e-8bed28b27191.png" 
                alt="smallCapSIGNAL Logo" 
                className="h-10 mr-2" 
              />
              <h3 className="text-xl font-bold">
                <span className="text-white">SMALLCAP</span>
                <span className="text-maga-red">SIGNAL</span>
              </h3>
            </Link>
            <p className="text-gray-400 mb-4">
              Real-time alerts for market-moving posts.
            </p>
            <div className="flex items-center mb-4">
              <a 
                href="/rss"
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center text-gray-400 hover:text-white"
              >
                <Rss className="h-4 w-4 mr-2" />
                <span>RSS Feed</span>
                <span className="ml-2 text-xs bg-maga-red px-2 py-0.5 rounded-full">Updated 2x daily</span>
              </a>
            </div>
            <div className="mb-4">
              <Link to="/donations" className="text-maga-red hover:text-maga-darkRed font-bold">
                Donations Accepted
              </Link>
            </div>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/opinion" className="text-gray-400 hover:text-white transition-colors">
                  Investor Insights
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div id="footer-subscribe">
            <h4 className="font-bold text-lg mb-4 text-white">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Sign up to receive the latest news and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-gray-900 text-white border-gray-700 rounded-r-none focus-visible:ring-maga-red focus-visible:ring-offset-black"
                disabled={isSubmitting}
                required
              />
              <Button
                type="submit"
                className="bg-maga-red hover:bg-maga-darkRed rounded-l-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : <Mail className="mr-1" size={18} />}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} smallCapSIGNAL. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
