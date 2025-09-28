import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

export interface CookiePreferences {
  strictly_necessary: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
}

const defaultPreferences: CookiePreferences = {
  strictly_necessary: true, // Always true, cannot be disabled
  functional: false,
  analytics: false,
  advertising: false,
};

export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-preferences');
    const consentGiven = localStorage.getItem('cookie-consent');
    
    if (stored && consentGiven) {
      setPreferences(JSON.parse(stored));
      setHasConsented(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent', 'true');
    setPreferences(prefs);
    setHasConsented(true);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      strictly_necessary: true,
      functional: true,
      analytics: true,
      advertising: true,
    };
    savePreferences(allAccepted);
  };

  const rejectNonEssential = () => {
    savePreferences(defaultPreferences);
  };

  return {
    preferences,
    hasConsented,
    savePreferences,
    acceptAll,
    rejectNonEssential,
  };
};

const CookieBanner = () => {
  const { hasConsented, acceptAll, rejectNonEssential } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for Global Privacy Control (GPC)
    const hasGPC = (navigator as any).globalPrivacyControl === true;
    
    if (!hasConsented && !hasGPC) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  if (!isVisible || hasConsented) return null;

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    rejectNonEssential();
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <Card className="max-w-4xl mx-auto shadow-large border-2">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 mr-4">
              <h2 id="cookie-banner-title" className="font-semibold text-lg mb-2">
                We value your privacy
              </h2>
              <p id="cookie-banner-description" className="text-sm text-muted-foreground mb-4">
                We use cookies and similar technologies to enhance your browsing experience, 
                provide personalized content, analyze site traffic, and understand where our 
                visitors are coming from. By clicking "Accept All", you consent to our use 
                of cookies.
              </p>
              <p className="text-xs text-muted-foreground">
                You can manage your preferences at any time in our{' '}
                <Link 
                  to="/cookies" 
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Cookie Preferences
                </Link>{' '}
                or view our{' '}
                <Link 
                  to="/privacy" 
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="shrink-0 p-2"
              aria-label="Close cookie banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none"
            >
              Accept All
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRejectNonEssential}
              className="flex-1 sm:flex-none"
            >
              Reject Non-Essential
            </Button>
            <Link to="/cookies" className="flex-1 sm:flex-none">
              <Button variant="ghost" className="w-full">
                Manage Preferences
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;