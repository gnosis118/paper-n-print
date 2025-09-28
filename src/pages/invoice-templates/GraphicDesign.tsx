import { InvoiceTemplateLayout } from '@/components/InvoiceTemplateLayout';
import { getTemplateBySlug } from '@/data/invoiceTemplates';

const GraphicDesignInvoiceTemplate = () => {
  const template = getTemplateBySlug('graphic-design');
  
  if (!template) {
    return <div>Template not found</div>;
  }

  return <InvoiceTemplateLayout template={template} />;
};

export default GraphicDesignInvoiceTemplate;