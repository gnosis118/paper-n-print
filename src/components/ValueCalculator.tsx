import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Clock, TrendingUp } from "lucide-react";

const ValueCalculator = () => {
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(15);
  const [avgInvoiceAmount, setAvgInvoiceAmount] = useState(500);
  const [hoursSpentInvoicing, setHoursSpentInvoicing] = useState(5);

  // Calculations
  const monthlyRevenue = invoicesPerMonth * avgInvoiceAmount;
  const yearlyRevenue = monthlyRevenue * 12;
  
  // Time savings: ProInvoice saves ~80% of invoicing time
  const timeSavedPerMonth = hoursSpentInvoicing * 0.8;
  const timeSavedPerYear = timeSavedPerMonth * 12;
  
  // Value of time saved (assuming $50/hour billable rate)
  const hourlyRate = 50;
  const moneySavedPerMonth = timeSavedPerMonth * hourlyRate;
  const moneySavedPerYear = timeSavedPerMonth * 12 * hourlyRate;
  
  // Faster payments: Get paid 15 days faster on average
  const daysPaymentAccelerated = 15;
  const cashFlowImprovement = (monthlyRevenue / 30) * daysPaymentAccelerated;
  
  // Total value
  const totalMonthlyValue = moneySavedPerMonth + (cashFlowImprovement * 0.05); // 5% interest on improved cash flow
  const totalYearlyValue = totalMonthlyValue * 12;
  
  // ROI
  const proCost = 12;
  const monthlyROI = ((totalMonthlyValue - proCost) / proCost) * 100;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See how much time and money ProInvoice Pro saves your business
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Business</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Invoices per month</label>
                    <span className="text-sm font-bold text-primary">{invoicesPerMonth}</span>
                  </div>
                  <Slider
                    value={[invoicesPerMonth]}
                    onValueChange={(value) => setInvoicesPerMonth(value[0])}
                    min={5}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Average invoice amount</label>
                    <span className="text-sm font-bold text-primary">${avgInvoiceAmount}</span>
                  </div>
                  <Slider
                    value={[avgInvoiceAmount]}
                    onValueChange={(value) => setAvgInvoiceAmount(value[0])}
                    min={100}
                    max={5000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$100</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Hours spent on invoicing/month</label>
                    <span className="text-sm font-bold text-primary">{hoursSpentInvoicing}h</span>
                  </div>
                  <Slider
                    value={[hoursSpentInvoicing]}
                    onValueChange={(value) => setHoursSpentInvoicing(value[0])}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1h</span>
                    <span>20h</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-2">Your monthly revenue</div>
                  <div className="text-3xl font-bold text-foreground">
                    ${monthlyRevenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ${yearlyRevenue.toLocaleString()}/year
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-4">
              <Card className="border-2 border-success bg-success/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-success/20 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">Time Saved</div>
                      <div className="text-2xl font-bold text-foreground">
                        {timeSavedPerMonth.toFixed(1)} hours/month
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {timeSavedPerYear.toFixed(0)} hours/year
                      </div>
                      <div className="text-sm text-success font-medium mt-2">
                        Worth ${moneySavedPerMonth.toFixed(0)}/month
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">Faster Payments</div>
                      <div className="text-2xl font-bold text-foreground">
                        {daysPaymentAccelerated} days faster
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ${cashFlowImprovement.toLocaleString()} improved cash flow
                      </div>
                      <div className="text-sm text-primary font-medium mt-2">
                        Get paid in days, not weeks
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent bg-gradient-to-br from-accent/10 to-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">Total Monthly Value</div>
                      <div className="text-3xl font-bold text-foreground">
                        ${totalMonthlyValue.toFixed(0)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ${totalYearlyValue.toFixed(0)}/year in value
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">ProInvoice Pro cost:</span>
                          <span className="text-sm font-medium">$12/month</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-bold">Your ROI:</span>
                          <span className="text-2xl font-bold text-accent">
                            {monthlyROI.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-lg">
                <div className="text-center">
                  <div className="text-sm mb-2">ProInvoice Pro pays for itself</div>
                  <div className="text-4xl font-bold mb-2">
                    {(totalMonthlyValue / proCost).toFixed(1)}x
                  </div>
                  <div className="text-sm opacity-90">
                    For every $1 you spend, you get ${(totalMonthlyValue / proCost).toFixed(2)} in value
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center bg-muted/50 p-8 rounded-xl border-2">
            <p className="text-lg font-semibold mb-2">
              That's ${(totalMonthlyValue - proCost).toFixed(0)} extra in your pocket every month
            </p>
            <p className="text-muted-foreground mb-4">
              Or ${((totalMonthlyValue - proCost) * 12).toFixed(0)} per year
            </p>
            <p className="text-sm text-muted-foreground">
              Based on industry averages: 80% time savings, 15-day payment acceleration, $50/hour billable rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueCalculator;

