import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart3, Users } from 'lucide-react';

const AdminNav: React.FC = () => {
  const location = useLocation();

  const adminLinks = [
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      description: 'View your business metrics',
    },
    {
      name: 'CRM',
      href: '/admin/crm',
      icon: Users,
      description: 'Manage your leads',
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="mb-8 border-b border-border">
      <div className="flex gap-1 overflow-x-auto">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap',
                isActive(link.href)
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
              title={link.description}
            >
              <Icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNav;

