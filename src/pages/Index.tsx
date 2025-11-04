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
        title="ProInvoice - Contractor Invoicing App | Subcontractor Billing Software"
        description="Finish the job. Get paid. No more waiting. ProInvoice automates your bids, deposits, and progress payments for contractors and tradespeople."
      />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-6">
                  <HardHat className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Built for the Trades</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                  Finish the job. Get paid. No more waiting.
                </h1>
                
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
                  ProInvoice automates your bids, deposits, and progress payments — stop chasing checks and start building.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    onClick={() => navigate("/estimate")}
                    className="text-lg px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                  >
                    Send Your First Bid Free
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate("/pricing")}
                    className="text-lg px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    See Pricing
                  </Button>
                </div>
                
                <p className="text-sm text-primary-foreground/75">
                  ✓ No credit card • ✓ Works on your phone • ✓ Get deposit before you start
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm border border-primary-foreground/20">
                  <div className="bg-background rounded-lg p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">Deposit Received</p>
                          <p className="text-sm text-muted-foreground">Johnson Kitchen Remodel</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Payment Amount</p>
                      <p className="text-3xl font-bold text-foreground">$4,250.00</p>
                      <p className="text-sm text-muted-foreground mt-1">50% deposit • Balance due on completion</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-primary text-primary-foreground">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Start Job
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Receipt className="w-4 h-4 mr-2" />
                        View Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-4">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent-foreground">Speed Up Your Cashflow</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Built for How You Actually Work
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              No more paperwork delays. Get paid as fast as you work.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1: Bid Faster */}
              <div className="bg-card rounded-lg p-8 border-2 border-accent/20 hover:border-accent transition-all">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Bid Faster</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Send professional job bids in 60 seconds — from your phone, on-site, while the customer's still there.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Pre-built templates for your trade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Add photos & notes instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Customer approves digitally</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2: Get Paid Upfront */}
              <div className="bg-card rounded-lg p-8 border-2 border-primary/20 hover:border-primary transition-all">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Get Paid Upfront</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Collect deposits before you start. No more buying materials out of pocket and waiting 60 days.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Request 50% deposit (or custom %)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Accept card & ACH payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Money in account before you start</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3: Auto-Invoice Progress */}
              <div className="bg-card rounded-lg p-8 border-2 border-secondary/20 hover:border-secondary transition-all">
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Receipt className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Auto-Invoice Progress</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Set up milestone payments. Invoice automatically when you hit each stage. Get paid as you go.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">25/25/50 or custom splits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Auto-send at each milestone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Track what's paid vs. outstanding</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Built for the Field */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
                <Smartphone className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Mobile-First Design</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Built for the Field
            </h2>
            <p className="text-xl text-primary-foreground/90 text-center mb-16 max-w-2xl mx-auto">
              Because you're on job sites, not in an office. ProInvoice works where you work.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
                <Smartphone className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-3 text-center">Mobile-First</h3>
                <p className="text-primary-foreground/80 text-center text-sm">
                  Works perfectly on your phone. Create bids, send invoices, track payments — all from the job site.
                </p>
              </div>
              
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
                <DollarSign className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-3 text-center">Deposit Tracking</h3>
                <p className="text-primary-foreground/80 text-center text-sm">
                  See exactly what's been paid, what's pending, and what's overdue. Know your cashflow at a glance.
                </p>
              </div>
              
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-3 text-center">Offline Ready</h3>
                <p className="text-primary-foreground/80 text-center text-sm">
                  Start bids even without signal. Everything syncs when you're back online. Never miss a beat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Personas */}
        <section className="py-20 bg-background">
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
