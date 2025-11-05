import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface RelatedLink {
  title: string;
  description: string;
  url: string;
  category?: string;
}

interface RelatedLinksProps {
  currentPage?: string;
  maxLinks?: number;
}

/**
 * Related Links Component
 * Displays contextual links to related pages for SEO and navigation
 */
const RelatedLinks: React.FC<RelatedLinksProps> = ({ currentPage, maxLinks = 6 }) => {
  // Define related links by page
  const relatedLinksByPage: Record<string, RelatedLink[]> = {
    '/hvac-contractors': [
      {
        title: 'General Contractors',
        description: 'Invoicing software for general contractors',
        url: '/general-contractors',
        category: 'Trades',
      },
      {
        title: 'Electricians',
        description: 'Invoicing software for electricians',
        url: '/electricians',
        category: 'Trades',
      },
      {
        title: 'Plumbers',
        description: 'Invoicing software for plumbers',
        url: '/plumbers',
        category: 'Trades',
      },
      {
        title: 'Deposit Collection',
        description: 'Learn how to collect deposits upfront',
        url: '/features/deposit-collection',
        category: 'Features',
      },
      {
        title: 'Change Order Management',
        description: 'Manage scope changes professionally',
        url: '/features/change-order-management',
        category: 'Features',
      },
      {
        title: 'Protecting Cashflow',
        description: 'Best practices for contractor cashflow',
        url: '/guides/protecting-cashflow',
        category: 'Guides',
      },
    ],
    '/features/deposit-collection': [
      {
        title: 'Milestone Payments',
        description: 'Multi-phase invoice tracking',
        url: '/features/milestone-payments',
        category: 'Features',
      },
      {
        title: 'Progress Billing',
        description: 'Bill customers as work progresses',
        url: '/features/progress-billing',
        category: 'Features',
      },
      {
        title: 'Change Order Management',
        description: 'Manage scope changes professionally',
        url: '/features/change-order-management',
        category: 'Features',
      },
      {
        title: 'Protecting Cashflow',
        description: 'Best practices for contractor cashflow',
        url: '/guides/protecting-cashflow',
        category: 'Guides',
      },
      {
        title: 'Multi-Day Projects',
        description: 'Managing multi-day contractor projects',
        url: '/guides/multi-day-projects',
        category: 'Guides',
      },
      {
        title: 'HVAC Contractors',
        description: 'Invoicing software for HVAC contractors',
        url: '/hvac-contractors',
        category: 'Trades',
      },
    ],
    '/guides/protecting-cashflow': [
      {
        title: 'Deposit Collection',
        description: 'Learn how to collect deposits upfront',
        url: '/features/deposit-collection',
        category: 'Features',
      },
      {
        title: 'Progress Billing',
        description: 'Bill customers as work progresses',
        url: '/features/progress-billing',
        category: 'Features',
      },
      {
        title: 'Milestone Payments',
        description: 'Multi-phase invoice tracking',
        url: '/features/milestone-payments',
        category: 'Features',
      },
      {
        title: 'Handling Change Orders',
        description: 'Best practices for managing change orders',
        url: '/guides/handling-change-orders',
        category: 'Guides',
      },
      {
        title: 'Multi-Day Projects',
        description: 'Managing multi-day contractor projects',
        url: '/guides/multi-day-projects',
        category: 'Guides',
      },
      {
        title: 'General Contractors',
        description: 'Invoicing software for general contractors',
        url: '/general-contractors',
        category: 'Trades',
      },
    ],
    '/features/milestone-payments': [
      {
        title: 'Deposit Collection',
        description: 'Learn how to collect deposits upfront',
        url: '/features/deposit-collection',
        category: 'Features',
      },
      {
        title: 'Progress Billing',
        description: 'Bill customers as work progresses',
        url: '/features/progress-billing',
        category: 'Features',
      },
      {
        title: 'Change Order Management',
        description: 'Manage scope changes professionally',
        url: '/features/change-order-management',
        category: 'Features',
      },
      {
        title: 'Protecting Cashflow',
        description: 'Best practices for contractor cashflow',
        url: '/guides/protecting-cashflow',
        category: 'Guides',
      },
      {
        title: 'Multi-Day Projects',
        description: 'Managing multi-day contractor projects',
        url: '/guides/multi-day-projects',
        category: 'Guides',
      },
      {
        title: 'HVAC Contractors',
        description: 'Invoicing software for HVAC contractors',
        url: '/hvac-contractors',
        category: 'Trades',
      },
    ],
  };

  // Get related links for current page
  const links = relatedLinksByPage[currentPage || ''] || [];
  const displayLinks = links.slice(0, maxLinks);

  if (displayLinks.length === 0) {
    return null;
  }

  // Group by category
  const groupedByCategory = displayLinks.reduce(
    (acc, link) => {
      const category = link.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(link);
      return acc;
    },
    {} as Record<string, RelatedLink[]>
  );

  return (
    <section className="py-12 border-t">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Related Resources</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayLinks.map((link) => (
            <Link key={link.url} to={link.url}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      {link.category && (
                        <div className="text-xs font-medium text-blue-600 mt-1">
                          {link.category}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{link.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;

