import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const MassageTherapyEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Massage Therapy');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default MassageTherapyEstimateTemplate;

