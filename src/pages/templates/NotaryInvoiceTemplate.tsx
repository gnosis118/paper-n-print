import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const NotaryInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Notary');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default NotaryInvoiceTemplate;