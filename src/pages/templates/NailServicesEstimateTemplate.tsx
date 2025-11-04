import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const NailServicesEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Nail Services');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default NailServicesEstimateTemplate;

