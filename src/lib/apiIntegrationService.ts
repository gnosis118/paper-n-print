/**
 * API Integration Service
 * Provides endpoints and utilities for third-party integrations
 * Supports: CRM lead capture, webhooks, estimate-to-invoice conversion
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Convert estimate to invoice
 * API endpoint: POST /api/estimates/{estimateId}/convert-to-invoice
 */
export const convertEstimateToInvoice = async (
  estimateId: string,
  userId: string,
  options?: {
    includeDeposit?: boolean;
    depositPaid?: boolean;
    dueDate?: string;
  }
) => {
  try {
    // Fetch estimate
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .select('*')
      .eq('id', estimateId)
      .eq('user_id', userId)
      .single();

    if (estimateError) throw estimateError;
    if (!estimate) throw new Error('Estimate not found');

    // Calculate invoice amount
    let invoiceAmount = estimate.total;
    if (options?.includeDeposit && estimate.deposit_amount) {
      invoiceAmount = estimate.total - estimate.deposit_amount;
    }

    // Create invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        user_id: userId,
        client_id: estimate.client_id,
        estimate_id: estimateId,
        amount: invoiceAmount,
        status: options?.depositPaid ? 'partially_paid' : 'draft',
        due_date: options?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        items: estimate.items,
        notes: estimate.notes,
      })
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    // Update estimate status
    await supabase
      .from('estimates')
      .update({ status: 'converted_to_invoice' })
      .eq('id', estimateId);

    return invoice;
  } catch (error) {
    console.error('Error converting estimate to invoice:', error);
    throw error;
  }
};

/**
 * Capture lead from CRM
 * API endpoint: POST /api/leads/capture
 */
export const captureLead = async (
  userId: string,
  leadData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    source?: string;
    notes?: string;
  }
) => {
  try {
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        user_id: userId,
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        source: leadData.source || 'api',
        notes: leadData.notes,
        status: 'new',
      })
      .select()
      .single();

    if (error) throw error;

    return lead;
  } catch (error) {
    console.error('Error capturing lead:', error);
    throw error;
  }
};

/**
 * Register webhook
 * API endpoint: POST /api/webhooks/register
 */
export const registerWebhook = async (
  userId: string,
  webhookData: {
    url: string;
    events: string[];
    secret?: string;
  }
) => {
  try {
    const { data: webhook, error } = await supabase
      .from('webhooks')
      .insert({
        user_id: userId,
        url: webhookData.url,
        events: webhookData.events,
        secret: webhookData.secret || generateWebhookSecret(),
        active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return webhook;
  } catch (error) {
    console.error('Error registering webhook:', error);
    throw error;
  }
};

/**
 * Trigger webhook
 * API endpoint: POST /api/webhooks/trigger
 */
export const triggerWebhook = async (
  webhookId: string,
  eventType: string,
  payload: Record<string, any>
) => {
  try {
    // Fetch webhook
    const { data: webhook, error: webhookError } = await supabase
      .from('webhooks')
      .select('*')
      .eq('id', webhookId)
      .single();

    if (webhookError) throw webhookError;
    if (!webhook || !webhook.active) return;

    // Check if webhook is subscribed to this event
    if (!webhook.events.includes(eventType)) return;

    // Send webhook
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': webhook.secret,
        'X-Event-Type': eventType,
      },
      body: JSON.stringify({
        event: eventType,
        timestamp: new Date().toISOString(),
        data: payload,
      }),
    });

    // Log webhook delivery
    await supabase.from('webhook_logs').insert({
      webhook_id: webhookId,
      event_type: eventType,
      status_code: response.status,
      success: response.ok,
    });

    return response.ok;
  } catch (error) {
    console.error('Error triggering webhook:', error);
    throw error;
  }
};

/**
 * Get API key for user
 * API endpoint: GET /api/keys
 */
export const getApiKey = async (userId: string) => {
  try {
    const { data: apiKey, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    // If no key exists, create one
    if (!apiKey) {
      const newKey = generateApiKey();
      const { data: createdKey, error: createError } = await supabase
        .from('api_keys')
        .insert({
          user_id: userId,
          key: newKey,
          active: true,
        })
        .select()
        .single();

      if (createError) throw createError;
      return createdKey;
    }

    return apiKey;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw error;
  }
};

/**
 * Validate API key
 */
export const validateApiKey = async (apiKey: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('user_id')
      .eq('key', apiKey)
      .eq('active', true)
      .single();

    if (error) return null;
    return data?.user_id || null;
  } catch (error) {
    console.error('Error validating API key:', error);
    return null;
  }
};

/**
 * Generate API key
 */
const generateApiKey = (): string => {
  const prefix = 'pk_';
  const randomPart = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return prefix + randomPart;
};

/**
 * Generate webhook secret
 */
const generateWebhookSecret = (): string => {
  const prefix = 'whsec_';
  const randomPart = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return prefix + randomPart;
};

/**
 * Get integration status
 */
export const getIntegrationStatus = async (userId: string) => {
  try {
    const [apiKeys, webhooks] = await Promise.all([
      supabase.from('api_keys').select('*').eq('user_id', userId),
      supabase.from('webhooks').select('*').eq('user_id', userId),
    ]);

    return {
      apiKeysConfigured: (apiKeys.data?.length || 0) > 0,
      webhooksConfigured: (webhooks.data?.length || 0) > 0,
      activeWebhooks: webhooks.data?.filter((w) => w.active).length || 0,
      totalWebhooks: webhooks.data?.length || 0,
    };
  } catch (error) {
    console.error('Error getting integration status:', error);
    return null;
  }
};

