import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const HairStylistInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Hair Stylist');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default HairStylistInvoiceTemplate;