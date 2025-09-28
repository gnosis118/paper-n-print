import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ArrowRight, FileText, Download, Send, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

interface DropOffNudgeProps {
  step: 'invoice_creation' | 'pdf_download' | 'invoice_send' | 'payment';
  onClose: () => void;
  isVisible: boolean;
}

const nudgeContent = {
  invoice_creation: {
    title: "Complete Your First Invoice",
    description: "You're 30 seconds away from your first professional invoice",
    icon: FileText,
    cta: "Continue Creating",
    link: "/invoice",
    urgency: "Join 10,000+ users who create invoices in under 30 seconds"
  },
  pdf_download: {
    title: "Download Your Invoice",
    description: "Your invoice is ready! Download it as a professional PDF",
    icon: Download,
    cta: "Download PDF",
    link: "#download",
    urgency: "Get paid 3x faster with our professional templates"
  },
  invoice_send: {
    title: "Send & Get Paid",
    description: "Send your invoice with embedded payment link for instant payments",
    icon: Send,
    cta: "Send Invoice",
    link: "#send",
    urgency: "Clients pay in just 2 clicks with Stripe integration"
  },
  payment: {
    title: "Track Your Payment",
    description: "Monitor payment status and send automated reminders",
    icon: CreditCard,
    cta: "View Dashboard",
    link: "/dashboard",
    urgency: "Auto-reminders ensure you never chase payments again"
  }
};

export const DropOffNudge = ({ step, onClose, isVisible }: DropOffNudgeProps) => {
  const [showNudge, setShowNudge] = useState(false);
  const content = nudgeContent[step];
  const Icon = content.icon;

  useEffect(() => {
    if (isVisible) {
      // Show nudge after 3 seconds of inactivity
      const timer = setTimeout(() => {
        setShowNudge(true);
        analytics.trackEvent('drop_off_nudge_shown', {
          nudge_type: step,
          event_category: 'engagement'
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, step]);

  const handleClose = () => {
    setShowNudge(false);
    onClose();
    analytics.trackEvent('drop_off_nudge_dismissed', {
      nudge_type: step,
      event_category: 'engagement'
    });
  };

  const handleCTAClick = () => {
    analytics.trackEvent('drop_off_nudge_clicked', {
      nudge_type: step,
      event_category: 'conversion'
    });
  };

  if (!showNudge) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
      <Card className="w-80 shadow-lg border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">{content.title}</CardTitle>
                <Badge variant="secondary" className="text-xs mt-1">
                  Almost there!
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="text-sm mb-3">
            {content.description}
          </CardDescription>
          
          <div className="bg-accent/10 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground">
              💡 {content.urgency}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Link to={content.link} className="flex-1">
              <Button size="sm" className="w-full text-xs" onClick={handleCTAClick}>
                {content.cta}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={handleClose}
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Hook for managing nudges
export const useDropOffNudges = () => {
  const [activeNudges, setActiveNudges] = useState<Set<string>>(new Set());

  const showNudge = (step: DropOffNudgeProps['step']) => {
    setActiveNudges(prev => new Set(prev).add(step));
  };

  const hideNudge = (step: DropOffNudgeProps['step']) => {
    setActiveNudges(prev => {
      const newSet = new Set(prev);
      newSet.delete(step);
      return newSet;
    });
  };

  const hideAllNudges = () => {
    setActiveNudges(new Set());
  };

  return {
    activeNudges,
    showNudge,
    hideNudge,
    hideAllNudges
  };
};