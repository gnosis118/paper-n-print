import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const CarDetailingInvoiceTemplate = () => {
  const template = getTemplateBySlug('car-detailing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default CarDetailingInvoiceTemplate;