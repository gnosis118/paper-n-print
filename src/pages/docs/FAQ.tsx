import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my first invoice?",
          answer: "Click 'Create Invoice' from your dashboard, choose a template, fill in your business and client information, add line items for your products or services, and review before sending. Our step-by-step guide walks you through each step."
        },
        {
          question: "Do I need to create an account to use Invoice Pro?",
          answer: "Yes, creating an account allows you to save your invoices, manage clients, track payments, and access all features. Sign up is free and takes just a few minutes."
        },
        {
          question: "Can I use my own logo on invoices?",
          answer: "Absolutely! Upload your logo in Business Settings and it will automatically appear on all your invoices. We support PNG, JPG, and SVG formats."
        }
      ]
    },
    {
      category: "Billing & Payments",
      questions: [
        {
          question: "How do I set up payment links?",
          answer: "Payment links are automatically generated when you create an invoice. Clients can click the link to pay online via credit card, ACH, or other payment methods. You can customize payment terms and options in your settings."
        },
        {
          question: "What payment methods do you support?",
          answer: "We support credit cards (Visa, MasterCard, American Express), ACH bank transfers, Apple Pay, and Google Pay through our secure Stripe integration."
        },
        {
          question: "When do I get paid?",
          answer: "Payments are processed immediately and typically appear in your bank account within 2-3 business days, depending on your bank and the payment method used."
        },
        {
          question: "Are there transaction fees?",
          answer: "We use Stripe for payment processing, which charges standard processing fees (2.9% + 30¢ for cards). There are no additional fees from Invoice Pro for payment processing."
        }
      ]
    },
    {
      category: "Invoice Management",
      questions: [
        {
          question: "Can I edit an invoice after sending it?",
          answer: "You can edit draft invoices at any time. For sent invoices, you can create a corrected version or issue a credit note. We recommend creating a new invoice for significant changes to maintain accurate records."
        },
        {
          question: "How do I track which invoices have been paid?",
          answer: "Your dashboard shows the status of all invoices (Draft, Sent, Paid, Overdue). You'll receive automatic notifications when clients view or pay invoices, and you can manually mark invoices as paid."
        },
        {
          question: "Can I set up recurring invoices?",
          answer: "Yes! You can create recurring invoices for regular clients. Set the frequency (weekly, monthly, quarterly, etc.) and we'll automatically generate and send invoices according to your schedule."
        },
        {
          question: "What happens if a client doesn't pay?",
          answer: "You can send payment reminders, apply late fees (if specified in your terms), and track overdue invoices in your dashboard. You always retain control over your collection process."
        }
      ]
    },
    {
      category: "Customization",
      questions: [
        {
          question: "Can I customize the look of my invoices?",
          answer: "Yes! You can customize colors, add your logo, choose from different templates, and modify the layout to match your brand. All customizations are saved and applied to future invoices automatically."
        },
        {
          question: "How many invoice templates are available?",
          answer: "We offer multiple professional templates including Clean (minimalist), Modern (contemporary), and Trades (for contractors). Each template can be customized with your colors and branding."
        },
        {
          question: "Can I add custom fields to my invoices?",
          answer: "You can add custom notes, terms, and payment instructions. For more advanced customization needs, contact our support team to discuss options."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "Is my data secure?",
          answer: "Yes, we use industry-standard encryption and security measures. All data is stored securely and we never share your information with third parties without your consent."
        },
        {
          question: "Who can see my invoices?",
          answer: "Only you and the clients you send invoices to can view them. Invoices are accessed via secure, unique links and are not publicly accessible or searchable."
        },
        {
          question: "What happens to my data if I cancel?",
          answer: "You can export all your invoice data before canceling. We retain data for 30 days after cancellation in case you want to reactivate, then it's permanently deleted."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What if I encounter a technical problem?",
          answer: "Contact our support team through the help section or email us directly. We typically respond within 24 hours and provide step-by-step assistance to resolve any issues."
        },
        {
          question: "Do you offer phone support?",
          answer: "Currently, we provide support via email and our help center. This allows us to provide detailed, documented assistance and maintain faster response times."
        },
        {
          question: "Can I import data from another invoicing system?",
          answer: "Yes, we can help you import client data and previous invoices from most common invoicing systems. Contact our support team with details about your current system for assistance."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Invoice Pro</title>
        <meta name="description" content="Find answers to common questions about Invoice Pro. Get help with billing, payments, customization, and technical support." />
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
              <HelpCircle className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find quick answers to the most common questions about Invoice Pro.
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => {
                        const itemIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openItems.includes(itemIndex);
                        
                        return (
                          <Collapsible key={faqIndex}>
                            <CollapsibleTrigger 
                              className="flex w-full items-center justify-between text-left p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              onClick={() => toggleItem(itemIndex)}
                            >
                              <span className="font-medium">{faq.question}</span>
                              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-4 pb-4">
                              <p className="text-muted-foreground mt-2">{faq.answer}</p>
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle>Still Have Questions?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Can't find the answer you're looking for? Our support team is here to help.
                  </p>
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link to="/contact">Contact Support</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:gavin@currencytocurrency.app">Email Us Directly</a>
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