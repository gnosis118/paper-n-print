export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          avg_response_time_minutes: number | null
          client_id: string
          conversion_rate: number | null
          created_at: string
          date: string
          emails_sent: number | null
          id: string
          leads_contacted: number | null
          leads_converted: number | null
          leads_count: number | null
          messages_sent: number | null
          metadata: Json | null
          sms_sent: number | null
          updated_at: string
        }
        Insert: {
          avg_response_time_minutes?: number | null
          client_id: string
          conversion_rate?: number | null
          created_at?: string
          date: string
          emails_sent?: number | null
          id?: string
          leads_contacted?: number | null
          leads_converted?: number | null
          leads_count?: number | null
          messages_sent?: number | null
          metadata?: Json | null
          sms_sent?: number | null
          updated_at?: string
        }
        Update: {
          avg_response_time_minutes?: number | null
          client_id?: string
          conversion_rate?: number | null
          created_at?: string
          date?: string
          emails_sent?: number | null
          id?: string
          leads_contacted?: number | null
          leads_converted?: number | null
          leads_count?: number | null
          messages_sent?: number | null
          metadata?: Json | null
          sms_sent?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      anonymous_usage: {
        Row: {
          created_at: string | null
          fingerprint: string | null
          id: string
          invoice_count: number | null
          ip_address: unknown
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          fingerprint?: string | null
          id?: string
          invoice_count?: number | null
          ip_address: unknown
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          fingerprint?: string | null
          id?: string
          invoice_count?: number | null
          ip_address?: unknown
          window_start?: string | null
        }
        Relationships: []
      }
      api_rate_limits: {
        Row: {
          api_key: string
          client_id: string
          created_at: string
          id: string
          ip_address: string | null
          last_request_at: string
          metadata: Json | null
          request_count: number | null
          updated_at: string
          window_start: string
        }
        Insert: {
          api_key: string
          client_id: string
          created_at?: string
          id?: string
          ip_address?: string | null
          last_request_at?: string
          metadata?: Json | null
          request_count?: number | null
          updated_at?: string
          window_start?: string
        }
        Update: {
          api_key?: string
          client_id?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          last_request_at?: string
          metadata?: Json | null
          request_count?: number | null
          updated_at?: string
          window_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_rate_limits_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_rate_limits_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      app_settings: {
        Row: {
          id: string
          site_url: string
          updated_at: string
        }
        Insert: {
          id?: string
          site_url: string
          updated_at?: string
        }
        Update: {
          id?: string
          site_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          record_id: string
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          record_id: string
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          record_id?: string
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          accent_color: string | null
          address: string | null
          created_at: string
          email: string
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          accent_color?: string | null
          address?: string | null
          created_at?: string
          email: string
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          accent_color?: string | null
          address?: string | null
          created_at?: string
          email?: string
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          agent_name: string | null
          api_key: string | null
          booking_link: string | null
          business_name: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          is_active: boolean | null
          location: string | null
          name: string
          notification_email: string | null
          notification_preferences: Json | null
          offer_text: string | null
          openai_api_key_encrypted: string | null
          phone: string | null
          sendgrid_api_key_encrypted: string | null
          signature: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
          twilio_account_sid_encrypted: string | null
          twilio_auth_token_encrypted: string | null
          twilio_phone_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          agent_name?: string | null
          api_key?: string | null
          booking_link?: string | null
          business_name?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          name: string
          notification_email?: string | null
          notification_preferences?: Json | null
          offer_text?: string | null
          openai_api_key_encrypted?: string | null
          phone?: string | null
          sendgrid_api_key_encrypted?: string | null
          signature?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          twilio_account_sid_encrypted?: string | null
          twilio_auth_token_encrypted?: string | null
          twilio_phone_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          agent_name?: string | null
          api_key?: string | null
          booking_link?: string | null
          business_name?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          name?: string
          notification_email?: string | null
          notification_preferences?: Json | null
          offer_text?: string | null
          openai_api_key_encrypted?: string | null
          phone?: string | null
          sendgrid_api_key_encrypted?: string | null
          signature?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          twilio_account_sid_encrypted?: string | null
          twilio_auth_token_encrypted?: string | null
          twilio_phone_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_ledger: {
        Row: {
          created_at: string | null
          delta: number
          id: string
          reason: string
          stripe_event_id: string | null
          template_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delta: number
          id?: string
          reason: string
          stripe_event_id?: string | null
          template_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          delta?: number
          id?: string
          reason?: string
          stripe_event_id?: string | null
          template_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      estimates: {
        Row: {
          accepted_at: string | null
          accepted_ip: unknown
          checkout_session_id: string | null
          client_id: string | null
          created_at: string | null
          deposit_type: string | null
          deposit_value: number | null
          id: string
          items: Json | null
          number: string
          payment_intent_id: string | null
          public_slug: string | null
          sharing_enabled: boolean | null
          sharing_expires_at: string | null
          sharing_token: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          tax_rate: number | null
          terms: string | null
          title: string
          total: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_ip?: unknown
          checkout_session_id?: string | null
          client_id?: string | null
          created_at?: string | null
          deposit_type?: string | null
          deposit_value?: number | null
          id?: string
          items?: Json | null
          number: string
          payment_intent_id?: string | null
          public_slug?: string | null
          sharing_enabled?: boolean | null
          sharing_expires_at?: string | null
          sharing_token?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          terms?: string | null
          title: string
          total?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          accepted_ip?: unknown
          checkout_session_id?: string | null
          client_id?: string | null
          created_at?: string | null
          deposit_type?: string | null
          deposit_value?: number | null
          id?: string
          items?: Json | null
          number?: string
          payment_intent_id?: string | null
          public_slug?: string | null
          sharing_enabled?: boolean | null
          sharing_expires_at?: string | null
          sharing_token?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          terms?: string | null
          title?: string
          total?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number
          rate: number
          sort_order: number
          taxable: boolean
        }
        Insert: {
          amount?: number
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          rate?: number
          sort_order?: number
          taxable?: boolean
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          rate?: number
          sort_order?: number
          taxable?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          accent_color: string
          business_profile_id: string | null
          client_id: string | null
          created_at: string
          discount: number
          due_date: string
          estimate_id: string | null
          id: string
          invoice_number: string
          issue_date: string
          notes: string | null
          pay_link_url: string | null
          pay_qr_svg: string | null
          payment_terms: string
          shipping: number
          status: string
          subtotal: number
          tax_amount: number
          tax_rate: number
          template: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          accent_color?: string
          business_profile_id?: string | null
          client_id?: string | null
          created_at?: string
          discount?: number
          due_date: string
          estimate_id?: string | null
          id?: string
          invoice_number: string
          issue_date: string
          notes?: string | null
          pay_link_url?: string | null
          pay_qr_svg?: string | null
          payment_terms?: string
          shipping?: number
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          template?: string
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          accent_color?: string
          business_profile_id?: string | null
          client_id?: string | null
          created_at?: string
          discount?: number
          due_date?: string
          estimate_id?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          notes?: string | null
          pay_link_url?: string | null
          pay_qr_svg?: string | null
          payment_terms?: string
          shipping?: number
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          template?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          client_id: string
          created_at: string
          email: string | null
          id: string
          metadata: Json | null
          name: string
          notes: string | null
          phone: string | null
          service: string | null
          source: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          email?: string | null
          id?: string
          metadata?: Json | null
          name: string
          notes?: string | null
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          notes?: string | null
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          client_id: string
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          subject: string | null
          tone: string | null
          type: string
          updated_at: string
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          subject?: string | null
          tone?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string | null
          tone?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_templates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_templates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          client_id: string
          content: string
          created_at: string
          delivered_at: string | null
          direction: string
          error_message: string | null
          id: string
          lead_id: string
          metadata: Json | null
          provider_message_id: string | null
          sent_at: string | null
          status: string | null
          subject: string | null
          type: string
          updated_at: string
        }
        Insert: {
          client_id: string
          content: string
          created_at?: string
          delivered_at?: string | null
          direction: string
          error_message?: string | null
          id?: string
          lead_id: string
          metadata?: Json | null
          provider_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          content?: string
          created_at?: string
          delivered_at?: string | null
          direction?: string
          error_message?: string | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          provider_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      monitored_sites: {
        Row: {
          active: boolean
          created_at: string
          id: string
          url: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          url: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          metadata: Json | null
          read: boolean
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          metadata?: Json | null
          read?: boolean
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          metadata?: Json | null
          read?: boolean
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          estimate_id: string | null
          id: string
          invoice_id: string | null
          method: string | null
          status: string | null
          stripe_payment_intent: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          estimate_id?: string | null
          id?: string
          invoice_id?: string | null
          method?: string | null
          status?: string | null
          stripe_payment_intent?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          estimate_id?: string | null
          id?: string
          invoice_id?: string | null
          method?: string | null
          status?: string | null
          stripe_payment_intent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          invoice_count: number
          plan: string
          scan_count: number
          scan_limit: number
          subscription_status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          invoice_count?: number
          plan?: string
          scan_count?: number
          scan_limit?: number
          subscription_status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          invoice_count?: number
          plan?: string
          scan_count?: number
          scan_limit?: number
          subscription_status?: string
          updated_at?: string
        }
        Relationships: []
      }
      scan_results: {
        Row: {
          created_at: string
          details: Json | null
          id: string
          issues: Json | null
          score: number | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: string
          issues?: Json | null
          score?: number | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: string
          issues?: Json | null
          score?: number | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          display_name: string
          features: Json
          id: string
          is_active: boolean | null
          leads_limit: number
          name: string
          price_monthly: number
          sort_order: number | null
          stripe_price_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name: string
          features: Json
          id?: string
          is_active?: boolean | null
          leads_limit: number
          name: string
          price_monthly: number
          sort_order?: number | null
          stripe_price_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          features?: Json
          id?: string
          is_active?: boolean | null
          leads_limit?: number
          name?: string
          price_monthly?: number
          sort_order?: number | null
          stripe_price_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      trial_expiration_notifications: {
        Row: {
          created_at: string
          dismissed: boolean | null
          id: string
          notification_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dismissed?: boolean | null
          id?: string
          notification_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dismissed?: boolean | null
          id?: string
          notification_date?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          credits_per_month: number | null
          current_period_end: string | null
          current_period_start: string | null
          features: Json
          id: string
          is_trial: boolean | null
          next_credit_at: string | null
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          trial_end_date: string | null
          trial_start_date: string | null
          trial_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_per_month?: number | null
          current_period_end?: string | null
          current_period_start?: string | null
          features?: Json
          id?: string
          is_trial?: boolean | null
          next_credit_at?: string | null
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_end_date?: string | null
          trial_start_date?: string | null
          trial_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_per_month?: number | null
          current_period_end?: string | null
          current_period_start?: string | null
          features?: Json
          id?: string
          is_trial?: boolean | null
          next_credit_at?: string | null
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_end_date?: string | null
          trial_start_date?: string | null
          trial_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      weekly_reports: {
        Row: {
          ai_insights: string | null
          avg_response_time_minutes: number | null
          client_id: string
          conversion_rate: number | null
          created_at: string
          id: string
          metadata: Json | null
          recommendations: string | null
          top_performing_sources: Json | null
          total_leads: number | null
          total_messages: number | null
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          ai_insights?: string | null
          avg_response_time_minutes?: number | null
          client_id: string
          conversion_rate?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          recommendations?: string | null
          top_performing_sources?: Json | null
          total_leads?: number | null
          total_messages?: number | null
          week_end_date: string
          week_start_date: string
        }
        Update: {
          ai_insights?: string | null
          avg_response_time_minutes?: number | null
          client_id?: string
          conversion_rate?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          recommendations?: string | null
          top_performing_sources?: Json | null
          total_leads?: number | null
          total_messages?: number | null
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_reports_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_reports_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_safe"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      clients_safe: {
        Row: {
          agent_name: string | null
          booking_link: string | null
          business_name: string | null
          created_at: string | null
          email: string | null
          has_openai_key: boolean | null
          has_sendgrid_key: boolean | null
          has_twilio_key: boolean | null
          id: string | null
          is_active: boolean | null
          location: string | null
          notification_email: string | null
          notification_preferences: Json | null
          offer_text: string | null
          phone: string | null
          signature: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
          twilio_phone_number: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agent_name?: string | null
          booking_link?: string | null
          business_name?: string | null
          created_at?: string | null
          email?: string | null
          has_openai_key?: never
          has_sendgrid_key?: never
          has_twilio_key?: never
          id?: string | null
          is_active?: boolean | null
          location?: string | null
          notification_email?: string | null
          notification_preferences?: Json | null
          offer_text?: string | null
          phone?: string | null
          signature?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          twilio_phone_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agent_name?: string | null
          booking_link?: string | null
          business_name?: string | null
          created_at?: string | null
          email?: string | null
          has_openai_key?: never
          has_sendgrid_key?: never
          has_twilio_key?: never
          id?: string | null
          is_active?: boolean | null
          location?: string | null
          notification_email?: string | null
          notification_preferences?: Json | null
          offer_text?: string | null
          phone?: string | null
          signature?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          twilio_phone_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      can_access_estimate_with_token: {
        Args: { p_token: string }
        Returns: boolean
      }
      check_api_keys_configured: {
        Args: { p_client_id: string }
        Returns: Json
      }
      check_rate_limit: {
        Args: {
          p_api_key?: string
          p_client_id?: string
          p_ip_address?: string
          p_max_requests?: number
        }
        Returns: Json
      }
      check_trial_expiration: {
        Args: { user_id: string }
        Returns: {
          is_expired: boolean
          plan: string
          trial_status: string
        }[]
      }
      cleanup_old_anonymous_usage: {
        Args: { days_to_keep?: number }
        Returns: number
      }
      cleanup_old_audit_logs: {
        Args: { days_to_keep?: number }
        Returns: number
      }
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
      expire_trial: {
        Args: { user_id: string }
        Returns: {
          message: string
          success: boolean
        }[]
      }
      get_client_secure: {
        Args: { client_id: string }
        Returns: {
          address: string
          company: string
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }[]
      }
      get_estimate_by_token: {
        Args: { p_token: string }
        Returns: {
          created_at: string
          deposit_type: string
          deposit_value: number
          id: string
          items: Json
          number: string
          status: string
          subtotal: number
          tax_amount: number
          tax_rate: number
          terms: string
          title: string
          total: number
        }[]
      }
      get_user_credit_balance: {
        Args: { p_user_id: string }
        Returns: {
          balance: number
          templates_downloaded: number
        }[]
      }
      invoke_pro_scans: { Args: never; Returns: undefined }
      replace_template_variables: {
        Args: { p_client_id: string; p_lead_id: string; p_template: string }
        Returns: string
      }
      reset_monthly_scan_counts: { Args: never; Returns: undefined }
      seed_default_templates: {
        Args: { p_client_id: string }
        Returns: undefined
      }
      upsert_app_settings:
        | {
            Args: { p_site_url: string }
            Returns: {
              id: string
              site_url: string
              updated_at: string
            }
            SetofOptions: {
              from: "*"
              to: "app_settings"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { p_cron_secret: string; p_site_url: string }
            Returns: {
              id: string
              site_url: string
              updated_at: string
            }
            SetofOptions: {
              from: "*"
              to: "app_settings"
              isOneToOne: true
              isSetofReturn: false
            }
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
