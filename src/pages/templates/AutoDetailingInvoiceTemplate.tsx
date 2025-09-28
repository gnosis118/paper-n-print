import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const AutoDetailingInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Auto Detailing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default AutoDetailingInvoiceTemplate;