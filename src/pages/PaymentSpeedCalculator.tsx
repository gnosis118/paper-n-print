import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PaymentSpeedCalculator = () => {
  const [monthlyInvoices, setMonthlyInvoices] = useState(50);
  const [avgInvoiceValue, setAvgInvoiceValue] = useState(1500);
  
  // Wave: Average 35 days to payment
  // ProInvoice: Average 7 days to payment (5x faster)
  const wavePaymentDays = 35;
  const proInvoicePaymentDays = 7;
  const daysSaved = wavePaymentDays - proInvoicePaymentDays;
  
  const monthlyRevenue = monthlyInvoices * avgInvoiceValue;
  const annualRevenue = monthlyRevenue * 12;
  
  // Calculate cash flow improvement
  const dailyRevenue = monthlyRevenue / 30;
  const waveOutstandingCash = dailyRevenue * wavePaymentDays;
  const proInvoiceOutstandingCash = dailyRevenue * proInvoicePaymentDays;
  const cashFlowImprovement = waveOutstandingCash - proInvoiceOutstandingCash;
  
  // Calculate interest savings (assuming 5% cost of capital)
  const costOfCapital = 0.05;
  const annualInterestSavings = (cashFlowImprovement * costOfCapital);

  return (
    <PageLayout
      title="Payment Speed Calculator - ProInvoice"
      description="Calculate how much faster you'll get paid with ProInvoice vs Wave. See your cash flow improvement and interest savings."
      canonical="/payment-speed-calculator"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Payment Speed Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how much faster you'll get paid with ProInvoice vs Wave. Calculate your cash flow improvement.
          </p>
        </div>

        {/* Calculator */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Your Numbers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Input 1: Monthly Invoices */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  How many invoices do you send per month?
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  value={monthlyInvoices}
                  onChange={(e) => setMonthlyInvoices(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-muted-foreground">10</span>
                  <span className="text-2xl font-bold text-primary">{monthlyInvoices} invoices</span>
                  <span className="text-muted-foreground">500</span>
                </div>
              </div>

              {/* Input 2: Average Invoice Value */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  What's your average invoice value?
                </label>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100"
                  value={avgInvoiceValue}
                  onChange={(e) => setAvgInvoiceValue(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-muted-foreground">$100</span>
                  <span className="text-2xl font-bold text-primary">${avgInvoiceValue.toLocaleString()}</span>
                  <span className="text-muted-foreground">$10,000</span>
                </div>
              </div>

              {/* Annual Revenue Display */}
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="text-sm text-muted-foreground mb-1">Your Annual Revenue</p>
                <p className="text-3xl font-bold text-primary">${(annualRevenue / 1000).toFixed(0)}k</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Your Payment Speed Advantage</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Days Saved */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-2">{daysSaved} days</div>
                <p className="text-sm text-blue-800">Faster payment collection</p>
                <p className="text-xs text-blue-700 mt-2">Wave: {wavePaymentDays} days | ProInvoice: {proInvoicePaymentDays} days</p>
              </CardContent>
            </Card>

            {/* Cash Flow Improvement */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-600 mb-2">${(cashFlowImprovement / 1000).toFixed(1)}k</div>
                <p className="text-sm text-green-800">Improved cash flow</p>
                <p className="text-xs text-green-700 mt-2">Money available sooner</p>
              </CardContent>
            </Card>

            {/* Annual Interest Savings */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-2">${(annualInterestSavings / 1000).toFixed(1)}k</div>
                <p className="text-sm text-purple-800">Annual interest savings</p>
                <p className="text-xs text-purple-700 mt-2">At 5% cost of capital</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Wave (Current Average)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Monthly invoices:</span>
                      <span className="font-semibold">{monthlyInvoices}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Average invoice value:</span>
                      <span className="font-semibold">${avgInvoiceValue.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Monthly revenue:</span>
                      <span className="font-semibold">${(monthlyRevenue / 1000).toFixed(1)}k</span>
                    </li>
                    <li className="flex justify-between border-t pt-2">
                      <span>Days to payment:</span>
                      <span className="font-semibold text-red-600">{wavePaymentDays} days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Outstanding cash:</span>
                      <span className="font-semibold text-red-600">${(waveOutstandingCash / 1000).toFixed(1)}k</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">ProInvoice (With Embedded Payments)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Monthly invoices:</span>
                      <span className="font-semibold">{monthlyInvoices}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Average invoice value:</span>
                      <span className="font-semibold">${avgInvoiceValue.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Monthly revenue:</span>
                      <span className="font-semibold">${(monthlyRevenue / 1000).toFixed(1)}k</span>
                    </li>
                    <li className="flex justify-between border-t pt-2">
                      <span>Days to payment:</span>
                      <span className="font-semibold text-green-600">{proInvoicePaymentDays} days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Outstanding cash:</span>
                      <span className="font-semibold text-green-600">${(proInvoiceOutstandingCash / 1000).toFixed(1)}k</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Paid Faster?</h2>
          <p className="text-muted-foreground mb-6">
            Start using ProInvoice today and see the difference in your cash flow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/get-started">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentSpeedCalculator;

