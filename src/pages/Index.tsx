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
  CheckCircle2
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
                Finish the Job. Get Paid.<br />
                <span className="text-primary">No More Waiting 30 Days.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                ProInvoice automates bids, deposits, and progress payments for contractors and subs — without the spreadsheets or headaches.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/get-started")}
                  className="text-lg px-8"
                >
                  Start Free — Send Your First Bid in 60 Seconds
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/pricing")}
                  className="text-lg px-8"
                >
                  View Pricing
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Because waiting 60 days to get paid isn't a business model.
              </p>
            </div>
          </div>
        </section>

        {/* Core Use Cases */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Everything You Need to Get Paid Faster
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Bids & Change Orders */}
              <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">🧾 Send Bids & Change Orders Instantly</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Create and send professional job bids in seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Clients approve or request changes digitally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Auto-upgrade approved bids into invoices</span>
                  </li>
                </ul>
              </div>

              {/* Deposits & Progress Payments */}
              <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">💰 Collect Deposits & Progress Payments Automatically</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Request deposits before work starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Trigger progress invoices at milestones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Auto-generate receipts after payment</span>
                  </li>
                </ul>
              </div>

              {/* Compliance & Docs */}
              <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">📁 Keep Documents & Compliance in Check</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Upload licenses, insurance, and permits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Get reminded before they expire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Share docs directly with clients from one dashboard</span>
                  </li>
                </ul>
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

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Why Contractors Choose ProInvoice
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">No more 60-day waits</h3>
                  <p className="text-muted-foreground">Get deposits upfront and progress payments on schedule</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-accent/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Get your deposit before picking up a hammer</h3>
                  <p className="text-muted-foreground">Protect your time and materials with automated deposit collection</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Turn every change order into a paid job step</h3>
                  <p className="text-muted-foreground">Instantly create and approve change orders digitally</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                You built your business with your hands.
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Let ProInvoice make sure you get paid for every hour of it.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate("/get-started")}
                className="text-lg px-12"
              >
                Start Free — No Credit Card Required
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
