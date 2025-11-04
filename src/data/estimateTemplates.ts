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
  },
  {
    title: 'Hair Styling',
    slug: '/templates/hair-styling-estimate-template',
    description: 'Professional hair styling estimate template for salons with service packages, product costs, and color treatments.',
    averageAmount: '$185',
    paymentTerms: '50% deposit, Balance due at appointment',
    lineItems: ['Consultation', 'Cut & Style', 'Color Treatment', 'Highlights/Lowlights', 'Hair Products', 'Styling Products'],
    painPoints: ['No-show clients', 'Color correction costs', 'Product upselling'],
    benefits: ['Service packages', 'Color pricing', 'Product recommendations', 'Deposit collection', 'Appointment reminders', 'Retail tracking'],
    sampleFields: {
      serviceDescription: 'Full Color + Cut + Style',
      rateType: 'Consultation: $0 + Color: $85 + Cut: $60 + Style: $40',
      additionalCharges: ['Premium color treatment', 'Deep conditioning', 'Styling products']
    }
  },
  {
    title: 'Nail Services',
    slug: '/templates/nail-services-estimate-template',
    description: 'Complete nail services estimate template for nail salons with manicure, pedicure, and nail art pricing.',
    averageAmount: '$95',
    paymentTerms: 'Payment at service completion',
    lineItems: ['Manicure', 'Pedicure', 'Gel Polish', 'Nail Art', 'Extensions', 'Nail Care Products'],
    painPoints: ['Walk-in vs appointment pricing', 'Gel removal costs', 'Design complexity'],
    benefits: ['Service menu pricing', 'Gel vs regular options', 'Art design pricing', 'Package deals', 'Loyalty discounts', 'Quick checkout'],
    sampleFields: {
      serviceDescription: 'Gel Manicure + Pedicure with Nail Art',
      rateType: 'Gel Manicure: $35 + Pedicure: $45 + Nail Art: $15',
      additionalCharges: ['Gel removal', 'Design complexity', 'Premium polish']
    }
  },
  {
    title: 'Lash Services',
    slug: '/templates/lash-services-estimate-template',
    description: 'Professional lash services estimate template for lash artists with extensions, lifts, and fills.',
    averageAmount: '$165',
    paymentTerms: '50% deposit, Balance due at appointment',
    lineItems: ['Lash Extension Application', 'Lash Lift & Tint', 'Fill Service', 'Lash Removal', 'Aftercare Products', 'Premium Lashes'],
    painPoints: ['Lash retention issues', 'Fill scheduling', 'Aftercare compliance'],
    benefits: ['Extension pricing', 'Lift & tint options', 'Fill scheduling', 'Retention tracking', 'Aftercare guidance', 'Product sales'],
    sampleFields: {
      serviceDescription: 'Full Lash Extension Set - Classic',
      rateType: 'Consultation: $0 + Application: $150 + Aftercare Kit: $15',
      additionalCharges: ['Premium lash material', 'Volume lashes', 'Aftercare products']
    }
  },
  {
    title: 'Massage Therapy',
    slug: '/templates/massage-therapy-estimate-template',
    description: 'Professional massage therapy estimate template with session types, add-ons, and package pricing.',
    averageAmount: '$120',
    paymentTerms: '50% deposit, Balance due at appointment',
    lineItems: ['Swedish Massage', 'Deep Tissue', 'Hot Stone Therapy', 'Aromatherapy', 'Cupping', 'Package Discount'],
    painPoints: ['Cancellation policies', 'Package tracking', 'Add-on upselling'],
    benefits: ['Session type pricing', 'Add-on options', 'Package deals', 'Cancellation terms', 'Membership discounts', 'Wellness tracking'],
    sampleFields: {
      serviceDescription: '60-Minute Deep Tissue Massage',
      rateType: 'Base Massage: $100 + Hot Stone: $20',
      additionalCharges: ['Aromatherapy upgrade', 'Cupping therapy', 'Package discount']
    }
  },
  {
    title: 'Tattoo Services',
    slug: '/templates/tattoo-services-estimate-template',
    description: 'Professional tattoo services estimate template with design consultation, hourly rates, and touch-up policies.',
    averageAmount: '$450',
    paymentTerms: '50% deposit, Balance due at appointment',
    lineItems: ['Design Consultation', 'Hourly Rate', 'Custom Design Fee', 'Touch-up Sessions', 'Aftercare Products', 'Rush Fee'],
    painPoints: ['Design revisions', 'Session scheduling', 'Touch-up policies'],
    benefits: ['Design consultation', 'Hourly pricing', 'Custom design fees', 'Touch-up terms', 'Aftercare products', 'Portfolio showcase'],
    sampleFields: {
      serviceDescription: 'Custom Tattoo Design - Medium Size',
      rateType: 'Design Consultation: $50 + Hourly Rate: $150/hr (2 hours)',
      additionalCharges: ['Custom design fee', 'Touch-up sessions', 'Aftercare kit']
    }
  },
  {
    title: 'Esthetics',
    slug: '/templates/esthetics-estimate-template',
    description: 'Professional esthetics estimate template for facials, waxing, and skincare treatments.',
    averageAmount: '$135',
    paymentTerms: '50% deposit, Balance due at appointment',
    lineItems: ['Facial Treatment', 'Waxing Service', 'Chemical Peel', 'Microdermabrasion', 'Skincare Products', 'Package Discount'],
    painPoints: ['Skin sensitivity issues', 'Product recommendations', 'Treatment packages'],
    benefits: ['Treatment pricing', 'Waxing options', 'Skincare products', 'Package deals', 'Consultation included', 'Aftercare guidance'],
    sampleFields: {
      serviceDescription: 'Hydrating Facial + Waxing Service',
      rateType: 'Facial: $85 + Waxing: $50',
      additionalCharges: ['Premium skincare products', 'Chemical peel add-on', 'Package discount']
    }
  }
];
