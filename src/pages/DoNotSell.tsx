import React from 'react';
import PageLayout from '@/components/PageLayout';

const DoNotSell = () => {
  return (
    <PageLayout
      title="Do Not Sell or Share My Personal Information - ProInvoice"
      description="California residents can opt out of the sale or sharing of personal information under CCPA/CPRA. ProInvoice respects your privacy rights and Global Privacy Control signals."
    >
      <div className="container max-w-4xl py-12">
        <h1 className="text-4xl font-bold mb-6">Do Not Sell or Share My Personal Information</h1>
        
        <div className="space-y-6">
          <p>
            California residents have the right to request that we not sell or share their personal 
            information under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).
          </p>

          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Global Privacy Control (GPC)</h2>
            <p className="mb-4">
              We honor Global Privacy Control (GPC) signals. If your browser sends a GPC signal, 
              we will treat it as a request to opt out of the sale or sharing of your personal information.
            </p>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Submit Your Request</h2>
            <p className="mb-4">To opt out of the sale or sharing of your personal information, contact us:</p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> <a href="mailto:gavin@proinvoice.app" className="text-primary hover:underline">gavin@proinvoice.app</a></li>
              <li><strong>Phone:</strong> <a href="tel:916-969-3705" className="text-primary hover:underline">916-969-3705</a></li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoNotSell;