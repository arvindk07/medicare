import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { AppLayout } from "@/components/layouts/app-layout/AppLayout";

export const AnalyticsDashboard = () => {
  const analytics = {
    overview: [
      { title: "Total Revenue", value: "$2.4M", change: "+15.3%", trend: "up" },
      { title: "Active Users", value: "45,673", change: "+8.2%", trend: "up" },
      {
        title: "Sessions This Month",
        value: "12,456",
        change: "+22.1%",
        trend: "up",
      },
      {
        title: "Customer Satisfaction",
        value: "94.5%",
        change: "+2.3%",
        trend: "up",
      },
    ],
    topPerformers: [
      {
        name: "TechCorp Inc",
        revenue: "$450K",
        sessions: 2340,
        growth: "+25%",
      },
      { name: "MegaCorpLtd", revenue: "$380K", sessions: 1890, growth: "+18%" },
      { name: "StartupXYZ", revenue: "$320K", sessions: 1560, growth: "+32%" },
    ],
    regionalData: [
      {
        region: "North America",
        revenue: "$1.2M",
        users: 18500,
        growth: "+12%",
      },
      { region: "Europe", revenue: "$890K", users: 14200, growth: "+18%" },
      {
        region: "Asia Pacific",
        revenue: "$310K",
        users: 12900,
        growth: "+25%",
      },
    ],
    therapistMetrics: [
      {
        name: "Dr. Sarah Wilson",
        sessions: 156,
        rating: 4.9,
        revenue: "$18.2K",
      },
      {
        name: "Dr. Michael Chen",
        sessions: 142,
        rating: 4.8,
        revenue: "$16.8K",
      },
      {
        name: "Dr. Emily Johnson",
        sessions: 138,
        rating: 4.7,
        revenue: "$15.9K",
      },
    ],
  };

  return (
    // <AppLayout>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <BarChart3 className="mr-2" />
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Comprehensive platform analytics and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analytics.overview.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <TrendingUp
                className={`h-5 w-5 ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
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
            <CardTitle>Top Performing Companies</CardTitle>
            <CardDescription>
              Highest revenue generating clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topPerformers.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {company.sessions} sessions this month
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {company.revenue}
                    </p>
                    <Badge variant="outline" className="text-green-600">
                      {company.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
            <CardDescription>
              Revenue and user metrics by region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.regionalData.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {region.region}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {region.users} active users
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {region.revenue}
                    </p>
                    <Badge variant="outline" className="text-green-600">
                      {region.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Therapists</CardTitle>
            <CardDescription>
              Highest performing therapists this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.therapistMetrics.map((therapist, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {therapist.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {therapist.sessions} sessions • ⭐ {therapist.rating}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {therapist.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Health Metrics</CardTitle>
            <CardDescription>System performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  System Uptime
                </span>
                <span className="text-sm font-bold text-green-600">99.9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "99.9%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  API Response Time
                </span>
                <span className="text-sm font-bold text-blue-600">145ms</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "88%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  User Satisfaction
                </span>
                <span className="text-sm font-bold text-purple-600">94.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "94.5%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Insights</CardTitle>
          <CardDescription>Deep analytics and trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                User Engagement
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-1">87.3%</div>
              <p className="text-sm text-blue-700">
                Average session engagement rate
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Treatment Success
              </h3>
              <div className="text-3xl font-bold text-green-600 mb-1">
                92.1%
              </div>
              <p className="text-sm text-green-700">
                Patient satisfaction rate
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Revenue Growth
              </h3>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                +245%
              </div>
              <p className="text-sm text-purple-700">Year-over-year growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    // </AppLayout>
  );
};
