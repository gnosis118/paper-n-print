import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent, CookiePreferences } from '@/components/CookieBanner';

const Cookies = () => {
  const { preferences, savePreferences } = useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  const handleSave = () => {
    savePreferences(localPreferences);
  };

  return (
    <PageLayout
      title="Cookie Preferences - ProInvoice"
      description="Manage your cookie preferences and learn about how ProInvoice uses cookies on our website. Control analytics, functional, and marketing cookies."
    >
      <div className="container max-w-4xl py-12">
        <h1 className="text-4xl font-bold mb-6">Cookie Preferences</h1>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Strictly Necessary Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies are essential for the website to function and cannot be disabled.
            </p>
            <Switch checked={true} disabled />
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Functional Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies help us remember your preferences and provide enhanced features.
            </p>
            <Switch 
              checked={localPreferences.functional}
              onCheckedChange={(checked) => setLocalPreferences({...localPreferences, functional: checked})}
            />
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies help us understand how visitors interact with our website.
            </p>
            <Switch 
              checked={localPreferences.analytics}
              onCheckedChange={(checked) => setLocalPreferences({...localPreferences, analytics: checked})}
            />
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Advertising Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies are used to show you relevant advertisements.
            </p>
            <Switch 
              checked={localPreferences.advertising}
              onCheckedChange={(checked) => setLocalPreferences({...localPreferences, advertising: checked})}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Preferences
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cookies;