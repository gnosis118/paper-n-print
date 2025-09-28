import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const PressureWashingInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Pressure Washing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default PressureWashingInvoiceTemplate;