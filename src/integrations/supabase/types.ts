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
      app_settings: {
        Row: {
          cron_secret: string
          id: string
          site_url: string
          updated_at: string
        }
        Insert: {
          cron_secret: string
          id?: string
          site_url: string
          updated_at?: string
        }
        Update: {
          cron_secret?: string
          id?: string
          site_url?: string
          updated_at?: string
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
          company: string | null
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
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
          accepted_ip: unknown | null
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
          accepted_ip?: unknown | null
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
          accepted_ip?: unknown | null
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
            foreignKeyName: "invoices_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
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
      user_subscriptions: {
        Row: {
          created_at: string
          credits_per_month: number | null
          current_period_end: string | null
          current_period_start: string | null
          features: Json
          id: string
          next_credit_at: string | null
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
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
          next_credit_at?: string | null
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
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
          next_credit_at?: string | null
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_estimate_with_token: {
        Args: { _sharing_token: string }
        Returns: boolean
      }
      get_user_credit_balance: {
        Args: { p_user_id?: string }
        Returns: {
          balance: number
          templates_downloaded: number
        }[]
      }
      invoke_pro_scans: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reset_monthly_scan_counts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      upsert_app_settings: {
        Args: { p_cron_secret: string; p_site_url: string }
        Returns: {
          cron_secret: string
          id: string
          site_url: string
          updated_at: string
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
