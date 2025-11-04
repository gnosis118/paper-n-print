import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const EstheticsEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Esthetics');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default EstheticsEstimateTemplate;

