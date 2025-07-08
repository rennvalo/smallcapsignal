
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSubscribe = () => {
    const subscribeSection = document.getElementById('footer-subscribe');
    if (subscribeSection) {
      subscribeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-black border-b border-maga-red">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-800 text-sm">
          <div className="flex space-x-4">
            <Link to="/support" className="hover:text-maga-red transition-colors">
              Support
            </Link>
            <Link to="/contact" className="hover:text-maga-red transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={16} />
            </a>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/fd97ccba-8dde-4e7a-9a9e-8bed28b27191.png" 
                alt="smallCapSIGNAL Logo" 
                className="h-12 mr-3" 
              />
              <h1 className="text-3xl font-bold">
                <span className="text-white">SMALLCAP</span>
                <span className="text-maga-red">SIGNAL</span>
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-maga-red transition-colors">
              Home
            </Link>
            <Link to="/news" className="font-medium hover:text-maga-red transition-colors">
              News
            </Link>
            <Link to="/opinion" className="font-medium hover:text-maga-red transition-colors">
              Investor Insights
            </Link>
          </nav>
          <Button 
            variant="destructive"
            className="hidden md:block bg-maga-red hover:bg-maga-darkRed"
            onClick={scrollToSubscribe}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
