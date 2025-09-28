import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Zap, Crown } from "lucide-react";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useSubscription } from "@/hooks/useSubscription";
import { Link } from "react-router-dom";

export const UsageLimitBanner = () => {
  const { 
    invoicesThisMonth, 
    invoiceLimit, 
    canCreateInvoice, 
    isNearLimit, 
    progressPercentage,
    resetDate 
  } = useUsageTracking();
  const { isFree } = useSubscription();

  // Don't show banner for paid plans
  if (!isFree) return null;

  const formatResetDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <Card className={`mb-6 ${
      !canCreateInvoice 
        ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20' 
        : isNearLimit 
        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
        : 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              !canCreateInvoice 
                ? 'bg-red-100 dark:bg-red-900/30' 
                : isNearLimit 
                ? 'bg-amber-100 dark:bg-amber-900/30'
                : 'bg-blue-100 dark:bg-blue-900/30'
            }`}>
              {!canCreateInvoice ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : isNearLimit ? (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              ) : (
                <Zap className="w-5 h-5 text-blue-600" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`font-semibold ${
                  !canCreateInvoice 
                    ? 'text-red-700 dark:text-red-300' 
                    : isNearLimit 
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-blue-700 dark:text-blue-300'
                }`}>
                  {!canCreateInvoice 
                    ? 'Invoice Limit Reached' 
                    : isNearLimit 
                    ? 'Approaching Invoice Limit'
                    : 'Free Plan Usage'
                  }
                </h3>
                <span className="text-sm text-muted-foreground">
                  {invoicesThisMonth}/{invoiceLimit} this month
                </span>
              </div>
              
              <Progress 
                value={progressPercentage} 
                className={`h-2 mb-2 ${
                  !canCreateInvoice 
                    ? '[&>div]:bg-red-500' 
                    : isNearLimit 
                    ? '[&>div]:bg-amber-500'
                    : '[&>div]:bg-blue-500'
                }`}
              />
              
              <p className="text-sm text-muted-foreground">
                {!canCreateInvoice ? (
                  <>You've used all {invoiceLimit} free invoices this month. Upgrade to continue creating invoices.</>
                ) : (
                  <>You have {invoiceLimit - invoicesThisMonth} invoices remaining. Resets on {formatResetDate(resetDate)}.</>
                )}
              </p>
              
              {isFree && (
                <p className="text-xs text-muted-foreground mt-1">
                  Free invoices include a watermark. Upgrade to remove watermarks and get unlimited invoices.
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link to="/pricing">
              <Button 
                size="sm" 
                className={`${
                  !canCreateInvoice 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </Link>
            
            {!canCreateInvoice && (
              <span className="text-xs text-center text-muted-foreground">
                Plans start at $7/month
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};