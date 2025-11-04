import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import { Helmet } from 'react-helmet-async';

const TRADES = [
  {
    id: 'electricians',
    title: 'Electricians',
    icon: '⚡',
    description: 'Professional electrical work estimates and invoicing',
    features: ['Service calls', 'Labor tracking', 'Material costs', 'Milestone billing'],
    cta: 'Start Your Free Electrical Bid',
  },
  {
    id: 'plumbers',
    title: 'Plumbers',
    icon: '🔧',
    description: 'Plumbing service estimates with easy payment collection',
    features: ['Service calls', 'Emergency rates', 'Parts tracking', 'Recurring clients'],
    cta: 'Start Your Free Plumbing Bid',
  },
  {
    id: 'roofers',
    title: 'Roofers',
    icon: '🏠',
    description: 'Roofing project estimates with milestone payments',
    features: ['Project estimates', 'Milestone tracking', 'Material quotes', 'Weather delays'],
    cta: 'Start Your Free Roofing Bid',
  },
  {
    id: 'landscapers',
    title: 'Landscapers',
    icon: '🌳',
    description: 'Landscaping service estimates and seasonal billing',
    features: ['Design quotes', 'Maintenance plans', 'Seasonal rates', 'Bulk projects'],
    cta: 'Start Your Free Landscaping Bid',
  },
  {
    id: 'handymen',
    title: 'Handymen',
    icon: '🔨',
    description: 'General handyman service estimates and invoicing',
    features: ['Quick estimates', 'Multiple services', 'Hourly rates', 'Repeat clients'],
    cta: 'Start Your Free Handyman Bid',
  },
];

export const TradesIndex: React.FC = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Contractor Bids & Invoicing | ProInvoice</title>
        <meta
          name="description"
          content="Professional bid and invoice software for electricians, plumbers, roofers, landscapers, and handymen. Get paid faster with automated invoicing."
        />
        <meta name="keywords" content="contractor bids, invoicing, electrician, plumber, roofer, landscaper, handyman" />
        <link rel="canonical" href="https://www.proinvoice.app/trades" />
      </Helmet>

      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Professional Bids for Every Trade
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get paid faster with professional estimates and automated invoicing designed for contractors
          </p>
        </section>

        {/* Trades Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRADES.map((trade) => (
            <Card key={trade.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{trade.icon}</div>
                <CardTitle>{trade.title}</CardTitle>
                <CardDescription>{trade.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {trade.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={`/trades/${trade.id}`}>
                  <Button className="w-full">{trade.cta}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/50 rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold">Why Contractors Choose ProInvoice</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold">Fast Estimates</h3>
                <p className="text-sm text-muted-foreground">Create professional bids in minutes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold">Get Paid Faster</h3>
                <p className="text-sm text-muted-foreground">Automated deposit collection and invoicing</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold">Mobile Ready</h3>
                <p className="text-sm text-muted-foreground">Send bids and collect payments on the go</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">Bank-level security for your data</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default TradesIndex;

