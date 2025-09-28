import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const PhotographerInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Photographer');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default PhotographerInvoiceTemplate;