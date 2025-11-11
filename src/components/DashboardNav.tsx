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
import { Badge } from "@/components/ui/badge";
import { useNotificationCounts } from "@/hooks/useNotificationCounts";

const DashboardNav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { counts } = useNotificationCounts();

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      description: "Overview & stats",
      badge: null
    },
    {
      name: "Invoices",
      href: "/invoice",
      icon: FileText,
      description: "Create & manage invoices",
      badge: counts.invoices
    },
    {
      name: "Estimates",
      href: "/estimates",
      icon: FileCheck,
      description: "Create & manage estimates",
      badge: counts.estimates
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
      description: "Manage your clients",
      badge: null
    },
    {
      name: "Recurring",
      href: "/recurring-billing",
      icon: RefreshCw,
      description: "Recurring billing cycles",
      badge: null
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      description: "View reports & insights",
      badge: null
    },
    {
      name: "Templates",
      href: "/templates",
      icon: Package,
      description: "Browse templates",
      badge: null
    },
    {
      name: "Business",
      href: "/business-settings",
      icon: Settings,
      description: "Business settings",
      badge: null
    },
    {
      name: "Subscription",
      href: "/subscription",
      icon: CreditCard,
      description: "Manage subscription",
      badge: counts.notifications
    }
  ];

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40 shadow-sm">
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
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap relative",
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
                {item.badge && item.badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-auto h-5 min-w-5 flex items-center justify-center px-1 text-xs"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
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
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 relative",
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
                {item.badge && item.badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-1 h-4 min-w-4 flex items-center justify-center px-1 text-[10px]"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
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
                    <div className="flex flex-col flex-1">
                      <span>{item.name}</span>
                      <span className="text-xs opacity-80">{item.description}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="h-6 min-w-6 flex items-center justify-center px-2"
                      >
                        {item.badge > 99 ? '99+' : item.badge}
                      </Badge>
                    )}
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

