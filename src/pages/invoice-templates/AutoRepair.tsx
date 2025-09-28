import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const AutoRepairInvoiceTemplate = () => {
  const template = getTemplateBySlug('auto-repair');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default AutoRepairInvoiceTemplate;