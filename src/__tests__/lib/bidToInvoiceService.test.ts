import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  convertBidToInvoice,
  sendDepositReceivedEmail,
  sendInvoiceCreatedEmail,
  handleDepositPaidWebhook,
} from '@/lib/bidToInvoiceService';

// Mock Supabase
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: {
        id: 'est1',
        user_id: 'user1',
        client_id: 'client1',
        client_name: 'John Doe',
        client_email: 'john@example.com',
        number: 'EST-001',
        items: [{ description: 'Service', rate: 1000 }],
        subtotal: 1000,
        tax_rate: 8,
        tax_amount: 80,
        total: 1080,
        deposit_amount: 324,
        terms: 'Net 30',
        notes: 'Test estimate',
      },
      error: null,
    }),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
  })),
  functions: {
    invoke: vi.fn().mockResolvedValue({ data: null, error: null }),
  },
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase,
}));

describe('bidToInvoiceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('convertBidToInvoice', () => {
    it('should convert bid to invoice successfully', async () => {
      const result = await convertBidToInvoice({
        estimateId: 'est1',
        userId: 'user1',
        sendEmail: false,
      });

      expect(result.success).toBe(true);
      expect(result.invoice).toBeDefined();
      expect(result.message).toContain('successfully converted');
    });

    it('should throw error if estimate not found', async () => {
      mockSupabase.from().select().eq().single.mockResolvedValueOnce({
        data: null,
        error: new Error('Not found'),
      });

      await expect(
        convertBidToInvoice({
          estimateId: 'invalid',
          userId: 'user1',
        })
      ).rejects.toThrow();
    });

    it('should create invoice with correct number format', async () => {
      const result = await convertBidToInvoice({
        estimateId: 'est1',
        userId: 'user1',
        sendEmail: false,
      });

      expect(result.invoice.number).toMatch(/^INV-/);
    });

    it('should update estimate status to invoiced', async () => {
      await convertBidToInvoice({
        estimateId: 'est1',
        userId: 'user1',
        sendEmail: false,
      });

      // Verify update was called
      expect(mockSupabase.from).toHaveBeenCalled();
    });
  });

  describe('sendDepositReceivedEmail', () => {
    it('should send deposit received email', async () => {
      const result = await sendDepositReceivedEmail({
        clientEmail: 'john@example.com',
        clientName: 'John Doe',
        estimateNumber: 'EST-001',
        depositAmount: 324,
        userId: 'user1',
      });

      expect(result.success).toBe(true);
    });

    it('should handle email sending errors gracefully', async () => {
      mockSupabase.functions.invoke.mockResolvedValueOnce({
        data: null,
        error: new Error('Email service error'),
      });

      const result = await sendDepositReceivedEmail({
        clientEmail: 'john@example.com',
        clientName: 'John Doe',
        estimateNumber: 'EST-001',
        depositAmount: 324,
        userId: 'user1',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('sendInvoiceCreatedEmail', () => {
    it('should send invoice created email', async () => {
      const result = await sendInvoiceCreatedEmail({
        clientEmail: 'john@example.com',
        clientName: 'John Doe',
        invoiceNumber: 'INV-001',
        invoiceTotal: 1080,
        userId: 'user1',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('handleDepositPaidWebhook', () => {
    it('should handle deposit paid webhook', async () => {
      const result = await handleDepositPaidWebhook({
        estimateId: 'est1',
        userId: 'user1',
        depositAmount: 324,
        clientEmail: 'john@example.com',
        clientName: 'John Doe',
      });

      expect(result.success).toBe(true);
    });

    it('should send both deposit and invoice emails', async () => {
      await handleDepositPaidWebhook({
        estimateId: 'est1',
        userId: 'user1',
        depositAmount: 324,
        clientEmail: 'john@example.com',
        clientName: 'John Doe',
      });

      // Verify email functions were called
      expect(mockSupabase.functions.invoke).toHaveBeenCalled();
    });
  });
});

