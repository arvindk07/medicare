import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Plus, Edit, Trash2, CalendarDays, Table } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";

type AppointmentType = "Consultation" | "Individual Therapy" | "Group Session";
type SessionMode = "In-Person" | "Video Call" | "Phone Call";

interface Appointment {
  id: number;
  therapist: string;
  date: string;
  time: string;
  type: AppointmentType;
  mode: SessionMode;
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
}

interface PatientAppointmentsProps {
  userRole: "patient";
}

export const PatientAppointments = ({ userRole }: PatientAppointmentsProps) => {
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      therapist: "Dr. Sarah Wilson",
      date: "2024-12-15",
      time: "10:00 AM",
      type: "Individual Therapy",
      mode: "Video Call",
      status: "Scheduled",
      notes: "Weekly therapy session"
    },
    {
      id: 2,
      therapist: "Dr. John Smith",
      date: "2024-12-20",
      time: "02:00 PM",
      type: "Consultation",
      mode: "In-Person",
      status: "Completed",
      notes: "Initial consultation"
    },
    {
      id: 3,
      therapist: "Dr. Emily Johnson",
      date: "2024-12-22",
      time: "04:00 PM",
      type: "Group Session",
      mode: "Video Call",
      status: "Scheduled",
      notes: "Anxiety management group"
    },
    {
      id: 4,
      therapist: "Dr. Michael Brown",
      date: "2024-12-28",
      time: "11:00 AM",
      type: "Individual Therapy",
      mode: "Phone Call",
      status: "Cancelled",
      notes: "Rescheduled due to illness"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    therapist: "",
    date: "",
    time: "",
    type: "Consultation" as AppointmentType,
    mode: "Video Call" as SessionMode,
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAppointment) {
      setAppointments(appointments.map(app => 
        app.id === editingAppointment.id 
          ? { ...app, ...formData, status: "Scheduled" as const }
          : app
      ));
      toast.success("Appointment updated successfully");
    } else {
      const newAppointment: Appointment = {
        id: appointments.length + 1,
        ...formData,
        status: "Scheduled"
      };
      setAppointments([...appointments, newAppointment]);
      toast.success("Appointment booked successfully");
    }
    
    setIsDialogOpen(false);
    setEditingAppointment(null);
    setFormData({
      therapist: "",
      date: "",
      time: "",
      type: "Consultation",
      mode: "Video Call",
      notes: ""
    });
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      therapist: appointment.therapist,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      mode: appointment.mode,
      notes: appointment.notes || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setAppointments(appointments.filter(app => app.id !== id));
    toast.success("Appointment cancelled successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Appointments</h2>
          <p className="text-muted-foreground">Manage your therapy sessions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <Table className="h-4 w-4 mr-2" />
            Table
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingAppointment(null);
                setFormData({
                  therapist: "",
                  date: "",
                  time: "",
                  type: "Consultation",
                  mode: "Video Call",
                  notes: ""
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingAppointment ? "Edit Appointment" : "Book New Appointment"}</DialogTitle>
                <DialogDescription>
                  {editingAppointment ? "Update your appointment details" : "Schedule a new therapy session"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="therapist">Therapist</Label>
                  <Input
                    id="therapist"
                    value={formData.therapist}
                    onChange={(e) => setFormData({...formData, therapist: e.target.value})}
                    placeholder="Select or enter therapist name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Session Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as AppointmentType})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Individual Therapy">Individual Therapy</SelectItem>
                        <SelectItem value="Group Session">Group Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mode">Session Mode</Label>
                    <Select value={formData.mode} onValueChange={(value) => setFormData({...formData, mode: value as SessionMode})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In-Person">In-Person</SelectItem>
                        <SelectItem value="Video Call">Video Call</SelectItem>
                        <SelectItem value="Phone Call">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Additional notes or requirements"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingAppointment ? "Update" : "Book"} Appointment
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === "table" ? (
        <Card>
          <CardHeader>
            <CardTitle>Appointments List</CardTitle>
            <CardDescription>All your scheduled therapy sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <TableComponent>
              <TableHeader>
                <TableRow>
                  <TableHead>Therapist</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.therapist}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {appointment.date} at {appointment.time}
                      </div>
                    </TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {appointment.mode === "Video Call" && <MapPin className="h-4 w-4 mr-1" />}
                        {appointment.mode}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        appointment.status === "Scheduled" ? "default" :
                        appointment.status === "Completed" ? "secondary" : "destructive"
                      }>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(appointment)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(appointment.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableComponent>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Your appointments in calendar format</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <CalendarDays className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Calendar view will be implemented here</p>
                <p className="text-sm text-gray-400">Showing {appointments.length} upcoming appointments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
