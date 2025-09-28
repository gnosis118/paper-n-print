import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const CleaningInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Cleaning');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default CleaningInvoiceTemplate;