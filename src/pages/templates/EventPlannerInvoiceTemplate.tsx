import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const EventPlannerInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Event Planner');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default EventPlannerInvoiceTemplate;