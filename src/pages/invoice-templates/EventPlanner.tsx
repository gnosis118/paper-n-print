import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const EventPlannerInvoiceTemplate = () => {
  const template = getTemplateBySlug('event-planner');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default EventPlannerInvoiceTemplate;