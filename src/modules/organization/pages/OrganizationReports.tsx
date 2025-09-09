import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  TrendingUp,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { OrganizationLayout } from "../components/layout/OrganizationLayout";

export const OrganizationReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const reportSummary = {
    totalSessions: 1567,
    participationRate: 78,
    averageSessionDuration: 45,
    satisfactionScore: 4.6,
    growthRate: 18,
  };

  const departmentStats = [
    {
      name: "Engineering",
      sessions: 456,
      participation: 82,
      satisfaction: 4.7,
      growth: "+23%",
    },
    {
      name: "Marketing",
      sessions: 298,
      participation: 75,
      satisfaction: 4.5,
      growth: "+15%",
    },
    {
      name: "Finance",
      sessions: 234,
      participation: 71,
      satisfaction: 4.6,
      growth: "+12%",
    },
    {
      name: "HR",
      sessions: 189,
      participation: 89,
      satisfaction: 4.8,
      growth: "+28%",
    },
    {
      name: "Sales",
      sessions: 234,
      participation: 68,
      satisfaction: 4.4,
      growth: "+8%",
    },
    {
      name: "Operations",
      sessions: 156,
      participation: 73,
      satisfaction: 4.5,
      growth: "+18%",
    },
  ];

  const weeklyTrends = [
    { week: "Week 1", sessions: 89, participants: 234 },
    { week: "Week 2", sessions: 102, participants: 267 },
    { week: "Week 3", sessions: 95, participants: 245 },
    { week: "Week 4", sessions: 118, participants: 298 },
  ];

  const topPrograms = [
    {
      name: "Stress Management",
      sessions: 234,
      participants: 456,
      rating: 4.8,
    },
    {
      name: "Mindfulness Training",
      sessions: 189,
      participants: 378,
      rating: 4.7,
    },
    {
      name: "Work-Life Balance",
      sessions: 167,
      participants: 324,
      rating: 4.6,
    },
    {
      name: "Leadership Wellness",
      sessions: 134,
      participants: 189,
      rating: 4.9,
    },
    { name: "Team Building", sessions: 98, participants: 156, rating: 4.5 },
  ];

  return (
    <OrganizationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics & Reports
            </h1>
            <p className="text-gray-600">
              Comprehensive insights into your organization's wellness program
            </p>
          </div>
          <div className="flex space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-l-4 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {reportSummary.totalSessions.toLocaleString()}
              </div>
              <p className="text-sm text-green-600 mt-1">
                +{reportSummary.growthRate}% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Participation Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {reportSummary.participationRate}%
              </div>
              <p className="text-sm text-green-600 mt-1">
                +5% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {reportSummary.averageSessionDuration}
              </div>
              <p className="text-sm text-gray-600 mt-1">minutes per session</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {reportSummary.satisfactionScore}
              </div>
              <p className="text-sm text-gray-600 mt-1">out of 5.0</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Growth Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                +{reportSummary.growthRate}%
              </div>
              <p className="text-sm text-green-600 mt-1">month over month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Department Performance
              </CardTitle>
              <CardDescription>Wellness metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {dept.name}
                      </h3>
                      <Badge className="bg-green-100 text-green-800">
                        {dept.growth}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Sessions</div>
                        <div className="font-semibold text-gray-900">
                          {dept.sessions}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Participation</div>
                        <div className="font-semibold text-gray-900">
                          {dept.participation}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Satisfaction</div>
                        <div className="font-semibold text-gray-900">
                          {dept.satisfaction}/5.0
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${dept.participation}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Weekly Trends
              </CardTitle>
              <CardDescription>
                Session and participation trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyTrends.map((week, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {week.week}
                      </div>
                      <div className="text-sm text-gray-600">
                        {week.participants} participants
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {week.sessions}
                      </div>
                      <div className="text-sm text-gray-500">sessions</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-blue-900">
                      Average Weekly Growth
                    </div>
                    <div className="text-sm text-blue-700">
                      Compared to previous month
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">+12%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Top Performing Programs
            </CardTitle>
            <CardDescription>
              Most popular and highest-rated wellness programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Program
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Sessions
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Participants
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Rating
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Engagement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPrograms.map((program, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {program.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {program.sessions}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {program.participants}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">
                            {program.rating}
                          </span>
                          <span className="text-gray-500 ml-1">/5.0</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${(program.rating / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">High</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    Peak Engagement
                  </p>
                  <p className="text-xs text-green-600">
                    Tuesday afternoons show highest participation
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    Top Department
                  </p>
                  <p className="text-xs text-blue-600">
                    HR leads with 89% participation rate
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-800">
                    Growth Opportunity
                  </p>
                  <p className="text-xs text-purple-600">
                    Sales team shows room for improvement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Program Investment
                  </span>
                  <span className="text-sm font-medium">$29,988</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Estimated Savings
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    $45,230
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">ROI</span>
                  <span className="text-lg font-bold text-green-600">151%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    Expand lunch sessions
                  </p>
                  <p className="text-gray-600 text-xs">
                    High demand during lunch hours
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Target Sales team</p>
                  <p className="text-gray-600 text-xs">
                    Focus on increasing participation
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    Add virtual options
                  </p>
                  <p className="text-gray-600 text-xs">
                    Remote workers need more access
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </OrganizationLayout>
  );
};
