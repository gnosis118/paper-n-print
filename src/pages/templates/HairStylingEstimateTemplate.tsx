import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const HairStylingEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Hair Styling');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default HairStylingEstimateTemplate;

