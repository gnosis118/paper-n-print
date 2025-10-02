import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const PlumbingEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Plumbing');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default PlumbingEstimateTemplate;
