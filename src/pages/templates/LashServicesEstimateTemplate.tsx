import { EstimateTemplateLayout } from '@/components/EstimateTemplateLayout';
import { estimateTemplates } from '@/data/estimateTemplates';

const LashServicesEstimateTemplate = () => {
  const template = estimateTemplates.find(t => t.title === 'Lash Services');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <EstimateTemplateLayout template={template} />;
};

export default LashServicesEstimateTemplate;

