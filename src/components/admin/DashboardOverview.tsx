
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, Activity, TrendingUp } from "lucide-react";

interface DashboardOverviewProps {
  userRole: "admin" | "therapist" | "master";
}

export const DashboardOverview = ({ userRole }: DashboardOverviewProps) => {
  const getStats = () => {
    switch (userRole) {
      case "admin":
        return [
          { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
          { title: "Active Therapists", value: "56", icon: Brain, change: "+3%" },
          { title: "Sessions Today", value: "89", icon: Activity, change: "+8%" },
          { title: "System Health", value: "98%", icon: TrendingUp, change: "+1%" },
        ];
      case "therapist":
        return [
          { title: "My Patients", value: "32", icon: Users, change: "+2%" },
          { title: "Sessions This Week", value: "18", icon: Activity, change: "+5%" },
          { title: "Upcoming Appointments", value: "7", icon: Brain, change: "0%" },
          { title: "Completion Rate", value: "94%", icon: TrendingUp, change: "+3%" },
        ];
      case "master":
        return [
          { title: "Total Revenue", value: "$45,670", icon: TrendingUp, change: "+15%" },
          { title: "Platform Usage", value: "87%", icon: Activity, change: "+7%" },
          { title: "Global Sessions", value: "2,456", icon: Brain, change: "+22%" },
          { title: "User Satisfaction", value: "4.8/5", icon: Users, change: "+0.2" },
        ];
    }
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 capitalize">{userRole} Dashboard</h1>
        <p className="text-gray-600">Welcome to your mental health administration panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "New user registration: Sarah Johnson",
                "Session completed: Dr. Smith with Patient #234",
                "System maintenance scheduled for tonight",
                "Weekly report generated successfully",
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {userRole === "admin" && (
                <>
                  <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                    Add New User
                  </button>
                  <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-700 transition-colors">
                    Generate Report
                  </button>
                  <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm font-medium text-purple-700 transition-colors">
                    System Settings
                  </button>
                  <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm font-medium text-orange-700 transition-colors">
                    View Analytics
                  </button>
                </>
              )}
              {userRole === "therapist" && (
                <>
                  <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                    Schedule Session
                  </button>
                  <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-700 transition-colors">
                    Patient Notes
                  </button>
                  <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm font-medium text-purple-700 transition-colors">
                    Treatment Plans
                  </button>
                  <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm font-medium text-orange-700 transition-colors">
                    Progress Reports
                  </button>
                </>
              )}
              {userRole === "master" && (
                <>
                  <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                    Global Analytics
                  </button>
                  <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-700 transition-colors">
                    Revenue Report
                  </button>
                  <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm font-medium text-purple-700 transition-colors">
                    System Overview
                  </button>
                  <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm font-medium text-orange-700 transition-colors">
                    Performance Metrics
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
