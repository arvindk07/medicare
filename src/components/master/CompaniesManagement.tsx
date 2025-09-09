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
  DialogTrigger,
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
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Users,
  MapPin,
  List,
  Grid2x2Check,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import MasterListGridHeader from "./components/common/master-list-grid-header/MasterListGridHeader";
import MasterGrid from "./components/common/master-grid/MasterGrid";

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  employees: number;
  venues: number;
  status: "Active" | "Inactive" | "Pending";
  subscription: "Basic" | "Premium" | "Enterprise";
  joinDate: string;
}

export const CompaniesManagement = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "TechCorp Solutions",
      email: "admin@techcorp.com",
      phone: "+1-555-0123",
      address: "123 Tech Street, San Francisco, CA",
      employees: 250,
      venues: 3,
      status: "Active",
      subscription: "Enterprise",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "HealthFirst Inc",
      email: "contact@healthfirst.com",
      phone: "+1-555-0456",
      address: "456 Health Ave, New York, NY",
      employees: 120,
      venues: 2,
      status: "Active",
      subscription: "Premium",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "StartupXYZ",
      email: "hello@startupxyz.com",
      phone: "+1-555-0789",
      address: "789 Innovation Blvd, Austin, TX",
      employees: 45,
      venues: 1,
      status: "Pending",
      subscription: "Basic",
      joinDate: "2024-03-10",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    employees: 0,
    venues: 0,
    status: "Active" as "Active" | "Inactive" | "Pending",
    subscription: "Basic" as "Basic" | "Premium" | "Enterprise",
  });

  const [view, setView] = useState<"list" | "grid">("list");

  const handleAdd = () => {
    setEditingCompany(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      employees: 0,
      venues: 0,
      status: "Active",
      subscription: "Basic",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      email: company.email,
      phone: company.phone,
      address: company.address,
      employees: company.employees,
      venues: company.venues,
      status: company.status,
      subscription: company.subscription,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCompany) {
      setCompanies(
        companies.map((c) =>
          c.id === editingCompany.id ? { ...editingCompany, ...formData } : c
        )
      );
      toast.success("Company updated successfully");
    } else {
      const newCompany: Company = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      };
      setCompanies([...companies, newCompany]);
      toast.success("Company added successfully");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
    toast.success("Company deleted successfully");
  };

  const handleListGridToggler = (view: any) => {
    setView(view);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Building2 className="mr-2" />
            Companies Management
          </h2>
          <p className="text-muted-foreground">
            Manage all registered companies
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-muted-foreground">Total Companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {companies.filter((c) => c.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Active Companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {companies.reduce((sum, c) => sum + c.employees, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {companies.reduce((sum, c) => sum + c.venues, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total Venues</p>
          </CardContent>
        </Card>
      </div>
      <MasterListGridHeader click_function={handleListGridToggler} />

      {view === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>Companies List</CardTitle>
            <CardDescription>
              All registered companies and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Venues</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {company.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{company.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {company.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {company.employees}
                      </div>
                    </TableCell>
                    <TableCell>{company.venues}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          company.status === "Active"
                            ? "default"
                            : company.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{company.subscription}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(company)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(company.id)}
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
      )}
      {view === "grid" && (
        <MasterGrid
          data={companies}
          handleEdit={handleEdit}
          title=" Companies List"
          handleDelete={handleDelete}
          desc="All registered companies and their details"
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCompany ? "Edit Company" : "Add New Company"}
            </DialogTitle>
            <DialogDescription>
              {editingCompany
                ? "Update company information"
                : "Enter company details to add"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={formData.employees}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employees: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venues">Venues</Label>
                <Input
                  id="venues"
                  type="number"
                  value={formData.venues}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      venues: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingCompany ? "Update" : "Add"} Company
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
