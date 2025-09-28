import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import CleanTemplate from "@/components/templates/CleanTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import TradesTemplate from "@/components/templates/TradesTemplate";

// Sample invoice data for template preview
const sampleData = {
  business: {
    name: "Your Business Name",
    email: "contact@yourbusiness.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street\nSuite 100\nYour City, ST 12345",
    website: "www.yourbusiness.com",
    logoUrl: ""
  },
  client: {
    name: "John Smith",
    company: "Client Company Inc.",
    email: "john@clientcompany.com",
    address: "456 Client Avenue\nClient City, ST 67890"
  },
  meta: {
    number: "INV-1001",
    issueDate: "2024-01-15",
    dueDate: "2024-01-29",
    terms: "Net 14"
  },
  items: [
    {
      description: "Web Design Services",
      qty: 40,
      rate: 75.00,
      taxable: true
    },
    {
      description: "Domain & Hosting Setup",
      qty: 1,
      rate: 150.00,
      taxable: true
    },
    {
      description: "SEO Optimization",
      qty: 10,
      rate: 100.00,
      taxable: true
    }
  ],
  totals: {
    taxRate: 8.5,
    discount: 200,
    shipping: 0
  },
  notes: "Thank you for your business! Payment is due within 14 days. Please include invoice number with payment.",
  template: "Clean",
  accent: "#3b82f6",
  watermark: false,
  userProfile: {
    subscription_status: 'pro',
    invoice_count: 5
  }
};

const templates = [
  {
    name: "Clean",
    description: "Professional and minimal design with clean typography. Perfect for consultants, agencies, and service providers.",
    features: ["Sans-serif typography", "Thin elegant borders", "Monochrome with accent colors", "Clean table layout"],
    component: CleanTemplate
  },
  {
    name: "Modern", 
    description: "Contemporary design with colored header and structured layout. Great for tech companies and modern businesses.",
    features: ["Two-column header design", "Colored brand band", "Modern typography", "Structured information blocks"],
    component: ModernTemplate
  },
  {
    name: "Trades",
    description: "Bold and high-contrast design perfect for contractors, trades, and hands-on businesses.",
    features: ["Bold typography", "High contrast design", "Larger totals display", "Industrial aesthetic"],
    component: TradesTemplate
  }
];

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("Clean");
  const [previewData, setPreviewData] = useState({
    ...sampleData,
    template: "Clean"
  });

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName);
    setPreviewData({
      ...sampleData,
      template: templateName
    });
  };

  const selectedTemplateInfo = templates.find(t => t.name === selectedTemplate);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-invoice-border bg-invoice-paper shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-2xl font-bold text-invoice-brand">Invoice Templates</h1>
            </div>
            <Link to="/invoice">
              <Button className="bg-invoice-brand hover:bg-invoice-brand/90">
                <FileText className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Template Selection */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each template is designed for different business types and professional needs. 
            Click on any template below to see a live preview.
          </p>
        </div>

        {/* Template Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {templates.map((template) => (
            <div
              key={template.name}
              className={`bg-card border rounded-lg shadow-soft p-6 cursor-pointer transition-all hover:shadow-medium ${
                selectedTemplate === template.name 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-invoice-border'
              }`}
              onClick={() => handleTemplateSelect(template.name)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedTemplate === template.name 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {selectedTemplate === template.name ? 'Selected' : 'Click to Preview'}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Template Preview */}
        <div className="bg-card border border-invoice-border rounded-lg shadow-soft">
          <div className="p-6 border-b border-invoice-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{selectedTemplate} Template Preview</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedTemplateInfo?.description}
                </p>
              </div>
              <Link to="/invoice">
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Use This Template
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <div className="scale-75 origin-top-left transform">
              {selectedTemplateInfo && (
                <selectedTemplateInfo.component data={previewData} />
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Ready to Create Your Invoice?
          </h3>
          <p className="text-muted-foreground mb-6">
            Start with the {selectedTemplate} template or customize any template to match your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/invoice">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <FileText className="w-5 h-5 mr-2" />
                Create Invoice Now
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">
                Learn More Features
              </Button>
            </Link>
          </div>
        </div>

        {/* Industry-Specific Templates */}
        <div className="mt-16 pt-16 border-t border-invoice-border">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Industry-Specific Templates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized invoice templates designed for specific industries and locations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            <Link to="/templates/construction" className="group">
              <div className="bg-card border border-invoice-border rounded-lg shadow-soft p-6 hover:shadow-medium transition-all group-hover:border-primary">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Construction Invoice Template</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      Industry Specific
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Perfect for contractors, builders, and construction companies. Track labor, materials, and equipment costs.
                </p>
                <div className="text-primary text-sm font-medium group-hover:underline">
                  View Template →
                </div>
              </div>
            </Link>

            <Link to="/templates/consulting" className="group">
              <div className="bg-card border border-invoice-border rounded-lg shadow-soft p-6 hover:shadow-medium transition-all group-hover:border-primary">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Consulting Invoice Template</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      Professional Services
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Designed for consultants and professional service providers. Perfect for hourly billing and project tracking.
                </p>
                <div className="text-primary text-sm font-medium group-hover:underline">
                  View Template →
                </div>
              </div>
            </Link>

            <Link to="/templates/freelance-nyc" className="group">
              <div className="bg-card border border-invoice-border rounded-lg shadow-soft p-6 hover:shadow-medium transition-all group-hover:border-primary">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">NYC Freelance Template</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                      NYC Compliant
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Compliant with NYC's Freelance Isn't Free Act. Includes required legal protections and tax calculations.
                </p>
                <div className="text-primary text-sm font-medium group-hover:underline">
                  View Template →
                </div>
              </div>
            </Link>

            <Link to="/templates/freelance-california" className="group">
              <div className="bg-card border border-invoice-border rounded-lg shadow-soft p-6 hover:shadow-medium transition-all group-hover:border-primary">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">California Freelance Template</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                      CA Compliant
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  AB5 compliant template for California freelancers. Includes proper independent contractor documentation.
                </p>
                <div className="text-primary text-sm font-medium group-hover:underline">
                  View Template →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;