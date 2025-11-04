import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CONTRACTOR_INDUSTRIES } from '@/hooks/useContractorTemplates';
import { CheckCircle, Loader } from 'lucide-react';

interface ContractorOnboardingProps {
  onComplete?: () => void;
}

export const ContractorOnboarding: React.FC<ContractorOnboardingProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState({
    industry: '',
    contractor_type: 'contractor',
    business_license: '',
    service_areas: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.industry) {
      toast({
        title: 'Error',
        description: 'Please select your industry',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          industry: formData.industry,
          contractor_type: formData.contractor_type,
          business_license: formData.business_license || null,
          service_areas: formData.service_areas ? formData.service_areas.split(',').map(s => s.trim()) : [],
          onboarding_completed: true,
        })
        .eq('id', user!.id);

      if (error) throw error;

      setCompleted(true);
      toast({
        title: 'Success',
        description: 'Your contractor profile has been set up!',
      });

      setTimeout(() => {
        onComplete?.();
      }, 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      toast({
        title: 'Error',
        description: 'Failed to save your profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Profile Complete!</h3>
          <p className="text-muted-foreground">
            You're all set to start creating professional bids for your clients.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contractor Profile Setup</CardTitle>
        <CardDescription>
          Tell us about your contracting business to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Industry Selection */}
          <div className="space-y-2">
            <Label htmlFor="industry">Your Industry *</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) =>
                setFormData({ ...formData, industry: value })
              }
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {CONTRACTOR_INDUSTRIES.map((ind) => (
                  <SelectItem key={ind.value} value={ind.value}>
                    {ind.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contractor Type */}
          <div className="space-y-2">
            <Label htmlFor="contractor_type">Business Type</Label>
            <Select
              value={formData.contractor_type}
              onValueChange={(value) =>
                setFormData({ ...formData, contractor_type: value })
              }
            >
              <SelectTrigger id="contractor_type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contractor">Licensed Contractor</SelectItem>
                <SelectItem value="service_provider">Service Provider</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Business License */}
          <div className="space-y-2">
            <Label htmlFor="business_license">Business License (Optional)</Label>
            <Input
              id="business_license"
              placeholder="e.g., LIC-123456"
              value={formData.business_license}
              onChange={(e) =>
                setFormData({ ...formData, business_license: e.target.value })
              }
            />
          </div>

          {/* Service Areas */}
          <div className="space-y-2">
            <Label htmlFor="service_areas">Service Areas (Optional)</Label>
            <Input
              id="service_areas"
              placeholder="e.g., New York, Los Angeles, Chicago"
              value={formData.service_areas}
              onChange={(e) =>
                setFormData({ ...formData, service_areas: e.target.value })
              }
              helperText="Separate multiple areas with commas"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Setting up...
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContractorOnboarding;

