
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { Activity, Calendar, Download, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsProps {
  userRole: "admin" | "master";
}

export const Analytics = ({ userRole }: AnalyticsProps) => {
  const [timeRange, setTimeRange] = useState("30d");
  
  // Mock data - in a real app, this would come from an API
  const userActivityData = [
    { name: "Jan", newUsers: 65, activeUsers: 145, sessions: 245 },
    { name: "Feb", newUsers: 78, activeUsers: 168, sessions: 278 },
    { name: "Mar", newUsers: 90, activeUsers: 190, sessions: 305 },
    { name: "Apr", newUsers: 81, activeUsers: 202, sessions: 324 },
    { name: "May", newUsers: 95, activeUsers: 225, sessions: 342 },
    { name: "Jun", newUsers: 110, activeUsers: 250, sessions: 389 },
  ];
  
  const therapistData = [
    { name: "Jan", newTherapists: 8, activeSessions: 104, completionRate: 92 },
    { name: "Feb", newTherapists: 12, activeSessions: 120, completionRate: 94 },
    { name: "Mar", newTherapists: 10, activeSessions: 138, completionRate: 91 },
    { name: "Apr", newTherapists: 14, activeSessions: 151, completionRate: 93 },
    { name: "May", newTherapists: 16, activeSessions: 165, completionRate: 95 },
    { name: "Jun", newTherapists: 19, activeSessions: 194, completionRate: 96 },
  ];
  
  const revenueData = [
    { name: "Jan", revenue: 5200, subscriptions: 115, oneTimePurchases: 42 },
    { name: "Feb", revenue: 6100, subscriptions: 132, oneTimePurchases: 51 },
    { name: "Mar", revenue: 7400, subscriptions: 154, oneTimePurchases: 65 },
    { name: "Apr", revenue: 8200, subscriptions: 172, oneTimePurchases: 73 },
    { name: "May", revenue: 9100, subscriptions: 195, oneTimePurchases: 82 },
    { name: "Jun", revenue: 10500, subscriptions: 225, oneTimePurchases: 95 },
  ];
  
  const pieData = [
    { name: "Depression", value: 35 },
    { name: "Anxiety", value: 45 },
    { name: "PTSD", value: 15 },
    { name: "Other", value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const deviceData = [
    { name: "Desktop", value: 55 },
    { name: "Mobile", value: 40 },
    { name: "Tablet", value: 5 },
  ];
  
  const DEVICE_COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
  
  const summaryStats = [
    { title: "Total Users", value: "1,256", change: "+12.5%", icon: Users, color: "bg-blue-50 text-blue-700" },
    { title: "Active Therapists", value: "78", change: "+8.3%", icon: Activity, color: "bg-green-50 text-green-700" },
    { title: "Sessions This Month", value: "842", change: "+15.2%", icon: Calendar, color: "bg-purple-50 text-purple-700" },
    { title: "Monthly Revenue", value: "$42,580", change: "+18.7%", icon: TrendingUp, color: "bg-yellow-50 text-yellow-700" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive platform performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-medium text-green-600">
                  {stat.change}
                </div>
              </div>
              <div className="mt-3">
                <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="therapists">Therapist Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>User Growth & Activity</CardTitle>
                <CardDescription>New registrations and active user trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="newUsers" stroke="#8884d8" name="New Users" />
                    <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" name="Active Users" />
                    <Line type="monotone" dataKey="sessions" stroke="#ffc658" name="Sessions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Concern</CardTitle>
                <CardDescription>Primary mental health concerns</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>User platform usage by device type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="therapists">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Therapist Growth & Performance</CardTitle>
                <CardDescription>New therapists and session metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={therapistData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="newTherapists" fill="#8884d8" name="New Therapists" />
                    <Bar yAxisId="left" dataKey="activeSessions" fill="#82ca9d" name="Active Sessions" />
                    <Bar yAxisId="right" dataKey="completionRate" fill="#ffc658" name="Completion Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Specializations</CardTitle>
                  <CardDescription>Most common therapist expertise</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Cognitive Behavioral Therapy</p>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Trauma-Focused Therapy</p>
                      <span className="font-medium">24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "24%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Family Therapy</p>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Mindfulness-Based</p>
                      <span className="font-medium">14%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "14%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Other</p>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Therapist Availability</CardTitle>
                  <CardDescription>Session slots by time of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Morning (6AM - 12PM)</p>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Afternoon (12PM - 5PM)</p>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Evening (5PM - 9PM)</p>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Night (9PM - 6AM)</p>
                      <span className="font-medium">7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "7%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Session Completion</CardTitle>
                  <CardDescription>Session outcomes analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Completed</p>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Rescheduled</p>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Canceled</p>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue and subscription data</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                    <Bar dataKey="subscriptions" fill="#82ca9d" name="Subscriptions" />
                    <Bar dataKey="oneTimePurchases" fill="#ffc658" name="One-time Purchases" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>By subscription type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Monthly Plan</p>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Annual Plan</p>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Per Session</p>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p>Group Sessions</p>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Lifetime Value</CardTitle>
                  <CardDescription>Average revenue per user</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gray-900">$485</h3>
                    <p className="text-sm text-green-600 mt-2">↑ 12.5% from last period</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="text-sm text-gray-500">Acquisition Cost</p>
                        <p className="text-xl font-medium">$65</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Retention Rate</p>
                        <p className="text-xl font-medium">78%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg. Subscription</p>
                        <p className="text-xl font-medium">7.2 mo</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Churn Rate</p>
                        <p className="text-xl font-medium">8.5%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Forecasted Growth</CardTitle>
                  <CardDescription>6-month revenue projection</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gray-900">+24%</h3>
                    <p className="text-sm text-blue-600 mt-2">Based on current trends</p>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-1">Progress to Quarterly Goal</p>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full text-xs text-white flex items-center justify-center" style={{ width: "68%" }}>68%</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">$128,500 / $190,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
