import CleanTemplate from "@/components/templates/CleanTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import TradesTemplate from "@/components/templates/TradesTemplate";

interface InvoicePreviewProps {
  data: any;
}

const InvoicePreview = ({ data }: InvoicePreviewProps) => {
  const renderTemplate = () => {
    switch (data.template) {
      case "Modern":
        return <ModernTemplate data={data} />;
      case "Trades":
        return <TradesTemplate data={data} />;
      default:
        return <CleanTemplate data={data} />;
    }
  };

  return (
    <div className="relative">
      {/* Print styles */}
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            .print-page { 
              min-height: 100vh; 
              page-break-after: always;
              margin: 0;
              padding: 20px;
              background: white !important;
            }
            body { margin: 0; padding: 0; }
          }
        `}
      </style>
      
      <div className="print-page bg-invoice-paper border border-invoice-border rounded-lg shadow-medium overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default InvoicePreview;