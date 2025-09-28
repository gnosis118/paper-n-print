import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface InvoiceData {
  business: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    logoUrl?: string;
  };
  client: {
    name: string;
    company: string;
    email: string;
    address: string;
  };
  meta: {
    number: string;
    issueDate: string;
    dueDate: string;
    terms: string;
  };
  items: Array<{
    description: string;
    qty: number;
    rate: number;
    taxable: boolean;
  }>;
  totals: {
    taxRate: number;
    discount: number;
    shipping: number;
    subtotal?: number;
    taxAmount?: number;
    total?: number;
  };
  notes: string;
  template: "Clean" | "Modern" | "Trades";
  accent: string;
  watermark: boolean;
  userProfile?: any;
}

export function useInvoiceData() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    business: {
      name: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      logoUrl: "",
    },
    client: {
      name: "",
      company: "",
      email: "",
      address: "",
    },
    meta: {
      number: `INV-${Date.now().toString().slice(-6)}`,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      terms: "Net 30",
    },
    items: [{ description: "", qty: 1, rate: 0, taxable: true }],
    totals: {
      taxRate: 0,
      discount: 0,
      shipping: 0,
    },
    notes: "",
    template: "Clean",
    accent: "#3b82f6",
    watermark: true,
  });

  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Load user's business profile, subscription, and user profile
  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      try {
        // Load user profile (with invoice count and subscription status)
        const { data: userProf } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (userProf) {
          setUserProfile(userProf);
          setInvoiceData(prev => ({
            ...prev,
            userProfile: userProf,
          }));
        }

        // Load business profile
        const { data: profile } = await supabase
          .from('business_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile) {
          setBusinessProfile(profile);
          setInvoiceData(prev => ({
            ...prev,
            business: {
              name: profile.name || "",
              email: profile.email || "",
              phone: profile.phone || "",
              address: profile.address || "",
              website: profile.website || "",
              logoUrl: profile.logo_url || "",
            }
          }));
        }

        // Load subscription to check features
        const { data: sub } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (sub) {
          setSubscription(sub);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [user]);

  const updateInvoiceData = (path: string, value: any) => {
    setInvoiceData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = { ...current[keys[i]] };
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const saveBusinessProfile = async () => {
    if (!user) return;

    try {
      const businessData = {
        user_id: user.id,
        name: invoiceData.business.name,
        email: invoiceData.business.email,
        phone: invoiceData.business.phone,
        website: invoiceData.business.website,
        address: invoiceData.business.address,
        logo_url: invoiceData.business.logoUrl,
      };

      const { error } = await supabase
        .from('business_profiles')
        .upsert(businessData, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Business profile saved",
        description: "Your business information has been saved for future invoices.",
      });
    } catch (error) {
      console.error('Error saving business profile:', error);
      toast({
        title: "Error",
        description: "Failed to save business profile.",
        variant: "destructive",
      });
    }
  };

  const saveInvoice = async () => {
    if (!user) return null;

    try {
      // First save/update business profile if it has data
      if (invoiceData.business.name && invoiceData.business.email) {
        await saveBusinessProfile();
      }

      // Save client if it's new
      let clientId = null;
      if (invoiceData.client.name && invoiceData.client.email) {
        const { data: existingClient } = await supabase
          .from('clients')
          .select('id')
          .eq('user_id', user.id)
          .eq('email', invoiceData.client.email)
          .maybeSingle();

        if (existingClient) {
          clientId = existingClient.id;
        } else {
          const { data: newClient, error: clientError } = await supabase
            .from('clients')
            .insert({
              user_id: user.id,
              name: invoiceData.client.name,
              company: invoiceData.client.company,
              email: invoiceData.client.email,
              address: invoiceData.client.address,
            })
            .select('id')
            .single();

          if (clientError) throw clientError;
          clientId = newClient.id;
        }
      }

      // Calculate totals
      const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
      const taxAmount = subtotal * (invoiceData.totals.taxRate / 100);
      const total = subtotal + taxAmount - invoiceData.totals.discount + invoiceData.totals.shipping;

      // Save invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          user_id: user.id,
          client_id: clientId,
          invoice_number: invoiceData.meta.number,
          issue_date: invoiceData.meta.issueDate,
          due_date: invoiceData.meta.dueDate,
          payment_terms: invoiceData.meta.terms,
          subtotal,
          tax_rate: invoiceData.totals.taxRate,
          tax_amount: taxAmount,
          discount: invoiceData.totals.discount,
          shipping: invoiceData.totals.shipping,
          total,
          notes: invoiceData.notes,
          template: invoiceData.template,
          accent_color: invoiceData.accent,
          status: 'draft'
        })
        .select('id')
        .single();

      if (invoiceError) throw invoiceError;

      // Save invoice items
      const itemsToInsert = invoiceData.items
        .filter(item => item.description.trim())
        .map((item, index) => ({
          invoice_id: invoice.id,
          description: item.description,
          quantity: item.qty,
          rate: item.rate,
          amount: item.qty * item.rate,
          taxable: item.taxable,
          sort_order: index
        }));

      if (itemsToInsert.length > 0) {
        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(itemsToInsert);

      if (itemsError) throw itemsError;
      }

      // Update user profile invoice count for free users
      if (userProfile?.subscription_status === 'free') {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            invoice_count: (userProfile.invoice_count || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (!profileError) {
          setUserProfile(prev => ({
            ...prev,
            invoice_count: (prev?.invoice_count || 0) + 1
          }));
          
          // Update watermark state if this is their first invoice
          if ((userProfile.invoice_count || 0) === 0) {
            setInvoiceData(prev => ({
              ...prev,
              userProfile: {
                ...prev.userProfile,
                invoice_count: (prev.userProfile?.invoice_count || 0) + 1
              }
            }));
          }
        }
      }

      toast({
        title: "Invoice saved",
        description: `Invoice ${invoiceData.meta.number} has been saved successfully.`,
      });

      return invoice.id;
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        title: "Error",
        description: "Failed to save invoice.",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    invoiceData,
    updateInvoiceData,
    saveInvoice,
    saveBusinessProfile,
    subscription,
    businessProfile,
    userProfile
  };
}