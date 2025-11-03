import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEstimateData } from "@/hooks/useEstimateData";
import EstimateForm from "@/components/EstimateForm";
import { FileText, Send, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Estimate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { estimateData, updateEstimateData, saveEstimate, calculateTotals } = useEstimateData();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveEstimate = async () => {
    setIsSaving(true);
    try {
      const result = await saveEstimate();
      if (result) {
        // Reset form
        navigate(`/estimates/${result.id}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Create Estimate</h1>
          </div>
          <p className="text-muted-foreground">
            Create a professional estimate and send it to your client. They can pay the deposit to convert it to an invoice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              <EstimateForm
                data={estimateData}
                onUpdate={updateEstimateData}
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft sticky top-24 space-y-6">
              {/* Estimate Summary */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Estimate Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax ({estimateData.taxRate}%):</span>
                    <span className="font-medium">${totals.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-lg">${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Deposit Info */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 space-y-2">
                  <div className="text-sm font-medium">Deposit Required</div>
                  <div className="text-2xl font-bold text-accent">
                    ${totals.depositAmount.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {estimateData.depositPercentage}% of total
                  </div>
                </div>

                {/* Client Info */}
                <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                  <div className="text-sm font-medium">Client</div>
                  <div className="text-sm">
                    <div className="font-medium">{estimateData.clientName || "Not specified"}</div>
                    <div className="text-muted-foreground text-xs">{estimateData.clientEmail || "No email"}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-border">
                <Button
                  onClick={handleSaveEstimate}
                  disabled={isSaving}
                  className="w-full"
                  size="lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save & Share"}
                </Button>
                <Button
                  onClick={() => navigate("/estimates")}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs space-y-2">
                <div className="font-semibold text-blue-900 dark:text-blue-100">💡 Pro Tip</div>
                <p className="text-blue-800 dark:text-blue-200">
                  After saving, you'll get a shareable link to send to your client. Once they pay the deposit, an invoice will be automatically created.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimate;

