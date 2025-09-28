import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const LawnCareInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Lawn Care');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default LawnCareInvoiceTemplate;