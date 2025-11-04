import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const TattooServicesEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Tattoo Services');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default TattooServicesEstimateTemplate;

