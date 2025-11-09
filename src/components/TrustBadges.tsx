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
      <div className="flex items-center gap-3">
        <svg className="h-8 w-auto" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.3 10.7c0-.7-.5-1.1-1.4-1.1-.9 0-1.5.4-1.5 1 0 .5.4.8 1.3 1l.9.2c1.6.3 2.4 1 2.4 2.2 0 1.5-1.3 2.5-3.2 2.5-2 0-3.3-1-3.4-2.5h1.6c.1.7.7 1.1 1.8 1.1s1.7-.4 1.7-1c0-.5-.3-.8-1.3-1l-1-.2c-1.5-.3-2.3-1-2.3-2.2 0-1.4 1.2-2.4 3-2.4 1.9 0 3 1 3.1 2.4h-1.7zm4.5-2.3h1.5v1.4h-1.5v4.3c0 .7.3 1 1 1 .2 0 .4 0 .5-.1v1.3c-.2.1-.6.1-1 .1-1.4 0-2.1-.6-2.1-1.9v-4.7h-1.3V8.4h.4c.8 0 1.1-.5 1.1-1.2v-1h1.4v2.2zm3.7-2.2h1.6v1.5h.1c.5-1 1.4-1.6 2.6-1.6.3 0 .5 0 .7.1v1.6c-.2-.1-.6-.1-.9-.1-1.4 0-2.4 1-2.4 2.4v4.8h-1.7V6.2zm6 0h1.7v8.6h-1.7V6.2zm0-3.3h1.7v1.8h-1.7V2.9zm5.9 0v5.4h.1c.5-1 1.4-1.6 2.7-1.6 1.9 0 3 1.3 3 3.5v5.5h-1.7V10c0-1.5-.7-2.3-2-2.3-1.3 0-2.2 1-2.2 2.4v4.7h-1.7V2.9h1.8zm14.1 7.6c0 2.8-1.5 4.7-3.8 4.7-1.3 0-2.4-.6-2.9-1.6h-.1v4.5h-1.7V6.2h1.6v1.5h.1c.5-1 1.6-1.6 2.9-1.6 2.3 0 3.9 1.9 3.9 4.7zm-1.8 0c0-2-1-3.2-2.5-3.2s-2.5 1.3-2.5 3.2c0 1.9 1 3.2 2.5 3.2s2.5-1.3 2.5-3.2z" fill="#635BFF"/>
        </svg>
      </div>
    </div>
  );
};

export default TrustBadges;