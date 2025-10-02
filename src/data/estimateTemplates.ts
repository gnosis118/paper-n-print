export interface EstimateTemplate {
  title: string;
  slug: string;
  description: string;
  averageAmount: string;
  paymentTerms: string;
  lineItems: string[];
  painPoints: string[];
  benefits: string[];
  sampleFields: {
    serviceDescription: string;
    rateType: string;
    additionalCharges: string[];
  };
}

export const estimateTemplates: EstimateTemplate[] = [
  {
    title: 'HVAC',
    slug: '/templates/hvac-estimate-template',
    description: 'Professional HVAC estimate template for heating, ventilation, and air conditioning services including equipment specifications and warranty details.',
    averageAmount: '$2,850',
    paymentTerms: '50% deposit, Net 30',
    lineItems: ['Equipment & Units', 'Installation Labor', 'Ductwork Materials', 'Refrigerant', 'Service Maintenance', 'Warranty Coverage'],
    painPoints: ['Complex equipment pricing', 'Deposit collection delays', 'Estimate-to-invoice conversion'],
    benefits: ['Equipment specifications', 'Labor breakdown', 'Warranty details', 'Online deposit collection', 'Auto-convert to invoice', 'Professional appearance'],
    sampleFields: {
      serviceDescription: 'AC Unit Installation & Maintenance',
      rateType: 'Equipment: $2,500 + Labor: $450 (3 hours @ $150/hr)',
      additionalCharges: ['Refrigerant R-410A', 'Ductwork modification', 'Warranty extension']
    }
  },
  {
    title: 'Plumbing',
    slug: '/templates/plumbing-estimate-template',
    description: 'Complete plumbing estimate template for residential and commercial plumbing projects with material costs and emergency rates.',
    averageAmount: '$475',
    paymentTerms: '25% deposit, Net 15',
    lineItems: ['Service Call Fee', 'Labor Hours', 'Plumbing Fixtures', 'Pipe Materials', 'Permit Fees', 'Emergency Surcharge'],
    painPoints: ['Material price volatility', 'Emergency pricing clarity', 'Payment collection'],
    benefits: ['Material costs', 'Emergency rates', 'Permit fees', 'Transparent pricing', 'Quick deposit acceptance', 'Mobile-friendly'],
    sampleFields: {
      serviceDescription: 'Kitchen Plumbing Installation',
      rateType: 'Labor: $125/hour + Materials + 20% markup',
      additionalCharges: ['Service call fee', 'Permit application', 'Specialty fittings']
    }
  },
  {
    title: 'Construction',
    slug: '/templates/construction-estimate-template',
    description: 'Detailed construction estimate template for remodeling and building projects with phase breakdown and material allowances.',
    averageAmount: '$15,500',
    paymentTerms: '30% deposit, Progress billing',
    lineItems: ['Design & Planning', 'Labor Costs', 'Materials', 'Equipment Rental', 'Permits & Inspections', 'Contingency'],
    painPoints: ['Complex project pricing', 'Change order management', 'Payment schedules'],
    benefits: ['Phase breakdown', 'Material allowances', 'Change order terms', 'Progress billing setup', 'Deposit automation', 'Client approval tracking'],
    sampleFields: {
      serviceDescription: 'Bathroom Remodel - Full Renovation',
      rateType: 'Labor: $8,000 + Materials: $6,500 + Equipment: $1,000',
      additionalCharges: ['Building permits', 'Design changes', 'Contingency 10%']
    }
  },
  {
    title: 'Landscaping',
    slug: '/templates/landscaping-estimate-template',
    description: 'Professional landscaping estimate template for lawn care and outdoor services with plant specifications and seasonal rates.',
    averageAmount: '$3,200',
    paymentTerms: '40% deposit, Net 30',
    lineItems: ['Design Services', 'Plant Materials', 'Hardscape Installation', 'Irrigation Setup', 'Soil Preparation', 'Maintenance Schedule'],
    painPoints: ['Plant survival warranties', 'Weather delays', 'Material sourcing'],
    benefits: ['Plant specifications', 'Maintenance schedules', 'Seasonal rates', 'Weather flexibility', 'Secure deposits', 'Professional proposals'],
    sampleFields: {
      serviceDescription: 'Front Yard Landscape Design & Installation',
      rateType: 'Design: $500 + Installation: $1,800 + Materials: $900',
      additionalCharges: ['Soil amendment', 'Irrigation system', 'Plant warranty']
    }
  },
  {
    title: 'Roofing',
    slug: '/templates/roofing-estimate-template',
    description: 'Complete roofing estimate template for repairs and replacements with material grades and weather clauses.',
    averageAmount: '$8,750',
    paymentTerms: '50% deposit, COD',
    lineItems: ['Roofing Materials', 'Labor & Installation', 'Tear-off & Disposal', 'Permits', 'Weather Protection', 'Warranty Coverage'],
    painPoints: ['Weather dependencies', 'Material waste calculations', 'Insurance coordination'],
    benefits: ['Material grades', 'Weather clauses', 'Cleanup included', 'Insurance documentation', 'Fast deposit collection', 'Warranty tracking'],
    sampleFields: {
      serviceDescription: 'Complete Roof Replacement - Asphalt Shingles',
      rateType: 'Materials: $4,500 + Labor: $3,750 + Disposal: $500',
      additionalCharges: ['Tear-off & disposal', 'Building permits', 'Warranty upgrade']
    }
  },
  {
    title: 'Cleaning',
    slug: '/templates/cleaning-estimate-template',
    description: 'Professional cleaning estimate template for residential and commercial services with recurring discounts and supply costs.',
    averageAmount: '$125',
    paymentTerms: 'Payment on completion',
    lineItems: ['Service Hours', 'Cleaning Supplies', 'Team Members', 'Deep Cleaning Surcharge', 'Special Requests', 'Recurring Discount'],
    painPoints: ['Recurring billing', 'Supply cost tracking', 'Service consistency'],
    benefits: ['Recurring discounts', 'Supply costs', 'Special requests', 'Team tracking', 'Automated payments', 'Service packages'],
    sampleFields: {
      serviceDescription: 'Residential Deep Cleaning Service',
      rateType: '4 hours @ $35/hour per cleaner (2 cleaners)',
      additionalCharges: ['Cleaning supplies', 'Deep clean surcharge', 'Window cleaning']
    }
  }
];
