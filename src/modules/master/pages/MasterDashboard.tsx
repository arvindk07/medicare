import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, CreditCard, BarChart3, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterDashboardCard } from "../components/cards/master-dashboard-card/MasterDashboardCard";

const masterListCardData = [
  {
    title: "Users",
    status: "Active employees",
    total: "512",
    rate: "+32 this month",
    sub_title: "Total registered",
    card_type: "default",
  },
  {
    title: "Sessions",
    status: "Individual & group",
    total: "127",
    rate: "89% attendance rate",
    sub_title: "This month",
    card_type: "primary",
  },
  {
    title: "Engagement",
    status: "App usage metrics",
    total: "76%",
    sub_title: "Weekly active users",
    rate: "+12% from last month",
    card_type: "success",
  },
  {
    title: "Company",
    status: "Monthly utilization",
    sub_title: "of $10,000 monthly",
    total: "$8,640",
    rate: "86% of allocation used",
    card_type: "warning",
  },
];

export const MasterDashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {masterListCardData.map((item, i) => (
          <MasterDashboardCard key={i} item={item} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Upcoming Group Sessions</span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-blue-50 rounded-md">
                <div>
                  <h3 className="font-medium">Stress Management Workshop</h3>
                  <p className="text-sm text-gray-600">
                    Thursday, 2:00 PM • 25 participants
                  </p>
                </div>
                <Button size="sm">Details</Button>
              </div>
              <div className="flex justify-between p-3 bg-blue-50 rounded-md">
                <div>
                  <h3 className="font-medium">Mindfulness for Leaders</h3>
                  <p className="text-sm text-gray-600">
                    Friday, 10:00 AM • 15 participants
                  </p>
                </div>
                <Button size="sm">Details</Button>
              </div>
              <div className="flex justify-between p-3 bg-blue-50 rounded-md">
                <div>
                  <h3 className="font-medium">Wellness Wednesday</h3>
                  <p className="text-sm text-gray-600">
                    Next Wed, 12:00 PM • 40 participants
                  </p>
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
              <Button variant="outline" size="sm">
                Full Report
              </Button>
            </CardTitle>
            <CardDescription>Sessions by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-32 w-32 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">
                  Department usage chart will appear here
                </p>
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
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
              >
                <Calendar className="mb-2 h-6 w-6" />
                <span>Schedule Workshop</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
              >
                <FileText className="mb-2 h-6 w-6" />
                <span>Monthly Report</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
              >
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
