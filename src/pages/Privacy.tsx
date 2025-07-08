
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="mb-4">Last updated: April 29, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to MAGASIGNAL ("we", "our", or "us"). We respect your privacy and are committed 
              to protecting your personal data. This privacy policy will inform you about how we look 
              after your personal data when you visit our website and tell you about your privacy rights.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Identity Data: includes first name, last name, username</li>
              <li>Contact Data: includes email address and telephone numbers</li>
              <li>Technical Data: includes IP address, browser type and version, time zone setting and location, operating system</li>
              <li>Usage Data: includes information about how you use our website</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being 
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We also 
              limit access to your personal data to those employees, agents, contractors and other third 
              parties who have a business need to know.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-4">Email: privacy@smallcapsignal.com</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
