import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnonymousUserBannerProps {
  hasUsedFree: boolean;
  canUseFree: boolean;
}

export function AnonymousUserBanner({ hasUsedFree, canUseFree }: AnonymousUserBannerProps) {
  if (!hasUsedFree && canUseFree) {
    return (
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-blue-900 dark:text-blue-100">
            You have <strong>1 free template</strong> to try! Sign in for unlimited access with paid plans.
          </span>
          <Link to="/auth">
            <Button variant="outline" size="sm" className="ml-4 border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400">
              Sign In
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  if (hasUsedFree) {
    return (
      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm text-amber-900 dark:text-amber-100">
            You've used your free template. <strong>Sign in</strong> to continue creating invoices.
          </span>
          <Link to="/auth">
            <Button size="sm" className="ml-4 bg-amber-600 hover:bg-amber-700 text-white">
              Sign In Now
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
