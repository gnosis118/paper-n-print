import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHeaders } from "@/components/SEOHeaders";
import { useNavigate } from "react-router-dom";
import { Zap, DollarSign, FileText, Clock } from "lucide-react";

const Electricians = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHeaders
        title="Invoicing for Electricians | Get Paid Faster with ProInvoice"
        description="Send electrical job bids in 30 seconds. Collect deposits before you start, and get paid automatically when the work's done. Built for electricians."
      />
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Built for Electricians</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Send an Electrical Bid in 30 Seconds
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
                From panel upgrades to rewires — create estimates, collect deposits, and get paid automatically when you finish the job.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/estimate")}
                  className="text-lg px-8 py-6 min-h-[48px] bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                >
                  Start Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/pricing")}
                  className="text-lg px-8 py-6 min-h-[48px] bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  See Pricing
                </Button>
              </div>
              
              <p className="text-sm text-primary-foreground/75">
                ✓ No credit card needed • ✓ Works on your phone • ✓ Get paid before you buy wire & fixtures
              </p>
            </div>
          </div>
        </section>

        {/* Electrician-Specific Benefits */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Stop Chasing Checks. Start Wiring.
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              ProInvoice handles the paperwork so you can focus on the electrical work.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card rounded-lg p-8 border-2 border-accent/20">
                <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-center mb-4">Quick Quotes On-Site</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Customer needs a panel upgrade quote? Send professional estimates in 30 seconds — right from the job site.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-8 border-2 border-primary/20">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-center mb-4">Collect Deposit First</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Don't buy wire, panels, and fixtures out of pocket. Get 50% deposit before you start. Protect your cashflow.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-8 border-2 border-secondary/20">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-center mb-4">Auto-Invoice When Done</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Mark the job complete, and the final invoice sends automatically. Customer pays instantly. You move to the next call.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Case */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card rounded-lg p-8 md:p-12 shadow-large">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Real Scenario: 200-Amp Panel Upgrade
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold mb-1">Customer calls with breaker tripping issues</h3>
                    <p className="text-muted-foreground text-sm">You inspect the panel, check the load, and recommend a 200-amp upgrade.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold mb-1">Send quote in 30 seconds</h3>
                    <p className="text-muted-foreground text-sm">Select "Panel Upgrade" template, add labor + materials. Customer sees the $3,200 quote instantly.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold mb-1">Collect $1,600 deposit before you order parts</h3>
                    <p className="text-muted-foreground text-sm">Customer approves. You request 50% deposit. Money hits your account before you head to the supply house.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold mb-1">Finish job, get paid immediately</h3>
                    <p className="text-muted-foreground text-sm">Panel is upgraded and inspected. Mark job complete. Final invoice sends. Customer pays the remaining $1,600. Done.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-lg font-bold mb-4">No more waiting. No more chasing.</p>
                <Button 
                  size="lg" 
                  onClick={() => navigate("/estimate")}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 min-h-[48px]"
                >
                  Try It Free
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Paid Faster?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Join hundreds of electricians who've stopped chasing payments and started getting paid on time.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/estimate")}
              className="text-lg px-8 py-6 min-h-[48px] bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              Start Free — No Credit Card Required
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Electricians;
