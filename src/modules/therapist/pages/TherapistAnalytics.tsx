import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Calendar, Download } from "lucide-react";
import { TherapistLayout } from "../componets/layout/LayoutTherapist";

export const TherapistAnalytics = () => {
  // Mock data for charts
  const sessionData = [
    { month: "Jan", sessions: 32 },
    { month: "Feb", sessions: 40 },
    { month: "Mar", sessions: 45 },
    { month: "Apr", sessions: 38 },
    { month: "May", sessions: 48 },
  ];

  const outcomeData = [
    { month: "Jan", improvement: 65 },
    { month: "Feb", improvement: 68 },
    { month: "Mar", improvement: 72 },
    { month: "Apr", improvement: 75 },
    { month: "May", improvement: 82 },
  ];

  const patientDistributionData = [
    { name: "Anxiety", value: 40 },
    { name: "Depression", value: 30 },
    { name: "Trauma", value: 15 },
    { name: "Other", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const monthlyStats = [
    { label: "Sessions", value: "48", change: "+10%" },
    { label: "New Patients", value: "8", change: "+2" },
    { label: "Avg. Rating", value: "4.9", change: "+0.1" },
    { label: "Revenue", value: "$9,600", change: "+$1,200" },
  ];

  return (
    <TherapistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Performance metrics and insights</p>
          </div>

          <div className="flex items-center space-x-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlyStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      stat.change.includes("+")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Session Activity
              </CardTitle>
              <CardDescription>Monthly number of sessions</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sessionData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3b82f6" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Patient Outcomes
              </CardTitle>
              <CardDescription>Average improvement percentage</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={outcomeData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="improvement"
                    stroke="#10b981"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Patient Distribution
              </CardTitle>
              <CardDescription>By primary condition</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patientDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {patientDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                Upcoming Schedule
              </CardTitle>
              <CardDescription>Next week's sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-px rounded-lg overflow-hidden bg-gray-200">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div
                        key={day}
                        className="bg-white p-2 text-center font-medium"
                      >
                        {day}
                      </div>
                    )
                  )}

                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="bg-white p-2 h-24 border-t">
                      <div className="font-medium text-sm mb-1">{24 + i}</div>
                      {i === 0 && (
                        <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1">
                          3 sessions
                        </div>
                      )}
                      {i === 2 && (
                        <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1">
                          4 sessions
                        </div>
                      )}
                      {i === 4 && (
                        <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1">
                          2 sessions
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button variant="outline">View Full Schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TherapistLayout>
  );
};
