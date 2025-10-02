import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const HVACEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'HVAC');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default HVACEstimateTemplate;
