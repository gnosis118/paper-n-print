import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const MassageTherapistInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Massage Therapist');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default MassageTherapistInvoiceTemplate;