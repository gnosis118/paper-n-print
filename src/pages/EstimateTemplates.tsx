import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const EstimateTemplates = () => {
  const templates = [
    // Beauty & Personal Care Templates
    {
      id: 'hair-styling',
      title: 'Hair Styling Estimate Template',
      description: 'Professional estimates for hair salons with color, cuts, and styling services',
      averageAmount: '$185',
      paymentTerms: '50% deposit, Balance due at appointment',
      features: ['Service packages', 'Color pricing', 'Product recommendations'],
      category: 'Beauty'
    },
    {
      id: 'nail-services',
      title: 'Nail Services Estimate Template',
      description: 'Complete estimates for nail salons with manicures, pedicures, and nail art',
      averageAmount: '$95',
      paymentTerms: 'Payment at service completion',
      features: ['Service menu pricing', 'Gel vs regular options', 'Art design pricing']
    },
    {
      id: 'lash-services',
      title: 'Lash Services Estimate Template',
      description: 'Professional estimates for lash artists with extensions, lifts, and fills',
      averageAmount: '$165',
      paymentTerms: '50% deposit, Balance due at appointment',
      features: ['Extension pricing', 'Lift & tint options', 'Fill scheduling']
    },
    {
      id: 'massage-therapy',
      title: 'Massage Therapy Estimate Template',
      description: 'Professional estimates for massage therapists with session types and add-ons',
      averageAmount: '$120',
      paymentTerms: '50% deposit, Balance due at appointment',
      features: ['Session type pricing', 'Add-on options', 'Package deals']
    },
    {
      id: 'tattoo-services',
      title: 'Tattoo Services Estimate Template',
      description: 'Professional estimates for tattoo artists with design consultation and hourly rates',
      averageAmount: '$450',
      paymentTerms: '50% deposit, Balance due at appointment',
      features: ['Design consultation', 'Hourly pricing', 'Touch-up terms']
    },
    {
      id: 'esthetics',
      title: 'Esthetics Estimate Template',
      description: 'Professional estimates for estheticians with facials, waxing, and skincare',
      averageAmount: '$135',
      paymentTerms: '50% deposit, Balance due at appointment',
      features: ['Treatment pricing', 'Waxing options', 'Skincare products']
    },
    // Trades & Services Templates
    {
      id: 'hvac',
      title: 'HVAC Estimate Template',
      description: 'Professional estimates for heating, ventilation, and air conditioning services',
      averageAmount: '$2,850',
      paymentTerms: '50% deposit, Net 30',
      features: ['Equipment specifications', 'Labor breakdown', 'Warranty details']
    },
    {
      id: 'plumbing',
      title: 'Plumbing Estimate Template',
      description: 'Complete estimates for residential and commercial plumbing projects',
      averageAmount: '$475',
      paymentTerms: '25% deposit, Net 15',
      features: ['Material costs', 'Emergency rates', 'Permit fees']
    },
    {
      id: 'construction',
      title: 'Construction Estimate Template',
      description: 'Detailed estimates for construction and remodeling projects',
      averageAmount: '$15,500',
      paymentTerms: '30% deposit, Progress billing',
      features: ['Phase breakdown', 'Material allowances', 'Change order terms']
    },
    {
      id: 'landscaping',
      title: 'Landscaping Estimate Template',
      description: 'Professional estimates for landscaping and lawn care services',
      averageAmount: '$3,200',
      paymentTerms: '40% deposit, Net 30',
      features: ['Plant specifications', 'Maintenance schedules', 'Seasonal rates']
    },
    {
      id: 'roofing',
      title: 'Roofing Estimate Template',
      description: 'Complete estimates for roofing repairs and replacements',
      averageAmount: '$8,750',
      paymentTerms: '50% deposit, COD',
      features: ['Material grades', 'Weather clauses', 'Cleanup included']
    },
    {
      id: 'cleaning',
      title: 'Cleaning Estimate Template',
      description: 'Professional estimates for residential and commercial cleaning',
      averageAmount: '$125',
      paymentTerms: 'Payment on completion',
      features: ['Recurring discounts', 'Supply costs', 'Special requests']
    }
  ];

  return (
    <PageLayout
      title="Estimate Templates - Professional Estimates for Contractors | ProInvoice"
      description="Download free estimate templates for HVAC, plumbing, construction, and more. Accept deposits online and auto-convert to invoices. Get paid faster with ProInvoice."
      canonical="/estimates"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Professional Estimate Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            Create professional estimates in minutes, collect deposits online, and automatically convert accepted estimates to invoices.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Perfect for beauty professionals, contractors, and service businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link to="/get-started">Use Online Free</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download PDF Sample
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-green-600 fill-green-600" />
              <span>No card to try</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-green-600 fill-green-600" />
              <span>Stripe/ACH/Apple Pay</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-green-600 fill-green-600" />
              <span>Works on mobile</span>
            </div>
          </div>
        </div>

        {/* Why Choose Our Templates */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Estimate Templates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Accept & Pay Deposits</h3>
                <p className="text-sm text-muted-foreground">
                  Customers can accept estimates and pay deposits online, reducing no-shows and securing projects.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Auto-Convert to Invoice</h3>
                <p className="text-sm text-muted-foreground">
                  When an estimate is accepted, it automatically converts to an invoice with remaining balance due.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Professional Appearance</h3>
                <p className="text-sm text-muted-foreground">
                  Industry-specific templates that look professional and help you win more projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Template Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">All Estimate Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      Popular
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg. Amount:</span>
                      <span className="font-medium">{template.averageAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Terms:</span>
                      <span className="font-medium">{template.paymentTerms}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Includes:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/templates/${template.id}-estimate-template`}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link to="/estimates">
                        Use Online
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your First Estimate?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start your free 7-day trial and create professional estimates that get accepted and paid faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/get-started">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default EstimateTemplates;