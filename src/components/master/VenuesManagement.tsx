
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Edit, Trash2, Building, Users } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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
      amenities: ["WiFi", "Parking", "Conference Room", "Kitchen"]
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
      amenities: ["WiFi", "Parking", "Meditation Room", "Garden"]
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
      amenities: ["WiFi", "Coffee Bar", "Open Space"]
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    amenities: ""
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
      amenities: ""
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
      amenities: venue.amenities.join(", ")
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingVenue) {
      setVenues(venues.map(v => v.id === editingVenue.id ? 
        { 
          ...editingVenue, 
          ...formData,
          amenities: formData.amenities.split(",").map(a => a.trim()).filter(a => a)
        } : v
      ));
      toast.success("Venue updated successfully");
    } else {
      const newVenue: Venue = {
        id: Date.now().toString(),
        companyId: Date.now().toString(),
        ...formData,
        amenities: formData.amenities.split(",").map(a => a.trim()).filter(a => a)
      };
      setVenues([...venues, newVenue]);
      toast.success("Venue added successfully");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setVenues(venues.filter(v => v.id !== id));
    toast.success("Venue deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2" />
            Venues Management
          </h2>
          <p className="text-muted-foreground">Manage all therapy venues and locations</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Venue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{venues.length}</div>
            <p className="text-xs text-muted-foreground">Total Venues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{venues.filter(v => v.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Active Venues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{venues.reduce((sum, v) => sum + v.capacity, 0)}</div>
            <p className="text-xs text-muted-foreground">Total Capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{venues.filter(v => v.status === "Maintenance").length}</div>
            <p className="text-xs text-muted-foreground">Under Maintenance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Venues List</CardTitle>
          <CardDescription>All registered venues and their details</CardDescription>
        </CardHeader>
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
                      <div className="text-sm text-muted-foreground">{venue.phone}</div>
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
                    <Badge variant={venue.status === "Active" ? "default" : venue.status === "Maintenance" ? "secondary" : "destructive"}>
                      {venue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(venue)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(venue.id)}>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingVenue ? "Edit Venue" : "Add New Venue"}</DialogTitle>
            <DialogDescription>
              {editingVenue ? "Update venue information" : "Enter venue details to add"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Venue Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter venue name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="Enter company name"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="Enter city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                placeholder="Enter state"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                placeholder="Enter zip code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value) || 0})}
                placeholder="Enter capacity"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="amenities">Amenities (comma separated)</Label>
              <Input
                id="amenities"
                value={formData.amenities}
                onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                placeholder="WiFi, Parking, Conference Room, etc."
              />
            </div>
            <div className="col-span-2 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingVenue ? "Update" : "Add"} Venue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
