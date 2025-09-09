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
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";
import { OrganizationLayout } from "../components/layout/OrganizationLayout";

interface Session {
  id: number;
  title: string;
  type: string;
  department: string;
  facilitator: string;
  date: string;
  time: string;
  attendees: number;
  capacity: number;
  status: string;
  location: string;
}

export const OrganizationSessions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      title: "Stress Management Workshop",
      type: "Group Session",
      department: "Finance",
      facilitator: "Dr. Sarah Wilson",
      date: "2024-01-20",
      time: "2:00 PM - 3:30 PM",
      attendees: 25,
      capacity: 30,
      status: "Scheduled",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "One-on-One Counseling",
      type: "Individual Session",
      department: "Engineering",
      facilitator: "Dr. Michael Chen",
      date: "2024-01-21",
      time: "10:00 AM - 11:00 AM",
      attendees: 1,
      capacity: 1,
      status: "Confirmed",
      location: "Virtual",
    },
    {
      id: 3,
      title: "Mindfulness for Leaders",
      type: "Workshop",
      department: "Management",
      facilitator: "Dr. Emily Davis",
      date: "2024-01-22",
      time: "3:00 PM - 4:00 PM",
      attendees: 12,
      capacity: 15,
      status: "Scheduled",
      location: "Executive Boardroom",
    },
  ]);

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.facilitator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      session.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Group Session":
        return "bg-purple-100 text-purple-800";
      case "Individual Session":
        return "bg-green-100 text-green-800";
      case "Workshop":
        return "bg-orange-100 text-orange-800";
      case "Support Group":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddSession = (sessionData: any) => {
    const newSession: Session = {
      id: Math.max(...sessions.map((s) => s.id)) + 1,
      ...sessionData,
      status: "Scheduled",
    };
    setSessions([...sessions, newSession]);
    setIsDialogOpen(false);
    toast.success("Session scheduled successfully");
  };

  const SessionForm = ({
    session,
    onSubmit,
  }: {
    session?: Session;
    onSubmit: (data: any) => void;
  }) => {
    const [formData, setFormData] = useState({
      title: session?.title || "",
      type: session?.type || "Group Session",
      department: session?.department || "",
      facilitator: session?.facilitator || "",
      date: session?.date || "",
      time: session?.time || "",
      capacity: session?.capacity || 20,
      location: session?.location || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ ...formData, attendees: 0 });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Session Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Group Session">Group Session</SelectItem>
                <SelectItem value="Individual Session">
                  Individual Session
                </SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Support Group">Support Group</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="facilitator">Facilitator</Label>
            <Input
              id="facilitator"
              value={formData.facilitator}
              onChange={(e) =>
                setFormData({ ...formData, facilitator: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
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
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              placeholder="e.g., 2:00 PM - 3:30 PM"
              required
            />
          </div>
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: parseInt(e.target.value) })
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Conference Room, Virtual, etc."
            required
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {session ? "Update Session" : "Schedule Session"}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <OrganizationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Session Management
            </h1>
            <p className="text-gray-600">
              Schedule and manage wellness sessions for your organization
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() =>
                setViewMode(viewMode === "table" ? "calendar" : "table")
              }
            >
              {viewMode === "table" ? (
                <CalendarDays className="w-4 h-4 mr-2" />
              ) : (
                <Eye className="w-4 h-4 mr-2" />
              )}
              {viewMode === "table" ? "Calendar View" : "Table View"}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule New Session</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new wellness session.
                  </DialogDescription>
                </DialogHeader>
                <SessionForm onSubmit={handleAddSession} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">32</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-gray-600">Total Attendees</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Attendance Rate</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {viewMode === "table" ? "Session Schedule" : "Calendar View"}
            </CardTitle>
            <CardDescription>
              {viewMode === "table"
                ? "View and manage all wellness sessions"
                : "Calendar view of sessions"}
            </CardDescription>
            {viewMode === "table" && (
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {viewMode === "table" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Facilitator</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {session.title}
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(session.type)}>
                          {session.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{session.department}</TableCell>
                      <TableCell>{session.facilitator}</TableCell>
                      <TableCell>
                        <div>
                          <div>{session.date}</div>
                          <div className="text-sm text-gray-500">
                            {session.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {session.attendees}/{session.capacity}
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div
                              className="bg-purple-600 h-1 rounded-full"
                              style={{
                                width: `${
                                  (session.attendees / session.capacity) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-4">
                    Sessions for {selectedDate?.toLocaleDateString()}
                  </h3>
                  <div className="space-y-2">
                    {sessions
                      .filter(
                        (session) =>
                          session.date ===
                          selectedDate?.toISOString().split("T")[0]
                      )
                      .map((session) => (
                        <div key={session.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{session.title}</h4>
                              <p className="text-sm text-gray-600">
                                {session.facilitator}
                              </p>
                              <p className="text-sm text-gray-500">
                                {session.time}
                              </p>
                            </div>
                            <Badge className={getStatusColor(session.status)}>
                              {session.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    {sessions.filter(
                      (session) =>
                        session.date ===
                        selectedDate?.toISOString().split("T")[0]
                    ).length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No sessions scheduled for this date
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </OrganizationLayout>
  );
};
