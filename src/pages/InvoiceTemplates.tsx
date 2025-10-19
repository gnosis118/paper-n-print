import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, ArrowRight, Zap, Users, Shield, Star } from 'lucide-react';
import { invoiceTemplates, getTemplatesByCategory } from '@/data/invoiceTemplates';
import PageLayout from '@/components/PageLayout';

const InvoiceTemplates = () => {
  const tradeTemplates = getTemplatesByCategory('trades');
  const autoTemplates = getTemplatesByCategory('auto-logistics');
  const creativeTemplates = getTemplatesByCategory('creative');
  const personalTemplates = getTemplatesByCategory('personal-services');

  const CategorySection = ({ 
    title, 
    description, 
    templates, 
    icon: Icon 
  }: { 
    title: string; 
    description: string; 
    templates: typeof invoiceTemplates; 
    icon: any;
  }) => (
    <div className="mb-16">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mr-4">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-medium transition-all duration-200 hover:border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">{template.title} Invoice</CardTitle>
              <CardDescription className="line-clamp-2">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Amount:</span>
                  <span className="font-medium">{template.averageAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Terms:</span>
                  <span className="font-medium">{template.paymentTerms}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link to={template.slug} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="w-4 h-4 mr-1" />
                    View Template
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Free Invoice Templates by Industry | ProInvoice"
      description="30+ free professional invoice templates for every industry. Construction, plumbing, photography, consulting and more. Download PDF, Word & Excel formats with embedded Stripe payments."
      canonical="https://www.proinvoice.app/invoice-templates"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-light to-accent-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
            Free Professional Invoice Templates
          </h1>
          <p className="text-xl text-primary/80 mb-8 max-w-3xl mx-auto">
            Industry-specific invoice templates trusted by 10,000+ businesses. Create professional invoices in 30 seconds with embedded Stripe payments. Download in PDF, Word, and Excel formats.
          </p>
          
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
            <div className="flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-primary" />
              <span>10,000+ Users</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Stripe Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-primary" />
              <span>Industry Standard</span>
            </div>
          </div>

          <Link to="/invoice">
            <Button size="lg" className="mr-4">
              <Zap className="w-4 h-4 mr-2" />
              Create Invoice Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Why Choose Our Templates */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Why 10,000+ Businesses Choose Our Templates
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Unlike generic templates, ours are built specifically for each industry with the right line items, payment terms, and compliance requirements.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry-Specific</h3>
              <p className="text-muted-foreground">
                Pre-built with the exact line items, terms, and formatting your industry expects. No more generic templates.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Payments</h3>
              <p className="text-muted-foreground">
                Embedded Stripe checkout means customers pay with 2 clicks. Get paid 3x faster than traditional invoicing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional & Compliant</h3>
              <p className="text-muted-foreground">
                Built to industry standards with proper tax calculations, payment terms, and legal requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Template Categories */}
        <CategorySection
          title="Trades & Construction"
          description="Professional templates for contractors, electricians, plumbers, and skilled trades"
          templates={tradeTemplates}
          icon={FileText}
        />

        <CategorySection
          title="Auto & Logistics"
          description="Specialized templates for automotive services, transportation, and delivery businesses"
          templates={autoTemplates}
          icon={Users}
        />

        <CategorySection
          title="Creative Services"
          description="Templates for photographers, designers, developers, and creative professionals"
          templates={creativeTemplates}
          icon={Star}
        />

        <CategorySection
          title="Personal Services"
          description="Templates for wellness, beauty, fitness, and personal service providers"
          templates={personalTemplates}
          icon={Shield}
        />

        {/* CTA Section */}
        <div className="text-center bg-primary text-primary-foreground rounded-lg p-12 mt-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals using InvoicePro to create beautiful invoices and get paid instantly with Stripe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/invoice">
              <Button size="lg" variant="secondary">
                <FileText className="w-4 h-4 mr-2" />
                Create Your First Invoice
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <ArrowRight className="w-4 h-4 mr-2" />
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InvoiceTemplates;