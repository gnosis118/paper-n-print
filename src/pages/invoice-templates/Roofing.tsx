import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const RoofingInvoiceTemplate = () => {
  const template = getTemplateBySlug('roofing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default RoofingInvoiceTemplate;