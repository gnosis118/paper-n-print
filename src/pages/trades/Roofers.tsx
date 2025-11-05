import { Button } from '@/components/ui/button';
import { SEOHeaders } from '@/components/SEOHeaders';
import { Link } from 'react-router-dom';
import { Home, Clock, DollarSign, FileText } from 'lucide-react';

const Roofers = () => {
  return (
    <>
      <SEOHeaders
        title="Invoicing for Roofers | Get Paid Faster with ProInvoice"
        description="Send roofing bids, collect deposits, and get paid automatically. Built for roofers who want to spend less time on paperwork."
        canonical="/roofers"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Home className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Roofing Bids That Close Deals
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Send a roofing bid in 30 seconds. Collect deposits before you order materials. Get paid when the job's done.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="min-h-[48px]">Start Free</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="min-h-[48px]">See Pricing</Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <Clock className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Bids</h3>
              <p className="text-muted-foreground">
                Create professional roofing estimates from your truck. Close deals faster.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <DollarSign className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collect Deposits</h3>
              <p className="text-muted-foreground">
                Get paid for materials upfront. No more waiting for homeowners to pay.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <FileText className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Auto-Invoice</h3>
              <p className="text-muted-foreground">
                Turn your estimate into an invoice instantly when the roof is done.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <Home className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Chase Payments</h3>
              <p className="text-muted-foreground">
                Automatic reminders get you paid faster. Focus on roofing, not collections.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/auth">
              <Button size="lg" className="min-h-[48px]">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roofers;
