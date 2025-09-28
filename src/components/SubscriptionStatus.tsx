import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Settings, RefreshCw } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Link } from "react-router-dom";

export function SubscriptionStatus() {
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
                onClick={openCustomerPortal}
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