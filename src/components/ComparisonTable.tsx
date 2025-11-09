import { Check } from "lucide-react";

const ComparisonTable = () => {
  return (
    <div className="bg-card border border-invoice-border rounded-lg overflow-hidden shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-light">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Feature</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Invoice Generator</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground/80">Zoho Invoice</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground/80">Wave</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground/80">Invoice Simple</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-3 text-sm font-medium">Invoice Creation Speed</td>
              <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">30 seconds</span></td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">2-3 minutes</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">2-3 minutes</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">1-2 minutes</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="px-4 py-3 text-sm font-medium">Payment Integration</td>
              <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">Stripe Native</span></td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">External setup</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">Limited</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">Basic</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-medium">Customer Payment Clicks</td>
              <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">2 clicks</span></td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">5+ clicks</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">4+ clicks</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">Manual setup</td>
            </tr>
            <tr className="bg-muted/20">
              <td className="px-4 py-3 text-sm font-medium">Auto Payment Reminders</td>
              <td className="px-4 py-3 text-center text-sm"><Check className="w-4 h-4 text-primary mx-auto" /></td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">Premium only</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">Limited</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">No</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-medium">Free Plan Invoices</td>
              <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">3/month</span></td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">Unlimited*</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">Unlimited*</td>
              <td className="px-4 py-3 text-center text-sm text-foreground/70">5/month</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-muted/10 text-xs text-foreground/70">
        * Free competitors require complex setup and lack embedded payment features
      </div>
    </div>
  );
};

export default ComparisonTable;