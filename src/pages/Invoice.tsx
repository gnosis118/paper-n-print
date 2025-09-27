import { useState } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { FileDown, Plus, Settings } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceData {
  business: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  client: {
    name: string;
    company: string;
    email: string;
    address: string;
  };
  meta: {
    number: string;
    issueDate: string;
    dueDate: string;
    terms: string;
  };
  items: Array<{
    description: string;
    qty: number;
    rate: number;
    taxable: boolean;
  }>;
  totals: {
    taxRate: number;
    discount: number;
    shipping: number;
  };
  notes: string;
  template: "Clean" | "Modern" | "Trades";
  accent: string;
  watermark: boolean;
}

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    business: {
      name: "",
      email: "",
      phone: "",
      address: "",
      website: "",
    },
    client: {
      name: "",
      company: "",
      email: "",
      address: "",
    },
    meta: {
      number: "INV-1001",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: "",
      terms: "Net 14",
    },
    items: [
      {
        description: "",
        qty: 1,
        rate: 0,
        taxable: true,
      },
    ],
    totals: {
      taxRate: 0,
      discount: 0,
      shipping: 0,
    },
    notes: "Thank you for your business!",
    template: "Clean",
    accent: "#3b82f6",
    watermark: true,
  });

  const updateInvoiceData = (path: string, value: any) => {
    const keys = path.split(".");
    setInvoiceData((prev) => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const downloadPDF = async () => {
    const previewElement = document.querySelector('.print-page') as HTMLElement;
    if (!previewElement) return;

    try {
      // Create canvas from the preview element
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${invoiceData.meta.number || 'invoice'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to browser print
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-invoice-border bg-invoice-paper shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-invoice-brand">Invoice Generator</h1>
              <span className="text-sm text-muted-foreground">Professional invoices in minutes</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button onClick={downloadPDF} className="bg-invoice-brand hover:bg-invoice-brand/90">
                <FileDown className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-card border border-invoice-border rounded-lg shadow-soft">
              <div className="p-6 border-b border-invoice-border">
                <h2 className="text-lg font-semibold text-card-foreground">Invoice Details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill in your business and client information
                </p>
              </div>
              <div className="p-6">
                <InvoiceForm
                  data={invoiceData}
                  onUpdate={updateInvoiceData}
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-card border border-invoice-border rounded-lg shadow-soft">
              <div className="p-6 border-b border-invoice-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-card-foreground">Live Preview</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      See your invoice as you build it
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Template:</span>
                    <select
                      value={invoiceData.template}
                      onChange={(e) => updateInvoiceData("template", e.target.value)}
                      className="text-sm border border-invoice-border rounded px-2 py-1"
                    >
                      <option value="Clean">Clean</option>
                      <option value="Modern">Modern</option>
                      <option value="Trades">Trades</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <InvoicePreview data={invoiceData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;