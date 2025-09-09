
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, BarChart3, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MasterDashboardProps {
  userRole: "master";
}

export const MasterDashboard = ({ userRole }: MasterDashboardProps) => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">ABC Corporation</h1>
        <p className="text-gray-600">Enterprise Mental Health Platform</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Users</CardTitle>
            <CardDescription>Active employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <span className="text-4xl font-bold text-purple-600">512</span>
              <p className="text-sm text-gray-600 mt-2">Total registered</p>
              <p className="text-xs text-green-600 font-medium">+32 this month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Sessions</CardTitle>
            <CardDescription>Individual & group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <span className="text-4xl font-bold text-blue-600">127</span>
              <p className="text-sm text-gray-600 mt-2">This month</p>
              <p className="text-xs text-green-600 font-medium">89% attendance rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Engagement</CardTitle>
            <CardDescription>App usage metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <span className="text-4xl font-bold text-green-600">76%</span>
              <p className="text-sm text-gray-600 mt-2">Weekly active users</p>
              <p className="text-xs text-green-600 font-medium">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Budget</CardTitle>
            <CardDescription>Monthly utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <span className="text-4xl font-bold text-orange-600">$8,640</span>
              <p className="text-sm text-gray-600 mt-2">of $10,000 monthly</p>
              <p className="text-xs text-blue-600 font-medium">86% of allocation used</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Upcoming Group Sessions</span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-blue-50 rounded-md">
                <div>
                  <h3 className="font-medium">Stress Management Workshop</h3>
                  <p className="text-sm text-gray-600">Thursday, 2:00 PM • 25 participants</p>
                </div>
                <Button size="sm">Details</Button>
              </div>
              <div className="flex justify-between p-3 bg-blue-50 rounded-md">
                <div>
                  <h3 className="font-medium">Mindfulness for Leaders</h3>
                  <p className="text-sm text-gray-600">Friday, 10:00 AM • 15 participants</p>
                </div>
                <Button size="sm">Details</Button>
              </div>
              <div className="flex justify-between p-3 bg-blue-50 rounded-md">
                <div>
                  <h3 className="font-medium">Wellness Wednesday</h3>
                  <p className="text-sm text-gray-600">Next Wed, 12:00 PM • 40 participants</p>
                </div>
                <Button size="sm">Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Department Usage</span>
              <Button variant="outline" size="sm">Full Report</Button>
            </CardTitle>
            <CardDescription>Sessions by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-32 w-32 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">Department usage chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-auto py-4 flex flex-col items-center justify-center">
                <Users className="mb-2 h-6 w-6" />
                <span>Add Users</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <Calendar className="mb-2 h-6 w-6" />
                <span>Schedule Workshop</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <FileText className="mb-2 h-6 w-6" />
                <span>Monthly Report</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <CreditCard className="mb-2 h-6 w-6" />
                <span>Billing Portal</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
