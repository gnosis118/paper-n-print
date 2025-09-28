import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const LandscapingInvoiceTemplate = () => {
  const template = getTemplateBySlug('landscaping');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default LandscapingInvoiceTemplate;