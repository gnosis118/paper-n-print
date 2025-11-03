import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface EstimateData {
  clientName: string;
  clientEmail: string;
  number: string;
  title: string;
  items: Array<{
    description: string;
    qty: number;
    rate: number;
  }>;
  taxRate: number;
  depositPercentage: number;
  notes: string;
}

export function useEstimateData() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [estimateData, setEstimateData] = useState<EstimateData>({
    clientName: "",
    clientEmail: "",
    number: `EST-${Date.now().toString().slice(-6)}`,
    title: "",
    items: [{ description: "", qty: 1, rate: 0 }],
    taxRate: 0,
    depositPercentage: 30,
    notes: "",
  });

  const updateEstimateData = (path: string, value: any) => {
    setEstimateData((prev) => {
      const keys = path.split(".");
      let current: any = { ...prev };
      let target = current;

      for (let i = 0; i < keys.length - 1; i++) {
        target[keys[i]] = { ...target[keys[i]] };
        target = target[keys[i]];
      }

      target[keys[keys.length - 1]] = value;
      return current;
    });
  };

  const calculateTotals = () => {
    const subtotal = estimateData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const taxAmount = subtotal * (estimateData.taxRate / 100);
    const total = subtotal + taxAmount;
    const depositAmount = total * (estimateData.depositPercentage / 100);
    
    return { subtotal, taxAmount, total, depositAmount };
  };

  const saveEstimate = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create an estimate.",
        variant: "destructive",
      });
      return null;
    }

    if (!estimateData.clientName || !estimateData.clientEmail) {
      toast({
        title: "Validation Error",
        description: "Client name and email are required.",
        variant: "destructive",
      });
      return null;
    }

    if (estimateData.items.length === 0 || estimateData.items.every(item => !item.description)) {
      toast({
        title: "Validation Error",
        description: "At least one line item is required.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const totals = calculateTotals();

      // Create or get client
      let clientId = null;
      const { data: existingClient } = await supabase
        .from("clients")
        .select("id")
        .eq("user_id", user.id)
        .eq("email", estimateData.clientEmail)
        .single();

      if (existingClient) {
        clientId = existingClient.id;
      } else {
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert({
            user_id: user.id,
            name: estimateData.clientName,
            email: estimateData.clientEmail,
          })
          .select("id")
          .single();

        if (clientError) throw clientError;
        clientId = newClient?.id;
      }

      // Generate a unique sharing token
      const sharingToken = crypto.randomUUID();

      // Save estimate
      const { data: estimate, error: estimateError } = await supabase
        .from("estimates")
        .insert({
          user_id: user.id,
          client_id: clientId,
          client_name: estimateData.clientName,
          client_email: estimateData.clientEmail,
          number: estimateData.number,
          title: estimateData.title,
          items: estimateData.items,
          subtotal: totals.subtotal,
          tax_rate: estimateData.taxRate,
          tax_amount: totals.taxAmount,
          total: totals.total,
          deposit_percentage: estimateData.depositPercentage,
          deposit_amount: totals.depositAmount,
          status: "sent",
          notes: estimateData.notes,
          sharing_enabled: true,
          public_slug: sharingToken,
          sharing_token: sharingToken,
        })
        .select("id")
        .single();

      if (estimateError) throw estimateError;

      // Send estimate created email
      try {
        await supabase.functions.invoke('send-estimate-email', {
          body: {
            estimateId: estimate.id,
            type: 'created',
            recipientEmail: estimateData.clientEmail,
          },
        });
      } catch (emailError) {
        console.warn('Failed to send estimate email:', emailError);
        // Don't fail the estimate creation if email fails
      }

      toast({
        title: "Success",
        description: "Estimate created successfully!",
      });

      return estimate;
    } catch (error: any) {
      console.error("Error saving estimate:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save estimate.",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    estimateData,
    updateEstimateData,
    saveEstimate,
    calculateTotals,
  };
}

