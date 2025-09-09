
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, TrendingUp, DollarSign, Activity, Users, Shield, FileText, BarChart3, Settings, Headphones } from "lucide-react";
import { UserManagement } from "@/components/admin/UserManagement";
import { TherapistManagement } from "@/components/admin/TherapistManagement";
import { ContentModeration } from "@/components/admin/ContentModeration";
import { SystemSettings } from "@/components/admin/SystemSettings";
import { Analytics } from "@/components/admin/Analytics";
import { SupportTickets } from "@/components/admin/SupportTickets";

interface MasterPanelProps {
  userRole: "admin" | "therapist" | "master" | "patient";
  currentView?: string;
}

export const MasterPanel = ({ userRole, currentView = "dashboard" }: MasterPanelProps) => {
  if (userRole !== "master") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Access Restricted</h2>
          <p className="text-gray-500">Master panel access required</p>
        </div>
      </div>
    );
  }

  // Render specific views based on currentView
  if (currentView === "users") {
    return <UserManagement userRole={userRole} />;
  }

  if (currentView === "therapists") {
    return <TherapistManagement userRole={userRole} />;
  }

  if (currentView === "content") {
    return <ContentModeration userRole={userRole} />;
  }

  if (currentView === "settings") {
    return <SystemSettings userRole={userRole} />;
  }

  if (currentView === "reports") {
    return <Analytics userRole={userRole} />;
  }

  if (currentView === "support") {
    return <SupportTickets userRole={userRole} />;
  }

  // Default dashboard view
  const globalMetrics = [
    { title: "Total Revenue", value: "$245,670", change: "+15.3%", icon: DollarSign, color: "text-green-600" },
    { title: "Active Users", value: "12,456", change: "+8.2%", icon: Users, color: "text-blue-600" },
    { title: "Sessions Completed", value: "89,234", change: "+22.1%", icon: Activity, color: "text-purple-600" },
    { title: "Platform Growth", value: "+18.5%", change: "This Month", icon: TrendingUp, color: "text-orange-600" },
  ];

  const regionalData = [
    { region: "North America", revenue: "$125,430", users: 5678, growth: "+12%" },
    { region: "Europe", revenue: "$89,240", users: 4321, growth: "+18%" },
    { region: "Asia Pacific", revenue: "$31,000", users: 2457, growth: "+25%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Crown className="w-8 h-8 mr-3 text-purple-600" />
            Master Control Panel
          </h1>
          <p className="text-gray-600">Comprehensive system overview and analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow border-l-4 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
            <CardDescription>Revenue and user metrics by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{region.region}</h3>
                    <p className="text-sm text-gray-600">{region.users} active users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{region.revenue}</p>
                    <p className="text-sm text-green-600">{region.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health & Performance</CardTitle>
            <CardDescription>Real-time system monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Server Uptime</span>
                <span className="text-sm font-bold text-green-600">99.9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Database Performance</span>
                <span className="text-sm font-bold text-blue-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">API Response Time</span>
                <span className="text-sm font-bold text-purple-600">120ms</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
          <CardDescription>Deep insights and trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">User Engagement</h3>
              <div className="text-3xl font-bold text-blue-600 mb-1">87.3%</div>
              <p className="text-sm text-blue-700">Average session time: 45 min</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Treatment Success</h3>
              <div className="text-3xl font-bold text-green-600 mb-1">92.1%</div>
              <p className="text-sm text-green-700">Patient satisfaction rate</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Platform ROI</h3>
              <div className="text-3xl font-bold text-purple-600 mb-1">245%</div>
              <p className="text-sm text-purple-700">Year-over-year growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
