
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  Download, 
  Shield, 
  User, 
  Calendar as CalendarIcon,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import type { DateRange } from "react-day-picker";

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failure" | "warning";
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

interface AuditLogsProps {
  userRole: "master" | "therapist" | "patient" | "organization";
}

export const AuditLogs = ({ userRole }: AuditLogsProps) => {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2025-01-10T10:30:00Z",
      userId: "user_123",
      userName: "John Smith",
      userRole: "therapist",
      action: "login",
      resource: "authentication",
      details: "User logged in successfully",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success"
    },
    {
      id: "2",
      timestamp: "2025-01-10T10:25:00Z",
      userId: "user_456",
      userName: "Sarah Johnson",
      userRole: "patient",
      action: "update",
      resource: "profile",
      resourceId: "profile_456",
      details: "Updated profile information",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
      status: "success",
      changes: [
        { field: "phone", oldValue: "123-456-7890", newValue: "098-765-4321" },
        { field: "address", oldValue: "123 Old St", newValue: "456 New Ave" }
      ]
    },
    {
      id: "3",
      timestamp: "2025-01-10T10:20:00Z",
      userId: "user_789",
      userName: "Mike Wilson",
      userRole: "master",
      action: "create",
      resource: "user",
      resourceId: "user_890",
      details: "Created new therapist account",
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      status: "success"
    },
    {
      id: "4",
      timestamp: "2025-01-10T10:15:00Z",
      userId: "user_111",
      userName: "Jane Doe",
      userRole: "organization",
      action: "login",
      resource: "authentication",
      details: "Failed login attempt - invalid password",
      ipAddress: "192.168.1.103",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "failure"
    },
    {
      id: "5",
      timestamp: "2025-01-10T10:10:00Z",
      userId: "user_222",
      userName: "Dr. Smith",
      userRole: "therapist",
      action: "delete",
      resource: "session_note",
      resourceId: "note_123",
      details: "Deleted session note",
      ipAddress: "192.168.1.104",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "warning"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedUserRole, setSelectedUserRole] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Filter logs based on user role permissions
  const getFilteredLogs = () => {
    let filteredLogs = logs;

    // Apply role-based filtering
    switch (userRole) {
      case "master":
        // Master can see all logs
        break;
      case "organization":
        // Organization can see logs for their users only
        filteredLogs = logs.filter(log => 
          log.userRole === "therapist" || log.userRole === "patient" || log.userId === "current_org_user"
        );
        break;
      case "therapist":
        // Therapists can only see their own logs and patient interactions
        filteredLogs = logs.filter(log => 
          log.userId === "current_therapist_user" || 
          (log.userRole === "patient" && log.resource.includes("session"))
        );
        break;
      case "patient":
        // Patients can only see their own logs
        filteredLogs = logs.filter(log => log.userId === "current_patient_user");
        break;
    }

    // Apply search and filters
    return filteredLogs.filter(log => {
      const matchesSearch = searchTerm === "" || 
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction = selectedAction === "" || log.action === selectedAction;
      const matchesStatus = selectedStatus === "" || log.status === selectedStatus;
      const matchesUserRole = selectedUserRole === "" || log.userRole === selectedUserRole;

      const matchesDateRange = !dateRange?.from || !dateRange?.to || 
        (new Date(log.timestamp) >= dateRange.from && new Date(log.timestamp) <= dateRange.to);

      return matchesSearch && matchesAction && matchesStatus && matchesUserRole && matchesDateRange;
    });
  };

  const getStatusIcon = (status: AuditLog["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failure":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: AuditLog["status"]) => {
    const variants = {
      success: "default",
      failure: "destructive",
      warning: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const exportLogs = () => {
    const filteredLogs = getFilteredLogs();
    const csvContent = [
      "Timestamp,User,Role,Action,Resource,Status,Details,IP Address",
      ...filteredLogs.map(log => 
        `"${format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}","${log.userName}","${log.userRole}","${log.action}","${log.resource}","${log.status}","${log.details}","${log.ipAddress}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Audit logs exported successfully");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAction("");
    setSelectedStatus("");
    setSelectedUserRole("");
    setDateRange(undefined);
    toast.info("Filters cleared");
  };

  const filteredLogs = getFilteredLogs();
  const actions = [...new Set(logs.map(log => log.action))];
  const userRoles = [...new Set(logs.map(log => log.userRole))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2" />
            Audit Logs
          </h2>
          <p className="text-muted-foreground">
            Track system activities and user actions
            {userRole !== "master" && " (filtered based on your permissions)"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button onClick={exportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Actions</SelectItem>
                {actions.map(action => (
                  <SelectItem key={action} value={action} className="capitalize">
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>

            {userRole === "master" && (
              <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  {userRoles.map(role => (
                    <SelectItem key={role} value={role} className="capitalize">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    "Date Range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <div className="flex items-center text-sm text-muted-foreground">
              {filteredLogs.length} of {logs.length} logs
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow 
                    key={log.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedLog(log)}
                  >
                    <TableCell className="font-mono text-sm">
                      {format(new Date(log.timestamp), "MMM d, HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{log.userName}</div>
                          <div className="text-sm text-gray-500 capitalize">{log.userRole}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{log.resource}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(log.status)}
                        {getStatusBadge(log.status)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{log.details}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No audit logs found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Log Detail Dialog */}
      {selectedLog && (
        <Card className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Audit Log Details</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedLog(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Timestamp</Label>
                  <p className="font-mono">{format(new Date(selectedLog.timestamp), "yyyy-MM-dd HH:mm:ss")}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedLog.status)}
                    {getStatusBadge(selectedLog.status)}
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">User</Label>
                  <p>{selectedLog.userName} ({selectedLog.userRole})</p>
                </div>
                <div>
                  <Label className="font-semibold">Action</Label>
                  <Badge variant="outline" className="capitalize">
                    {selectedLog.action}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Resource</Label>
                  <p className="capitalize">{selectedLog.resource}</p>
                </div>
                {selectedLog.resourceId && (
                  <div>
                    <Label className="font-semibold">Resource ID</Label>
                    <p className="font-mono">{selectedLog.resourceId}</p>
                  </div>
                )}
                <div>
                  <Label className="font-semibold">IP Address</Label>
                  <p className="font-mono">{selectedLog.ipAddress}</p>
                </div>
              </div>
              
              <div>
                <Label className="font-semibold">Details</Label>
                <p className="mt-1 p-2 bg-gray-100 rounded">{selectedLog.details}</p>
              </div>

              {selectedLog.changes && selectedLog.changes.length > 0 && (
                <div>
                  <Label className="font-semibold">Changes Made</Label>
                  <div className="mt-2 space-y-2">
                    {selectedLog.changes.map((change, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded">
                        <div className="font-medium capitalize">{change.field}</div>
                        <div className="text-sm">
                          <span className="text-red-600">- {change.oldValue}</span>
                          <br />
                          <span className="text-green-600">+ {change.newValue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="font-semibold">User Agent</Label>
                <p className="text-sm font-mono text-gray-600 break-all">{selectedLog.userAgent}</p>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
    </div>
  );
};
