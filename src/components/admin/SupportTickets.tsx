
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, AlertCircle, Clock, Tag, MessageSquare, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface SupportTicketsProps {
  userRole: "admin" | "master";
}

export const SupportTickets = ({ userRole }: SupportTicketsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<null | {
    id: number;
    subject: string;
    description: string;
    user: string;
    role: string;
    dateCreated: string;
    priority: string;
    status: string;
    messages: { sender: string; message: string; timestamp: string }[];
  }>(null);
  
  const tickets = [
    {
      id: 1001,
      subject: "Cannot schedule therapy session",
      description: "I'm trying to book a session with Dr. Wilson but keep getting an error message",
      user: "Sarah Johnson",
      role: "Patient",
      dateCreated: "2024-05-22 14:30",
      priority: "High",
      status: "Open",
      messages: [
        { sender: "Sarah Johnson", message: "I keep getting an error when booking a session. It says 'Calendar unavailable'.", timestamp: "2024-05-22 14:30" },
        { sender: "Support Team", message: "Thank you for reporting this issue. We'll investigate right away.", timestamp: "2024-05-22 15:05" }
      ]
    },
    {
      id: 1002,
      subject: "Payment method declined",
      description: "My credit card was declined but the money was taken from my account",
      user: "Michael Brown",
      role: "Patient",
      dateCreated: "2024-05-21 10:15",
      priority: "Medium",
      status: "In Progress",
      messages: [
        { sender: "Michael Brown", message: "My card was declined but I see the charge on my bank statement.", timestamp: "2024-05-21 10:15" },
        { sender: "Support Team", message: "We'll check with our payment processor and get back to you.", timestamp: "2024-05-21 11:22" },
        { sender: "Support Team", message: "We've confirmed the issue and have issued a refund. It should appear in 2-3 business days.", timestamp: "2024-05-22 09:15" }
      ]
    },
    {
      id: 1003,
      subject: "License verification issue",
      description: "My therapist license is not being accepted by the system",
      user: "Dr. Emily Davis",
      role: "Therapist",
      dateCreated: "2024-05-20 16:45",
      priority: "High",
      status: "Open",
      messages: [
        { sender: "Dr. Emily Davis", message: "I've uploaded my license three times but it's still not being accepted. I need to start seeing patients.", timestamp: "2024-05-20 16:45" }
      ]
    },
    {
      id: 1004,
      subject: "Video session quality issues",
      description: "Experiencing constant lag and disconnections during therapy sessions",
      user: "Dr. James Rodriguez",
      role: "Therapist",
      dateCreated: "2024-05-19 11:30",
      priority: "Medium",
      status: "In Progress",
      messages: [
        { sender: "Dr. James Rodriguez", message: "My sessions keep lagging and disconnecting. This is affecting patient care.", timestamp: "2024-05-19 11:30" },
        { sender: "Support Team", message: "Could you provide details about your internet connection and browser?", timestamp: "2024-05-19 12:15" },
        { sender: "Dr. James Rodriguez", message: "I'm using Chrome on a 100Mbps connection. This only happens on this platform.", timestamp: "2024-05-19 14:20" },
        { sender: "Support Team", message: "We're working on optimizing our video service. In the meantime, try lowering the video quality in settings.", timestamp: "2024-05-20 09:10" }
      ]
    },
    {
      id: 1005,
      subject: "Account access problem",
      description: "Can't log in after password reset",
      user: "Alice Johnson",
      role: "Patient",
      dateCreated: "2024-05-18 09:20",
      priority: "Low",
      status: "Resolved",
      messages: [
        { sender: "Alice Johnson", message: "I reset my password but still can't log in.", timestamp: "2024-05-18 09:20" },
        { sender: "Support Team", message: "Have you checked your email for the confirmation link?", timestamp: "2024-05-18 09:45" },
        { sender: "Alice Johnson", message: "Found it in spam. Working now, thanks!", timestamp: "2024-05-18 10:15" },
        { sender: "Support Team", message: "Great! Let us know if you need anything else.", timestamp: "2024-05-18 10:20" }
      ]
    },
    {
      id: 1006,
      subject: "Subscription cancellation issue",
      description: "Cannot cancel my subscription from the account settings",
      user: "Robert Wilson",
      role: "Patient",
      dateCreated: "2024-05-17 15:10",
      priority: "Medium",
      status: "Resolved",
      messages: [
        { sender: "Robert Wilson", message: "The cancellation button doesn't work. I've tried on multiple browsers.", timestamp: "2024-05-17 15:10" },
        { sender: "Support Team", message: "We'll look into this right away. As a temporary solution, we can cancel it manually for you.", timestamp: "2024-05-17 15:45" },
        { sender: "Robert Wilson", message: "Yes, please cancel it manually.", timestamp: "2024-05-17 16:20" },
        { sender: "Support Team", message: "We've cancelled your subscription and fixed the button. You should receive a confirmation email shortly.", timestamp: "2024-05-18 10:30" }
      ]
    },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  const openTickets = filteredTickets.filter(ticket => ticket.status === "Open");
  const inProgressTickets = filteredTickets.filter(ticket => ticket.status === "In Progress");
  const resolvedTickets = filteredTickets.filter(ticket => ticket.status === "Resolved");
  
  const ticketCounts = {
    total: tickets.length,
    open: tickets.filter(ticket => ticket.status === "Open").length,
    inProgress: tickets.filter(ticket => ticket.status === "In Progress").length,
    resolved: tickets.filter(ticket => ticket.status === "Resolved").length,
    highPriority: tickets.filter(ticket => ticket.priority === "High").length
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600">Manage and respond to user support requests</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">{ticketCounts.total}</h3>
              <p className="text-sm text-gray-600">Total Tickets</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">{ticketCounts.open}</h3>
              <p className="text-sm text-gray-600">Open Tickets</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">{ticketCounts.inProgress}</h3>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">{ticketCounts.resolved}</h3>
              <p className="text-sm text-gray-600">Resolved Tickets</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ticket Management</CardTitle>
          <CardDescription>
            View and manage support requests from users and therapists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-40">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <TicketTable 
                tickets={filteredTickets} 
                getStatusColor={getStatusColor} 
                getPriorityColor={getPriorityColor}
                onSelectTicket={setSelectedTicket}
              />
            </TabsContent>
            
            <TabsContent value="open">
              <TicketTable 
                tickets={openTickets} 
                getStatusColor={getStatusColor} 
                getPriorityColor={getPriorityColor}
                onSelectTicket={setSelectedTicket}
              />
            </TabsContent>
            
            <TabsContent value="in-progress">
              <TicketTable 
                tickets={inProgressTickets} 
                getStatusColor={getStatusColor} 
                getPriorityColor={getPriorityColor}
                onSelectTicket={setSelectedTicket}
              />
            </TabsContent>
            
            <TabsContent value="resolved">
              <TicketTable 
                tickets={resolvedTickets} 
                getStatusColor={getStatusColor} 
                getPriorityColor={getPriorityColor}
                onSelectTicket={setSelectedTicket}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div>Ticket #{selectedTicket.id}: {selectedTicket.subject}</div>
                <Badge className={getStatusColor(selectedTicket.status)}>
                  {selectedTicket.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Submitted by</p>
                    <p className="font-medium">{selectedTicket.user} ({selectedTicket.role})</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Created</p>
                    <p className="font-medium">{selectedTicket.dateCreated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <Badge className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="p-3 bg-gray-50 rounded-lg mt-1">{selectedTicket.description}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="border-t border-b py-4 my-4">
              <h3 className="font-medium mb-4">Conversation History</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {selectedTicket.messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'Support Team' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'Support Team' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="font-medium text-sm">{message.sender}</p>
                        <p className="text-xs text-gray-500">{message.timestamp.split(' ')[1]}</p>
                      </div>
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedTicket.status !== "Resolved" && (
              <div>
                <h3 className="font-medium mb-2">Reply</h3>
                <Textarea placeholder="Type your response..." rows={3} className="mb-4" />
                
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Update Priority
                    </Button>
                    {selectedTicket.status === "Open" && (
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Mark In Progress
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Resolve
                    </Button>
                    <Button className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface TicketTableProps {
  tickets: any[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  onSelectTicket: (ticket: any) => void;
}

const TicketTable = ({ tickets, getStatusColor, getPriorityColor, onSelectTicket }: TicketTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-500">
                No tickets found matching your search criteria.
              </td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{ticket.id}</td>
                <td className="py-3 px-4 max-w-[200px] truncate">{ticket.subject}</td>
                <td className="py-3 px-4 text-gray-600">{ticket.user}</td>
                <td className="py-3 px-4 text-gray-600">{ticket.dateCreated.split(' ')[0]}</td>
                <td className="py-3 px-4">
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onSelectTicket(ticket)}
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
