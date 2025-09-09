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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import GridView from "@/components/common/grid-view/GridView";
import { AppLayout } from "@/components/layouts/app-layout/AppLayout";
import { MapPin, Plus, Edit, Trash2, Building, Users, Eye } from "lucide-react";
import ListGridChanger from "@/components/common/list-grid-changer/ListGridChanger";
import NeurowelFilterHeader from "@/components/common/filter-header/NeurowelFilterHeader";
import NeurowelModal from "@/components/common/modal/NeurowelModal";
import AddVenuesForm from "./venues/AddVenuesForm";
import { useNavigate } from "react-router-dom";

interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  capacity: number;
  companyId: string;
  companyName: string;
  status: "Active" | "Inactive" | "Maintenance";
  amenities: string[];
}

export const VenuesManagement = () => {
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: "1",
      name: "Downtown Wellness Center",
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      phone: "+1-555-0123",
      capacity: 50,
      companyId: "1",
      companyName: "TechCorp Solutions",
      status: "Active",
      amenities: ["WiFi", "Parking", "Conference Room", "Kitchen"],
    },
    {
      id: "2",
      name: "Uptown Therapy Hub",
      address: "456 Health Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1-555-0456",
      capacity: 75,
      companyId: "2",
      companyName: "HealthFirst Inc",
      status: "Active",
      amenities: ["WiFi", "Parking", "Meditation Room", "Garden"],
    },
    {
      id: "3",
      name: "Innovation Wellness Space",
      address: "789 Innovation Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      phone: "+1-555-0789",
      capacity: 30,
      companyId: "3",
      companyName: "StartupXYZ",
      status: "Maintenance",
      amenities: ["WiFi", "Coffee Bar", "Open Space"],
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState("list");
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    capacity: 0,
    companyName: "",
    status: "Active" as "Active" | "Inactive" | "Maintenance",
    amenities: "",
  });

  const handleAdd = () => {
    setEditingVenue(null);
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      capacity: 0,
      companyName: "",
      status: "Active",
      amenities: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (venue: Venue) => {
    setEditingVenue(venue);
    setFormData({
      name: venue.name,
      address: venue.address,
      city: venue.city,
      state: venue.state,
      zipCode: venue.zipCode,
      phone: venue.phone,
      capacity: venue.capacity,
      companyName: venue.companyName,
      status: venue.status,
      amenities: venue.amenities.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setVenues(venues.filter((v) => v.id !== id));
    toast.success("Venue deleted successfully");
  };

  const handleListGridToggler = (view: any) => {
    setView(view);
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2" />
            Venues Management
          </h2>
          <p className="text-muted-foreground">
            Manage all therapy venues and locations
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Venue
        </Button>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{venues.length}</div>
            <p className="text-xs text-muted-foreground">Total Venues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {venues.filter((v) => v.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Active Venues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {venues.reduce((sum, v) => sum + v.capacity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Deactive Venues</p>
          </CardContent>
        </Card>
      </div>

      <NeurowelFilterHeader
        btn_title="Add Venue"
        view={view}
        open_model_handler={handleAdd}
        click_function={handleListGridToggler}
      />

      {view === "list" ? (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Venue</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {venues.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{venue.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {venue.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{venue.address}</div>
                        <div className="text-sm text-muted-foreground">
                          {venue.city}, {venue.state} {venue.zipCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {venue.companyName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {venue.capacity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          venue.status === "Active"
                            ? "default"
                            : venue.status === "Maintenance"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {venue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/master-panel/venues/details/${venue.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/master-panel/venues/update/${venue.id}`)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(venue.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <GridView
          data={venues}
          handleEdit={handleEdit}
          title="Venues List"
          handleDelete={handleDelete}
          desc="All registered venues and their details"
        />
      )}

      <NeurowelModal
        is_open={isDialogOpen}
        close_function={setIsDialogOpen}
        size="extra_large"
        title="Add New Venue"
        desc="Enter venue details to add"
      >
        <AddVenuesForm
          setVenues={setVenues}
          venues={venues}
          close_modal_function={() => setIsDialogOpen(false)}
        />
      </NeurowelModal>
    </div>
  );
};
