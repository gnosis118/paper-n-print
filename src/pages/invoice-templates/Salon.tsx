import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const SalonInvoiceTemplate = () => {
  const template = getTemplateBySlug('salon');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default SalonInvoiceTemplate;