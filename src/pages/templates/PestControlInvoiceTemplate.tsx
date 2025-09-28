import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const PestControlInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Pest Control');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default PestControlInvoiceTemplate;