import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calendar,
  FileText,
  MessageSquare,
  Phone,
  VideoIcon,
  UserPlus,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { TherapistLayout } from "../componets/layout/LayoutTherapist";

export const TherapistPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      issues: ["Anxiety", "Depression"],
      nextSession: "Today, 3:00 PM",
      lastSession: "May 16, 2025",
      status: "Active",
      progress: "Improving",
    },
    {
      id: 2,
      name: "Michael Brown",
      age: 42,
      issues: ["PTSD", "Insomnia"],
      nextSession: "Tomorrow, 10:30 AM",
      lastSession: "May 20, 2025",
      status: "Active",
      progress: "Stable",
    },
    {
      id: 3,
      name: "Emma Davis",
      age: 29,
      issues: ["Work Stress", "Relationship Issues"],
      nextSession: "May 25, 2025",
      lastSession: "May 18, 2025",
      status: "Active",
      progress: "Improving",
    },
    {
      id: 4,
      name: "Robert Wilson",
      age: 38,
      issues: ["Grief", "Anxiety"],
      nextSession: "Not Scheduled",
      lastSession: "May 10, 2025",
      status: "Inactive",
      progress: "On Hold",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    // Filter by search term
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by tab
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && patient.status === "Active";
    if (activeTab === "inactive")
      return matchesSearch && patient.status === "Inactive";

    return matchesSearch;
  });

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "Improving":
        return "bg-green-100 text-green-800";
      case "Stable":
        return "bg-blue-100 text-blue-800";
      case "Declining":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePatientAction = (action: string, id: number) => {
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      switch (action) {
        case "schedule":
          toast.info(`Schedule session with ${patient.name}`);
          break;
        case "message":
          toast.info(`Message ${patient.name}`);
          break;
        case "call":
          toast.info(`Call ${patient.name}`);
          break;
        case "notes":
          toast.info(`View notes for ${patient.name}`);
          break;
        default:
          break;
      }
    }
  };

  return (
    <TherapistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
            <p className="text-gray-600">Manage your patient relationships</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Patient Directory</CardTitle>
            <CardDescription>
              View and manage your assigned patients
            </CardDescription>

            <div className="mt-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">All Patients</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="font-medium text-blue-700">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-gray-600">
                            Age: {patient.age}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 md:mt-0 flex items-center gap-2 flex-wrap">
                        {patient.issues.map((issue, i) => (
                          <Badge key={i} variant="secondary">
                            {issue}
                          </Badge>
                        ))}
                        <Badge className={getProgressColor(patient.progress)}>
                          {patient.progress}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                        <span>Next Session: {patient.nextSession}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                        <span>Last Session: {patient.lastSession}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handlePatientAction("schedule", patient.id)
                        }
                      >
                        <Calendar className="w-4 h-4 mr-1" /> Schedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handlePatientAction("message", patient.id)
                        }
                      >
                        <MessageSquare className="w-4 h-4 mr-1" /> Message
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePatientAction("call", patient.id)}
                      >
                        <Phone className="w-4 h-4 mr-1" /> Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePatientAction("notes", patient.id)}
                      >
                        <FileText className="w-4 h-4 mr-1" /> View Notes
                      </Button>
                      <Button size="sm">
                        <VideoIcon className="w-4 h-4 mr-1" /> Start Session
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No patients found matching your search criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TherapistLayout>
  );
};
