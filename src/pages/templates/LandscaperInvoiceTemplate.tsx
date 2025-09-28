import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const LandscaperInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Landscaper');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default LandscaperInvoiceTemplate;