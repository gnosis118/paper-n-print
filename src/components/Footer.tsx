import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '/contact' },
  ];

  const resourceLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/docs' },
    { name: 'Status', href: '#' },
    { name: 'Community', href: '#' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Preferences', href: '/cookies' },
    { name: 'Do Not Sell/Share', href: '/do-not-sell' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Security', href: '/security' },
  ];

  return (
    <footer className="bg-muted/30 border-t" role="contentinfo">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IG</span>
              </div>
              <span className="font-bold text-lg">Invoice Generator</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Professional invoice templates and SaaS tools for businesses worldwide.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <strong>Contact:</strong> Gavin Clay
              </div>
              <div>
                <a 
                  href="mailto:gavin@currencytocurrency.app" 
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  gavin@currencytocurrency.app
                </a>
              </div>
              <div>
                <a 
                  href="tel:916-969-3705" 
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  916-969-3705
                </a>
              </div>
              <div className="pt-2 text-xs">
                <strong>Mailing Address:</strong><br />
                [PLACEHOLDER - TO BE FILLED BY SITE OWNER]<br />
                [Street Address]<br />
                [City, State ZIP]<br />
                [Country]
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Invoice Generator. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a 
                href="mailto:gavin@currencytocurrency.app"
                className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              >
                gavin@currencytocurrency.app
              </a>
              <span>•</span>
              <a 
                href="tel:916-969-3705"
                className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              >
                916-969-3705
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Invoice Generator",
            "url": "https://[PLACEHOLDER-DOMAIN]",
            "logo": "https://[PLACEHOLDER-DOMAIN]/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-916-969-3705",
              "contactType": "customer service",
              "email": "gavin@currencytocurrency.app"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "[PLACEHOLDER CITY]",
              "addressRegion": "[PLACEHOLDER STATE]",
              "postalCode": "[PLACEHOLDER ZIP]",
              "addressCountry": "US"
            }
          })
        }}
      />
    </footer>
  );
};

export default Footer;