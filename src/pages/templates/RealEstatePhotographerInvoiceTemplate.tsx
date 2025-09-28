import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const RealEstatePhotographerInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Real Estate Photographer');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default RealEstatePhotographerInvoiceTemplate;