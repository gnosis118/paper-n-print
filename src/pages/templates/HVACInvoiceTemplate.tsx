import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const HVACInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'HVAC');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default HVACInvoiceTemplate;