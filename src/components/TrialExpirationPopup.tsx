import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface TrialExpirationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  daysRemaining: number;
}

export const TrialExpirationPopup = ({ isOpen, onClose, daysRemaining }: TrialExpirationPopupProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = () => {
    setIsLoading(true);
    navigate('/pricing');
    onClose();
  };

  const handleDismiss = async () => {
    if (!user) return;

    try {
      // Mark notification as dismissed
      await supabase
        .from('trial_expiration_notifications')
        .upsert({
          user_id: user.id,
          dismissed: true,
          notification_date: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      onClose();
    } catch (error) {
      console.error('Error dismissing notification:', error);
      onClose();
    }
  };

  if (daysRemaining > 0) {
    // Trial is still active, show warning if less than 2 days remaining
    if (daysRemaining > 2) {
      return null;
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <DialogTitle>Your Trial Ends Soon!</DialogTitle>
            </div>
            <DialogDescription>
              Your 7-day free trial expires in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-900">
                After your trial ends, you'll be limited to 3 invoices/estimates per month with a watermark.
              </p>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                Remind Me Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Trial has expired
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <DialogTitle>Your Trial Has Ended</DialogTitle>
          </div>
          <DialogDescription>
            Your 7-day free trial has expired. To continue using all features, please upgrade to a paid plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-red-900 mb-2">Free Plan Limits:</p>
            <ul className="text-sm text-red-800 space-y-1">
              <li>✓ 3 invoices/estimates per month</li>
              <li>✓ Watermark on documents</li>
              <li>✓ Limited templates</li>
              <li>✗ No online payments</li>
              <li>✗ No deposit collection</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Upgrade to Paid Plan
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              Continue with Free Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

