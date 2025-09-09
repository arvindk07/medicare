
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Download, Eye, Calendar, DollarSign, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";

export const PatientBilling = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const billingInfo = {
    currentBalance: 0,
    nextPayment: {
      amount: 120,
      date: "2025-05-28",
      therapist: "Dr. Michael Chen"
    },
    paymentMethod: {
      type: "Visa",
      last4: "4242",
      expiry: "12/26"
    }
  };

  const invoices = [
    {
      id: "INV-001",
      date: "2025-05-15",
      therapist: "Dr. Michael Chen",
      sessionType: "Individual Therapy",
      amount: 120,
      status: "paid",
      dueDate: "2025-05-15",
      paidDate: "2025-05-15",
      description: "60-minute therapy session"
    },
    {
      id: "INV-002",
      date: "2025-05-08",
      therapist: "Dr. Michael Chen",
      sessionType: "Individual Therapy",
      amount: 120,
      status: "paid",
      dueDate: "2025-05-08",
      paidDate: "2025-05-08",
      description: "60-minute therapy session"
    },
    {
      id: "INV-003",
      date: "2025-05-01",
      therapist: "Dr. Michael Chen",
      sessionType: "Individual Therapy",
      amount: 120,
      status: "paid",
      dueDate: "2025-05-01",
      paidDate: "2025-05-02",
      description: "60-minute therapy session"
    },
    {
      id: "INV-004",
      date: "2025-04-24",
      therapist: "Dr. Michael Chen",
      sessionType: "Individual Therapy",
      amount: 120,
      status: "overdue",
      dueDate: "2025-04-24",
      paidDate: null,
      description: "60-minute therapy session"
    }
  ];

  const upcomingCharges = [
    {
      id: 1,
      date: "2025-05-28",
      therapist: "Dr. Michael Chen",
      sessionType: "Individual Therapy",
      amount: 120,
      time: "2:00 PM"
    },
    {
      id: 2,
      date: "2025-06-04",
      therapist: "Dr. Michael Chen",
      sessionType: "Individual Therapy",
      amount: 120,
      time: "2:00 PM"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: 2,
      type: "MasterCard",
      last4: "8888",
      expiry: "08/27",
      isDefault: false
    }
  ];

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Downloading invoice ${invoiceId}`);
  };

  const handlePayInvoice = (invoiceId: string) => {
    toast.success(`Payment initiated for invoice ${invoiceId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600">Manage your billing information and payment history</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${billingInfo.currentBalance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {billingInfo.currentBalance === 0 ? "All caught up!" : "Outstanding balance"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${billingInfo.nextPayment.amount}
            </div>
            <p className="text-xs text-muted-foreground">
              Due {format(new Date(billingInfo.nextPayment.date), "MMM d, yyyy")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              •••• {billingInfo.paymentMethod.last4}
            </div>
            <p className="text-xs text-muted-foreground">
              {billingInfo.paymentMethod.type} expires {billingInfo.paymentMethod.expiry}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Charges</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View and download your therapy session invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">
                          {invoice.therapist} • {format(new Date(invoice.date), "MMM d, yyyy")}
                        </p>
                        <p className="text-xs text-gray-500">{invoice.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">${invoice.amount}</span>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedInvoice(invoice)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Invoice {selectedInvoice?.id}</DialogTitle>
                              <DialogDescription>
                                Invoice details for therapy session
                              </DialogDescription>
                            </DialogHeader>
                            {selectedInvoice && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Therapist</p>
                                    <p className="text-sm text-gray-600">{selectedInvoice.therapist}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Session Date</p>
                                    <p className="text-sm text-gray-600">
                                      {format(new Date(selectedInvoice.date), "MMM d, yyyy")}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Amount</p>
                                    <p className="text-sm text-gray-600">${selectedInvoice.amount}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Status</p>
                                    {getStatusBadge(selectedInvoice.status)}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Description</p>
                                  <p className="text-sm text-gray-600">{selectedInvoice.description}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        
                        {invoice.status === "overdue" && (
                          <Button 
                            size="sm" 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handlePayInvoice(invoice.id)}
                          >
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Charges Tab */}
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Charges</CardTitle>
              <CardDescription>Sessions scheduled for billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCharges.map((charge) => (
                  <div key={charge.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {format(new Date(charge.date), "EEEE, MMM d, yyyy")}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {charge.therapist} at {charge.time}
                        </p>
                        <p className="text-xs text-gray-500">{charge.sessionType}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="font-medium text-lg">${charge.amount}</span>
                      <p className="text-xs text-gray-500">Auto-charged after session</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment-methods">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {method.type} ending in {method.last4}
                        </h3>
                        <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                        {method.isDefault && (
                          <Badge variant="outline" className="mt-1">Default</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
