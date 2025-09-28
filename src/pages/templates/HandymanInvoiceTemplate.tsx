import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const HandymanInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Handyman');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default HandymanInvoiceTemplate;