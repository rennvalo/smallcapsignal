
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Support</h1>
          <p className="text-muted-foreground mb-8">
            Find answers to common questions or reach out for assistance.
          </p>
          
          <div className="grid gap-8">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I submit an article?</AccordionTrigger>
                    <AccordionContent>
                      To submit an article, you'll need to be an authorized contributor. If you're already authorized, 
                      you can use the admin portal with your API key. If you'd like to become a contributor, 
                      please contact us through the contact form.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I subscribe to updates?</AccordionTrigger>
                    <AccordionContent>
                      You can subscribe to our updates by entering your email in the subscription form in the footer 
                      of our website. You'll receive notifications whenever new content is published.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is your content policy?</AccordionTrigger>
                    <AccordionContent>
                      We publish news and opinions aligned with America First principles. Our content aims to be informative
                      and thought-provoking. We fact-check all news articles and clearly label opinion pieces.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I report an issue with the website?</AccordionTrigger>
                    <AccordionContent>
                      If you encounter any technical issues or want to report a problem with our content,
                      please use our contact form or email support@smallcapsignal.com with details about the issue.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How can I support smallCapSIGNAL?</AccordionTrigger>
                    <AccordionContent>
                      You can support us by subscribing to our newsletter, sharing our content on social media,
                      and making a donation if you appreciate our work. Your support helps us continue to provide
                      quality America First content.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  If you couldn't find answers to your questions in our FAQ, our support team is ready to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-maga-red hover:bg-maga-darkRed">
                    <a href="/contact">Contact Support</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:support@smallcapsignal.com">Email Us</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
