
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";

interface Transaction {
  id: number;
  date: string;
  patientName: string;
  sessionType: string;
  amount: number;
  status: "Paid" | "Pending" | "Cancelled";
  paymentMethod: string;
}

interface EarningsData {
  month: string;
  earnings: number;
  sessions: number;
}

export const TherapistEarnings = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  
  // Mock earnings data
  const monthlyEarnings: EarningsData[] = [
    { month: "Jan", earnings: 6400, sessions: 32 },
    { month: "Feb", earnings: 8000, sessions: 40 },
    { month: "Mar", earnings: 9000, sessions: 45 },
    { month: "Apr", earnings: 7600, sessions: 38 },
    { month: "May", earnings: 9600, sessions: 48 },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: 1,
      date: "2025-05-29",
      patientName: "Sarah Johnson",
      sessionType: "Individual Therapy",
      amount: 200,
      status: "Paid",
      paymentMethod: "Credit Card"
    },
    {
      id: 2,
      date: "2025-05-29",
      patientName: "Michael Brown",
      sessionType: "Individual Therapy", 
      amount: 200,
      status: "Paid",
      paymentMethod: "Insurance"
    },
    {
      id: 3,
      date: "2025-05-28",
      patientName: "Emma Davis",
      sessionType: "Individual Therapy",
      amount: 200,
      status: "Pending",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 4,
      date: "2025-05-28",
      patientName: "Robert Wilson",
      sessionType: "Extended Session",
      amount: 280,
      status: "Paid",
      paymentMethod: "Credit Card"
    },
    {
      id: 5,
      date: "2025-05-27",
      patientName: "Lisa Martinez",
      sessionType: "Individual Therapy",
      amount: 200,
      status: "Cancelled",
      paymentMethod: "Insurance"
    }
  ];

  const paymentMethodData = [
    { name: "Credit Card", value: 45, color: "#0088FE" },
    { name: "Insurance", value: 35, color: "#00C49F" },
    { name: "Bank Transfer", value: 15, color: "#FFBB28" },
    { name: "Cash", value: 5, color: "#FF8042" }
  ];

  const currentMonthStats = {
    totalEarnings: 9600,
    totalSessions: 48,
    avgPerSession: 200,
    pendingPayments: 600,
    monthlyGrowth: 12.5
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleExportReport = () => {
    toast.success("Earnings report exported successfully");
  };

  const handleRequestPayment = (transactionId: number) => {
    toast.success("Payment reminder sent");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your income and financial performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">${currentMonthStats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{currentMonthStats.monthlyGrowth}% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Sessions Completed</p>
                <p className="text-2xl font-bold">{currentMonthStats.totalSessions}</p>
                <p className="text-sm text-blue-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg per Session</p>
                <p className="text-2xl font-bold">${currentMonthStats.avgPerSession}</p>
                <p className="text-sm text-purple-600">Standard rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold">${currentMonthStats.pendingPayments}</p>
                <p className="text-sm text-orange-600">3 transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Trend</CardTitle>
            <CardDescription>Monthly earnings over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Earnings"]} />
                <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment types</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{transaction.patientName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{transaction.sessionType}</span>
                      <span>•</span>
                      <span>{format(new Date(transaction.date), "MMM d, yyyy")}</span>
                      <span>•</span>
                      <span>{transaction.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount}</p>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                  {transaction.status === "Pending" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRequestPayment(transaction.id)}
                    >
                      Request Payment
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
