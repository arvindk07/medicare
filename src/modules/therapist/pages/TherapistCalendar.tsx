import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Edit,
  Trash2,
  Video,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { TherapistLayout } from "../componets/layout/LayoutTherapist";

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: "Video" | "Phone" | "In-Person";
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
}

export const TherapistCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  // Mock appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: "Sarah Johnson",
      date: "2025-05-30",
      time: "09:00",
      duration: 45,
      type: "Video",
      status: "Scheduled",
      notes: "Follow-up on anxiety management",
    },
    {
      id: 2,
      patientName: "Michael Brown",
      date: "2025-05-30",
      time: "10:30",
      duration: 45,
      type: "Video",
      status: "Scheduled",
      notes: "Initial assessment",
    },
    {
      id: 3,
      patientName: "Emma Davis",
      date: "2025-05-30",
      time: "14:00",
      duration: 45,
      type: "Phone",
      status: "Scheduled",
      notes: "Weekly check-in",
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      date: "2025-05-31",
      time: "11:00",
      duration: 60,
      type: "In-Person",
      status: "Scheduled",
      notes: "Therapy session",
    },
  ]);

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return appointments
      .filter((apt) => apt.date === dateStr)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const handleAddAppointment = () => {
    setEditingAppointment(null);
    setIsDialogOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    toast.success("Appointment deleted successfully");
  };

  const handleSaveAppointment = (formData: FormData) => {
    // This would integrate with an API in the future
    toast.success(
      editingAppointment ? "Appointment updated" : "Appointment created"
    );
    setIsDialogOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const todayAppointments = selectedDate
    ? getAppointmentsForDate(selectedDate)
    : [];

  return (
    <TherapistLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Calendar</h1>
            <p className="text-gray-600">
              Manage your schedule and appointments
            </p>
          </div>
          <Button
            onClick={handleAddAppointment}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border p-3 pointer-events-auto"
              />
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? format(selectedDate, "EEEE, MMMM d, yyyy")
                    : "Select a date"}
                </CardTitle>
                <CardDescription>
                  {todayAppointments.length} appointment
                  {todayAppointments.length !== 1 ? "s" : ""} scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(appointment.type)}
                          <span className="font-medium">
                            {appointment.time}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {appointment.patientName}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>{appointment.duration} minutes</span>
                            <Badge variant="outline">{appointment.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDeleteAppointment(appointment.id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {todayAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No appointments scheduled for this day</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? "Edit Appointment" : "New Appointment"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveAppointment(new FormData(e.currentTarget));
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input
                    id="patient"
                    defaultValue={editingAppointment?.patientName || ""}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      defaultValue={
                        editingAppointment?.date ||
                        (selectedDate ? format(selectedDate, "yyyy-MM-dd") : "")
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      defaultValue={editingAppointment?.time || ""}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select
                      defaultValue={
                        editingAppointment?.duration.toString() || "45"
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Session Type</Label>
                    <Select defaultValue={editingAppointment?.type || "Video"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Video">Video Call</SelectItem>
                        <SelectItem value="Phone">Phone Call</SelectItem>
                        <SelectItem value="In-Person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Appointment</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </TherapistLayout>
  );
};
