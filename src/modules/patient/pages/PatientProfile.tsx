import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Save, User, Calendar } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { PatientLayout } from "../components/Layout/PatientLayout";

export const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data
  const profile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 987-6543",
    address: "123 Main St, San Francisco, CA 94105",
    dateOfBirth: "1991-07-15",
    emergencyContact: "John Johnson (Husband) - (555) 123-4567",
    medicalHistory: "No major health conditions",
    currentMedications: "Lexapro 10mg daily",
    therapyGoals:
      "Manage anxiety, improve work-life balance, develop better coping mechanisms for stress",
    personalNotes:
      "I find journaling and meditation helpful. Struggle with public speaking and large social gatherings.",
  };

  const handleSaveProfile = () => {
    // In a real app, we would save this to an API
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">
              View and update your personal information
            </p>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "" : "bg-green-600 hover:bg-green-700"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{profile.name}</CardTitle>
                  <CardDescription>Patient</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <Input defaultValue={profile.name} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input defaultValue={profile.email} type="email" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <Input defaultValue={profile.phone} type="tel" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <Input defaultValue={profile.address} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date of Birth
                    </label>
                    <Input defaultValue={profile.dateOfBirth} type="date" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Emergency Contact
                    </label>
                    <Input defaultValue={profile.emergencyContact} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">{profile.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-600">{profile.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-gray-600">{profile.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Date of Birth</div>
                      <div className="text-gray-600">July 15, 1991</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Emergency Contact</div>
                      <div className="text-gray-600">
                        {profile.emergencyContact}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Medical & Therapy Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Treatment Information</CardTitle>
              <CardDescription>
                Your medical history and therapy preferences
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Medical History
                    </label>
                    <Textarea
                      defaultValue={profile.medicalHistory}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Medications
                    </label>
                    <Textarea
                      defaultValue={profile.currentMedications}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Therapy Goals
                    </label>
                    <Textarea
                      defaultValue={profile.therapyGoals}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Personal Notes
                    </label>
                    <Textarea
                      defaultValue={profile.personalNotes}
                      className="min-h-[100px]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Medical History
                    </h3>
                    <p className="text-gray-700">{profile.medicalHistory}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Current Medications
                    </h3>
                    <p className="text-gray-700">
                      {profile.currentMedications}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-2">Therapy Goals</h3>
                    <p className="text-gray-700">{profile.therapyGoals}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-2">Personal Notes</h3>
                    <p className="text-gray-700">{profile.personalNotes}</p>
                  </div>
                </>
              )}
            </CardContent>

            {isEditing && (
              <CardFooter className="border-t pt-6 flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Therapist</CardTitle>
            <CardDescription>Your current treatment provider</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                  MC
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">Dr. Michael Chen</h3>
                <p className="text-gray-600">Clinical Psychologist</p>
                <p className="text-sm text-gray-500">
                  Specializes in Cognitive Behavioral Therapy
                </p>
              </div>
            </div>

            <div className="md:ml-auto space-y-2">
              <Button variant="outline" className="w-full md:w-auto">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  );
};
