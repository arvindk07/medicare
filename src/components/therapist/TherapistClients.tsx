
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Users, Plus, MessageSquare, Calendar, FileText, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  condition: string;
  status: "Active" | "Inactive" | "On Hold";
  lastSession: string;
  nextSession: string;
  totalSessions: number;
  notes: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export const TherapistClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock clients data
  const [clients] = useState<Client[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      age: 28,
      condition: "Anxiety, Depression",
      status: "Active",
      lastSession: "2025-05-28",
      nextSession: "2025-06-04",
      totalSessions: 12,
      notes: "Making good progress with CBT techniques. Responds well to mindfulness exercises.",
      address: "123 Main St, City, State 12345",
      emergencyContact: {
        name: "John Johnson",
        phone: "(555) 987-6543",
        relationship: "Spouse"
      }
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "(555) 234-5678",
      age: 35,
      condition: "Depression, Work Stress",
      status: "Active",
      lastSession: "2025-05-27",
      nextSession: "2025-06-03",
      totalSessions: 8,
      notes: "Recently started therapy. Showing initial signs of improvement with behavioral activation.",
      address: "456 Oak Ave, City, State 12345",
      emergencyContact: {
        name: "Lisa Brown",
        phone: "(555) 876-5432",
        relationship: "Sister"
      }
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "(555) 345-6789",
      age: 42,
      condition: "Relationship Issues",
      status: "Active",
      lastSession: "2025-05-26",
      nextSession: "2025-06-02",
      totalSessions: 15,
      notes: "Working on communication skills. Has made significant progress in relationship dynamics.",
      address: "789 Pine St, City, State 12345",
      emergencyContact: {
        name: "Mark Davis",
        phone: "(555) 765-4321",
        relationship: "Partner"
      }
    },
    {
      id: 4,
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      phone: "(555) 456-7890",
      age: 31,
      condition: "PTSD, Anxiety",
      status: "On Hold",
      lastSession: "2025-05-15",
      nextSession: "2025-06-15",
      totalSessions: 6,
      notes: "Taking a break from therapy. Scheduled to resume next month.",
      address: "321 Elm Dr, City, State 12345",
      emergencyContact: {
        name: "Mary Wilson",
        phone: "(555) 654-3210",
        relationship: "Mother"
      }
    }
  ]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && client.status === "Active") ||
                      (activeTab === "inactive" && client.status !== "Active");
    return matchesSearch && matchesTab;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-red-100 text-red-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendMessage = (clientId: number) => {
    toast.success("Message sent to client");
  };

  const handleScheduleSession = (clientId: number) => {
    toast.success("Redirecting to schedule appointment");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Clients</h1>
          <p className="text-gray-600">Manage your client relationships and information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Client Directory
              </CardTitle>
              <CardDescription>
                {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search clients..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive/On Hold</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.condition}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        {client.totalSessions} sessions
                      </span>
                      <span className="text-xs text-gray-500">
                        Next: {new Date(client.nextSession).toLocaleDateString()}
                      </span>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSendMessage(client.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleScheduleSession(client.id)}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedClient(client)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Client Details: {client.name}</DialogTitle>
                        <DialogDescription>
                          Complete client information and history
                        </DialogDescription>
                      </DialogHeader>
                      {selectedClient && (
                        <div className="grid gap-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Contact Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                  {selectedClient.email}
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                  {selectedClient.phone}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                  {selectedClient.address}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Basic Information</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Age:</span> {selectedClient.age}</p>
                                <p><span className="font-medium">Condition:</span> {selectedClient.condition}</p>
                                <p><span className="font-medium">Status:</span> {selectedClient.status}</p>
                                <p><span className="font-medium">Total Sessions:</span> {selectedClient.totalSessions}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Emergency Contact</h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm"><span className="font-medium">Name:</span> {selectedClient.emergencyContact.name}</p>
                              <p className="text-sm"><span className="font-medium">Phone:</span> {selectedClient.emergencyContact.phone}</p>
                              <p className="text-sm"><span className="font-medium">Relationship:</span> {selectedClient.emergencyContact.relationship}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Clinical Notes</h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm">{selectedClient.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
            
            {filteredClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No clients found matching your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
