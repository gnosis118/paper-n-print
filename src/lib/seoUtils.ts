/**
 * SEO utilities for schema markup and structured data
 */

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Generate SoftwareApplication schema for ProInvoice
 */
export const generateSoftwareApplicationSchema = (): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ProInvoice',
  description: 'Professional invoicing and bid management software for contractors',
  url: 'https://www.proinvoice.app',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free to start, paid plans available',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
});

/**
 * Generate LocalBusiness schema for contractor trades
 */
export const generateLocalBusinessSchema = (options: {
  name: string;
  description: string;
  industry: string;
  url: string;
}): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: options.name,
  description: options.description,
  url: options.url,
  image: 'https://www.proinvoice.app/logo.png',
  telephone: '+1-800-INVOICE',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.facebook.com/proinvoice',
    'https://www.twitter.com/proinvoice',
    'https://www.linkedin.com/company/proinvoice',
  ],
});

/**
 * Generate FAQPage schema for trade pages
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Generate Organization schema
 */
export const generateOrganizationSchema = (): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ProInvoice',
  url: 'https://www.proinvoice.app',
  logo: 'https://www.proinvoice.app/logo.png',
  description: 'Professional invoicing and bid management for contractors',
  sameAs: [
    'https://www.facebook.com/proinvoice',
    'https://www.twitter.com/proinvoice',
    'https://www.linkedin.com/company/proinvoice',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    telephone: '+1-800-INVOICE',
    email: 'support@proinvoice.app',
  },
});

/**
 * Generate Product schema for pricing plans
 */
export const generateProductSchema = (options: {
  name: string;
  description: string;
  price: number;
  currency: string;
}): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: options.name,
  description: options.description,
  offers: {
    '@type': 'Offer',
    price: options.price,
    priceCurrency: options.currency,
    availability: 'https://schema.org/InStock',
  },
});

/**
 * Generate Article schema for blog posts
 */
export const generateArticleSchema = (options: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: options.headline,
  description: options.description,
  image: options.image,
  datePublished: options.datePublished,
  dateModified: options.dateModified,
  author: {
    '@type': 'Person',
    name: options.author,
  },
  url: options.url,
});

/**
 * Generate HowTo schema for guides
 */
export const generateHowToSchema = (options: {
  name: string;
  description: string;
  image: string;
  steps: Array<{ name: string; description: string; image?: string }>;
}): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: options.name,
  description: options.description,
  image: options.image,
  step: options.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.description,
    ...(step.image && { image: step.image }),
  })),
});

/**
 * Get meta tags for a page
 */
export const getMetaTags = (options: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url: string;
  type?: string;
}): Record<string, string> => ({
  'og:title': options.title,
  'og:description': options.description,
  'og:type': options.type || 'website',
  'og:url': options.url,
  ...(options.image && { 'og:image': options.image }),
  'twitter:title': options.title,
  'twitter:description': options.description,
  'twitter:card': 'summary_large_image',
  ...(options.image && { 'twitter:image': options.image }),
});

