
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Building, 
  Mail, 
  Phone, 
  Calendar, 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Globe,
  Menu,
  ExternalLink,
  FileText,
  Shield
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { MenuManagement } from "./MenuManagement";
import { PageBuilder } from "./PageBuilder";
import { FormBuilder } from "./FormBuilder";
import { AuditLogs } from "../shared/AuditLogs";

export const CRMManagement = () => {
  console.log("CRMManagement component rendering");
  
  const [searchTermContacts, setSearchTermContacts] = useState("");
  const [searchTermOrganizations, setSearchTermOrganizations] = useState("");
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<number | null>(null);

  // Mock data for contacts
  const contacts = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", company: "ABC Corp" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", company: "XYZ Ltd" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555-123-4567", company: "123 Industries" },
  ];

  // Mock data for organizations
  const organizations = [
    { id: 1, name: "ABC Corp", industry: "Technology", location: "New York", employees: 500 },
    { id: 2, name: "XYZ Ltd", industry: "Finance", location: "London", employees: 250 },
    { id: 3, name: "123 Industries", industry: "Manufacturing", location: "Chicago", employees: 1000 },
  ];

  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(searchTermContacts.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTermContacts.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTermContacts.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTermContacts.toLowerCase())
    );
  });

  const filteredOrganizations = organizations.filter(organization => {
    return (
      organization.name.toLowerCase().includes(searchTermOrganizations.toLowerCase()) ||
      organization.industry.toLowerCase().includes(searchTermOrganizations.toLowerCase()) ||
      organization.location.toLowerCase().includes(searchTermOrganizations.toLowerCase())
    );
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  console.log("CRMManagement - filtered contacts:", filteredContacts.length);
  console.log("CRMManagement - filtered organizations:", filteredOrganizations.length);

  const handleContactsTabClick = () => {
    console.log("Contacts tab clicked");
  };

  const handleOrganizationsTabClick = () => {
    console.log("Organizations tab clicked");
  };

  const handleInteractionsTabClick = () => {
    console.log("Interactions tab clicked");
  };

  const handlePagesTabClick = () => {
    console.log("Pages tab clicked");
  };

  const handleFormsTabClick = () => {
    console.log("Forms tab clicked");
  };

  const handleMenusTabClick = () => {
    console.log("Menus tab clicked");
  };

  // Log when rendering specific tabs
  const renderContactsTab = () => {
    console.log("Rendering contacts tab");
    return null;
  };

  const renderPagesTab = () => {
    console.log("Rendering pages tab");
    return null;
  };

  const renderFormsTab = () => {
    console.log("Rendering forms tab");
    return null;
  };

  const renderMenusTab = () => {
    console.log("Rendering menus tab");
    return null;
  };

  const renderAuditLogs = () => {
    console.log("Rendering audit logs");
    return null;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">CRM Management</h1>
          <p className="text-sm md:text-base text-gray-600">Manage customers, organizations, and website content</p>
        </div>
      </div>

      <Tabs defaultValue="contacts" className="space-y-4 md:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 min-w-[600px] md:min-w-0">
            <TabsTrigger value="contacts" className="text-xs md:text-sm" onClick={handleContactsTabClick}>Contacts</TabsTrigger>
            <TabsTrigger value="organizations" className="text-xs md:text-sm" onClick={handleOrganizationsTabClick}>Organizations</TabsTrigger>
            <TabsTrigger value="interactions" className="text-xs md:text-sm" onClick={handleInteractionsTabClick}>Interactions</TabsTrigger>
            <TabsTrigger value="pages" className="text-xs md:text-sm" onClick={handlePagesTabClick}>Website Pages</TabsTrigger>
            <TabsTrigger value="forms" className="text-xs md:text-sm" onClick={handleFormsTabClick}>Form Builder</TabsTrigger>
            <TabsTrigger value="menus" className="text-xs md:text-sm" onClick={handleMenusTabClick}>Dynamic Menus</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="contacts" className="space-y-4">
          {renderContactsTab()}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl">Contacts</CardTitle>
              <CardDescription className="text-sm md:text-base">Manage customer contacts</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTermContacts}
                  onChange={(e) => setSearchTermContacts(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] md:max-h-[400px] overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContact === contact.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-100 border border-transparent'
                    }`}
                    onClick={() => {
                      console.log("Contact selected:", contact.id);
                      setSelectedContact(contact.id);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-blue-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <div className="text-sm text-gray-600">
                          <div className="truncate">{contact.email}</div>
                          <div className="truncate">{contact.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredContacts.length === 0 && (
                  <div className="py-6 text-center text-gray-500">
                    <p className="text-sm md:text-base">No contacts found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl">Organizations</CardTitle>
              <CardDescription className="text-sm md:text-base">Manage customer organizations</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTermOrganizations}
                  onChange={(e) => setSearchTermOrganizations(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] md:max-h-[400px] overflow-y-auto">
                {filteredOrganizations.map((organization) => (
                  <div
                    key={organization.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedOrganization === organization.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-100 border border-transparent'
                    }`}
                    onClick={() => setSelectedOrganization(organization.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Building className="h-4 w-4 text-blue-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{organization.name}</h3>
                        <div className="text-sm text-gray-600">
                          <div className="truncate">{organization.industry}</div>
                          <div className="truncate">{organization.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredOrganizations.length === 0 && (
                  <div className="py-6 text-center text-gray-500">
                    <p className="text-sm md:text-base">No organizations found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl">Interactions</CardTitle>
              <CardDescription className="text-sm md:text-base">Log and manage customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Coming soon: Interaction logging and management features.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          {renderPagesTab()}
          <PageBuilder />
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          {renderFormsTab()}
          <FormBuilder />
        </TabsContent>

        <TabsContent value="menus" className="space-y-4">
          {renderMenusTab()}
          <MenuManagement />
        </TabsContent>
      </Tabs>

      {/* Audit Logs Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center text-lg md:text-xl">
            <Shield className="mr-2" />
            Audit Logs
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            View system activity and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderAuditLogs()}
          <AuditLogs userRole="master" />
        </CardContent>
      </Card>
    </div>
  );
};
