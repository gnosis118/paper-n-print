import { Shield, Lock, CreditCard, CheckCircle, Zap } from "lucide-react";

const TrustBadges = () => {
  return (
    <section className="bg-muted/30 py-8 border-y">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-foreground/70">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Bank-Level Security</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Lock className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <CreditCard className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Powered by Stripe</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <CheckCircle className="h-6 w-6 text-success" />
            <span className="text-sm font-medium">PCI Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Zap className="h-6 w-6 text-accent" />
            <span className="text-sm font-medium">Fast & reliable performance</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-3">Accepts major cards via Stripe</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded border shadow-sm">
              <span className="font-bold text-blue-600">VISA</span>
            </div>
            <div className="bg-white px-4 py-2 rounded border shadow-sm">
              <span className="font-bold text-orange-600">Mastercard</span>
            </div>
            <div className="bg-white px-4 py-2 rounded border shadow-sm">
              <span className="font-bold text-blue-500">American Express</span>
            </div>
            <div className="bg-white px-4 py-2 rounded border shadow-sm">
              <span className="font-bold text-purple-600">Discover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;