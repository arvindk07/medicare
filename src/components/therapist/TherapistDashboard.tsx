
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, CreditCard, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TherapistDashboardProps {
  userRole: "therapist";
}

export const TherapistDashboard = ({ userRole }: TherapistDashboardProps) => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Dr. Chen</h1>
        <p className="text-gray-600">You have 3 sessions scheduled today</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Next Session</CardTitle>
            <CardDescription>Coming up soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 mr-2 text-green-600" />
              <span className="font-medium">3:00 PM - 3:45 PM (Today)</span>
            </div>
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              <span>Sarah Johnson • Anxiety, Stress</span>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1">Join Session</Button>
              <Button variant="outline">View Notes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Client Insights</CardTitle>
            <CardDescription>Weekly check-ins completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center">
              <div className="text-center">
                <span className="text-5xl font-bold text-green-600">16/20</span>
                <p className="text-sm text-gray-600 mt-2">clients completed their check-ins</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">View Reports</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full flex justify-start">
              <Calendar className="mr-2 h-4 w-4" /> Update Availability
            </Button>
            <Button variant="outline" className="w-full flex justify-start">
              <MessageSquare className="mr-2 h-4 w-4" /> Unread Messages (3)
            </Button>
            <Button variant="outline" className="w-full flex justify-start">
              <CreditCard className="mr-2 h-4 w-4" /> View Earnings
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Wednesday, May 23rd</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-green-50 rounded-md">
                <div>
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">Video Session • 45 min</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">3:00 PM</p>
                  <p className="text-sm text-gray-600">Confirmed</p>
                </div>
              </div>
              <div className="flex justify-between p-3 bg-green-50 rounded-md">
                <div>
                  <h3 className="font-medium">Robert Davis</h3>
                  <p className="text-sm text-gray-600">Video Session • 45 min</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">4:00 PM</p>
                  <p className="text-sm text-gray-600">Confirmed</p>
                </div>
              </div>
              <div className="flex justify-between p-3 bg-green-50 rounded-md">
                <div>
                  <h3 className="font-medium">Emily Wang</h3>
                  <p className="text-sm text-gray-600">Video Session • 45 min</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">5:00 PM</p>
                  <p className="text-sm text-gray-600">Confirmed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Sessions and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-md text-center">
                <p className="text-xl font-bold text-blue-700">48</p>
                <p className="text-sm text-gray-600">Sessions</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md text-center">
                <p className="text-xl font-bold text-green-700">$3,840</p>
                <p className="text-sm text-gray-600">Earnings</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md text-center">
                <p className="text-xl font-bold text-purple-700">4.9</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-md text-center">
                <p className="text-xl font-bold text-orange-700">92%</p>
                <p className="text-sm text-gray-600">Retention</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">View Full Analytics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
