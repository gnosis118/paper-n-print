import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { analytics } from "@/lib/analytics";
import PageLayout from '@/components/PageLayout';
import { Zap, Check } from 'lucide-react';

const GetStarted = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            business_name: businessName
          }
        }
      });

      if (error) throw error;

      // Track successful signup
      analytics.trackSignUp('email');
      
      toast.success('Account created successfully! Check your email to verify your account.');
      
      // Redirect to invoice creation after successful signup
      setTimeout(() => {
        window.location.href = '/invoice';
      }, 2000);
      
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="Get Started - Free 7-Day Trial | ProInvoice"
      description="Start your free 7-day trial of ProInvoice. Create professional estimates and invoices, collect deposits online, and get paid faster. No credit card required."
      canonical="/get-started"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Start Your Free 7-Day Trial
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional estimates and invoices, collect deposits online, and get paid faster. 
              No credit card required.
            </p>
          </div>

          {/* Benefits Banner */}
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">7-Day Free Trial Benefits</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Unlimited estimates & invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Online deposit collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>QR code payments</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Sign Up Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create Your Free Account</CardTitle>
                <p className="text-muted-foreground">
                  Get started in less than 60 seconds
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your Business Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a secure password"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <div className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <label htmlFor="terms" className="cursor-pointer">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline" target="_blank">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isLoading || !agreeToTerms}
                  >
                    {isLoading ? 'Creating Account...' : 'Start Free Trial'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/auth" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">What's Included in Your Trial</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Estimate-to-Invoice Workflow</h3>
                      <p className="text-sm text-muted-foreground">
                        Send estimates, collect deposits when accepted, and auto-convert to invoices
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Online Payments</h3>
                      <p className="text-sm text-muted-foreground">
                        Stripe, ACH, Apple Pay, Google Pay with QR codes for mobile payments
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Industry Templates</h3>
                      <p className="text-sm text-muted-foreground">
                        HVAC, plumbing, construction, cleaning, and 20+ other industry-specific templates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Mobile Optimized</h3>
                      <p className="text-sm text-muted-foreground">
                        Perfect for field workers - create and send estimates from your phone
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Why Contractors Choose ProInvoice</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ Get paid 3x faster with online deposits</p>
                    <p>✓ Reduce no-shows with accepted estimates</p>
                    <p>✓ Professional look that wins more jobs</p>
                    <p>✓ Works offline - sync when you have signal</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GetStarted;