import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHeaders } from "@/components/SEOHeaders";
import { useNavigate } from "react-router-dom";
import { Trees, DollarSign, FileText, Clock } from "lucide-react";

const Landscapers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHeaders
        title="Invoicing for Landscapers | Get Paid Faster with ProInvoice"
        description="Send landscaping bids in 30 seconds. Collect deposits before you order materials, and get paid automatically when the work's done."
      />
      <Header />
      
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-primary py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-6">
                <Trees className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Built for Landscapers</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Send a Landscaping Bid in 30 Seconds
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
                From lawn maintenance to full hardscape installs — create estimates, collect deposits, and get paid when you finish.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/estimate")}
                  className="text-lg px-8 py-6 min-h-[48px] bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                >
                  Start Free
                </Button>
              </div>
              
              <p className="text-sm text-primary-foreground/75">
                ✓ No credit card needed • ✓ Works on your phone • ✓ Get paid before you order plants & materials
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Stop Chasing Checks. Start Landscaping.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
              <div className="bg-card rounded-lg p-8 border-2 border-accent/20">
                <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-center mb-4">Quick Quotes On-Site</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Walk the property, take photos, send a professional landscaping quote in 30 seconds. Customer approves digitally.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-8 border-2 border-primary/20">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-center mb-4">Collect Deposit First</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Don't order mulch, plants, and pavers out of pocket. Get 50% deposit before you start. Protect your cashflow.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-8 border-2 border-secondary/20">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-center mb-4">Progress Payments</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Big install? Set up milestone payments. Get paid at excavation, installation, and final completion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Paid Faster?
            </h2>
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

export default Landscapers;
