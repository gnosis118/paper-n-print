import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Settings, RefreshCw } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function SubscriptionStatus() {
  const { toast } = useToast();
  const {
    plan,
    subscribed,
    subscription_end,
    loading,
    checkSubscription,
    openCustomerPortal,
    isFree,
    isStarter,
    isPro,
    isAgency
  } = useSubscription();

  const handleOpenPortal = async () => {
    try {
      await openCustomerPortal();
      toast({
        title: "Opening Customer Portal",
        description: "Redirecting you to Stripe...",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to open customer portal";

      if (errorMessage.includes('No Stripe customer')) {
        toast({
          title: "No Active Subscription",
          description: "You need to subscribe to a plan first to access the customer portal.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('No active session')) {
        toast({
          title: "Session Expired",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }

      console.error('Customer portal error:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <CardTitle className="text-lg">Loading subscription...</CardTitle>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const planConfig = {
    free: {
      name: "Free",
      color: "default" as const,
      description: "Limited features available"
    },
    starter: {
      name: "Starter",
      color: "secondary" as const,
      description: "3 invoices per month"
    },
    pro: {
      name: "Pro",
      color: "default" as const,
      description: "8 invoices per month"
    },
    agency: {
      name: "Agency", 
      color: "default" as const,
      description: "20 invoices per month"
    }
  };

  const currentPlan = planConfig[plan as keyof typeof planConfig] || planConfig.free;

  return (
    <Card className={subscribed ? "border-primary" : "border-border"}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {subscribed && <Crown className="h-5 w-5 text-primary" />}
            <CardTitle className="text-lg">
              Current Plan
            </CardTitle>
            <Badge variant={currentPlan.color}>
              {currentPlan.name}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={checkSubscription}
            className="p-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          {currentPlan.description}
          {subscription_end && (
            <div className="mt-1 text-sm">
              Renews on {new Date(subscription_end).toLocaleDateString()}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex gap-2">
          {isFree && (
            <Button asChild className="flex-1">
              <Link to="/pricing">Upgrade Plan</Link>
            </Button>
          )}
          
          {subscribed && (
            <>
              <Button
                variant="outline"
                onClick={handleOpenPortal}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Manage Subscription
              </Button>

              <Button asChild variant="secondary" className="flex items-center gap-2">
                <Link to="/subscription">
                  <Crown className="h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </>
          )}
          
          {!subscribed && (
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/subscription">
                <Settings className="h-4 w-4" />
                Manage Account
              </Link>
            </Button>
          )}
          
          <Button asChild variant="ghost">
            <Link to="/pricing">View All Plans</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}