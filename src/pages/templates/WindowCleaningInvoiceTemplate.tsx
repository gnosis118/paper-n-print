import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const WindowCleaningInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Window Cleaning');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default WindowCleaningInvoiceTemplate;