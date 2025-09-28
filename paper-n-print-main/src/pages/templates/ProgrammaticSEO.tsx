import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Star, Check, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQSchema } from '@/components/FAQSchema';

// Template configurations for different trades/industries with expanded coverage
const tradeTemplates = {
  'construction': {
    name: 'Construction Invoice Template',
    description: 'Professional construction invoice template with labor, materials, and equipment tracking',
    features: ['Labor hours tracking', 'Material cost breakdown', 'Equipment rental', 'Progress billing', 'Lien waiver compliance', 'Change order management'],
    preview: '/templates/construction-preview.png',
    industries: ['General Contractors', 'Electricians', 'Plumbers', 'HVAC', 'Roofing', 'Concrete']
  },
  'freelance': {
    name: 'Freelance Invoice Template', 
    description: 'Clean freelance invoice template perfect for consultants, designers, and independent contractors',
    features: ['Hourly rate tracking', 'Project milestones', 'Time tracking', 'Expense reimbursement', 'Multiple payment options', 'Client portal access'],
    preview: '/templates/freelance-preview.png',
    industries: ['Graphic Design', 'Web Development', 'Content Writing', 'Photography', 'Marketing', 'Consulting']
  },
  'consulting': {
    name: 'Consulting Invoice Template',
    description: 'Professional consulting invoice template with project phases and retainer tracking',
    features: ['Project phase billing', 'Retainer management', 'Expense tracking', 'Professional branding', 'Tax compliance', 'Client reporting'],
    preview: '/templates/consulting-preview.png',
    industries: ['Management Consulting', 'IT Consulting', 'Financial Advisory', 'Legal Services', 'HR Consulting', 'Strategy']
  },
  'trades': {
    name: 'Trades Invoice Template',
    description: 'Specialized invoice template for plumbers, electricians, HVAC, and other trade professionals',
    features: ['Service call tracking', 'Parts & labor breakdown', 'Emergency rates', 'Warranty terms', 'License display', 'Equipment usage'],
    preview: '/templates/trades-preview.png',
    industries: ['Plumbing', 'Electrical', 'HVAC', 'Landscaping', 'Automotive', 'Appliance Repair']
  },
  'healthcare': {
    name: 'Healthcare Invoice Template',
    description: 'HIPAA-compliant invoice template for healthcare providers and medical practices',
    features: ['CPT code integration', 'Insurance billing', 'Patient privacy', 'Service descriptions', 'Payment plans', 'Compliance tracking'],
    preview: '/templates/healthcare-preview.png',
    industries: ['Medical Practices', 'Dental Clinics', 'Physical Therapy', 'Mental Health', 'Veterinary', 'Home Healthcare']
  },
  'legal': {
    name: 'Legal Services Invoice Template',
    description: 'Professional legal invoice template with time tracking and case management',
    features: ['Billable hours', 'Case tracking', 'Expense allocation', 'Trust accounting', 'Retainer billing', 'Court filing fees'],
    preview: '/templates/legal-preview.png',
    industries: ['Law Firms', 'Solo Practitioners', 'Corporate Legal', 'Family Law', 'Criminal Defense', 'Estate Planning']
  }
};

// Location-specific information with expanded coverage
const locationInfo = {
  'california': {
    name: 'California',
    taxRate: '7.25% - 10.75%',
    requirements: ['California sales tax compliance', 'Contractors license display', 'Workers compensation coverage', 'Mechanics lien rights'],
    businessTips: 'California requires contractors to display their license number on all invoices over $500. Consider including lien waiver language.',
    industries: ['Construction', 'Tech Services', 'Creative Services', 'Consulting']
  },
  'new-york': {
    name: 'New York',
    taxRate: '4% - 8.875%',
    requirements: ['NY sales tax compliance', 'Contractor registration', 'Prevailing wage compliance', 'Trust fund requirements'],
    businessTips: 'New York City requires additional local business tax considerations. Include Article 9 lien language for construction.',
    industries: ['Construction', 'Financial Services', 'Real Estate', 'Legal Services']
  },
  'texas': {
    name: 'Texas',
    taxRate: '6.25% - 8.25%',
    requirements: ['Texas sales tax permit', 'Right to lien notices', 'Prompt payment act compliance', 'Retainage provisions'],
    businessTips: 'Texas has specific lien notice requirements that must be included in construction invoices. Fund notice may be required.',
    industries: ['Construction', 'Oil & Gas', 'Technology', 'Healthcare']
  },
  'florida': {
    name: 'Florida',
    taxRate: '6% - 8.5%',
    requirements: ['Florida sales tax compliance', 'Contractor licensing', 'Notice to owner requirements', 'Construction lien law'],
    businessTips: 'Florida requires specific notice to owner language for construction projects over $2,500. Include bond claim deadlines.',
    industries: ['Construction', 'Tourism', 'Real Estate', 'Marine Services']
  },
  'illinois': {
    name: 'Illinois',
    taxRate: '6.25% - 11%',
    requirements: ['Illinois sales tax compliance', 'Contractors license', 'Mechanics lien compliance', 'Retainage statutes'],
    businessTips: 'Illinois has strict mechanics lien deadlines. Include preliminary notice requirements for construction projects.',
    industries: ['Construction', 'Manufacturing', 'Agriculture', 'Transportation']
  },
  'pennsylvania': {
    name: 'Pennsylvania',
    taxRate: '6% - 8.5%',
    requirements: ['PA sales tax compliance', 'Contractor registration', 'Mechanics lien law', 'Right-to-know law'],
    businessTips: 'Pennsylvania requires specific lien waiver forms. Include prevailing wage rates for public projects.',
    industries: ['Construction', 'Manufacturing', 'Healthcare', 'Energy']
  }
};

const ProgrammaticSEO = () => {
  const { trade, location } = useParams<{ trade: string; location: string }>();
  
  const tradeData = tradeTemplates[trade as keyof typeof tradeTemplates];
  const locationData = locationInfo[location as keyof typeof locationInfo];

  if (!tradeData || !locationData) {
    return (
      <PageLayout title="Template Not Found" noIndex={true}>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested template combination is not available.</p>
          <Link to="/templates">
            <Button>View All Templates</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const pageTitle = `${tradeData.name} for ${locationData.name} | Free Download | InvoicePro`;
  const pageDescription = `Free ${tradeData.name.toLowerCase()} specifically designed for ${locationData.name} businesses. Includes local tax rates (${locationData.taxRate}), compliance requirements, and professional formatting.`;

  // FAQ data for this template combination
  const templateFAQs = [
    {
      question: `Is this ${tradeData.name.toLowerCase()} free to use?`,
      answer: `Yes, our ${tradeData.name.toLowerCase()} is completely free to download and use. You can create up to 3 invoices per month on our free plan.`
    },
    {
      question: `Does this template include ${locationData.name} tax rates?`,
      answer: `Yes, this template is pre-configured with ${locationData.name} tax rates (${locationData.taxRate}) and includes local compliance requirements.`
    },
    {
      question: `What industries is this template best for?`,
      answer: `This template works great for ${tradeData.industries?.slice(0, 3).join(', ')} and other similar ${trade} professionals in ${locationData.name}.`
    },
    {
      question: `Are there any legal requirements included?`,
      answer: `Yes, this template includes ${locationData.name}-specific requirements such as ${locationData.requirements.slice(0, 2).join(' and ')}.`
    },
    {
      question: `Can I customize this template?`,
      answer: `Absolutely! You can customize colors, add your logo, modify fields, and adjust the template to match your business branding and needs.`
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${tradeData.name} - ${locationData.name}`,
    "description": pageDescription,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "locationCreated": {
      "@type": "Place",
      "name": locationData.name
    }
  };

  return (
    <PageLayout 
      title={pageTitle}
      description={pageDescription}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/templates" className="hover:text-primary">Templates</Link>
          <span className="mx-2">›</span>
          <span className="capitalize">{trade}</span>
          <span className="mx-2">›</span>
          <span>{locationData.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {tradeData.name} for {locationData.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            {tradeData.description}. Includes {locationData.name}-specific tax rates, compliance requirements, and professional formatting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/invoice">
              <Button size="lg" className="px-8">
                <FileText className="w-4 h-4 mr-2" />
                Create Invoice Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Preview */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Live Template Preview</CardTitle>
                <CardDescription>
                  Interactive preview showing {locationData.name} tax rates and compliance elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">{tradeData.name}</p>
                    <p className="text-muted-foreground">Customized for {locationData.name}</p>
                    <p className="text-sm text-muted-foreground mt-2">Tax Rate: {locationData.taxRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

        {/* Industry-Specific Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Popular Industries in {locationData.name}</CardTitle>
            <CardDescription>
              This template works great for these common {locationData.name} industries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {locationData.industries?.map((industry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">{industry}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Template Industries */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Perfect For These {tradeData.name.split(' ')[0]} Professionals</CardTitle>
            <CardDescription>
              Specialized features for your industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {tradeData.industries?.map((industry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-sm">{industry}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{locationData.name} Business Requirements</CardTitle>
                <CardDescription>
                  Important compliance and tax information for {locationData.name} businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tax Rate Range</h4>
                    <p className="text-muted-foreground">{locationData.taxRate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Compliance Requirements</h4>
                    <ul className="space-y-2">
                      {locationData.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Local Business Tip</h4>
                    <p className="text-sm text-muted-foreground">{locationData.businessTips}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Template Features */}
            <Card>
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tradeData.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Template Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Downloads</span>
                  <span className="font-semibold">2,500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                    <span className="text-sm font-semibold ml-1">4.9</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="font-semibold">Jan 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Ready to Get Started?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Create your {trade} invoice in 30 seconds
                </p>
                <Link to="/invoice">
                  <Button variant="secondary" className="w-full">
                    Start Creating
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {templateFAQs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Structured Data */}
      <FAQSchema faqs={templateFAQs} pageUrl={(typeof window !== 'undefined' ? window.location.href : '')} />

      {/* Enhanced Structured Data */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(tradeTemplates)
              .filter(([key]) => key !== trade)
              .slice(0, 4)
              .map(([key, template]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-accent/5 rounded mb-4 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Link to={`/templates/${key}/${location}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Template
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {templateFAQs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Templates */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(tradeTemplates)
              .filter(([key]) => key !== trade)
              .slice(0, 4)
              .map(([key, template]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-accent/5 rounded mb-4 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Link to={`/templates/${key}/${location}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Template
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      {/* FAQ Structured Data */}
      <FAQSchema faqs={templateFAQs} pageUrl={(typeof window !== 'undefined' ? window.location.href : '')} />

      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": `${tradeData.name} - ${locationData.name}`,
            "description": pageDescription,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "locationCreated": {
              "@type": "Place",
              "name": locationData.name
            },
            "targetAudience": {
              "@type": "Audience",
              "audienceType": tradeData.industries?.join(", ")
            },
            "featureList": tradeData.features,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1200"
            }
          })
        }}
      />
    </PageLayout>
  );
};

export default ProgrammaticSEO;