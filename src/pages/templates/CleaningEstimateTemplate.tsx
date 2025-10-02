import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const CleaningEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Cleaning');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default CleaningEstimateTemplate;
