import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const RoofingInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Roofing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default RoofingInvoiceTemplate;