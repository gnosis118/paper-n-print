/**
 * Estimate Templates Data
 * Re-exports nicheTemplates for use in estimate template pages
 */

import { nicheTemplates, NicheTemplate } from './nicheTemplates';

// Export the templates with the same interface
export type EstimateTemplate = NicheTemplate;

export const estimateTemplates: EstimateTemplate[] = nicheTemplates;

// Helper function to get template by title
export const getEstimateTemplateByTitle = (title: string): EstimateTemplate | undefined => {
  return estimateTemplates.find(t => t.title === title);
};

// Helper function to get template by slug
export const getEstimateTemplateBySlug = (slug: string): EstimateTemplate | undefined => {
  return estimateTemplates.find(t => t.slug === slug);
};

// Helper function to get all estimate titles
export const getEstimateTemplateTitles = (): string[] => {
  return estimateTemplates.map(t => t.title);
};

