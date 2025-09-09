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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { TherapistLayout } from "../componets/layout/LayoutTherapist";

export const TherapistAppointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(
    null
  );

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      time: "9:00 AM",
      duration: "45 minutes",
      type: "Video",
      status: "Upcoming",
      date: new Date().toISOString().split("T")[0],
      notes: "Follow-up on anxiety management techniques",
    },
    {
      id: 2,
      patientName: "Michael Brown",
      time: "10:30 AM",
      duration: "45 minutes",
      type: "Video",
      status: "Upcoming",
      date: new Date().toISOString().split("T")[0],
      notes: "Initial assessment - depression symptoms",
    },
    {
      id: 3,
      patientName: "Emma Davis",
      time: "1:00 PM",
      duration: "45 minutes",
      type: "Phone",
      status: "Upcoming",
      date: new Date().toISOString().split("T")[0],
      notes: "Weekly check-in",
    },
  ];

  const getTodaysAppointments = () => {
    if (!date) return [];
    const dateString = date.toISOString().split("T")[0];
    return appointments.filter((app) => app.date === dateString);
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "Phone":
        return <Phone className="h-4 w-4 text-green-500" />;
      default:
        return <Users className="h-4 w-4 text-purple-500" />;
    }
  };

  const handleJoinSession = (id: number) => {
    toast.success(`Joining session with patient #${id}`);
  };

  const handleReschedule = (id: number) => {
    toast.info(`Reschedule appointment #${id}`);
  };

  const todayAppointments = getTodaysAppointments();

  return (
    <TherapistLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your upcoming therapy sessions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Calendar
              </CardTitle>
              <CardDescription>
                Select a date to view appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex justify-center pb-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-3 pointer-events-auto"
              />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                + Add New Appointment
              </Button>
            </CardFooter>
          </Card>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  {date ? format(date, "MMMM d, yyyy") : "Today"} -{" "}
                  {todayAppointments.length} Appointments
                </CardTitle>
                <CardDescription>
                  {todayAppointments.length > 0
                    ? "Click on an appointment for more details"
                    : "No appointments scheduled for this day"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        selectedAppointment === appointment.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setSelectedAppointment(
                          appointment.id === selectedAppointment
                            ? null
                            : appointment.id
                        )
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="font-medium text-blue-700">
                              {appointment.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {appointment.patientName}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>
                                {appointment.time} ({appointment.duration})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {getAppointmentTypeIcon(appointment.type)}
                            {appointment.type}
                          </Badge>
                        </div>
                      </div>

                      {selectedAppointment === appointment.id && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-gray-600 mb-4">
                            {appointment.notes}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              className="flex-1"
                              onClick={() => handleJoinSession(appointment.id)}
                            >
                              Join Session
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleReschedule(appointment.id)}
                            >
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {todayAppointments.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      <p>No appointments scheduled for this day.</p>
                      <p className="mt-1 text-sm">
                        Use the calendar to select another date or add a new
                        appointment.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};
