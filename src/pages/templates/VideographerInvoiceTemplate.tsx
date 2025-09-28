import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const VideographerInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Videographer');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default VideographerInvoiceTemplate;