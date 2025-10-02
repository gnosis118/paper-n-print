import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const LandscapingEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Landscaping');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default LandscapingEstimateTemplate;
