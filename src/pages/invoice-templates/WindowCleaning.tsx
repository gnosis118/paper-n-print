import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const WindowCleaningInvoiceTemplate = () => {
  const template = getTemplateBySlug('window-cleaning');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default WindowCleaningInvoiceTemplate;