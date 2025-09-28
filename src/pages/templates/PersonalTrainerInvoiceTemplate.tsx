import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const PersonalTrainerInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Personal Trainer');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default PersonalTrainerInvoiceTemplate;