export interface InvoiceTemplate {
  id: string;
  title: string;
  slug: string;
  category: 'trades' | 'auto-logistics' | 'creative' | 'personal-services';
  description: string;
  lineItems: string[];
  painPoints: string[];
  averageAmount: string;
  paymentTerms: string;
}

export const invoiceTemplates: InvoiceTemplate[] = [
  // Trades
  {
    id: 'construction',
    title: 'Construction',
    slug: '/invoice-template/construction',
    category: 'trades',
    description: 'Professional construction invoice templates for contractors, builders, and construction companies. Include labor hours, materials, equipment, and project milestones.',
    lineItems: ['Labor hours', 'Materials/parts', 'Equipment rental', 'Travel/mileage', 'Permit fees', 'Subcontractor costs'],
    painPoints: ['Managing multiple project phases', 'Tracking materials and labor separately', 'Getting paid for change orders'],
    averageAmount: '$2,500-$50,000',
    paymentTerms: 'Net 30'
  },
  {
    id: 'contractor',
    title: 'General Contractor',
    slug: '/invoice-template/contractor',
    category: 'trades',
    description: 'Comprehensive general contractor invoice templates for residential and commercial projects. Track subcontractors, materials, and project phases efficiently.',
    lineItems: ['Project phases', 'Subcontractor payments', 'Materials markup', 'Labor supervision', 'Permits & inspections', 'Change orders'],
    painPoints: ['Coordinating multiple trades', 'Managing project timelines', 'Handling change order billing'],
    averageAmount: '$5,000-$100,000',
    paymentTerms: 'Net 30'
  },
  {
    id: 'plumber',
    title: 'Plumbing',
    slug: '/invoice-template/plumber',
    category: 'trades',
    description: 'Professional plumbing invoice templates for residential and commercial plumbing services. Include service calls, parts, labor, and emergency rates.',
    lineItems: ['Service call fee', 'Labor hours', 'Plumbing fixtures', 'Pipe materials', 'Emergency surcharge', 'Travel time'],
    painPoints: ['Emergency call pricing', 'Parts markup transparency', 'Travel time billing'],
    averageAmount: '$150-$2,500',
    paymentTerms: 'Due on completion'
  },
  {
    id: 'electrician',
    title: 'Electrician',
    slug: '/invoice-template/electrician',
    category: 'trades',
    description: 'Electrical contractor invoice templates for residential, commercial, and industrial electrical work. Track labor, materials, and safety compliance.',
    lineItems: ['Labor hours', 'Electrical materials', 'Wire & conduit', 'Fixtures & panels', 'Safety equipment', 'Code compliance fees'],
    painPoints: ['Material cost fluctuations', 'Code compliance documentation', 'Safety equipment costs'],
    averageAmount: '$200-$5,000',
    paymentTerms: 'Net 15'
  },
  {
    id: 'hvac',
    title: 'HVAC',
    slug: '/invoice-template/hvac',
    category: 'trades',
    description: 'HVAC contractor invoice templates for heating, ventilation, and air conditioning services. Include equipment, labor, and maintenance contracts.',
    lineItems: ['Equipment & units', 'Installation labor', 'Ductwork materials', 'Refrigerant', 'Service maintenance', 'Warranty coverage'],
    painPoints: ['Seasonal demand fluctuations', 'Equipment warranty tracking', 'Maintenance contract billing'],
    averageAmount: '$300-$8,000',
    paymentTerms: 'Net 30'
  },
  {
    id: 'roofing',
    title: 'Roofing',
    slug: '/invoice-template/roofing',
    category: 'trades',
    description: 'Roofing contractor invoice templates for residential and commercial roofing projects. Track materials, labor, and weather-dependent scheduling.',
    lineItems: ['Roofing materials', 'Labor & installation', 'Tear-off & disposal', 'Permits & inspections', 'Weather delays', 'Warranty coverage'],
    painPoints: ['Weather-dependent scheduling', 'Material waste calculations', 'Insurance claim coordination'],
    averageAmount: '$1,500-$25,000',
    paymentTerms: 'Net 30'
  },
  {
    id: 'painting',
    title: 'Painting',
    slug: '/invoice-template/painting',
    category: 'trades',
    description: 'Professional painting contractor invoice templates for interior and exterior painting projects. Include paint, prep work, and labor costs.',
    lineItems: ['Paint & materials', 'Surface preparation', 'Labor hours', 'Equipment rental', 'Travel time', 'Touch-up warranty'],
    painPoints: ['Accurate paint calculations', 'Prep work scope creep', 'Color matching costs'],
    averageAmount: '$500-$8,000',
    paymentTerms: 'Net 15'
  },
  {
    id: 'handyman',
    title: 'Handyman',
    slug: '/invoice-template/handyman',
    category: 'trades',
    description: 'Handyman service invoice templates for general repairs and maintenance. Track diverse services, materials, and hourly rates efficiently.',
    lineItems: ['Hourly labor', 'Materials & supplies', 'Tool usage', 'Travel time', 'Minimum service charge', 'Multiple task discount'],
    painPoints: ['Diverse service pricing', 'Small job profitability', 'Material markup on small items'],
    averageAmount: '$100-$1,500',
    paymentTerms: 'Due on completion'
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    slug: '/invoice-template/landscaping',
    category: 'trades',
    description: 'Landscaping and lawn care invoice templates for residential and commercial properties. Include plants, labor, and maintenance services.',
    lineItems: ['Plants & materials', 'Labor & installation', 'Equipment usage', 'Soil & amendments', 'Irrigation setup', 'Maintenance contracts'],
    painPoints: ['Seasonal service variations', 'Plant survival warranties', 'Weather impact on scheduling'],
    averageAmount: '$300-$10,000',
    paymentTerms: 'Net 30'
  },
  {
    id: 'cleaning',
    title: 'House Cleaning',
    slug: '/invoice-template/cleaning',
    category: 'personal-services',
    description: 'House cleaning and janitorial service invoice templates. Track recurring services, supplies, and team labor efficiently.',
    lineItems: ['Service hours', 'Cleaning supplies', 'Team members', 'Deep cleaning surcharge', 'Travel time', 'Recurring discount'],
    painPoints: ['Recurring billing automation', 'Supply cost tracking', 'Quality consistency pricing'],
    averageAmount: '$100-$500',
    paymentTerms: 'Due on service'
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    slug: '/invoice-template/window-cleaning',
    category: 'personal-services',
    description: 'Window cleaning service invoice templates for residential and commercial properties. Include window counts, height charges, and frequency discounts.',
    lineItems: ['Window count', 'Interior/exterior', 'Height surcharge', 'Screen cleaning', 'Frequency discount', 'Travel charge'],
    painPoints: ['Accurate window counting', 'Height-based pricing', 'Weather scheduling flexibility'],
    averageAmount: '$50-$800',
    paymentTerms: 'Due on completion'
  },
  {
    id: 'pest-control',
    title: 'Pest Control',
    slug: '/invoice-template/pest-control',
    category: 'personal-services',
    description: 'Pest control service invoice templates for extermination and prevention services. Track treatments, products, and recurring maintenance.',
    lineItems: ['Treatment service', 'Pesticide products', 'Follow-up visits', 'Inspection fee', 'Guarantee coverage', 'Emergency treatment'],
    painPoints: ['Treatment guarantee tracking', 'Chemical application documentation', 'Recurring service management'],
    averageAmount: '$150-$600',
    paymentTerms: 'Due on service'
  },

  // Auto & Logistics
  {
    id: 'auto-repair',
    title: 'Auto Repair',
    slug: '/invoice-template/auto-repair',
    category: 'auto-logistics',
    description: 'Auto repair and mechanic invoice templates for vehicle maintenance and repairs. Include parts, labor rates, and diagnostic fees.',
    lineItems: ['Diagnostic fee', 'Parts & components', 'Labor hours', 'Shop supplies', 'Environmental fees', 'Warranty coverage'],
    painPoints: ['Parts markup transparency', 'Labor rate justification', 'Warranty claim processing'],
    averageAmount: '$200-$3,500',
    paymentTerms: 'Due on pickup'
  },
  {
    id: 'car-detailing',
    title: 'Car Detailing',
    slug: '/invoice-template/car-detailing',
    category: 'auto-logistics',
    description: 'Car detailing service invoice templates for interior and exterior vehicle cleaning. Include packages, add-ons, and protection services.',
    lineItems: ['Detailing package', 'Interior cleaning', 'Exterior wash/wax', 'Protection coatings', 'Add-on services', 'Travel surcharge'],
    painPoints: ['Package vs. à la carte pricing', 'Protection service upsells', 'Mobile service logistics'],
    averageAmount: '$80-$500',
    paymentTerms: 'Due on completion'
  },
  {
    id: 'towing',
    title: 'Towing',
    slug: '/invoice-template/towing',
    category: 'auto-logistics',
    description: 'Towing service invoice templates for vehicle recovery and transport. Include mileage rates, hook-up fees, and storage charges.',
    lineItems: ['Hook-up fee', 'Mileage rate', 'Wait time', 'Storage daily', 'After-hours surcharge', 'Special equipment'],
    painPoints: ['Distance-based pricing', 'Wait time billing', 'Storage fee accumulation'],
    averageAmount: '$100-$800',
    paymentTerms: 'Due on service'
  },
  {
    id: 'moving',
    title: 'Moving Company',
    slug: '/invoice-template/moving',
    category: 'auto-logistics',
    description: 'Moving company invoice templates for residential and commercial relocations. Track labor, mileage, packing materials, and insurance.',
    lineItems: ['Moving crew hours', 'Mileage/fuel', 'Packing materials', 'Heavy item surcharge', 'Insurance coverage', 'Storage fees'],
    painPoints: ['Time estimation accuracy', 'Damage protection upsells', 'Long-distance coordination'],
    averageAmount: '$800-$5,000',
    paymentTerms: 'Due on delivery'
  },
  {
    id: 'trucking',
    title: 'Trucking',
    slug: '/invoice-template/trucking',
    category: 'auto-logistics',
    description: 'Trucking and freight invoice templates for cargo transport and logistics. Include mileage, fuel surcharges, and detention fees.',
    lineItems: ['Base freight rate', 'Fuel surcharge', 'Mileage', 'Detention time', 'Loading/unloading', 'Tolls & permits'],
    painPoints: ['Fuel cost fluctuations', 'Detention time billing', 'Multi-stop coordination'],
    averageAmount: '$500-$5,000',
    paymentTerms: 'Net 30'
  },
  {
    id: 'courier',
    title: 'Courier',
    slug: '/invoice-template/courier',
    category: 'auto-logistics',
    description: 'Courier and local delivery service invoice templates. Track deliveries, rush charges, and route optimization for efficient billing.',
    lineItems: ['Base delivery fee', 'Distance charge', 'Rush delivery', 'Wait time', 'Multiple stops', 'Fuel surcharge'],
    painPoints: ['Rush delivery premiums', 'Multi-stop efficiency', 'Same-day service costs'],
    averageAmount: '$15-$200',
    paymentTerms: 'Net 15'
  },

  // Creative Services
  {
    id: 'photography',
    title: 'Photography',
    slug: '/invoice-template/photography',
    category: 'creative',
    description: 'Photography invoice templates for weddings, events, and commercial shoots. Include session fees, deliverables, and licensing terms.',
    lineItems: ['Session/shoot fee', 'Edited photos delivered', 'Print licensing', 'Travel expenses', 'Equipment rental', 'Rush delivery'],
    painPoints: ['Licensing vs. ownership confusion', 'Delivery timeline management', 'Travel cost transparency'],
    averageAmount: '$500-$8,000',
    paymentTerms: '50% deposit, balance due on delivery'
  },
  {
    id: 'videography',
    title: 'Videography',
    slug: '/invoice-template/videography',
    category: 'creative',
    description: 'Videography and video production invoice templates. Track filming, editing, revisions, and final deliverables with clear terms.',
    lineItems: ['Filming hours', 'Editing time', 'Revision rounds', 'Final deliverables', 'Travel expenses', 'Equipment usage'],
    painPoints: ['Revision scope management', 'Editing time estimation', 'File delivery logistics'],
    averageAmount: '$1,000-$15,000',
    paymentTerms: '50% deposit, 25% on rough cut, 25% on final'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    slug: '/invoice-template/graphic-design',
    category: 'creative',
    description: 'Graphic design invoice templates for logos, branding, and marketing materials. Include concepts, revisions, and file formats.',
    lineItems: ['Design concepts', 'Revision rounds', 'Final file formats', 'Stock imagery', 'Print preparation', 'Rush delivery'],
    painPoints: ['Concept vs. final billing', 'Revision limit enforcement', 'File format deliverables'],
    averageAmount: '$300-$5,000',
    paymentTerms: '50% deposit, balance on completion'
  },
  {
    id: 'web-design',
    title: 'Web Design',
    slug: '/invoice-template/web-design',
    category: 'creative',
    description: 'Web design and development invoice templates for websites and applications. Track development phases, revisions, and hosting setup.',
    lineItems: ['Design mockups', 'Development hours', 'Content entry', 'Revisions', 'Testing & QA', 'Training session'],
    painPoints: ['Scope creep on features', 'Content delay impacts', 'Browser testing complexity'],
    averageAmount: '$1,500-$25,000',
    paymentTerms: '33% deposit, 33% at midpoint, 34% on launch'
  },
  {
    id: 'marketing',
    title: 'Marketing',
    slug: '/invoice-template/marketing',
    category: 'creative',
    description: 'Marketing and social media management invoice templates. Include strategy, content creation, ad spend, and performance reporting.',
    lineItems: ['Strategy & planning', 'Content creation', 'Ad spend management', 'Performance reporting', 'Platform management', 'Campaign optimization'],
    painPoints: ['Ad spend vs. management fees', 'Performance metric alignment', 'Content approval delays'],
    averageAmount: '$1,000-$10,000',
    paymentTerms: 'Monthly in advance'
  },
  {
    id: 'consulting',
    title: 'Business Consulting',
    slug: '/invoice-template/consulting',
    category: 'creative',
    description: 'Business consulting invoice templates for strategic advice and project work. Track hourly rates, project phases, and deliverable milestones.',
    lineItems: ['Consulting hours', 'Project phases', 'Research & analysis', 'Report delivery', 'Travel expenses', 'Follow-up sessions'],
    painPoints: ['Value-based vs. hourly pricing', 'Project scope definition', 'Deliverable timing'],
    averageAmount: '$2,000-$50,000',
    paymentTerms: 'Net 30'
  },

  // Personal Services
  {
    id: 'catering',
    title: 'Catering',
    slug: '/invoice-template/catering',
    category: 'personal-services',
    description: 'Catering service invoice templates for events and corporate functions. Include menu items, service staff, and equipment rental.',
    lineItems: ['Menu per person', 'Service staff', 'Equipment rental', 'Setup & breakdown', 'Travel & delivery', 'Gratuity'],
    painPoints: ['Guest count changes', 'Menu modification costs', 'Service staff coordination'],
    averageAmount: '$500-$15,000',
    paymentTerms: '50% deposit, balance day of event'
  },
  {
    id: 'event-planner',
    title: 'Event Planner',
    slug: '/invoice-template/event-planner',
    category: 'personal-services',
    description: 'Event planning invoice templates for weddings and corporate events. Track planning phases, vendor coordination, and day-of services.',
    lineItems: ['Planning phases', 'Vendor coordination', 'Day-of coordination', 'Timeline creation', 'Vendor payments', 'Emergency coverage'],
    painPoints: ['Vendor payment coordination', 'Last-minute changes', 'Timeline complexity'],
    averageAmount: '$1,500-$25,000',
    paymentTerms: '25% deposit, 50% 30 days prior, 25% day of'
  },
  {
    id: 'salon',
    title: 'Hair Salon',
    slug: '/invoice-template/salon',
    category: 'personal-services',
    description: 'Hair salon and beauty service invoice templates. Track services, products, stylist commissions, and appointment packages.',
    lineItems: ['Hair services', 'Product sales', 'Stylist time', 'Color & chemicals', 'Treatment add-ons', 'Package discounts'],
    painPoints: ['Service time estimation', 'Product inventory tracking', 'Stylist commission calculation'],
    averageAmount: '$50-$500',
    paymentTerms: 'Due at service'
  },
  {
    id: 'massage',
    title: 'Massage Therapy',
    slug: '/invoice-template/massage',
    category: 'personal-services',
    description: 'Massage therapy invoice templates for wellness and therapeutic services. Include session types, packages, and add-on services.',
    lineItems: ['Massage sessions', 'Session duration', 'Therapy type', 'Add-on treatments', 'Package deals', 'Travel surcharge'],
    painPoints: ['Insurance billing complexity', 'Package usage tracking', 'Therapeutic vs. wellness pricing'],
    averageAmount: '$60-$300',
    paymentTerms: 'Due at service'
  },
  {
    id: 'personal-trainer',
    title: 'Personal Trainer',
    slug: '/invoice-template/personal-trainer',
    category: 'personal-services',
    description: 'Personal training invoice templates for fitness coaching and wellness programs. Track sessions, packages, and nutrition consulting.',
    lineItems: ['Training sessions', 'Package rates', 'Nutrition consulting', 'Program design', 'Progress assessments', 'Travel/home sessions'],
    painPoints: ['Session package management', 'Cancellation policy enforcement', 'Progress tracking documentation'],
    averageAmount: '$60-$1,200',
    paymentTerms: 'Package payment in advance'
  },
  {
    id: 'tutor',
    title: 'Tutoring',
    slug: '/invoice-template/tutor',
    category: 'personal-services',
    description: 'Tutoring service invoice templates for academic and test prep instruction. Track hourly sessions, materials, and progress assessments.',
    lineItems: ['Tutoring hours', 'Subject areas', 'Materials & resources', 'Progress assessments', 'Travel time', 'Package discounts'],
    painPoints: ['Session consistency billing', 'Material cost transparency', 'Progress measurement documentation'],
    averageAmount: '$40-$500',
    paymentTerms: 'Monthly in advance'
  }
];

export const getTemplatesByCategory = (category: string) => {
  return invoiceTemplates.filter(template => template.category === category);
};

export const getTemplateBySlug = (slug: string) => {
  return invoiceTemplates.find(template => template.slug.includes(slug));
};