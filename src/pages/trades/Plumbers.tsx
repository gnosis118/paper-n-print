import { Button } from '@/components/ui/button';
import { SEOHeaders } from '@/components/SEOHeaders';
import { Link } from 'react-router-dom';
import { Droplet, Clock, DollarSign, FileText } from 'lucide-react';

const Plumbers = () => {
  return (
    <>
      <SEOHeaders
        title="Invoicing for Plumbers | Get Paid Faster with ProInvoice"
        description="Send plumbing estimates, collect deposits, and get paid automatically. Built for plumbers who want to spend less time on paperwork."
        canonical="/plumbers"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Droplet className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Plumbing Invoices That Get Paid
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Send a plumbing estimate in 30 seconds. Collect deposits before you start. Get paid when the job's done.
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
              <h3 className="text-xl font-semibold mb-2">Quick Estimates</h3>
              <p className="text-muted-foreground">
                Create professional plumbing estimates from your phone while you're still on site.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <DollarSign className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collect Deposits</h3>
              <p className="text-muted-foreground">
                Get paid upfront for materials before you start the job. No more fronting costs.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <FileText className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Auto-Invoice</h3>
              <p className="text-muted-foreground">
                Turn your estimate into an invoice instantly when the work is complete.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <Droplet className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Chase Payments</h3>
              <p className="text-muted-foreground">
                Automatic reminders get you paid faster. Spend more time fixing pipes, not chasing checks.
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

export default Plumbers;
