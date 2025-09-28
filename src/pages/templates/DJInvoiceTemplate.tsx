import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const DJInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'DJ');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default DJInvoiceTemplate;