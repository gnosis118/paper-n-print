import { Zap, FileText, Download } from "lucide-react";

const FeatureGrid = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">30-Second Creation</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          Create professional invoices in 30 seconds with auto-fill and smart templates.
        </p>
      </div>

      <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">2-Click Payments</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          Stripe-powered payment links embedded in every invoice. Customers pay instantly.
        </p>
      </div>

      <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft sm:col-span-2 md:col-span-1">
        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Download className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Auto Reminders</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          Automated payment reminders and follow-ups. Never chase payments again.
        </p>
      </div>
    </div>
  );
};

export default FeatureGrid;