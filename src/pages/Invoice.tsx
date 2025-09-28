import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ValidatedInvoiceForm from "../components/ValidatedInvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, ArrowLeft, Save, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useInvoiceData } from "@/hooks/useInvoiceData";
import { useToast } from "@/hooks/use-toast";

const Invoice = () => {
  const { user, signOut } = useAuth();
  const { invoiceData, updateInvoiceData, saveInvoice, subscription } = useInvoiceData();
  const { toast } = useToast();

  const downloadPDF = async () => {
    const invoiceElement = document.getElementById('invoice-preview');
    if (!invoiceElement) return;

    try {
      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`invoice-${invoiceData.meta.number}.pdf`);

      toast({
        title: "PDF Downloaded",
        description: `Invoice ${invoiceData.meta.number} has been downloaded successfully.`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveInvoice = async () => {
    const savedInvoiceId = await saveInvoice();
    if (savedInvoiceId) {
      // Optionally redirect to a saved invoices list or show success
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-invoice-brand" />
              <h1 className="text-xl font-semibold">Create Invoice</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>•</span>
              <span>{user?.email}</span>
              {subscription && (
                <>
                  <span>•</span>
                  <span className="capitalize font-medium">{subscription.plan}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label htmlFor="template-select" className="text-sm font-medium">Template:</label>
              <Select
                value={invoiceData.template}
                onValueChange={(value: "Clean" | "Modern" | "Trades") => updateInvoiceData("template", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clean">Clean</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Trades">Trades</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Link to="/templates">
              <Button variant="outline" size="sm">
                Templates
              </Button>
            </Link>
            
            <Button onClick={handleSaveInvoice} variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            <Button onClick={downloadPDF} className="bg-invoice-brand hover:bg-invoice-brand/90">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            
            <Button onClick={handleSignOut} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
            <ValidatedInvoiceForm
              data={invoiceData}
              onUpdate={updateInvoiceData}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full lg:w-1/2 p-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft sticky top-6">
            <div className="p-4 border-b border-border bg-secondary/50">
              <h2 className="font-semibold text-lg">Invoice Preview</h2>
              <p className="text-sm text-muted-foreground">Live preview of your invoice</p>
            </div>
            
            <div className="p-6 max-h-[80vh] overflow-auto">
              <div id="invoice-preview">
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