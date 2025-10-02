import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const ConstructionEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Construction');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default ConstructionEstimateTemplate;
