import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Loader, CheckCircle } from 'lucide-react';

interface LeadCaptureFormProps {
  source?: string;
  serviceType?: string;
  onSuccess?: () => void;
}

const SERVICE_TYPES = [
  { value: 'hair_styling', label: '💇 Hair Styling' },
  { value: 'nail_services', label: '💅 Nail Services' },
  { value: 'lash_services', label: '✨ Lash Services' },
  { value: 'massage_therapy', label: '💆 Massage Therapy' },
  { value: 'tattoo_services', label: '🎨 Tattoo Services' },
  { value: 'esthetics', label: '💄 Esthetics' },
];

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source = 'homepage',
  serviceType,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_type: serviceType || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, service_type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast({
        title: 'Missing Information',
        description: 'Please provide your name and email',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Not Authenticated',
        description: 'Please sign in to capture leads',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service_type: formData.service_type || null,
          source,
          status: 'new',
          lead_score: 0,
        });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', service_type: serviceType || '' });

      toast({
        title: 'Success!',
        description: 'Lead captured successfully. We\'ll follow up soon!',
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to capture lead';
      console.error('Error capturing lead:', err);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Thank you!</p>
              <p className="text-sm text-green-800">We'll be in touch shortly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="text-lg">Get Started Today</CardTitle>
        <CardDescription>Join 10,000+ beauty professionals using ProInvoice</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Your Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Sarah Johnson"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="sarah@salon.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone (Optional)
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1"
            />
          </div>

          {/* Service Type */}
          <div>
            <Label htmlFor="service_type" className="text-sm font-medium">
              Service Type
            </Label>
            <Select value={formData.service_type} onValueChange={handleServiceTypeChange} disabled={isLoading}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="company" className="text-sm font-medium">
              Business Name (Optional)
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Sarah's Salon"
              value={formData.company}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Capturing...
              </>
            ) : (
              'Get Started Free'
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            No credit card required. Free plan includes 3 estimates/month.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

