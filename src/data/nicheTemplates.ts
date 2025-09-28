export interface NicheTemplate {
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

export const nicheTemplates: NicheTemplate[] = [
  {
    title: 'HVAC',
    slug: '/templates/hvac-invoice-template',
    description: 'Professional HVAC invoice template for heating, ventilation, and air conditioning services including equipment installation, maintenance, and emergency repairs.',
    averageAmount: '$300 - $8,000',
    paymentTerms: 'Net 30 days',
    lineItems: ['Equipment & Units', 'Installation Labor', 'Ductwork Materials', 'Refrigerant', 'Service Maintenance', 'Emergency Call Fee'],
    painPoints: ['Seasonal demand fluctuations', 'Equipment warranty tracking', 'Emergency service billing'],
    benefits: ['Industry-specific line items', 'Equipment tracking', 'Warranty documentation', 'Emergency rate handling', 'Maintenance contract billing', 'Professional formatting'],
    sampleFields: {
      serviceDescription: 'AC Unit Installation & Maintenance',
      rateType: 'Equipment: $2,500 + Labor: $450 (3 hours @ $150/hr)',
      additionalCharges: ['Emergency service fee', 'Refrigerant R-410A', 'Ductwork modification']
    }
  },
  {
    title: 'Lawn Care',
    slug: '/templates/lawn-care-invoice-template',
    description: 'Comprehensive lawn care invoice template for landscaping services including mowing, fertilization, weed control, and seasonal cleanup services.',
    averageAmount: '$50 - $500',
    paymentTerms: 'Due upon completion',
    lineItems: ['Mowing Service', 'Fertilization', 'Weed Control', 'Seasonal Cleanup', 'Mulching', 'Trimming & Edging'],
    painPoints: ['Weather-dependent scheduling', 'Seasonal service variations', 'Equipment maintenance costs'],
    benefits: ['Recurring service tracking', 'Seasonal adjustments', 'Weather delay handling', 'Equipment cost allocation', 'Service package options', 'Auto-billing setup'],
    sampleFields: {
      serviceDescription: 'Weekly Lawn Maintenance Package',
      rateType: 'Weekly service: $75 per visit',
      additionalCharges: ['Fertilizer application', 'Weed control treatment', 'Leaf cleanup']
    }
  },
  {
    title: 'Handyman',
    slug: '/templates/handyman-invoice-template', 
    description: 'Versatile handyman invoice template for general repairs, maintenance tasks, and small home improvement projects with flexible hourly and project-based billing.',
    averageAmount: '$100 - $1,500',
    paymentTerms: 'Due upon completion',
    lineItems: ['Hourly Labor', 'Materials & Supplies', 'Tool Usage', 'Travel Time', 'Minimum Service Charge', 'Multiple Task Discount'],
    painPoints: ['Diverse service pricing', 'Small job profitability', 'Material markup transparency'],
    benefits: ['Multi-task billing', 'Flexible rate structure', 'Material cost tracking', 'Travel time billing', 'Small job optimization', 'Bundled service discounts'],
    sampleFields: {
      serviceDescription: 'Home Repair & Maintenance Tasks',
      rateType: 'Labor: $65/hour + Materials at cost + 20%',
      additionalCharges: ['Travel time (30 min)', 'Specialty tools rental', 'Hardware store pickup']
    }
  },
  {
    title: 'Cleaning',
    slug: '/templates/cleaning-invoice-template',
    description: 'Professional cleaning service invoice template for residential and commercial cleaning with recurring service options and supply tracking.',
    averageAmount: '$100 - $500',
    paymentTerms: 'Due upon service completion',
    lineItems: ['Service Hours', 'Cleaning Supplies', 'Team Members', 'Deep Cleaning Surcharge', 'Travel Time', 'Recurring Service Discount'],
    painPoints: ['Recurring billing automation', 'Supply cost tracking', 'Quality consistency pricing'],
    benefits: ['Recurring billing setup', 'Supply cost allocation', 'Team member tracking', 'Service level options', 'Customer portal access', 'Quality assurance documentation'],
    sampleFields: {
      serviceDescription: 'Residential Deep Cleaning Service',
      rateType: '4 hours @ $35/hour per cleaner (2 cleaners)',
      additionalCharges: ['Cleaning supplies', 'Deep clean surcharge', 'Travel time']
    }
  },
  {
    title: 'Roofing',
    slug: '/templates/roofing-invoice-template',
    description: 'Comprehensive roofing contractor invoice template for residential and commercial roofing projects including materials, labor, and insurance coordination.',
    averageAmount: '$1,500 - $25,000',
    paymentTerms: 'Net 30 days',
    lineItems: ['Roofing Materials', 'Labor & Installation', 'Tear-off & Disposal', 'Permits & Inspections', 'Weather Delays', 'Warranty Coverage'],
    painPoints: ['Weather-dependent scheduling', 'Material waste calculations', 'Insurance claim coordination'],
    benefits: ['Weather delay tracking', 'Material waste calculation', 'Insurance documentation', 'Permit tracking', 'Warranty management', 'Progress billing'],
    sampleFields: {
      serviceDescription: 'Complete Roof Replacement - Asphalt Shingles',
      rateType: 'Materials: $8,500 + Labor: $6,000 (40 hours @ $150/hr)',
      additionalCharges: ['Tear-off & disposal', 'Building permits', 'Weather delay compensation']
    }
  },
  {
    title: 'Plumbing',
    slug: '/templates/plumbing-invoice-template',
    description: 'Professional plumbing invoice template for residential and commercial plumbing services including emergency calls, repairs, and installations.',
    averageAmount: '$150 - $2,500',
    paymentTerms: 'Due upon completion',
    lineItems: ['Service Call Fee', 'Labor Hours', 'Plumbing Fixtures', 'Pipe Materials', 'Emergency Surcharge', 'Travel Time'],
    painPoints: ['Emergency call pricing', 'Parts markup transparency', 'Travel time billing'],
    benefits: ['Emergency rate handling', 'Transparent pricing', 'Parts markup clarity', 'Service call optimization', 'Warranty tracking', 'Payment processing integration'],
    sampleFields: {
      serviceDescription: 'Kitchen Sink Installation & Drain Repair',
      rateType: 'Service call: $95 + Labor: $125/hour + Materials',
      additionalCharges: ['Emergency weekend fee', 'Specialty fittings', 'Drain cleaning']
    }
  },
  {
    title: 'Electrician',
    slug: '/templates/electrician-invoice-template',
    description: 'Electrical contractor invoice template for residential, commercial, and industrial electrical work with safety compliance and code requirements.',
    averageAmount: '$200 - $5,000',
    paymentTerms: 'Net 15 days',
    lineItems: ['Labor Hours', 'Electrical Materials', 'Wire & Conduit', 'Fixtures & Panels', 'Safety Equipment', 'Code Compliance Fees'],
    painPoints: ['Material cost fluctuations', 'Code compliance documentation', 'Safety equipment costs'],
    benefits: ['Code compliance tracking', 'Safety documentation', 'Material cost management', 'Permit integration', 'Inspection scheduling', 'Warranty management'],
    sampleFields: {
      serviceDescription: 'Panel Upgrade & Outlet Installation',
      rateType: 'Labor: $85/hour + Materials + 15% markup',
      additionalCharges: ['Electrical permit', 'Safety equipment', 'Code compliance inspection']
    }
  },
  {
    title: 'Freelance Designer',
    slug: '/templates/freelance-designer-invoice-template',
    description: 'Creative freelance designer invoice template for graphic design, web design, and branding projects with revision tracking and intellectual property terms.',
    averageAmount: '$500 - $5,000',
    paymentTerms: '50% deposit, balance on completion',
    lineItems: ['Design Concepts', 'Revision Rounds', 'Final File Formats', 'Stock Imagery', 'Print Preparation', 'Rush Delivery'],
    painPoints: ['Revision scope management', 'File format deliverables', 'Client feedback delays'],
    benefits: ['Revision tracking', 'File delivery management', 'Creative process documentation', 'IP rights clarity', 'Payment milestone setup', 'Portfolio integration'],
    sampleFields: {
      serviceDescription: 'Brand Identity Design Package',
      rateType: 'Project rate: $2,500 (includes 3 concepts, 2 revision rounds)',
      additionalCharges: ['Additional revisions', 'Rush delivery fee', 'Print-ready files']
    }
  },
  {
    title: 'Photographer',
    slug: '/templates/photographer-invoice-template',
    description: 'Professional photography invoice template for weddings, events, portraits, and commercial shoots with licensing terms and deliverable tracking.',
    averageAmount: '$500 - $8,000',
    paymentTerms: '50% deposit, balance on delivery',
    lineItems: ['Session/Shoot Fee', 'Edited Photos Delivered', 'Print Licensing', 'Travel Expenses', 'Equipment Rental', 'Rush Delivery'],
    painPoints: ['Licensing vs ownership confusion', 'Delivery timeline management', 'Travel cost transparency'],
    benefits: ['Licensing management', 'Delivery tracking', 'Travel cost allocation', 'Equipment rental tracking', 'Client gallery integration', 'Print order management'],
    sampleFields: {
      serviceDescription: 'Wedding Photography Package',
      rateType: 'Full day coverage: $3,500 + travel expenses',
      additionalCharges: ['Engagement session', 'Additional photographer', 'Premium editing']
    }
  },
  {
    title: 'Videographer',  
    slug: '/templates/videographer-invoice-template',
    description: 'Video production invoice template for filming, editing, and post-production services with revision tracking and deliverable specifications.',
    averageAmount: '$1,000 - $15,000',
    paymentTerms: '50% deposit, 25% rough cut, 25% final',
    lineItems: ['Filming Hours', 'Editing Time', 'Revision Rounds', 'Final Deliverables', 'Travel Expenses', 'Equipment Usage'],
    painPoints: ['Revision scope management', 'Editing time estimation', 'File delivery logistics'],
    benefits: ['Production phase tracking', 'Revision management', 'Equipment cost allocation', 'Delivery format specification', 'Client approval workflow', 'Archive management'],
    sampleFields: {
      serviceDescription: 'Corporate Video Production',
      rateType: 'Production: $1,500/day + Post-production: $100/hour',
      additionalCharges: ['Additional camera operator', 'Motion graphics', 'Color correction']
    }
  },
  {
    title: 'Personal Trainer',
    slug: '/templates/personal-trainer-invoice-template',
    description: 'Personal training invoice template for fitness coaching, workout sessions, and wellness programs with package tracking and progress documentation.',
    averageAmount: '$60 - $1,200',
    paymentTerms: 'Package payment in advance',
    lineItems: ['Training Sessions', 'Package Rates', 'Nutrition Consulting', 'Program Design', 'Progress Assessments', 'Travel/Home Sessions'],
    painPoints: ['Session package management', 'Cancellation policy enforcement', 'Progress tracking documentation'],
    benefits: ['Package session tracking', 'Cancellation management', 'Progress documentation', 'Nutrition plan billing', 'Client portal access', 'Automated reminders'],
    sampleFields: {
      serviceDescription: '10-Session Personal Training Package',
      rateType: 'Package rate: $800 (10 sessions @ $80 each)',
      additionalCharges: ['Nutrition consultation', 'Home visit surcharge', 'Fitness assessment']
    }
  },
  {
    title: 'Auto Detailing',
    slug: '/templates/auto-detailing-invoice-template',
    description: 'Car detailing service invoice template for interior and exterior vehicle cleaning with package options and mobile service logistics.',
    averageAmount: '$80 - $500',
    paymentTerms: 'Due upon completion',
    lineItems: ['Detailing Package', 'Interior Cleaning', 'Exterior Wash/Wax', 'Protection Coatings', 'Add-on Services', 'Mobile Service Fee'],
    painPoints: ['Package vs à la carte pricing', 'Protection service upsells', 'Mobile service logistics'],
    benefits: ['Package customization', 'Service add-on management', 'Mobile logistics tracking', 'Protection warranty tracking', 'Before/after documentation', 'Customer loyalty programs'],
    sampleFields: {
      serviceDescription: 'Full Service Detail Package',
      rateType: 'Premium package: $250 (includes interior/exterior detail)',
      additionalCharges: ['Paint protection coating', 'Pet hair removal', 'Mobile service fee']
    }
  },
  {
    title: 'Mobile Mechanic',
    slug: '/templates/mobile-mechanic-invoice-template',
    description: 'Mobile mechanic invoice template for on-site vehicle repairs and maintenance with travel time billing and diagnostic services.',
    averageAmount: '$150 - $1,500',
    paymentTerms: 'Due upon completion',
    lineItems: ['Diagnostic Fee', 'Labor Hours', 'Parts & Components', 'Travel Time', 'Mobile Service Fee', 'Emergency Surcharge'],
    painPoints: ['Travel time billing', 'Parts procurement costs', 'On-site limitations'],
    benefits: ['Travel time optimization', 'Parts markup transparency', 'Diagnostic documentation', 'Mobile service premium', 'Emergency rate structure', 'Customer convenience tracking'],
    sampleFields: {
      serviceDescription: 'On-Site Brake Repair Service',
      rateType: 'Labor: $95/hour + Parts + Travel fee: $45',
      additionalCharges: ['Diagnostic fee', 'Mobile service premium', 'Parts procurement']
    }
  },
  {
    title: 'Pest Control',
    slug: '/templates/pest-control-invoice-template',
    description: 'Pest control service invoice template for extermination and prevention services with treatment tracking and guarantee management.',
    averageAmount: '$150 - $600',
    paymentTerms: 'Due upon service completion',
    lineItems: ['Initial Treatment', 'Follow-up Visits', 'Pesticide Products', 'Inspection Fee', 'Guarantee Coverage', 'Emergency Treatment'],
    painPoints: ['Treatment guarantee tracking', 'Chemical application documentation', 'Recurring service management'],
    benefits: ['Treatment documentation', 'Guarantee tracking', 'Chemical usage logging', 'Follow-up scheduling', 'Recurring billing setup', 'Compliance reporting'],
    sampleFields: {
      serviceDescription: 'Quarterly Pest Control Service',
      rateType: 'Quarterly service: $180 per treatment',
      additionalCharges: ['Initial inspection', 'Specialized treatment', 'Guarantee extension']
    }
  },
  {
    title: 'Pressure Washing',
    slug: '/templates/pressure-washing-invoice-template', 
    description: 'Pressure washing invoice template for residential and commercial cleaning services including driveways, decks, and building exteriors.',
    averageAmount: '$100 - $800',
    paymentTerms: 'Due upon completion',
    lineItems: ['Square Footage Rate', 'Surface Type', 'Pressure Level', 'Cleaning Solutions', 'Equipment Setup', 'Water Usage'],
    painPoints: ['Area measurement accuracy', 'Surface-specific pricing', 'Equipment transportation'],
    benefits: ['Area calculation tools', 'Surface-specific rates', 'Equipment cost tracking', 'Before/after documentation', 'Weather scheduling', 'Multi-surface bundling'],
    sampleFields: {
      serviceDescription: 'Driveway & Sidewalk Pressure Washing',
      rateType: '$0.15 per sq ft (2,000 sq ft = $300)',
      additionalCharges: ['Cleaning solution', 'Stain treatment', 'Sealing application']
    }
  },
  {
    title: 'Landscaper',
    slug: '/templates/landscaper-invoice-template',
    description: 'Professional landscaping invoice template for design, installation, and maintenance services including plants, hardscaping, and irrigation.',
    averageAmount: '$500 - $15,000',
    paymentTerms: 'Net 30 days',
    lineItems: ['Design Services', 'Plant Materials', 'Hardscape Installation', 'Irrigation System', 'Soil Preparation', 'Maintenance Contract'],
    painPoints: ['Plant survival warranties', 'Weather impact scheduling', 'Seasonal service variations'],
    benefits: ['Design documentation', 'Plant warranty tracking', 'Irrigation system mapping', 'Seasonal scheduling', 'Maintenance contracts', 'Progress photo documentation'],
    sampleFields: {
      serviceDescription: 'Front Yard Landscape Design & Installation',
      rateType: 'Design: $500 + Installation: $4,500 + Materials: $2,800',
      additionalCharges: ['Soil amendment', 'Irrigation setup', 'Plant warranty']
    }
  },
  {
    title: 'Real Estate Photographer',
    slug: '/templates/real-estate-photographer-invoice-template',
    description: 'Real estate photography invoice template for property listings, virtual tours, and drone photography with quick turnaround requirements.',
    averageAmount: '$150 - $1,500',
    paymentTerms: 'Due within 24 hours',
    lineItems: ['Property Photography', 'Virtual Tour', 'Drone/Aerial Shots', 'Photo Editing', 'Rush Delivery', 'Additional Properties'],
    painPoints: ['Quick turnaround demands', 'Property access coordination', 'Weather dependency'],
    benefits: ['Fast payment processing', 'Property documentation', 'Multi-property discounts', 'Virtual tour integration', 'MLS integration ready', 'Rush delivery options'],
    sampleFields: {
      serviceDescription: 'Residential Property Photography Package',
      rateType: 'Standard package: $250 (25 photos + virtual tour)',
      additionalCharges: ['Drone photography', 'Twilight shots', 'Rush 24-hour delivery']
    }
  },
  {
    title: 'Tattoo Artist',
    slug: '/templates/tattoo-artist-invoice-template',
    description: 'Tattoo artist invoice template for custom artwork, tattoo sessions, and aftercare with deposit tracking and session scheduling.',
    averageAmount: '$150 - $2,000',
    paymentTerms: 'Deposit required, balance due day of service',
    lineItems: ['Design Consultation', 'Tattoo Session Time', 'Touch-up Session', 'Custom Artwork', 'Aftercare Products', 'Travel Fee'],
    painPoints: ['Design approval process', 'Session time estimation', 'Aftercare instruction compliance'],
    benefits: ['Design approval tracking', 'Session time management', 'Aftercare documentation', 'Deposit handling', 'Portfolio integration', 'Health compliance documentation'],
    sampleFields: {
      serviceDescription: 'Custom Sleeve Tattoo - Session 1',
      rateType: 'Hourly rate: $150/hour (estimated 4 hours)',
      additionalCharges: ['Custom design fee', 'Aftercare kit', 'Touch-up session included']
    }
  },
  {
    title: 'Makeup Artist',
    slug: '/templates/makeup-artist-invoice-template',
    description: 'Professional makeup artist invoice template for weddings, events, and photoshoots with product costs and travel coordination.',
    averageAmount: '$100 - $1,500',
    paymentTerms: '50% deposit, balance day of service',
    lineItems: ['Makeup Application', 'Trial Session', 'Product Usage', 'Travel Time', 'Touch-up Kit', 'Additional Services'],
    painPoints: ['Product cost allocation', 'Travel coordination', 'Timeline management'],
    benefits: ['Product cost tracking', 'Travel optimization', 'Timeline coordination', 'Trial session management', 'Portfolio documentation', 'Client consultation tracking'],
    sampleFields: {
      serviceDescription: 'Bridal Makeup Package',
      rateType: 'Bridal makeup: $300 + Trial: $150',
      additionalCharges: ['False lashes', 'Touch-up kit', 'Travel fee (over 30 miles)']
    }
  },
  {
    title: 'Hair Stylist',
    slug: '/templates/hair-stylist-invoice-template',
    description: 'Hair stylist invoice template for cuts, coloring, treatments, and special events with product tracking and appointment management.',
    averageAmount: '$50 - $500',
    paymentTerms: 'Due at service completion',
    lineItems: ['Hair Services', 'Color & Chemicals', 'Treatment Services', 'Product Sales', 'Styling for Events', 'Consultation Fee'],
    painPoints: ['Service time estimation', 'Product inventory tracking', 'Color formula documentation'],
    benefits: ['Service time tracking', 'Product inventory management', 'Color formula storage', 'Appointment optimization', 'Client history tracking', 'Loyalty program integration'],
    sampleFields: {
      serviceDescription: 'Full Color & Cut Service',
      rateType: 'Color service: $120 + Cut & style: $65',
      additionalCharges: ['Deep conditioning treatment', 'Professional styling products', 'Special occasion styling']
    }
  },
  {
    title: 'Notary',
    slug: '/templates/notary-invoice-template',
    description: 'Notary public invoice template for document notarization, mobile notary services, and loan signing appointments with compliance tracking.',
    averageAmount: '$25 - $200',
    paymentTerms: 'Due upon completion',
    lineItems: ['Notarial Acts', 'Document Review', 'Travel Fee', 'Waiting Time', 'Rush Service', 'Multiple Signers'],
    painPoints: ['Fee schedule compliance', 'Travel time optimization', 'Document complexity'],
    benefits: ['Fee compliance tracking', 'Travel optimization', 'Document logging', 'Appointment scheduling', 'Compliance documentation', 'Multiple signer handling'],
    sampleFields: {
      serviceDescription: 'Mobile Notary - Loan Signing',
      rateType: 'Loan signing package: $125 + travel fee',
      additionalCharges: ['Additional documents', 'Rush service fee', 'Waiting time over 15 minutes']
    }
  },
  {
    title: 'Bookkeeping',
    slug: '/templates/bookkeeping-invoice-template',
    description: 'Bookkeeping service invoice template for monthly accounting, tax preparation, and financial consulting with hourly and retainer options.',
    averageAmount: '$200 - $2,000',
    paymentTerms: 'Net 15 days',
    lineItems: ['Monthly Bookkeeping', 'Tax Preparation', 'Financial Reports', 'Consultation Hours', 'Software Setup', 'Training Sessions'],
    painPoints: ['Scope definition clarity', 'Client data organization', 'Regulatory compliance'],
    benefits: ['Service scope tracking', 'Compliance documentation', 'Report generation', 'Client portal access', 'Automated billing', 'Tax deadline management'],
    sampleFields: {
      serviceDescription: 'Monthly Bookkeeping Services',
      rateType: 'Monthly retainer: $400 + additional hours @ $65/hour',
      additionalCharges: ['Tax preparation', 'Financial report consultation', 'QuickBooks setup']
    }
  },
  {
    title: 'DJ',
    slug: '/templates/dj-invoice-template',
    description: 'DJ service invoice template for weddings, parties, and events with equipment rental, music licensing, and performance coordination.',
    averageAmount: '$300 - $2,500',
    paymentTerms: '50% deposit, balance day of event',
    lineItems: ['DJ Performance', 'Equipment Rental', 'Music Licensing', 'Setup/Breakdown', 'Travel Expenses', 'Overtime Hours'],
    painPoints: ['Equipment transportation', 'Music licensing compliance', 'Event timeline coordination'],
    benefits: ['Equipment inventory tracking', 'Music licensing management', 'Event timeline coordination', 'Setup documentation', 'Overtime handling', 'Client music requests'],
    sampleFields: {
      serviceDescription: 'Wedding Reception DJ Service',
      rateType: '6-hour reception: $800 + equipment package',
      additionalCharges: ['Ceremony music', 'Uplighting package', 'Overtime rate: $100/hour']
    }
  },
  {
    title: 'Event Planner',
    slug: '/templates/event-planner-invoice-template',
    description: 'Event planning invoice template for weddings and corporate events with vendor coordination, timeline management, and day-of services.',
    averageAmount: '$1,500 - $25,000',
    paymentTerms: '25% deposit, 50% 30 days prior, 25% day of',
    lineItems: ['Planning Consultation', 'Vendor Coordination', 'Day-of Coordination', 'Timeline Creation', 'Vendor Payments', 'Emergency Coverage'],
    painPoints: ['Vendor payment coordination', 'Last-minute changes', 'Timeline complexity'],
    benefits: ['Vendor management', 'Payment coordination', 'Timeline tracking', 'Change order management', 'Emergency planning', 'Client communication portal'],
    sampleFields: {
      serviceDescription: 'Full Wedding Planning Package',
      rateType: 'Planning package: $5,000 + day-of coordination',
      additionalCharges: ['Additional planning meetings', 'Vendor sourcing', 'Emergency coverage']
    }
  },
  {
    title: 'Caterer',
    slug: '/templates/caterer-invoice-template',
    description: 'Catering service invoice template for events and corporate functions with menu planning, service staff, and equipment coordination.',
    averageAmount: '$500 - $15,000',
    paymentTerms: '50% deposit, balance day of event',
    lineItems: ['Menu Per Person', 'Service Staff', 'Equipment Rental', 'Setup & Breakdown', 'Travel & Delivery', 'Gratuity'],
    painPoints: ['Guest count changes', 'Menu modification costs', 'Service staff coordination'],
    benefits: ['Guest count flexibility', 'Menu customization', 'Staff coordination', 'Equipment tracking', 'Dietary restriction handling', 'Event timeline integration'],
    sampleFields: {
      serviceDescription: 'Corporate Event Catering',
      rateType: '50 guests @ $35 per person = $1,750',
      additionalCharges: ['Service staff (3 servers)', 'Equipment rental', 'Setup/breakdown']
    }
  },
  {
    title: 'Snow Removal',
    slug: '/templates/snow-removal-invoice-template',
    description: 'Snow removal service invoice template for residential and commercial snow plowing, salting, and seasonal contracts.',
    averageAmount: '$50 - $500',
    paymentTerms: 'Due within 15 days',
    lineItems: ['Snow Plowing', 'Salting/De-icing', 'Sidewalk Clearing', 'Seasonal Contract', 'Emergency Service', 'Equipment Usage'],
    painPoints: ['Weather dependency', 'Seasonal billing', 'Emergency service coordination'],
    benefits: ['Seasonal contract management', 'Weather tracking', 'Emergency response billing', 'Route optimization', 'Salt usage tracking', 'Equipment maintenance allocation'],
    sampleFields: {
      serviceDescription: 'Commercial Parking Lot Snow Removal',
      rateType: 'Per visit: $150 + salt application: $75',
      additionalCharges: ['Sidewalk clearing', 'Emergency weekend service', 'Additional salt application']
    }
  },
  {
    title: 'Window Cleaning',
    slug: '/templates/window-cleaning-invoice-template',
    description: 'Window cleaning service invoice template for residential and commercial properties with window counts and frequency discounts.',
    averageAmount: '$50 - $800',
    paymentTerms: 'Due upon completion',
    lineItems: ['Window Count', 'Interior/Exterior', 'Screen Cleaning', 'Height Surcharge', 'Frequency Discount', 'Travel Charge'],
    painPoints: ['Accurate window counting', 'Height-based pricing', 'Weather scheduling flexibility'],
    benefits: ['Window count accuracy', 'Height pricing structure', 'Weather flexibility', 'Frequency discounts', 'Route optimization', 'Safety equipment tracking'],
    sampleFields: {
      serviceDescription: 'Residential Window Cleaning',
      rateType: '20 windows @ $8 each = $160 (interior/exterior)',
      additionalCharges: ['Screen cleaning', 'Second story surcharge', 'Travel fee (over 15 miles)']
    }
  },
  {
    title: 'Massage Therapist',
    slug: '/templates/massage-therapist-invoice-template',
    description: 'Massage therapy invoice template for wellness and therapeutic services with session packages and insurance billing options.',
    averageAmount: '$60 - $300',
    paymentTerms: 'Due at service completion',
    lineItems: ['Massage Session', 'Therapy Type', 'Session Duration', 'Package Deals', 'Add-on Treatments', 'Mobile Service'],
    painPoints: ['Insurance billing complexity', 'Package usage tracking', 'Therapeutic vs wellness pricing'],
    benefits: ['Package session tracking', 'Insurance integration', 'Therapy documentation', 'Mobile service premium', 'Client health tracking', 'Treatment plan billing'],
    sampleFields: {
      serviceDescription: '90-Minute Deep Tissue Massage',
      rateType: '90-minute session: $140 + enhancement add-ons',
      additionalCharges: ['Hot stone therapy', 'Aromatherapy', 'Mobile service fee']
    }
  },
  {
    title: 'Carpet Cleaner',
    slug: '/templates/carpet-cleaner-invoice-template',
    description: 'Carpet cleaning service invoice template for residential and commercial carpet cleaning with area calculations and stain treatments.',
    averageAmount: '$100 - $600',
    paymentTerms: 'Due upon completion',
    lineItems: ['Carpet Area (sq ft)', 'Cleaning Method', 'Stain Treatment', 'Furniture Moving', 'Deodorizing', 'Protection Application'],
    painPoints: ['Area measurement accuracy', 'Stain assessment', 'Furniture coordination'],
    benefits: ['Area calculation tools', 'Stain documentation', 'Furniture tracking', 'Before/after photos', 'Treatment guarantees', 'Protection warranties'],
    sampleFields: {
      serviceDescription: 'Living Room & Bedroom Carpet Cleaning',
      rateType: '600 sq ft @ $0.45 per sq ft = $270',
      additionalCharges: ['Pet stain treatment', 'Scotchgard protection', 'Furniture moving fee']
    }
  }
];