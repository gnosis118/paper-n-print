import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const RoofingEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Roofing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default RoofingEstimateTemplate;
