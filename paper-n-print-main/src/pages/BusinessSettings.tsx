import { Helmet } from 'react-helmet-async';
import { BusinessProfile } from "@/components/BusinessProfile";
import PageLayout from "@/components/PageLayout";

export default function BusinessSettings() {
  return (
    <>
      <Helmet>
        <title>Business Settings - Invoice Pro</title>
        <meta name="description" content="Manage your business profile, logo, and branding settings for professional invoices." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Business Settings</h1>
            <p className="text-muted-foreground mt-2">
              Configure your business information and branding for professional invoices
            </p>
          </div>
          
          <BusinessProfile />
        </div>
      </PageLayout>
    </>
  );
}