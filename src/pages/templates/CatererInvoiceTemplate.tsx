import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const CatererInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Caterer');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default CatererInvoiceTemplate;