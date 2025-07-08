
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="mb-4">Last updated: April 29, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using the MAGASIGNAL™ website or any related services (the “Site”), you agree to be legally bound by these Terms of Use, our Privacy Policy, and any additional rules, policies, or guidelines that may be posted from time to time (collectively, the “Agreement”). If you do not agree to all terms of the Agreement, you are not permitted to use the Site or any MAGASIGNAL™ offerings.
MAGASIGNAL™ is owned and operated by Renn Valo. All content provided through the Site—including but not limited to emails, videos, blog posts, commentary, third-party links, newsletters, reports, tools, and social media communications (collectively, the “Content”)—is intended solely for informational and entertainment purposes. MAGASIGNAL™ is not a registered investment advisor, broker-dealer, or financial planner, and no Content should be interpreted as personalized investment advice, a recommendation, or a solicitation to buy, sell, or hold any securities.
Our Content is designed to present market ideas and general information. You are solely responsible for evaluating the merits and risks associated with the use of any Content before making any financial decisions. You should always seek the advice of a licensed financial professional for investment decisions tailored to your personal situation.
By using the Site, you acknowledge and agree that:
•	You assume full responsibility for any investment decisions you make.
•	MAGASIGNAL™ disclaims all warranties (express or implied), including but not limited to accuracy, completeness, reliability, or fitness for a particular purpose.
•	MAGASIGNAL™ is not liable for any loss or damage resulting from reliance on any Content or use of the Site.
•	All disputes arising from or related to your use of the Site are subject to binding arbitration, and you waive any right to participate in class action lawsuits or jury trials.
We reserve the right to modify or update the Agreement at any time without specific notice. Any such changes will be effective upon posting. Your continued use of the Site following the posting of revised terms constitutes your acceptance of those changes.

</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Content Usage</h2>
            <p className="mb-4">
              All content provided on this website is for informational purposes only. The content represents the 
              opinions of our writers and is not intended to provide legal, medical, or any other professional advice.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Conduct</h2>
            <p className="mb-4">
              When using our website, you agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use our service for any unlawful purpose</li>
              <li>Attempt to interfere with the proper working of the site</li>
              <li>Bypass any measures we may use to prevent or restrict access</li>
              <li>Post or transmit any material that is abusive, threatening, obscene, or defamatory</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              The content, organization, graphics, design, and other matters related to this site are protected under 
              applicable copyrights and other proprietary laws. Copying, redistribution, use or publication by you of 
              any such content is strictly prohibited without our express permission.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall MAGASIGNAL be liable for any damages arising out of the use or inability to use the 
              materials on our website, even if we have been notified of the possibility of such damage.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Please review this page periodically for changes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at legal@magasignal.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
