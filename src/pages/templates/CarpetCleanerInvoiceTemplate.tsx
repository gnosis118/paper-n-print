import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const CarpetCleanerInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Carpet Cleaner');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default CarpetCleanerInvoiceTemplate;