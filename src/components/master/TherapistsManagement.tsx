
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, Plus, Edit, Trash2, Mail, Phone, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

interface Therapist {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  rating: number;
  status: "Active" | "Inactive" | "Pending";
  licenseNumber: string;
}

export const TherapistsManagement = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([
    { id: 1, name: "Dr. Sarah Wilson", email: "sarah@therapy.com", phone: "+1-555-1001", specialization: "Anxiety & Depression", experience: 8, rating: 4.9, status: "Active", licenseNumber: "LIC-001" },
    { id: 2, name: "Dr. Michael Chen", email: "michael@therapy.com", phone: "+1-555-1002", specialization: "Family Therapy", experience: 12, rating: 4.8, status: "Active", licenseNumber: "LIC-002" },
    { id: 3, name: "Dr. Emily Johnson", email: "emily@therapy.com", phone: "+1-555-1003", specialization: "Trauma Recovery", experience: 6, rating: 4.7, status: "Pending", licenseNumber: "LIC-003" },
    { id: 4, name: "Dr. David Brown", email: "david@therapy.com", phone: "+1-555-1004", specialization: "Addiction Recovery", experience: 15, rating: 4.9, status: "Inactive", licenseNumber: "LIC-004" }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", specialization: "", experience: 0, licenseNumber: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTherapist) {
      setTherapists(therapists.map(therapist => 
        therapist.id === editingTherapist.id 
          ? { ...therapist, ...formData, status: "Active" as const, rating: therapist.rating }
          : therapist
      ));
      toast.success("Therapist updated successfully");
    } else {
      const newTherapist: Therapist = {
        id: therapists.length + 1,
        ...formData,
        status: "Pending",
        rating: 0
      };
      setTherapists([...therapists, newTherapist]);
      toast.success("Therapist added successfully");
    }
    setIsDialogOpen(false);
    setEditingTherapist(null);
    setFormData({ name: "", email: "", phone: "", specialization: "", experience: 0, licenseNumber: "" });
  };

  const handleEdit = (therapist: Therapist) => {
    setEditingTherapist(therapist);
    setFormData({
      name: therapist.name,
      email: therapist.email,
      phone: therapist.phone,
      specialization: therapist.specialization,
      experience: therapist.experience,
      licenseNumber: therapist.licenseNumber
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setTherapists(therapists.filter(therapist => therapist.id !== id));
    toast.success("Therapist removed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2" />
            Therapists Management
          </h2>
          <p className="text-muted-foreground">Manage therapist profiles and credentials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTherapist(null);
              setFormData({ name: "", email: "", phone: "", specialization: "", experience: 0, licenseNumber: "" });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Therapist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTherapist ? "Edit Therapist" : "Add New Therapist"}</DialogTitle>
              <DialogDescription>
                {editingTherapist ? "Update therapist information" : "Add a new therapist to the platform"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Dr. John Doe"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@therapy.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1-555-0123"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Select value={formData.specialization} onValueChange={(value) => setFormData({...formData, specialization: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Anxiety & Depression">Anxiety & Depression</SelectItem>
                    <SelectItem value="Family Therapy">Family Therapy</SelectItem>
                    <SelectItem value="Trauma Recovery">Trauma Recovery</SelectItem>
                    <SelectItem value="Addiction Recovery">Addiction Recovery</SelectItem>
                    <SelectItem value="Child Psychology">Child Psychology</SelectItem>
                    <SelectItem value="Couples Therapy">Couples Therapy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
                    placeholder="5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                    placeholder="LIC-123"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTherapist ? "Update" : "Add"} Therapist
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Therapists Overview</CardTitle>
          <CardDescription>All registered therapists on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Therapist</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {therapists.map((therapist) => (
                <TableRow key={therapist.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{therapist.name}</div>
                      <div className="text-sm text-muted-foreground">{therapist.licenseNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {therapist.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {therapist.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{therapist.specialization}</TableCell>
                  <TableCell>{therapist.experience} years</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {therapist.rating > 0 ? therapist.rating : "New"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={therapist.status === "Active" ? "default" : therapist.status === "Pending" ? "secondary" : "destructive"}>
                      {therapist.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(therapist)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(therapist.id)}>
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
    </div>
  );
};
