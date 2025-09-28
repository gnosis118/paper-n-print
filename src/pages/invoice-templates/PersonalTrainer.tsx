import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const PersonalTrainerInvoiceTemplate = () => {
  const template = getTemplateBySlug('personal-trainer');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default PersonalTrainerInvoiceTemplate;