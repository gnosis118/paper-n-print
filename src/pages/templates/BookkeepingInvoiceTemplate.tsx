import { NicheTemplateLayout } from '@/components/NicheTemplateLayout';
import { nicheTemplates } from '@/data/nicheTemplates';

const BookkeepingInvoiceTemplate = () => {
  const template = nicheTemplates.find(t => t.title === 'Bookkeeping');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <NicheTemplateLayout template={template} />;
};

export default BookkeepingInvoiceTemplate;