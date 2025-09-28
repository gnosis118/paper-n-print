import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const PlumbingInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Plumbing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default PlumbingInvoiceTemplate;