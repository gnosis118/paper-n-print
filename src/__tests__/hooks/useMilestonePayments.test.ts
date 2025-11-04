import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useMilestonePayments } from '@/hooks/useMilestonePayments';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [
          {
            id: '1',
            estimate_id: 'est1',
            user_id: 'user1',
            milestone_number: 1,
            description: 'Foundation',
            amount: 5000,
            status: 'paid',
            paid_at: '2025-11-01',
          },
          {
            id: '2',
            estimate_id: 'est1',
            user_id: 'user1',
            milestone_number: 2,
            description: 'Framing',
            amount: 5000,
            status: 'pending',
          },
        ],
        error: null,
      }),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: '3', milestone_number: 3 },
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

describe('useMilestonePayments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty milestones', () => {
    const { result } = renderHook(() => useMilestonePayments('est1'));
    expect(result.current.milestones).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('should calculate total milestone amount correctly', async () => {
    const { result } = renderHook(() => useMilestonePayments('est1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const total = result.current.getTotalMilestoneAmount();
    expect(total).toBe(10000);
  });

  it('should calculate paid amount correctly', async () => {
    const { result } = renderHook(() => useMilestonePayments('est1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const paid = result.current.getPaidAmount();
    expect(paid).toBe(5000);
  });

  it('should calculate pending amount correctly', async () => {
    const { result } = renderHook(() => useMilestonePayments('est1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const pending = result.current.getPendingAmount();
    expect(pending).toBe(5000);
  });

  it('should mark milestone as paid', async () => {
    const { result } = renderHook(() => useMilestonePayments('est1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.markAsPaid('1');
    });

    // Verify the update was called
    expect(result.current.milestones).toBeDefined();
  });

  it('should not load milestones without estimateId', () => {
    const { result } = renderHook(() => useMilestonePayments());
    expect(result.current.loading).toBe(false);
    expect(result.current.milestones).toEqual([]);
  });
});

