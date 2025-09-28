import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogoUpload } from "@/components/LogoUpload";
import { Plus, Trash2, Building, User, FileText, Calculator } from "lucide-react";

interface InvoiceFormProps {
  data: any;
  onUpdate: (path: string, value: any) => void;
}

const InvoiceForm = ({ data, onUpdate }: InvoiceFormProps) => {
  const isPaidUser = data.userProfile?.subscription_status !== 'free';
  const addLineItem = () => {
    const newItems = [...data.items, { description: "", qty: 1, rate: 0, taxable: true }];
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

  return (
    <div className="space-y-8">
      {/* Business Information */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Building className="w-5 h-5 text-invoice-brand" />
          <h3 className="text-lg font-semibold">Your Business</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="business-name">Business Name</Label>
            <Input
              id="business-name"
              value={data.business.name}
              onChange={(e) => onUpdate("business.name", e.target.value)}
              placeholder="Your Company Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="business-email">Email</Label>
            <Input
              id="business-email"
              type="email"
              value={data.business.email}
              onChange={(e) => onUpdate("business.email", e.target.value)}
              placeholder="contact@yourcompany.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="business-phone">Phone</Label>
            <Input
              id="business-phone"
              value={data.business.phone}
              onChange={(e) => onUpdate("business.phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="business-website">Website (Optional)</Label>
            <Input
              id="business-website"
              value={data.business.website}
              onChange={(e) => onUpdate("business.website", e.target.value)}
              placeholder="www.yourcompany.com"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="business-address">Address</Label>
            <Textarea
              id="business-address"
              value={data.business.address}
              onChange={(e) => onUpdate("business.address", e.target.value)}
              placeholder="123 Business St, Suite 100, City, State 12345"
              className="mt-1"
              rows={2}
            />
          </div>
          <div className="md:col-span-2">
            <LogoUpload
              currentLogoUrl={data.business.logoUrl}
              onLogoChange={(logoUrl) => onUpdate("business.logoUrl", logoUrl)}
              disabled={!isPaidUser}
            />
          </div>
        </div>
      </section>

      {/* Client Information */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-invoice-brand" />
          <h3 className="text-lg font-semibold">Bill To</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client-name">Client Name</Label>
            <Input
              id="client-name"
              value={data.client.name}
              onChange={(e) => onUpdate("client.name", e.target.value)}
              placeholder="John Smith"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="client-company">Company (Optional)</Label>
            <Input
              id="client-company"
              value={data.client.company}
              onChange={(e) => onUpdate("client.company", e.target.value)}
              placeholder="Client Company Inc."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="client-email">Email</Label>
            <Input
              id="client-email"
              type="email"
              value={data.client.email}
              onChange={(e) => onUpdate("client.email", e.target.value)}
              placeholder="client@company.com"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="client-address">Address</Label>
            <Textarea
              id="client-address"
              value={data.client.address}
              onChange={(e) => onUpdate("client.address", e.target.value)}
              placeholder="456 Client Ave, City, State 12345"
              className="mt-1"
              rows={2}
            />
          </div>
        </div>
      </section>

      {/* Invoice Meta */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-invoice-brand" />
          <h3 className="text-lg font-semibold">Invoice Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoice-number">Invoice Number</Label>
            <Input
              id="invoice-number"
              value={data.meta.number}
              onChange={(e) => onUpdate("meta.number", e.target.value)}
              placeholder="INV-1001"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="issue-date">Issue Date</Label>
            <Input
              id="issue-date"
              type="date"
              value={data.meta.issueDate}
              onChange={(e) => onUpdate("meta.issueDate", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="due-date">Due Date</Label>
            <Input
              id="due-date"
              type="date"
              value={data.meta.dueDate}
              onChange={(e) => onUpdate("meta.dueDate", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="payment-terms">Payment Terms</Label>
            <select
              id="payment-terms"
              value={data.meta.terms}
              onChange={(e) => onUpdate("meta.terms", e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Due on receipt">Due on receipt</option>
              <option value="Net 7">Net 7</option>
              <option value="Net 14">Net 14</option>
              <option value="Net 30">Net 30</option>
              <option value="Net 60">Net 60</option>
              <option value="Net 90">Net 90</option>
            </select>
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

      {/* Totals */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Totals & Adjustments</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="tax-rate">Tax Rate (%)</Label>
            <Input
              id="tax-rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={data.totals.taxRate}
              onChange={(e) => onUpdate("totals.taxRate", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="discount">Discount ($)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              value={data.totals.discount}
              onChange={(e) => onUpdate("totals.discount", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="shipping">Shipping/Other ($)</Label>
            <Input
              id="shipping"
              type="number"
              min="0"
              step="0.01"
              value={data.totals.shipping}
              onChange={(e) => onUpdate("totals.shipping", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-4">
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={data.notes}
            onChange={(e) => onUpdate("notes", e.target.value)}
            placeholder="Thank you for your business! Payment instructions, terms, or additional notes..."
            className="mt-1"
            rows={3}
          />
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Customization</h3>
        
        <div className="flex items-center space-x-4">
          <div>
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                id="accent-color"
                type="color"
                value={data.accent}
                onChange={(e) => onUpdate("accent", e.target.value)}
                className="w-10 h-10 rounded border border-input"
              />
              <Input
                value={data.accent}
                onChange={(e) => onUpdate("accent", e.target.value)}
                placeholder="#3b82f6"
                className="w-24"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="watermark"
              checked={data.watermark}
              onChange={(e) => onUpdate("watermark", e.target.checked)}
              className="rounded"
              disabled={!isPaidUser}
            />
            <Label htmlFor="watermark">
              {isPaidUser 
                ? "Show draft watermark" 
                : "Watermark (Free users show 'PREVIEW' after first invoice)"
              }
            </Label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoiceForm;