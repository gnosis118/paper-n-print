import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Check, Building2, FileText, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface OnboardingWizardProps {
  userId: string;
  onComplete?: () => void;
}

const OnboardingWizard = ({ userId, onComplete }: OnboardingWizardProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Business Info
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');

  // Step 2: First Invoice (we'll just guide them)
  const [clientName, setClientName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const steps = [
    { number: 1, title: 'Business Info', icon: Building2 },
    { number: 2, title: 'First Invoice', icon: FileText },
    { number: 3, title: 'Payment Setup', icon: CreditCard },
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleBusinessInfoSubmit = async () => {
    if (!businessName || !businessEmail) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('business_profiles')
        .upsert({
          user_id: userId,
          name: businessName,
          address: businessAddress,
          phone: businessPhone,
          email: businessEmail,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast.success('Business info saved!');
      setCurrentStep(2);
    } catch (error) {
      console.error('Error saving business info:', error);
      toast.error('Failed to save business info');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvoiceGuidance = () => {
    if (!clientName || !serviceDescription) {
      toast.error('Please enter client and service details');
      return;
    }
    setCurrentStep(3);
  };

  const handlePaymentSetup = async () => {
    try {
      // Mark onboarding as complete
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', userId);

      if (error) throw error;

      toast.success('Onboarding complete! 🎉');
      navigate('/invoice', { 
        state: { 
          clientName, 
          serviceDescription 
        } 
      });
      onComplete?.();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep > step.number
                        ? 'bg-success text-success-foreground'
                        : currentStep === step.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-sm font-medium mt-2 hidden sm:block">{step.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step.number ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              Step {currentStep} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Business Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-foreground/70 mb-6">
                  Let's set up your business profile. This information will appear on all your invoices.
                </p>
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Smith Plumbing LLC"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessEmail">Business Email *</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="contact@yourcompany.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    onClick={handleBusinessInfoSubmit}
                    disabled={isLoading}
                    size="lg"
                  >
                    Next Step
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: First Invoice */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-foreground/70 mb-6">
                  Let's prepare your first invoice. Don't worry, you can edit everything later!
                </p>
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceDescription">Service Description</Label>
                  <Textarea
                    id="serviceDescription"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    placeholder="Briefly describe the service you provided"
                    rows={4}
                  />
                </div>
                <div className="bg-accent/20 border border-accent p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Quick Tip
                  </h4>
                  <p className="text-sm text-foreground/70">
                    After onboarding, you'll be able to add line items, set prices, and customize your invoice template.
                  </p>
                </div>
                <div className="flex justify-between gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button onClick={handleInvoiceGuidance} size="lg">
                    Next Step
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Setup */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-foreground/70 mb-6">
                  Connect Stripe to accept online payments and get paid faster!
                </p>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Why Connect Stripe?
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        <span>Get paid in 30 seconds with instant payments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        <span>Accept credit cards, Apple Pay, and Google Pay</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        <span>Automatic payment reminders and tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        <span>Secure, PCI-compliant payment processing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-foreground/70">
                      You can set up Stripe later from your dashboard. For now, let's create your first invoice!
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button onClick={handlePaymentSetup} size="lg">
                    Create First Invoice
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Need help? <a href="/contact" className="text-primary hover:underline">Contact support</a>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
