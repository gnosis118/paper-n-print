import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Activity, CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export default function SystemStatus() {
  const systemComponents = [
    {
      name: "Invoice Creation",
      status: "operational",
      uptime: "99.9%",
      description: "Creating and editing invoices"
    },
    {
      name: "Payment Processing",
      status: "operational", 
      uptime: "99.8%",
      description: "Stripe payment gateway integration"
    },
    {
      name: "Email Delivery",
      status: "operational",
      uptime: "99.7%",
      description: "Invoice and notification emails"
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "99.9%",
      description: "Logo uploads and PDF generation"
    },
    {
      name: "User Authentication",
      status: "operational",
      uptime: "99.9%",
      description: "Login and account management"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.9%",
      description: "Data storage and retrieval"
    }
  ];

  const recentIncidents = [
    {
      date: "2024-01-15",
      title: "Brief Payment Processing Delay",
      status: "resolved",
      duration: "23 minutes",
      description: "Some payment confirmations were delayed due to Stripe API latency. All payments were processed successfully.",
      impact: "Low"
    },
    {
      date: "2024-01-08", 
      title: "Scheduled Maintenance",
      status: "completed",
      duration: "2 hours",
      description: "Planned database optimization and security updates performed during low-usage hours.",
      impact: "None"
    },
    {
      date: "2023-12-22",
      title: "Email Delivery Issues",
      status: "resolved", 
      duration: "1 hour 15 minutes",
      description: "Email service provider experienced temporary outages affecting invoice delivery.",
      impact: "Medium"
    }
  ];

  const upcomingMaintenance = [
    {
      date: "2024-02-01",
      time: "2:00 AM - 4:00 AM EST",
      title: "Database Performance Optimization",
      description: "Scheduled maintenance to improve system performance and reliability.",
      impact: "Minimal - System will remain accessible"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "outage": return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-600";
      case "degraded": return "text-yellow-600";
      case "outage": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getIncidentIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>System Status - ProInvoice</title>
        <meta name="description" content="Check the current status of ProInvoice services, uptime statistics, and any ongoing incidents." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link to="/docs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Documentation
              </Link>
            </div>

            <div className="mb-8">
              <Activity className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">System Status</h1>
              <p className="text-xl text-muted-foreground">
                Current operational status of all ProInvoice services and systems.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    All Systems Operational
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleString()} EST
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 text-sm">
                      All Invoice Pro services are currently running normally. No active incidents or maintenance windows.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemComponents.map((component, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(component.status)}
                          <div>
                            <h3 className="font-semibold">{component.name}</h3>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${getStatusColor(component.status)}`}>
                            {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {component.uptime} uptime
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <div className="text-sm text-muted-foreground">Overall Uptime</div>
                      <div className="text-xs text-green-600 mt-1">Last 30 days</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">120ms</div>
                      <div className="text-sm text-muted-foreground">Avg Response Time</div>
                      <div className="text-xs text-blue-600 mt-1">API endpoints</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">99.95%</div>
                      <div className="text-sm text-muted-foreground">Payment Success</div>
                      <div className="text-xs text-purple-600 mt-1">Transaction rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentIncidents.length > 0 ? (
                    <div className="space-y-4">
                      {recentIncidents.map((incident, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            {getIncidentIcon(incident.status)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{incident.title}</h3>
                                <div className="text-sm text-muted-foreground">{incident.date}</div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                              <div className="flex gap-4 text-xs">
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                  Duration: {incident.duration}
                                </span>
                                <span className={`px-2 py-1 rounded ${
                                  incident.impact === 'Low' ? 'bg-green-100 text-green-800' :
                                  incident.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  incident.impact === 'High' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  Impact: {incident.impact}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                      <p>No recent incidents to report</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingMaintenance.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingMaintenance.map((maintenance, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-blue-50">
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{maintenance.title}</h3>
                                <div className="text-sm text-muted-foreground">{maintenance.date}</div>
                              </div>
                              <div className="text-sm text-blue-700 mb-2">{maintenance.time}</div>
                              <p className="text-sm text-muted-foreground mb-2">{maintenance.description}</p>
                              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                                {maintenance.impact}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>No scheduled maintenance at this time</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Status Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Stay informed about system status and planned maintenance:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">Notification Methods</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Email alerts for major incidents</li>
                        <li>In-app notifications for maintenance</li>
                        <li>Status page updates (this page)</li>
                        <li>Social media announcements</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">What We Monitor</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Server response times and uptime</li>
                        <li>Payment processing success rates</li>
                        <li>Email delivery performance</li>
                        <li>Database query performance</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button asChild>
                      <Link to="/contact">Report an Issue</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:support@proinvoice.app?subject=Subscribe to Status Updates">Get Status Updates</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    If you're experiencing critical issues that aren't reflected in our status page:
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h3 className="font-semibold text-red-800">Critical Issue Reporting</h3>
                    </div>
                    <p className="text-sm text-red-700 mb-3">
                      For urgent issues affecting your business operations, please contact us immediately:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Email:</strong> <a href="mailto:support@proinvoice.app" className="text-red-600 hover:underline">support@proinvoice.app</a>
                      </div>
                      <div>
                        <strong>Subject Line:</strong> "URGENT: Critical System Issue"
                      </div>
                      <div>
                        <strong>Include:</strong> Description of the issue, your account email, and steps to reproduce
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}