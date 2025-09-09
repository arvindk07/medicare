import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageSquare,
  Phone,
  Mail,
  HelpCircle,
  Clock,
  Send,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { PatientLayout } from "../components/Layout/PatientLayout";

export const PatientSupport = () => {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const supportTickets = [
    {
      id: "TICK-001",
      subject: "Cannot join video session",
      category: "Technical Issue",
      status: "resolved",
      priority: "high",
      created: "2025-05-20",
      updated: "2025-05-21",
      response:
        "Issue resolved. Updated browser settings fixed the video connection problem.",
    },
    {
      id: "TICK-002",
      subject: "Billing question about insurance",
      category: "Billing",
      status: "in-progress",
      priority: "medium",
      created: "2025-05-18",
      updated: "2025-05-19",
      response: "We're currently reviewing your insurance coverage details.",
    },
    {
      id: "TICK-003",
      subject: "Request to change therapist",
      category: "Account",
      status: "open",
      priority: "low",
      created: "2025-05-15",
      updated: "2025-05-15",
      response:
        "Your request has been received and will be processed within 2-3 business days.",
    },
  ];

  const faqs = [
    {
      question: "How do I join a video therapy session?",
      answer:
        "You can join your video session by clicking the 'Join Session' button in your appointments section. Make sure you have a stable internet connection and allow camera/microphone permissions when prompted.",
    },
    {
      question: "What if I need to cancel or reschedule my appointment?",
      answer:
        "You can cancel or reschedule appointments up to 24 hours in advance through your 'My Sessions' page. For cancellations within 24 hours, please contact your therapist directly.",
    },
    {
      question: "How do billing and insurance work?",
      answer:
        "We accept most major insurance plans. Your copay will be charged after each session. You can view all billing information in the 'Billing' section of your account.",
    },
    {
      question: "Is my information secure and confidential?",
      answer:
        "Yes, we use bank-level encryption and comply with HIPAA regulations to ensure your personal and medical information remains completely confidential and secure.",
    },
    {
      question: "Can I switch therapists if needed?",
      answer:
        "Absolutely. If you feel you're not a good fit with your current therapist, you can request a change through the support system. We'll help match you with a better-suited professional.",
    },
    {
      question: "What happens if I miss a session?",
      answer:
        "If you miss a session without 24-hour notice, you may be charged for the full session. Please contact your therapist as soon as possible to discuss rescheduling options.",
    },
    {
      question: "How do I access my session notes and reports?",
      answer:
        "Your therapist may share session summaries and progress notes through your patient portal. These will appear in your 'Resources' section after each session.",
    },
    {
      question: "What should I do in a crisis situation?",
      answer:
        "If you're experiencing a mental health crisis, please call 911 or go to your nearest emergency room immediately. For non-emergency crisis support, call the National Suicide Prevention Lifeline at 988.",
    },
  ];

  const contactMethods = [
    {
      method: "Live Chat",
      description: "Chat with our support team",
      availability: "Mon-Fri, 9 AM - 6 PM",
      icon: MessageSquare,
      action: "Start Chat",
    },
    {
      method: "Phone Support",
      description: "Call our support line",
      availability: "Mon-Fri, 9 AM - 6 PM",
      icon: Phone,
      action: "Call Now",
      phone: "(555) 123-4567",
    },
    {
      method: "Email Support",
      description: "Send us an email",
      availability: "24/7 (Response within 24 hours)",
      icon: Mail,
      action: "Send Email",
      email: "support@therapyplatform.com",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim() || !ticketDescription.trim() || !ticketCategory) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Support ticket submitted successfully");
    setTicketSubject("");
    setTicketDescription("");
    setTicketCategory("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
        );
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600">
            Get help with your account and therapy sessions
          </p>
        </div>

        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="new-ticket">Submit Ticket</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions
                </CardDescription>

                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No FAQs found matching your search.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="text-center">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle>{method.method}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {method.availability}
                      </div>

                      {method.phone && (
                        <p className="font-medium">{method.phone}</p>
                      )}

                      {method.email && (
                        <p className="font-medium">{method.email}</p>
                      )}

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* My Tickets Tab */}
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>My Support Tickets</CardTitle>
                <CardDescription>Track your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600">
                            Ticket #{ticket.id}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Category:</span>{" "}
                          {ticket.category}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span>{" "}
                          {format(new Date(ticket.created), "MMM d, yyyy")}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>{" "}
                          {format(new Date(ticket.updated), "MMM d, yyyy")}
                        </div>
                        <div>
                          <span className="font-medium">Priority:</span>{" "}
                          {ticket.priority}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-sm text-gray-700">
                          {ticket.response}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Ticket Tab */}
          <TabsContent value="new-ticket">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Describe your issue and we'll help you resolve it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category *</label>
                  <Select
                    value={ticketCategory}
                    onValueChange={setTicketCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">
                        Billing & Payments
                      </SelectItem>
                      <SelectItem value="account">
                        Account Management
                      </SelectItem>
                      <SelectItem value="scheduling">Scheduling</SelectItem>
                      <SelectItem value="therapist">
                        Therapist Related
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Subject *</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description *</label>
                  <Textarea
                    placeholder="Please provide detailed information about your issue..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <Button
                  onClick={handleSubmitTicket}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PatientLayout>
  );
};
