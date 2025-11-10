import { Shield, Lock, CreditCard } from "lucide-react";

const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 py-8">
      <div className="flex items-center gap-2 text-foreground/70">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-sm font-medium">Bank-Level Security</span>
      </div>
      <div className="flex items-center gap-2 text-foreground/70">
        <Lock className="h-6 w-6 text-primary" />
        <span className="text-sm font-medium">256-Bit SSL</span>
      </div>
      <div className="flex items-center gap-2 text-foreground/70">
        <CreditCard className="h-6 w-6 text-primary" />
        <span className="text-sm font-medium">Powered by Stripe</span>
      </div>
    </div>
  );
};

export default TrustBadges;