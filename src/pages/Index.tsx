import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHeaders } from "@/components/SEOHeaders";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  DollarSign, 
  Shield, 
  Hammer, 
  Wrench, 
  HardHat,
  TrendingUp,
  Clock,
  CheckCircle2,
  Smartphone,
  Receipt,
  FileCheck,
  Handshake,
  AlertCircle,
  Zap
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHeaders
        title="ProInvoice - Cashflow Automation for Contractors & Subcontractors"
        description="Finish the Job. Get Paid. No More Waiting 30 Days. ProInvoice automates bids, deposits, and progress payments for contractors and subs."
      />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-6">
                <HardHat className="w-4 h-4 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">Built for the Trades</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Job Done? Get Paid Before You Head Home.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Send bids on-site. Collect deposits upfront. Invoice automatically when you finish. Built for contractors who work in the field, not behind a desk.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/estimate")}
                  className="text-lg px-8 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Try It Now — From Your Phone
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/pricing")}
                  className="text-lg px-8"
                >
                  See Pricing
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ✓ No credit card • ✓ Works on your phone • ✓ Get deposit before you start
              </p>
            </div>
          </div>
        </section>

        {/* Real Job Site Problems Solved */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-4">
                <AlertCircle className="w-4 h-4 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">The Problems You Face Every Day</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Stop Losing Money on Paperwork
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              You did the work. Now get paid without chasing, waiting, or doing admin from your truck.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Problem 1: Waiting for Payment */}
              <div className="bg-card rounded-lg p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-destructive/10 rounded-full w-12 h-12 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">The Problem</h3>
                </div>
                <p className="text-muted-foreground mb-6 font-medium">
                  "I finished the job 45 days ago. Still waiting for my check. Meanwhile, I have bills to pay."
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="font-semibold text-sm">ProInvoice Solution:</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Collect deposit before you start</strong> (50% upfront typical)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Progress payments at milestones</strong> (25/25/50 or custom)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Get paid same day</strong> with card/ACH</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Problem 2: Job Site to Invoice Gap */}
              <div className="bg-card rounded-lg p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-destructive/10 rounded-full w-12 h-12 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">The Problem</h3>
                </div>
                <p className="text-muted-foreground mb-6 font-medium">
                  "Job's done, I'm exhausted. Now I gotta go home and spend 2 hours doing paperwork to get paid?"
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="font-semibold text-sm">ProInvoice Solution:</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Create & send invoice from your phone</strong> in 60 seconds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Pre-built templates for your trade</strong> (roofing, plumbing, electrical, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Client pays instantly</strong> via embedded payment link</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Problem 3: Change Orders Kill Margins */}
              <div className="bg-card rounded-lg p-8 border-2 border-border hover:border-primary transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-destructive/10 rounded-full w-12 h-12 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">The Problem</h3>
                </div>
                <p className="text-muted-foreground mb-6 font-medium">
                  "Customer asked for extra work. I did it. Now I'm arguing about what was included vs. what wasn't."
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="font-semibold text-sm">ProInvoice Solution:</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Send change order bid on-site</strong> before you start extra work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Client approves digitally</strong> (no disputes later)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Auto-converts to invoice</strong> when done</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Personas */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Built for the Pros
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Whether you're solo or running a crew, ProInvoice keeps your cashflow moving.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <div className="bg-card rounded-lg p-6 border border-border text-center hover:border-primary transition-colors">
                <Hammer className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Independent Contractors</h3>
                <p className="text-sm text-muted-foreground">Stop chasing checks. Track every job, every dollar.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border text-center hover:border-primary transition-colors">
                <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Subcontractors</h3>
                <p className="text-sm text-muted-foreground">Protect your cashflow — turn change orders into instant payments.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border text-center hover:border-primary transition-colors">
                <HardHat className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Home Service Pros</h3>
                <p className="text-sm text-muted-foreground">Keep your hands on the tools, not on the keyboard.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border text-center hover:border-primary transition-colors">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Small GC Firms</h3>
                <p className="text-sm text-muted-foreground">Track multiple jobs, deposits, and team invoices in one dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Field Workflow */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                  <Wrench className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Built for Your Workflow</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                From Job Site to Bank Account in 3 Steps
              </h2>
              <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
                No office. No laptop. Just your phone and a few taps.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl z-10">
                    1
                  </div>
                  <div className="bg-card rounded-lg p-8 border-2 border-primary/20 h-full pt-12">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                      <FileCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-center">Send Job Bid On-Site</h3>
                    <p className="text-muted-foreground text-center text-sm">
                      Customer asks for a quote? Pull out your phone. Fill in the work details. Send professional bid in 60 seconds.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -top-4 -left-4 bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl z-10">
                    2
                  </div>
                  <div className="bg-card rounded-lg p-8 border-2 border-accent/20 h-full pt-12">
                    <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                      <Handshake className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-center">Collect Deposit Before You Start</h3>
                    <p className="text-muted-foreground text-center text-sm">
                      Customer approves? Boom. They pay deposit right there (50% typical). Money hits your account before you pick up tools.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -top-4 -left-4 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl z-10">
                    3
                  </div>
                  <div className="bg-card rounded-lg p-8 border-2 border-primary/20 h-full pt-12">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                      <Receipt className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-center">Invoice & Get Paid Same Day</h3>
                    <p className="text-muted-foreground text-center text-sm">
                      Job done? Tap "Invoice". Send from your phone. Customer pays the balance. You drive home paid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/estimate")}
                  className="text-lg px-12 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Try It Right Now — On Your Phone
                </Button>
                <p className="text-sm text-muted-foreground mt-4">Works in your truck, on the ladder, anywhere you have signal</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof - Trades Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What Contractors Are Saying
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Real feedback from tradespeople who stopped waiting 30+ days to get paid.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Mike R.</p>
                    <p className="text-sm text-muted-foreground">HVAC Contractor</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "I used to wait 45-60 days for commercial GCs to pay me. Now I collect 50% deposit before I order materials. Game changer for cash flow."
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                    <Hammer className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Sarah T.</p>
                    <p className="text-sm text-muted-foreground">Roofing Contractor</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "I do all my invoicing from my truck now. Customer signs off, I send invoice from my phone, they pay on the spot. No more driving back to the office."
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                    <HardHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Carlos M.</p>
                    <p className="text-sm text-muted-foreground">Electrical Subcontractor</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Change orders used to be a nightmare. Now I send a digital bid right there on site. Customer approves. I have it in writing. No disputes."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <HardHat className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                You Built Your Business With Your Hands.
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Let ProInvoice make sure you get paid for every hour of it—without the paperwork, waiting, or chasing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/estimate")}
                  className="text-lg px-12 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Try It Now — Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/pricing")}
                  className="text-lg px-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  See Pricing
                </Button>
              </div>
              <p className="text-sm opacity-75">
                ✓ No credit card required • ✓ Works on your phone • ✓ Set up in 60 seconds
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
