import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Building, User, FileText, Calculator, AlertCircle } from "lucide-react";
import { 
  sanitizeInput, 
  businessInfoSchema, 
  clientInfoSchema, 
  invoiceMetaSchema,
  lineItemSchema,
  invoiceTotalsSchema,
  validateField
} from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

interface ValidatedInvoiceFormProps {
  data: any;
  onUpdate: (path: string, value: any) => void;
}

const ValidatedInvoiceForm = ({ data, onUpdate }: ValidatedInvoiceFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationTimeout, setValidationTimeout] = useState<Record<string, NodeJS.Timeout>>({});
  const { toast } = useToast();

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

  // Debounced validation function
  const validateFieldWithDelay = async (fieldPath: string, value: any, schema: any) => {
    // Clear existing timeout
    if (validationTimeout[fieldPath]) {
      clearTimeout(validationTimeout[fieldPath]);
    }

    // Set new timeout for validation
    const timeout = setTimeout(async () => {
      const result = await validateField(schema, value);
      setErrors(prev => ({
        ...prev,
        [fieldPath]: result.isValid ? '' : result.error || ''
      }));
    }, 300); // 300ms delay

    setValidationTimeout(prev => ({
      ...prev,
      [fieldPath]: timeout
    }));
  };

  // Enhanced input handlers with validation and sanitization
  const handleBusinessUpdate = (field: string, value: string) => {
    let sanitizedValue = value;

    switch (field) {
      case 'name':
        sanitizedValue = sanitizeInput.text(value);
        validateFieldWithDelay(`business.${field}`, sanitizedValue, businessInfoSchema.shape.name);
        break;
      case 'email':
        sanitizedValue = sanitizeInput.email(value);
        validateFieldWithDelay(`business.${field}`, sanitizedValue, businessInfoSchema.shape.email);
        break;
      case 'phone':
        sanitizedValue = sanitizeInput.phone(value);
        if (sanitizedValue) {
          validateFieldWithDelay(`business.${field}`, sanitizedValue, businessInfoSchema.shape.phone);
        }
        break;
      case 'website':
        sanitizedValue = sanitizeInput.url(value);
        if (sanitizedValue) {
          validateFieldWithDelay(`business.${field}`, sanitizedValue, businessInfoSchema.shape.website);
        }
        break;
      case 'address':
        sanitizedValue = sanitizeInput.text(value);
        if (sanitizedValue) {
          validateFieldWithDelay(`business.${field}`, sanitizedValue, businessInfoSchema.shape.address);
        }
        break;
    }

    onUpdate(`business.${field}`, sanitizedValue);
  };

  const handleClientUpdate = (field: string, value: string) => {
    let sanitizedValue = value;

    switch (field) {
      case 'name':
        sanitizedValue = sanitizeInput.text(value);
        validateFieldWithDelay(`client.${field}`, sanitizedValue, clientInfoSchema.shape.name);
        break;
      case 'company':
        sanitizedValue = sanitizeInput.text(value);
        if (sanitizedValue) {
          validateFieldWithDelay(`client.${field}`, sanitizedValue, clientInfoSchema.shape.company);
        }
        break;
      case 'email':
        sanitizedValue = sanitizeInput.email(value);
        validateFieldWithDelay(`client.${field}`, sanitizedValue, clientInfoSchema.shape.email);
        break;
      case 'address':
        sanitizedValue = sanitizeInput.text(value);
        if (sanitizedValue) {
          validateFieldWithDelay(`client.${field}`, sanitizedValue, clientInfoSchema.shape.address);
        }
        break;
    }

    onUpdate(`client.${field}`, sanitizedValue);
  };

  const handleMetaUpdate = (field: string, value: string) => {
    let sanitizedValue = value;

    switch (field) {
      case 'number':
        sanitizedValue = value.trim().replace(/[^A-Za-z0-9\-_]/g, '').substring(0, 50);
        validateFieldWithDelay(`meta.${field}`, sanitizedValue, invoiceMetaSchema.shape.number);
        break;
      case 'issueDate':
        sanitizedValue = value;
        validateFieldWithDelay(`meta.${field}`, sanitizedValue, invoiceMetaSchema.shape.issueDate);
        break;
      case 'dueDate':
        sanitizedValue = value;
        validateFieldWithDelay(`meta.${field}`, sanitizedValue, invoiceMetaSchema.shape.dueDate);
        break;
      case 'terms':
        sanitizedValue = sanitizeInput.text(value);
        validateFieldWithDelay(`meta.${field}`, sanitizedValue, invoiceMetaSchema.shape.terms);
        break;
    }

    onUpdate(`meta.${field}`, sanitizedValue);
  };

  const handleLineItemUpdate = (index: number, field: string, value: any) => {
    let sanitizedValue = value;

    if (field === 'description') {
      sanitizedValue = sanitizeInput.text(value);
      validateFieldWithDelay(`item.${index}.${field}`, sanitizedValue, lineItemSchema.shape.description);
    } else if (field === 'qty') {
      const numValue = parseFloat(value) || 0;
      sanitizedValue = Math.max(0, Math.min(999999, numValue));
      validateFieldWithDelay(`item.${index}.${field}`, sanitizedValue, lineItemSchema.shape.qty);
    } else if (field === 'rate') {
      const numValue = parseFloat(value) || 0;
      sanitizedValue = Math.max(0, Math.min(999999, numValue));
      validateFieldWithDelay(`item.${index}.${field}`, sanitizedValue, lineItemSchema.shape.rate);
    }

    updateLineItem(index, field, sanitizedValue);
  };

  const handleTotalsUpdate = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    let sanitizedValue = numValue;

    if (field === 'taxRate') {
      sanitizedValue = Math.max(0, Math.min(100, numValue));
      validateFieldWithDelay(`totals.${field}`, sanitizedValue, invoiceTotalsSchema.shape.taxRate);
    } else if (field === 'discount') {
      sanitizedValue = Math.max(0, Math.min(999999, numValue));
      validateFieldWithDelay(`totals.${field}`, sanitizedValue, invoiceTotalsSchema.shape.discount);
    } else if (field === 'shipping') {
      sanitizedValue = Math.max(0, Math.min(999999, numValue));
      validateFieldWithDelay(`totals.${field}`, sanitizedValue, invoiceTotalsSchema.shape.shipping);
    }

    onUpdate(`totals.${field}`, sanitizedValue);
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <div className="flex items-center text-sm text-destructive mt-1">
        <AlertCircle className="w-3 h-3 mr-1" />
        {error}
      </div>
    );
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(validationTimeout).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [validationTimeout]);

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
            <Label htmlFor="business-name">Business Name *</Label>
            <Input
              id="business-name"
              value={data.business.name}
              onChange={(e) => handleBusinessUpdate('name', e.target.value)}
              placeholder="Your Company Name"
              className="mt-1"
              maxLength={100}
              required
            />
            <ErrorMessage error={errors['business.name']} />
          </div>
          <div>
            <Label htmlFor="business-email">Email *</Label>
            <Input
              id="business-email"
              type="email"
              value={data.business.email}
              onChange={(e) => handleBusinessUpdate('email', e.target.value)}
              placeholder="contact@yourcompany.com"
              className="mt-1"
              maxLength={255}
              required
            />
            <ErrorMessage error={errors['business.email']} />
          </div>
          <div>
            <Label htmlFor="business-phone">Phone</Label>
            <Input
              id="business-phone"
              type="tel"
              value={data.business.phone}
              onChange={(e) => handleBusinessUpdate('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
              maxLength={20}
            />
            <ErrorMessage error={errors['business.phone']} />
          </div>
          <div>
            <Label htmlFor="business-website">Website</Label>
            <Input
              id="business-website"
              type="url"
              value={data.business.website}
              onChange={(e) => handleBusinessUpdate('website', e.target.value)}
              placeholder="www.yourcompany.com"
              className="mt-1"
              maxLength={255}
            />
            <ErrorMessage error={errors['business.website']} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="business-address">Address</Label>
            <Textarea
              id="business-address"
              value={data.business.address}
              onChange={(e) => handleBusinessUpdate('address', e.target.value)}
              placeholder="123 Business St, Suite 100, City, State 12345"
              className="mt-1"
              rows={2}
              maxLength={500}
            />
            <ErrorMessage error={errors['business.address']} />
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
            <Label htmlFor="client-name">Client Name *</Label>
            <Input
              id="client-name"
              value={data.client.name}
              onChange={(e) => handleClientUpdate('name', e.target.value)}
              placeholder="John Smith"
              className="mt-1"
              maxLength={100}
              required
            />
            <ErrorMessage error={errors['client.name']} />
          </div>
          <div>
            <Label htmlFor="client-company">Company</Label>
            <Input
              id="client-company"
              value={data.client.company}
              onChange={(e) => handleClientUpdate('company', e.target.value)}
              placeholder="Client Company Inc."
              className="mt-1"
              maxLength={100}
            />
            <ErrorMessage error={errors['client.company']} />
          </div>
          <div>
            <Label htmlFor="client-email">Email *</Label>
            <Input
              id="client-email"
              type="email"
              value={data.client.email}
              onChange={(e) => handleClientUpdate('email', e.target.value)}
              placeholder="client@company.com"
              className="mt-1"
              maxLength={255}
              required
            />
            <ErrorMessage error={errors['client.email']} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="client-address">Address</Label>
            <Textarea
              id="client-address"
              value={data.client.address}
              onChange={(e) => handleClientUpdate('address', e.target.value)}
              placeholder="456 Client Ave, City, State 12345"
              className="mt-1"
              rows={2}
              maxLength={500}
            />
            <ErrorMessage error={errors['client.address']} />
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
            <Label htmlFor="invoice-number">Invoice Number *</Label>
            <Input
              id="invoice-number"
              value={data.meta.number}
              onChange={(e) => handleMetaUpdate('number', e.target.value)}
              placeholder="INV-1001"
              className="mt-1"
              maxLength={50}
              required
            />
            <ErrorMessage error={errors['meta.number']} />
          </div>
          <div>
            <Label htmlFor="issue-date">Issue Date *</Label>
            <Input
              id="issue-date"
              type="date"
              value={data.meta.issueDate}
              onChange={(e) => handleMetaUpdate('issueDate', e.target.value)}
              className="mt-1"
              required
            />
            <ErrorMessage error={errors['meta.issueDate']} />
          </div>
          <div>
            <Label htmlFor="due-date">Due Date *</Label>
            <Input
              id="due-date"
              type="date"
              value={data.meta.dueDate}
              onChange={(e) => handleMetaUpdate('dueDate', e.target.value)}
              className="mt-1"
              required
            />
            <ErrorMessage error={errors['meta.dueDate']} />
          </div>
          <div>
            <Label htmlFor="payment-terms">Payment Terms *</Label>
            <select
              id="payment-terms"
              value={data.meta.terms}
              onChange={(e) => handleMetaUpdate('terms', e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="Due on receipt">Due on receipt</option>
              <option value="Net 7">Net 7</option>
              <option value="Net 14">Net 14</option>
              <option value="Net 30">Net 30</option>
              <option value="Net 60">Net 60</option>
              <option value="Net 90">Net 90</option>
            </select>
            <ErrorMessage error={errors['meta.terms']} />
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
            <div key={index} className="grid grid-cols-12 gap-3 items-start p-4 bg-secondary/50 rounded-lg">
              <div className="col-span-12 md:col-span-6">
                <Label htmlFor={`item-desc-${index}`}>Description *</Label>
                <Input
                  id={`item-desc-${index}`}
                  value={item.description}
                  onChange={(e) => handleLineItemUpdate(index, "description", e.target.value)}
                  placeholder="Service or product description"
                  className="mt-1"
                  maxLength={500}
                  required
                />
                <ErrorMessage error={errors[`item.${index}.description`]} />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Label htmlFor={`item-qty-${index}`}>Quantity *</Label>
                <Input
                  id={`item-qty-${index}`}
                  type="number"
                  min="0"
                  max="999999"
                  step="0.01"
                  value={item.qty}
                  onChange={(e) => handleLineItemUpdate(index, "qty", e.target.value)}
                  className="mt-1"
                  required
                />
                <ErrorMessage error={errors[`item.${index}.qty`]} />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Label htmlFor={`item-rate-${index}`}>Rate *</Label>
                <Input
                  id={`item-rate-${index}`}
                  type="number"
                  min="0"
                  max="999999"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => handleLineItemUpdate(index, "rate", e.target.value)}
                  className="mt-1"
                  required
                />
                <ErrorMessage error={errors[`item.${index}.rate`]} />
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
              onChange={(e) => handleTotalsUpdate("taxRate", e.target.value)}
              className="mt-1"
            />
            <ErrorMessage error={errors['totals.taxRate']} />
          </div>
          <div>
            <Label htmlFor="discount">Discount ($)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max="999999"
              step="0.01"
              value={data.totals.discount}
              onChange={(e) => handleTotalsUpdate("discount", e.target.value)}
              className="mt-1"
            />
            <ErrorMessage error={errors['totals.discount']} />
          </div>
          <div>
            <Label htmlFor="shipping">Shipping/Other ($)</Label>
            <Input
              id="shipping"
              type="number"
              min="0"
              max="999999"
              step="0.01"
              value={data.totals.shipping}
              onChange={(e) => handleTotalsUpdate("shipping", e.target.value)}
              className="mt-1"
            />
            <ErrorMessage error={errors['totals.shipping']} />
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
            onChange={(e) => {
              const sanitizedValue = sanitizeInput.text(e.target.value);
              onUpdate("notes", sanitizedValue);
            }}
            placeholder="Thank you for your business! Payment instructions, terms, or additional notes..."
            className="mt-1"
            rows={3}
            maxLength={1000}
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
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#([A-Fa-f0-9]{0,6})$/.test(value)) {
                    onUpdate("accent", value);
                  }
                }}
                placeholder="#3b82f6"
                className="w-24"
                maxLength={7}
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
            />
            <Label htmlFor="watermark">Show watermark (Free tier)</Label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValidatedInvoiceForm;