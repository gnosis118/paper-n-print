import React, { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

declare global {
  interface Window {
    ketch: (command: string, options?: any) => void;
  }
}

const Cookies = () => {
  useEffect(() => {
    // Open Ketch preference center when page loads
    if (typeof window.ketch === 'function') {
      window.ketch('showPreferences');
    }
  }, []);

  return (
    <PageLayout
      title="Cookie Preferences - ProInvoice"
      description="Manage your cookie preferences and learn about how ProInvoice uses cookies on our website. Control analytics, functional, and marketing cookies."
    >
      <div className="container max-w-4xl py-12">
        <h1 className="text-4xl font-bold mb-6">Cookie Preferences</h1>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Your Cookie Preferences</h2>
            <p className="text-muted-foreground mb-6">
              We use cookies to enhance your experience on our website. You can manage your cookie preferences using the preference center below.
            </p>
            <button
              onClick={() => {
                if (typeof window.ketch === 'function') {
                  window.ketch('showPreferences');
                }
              }}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Open Cookie Preferences
            </button>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">About Cookies</h3>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Strictly Necessary Cookies</h4>
                <p>These cookies are essential for the website to function and cannot be disabled.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-1">Functional Cookies</h4>
                <p>These cookies help us remember your preferences and provide enhanced features.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-1">Analytics Cookies</h4>
                <p>These cookies help us understand how visitors interact with our website.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-1">Advertising Cookies</h4>
                <p>These cookies are used to show you relevant advertisements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cookies;
