import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Calculator, ArrowRight, Check, DollarSign, Clock, Users } from 'lucide-react';
import { InvoiceTemplate } from '@/data/invoiceTemplates';
import PageLayout from './PageLayout';
import { SEOHeaders } from './SEOHeaders';

interface InvoiceTemplateLayoutProps {
  template: InvoiceTemplate;
}

export const InvoiceTemplateLayout: React.FC<InvoiceTemplateLayoutProps> = ({ template }) => {
  const pageTitle = `${template.title} Invoice Template (Free PDF, Word & Excel) | ProInvoice`;
  const description = `Free ${template.title.toLowerCase()} invoice template. Create professional ${template.title.toLowerCase()} invoices in 30 seconds with embedded Stripe payments. Download PDF, Word & Excel formats.`;

  const handleDownload = (format: 'pdf' | 'word' | 'excel') => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = `/templates/${template.title.toLowerCase().replace(/\s+/g, '-')}-invoice-template.${format === 'word' ? 'docx' : format === 'excel' ? 'xlsx' : 'pdf'}`;
    link.download = `${template.title}-invoice-template.${format === 'word' ? 'docx' : format === 'excel' ? 'xlsx' : 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.proinvoice.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Invoice Templates",
        "item": "https://www.proinvoice.app/invoice-templates"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${template.title} Invoice Template`,
        "item": `https://www.proinvoice.app${template.slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How do I create a ${template.title.toLowerCase()} invoice?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Use our free ${template.title.toLowerCase()} invoice template above. Simply fill in your business details, add line items specific to ${template.title.toLowerCase()} work, and download or send with embedded payment links. Our generator includes industry-specific fields for accurate billing.`
        }
      },
      {
        "@type": "Question",
        "name": `What should be on a ${template.title.toLowerCase()} invoice?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A ${template.title.toLowerCase()} invoice should include: ${template.lineItems.slice(0, 3).join(', ')}, payment terms, your business information, and clear descriptions of work performed. Include any industry-specific requirements and compliance details.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I take deposits or partial payments for ${template.title.toLowerCase()} work?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our ${template.title.toLowerCase()} invoice template supports deposits and partial payments. You can request upfront deposits (commonly ${template.paymentTerms.includes('deposit') ? template.paymentTerms : '25-50%'}) and set up milestone-based billing for larger projects.`
        }
      }
    ]
  };

  return (
    <PageLayout 
      title={pageTitle}
      description={description}
      canonical={`https://www.proinvoice.app${template.slug}`}
    >
      <SEOHeaders
        title={pageTitle}
        description={description}
        canonical={`https://www.proinvoice.app${template.slug}`}
        structuredData={faqSchema}
        ogImage="/og-image.webp"
      />

      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Breadcrumb */}
      <div className="bg-muted/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-2 text-sm text-foreground/70">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/invoice-templates" className="hover:text-primary">Invoice Templates</Link>
            <span>/</span>
            <span className="text-foreground">{template.title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {template.title} Invoice Template
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-6 max-w-3xl mx-auto">
            Free PDF, Word & Excel formats. Create professional {template.title.toLowerCase()} invoices in 30 seconds with embedded Stripe checkout. Get paid 3x faster with smart payment reminders.
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">Avg: {template.averageAmount}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">{template.paymentTerms}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">Industry Standard</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Pain Points & Solution */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Stop Losing Money on {template.title} Projects
              </h2>
              <p className="text-foreground/80 mb-6">
                {template.description} Our template eliminates common billing mistakes and gets you paid faster with professional formatting and embedded payment processing.
              </p>
              
              <div className="space-y-3">
                {template.painPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Solves: {point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-invoice-border rounded-lg p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4">Industry-Specific Line Items</h3>
              <div className="grid grid-cols-2 gap-2">
                {template.lineItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Generator */}
        <div className="mb-12">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">
                <Calculator className="w-6 h-6 inline mr-2" />
                Live {template.title} Invoice Generator
              </CardTitle>
              <CardDescription>
                Create your {template.title.toLowerCase()} invoice instantly with embedded Stripe payments
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 mb-6">
                <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium text-primary mb-2">
                  Professional {template.title} Invoice Generator
                </p>
                <p className="text-foreground/70 text-sm">
                  Industry-specific fields • Automatic calculations • Stripe integration
                </p>
              </div>
              
              <Link to="/invoice">
                <Button size="lg" className="mr-4 mb-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-md">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Create {template.title} Invoice
                </Button>
              </Link>
              
              <p className="text-xs text-foreground/70 mt-2">
                No signup required • Free to use • Professional templates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Industry ROI & Success Metrics */}
        <div className="mb-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            {template.title} Invoicing ROI
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="text-center border-0 bg-white/50">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <p className="text-sm font-medium text-foreground/80">Faster Payment Collection</p>
                <p className="text-xs text-foreground/70 mt-2">Average 7 days vs 30+ days</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/50">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">70%</div>
                <p className="text-sm font-medium text-foreground/80">Fewer Late Payments</p>
                <p className="text-xs text-foreground/70 mt-2">With embedded payment links</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/50">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">30 sec</div>
                <p className="text-sm font-medium text-foreground/80">Invoice Creation Time</p>
                <p className="text-xs text-foreground/70 mt-2">Industry-specific templates</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Download Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            Download Free {template.title} Invoice Templates
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-medium transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">PDF Template</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Fillable PDF with {template.title.toLowerCase()} specific fields
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full bg-muted/50 hover:bg-muted text-foreground"
                  onClick={() => handleDownload('pdf')}
                >
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Word Template</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Editable Word document for customization
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full bg-muted/50 hover:bg-muted text-foreground"
                  onClick={() => handleDownload('word')}
                >
                  Download Word
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Excel Template</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Spreadsheet with automatic calculations
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
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
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">
                  How do I create a {template.title.toLowerCase()} invoice?
                </h3>
                <p className="text-foreground/80">
                  Use our free {template.title.toLowerCase()} invoice template above. Simply fill in your business details, add line items specific to {template.title.toLowerCase()} work, and download or send with embedded payment links. Our generator includes industry-specific fields for accurate billing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">
                  What should be on a {template.title.toLowerCase()} invoice?
                </h3>
                <p className="text-foreground/80">
                  A {template.title.toLowerCase()} invoice should include: {template.lineItems.slice(0, 3).join(', ')}, payment terms, your business information, and clear descriptions of work performed. Include any industry-specific requirements and compliance details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">
                  Can I take deposits or partial payments for {template.title.toLowerCase()} work?
                </h3>
                <p className="text-foreground/80">
                  Yes, our {template.title.toLowerCase()} invoice template supports deposits and partial payments. You can request upfront deposits (commonly {template.paymentTerms.includes('deposit') ? template.paymentTerms : '25-50%'}) and set up milestone-based billing for larger projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-primary to-primary-dark text-primary-foreground rounded-lg p-8 shadow-large">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-lg text-primary-foreground/95 mb-6">
            Join thousands of {template.title.toLowerCase()} professionals using ProInvoice
          </p>
          <Link to="/invoice">
            <Button size="lg" variant="secondary" className="bg-accent hover:bg-accent-dark text-foreground font-semibold shadow-md">
              <FileText className="w-4 h-4 mr-2" />
              Create Your {template.title} Invoice Now
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};