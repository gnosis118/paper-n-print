import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

/**
 * Breadcrumb Navigation Component
 * Displays navigation hierarchy for SEO and UX
 */
const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, showHome = true }) => {
  const location = useLocation();

  // Generate breadcrumbs from URL if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    if (showHome) {
      breadcrumbs.push({ label: 'Home', path: '/' });
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        path: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      className="py-3 px-4 bg-gray-50 border-b"
      aria-label="Breadcrumb"
    >
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={breadcrumb.path} className="flex items-center gap-2">
                {index === 0 && showHome ? (
                  <Link
                    to={breadcrumb.path}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">{breadcrumb.label}</span>
                  </Link>
                ) : (
                  <>
                    {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                    {isLast ? (
                      <span className="text-gray-700 font-medium">{breadcrumb.label}</span>
                    ) : (
                      <Link
                        to={breadcrumb.path}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {breadcrumb.label}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Schema.org BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((breadcrumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.label,
            item: `https://www.proinvoice.app${breadcrumb.path}`,
          })),
        })}
      </script>
    </nav>
  );
};

export default BreadcrumbNav;

