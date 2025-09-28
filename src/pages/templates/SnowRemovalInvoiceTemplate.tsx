import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const SnowRemovalInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Snow Removal');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default SnowRemovalInvoiceTemplate;