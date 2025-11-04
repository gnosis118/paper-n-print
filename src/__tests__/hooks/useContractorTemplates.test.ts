import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useContractorTemplates, DEFAULT_CONTRACTOR_TEMPLATES } from '@/hooks/useContractorTemplates';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [],
        error: null,
      }),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: '1', user_id: 'user1', industry: 'electrician' },
        error: null,
      }),
    })),
  },
}));

// Mock useAuth
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'user1' },
  }),
}));

describe('useContractorTemplates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty templates', () => {
    const { result } = renderHook(() => useContractorTemplates());
    expect(result.current.templates).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('should have default templates for all industries', () => {
    expect(DEFAULT_CONTRACTOR_TEMPLATES).toHaveProperty('electrician');
    expect(DEFAULT_CONTRACTOR_TEMPLATES).toHaveProperty('plumber');
    expect(DEFAULT_CONTRACTOR_TEMPLATES).toHaveProperty('roofer');
    expect(DEFAULT_CONTRACTOR_TEMPLATES).toHaveProperty('landscaper');
    expect(DEFAULT_CONTRACTOR_TEMPLATES).toHaveProperty('handyman');
  });

  it('should have correct structure for electrician template', () => {
    const template = DEFAULT_CONTRACTOR_TEMPLATES.electrician;
    expect(template.name).toBe('Electrical Work');
    expect(template.items).toBeDefined();
    expect(template.tax_rate).toBe(8);
    expect(template.deposit_percentage).toBe(50);
  });

  it('should have correct structure for plumber template', () => {
    const template = DEFAULT_CONTRACTOR_TEMPLATES.plumber;
    expect(template.name).toBe('Plumbing Services');
    expect(template.items).toBeDefined();
    expect(template.tax_rate).toBe(8);
    expect(template.deposit_percentage).toBe(40);
  });

  it('should have correct structure for roofer template', () => {
    const template = DEFAULT_CONTRACTOR_TEMPLATES.roofer;
    expect(template.name).toBe('Roofing Project');
    expect(template.items).toBeDefined();
    expect(template.tax_rate).toBe(8);
    expect(template.deposit_percentage).toBe(50);
  });

  it('should have correct structure for landscaper template', () => {
    const template = DEFAULT_CONTRACTOR_TEMPLATES.landscaper;
    expect(template.name).toBe('Landscaping Services');
    expect(template.items).toBeDefined();
    expect(template.tax_rate).toBe(8);
    expect(template.deposit_percentage).toBe(30);
  });

  it('should have correct structure for handyman template', () => {
    const template = DEFAULT_CONTRACTOR_TEMPLATES.handyman;
    expect(template.name).toBe('Handyman Services');
    expect(template.items).toBeDefined();
    expect(template.tax_rate).toBe(8);
    expect(template.deposit_percentage).toBe(25);
  });

  it('should filter templates by industry', async () => {
    const { result } = renderHook(() => useContractorTemplates());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const electricianTemplates = result.current.getTemplatesByIndustry('electrician');
    expect(Array.isArray(electricianTemplates)).toBe(true);
  });
});

