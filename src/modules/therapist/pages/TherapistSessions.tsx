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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  CalendarDays,
  Table,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { TherapistLayout } from "../componets/layout/LayoutTherapist";

type SessionType = "Individual" | "Group" | "Consultation";

interface Session {
  id: number;
  patient: string;
  date: string;
  time: string;
  type: SessionType;
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
  duration: number;
}

interface TherapistSessionsProps {
  userRole: "therapist";
}

export const TherapistSessions = ({ userRole }: TherapistSessionsProps) => {
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      patient: "John Doe",
      date: "2024-12-15",
      time: "10:00 AM",
      type: "Individual",
      status: "Scheduled",
      notes: "Regular therapy session",
      duration: 60,
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2024-12-16",
      time: "02:00 PM",
      type: "Group",
      status: "Completed",
      notes: "Group mindfulness session",
      duration: 90,
    },
    {
      id: 3,
      patient: "Alice Johnson",
      date: "2024-12-17",
      time: "11:30 AM",
      type: "Consultation",
      status: "Scheduled",
      notes: "Initial consultation",
      duration: 30,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [formData, setFormData] = useState({
    patient: "",
    date: "",
    time: "",
    type: "Individual" as SessionType,
    notes: "",
    duration: 60,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSession) {
      setSessions(
        sessions.map((session) =>
          session.id === editingSession.id
            ? { ...session, ...formData, status: "Scheduled" as const }
            : session
        )
      );
      toast.success("Session updated successfully");
    } else {
      const newSession: Session = {
        id: sessions.length + 1,
        ...formData,
        status: "Scheduled",
      };
      setSessions([...sessions, newSession]);
      toast.success("Session scheduled successfully");
    }

    setIsDialogOpen(false);
    setEditingSession(null);
    setFormData({
      patient: "",
      date: "",
      time: "",
      type: "Individual",
      notes: "",
      duration: 60,
    });
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setFormData({
      patient: session.patient,
      date: session.date,
      time: session.time,
      type: session.type,
      notes: session.notes || "",
      duration: session.duration,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id));
    toast.success("Session cancelled successfully");
  };

  const navigate = useNavigate();

  const joinSessionHandle = (id: number) => {
    navigate(`/therapist/sessions/${id}`);
  };

  return (
    <TherapistLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">My Sessions</h2>
            <p className="text-muted-foreground">
              Manage your therapy sessions
            </p>
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
                <Button
                  onClick={() => {
                    setEditingSession(null);
                    setFormData({
                      patient: "",
                      date: "",
                      time: "",
                      type: "Individual",
                      notes: "",
                      duration: 60,
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingSession ? "Edit Session" : "Schedule New Session"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingSession
                      ? "Update session details"
                      : "Create a new therapy session"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="patient">Patient</Label>
                    <Input
                      id="patient"
                      value={formData.patient}
                      onChange={(e) =>
                        setFormData({ ...formData, patient: e.target.value })
                      }
                      placeholder="Patient name"
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
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Session Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            type: value as SessionType,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Group">Group</SelectItem>
                          <SelectItem value="Consultation">
                            Consultation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration: parseInt(e.target.value),
                          })
                        }
                        min="15"
                        max="180"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Session Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Session notes or agenda"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSession ? "Update" : "Schedule"} Session
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
              <CardTitle>Sessions List</CardTitle>
              <CardDescription>All your therapy sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <TableComponent>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {session.patient}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {session.date} at {session.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {session.type === "Group" && (
                            <Users className="h-4 w-4 mr-1" />
                          )}
                          {session.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.duration} min
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            session.status === "Scheduled"
                              ? "default"
                              : session.status === "Completed"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {/* <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(session)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(session.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button> */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => joinSessionHandle(session.id)}
                            disabled={session.status === "Completed"}
                            className={`
      ${
        session.status === "Scheduled"
          ? "bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
          : session.status === "Completed"
          ? "text-gray-400 cursor-not-allowed"
          : "text-red-600 hover:text-red-700"
      }
    `}
                          >
                            Join
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
              <CardDescription>
                Your sessions in calendar format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <CalendarDays className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Calendar view will be implemented here
                  </p>
                  <p className="text-sm text-gray-400">
                    Showing {sessions.length} sessions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TherapistLayout>
  );
};
