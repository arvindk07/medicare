
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, CreditCard, Calendar, TrendingUp, AlertCircle } from "lucide-react";

export const OrganizationBilling = () => {
  const currentPlan = {
    name: "Enterprise Pro",
    price: "$2,499",
    period: "per month",
    employees: 1247,
    sessionsIncluded: 2000,
    sessionsUsed: 1567,
    nextBilling: "February 15, 2024"
  };

  const billingHistory = [
    { id: 1, date: "Jan 15, 2024", amount: "$2,499.00", status: "Paid", description: "Enterprise Pro - Monthly Subscription" },
    { id: 2, date: "Dec 15, 2023", amount: "$2,499.00", status: "Paid", description: "Enterprise Pro - Monthly Subscription" },
    { id: 3, date: "Nov 15, 2023", amount: "$2,499.00", status: "Paid", description: "Enterprise Pro - Monthly Subscription" },
    { id: 4, date: "Oct 15, 2023", amount: "$2,299.00", status: "Paid", description: "Enterprise - Monthly Subscription" },
  ];

  const usageBreakdown = [
    { department: "Engineering", sessions: 456, cost: "$684.00" },
    { department: "Marketing", sessions: 298, cost: "$447.00" },
    { department: "Finance", sessions: 234, cost: "$351.00" },
    { department: "HR", sessions: 189, cost: "$283.50" },
    { department: "Sales", sessions: 234, cost: "$351.00" },
    { department: "Operations", sessions: 156, cost: "$234.00" },
  ];

  const getStatusColor = (status: string) => {
    return status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Usage</h1>
          <p className="text-gray-600">Manage your subscription and view usage analytics</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Download Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentPlan.name}</div>
            <p className="text-sm text-gray-600">{currentPlan.price} {currentPlan.period}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sessions Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentPlan.sessionsUsed}</div>
            <p className="text-sm text-gray-600">of {currentPlan.sessionsIncluded} included</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(currentPlan.sessionsUsed / currentPlan.sessionsIncluded) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentPlan.employees}</div>
            <p className="text-sm text-gray-600">enrolled users</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900">{currentPlan.nextBilling}</div>
            <p className="text-sm text-gray-600">Auto-renewal enabled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Department Usage & Costs
            </CardTitle>
            <CardDescription>Session usage breakdown by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageBreakdown.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{dept.department}</h3>
                    <p className="text-sm text-gray-600">{dept.sessions} sessions this month</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{dept.cost}</div>
                    <div className="text-sm text-gray-500">estimated cost</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </CardTitle>
            <CardDescription>Current payment method and billing details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="font-medium">•••• •••• •••• 4532</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Primary</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Visa ending in 4532</p>
                  <p>Expires 12/2026</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
                <Button variant="outline" className="w-full">
                  Update Billing Address
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Billing History
          </CardTitle>
          <CardDescription>Your recent billing and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((bill) => (
                  <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{bill.date}</td>
                    <td className="py-3 px-4 text-gray-600">{bill.description}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{bill.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Invoice
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Usage Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">This Month</h3>
              <div className="text-3xl font-bold text-blue-600 mb-1">1,567</div>
              <p className="text-sm text-blue-700">sessions completed</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Growth Rate</h3>
              <div className="text-3xl font-bold text-green-600 mb-1">+18%</div>
              <p className="text-sm text-green-700">vs last month</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Cost per Session</h3>
              <div className="text-3xl font-bold text-purple-600 mb-1">$1.59</div>
              <p className="text-sm text-purple-700">average this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
