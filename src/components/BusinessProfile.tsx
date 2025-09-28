import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { LogoUpload } from "@/components/LogoUpload";
import { useSubscription } from "@/hooks/useSubscription";
import { Loader2, Building, Mail, Phone, Globe, MapPin, Palette } from "lucide-react";

interface BusinessProfileData {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo_url: string | null;
  accent_color: string;
}

export function BusinessProfile() {
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<BusinessProfileData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    logo_url: null,
    accent_color: "#3b82f6",
  });

  const isPaid = subscribed;

  useEffect(() => {
    if (user) {
      loadBusinessProfile();
    }
  }, [user]);

  const loadBusinessProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("business_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
          address: data.address || "",
          logo_url: data.logo_url,
          accent_color: "#3b82f6", // Default since we're adding this field
        });
      } else {
        // Pre-fill with user email
        setProfileData(prev => ({
          ...prev,
          email: user.email || "",
        }));
      }
    } catch (error: any) {
      console.error("Error loading business profile:", error);
      toast({
        title: "Error",
        description: "Failed to load business profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (!isPaid) {
      toast({
        title: "Upgrade Required",
        description: "Business profile management is available for paid plans only",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("business_profiles")
        .upsert({
          user_id: user.id,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          website: profileData.website,
          address: profileData.address,
          logo_url: profileData.logo_url,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Business profile saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving business profile:", error);
      toast({
        title: "Error",
        description: "Failed to save business profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoChange = (url: string | null) => {
    setProfileData(prev => ({ ...prev, logo_url: url }));
  };

  const handleInputChange = (field: keyof BusinessProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Business Profile
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your business information for invoices and branding
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div>
            <Label className="text-sm font-medium">Business Logo</Label>
            <div className="mt-2">
              <LogoUpload
                currentLogoUrl={profileData.logo_url}
                onLogoChange={handleLogoChange}
                disabled={!isPaid}
              />
            </div>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Business Name *
              </Label>
              <Input
                id="business-name"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your Business Name"
                disabled={!isPaid}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Business Email *
              </Label>
              <Input
                id="business-email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="business@example.com"
                disabled={!isPaid}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="business-phone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                disabled={!isPaid}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="business-website"
                type="url"
                value={profileData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://yourwebsite.com"
                disabled={!isPaid}
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="business-address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Business Address
            </Label>
            <Textarea
              id="business-address"
              value={profileData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="123 Main Street&#10;City, State 12345&#10;Country"
              rows={3}
              disabled={!isPaid}
            />
          </div>

          {/* Brand Color */}
          <div className="space-y-2">
            <Label htmlFor="accent-color" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Brand Accent Color
            </Label>
            <div className="flex items-center gap-3">
              <input
                id="accent-color"
                type="color"
                value={profileData.accent_color}
                onChange={(e) => handleInputChange("accent_color", e.target.value)}
                className="w-12 h-10 rounded border border-input cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isPaid}
              />
              <Input
                value={profileData.accent_color}
                onChange={(e) => handleInputChange("accent_color", e.target.value)}
                placeholder="#3b82f6"
                className="font-mono"
                disabled={!isPaid}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This color will be used for invoice branding and accents
            </p>
          </div>

          {!isPaid && (
            <div className="bg-muted/50 border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Business profile management is available with paid plans. Upgrade to customize your business information, logo, and branding.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              disabled={saving || !isPaid}
              className="min-w-[120px]"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}