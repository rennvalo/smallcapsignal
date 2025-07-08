
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, TrendingUp, TrendingDown, ChartLine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InvestorInsights = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <ChartLine className="mr-2 h-6 w-6" />
            Investor Insights
          </h1>
          <p className="text-muted-foreground mb-8">Market analysis, testimonials, and successful trades</p>
          
          <Tabs defaultValue="testimonials" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="trades">Successful Trades</TabsTrigger>
            </TabsList>
            
            <TabsContent value="testimonials" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                What Our Subscribers Say
              </h2>
              
              <article className="border border-gray-800 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-maga-red rounded-full p-2 mr-4">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">John D. from Texas</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "MAGA Signal has completely transformed my investment strategy. The real-time alerts on Trump's market-moving posts have helped me make informed decisions quickly. I've seen a significant improvement in my portfolio's performance."
                </p>
              </article>
              
              <article className="border border-gray-800 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-maga-red rounded-full p-2 mr-4">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Sarah M. from Florida</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a political enthusiast, I find MAGA Signal's analysis to be spot-on. Their insights go beyond just market impact and help me understand the broader implications of each statement. Definitely worth subscribing!"
                </p>
              </article>
            </TabsContent>
            
            <TabsContent value="trades" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Recent Successful Trades
              </h2>
              
              <article className="border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">$TSLA</h3>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-5 w-5 mr-1" />
                    <span>+12.4%</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  Following Trump's announcement about EV tax credits, Tesla stock jumped significantly. MAGA Signal subscribers received the alert within minutes of the post, allowing for early market positioning.
                </p>
                <p className="text-sm text-gray-400">Alert sent: April 28, 2025</p>
              </article>
              
              <article className="border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">$DWAC</h3>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-5 w-5 mr-1" />
                    <span>+8.7%</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  Trump Media & Technology Group saw shares rise after a Truth Social post about platform expansion. Subscribers who acted on our alert saw immediate gains.
                </p>
                <p className="text-sm text-gray-400">Alert sent: May 1, 2025</p>
              </article>
              
              <article className="border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">$XOM</h3>
                  <div className="flex items-center text-red-500">
                    <TrendingDown className="h-5 w-5 mr-1" />
                    <span>-5.2%</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  Our analysis correctly predicted the impact of policy comments on the energy sector, allowing subscribers to hedge positions ahead of market movement.
                </p>
                <p className="text-sm text-gray-400">Alert sent: April 15, 2025</p>
              </article>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvestorInsights;
