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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  BookOpen,
  Brain,
  Plus,
  Trash2,
  Save,
  Star,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { TherapistLayout } from "../componets/layout/LayoutTherapist";

export const TherapistProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data
  const profile = {
    name: "Dr. Michael Chen",
    title: "Clinical Psychologist",
    email: "michael.chen@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    specialties: [
      "Cognitive Behavioral Therapy",
      "Depression",
      "Anxiety",
      "Trauma",
      "Stress Management",
    ],
    education: [
      {
        degree: "Ph.D. in Clinical Psychology",
        institution: "Stanford University",
        year: "2015",
      },
      {
        degree: "M.A. in Psychology",
        institution: "University of California, Berkeley",
        year: "2011",
      },
      {
        degree: "B.S. in Psychology",
        institution: "UCLA",
        year: "2009",
      },
    ],
    certifications: [
      "Licensed Clinical Psychologist",
      "Certified CBT Practitioner",
      "Trauma-Focused CBT Certification",
    ],
    bio: "Dr. Michael Chen is a licensed clinical psychologist with over 10 years of experience helping individuals overcome challenges related to anxiety, depression, and trauma. He specializes in cognitive-behavioral therapy and integrates mindfulness-based approaches to create personalized treatment plans for his clients. Dr. Chen is committed to providing compassionate, evidence-based care in a safe and supportive environment.",
  };

  const stats = [
    { label: "Patients", value: "32" },
    { label: "Sessions", value: "450+" },
    { label: "Years Experience", value: "10" },
    { label: "Rating", value: "4.9" },
  ];

  const handleSaveProfile = () => {
    // In a real app, we would save this to an API
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const addSpecialty = () => {
    // In a real app, we would implement this functionality
    toast.info("Specialty added");
  };

  const removeSpecialty = (specialty: string) => {
    // In a real app, we would implement this functionality
    toast.info(`Removed ${specialty}`);
  };

  return (
    <TherapistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">
              Manage your professional information
            </p>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "" : "bg-blue-600 hover:bg-blue-700"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                        MC
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{profile.name}</CardTitle>
                      <CardDescription>{profile.title}</CardDescription>
                    </div>
                  </div>
                  {!isEditing && (
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      </div>
                      <span className="ml-2 font-medium">4.9/5.0</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <Input defaultValue={profile.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Title
                        </label>
                        <Input defaultValue={profile.title} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Location
                        </label>
                        <Input defaultValue={profile.location} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Availability
                        </label>
                        <Input defaultValue={profile.availability} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Professional Bio
                      </label>
                      <Textarea
                        defaultValue={profile.bio}
                        className="min-h-[150px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                          <Card key={index} className="bg-blue-50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-blue-700">
                                {stat.value}
                              </div>
                              <div className="text-sm text-gray-600">
                                {stat.label}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mt-0.5 mr-3 text-gray-500" />
                        <div>
                          <div className="font-medium">Email</div>
                          <div>{profile.email}</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mt-0.5 mr-3 text-gray-500" />
                        <div>
                          <div className="font-medium">Phone</div>
                          <div>{profile.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mt-0.5 mr-3 text-gray-500" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div>{profile.location}</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mt-0.5 mr-3 text-gray-500" />
                        <div>
                          <div className="font-medium">Availability</div>
                          <div>{profile.availability}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2">About Me</h3>
                      <p className="text-gray-700 whitespace-pre-line">
                        {profile.bio}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>

              {isEditing && (
                <CardFooter className="border-t pt-6 flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Specialties */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  Specialties
                </CardTitle>
                <CardDescription>Areas of expertise</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {specialty}
                      {isEditing && (
                        <button
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          onClick={() => removeSpecialty(specialty)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={addSpecialty}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Specialty
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Education
                </CardTitle>
                <CardDescription>Academic background</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div
                      key={index}
                      className={index !== 0 ? "pt-3 border-t" : ""}
                    >
                      <div className="font-medium">{edu.degree}</div>
                      <div className="text-sm text-gray-600">
                        {edu.institution}, {edu.year}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Certifications
                </CardTitle>
                <CardDescription>Professional credentials</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {profile.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};
