import React from 'react';
import { usePagination } from '@/hooks/usePerformanceOptimization';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface EstimateItem {
  id: string;
  number: string;
  client_name: string;
  total: number;
  status: string;
  created_at: string;
}

interface PaginatedEstimatesListProps {
  estimates: EstimateItem[];
  pageSize?: number;
  onEstimateClick?: (estimate: EstimateItem) => void;
  renderEstimate?: (estimate: EstimateItem) => React.ReactNode;
}

/**
 * Paginated estimates list with performance optimization
 */
export const PaginatedEstimatesList: React.FC<PaginatedEstimatesListProps> = ({
  estimates,
  pageSize = 10,
  onEstimateClick,
  renderEstimate,
}) => {
  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(estimates, { pageSize });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending_payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'invoiced':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (estimates.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          No estimates found
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Estimates List */}
      <div className="space-y-2">
        {currentItems.map((estimate) => (
          <div
            key={estimate.id}
            onClick={() => onEstimateClick?.(estimate)}
            className="cursor-pointer"
          >
            {renderEstimate ? (
              renderEstimate(estimate)
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">
                          Estimate #{estimate.number}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            estimate.status
                          )}`}
                        >
                          {estimate.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {estimate.client_name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(estimate.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {formatCurrency(estimate.total)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} ({estimates.length} total)
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={!hasPrevPage}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={!hasNextPage}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedEstimatesList;

