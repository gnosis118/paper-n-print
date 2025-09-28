import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const MarketingInvoiceTemplate = () => {
  const template = getTemplateBySlug('marketing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default MarketingInvoiceTemplate;