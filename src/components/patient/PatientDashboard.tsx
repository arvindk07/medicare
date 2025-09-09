
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, MessageSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PatientDashboardProps {
  userRole: "patient";
}

export const PatientDashboard = ({ userRole }: PatientDashboardProps) => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Sarah</h1>
        <p className="text-gray-600">How are you feeling today?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Upcoming Session</CardTitle>
            <CardDescription>Your next therapy appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">Today, 3:00 PM</span>
            </div>
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              <span>45 minutes with Dr. Michael Chen</span>
            </div>
            <Button className="w-full">Join Video Session</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Mood Tracker</CardTitle>
            <CardDescription>How have you been feeling?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center">
              <BarChart3 className="h-20 w-20 text-blue-500" />
            </div>
            <Button variant="outline" className="w-full">Record Today's Mood</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full flex justify-start">
              <FileText className="mr-2 h-4 w-4" /> Write in Journal
            </Button>
            <Button variant="outline" className="w-full flex justify-start">
              <MessageSquare className="mr-2 h-4 w-4" /> Message Therapist
            </Button>
            <Button variant="outline" className="w-full flex justify-start">
              <Calendar className="mr-2 h-4 w-4" /> Book New Session
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Weekly meditation and journaling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500">Progress chart will appear here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
            <CardDescription>Based on your recent sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-3 bg-blue-50 rounded-md">
                <h3 className="font-medium">Understanding Anxiety</h3>
                <p className="text-sm text-gray-600">Article • 5 min read</p>
              </li>
              <li className="p-3 bg-blue-50 rounded-md">
                <h3 className="font-medium">Breathing Techniques</h3>
                <p className="text-sm text-gray-600">Audio • 10 min exercise</p>
              </li>
              <li className="p-3 bg-blue-50 rounded-md">
                <h3 className="font-medium">Mindfulness for Beginners</h3>
                <p className="text-sm text-gray-600">Video • 15 min session</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
