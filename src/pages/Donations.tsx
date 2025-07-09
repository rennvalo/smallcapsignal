
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Donations = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <Button variant="outline" asChild className="mb-8">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Donations</h1>
        
        <div className="flex flex-col items-center mb-10">
          <p className="text-xl mb-8 max-w-2xl text-center">
            Your support helps us continue bringing you news and opinions that matter.
            Scan the QR code below to make a donation via Venmo.
          </p>
          
          <div className="bg-white p-6 rounded-lg">
            <img 
              src="/site-uploads/0fc2fafd-f414-4273-957d-f2f2cef94457.png" 
              alt="Venmo QR Code" 
              className="w-80 h-80"
            />
          </div>
          
          <p className="mt-6 text-gray-400">
            Thank you for your support!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donations;
