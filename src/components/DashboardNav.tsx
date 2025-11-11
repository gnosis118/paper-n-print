import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FileCheck,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Package,
  Menu,
  X,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const DashboardNav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      description: "Overview & stats"
    },
    {
      name: "Invoices",
      href: "/invoice",
      icon: FileText,
      description: "Create & manage invoices"
    },
    {
      name: "Estimates",
      href: "/estimates",
      icon: FileCheck,
      description: "Create & manage estimates"
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
      description: "Manage your clients"
    },
    {
      name: "Recurring",
      href: "/recurring-billing",
      icon: RefreshCw,
      description: "Recurring billing cycles"
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      description: "View reports & insights"
    },
    {
      name: "Templates",
      href: "/templates",
      icon: Package,
      description: "Browse templates"
    },
    {
      name: "Business",
      href: "/business-settings",
      icon: Settings,
      description: "Business settings"
    },
    {
      name: "Subscription",
      href: "/subscription",
      icon: CreditCard,
      description: "Manage subscription"
    }
  ];

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-background border-b sticky top-20 z-40">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  isActive
                    ? "bg-primary text-white shadow-md font-semibold"
                    : "text-foreground hover:text-foreground"
                )}
                title={item.description}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Tablet Navigation (Scrollable) */}
        <div className="hidden md:flex lg:hidden items-center space-x-1 overflow-x-auto py-3 scrollbar-hide">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap flex-shrink-0",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  isActive
                    ? "bg-primary text-white shadow-md font-semibold"
                    : "text-foreground hover:text-foreground"
                )}
                title={item.description}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <h2 className="text-sm font-semibold text-foreground">Dashboard Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      isActive
                        ? "bg-primary text-white shadow-md font-semibold"
                        : "text-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs opacity-80">{item.description}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default DashboardNav;

