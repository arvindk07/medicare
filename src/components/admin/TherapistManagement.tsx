
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, Users, Star } from "lucide-react";

interface TherapistManagementProps {
  userRole: "admin" | "therapist" | "master";
}

export const TherapistManagement = ({ userRole }: TherapistManagementProps) => {
  const mockTherapists = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cognitive Behavioral Therapy",
      patients: 32,
      rating: 4.9,
      status: "Active",
      experience: "8 years",
      nextAvailable: "Today 2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Family Therapy",
      patients: 28,
      rating: 4.8,
      status: "Active",
      experience: "12 years",
      nextAvailable: "Tomorrow 10:00 AM"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Trauma Therapy",
      patients: 25,
      rating: 4.7,
      status: "Busy",
      experience: "6 years",
      nextAvailable: "Next Week"
    },
    {
      id: 4,
      name: "Dr. James Rodriguez",
      specialty: "Addiction Counseling",
      patients: 22,
      rating: 4.9,
      status: "Active",
      experience: "10 years",
      nextAvailable: "Today 4:30 PM"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Busy": return "bg-yellow-100 text-yellow-800";
      case "Offline": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Therapist Management</h1>
          <p className="text-gray-600">Manage therapist profiles and assignments</p>
        </div>
        {(userRole === "admin" || userRole === "master") && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Brain className="w-4 h-4 mr-2" />
            Add New Therapist
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTherapists.map((therapist) => (
          <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{therapist.name}</CardTitle>
                  <CardDescription className="mt-1">{therapist.specialty}</CardDescription>
                </div>
                <Badge className={getStatusColor(therapist.status)}>
                  {therapist.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {therapist.patients} patients
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {therapist.rating}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>Experience:</strong> {therapist.experience}</p>
                <p className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Next available: {therapist.nextAvailable}
                </p>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                {(userRole === "admin" || userRole === "master") && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Therapist Performance Overview</CardTitle>
          <CardDescription>Key metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Active Therapists</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">107</div>
              <div className="text-sm text-gray-600">Total Patients</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
