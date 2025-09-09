
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const OrganizationDashboard = () => {
  const metrics = [
    { title: "Total Employees", value: "1,247", change: "+12", icon: Users, color: "text-blue-600" },
    { title: "Active Sessions", value: "89", change: "+23%", icon: Calendar, color: "text-green-600" },
    { title: "Engagement Rate", value: "78%", change: "+5%", icon: TrendingUp, color: "text-purple-600" },
    { title: "Pending Issues", value: "7", change: "-3", icon: AlertCircle, color: "text-orange-600" },
  ];

  const recentActivity = [
    { type: "session", message: "Marketing team completed group wellness session", time: "2 hours ago", status: "completed" },
    { type: "enrollment", message: "15 new employees enrolled in mental health program", time: "4 hours ago", status: "new" },
    { type: "issue", message: "IT department reported scheduling conflict", time: "6 hours ago", status: "pending" },
    { type: "session", message: "HR team scheduled stress management workshop", time: "1 day ago", status: "scheduled" },
  ];

  const upcomingSessions = [
    { title: "Stress Management Workshop", department: "Finance", date: "Today, 2:00 PM", attendees: 25 },
    { title: "Mindfulness Training", department: "Engineering", date: "Tomorrow, 10:00 AM", attendees: 18 },
    { title: "Leadership Wellness", department: "Management", date: "Friday, 3:00 PM", attendees: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
          <p className="text-gray-600">Welcome back, Acme Corporation</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Users className="w-4 h-4 mr-2" />
          Add Employees
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <Badge 
                    className={
                      activity.status === "completed" ? "bg-green-100 text-green-800" :
                      activity.status === "new" ? "bg-blue-100 text-blue-800" :
                      activity.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Scheduled wellness activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.department} • {session.attendees} attendees</p>
                    <p className="text-xs text-gray-500">{session.date}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Wellness Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Monthly Sessions</span>
                  <span>89/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Employee Participation</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Session Duration</span>
                <span className="text-sm font-medium">45 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Satisfaction Rate</span>
                <span className="text-sm font-medium">4.8/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-medium">156 sessions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" size="sm" variant="outline">
                Schedule Group Session
              </Button>
              <Button className="w-full" size="sm" variant="outline">
                Add New Department
              </Button>
              <Button className="w-full" size="sm" variant="outline">
                View Monthly Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
