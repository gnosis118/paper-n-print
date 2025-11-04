import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import { Helmet } from 'react-helmet-async';

const TRADE_DETAILS: Record<string, any> = {
  electricians: {
    title: 'Electrician Bid & Invoice Software',
    description: 'Professional electrical work estimates designed for electricians',
    icon: '⚡',
    metaDescription: 'Create professional electrical bids and invoices. Get paid faster with automated deposit collection.',
    benefits: [
      'Service call tracking',
      'Labor hour calculations',
      'Material cost management',
      'Milestone-based billing',
      'Recurring client management',
      'Mobile bid creation',
    ],
    exampleItems: [
      { description: 'Service Call', rate: 75 },
      { description: 'Labor (per hour)', rate: 85 },
      { description: 'Materials & Parts', rate: 0 },
    ],
    testimonial: {
      text: 'ProInvoice helped me get paid 40% faster. My clients love the professional bids.',
      author: 'John, Licensed Electrician',
    },
  },
  plumbers: {
    title: 'Plumber Bid & Invoice Software',
    description: 'Professional plumbing service estimates designed for plumbers',
    icon: '🔧',
    metaDescription: 'Create professional plumbing bids and invoices. Manage emergency rates and recurring clients.',
    benefits: [
      'Emergency service rates',
      'Parts inventory tracking',
      'Service call management',
      'Recurring client billing',
      'Quick estimate templates',
      'Payment reminders',
    ],
    exampleItems: [
      { description: 'Service Call', rate: 65 },
      { description: 'Labor (per hour)', rate: 75 },
      { description: 'Materials & Parts', rate: 0 },
    ],
    testimonial: {
      text: 'My clients appreciate the professional invoices. Collections are much easier now.',
      author: 'Mike, Master Plumber',
    },
  },
  roofers: {
    title: 'Roofer Bid & Invoice Software',
    description: 'Professional roofing project estimates designed for roofers',
    icon: '🏠',
    metaDescription: 'Create professional roofing bids with milestone payments. Manage large projects easily.',
    benefits: [
      'Project-based estimates',
      'Milestone payment tracking',
      'Material quantity calculations',
      'Weather delay management',
      'Large project handling',
      'Deposit collection',
    ],
    exampleItems: [
      { description: 'Inspection & Estimate', rate: 150 },
      { description: 'Labor (per square)', rate: 300 },
      { description: 'Materials', rate: 0 },
    ],
    testimonial: {
      text: 'Managing large roofing projects is so much easier with milestone tracking.',
      author: 'Sarah, Roofing Contractor',
    },
  },
  landscapers: {
    title: 'Landscaper Bid & Invoice Software',
    description: 'Professional landscaping service estimates designed for landscapers',
    icon: '🌳',
    metaDescription: 'Create professional landscaping bids and manage seasonal billing. Get paid for design work.',
    benefits: [
      'Design consultation tracking',
      'Seasonal rate management',
      'Maintenance plan billing',
      'Bulk project handling',
      'Plant & material costs',
      'Recurring service billing',
    ],
    exampleItems: [
      { description: 'Design Consultation', rate: 100 },
      { description: 'Labor (per hour)', rate: 50 },
      { description: 'Plants & Materials', rate: 0 },
    ],
    testimonial: {
      text: 'My landscaping business is more professional and organized. Clients love the detailed bids.',
      author: 'Tom, Landscape Designer',
    },
  },
  handymen: {
    title: 'Handyman Bid & Invoice Software',
    description: 'Professional handyman service estimates designed for handymen',
    icon: '🔨',
    metaDescription: 'Create professional handyman bids and invoices. Manage multiple services and repeat clients.',
    benefits: [
      'Quick estimate creation',
      'Multiple service types',
      'Hourly rate management',
      'Repeat client tracking',
      'Material cost tracking',
      'Mobile invoicing',
    ],
    exampleItems: [
      { description: 'Service Call', rate: 60 },
      { description: 'Labor (per hour)', rate: 65 },
      { description: 'Materials', rate: 0 },
    ],
    testimonial: {
      text: 'I can now send professional bids from my truck. Collections improved significantly.',
      author: 'Dave, Independent Handyman',
    },
  },
};

export const TradePage: React.FC = () => {
  const { trade } = useParams<{ trade: string }>();
  const details = TRADE_DETAILS[trade || ''];

  if (!details) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Trade not found</h1>
          <Link to="/trades">
            <Button>Back to Trades</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <title>{details.title} | ProInvoice</title>
        <meta name="description" content={details.metaDescription} />
        <link rel="canonical" href={`https://www.proinvoice.app/trades/${trade}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: details.title,
            description: details.description,
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          })}
        </script>
      </Helmet>

      <div className="space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4 py-12">
          <div className="text-6xl mb-4">{details.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold">{details.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {details.description}
          </p>
          <Link to="/auth/signup">
            <Button size="lg">Start Your Free Bid</Button>
          </Link>
        </section>

        {/* Benefits */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Features Built for {trade}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {details.benefits.map((benefit: string) => (
              <div key={benefit} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                <span className="text-primary text-xl">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Example Template */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Example Bid Template</h2>
          <Card>
            <CardHeader>
              <CardTitle>Sample Bid</CardTitle>
              <CardDescription>Here's what your bids will look like</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {details.exampleItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-2 border-b">
                    <span>{item.description}</span>
                    <span className="font-semibold">${item.rate}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total</span>
                  <span>${details.exampleItems.reduce((sum: number, item: any) => sum + item.rate, 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonial */}
        <section className="bg-primary/10 rounded-lg p-8 text-center space-y-4">
          <p className="text-lg italic">"{details.testimonial.text}"</p>
          <p className="font-semibold">— {details.testimonial.author}</p>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 py-12">
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground">
            Join hundreds of {trade} using ProInvoice to get paid faster
          </p>
          <Link to="/auth/signup">
            <Button size="lg">Start Your Free Bid Now</Button>
          </Link>
        </section>
      </div>
    </PageLayout>
  );
};

export default TradePage;

