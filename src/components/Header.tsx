import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import proInvoiceLogo from '@/assets/proinvoice-logo-new.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Templates', href: '/invoice-templates' },
    { name: 'Estimates', href: '/estimate-templates' },
    { name: 'Products', href: '/products' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Security', href: '/security' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full border-b bg-background shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={proInvoiceLogo}
            alt="ProInvoice.app - Professional Invoice Generator"
            className="h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1",
                isActivePath(item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/get-started">
            <Button size="sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle main menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t bg-background"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  isActivePath(item.href)
                    ? "text-primary font-semibold bg-accent"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t space-y-2">
              {/* Legal Links */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  {legalLinks.map((link, index) => (
                    <React.Fragment key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      {index < legalLinks.length - 1 && (
                        <span className="text-muted-foreground">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* Auth Buttons */}
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link to="/get-started" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;