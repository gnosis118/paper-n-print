/**
 * Image Metadata and Alt Text
 * SEO-optimized metadata for all ProInvoice images
 */

export interface ImageMetadata {
  filename: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
  category: 'hero' | 'feature' | 'trade' | 'workflow' | 'testimonial' | 'social';
  seoKeywords: string[];
}

export const imageMetadata: Record<string, ImageMetadata> = {
  'homepage-hero': {
    filename: 'homepage-hero.webp',
    alt: 'Contractor in work truck using tablet to manage estimates and invoices',
    title: 'ProInvoice - Mobile Invoicing for Contractors',
    description:
      'Professional contractor using ProInvoice on tablet while in work truck, demonstrating mobile-first invoicing solution for trades',
    width: 1920,
    height: 1080,
    category: 'hero',
    seoKeywords: [
      'contractor invoicing',
      'mobile estimates',
      'field service software',
      'construction invoicing',
    ],
  },
  'quick-bids': {
    filename: 'quick-bids.webp',
    alt: 'Roofer on ladder photographing roof damage with phone to create instant estimates',
    title: 'Quick Bids - Create Estimates On Site',
    description:
      'Roofer using phone camera to document roof damage and create professional estimates instantly with ProInvoice',
    width: 800,
    height: 600,
    category: 'feature',
    seoKeywords: [
      'on-site estimates',
      'photo estimates',
      'quick bidding',
      'field estimates',
    ],
  },
  'collect-deposits': {
    filename: 'collect-deposits.webp',
    alt: 'Electrician in work van receiving payment notification on tablet',
    title: 'Collect Deposits - Get Paid Faster',
    description:
      'Electrician receiving instant payment notification on tablet while in work van, showing deposit collection feature',
    width: 800,
    height: 600,
    category: 'feature',
    seoKeywords: [
      'deposit collection',
      'payment processing',
      'contractor payments',
      'mobile payments',
    ],
  },
  'mobile-first': {
    filename: 'mobile-first.webp',
    alt: 'Plumber in tight workspace using phone to manage job details',
    title: 'Mobile-First Design - Work Anywhere',
    description:
      'Plumber in crawl space using mobile phone to access job information, demonstrating mobile-first design for field work',
    width: 800,
    height: 600,
    category: 'feature',
    seoKeywords: [
      'mobile invoicing',
      'field service app',
      'contractor app',
      'mobile-first design',
    ],
  },
  'complete-job': {
    filename: 'complete-job.webp',
    alt: 'Painter and homeowner completing transaction with QR code payment on phone',
    title: 'Complete Job - Get Paid On Site',
    description:
      'Painter and homeowner completing job with instant payment via QR code on phone, showing complete job workflow',
    width: 800,
    height: 600,
    category: 'feature',
    seoKeywords: [
      'job completion',
      'final payment',
      'QR code payments',
      'on-site payment',
    ],
  },
  'electrician-hero': {
    filename: 'electrician-hero.webp',
    alt: 'Licensed electrician at electrical panel using tablet for job management',
    title: 'Electrician Invoicing Software',
    description:
      'Professional electrician using ProInvoice tablet app at electrical panel to manage estimates and invoices',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'electrician software',
      'electrical invoicing',
      'electrician estimates',
      'electrical contractor app',
    ],
  },
  'plumber-hero': {
    filename: 'plumber-hero.webp',
    alt: 'Plumber in service van reviewing invoice on phone between jobs',
    title: 'Plumber Invoicing Software',
    description:
      'Plumber in company van using phone to review invoices and manage jobs with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'plumber software',
      'plumbing invoicing',
      'plumber estimates',
      'plumbing contractor app',
    ],
  },
  'roofer-hero': {
    filename: 'roofer-hero.webp',
    alt: 'Roofing foreman on site using phone to send estimate to customer',
    title: 'Roofer Invoicing Software',
    description:
      'Roofing foreman at job site using phone to send professional estimates with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'roofer software',
      'roofing invoicing',
      'roofer estimates',
      'roofing contractor app',
    ],
  },
  'painter-hero': {
    filename: 'painter-hero.webp',
    alt: 'Painter in work clothes reviewing bid on phone at completed job site',
    title: 'Painter Invoicing Software',
    description:
      'Painter at job site using phone to review and send bids with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'painter software',
      'painting invoicing',
      'painter estimates',
      'painting contractor app',
    ],
  },
  'landscaper-hero': {
    filename: 'landscaper-hero.webp',
    alt: 'Landscape crew lead using tablet for milestone billing at job site',
    title: 'Landscaper Invoicing Software',
    description:
      'Landscape crew lead using tablet to manage milestone billing and payments with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'landscaper software',
      'landscaping invoicing',
      'landscaper estimates',
      'landscaping contractor app',
    ],
  },
  'hvac-hero': {
    filename: 'hvac-hero.webp',
    alt: 'HVAC technician at outdoor unit using diagnostic tablet for service estimates',
    title: 'HVAC Invoicing Software',
    description:
      'HVAC technician using tablet at outdoor unit to create service estimates with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'HVAC software',
      'HVAC invoicing',
      'HVAC estimates',
      'HVAC contractor app',
    ],
  },
  'gc-hero': {
    filename: 'gc-hero.webp',
    alt: 'General contractor at construction site reviewing blueprints on tablet',
    title: 'General Contractor Invoicing Software',
    description:
      'General contractor at active construction site using tablet to manage estimates and billing with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'general contractor software',
      'construction invoicing',
      'contractor estimates',
      'construction management app',
    ],
  },
  'handyman-hero': {
    filename: 'handyman-hero.webp',
    alt: 'Handyman with tool belt using phone in residential setting',
    title: 'Handyman Invoicing Software',
    description:
      'Handyman using phone to manage jobs and invoices with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'handyman software',
      'handyman invoicing',
      'handyman estimates',
      'handyman app',
    ],
  },
  'carpenter-hero': {
    filename: 'carpenter-hero.webp',
    alt: 'Carpenter at workbench using tablet to create project estimates',
    title: 'Carpenter Invoicing Software',
    description:
      'Carpenter using tablet to manage estimates and invoices with ProInvoice',
    width: 1200,
    height: 800,
    category: 'trade',
    seoKeywords: [
      'carpenter software',
      'carpentry invoicing',
      'carpenter estimates',
      'carpentry contractor app',
    ],
  },
};

/**
 * Get metadata for a specific image
 */
export const getImageMetadata = (filename: string): ImageMetadata | undefined => {
  const key = filename.replace(/\.(webp|jpg|png)$/, '');
  return imageMetadata[key];
};

/**
 * Get all images by category
 */
export const getImagesByCategory = (
  category: ImageMetadata['category']
): ImageMetadata[] => {
  return Object.values(imageMetadata).filter((img) => img.category === category);
};

