import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const TattooArtistInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Tattoo Artist');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default TattooArtistInvoiceTemplate;