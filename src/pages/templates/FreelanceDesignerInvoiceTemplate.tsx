import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const FreelanceDesignerInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Freelance Designer');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default FreelanceDesignerInvoiceTemplate;