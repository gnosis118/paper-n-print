import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const MakeupArtistInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Makeup Artist');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default MakeupArtistInvoiceTemplate;