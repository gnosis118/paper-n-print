import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, ThumbsUp, MessageSquare, Star, Zap } from "lucide-react";

export default function FeatureRequests() {
  const popularRequests = [
    {
      title: "Recurring Invoice Automation",
      description: "Automatically generate and send recurring invoices for subscription-based services",
      votes: 247,
      status: "In Development"
    },
    {
      title: "Multi-Currency Support",
      description: "Support for multiple currencies with automatic conversion rates",
      votes: 189,
      status: "Under Review"
    },
    {
      title: "Advanced Reporting Dashboard",
      description: "Comprehensive analytics with profit/loss, client reports, and tax summaries",
      votes: 156,
      status: "Planned"
    },
    {
      title: "Mobile App",
      description: "Native iOS and Android apps for invoice management on the go",
      votes: 134,
      status: "Under Review"
    },
    {
      title: "Time Tracking Integration",
      description: "Built-in time tracking with automatic invoice generation",
      votes: 98,
      status: "Requested"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-blue-100 text-blue-800";
      case "Planned": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>Feature Requests - Invoice Pro</title>
        <meta name="description" content="Submit feature requests and vote on upcoming features for Invoice Pro. Help shape the future of our invoicing platform." />
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
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Feature Requests</h1>
              <p className="text-xl text-muted-foreground">
                Help shape the future of Invoice Pro by submitting ideas and voting on upcoming features.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>How Feature Requests Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Submit Ideas</h3>
                      <p className="text-sm text-muted-foreground">
                        Share your feature ideas and improvements with our development team
                      </p>
                    </div>
                    <div className="text-center">
                      <ThumbsUp className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Community Voting</h3>
                      <p className="text-sm text-muted-foreground">
                        Vote on features you'd like to see to help us prioritize development
                      </p>
                    </div>
                    <div className="text-center">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Get Built</h3>
                      <p className="text-sm text-muted-foreground">
                        Popular features get added to our roadmap and developed by our team
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Most Requested Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularRequests.map((request, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{request.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{request.description}</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{request.votes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submit a Feature Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Before Submitting</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Check if your idea has already been submitted</li>
                        <li>Vote on existing requests that match your needs</li>
                        <li>Be specific about what you'd like to see</li>
                        <li>Explain how it would benefit your workflow</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">What Makes a Good Request</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Clear Problem:</strong> "I need to track time spent on projects to bill accurately"
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Specific Solution:</strong> "Add a built-in timer that creates line items automatically"
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Use Case:</strong> "As a consultant, this would save me 2 hours per week"
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Business Impact:</strong> "This would help me invoice 20% faster"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">How to Submit</h3>
                      <ol className="list-decimal list-inside space-y-1 ml-4 text-sm">
                        <li>Contact our support team via email or contact form</li>
                        <li>Include "Feature Request" in the subject line</li>
                        <li>Describe the feature and its benefits</li>
                        <li>Provide examples or mockups if helpful</li>
                        <li>We'll add it to our feature request system</li>
                      </ol>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button asChild>
                      <Link to="/contact">Submit Feature Request</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:gavin@currencytocurrency.app?subject=Feature Request">Email Feature Idea</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Development Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Feature Lifecycle</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <div>
                            <p className="font-medium">Requested</p>
                            <p className="text-sm text-muted-foreground">Feature idea submitted by user</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Under Review</p>
                            <p className="text-sm text-muted-foreground">Team evaluating feasibility and priority</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Planned</p>
                            <p className="text-sm text-muted-foreground">Added to development roadmap</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">In Development</p>
                            <p className="text-sm text-muted-foreground">Actively being built by our team</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-700 rounded-full"></div>
                          <div>
                            <p className="font-medium">Released</p>
                            <p className="text-sm text-muted-foreground">Feature is live and available to all users</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Prioritization Factors</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>User Votes:</strong> Features with more votes get higher priority</li>
                        <li><strong>Business Impact:</strong> How much it improves user workflows</li>
                        <li><strong>Technical Complexity:</strong> Development time and resources required</li>
                        <li><strong>Strategic Alignment:</strong> Fits with product roadmap and vision</li>
                        <li><strong>User Segments:</strong> Benefits the most users across different use cases</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Releases</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Here are some features that were recently released based on user requests:
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold">Enhanced Invoice Templates</h3>
                      <p className="text-sm text-muted-foreground">Added new professional templates with better customization options</p>
                      <p className="text-xs text-green-600 mt-1">Released 2 weeks ago</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold">Payment Status Tracking</h3>
                      <p className="text-sm text-muted-foreground">Real-time payment status updates and automated payment confirmations</p>
                      <p className="text-xs text-green-600 mt-1">Released 1 month ago</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold">Client Management System</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive client database with contact management</p>
                      <p className="text-xs text-green-600 mt-1">Released 6 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Keep track of feature development and new releases:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li><strong>Release Notes:</strong> Check our changelog for new features</li>
                    <li><strong>Email Updates:</strong> Subscribe to feature announcements</li>
                    <li><strong>Roadmap:</strong> View our public development roadmap</li>
                    <li><strong>Beta Testing:</strong> Join our beta program for early access</li>
                  </ul>
                  
                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" asChild>
                      <Link to="/contact">Join Beta Program</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:gavin@currencytocurrency.app?subject=Subscribe to Updates">Get Updates</a>
                    </Button>
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