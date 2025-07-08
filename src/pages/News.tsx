
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Newspaper } from "lucide-react";

const News = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center">
            <Newspaper className="mr-2 h-6 w-6" />
            Latest News
          </h1>
          
          <div className="space-y-8">
            <article className="border border-gray-800 rounded-lg p-6 bg-secondary">
              <h2 className="text-2xl font-semibold mb-2 text-maga-red">Breaking News: MAGA Signal Launches Real-Time Alerts for Trump's Market-Moving Posts</h2>
              <p className="text-sm text-muted-foreground mb-4">May 5, 2025 — MAGA Signal Headquarters</p>
              
              <div className="prose prose-invert max-w-none">
                <p className="mb-4">
                  A new tool has just launched for investors and political watchers: MAGA Signal, a first-of-its-kind platform that delivers real-time alerts when President Donald J. Trump posts content that could positively impact the financial markets.
                </p>
                
                <p className="mb-4">
                  In a media landscape that moves fast and hits hard, MAGA Signal cuts through the noise by monitoring Trump's activity on Truth Social and other platforms. The system instantly analyzes new posts and sends email notifications to subscribers when potentially market-moving or pro-growth comments appear.
                </p>
                
                <p className="mb-4">
                  "The idea behind MAGA Signal is simple," said founder Renn Valo. "We help people stay informed — and stay ahead — by alerting them the moment something significant is said by Trump online."
                </p>
                
                <p className="mb-4">
                  Subscribers can sign up to receive instant notifications or simply visit the site at any time to view the latest content and commentary. The platform is free to use during its launch phase, with premium subscription features on the horizon.
                </p>
                
                <p className="mb-4">
                  Whether you're an investor tracking sentiment, a political enthusiast staying engaged, or a journalist covering the impact of Trump's online presence, MAGA Signal is your new go-to source for real-time insights.
                </p>
                
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="font-medium">Visit: <a href="https://www.smallcapsignal.com" className="text-maga-red hover:underline">www.smallcapsignal.com</a></p>
                  <p className="font-medium">Contact: Renn – (303) 250-5818 | <a href="mailto:support@smallcapsignal.com" className="text-maga-red hover:underline">support@smallcapsignal.com</a></p>
                </div>
              </div>
            </article>
            
            <article className="border border-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">Featured Story</h2>
              <p className="text-muted-foreground mb-4">
                In-depth coverage of important topics and events that matter to you.
              </p>
            </article>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
