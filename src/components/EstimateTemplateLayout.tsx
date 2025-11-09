import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Calculator, Check, DollarSign, Star, Shield, Zap } from 'lucide-react';
import PageLayout from './PageLayout';

interface EstimateTemplateData {
  title: string;
  slug: string;
  description: string;
  averageAmount: string;
  paymentTerms: string;
  lineItems: string[];
  painPoints: string[];
  benefits: string[];
  sampleFields: {
    serviceDescription: string;
    rateType: string;
    additionalCharges: string[];
  };
}

interface EstimateTemplateLayoutProps {
  template: EstimateTemplateData;
}

export const EstimateTemplateLayout: React.FC<EstimateTemplateLayoutProps> = ({ template }) => {
  const pageTitle = `${template.title} Estimate Template - Free PDF Download | ProInvoice`;
  const description = `Free ${template.title.toLowerCase()} estimate template with online deposit collection. Professional format with ${template.lineItems.slice(0, 3).join(', ').toLowerCase()}. Auto-converts to invoice when accepted.`;

  const handleDownload = (format: 'pdf' | 'word' | 'excel') => {
    const link = document.createElement('a');
    link.href = `/templates/${template.title.toLowerCase().replace(/\s+/g, '-')}-estimate-template.${format === 'word' ? 'docx' : format === 'excel' ? 'xlsx' : 'pdf'}`;
    link.download = `${template.title}-estimate-template.${format === 'word' ? 'docx' : format === 'excel' ? 'xlsx' : 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What should I include in a ${template.title.toLowerCase()} estimate?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Your ${template.title.toLowerCase()} estimate should include: business information, client details, detailed service descriptions, ${template.lineItems.slice(0, 3).join(', ').toLowerCase()}, total amount, deposit requirements, payment terms, and acceptance terms.`
        }
      },
      {
        "@type": "Question",
        "name": `How much deposit should I require for ${template.title.toLowerCase()} work?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${template.title.toLowerCase()} services, ${template.paymentTerms.toLowerCase()} is standard. This secures the project and helps with material purchasing. Our template makes it easy to collect deposits online via Stripe, Apple Pay, or ACH.`
        }
      },
      {
        "@type": "Question",
        "name": `Can customers pay deposits online?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes! With our ${template.title.toLowerCase()} estimate template, customers can accept the estimate and pay the deposit directly online using credit card, Apple Pay, Google Pay, or ACH bank transfer. No additional setup required.`
        }
      },
      {
        "@type": "Question",
        "name": `What happens after a customer accepts the estimate?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Once accepted and the deposit is paid, the estimate automatically converts to an invoice showing the remaining balance due. This streamlines your workflow and ensures you get paid faster for ${template.title.toLowerCase()} work.`
        }
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": description,
    "url": `https://www.proinvoice.app${template.slug}`,
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": `${template.title} Estimate Template`,
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <PageLayout 
      title={pageTitle}
      description={description}
      canonical={`https://www.proinvoice.app${template.slug}`}
    >
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Breadcrumb */}
      <div className="bg-muted/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-2 text-sm text-foreground/70">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/estimate-templates" className="hover:text-primary">Estimate Templates</Link>
            <span>/</span>
            <span className="text-foreground">{template.title} Estimate</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-light to-accent-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Free {template.title} Estimate Template
          </h1>
          <p className="text-xl text-primary/80 mb-8 max-w-4xl mx-auto">
            Professional {template.title.toLowerCase()} estimate template with online deposit collection. 
            Accept deposits instantly and auto-convert to invoices when accepted.
          </p>

          {/* Key Benefits Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Free to Use</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 text-primary" />
              <span>Online Deposits</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Auto-Convert to Invoice</span>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/estimates">
              <Button size="lg" className="text-lg px-8 py-3">
                <Calculator className="w-5 h-5 mr-2" />
                Create Estimate Online Free
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 bg-white/90 hover:bg-white"
              onClick={() => handleDownload('pdf')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Template
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Sample Estimate Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            {template.title} Estimate Sample
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-8">
                <div className="text-sm text-foreground/70 mb-4 text-center">
                  ✓ Sample with watermark for preview
                </div>
                
                {/* Mock Estimate Header */}
                <div className="border-b pb-6 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-primary">ESTIMATE</h3>
                      <p className="text-foreground/70">Estimate #EST-2024-001</p>
                      <p className="text-foreground/70">Date: {new Date().toLocaleDateString()}</p>
                      <p className="text-foreground/70">Valid for: 30 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">[Your Business Name]</p>
                      <p className="text-sm text-foreground/70">[Address]</p>
                      <p className="text-sm text-foreground/70">[Phone] • [Email]</p>
                    </div>
                  </div>
                </div>

                {/* Sample Service Lines */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Estimated Services:</h4>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{template.sampleFields.serviceDescription}</span>
                      <span className="font-semibold">{template.averageAmount}</span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3">
                      {template.sampleFields.rateType}
                    </p>
                    
                    {template.sampleFields.additionalCharges.map((charge, index) => (
                      <div key={index} className="flex justify-between items-center text-sm mb-1">
                        <span>{charge}</span>
                        <span>$150.00</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total and Deposit */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Estimate:</span>
                    <span className="text-primary">{template.averageAmount}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600 font-semibold">
                    <span>Deposit Required ({template.paymentTerms.split(',')[0]}):</span>
                    <span>$1,425</span>
                  </div>
                  <p className="text-sm text-foreground/70 mt-2">Payment Terms: {template.paymentTerms}</p>
                </div>

                {/* Accept Button Preview */}
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full" size="lg" disabled>
                    Accept Estimate & Pay Deposit
                  </Button>
                  <p className="text-xs text-center text-foreground/70 mt-2">
                    Customer can accept and pay online with credit card, Apple Pay, or ACH
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Fill Sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            How to Create Your {template.title} Estimate
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Essential Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Your Business Details</h4>
                    <p className="text-sm text-foreground/70">Business name, address, phone, email, and license number (if applicable)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Client Information</h4>
                    <p className="text-sm text-foreground/70">Client name, project address, contact details, and project scope</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Estimate Details</h4>
                    <p className="text-sm text-foreground/70">Estimate number, date, validity period, and project timeline</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary" />
                  Service & Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {template.lineItems.slice(0, 4).map((item, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-sm mb-2">{item}</h4>
                      <p className="text-sm text-foreground/70">
                        Detailed breakdown with quantities and rates
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Use Our {template.title} Estimate Template?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {template.benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Powerful Features for {template.title} Professionals
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Online Deposit Collection
                </h3>
                <p className="text-sm text-foreground/70">
                  Accept deposits instantly via credit card, Apple Pay, Google Pay, or ACH bank transfer. 
                  No more chasing down checks or waiting for wire transfers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Auto-Convert to Invoice
                </h3>
                <p className="text-sm text-foreground/70">
                  When a customer accepts your estimate and pays the deposit, it automatically converts 
                  to an invoice with the remaining balance due. Saves you time and reduces errors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Appearance
                </h3>
                <p className="text-sm text-foreground/70">
                  Stand out from competitors with a polished, industry-specific estimate template. 
                  Add your logo, customize colors, and include your terms and conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Mobile-Friendly
                </h3>
                <p className="text-sm text-foreground/70">
                  Customers can review and accept estimates on any device - desktop, tablet, or mobile. 
                  Works perfectly on-site or from anywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Download Templates Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Download Free {template.title} Estimate Templates
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold mb-2 text-foreground">PDF Template</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Fillable PDF format with professional styling
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-muted/50 hover:bg-muted text-foreground"
                  onClick={() => handleDownload('pdf')}
                >
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2 text-foreground">Word Template</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Fully editable Microsoft Word document
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-muted/50 hover:bg-muted text-foreground"
                  onClick={() => handleDownload('word')}
                >
                  Download Word
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2 text-foreground">Excel Template</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Spreadsheet with automatic calculations
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-muted/50 hover:bg-muted text-foreground"
                  onClick={() => handleDownload('excel')}
                >
                  Download Excel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            {template.title} Estimate FAQ
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqSchema.mainEntity.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-lg">{faq.name}</h3>
                  <p className="text-foreground/80">{faq.acceptedAnswer.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Templates */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">
            More Estimate Templates
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/templates/hvac-estimate-template">
              <Button variant="outline" size="sm">HVAC Estimate</Button>
            </Link>
            <Link to="/templates/plumbing-estimate-template">
              <Button variant="outline" size="sm">Plumbing Estimate</Button>
            </Link>
            <Link to="/templates/construction-estimate-template">
              <Button variant="outline" size="sm">Construction Estimate</Button>
            </Link>
            <Link to="/templates/landscaping-estimate-template">
              <Button variant="outline" size="sm">Landscaping Estimate</Button>
            </Link>
            <Link to="/estimate-templates">
              <Button variant="outline" size="sm">View All Templates</Button>
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Win More {template.title} Projects?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Create professional estimates, collect deposits online, and get paid faster.
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/estimates">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Calculator className="w-5 h-5 mr-2" />
                Create Your First Estimate Free
              </Button>
            </Link>
            <Link to="/estimate-templates">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/30">
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
