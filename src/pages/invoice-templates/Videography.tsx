import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const VideographyInvoiceTemplate = () => {
  const template = getTemplateBySlug('videography');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default VideographyInvoiceTemplate;