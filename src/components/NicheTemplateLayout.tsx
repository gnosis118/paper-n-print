import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Calculator, ArrowRight, Check, DollarSign, Clock, Users, Star, Shield, Zap } from 'lucide-react';
import PageLayout from './PageLayout';

interface NicheTemplateData {
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

interface NicheTemplateLayoutProps {
  template: NicheTemplateData;
}

export const NicheTemplateLayout: React.FC<NicheTemplateLayoutProps> = ({ template }) => {
  const pageTitle = `${template.title} Invoice Template - Free PDF Download | InvoicePro`;
  const description = `Free ${template.title.toLowerCase()} invoice template with embedded payments. Professional PDF format includes industry-specific fields, automatic calculations, and Stripe integration. Download now!`;

  const handleDownload = (format: 'pdf' | 'word' | 'excel') => {
    const link = document.createElement('a');
    link.href = `/templates/${template.title.toLowerCase().replace(/\s+/g, '-')}-invoice-template.${format === 'word' ? 'docx' : format === 'excel' ? 'xlsx' : 'pdf'}`;
    link.download = `${template.title}-invoice-template.${format === 'word' ? 'docx' : format === 'excel' ? 'xlsx' : 'pdf'}`;
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
        "name": `What should I include on a ${template.title.toLowerCase()} invoice?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Your ${template.title.toLowerCase()} invoice should include: business information, client details, detailed service descriptions, ${template.lineItems.slice(0, 3).join(', ').toLowerCase()}, total amount, payment terms, and payment methods accepted.`
        }
      },
      {
        "@type": "Question",
        "name": `How much should I charge for ${template.title.toLowerCase()} services?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${template.title} services typically range from ${template.averageAmount}. Pricing depends on service complexity, location, experience level, and market demand. Research local competitors and factor in your costs, time, and expertise.`
        }
      },
      {
        "@type": "Question",
        "name": `What payment terms should I use for ${template.title.toLowerCase()} work?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${template.paymentTerms} is standard for ${template.title.toLowerCase()} services. For larger projects, consider requiring a deposit upfront (25-50%) with the balance due upon completion or in milestone payments.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I customize this ${template.title.toLowerCase()} invoice template?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes! Our ${template.title.toLowerCase()} invoice template is fully customizable. Add your logo, adjust colors, modify fields, and include your specific terms and conditions. Available in PDF, Word, and Excel formats.`
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
      "name": `${template.title} Invoice Template`,
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.proinvoice.app"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Templates",
          "item": "https://www.proinvoice.app/invoice-templates"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${template.title} Invoice Template`,
          "item": `https://www.proinvoice.app${template.slug}`
        }
      ]
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
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/invoice-templates" className="hover:text-primary">Templates</Link>
            <span>/</span>
            <span className="text-foreground">{template.title} Invoice</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-light to-accent-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Free {template.title} Invoice Template
          </h1>
          <p className="text-xl text-primary/80 mb-8 max-w-4xl mx-auto">
            Professional {template.title.toLowerCase()} invoice template with embedded Stripe payments. 
            Create, customize, and get paid faster with our industry-specific template.
          </p>

          {/* Key Benefits Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Free Download</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 text-primary" />
              <span>Instant Payments</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 rounded-full px-4 py-2 text-sm font-medium">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Professional Format</span>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/invoice">
              <Button size="lg" className="text-lg px-8 py-3">
                <Calculator className="w-5 h-5 mr-2" />
                Create Invoice Online Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-white/90 hover:bg-white">
              <Download className="w-5 h-5 mr-2" />
              Download Template
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Sample Invoice Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            {template.title} Invoice Sample
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-8">
                <div className="text-sm text-muted-foreground mb-4 text-center">
                  ✓ Sample with subtle watermark for preview
                </div>
                
                {/* Mock Invoice Header */}
                <div className="border-b pb-6 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-primary">INVOICE</h3>
                      <p className="text-muted-foreground">Invoice #INV-2024-001</p>
                      <p className="text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">[Your Business Name]</p>
                      <p className="text-sm text-muted-foreground">[Address]</p>
                      <p className="text-sm text-muted-foreground">[Phone] • [Email]</p>
                    </div>
                  </div>
                </div>

                {/* Sample Service Lines */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Services Provided:</h4>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{template.sampleFields.serviceDescription}</span>
                      <span className="font-semibold">{template.averageAmount.split('-')[0]}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.sampleFields.rateType}
                    </p>
                    
                    {template.sampleFields.additionalCharges.map((charge, index) => (
                      <div key={index} className="flex justify-between items-center text-sm mb-1">
                        <span>{charge}</span>
                        <span>$50.00</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount Due:</span>
                    <span className="text-primary">{template.averageAmount.split('-')[1] || template.averageAmount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Payment Terms: {template.paymentTerms}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Fill Sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            How to Fill Your {template.title} Invoice
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
                    <p className="text-sm text-muted-foreground">Business name, address, phone, email, and license number (if required)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Client Information</h4>
                    <p className="text-sm text-muted-foreground">Client name, service address, contact details, and project reference</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Invoice Numbers & Dates</h4>
                    <p className="text-sm text-muted-foreground">Unique invoice number, service date, invoice date, and due date</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {template.lineItems.slice(0, 4).map((item, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-sm mb-2">{item}</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed description, quantity/hours, rate, and total amount
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
            Why Use Our {template.title} Invoice Template?
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

        {/* Download Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Download Your Free {template.title} Invoice Template
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold mb-2">PDF Template</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fillable PDF format with professional styling
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('pdf')}
                >
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">Word Template</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fully editable Microsoft Word document
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('word')}
                >
                  Download Word
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">Excel Template</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Spreadsheet with automatic calculations
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
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
            {template.title} Invoice FAQ
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqSchema.mainEntity.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-lg">{faq.name}</h3>
                  <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Templates */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">
            More Invoice Templates
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/templates/plumber-invoice-template">
              <Button variant="outline" size="sm">Plumber Invoice</Button>
            </Link>
            <Link to="/templates/electrician-invoice-template">
              <Button variant="outline" size="sm">Electrician Invoice</Button>
            </Link>
            <Link to="/templates/handyman-invoice-template">
              <Button variant="outline" size="sm">Handyman Invoice</Button>
            </Link>
            <Link to="/templates/cleaning-invoice-template">
              <Button variant="outline" size="sm">Cleaning Invoice</Button>
            </Link>
            <Link to="/invoice-templates">
              <Button variant="outline" size="sm">View All Templates</Button>
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Stop chasing payments. Create professional {template.title.toLowerCase()} invoices with embedded Stripe checkout and get paid in 2 clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/invoice">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                <ArrowRight className="w-5 h-5 mr-2" />
                Create Invoice Now - Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};