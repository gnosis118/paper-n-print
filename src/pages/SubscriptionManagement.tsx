import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Crown, Settings, CreditCard, AlertTriangle, RefreshCw, ArrowRight, Check } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { adTracking } from "@/lib/adTracking";

export default function SubscriptionManagement() {
  const { 
    plan, 
    subscribed, 
    subscription_end, 
    loading, 
    checkSubscription, 
    openCustomerPortal,
    isFree,
    planConfig,
    planFeatures
  } = useSubscription();

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
      toast.success("Opening Stripe Customer Portal...");
    } catch (error) {
      console.error('Customer portal error:', error);
      
      const errorMessage = error instanceof Error ? error.message : "Failed to open subscription management. Please try again.";

      // Show more specific error messages
      if (errorMessage.toLowerCase().includes('stripe customer')) {
        toast.error("You need to subscribe to a plan first before you can manage your subscription.");
      } else if (errorMessage.includes('session')) {
        toast.error("Your session has expired. Please log in again.");
      } else if (errorMessage.includes('log in')) {
        toast.error("Please log in to manage your subscription.");
      } else {
        toast.error("Unable to open subscription management. Please subscribe to a plan first.");
      }
    }
  };

  const handleRefreshStatus = async () => {
    try {
      await checkSubscription();
      toast.success("Subscription status refreshed!");
    } catch (error) {
      toast.error("Failed to refresh subscription status. Please try again.");
    }
  };

  const planDetails = {
    free: {
      name: "Free",
      price: "$0",
      period: "",
      color: "secondary" as const,
      description: "Perfect for trying out our service",
      limits: "3 invoices per month"
    },
    basic: {
      name: "Starter", 
      price: "$7",
      period: "/month",
      color: "default" as const,
      description: "Perfect for freelancers and small businesses",
      limits: "25 invoices per month"
    },
    professional: {
      name: "Pro",
      price: "$14", 
      period: "/month",
      color: "default" as const,
      description: "Perfect for growing businesses and agencies",
      limits: "100 invoices per month"
    },
    enterprise: {
      name: "Enterprise",
      price: "$29", 
      period: "/month",
      color: "default" as const,
      description: "Perfect for large teams and agencies",
      limits: "500 invoices per month"
    }
  };

  const currentPlanDetails = planDetails[plan as keyof typeof planDetails] || planDetails.free;

  // Fire conversion when user is subscribed (one-time per mount)
  const fired = useRef(false);
  useEffect(() => {
    const KEY = 'purchase_tracked_v1';
    if (subscribed && !fired.current && !sessionStorage.getItem(KEY)) {
      fired.current = true;
      sessionStorage.setItem(KEY, '1');
      let value: number | undefined;
      if (plan === 'basic') value = 7;
      else if (plan === 'professional') value = 14;
      else if (plan === 'enterprise') value = 29;
      adTracking.purchase({ value, currency: 'USD' });
    }
  }, [subscribed, plan]);

  return (
    <DashboardLayout
      title="Subscription Management - Manage Your Plan | InvoicePro"
      description="Manage your subscription, update billing information, change plans, or cancel your subscription."
    >
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Subscription Management
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription, billing, and account preferences
          </p>
        </div>

        {/* Current Plan Status */}
        <Card className={`mb-8 ${subscribed ? "border-primary bg-primary/5" : ""}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {subscribed && <Crown className="h-6 w-6 text-primary" />}
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    Current Plan
                    <Badge variant={currentPlanDetails.color} className="ml-2">
                      {currentPlanDetails.name}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {currentPlanDetails.description}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {currentPlanDetails.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    {currentPlanDetails.period}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentPlanDetails.limits}
                </div>
              </div>
            </div>
            
            {subscription_end && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-4 w-4" />
                  <span>Next billing date: {new Date(subscription_end).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-2 mb-4">
              <h4 className="font-medium">Plan Features:</h4>
              <ul className="space-y-1">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap gap-3">
              {subscribed ? (
                <div className="flex flex-wrap gap-3 w-full">
                  <Button 
                    onClick={handleManageSubscription}
                    className="flex items-center gap-2"
                    disabled={loading}
                  >
                    <Settings className="h-4 w-4" />
                    Manage Billing & Payment
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleManageSubscription}
                    className="flex items-center gap-2"
                    disabled={loading}
                  >
                    <CreditCard className="h-4 w-4" />
                    Update Payment Method
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleManageSubscription}
                    className="flex items-center gap-2 text-destructive hover:text-destructive"
                    disabled={loading}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Cancel Subscription
                  </Button>
                </div>
              ) : (
                <Button asChild className="flex items-center gap-2">
                  <Link to="/pricing">
                    <Crown className="h-4 w-4" />
                    Upgrade to Premium
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                onClick={handleRefreshStatus}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Management
              </CardTitle>
              <CardDescription>
                Access Stripe Customer Portal to manage all subscription settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The Customer Portal allows you to:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                <li>• Update payment methods</li>
                <li>• Download invoices and receipts</li>
                <li>• Change billing address</li>
                <li>• View payment history</li>
                <li>• Cancel or modify subscriptions</li>
              </ul>
              <Button 
                onClick={handleManageSubscription}
                disabled={loading}
                className="w-full"
              >
                Open Customer Portal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Plan Upgrades
              </CardTitle>
              <CardDescription>
                Upgrade your plan to unlock more features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Choose from our flexible pricing plans:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                <li>• Starter: 25 invoices/month ($7)</li>
                <li>• Pro: 100 invoices/month ($14)</li>
                <li>• Enterprise: 500 invoices/month ($29)</li>
                <li>• No watermarks on paid plans</li>
                <li>• Priority support included</li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/pricing">
                  View All Plans
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Get support with your subscription or billing questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/docs">View Documentation</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}