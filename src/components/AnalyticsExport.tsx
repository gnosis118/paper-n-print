import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Sheet } from 'lucide-react';
import { useEstimateAnalytics } from '@/hooks/useEstimateAnalytics';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AnalyticsExport: React.FC = () => {
  const { analytics } = useEstimateAnalytics();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    if (!analytics) return;

    setIsExporting(true);
    try {
      const data = [
        ['ProInvoice Analytics Report'],
        ['Generated', new Date().toLocaleString()],
        [],
        ['Key Metrics'],
        ['Total Estimates', analytics.totalEstimates],
        ['Sent Estimates', analytics.sentEstimates],
        ['Accepted Estimates', analytics.acceptedEstimates],
        ['Invoiced Estimates', analytics.invoicedEstimates],
        ['Conversion Rate (%)', analytics.conversionRate],
        ['Average Time to Accept (days)', analytics.averageTimeToAccept.toFixed(2)],
        ['Total Estimate Value ($)', analytics.totalEstimateValue.toFixed(2)],
        ['Total Deposits Collected ($)', analytics.totalDepositCollected.toFixed(2)],
        [],
        ['Status Breakdown'],
        ['Sent', analytics.estimatesByStatus.sent],
        ['Accepted', analytics.estimatesByStatus.accepted],
        ['Invoiced', analytics.estimatesByStatus.invoiced],
        [],
        ['Recent Estimates'],
        ['Number', 'Client', 'Total', 'Status', 'Created'],
        ...analytics.recentEstimates.map(est => [
          est.number,
          est.client_name,
          est.total.toFixed(2),
          est.status,
          new Date(est.created_at).toLocaleDateString(),
        ]),
      ];

      const csv = data.map(row => 
        row.map(cell => 
          typeof cell === 'string' && cell.includes(',') 
            ? `"${cell}"` 
            : cell
        ).join(',')
      ).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Success',
        description: 'Analytics exported to CSV',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to export analytics',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    if (!analytics) return;

    setIsExporting(true);
    try {
      const data = {
        exportDate: new Date().toISOString(),
        metrics: {
          totalEstimates: analytics.totalEstimates,
          sentEstimates: analytics.sentEstimates,
          acceptedEstimates: analytics.acceptedEstimates,
          invoicedEstimates: analytics.invoicedEstimates,
          conversionRate: analytics.conversionRate,
          averageTimeToAccept: analytics.averageTimeToAccept,
          totalEstimateValue: analytics.totalEstimateValue,
          totalDepositCollected: analytics.totalDepositCollected,
        },
        statusBreakdown: analytics.estimatesByStatus,
        recentEstimates: analytics.recentEstimates,
      };

      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Success',
        description: 'Analytics exported to JSON',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to export analytics',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generatePDFReport = () => {
    if (!analytics) return;

    setIsExporting(true);
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>ProInvoice Analytics Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
            h2 { color: #555; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f8f9fa; font-weight: bold; }
            .metric { display: inline-block; width: 48%; margin: 10px 1%; padding: 15px; background: #f8f9fa; border-radius: 5px; }
            .metric-value { font-size: 24px; font-weight: bold; color: #007bff; }
            .metric-label { color: #666; font-size: 14px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>ProInvoice Analytics Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          
          <h2>Key Metrics</h2>
          <div class="metric">
            <div class="metric-label">Total Estimates</div>
            <div class="metric-value">${analytics.totalEstimates}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Conversion Rate</div>
            <div class="metric-value">${analytics.conversionRate}%</div>
          </div>
          <div class="metric">
            <div class="metric-label">Total Value</div>
            <div class="metric-value">$${analytics.totalEstimateValue.toFixed(2)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Deposits Collected</div>
            <div class="metric-value">$${analytics.totalDepositCollected.toFixed(2)}</div>
          </div>
          
          <h2>Status Breakdown</h2>
          <table>
            <tr>
              <th>Status</th>
              <th>Count</th>
            </tr>
            <tr>
              <td>Sent</td>
              <td>${analytics.estimatesByStatus.sent}</td>
            </tr>
            <tr>
              <td>Accepted</td>
              <td>${analytics.estimatesByStatus.accepted}</td>
            </tr>
            <tr>
              <td>Invoiced</td>
              <td>${analytics.estimatesByStatus.invoiced}</td>
            </tr>
          </table>
          
          <h2>Recent Estimates</h2>
          <table>
            <tr>
              <th>Number</th>
              <th>Client</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
            ${analytics.recentEstimates.map(est => `
              <tr>
                <td>${est.number}</td>
                <td>${est.client_name}</td>
                <td>$${est.total.toFixed(2)}</td>
                <td>${est.status}</td>
                <td>${new Date(est.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </table>
          
          <div class="footer">
            <p>This report was automatically generated by ProInvoice.</p>
          </div>
        </body>
        </html>
      `;

      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
      }

      toast({
        title: 'Success',
        description: 'PDF report opened for printing',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to generate PDF',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <Sheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileText className="w-4 h-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={generatePDFReport}>
          <FileText className="w-4 h-4 mr-2" />
          Print as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

