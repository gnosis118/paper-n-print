import { Button } from '@/components/ui/button';
import { SEOHeaders } from '@/components/SEOHeaders';
import { Link } from 'react-router-dom';
import { PaintBucket, Clock, DollarSign, FileText } from 'lucide-react';

const Painters = () => {
  return (
    <>
      <SEOHeaders
        title="Invoicing for Painters | Get Paid Faster with ProInvoice"
        description="Send painting estimates, collect deposits, and get paid automatically. Built for painters who want to spend less time on paperwork."
        canonical="/painters"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <PaintBucket className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Painting Estimates That Get Approved
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Send a painting estimate in 30 seconds. Collect deposits before buying paint. Get paid when the job's complete.
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
                Create professional painting estimates on your phone while walking the job.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <DollarSign className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collect Deposits</h3>
              <p className="text-muted-foreground">
                Get paid upfront for paint and supplies. No more fronting material costs.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <FileText className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Auto-Invoice</h3>
              <p className="text-muted-foreground">
                Turn your estimate into an invoice instantly when the paint dries.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <PaintBucket className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Chase Payments</h3>
              <p className="text-muted-foreground">
                Automatic reminders get you paid faster. More time painting, less time chasing checks.
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

export default Painters;
