import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calculator, Percent } from "lucide-react";

interface EstimateFormProps {
  data: any;
  onUpdate: (path: string, value: any) => void;
}

const EstimateForm = ({ data, onUpdate }: EstimateFormProps) => {
  const addLineItem = () => {
    const newItems = [...data.items, { description: "", qty: 1, rate: 0 }];
    onUpdate("items", newItems);
  };

  const removeLineItem = (index: number) => {
    const newItems = data.items.filter((_: any, i: number) => i !== index);
    onUpdate("items", newItems);
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate("items", newItems);
  };

  const calculateTotals = () => {
    const subtotal = data.items.reduce((sum: number, item: any) => sum + (item.qty * item.rate), 0);
    const taxAmount = subtotal * (data.taxRate / 100);
    const total = subtotal + taxAmount;
    const depositAmount = total * (data.depositPercentage / 100);
    
    return { subtotal, taxAmount, total, depositAmount };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Client Information */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-lg font-semibold">Client Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client-name">Client Name *</Label>
            <Input
              id="client-name"
              value={data.clientName}
              onChange={(e) => onUpdate("clientName", e.target.value)}
              placeholder="John Smith"
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="client-email">Email *</Label>
            <Input
              id="client-email"
              type="email"
              value={data.clientEmail}
              onChange={(e) => onUpdate("clientEmail", e.target.value)}
              placeholder="client@company.com"
              className="mt-1"
              required
            />
          </div>
        </div>
      </section>

      {/* Estimate Details */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-lg font-semibold">Estimate Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="estimate-number">Estimate Number</Label>
            <Input
              id="estimate-number"
              value={data.number}
              onChange={(e) => onUpdate("number", e.target.value)}
              placeholder="EST-1001"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="estimate-title">Title (Optional)</Label>
            <Input
              id="estimate-title"
              value={data.title}
              onChange={(e) => onUpdate("title", e.target.value)}
              placeholder="Project Name"
              className="mt-1"
            />
          </div>
        </div>
      </section>

      {/* Line Items */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-invoice-brand" />
            <h3 className="text-lg font-semibold">Line Items</h3>
          </div>
          <Button onClick={addLineItem} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {data.items.map((item: any, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end p-4 bg-secondary/50 rounded-lg">
              <div className="col-span-12 md:col-span-6">
                <Label htmlFor={`item-desc-${index}`}>Description</Label>
                <Input
                  id={`item-desc-${index}`}
                  value={item.description}
                  onChange={(e) => updateLineItem(index, "description", e.target.value)}
                  placeholder="Service or product description"
                  className="mt-1"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Label htmlFor={`item-qty-${index}`}>Quantity</Label>
                <Input
                  id={`item-qty-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.qty}
                  onChange={(e) => updateLineItem(index, "qty", parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Label htmlFor={`item-rate-${index}`}>Rate</Label>
                <Input
                  id={`item-rate-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => updateLineItem(index, "rate", parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div className="col-span-4 md:col-span-2 flex items-center justify-between">
                <div className="text-sm font-medium">
                  ${(item.qty * item.rate).toFixed(2)}
                </div>
                {data.items.length > 1 && (
                  <Button
                    onClick={() => removeLineItem(index)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Taxes & Deposit */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Percent className="w-5 h-5 text-invoice-brand" />
          <h3 className="text-lg font-semibold">Taxes & Deposit</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tax-rate">Tax Rate (%)</Label>
            <Input
              id="tax-rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={data.taxRate}
              onChange={(e) => onUpdate("taxRate", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="deposit-percentage">Deposit Required (%)</Label>
            <Input
              id="deposit-percentage"
              type="number"
              min="0"
              max="100"
              step="1"
              value={data.depositPercentage}
              onChange={(e) => onUpdate("depositPercentage", parseInt(e.target.value) || 30)}
              className="mt-1"
            />
          </div>
        </div>
      </section>

      {/* Totals Summary */}
      <section className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax ({data.taxRate}%):</span>
          <span className="font-medium">${totals.taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t border-primary/20 pt-2 mt-2">
          <span>Total:</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm bg-accent/10 p-2 rounded mt-2">
          <span>Deposit Required ({data.depositPercentage}%):</span>
          <span className="font-semibold text-accent">${totals.depositAmount.toFixed(2)}</span>
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-4">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={data.notes}
          onChange={(e) => onUpdate("notes", e.target.value)}
          placeholder="Add any additional notes or terms..."
          className="mt-1 min-h-24"
        />
      </section>
    </div>
  );
};

export default EstimateForm;

