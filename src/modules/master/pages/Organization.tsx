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
import { Edit, Trash2, Users, MapPin, Eye } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import MasterGrid from "@/components/master/components/common/master-grid/MasterGrid";
import NeurowelFilterHeader from "@/components/common/filter-header/NeurowelFilterHeader";
import NeurowelModal from "@/components/common/modal/NeurowelModal";
import AddOrganizationForm from "../components/forms/organization/AddOrganizationForm";
import { useNavigate } from "react-router-dom";

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
  img: any;
}

export const Organization = () => {
  const default_img1 = "/images/misc/default_company_1.jpg";
  const default_img2 = "/images/misc/default_company_2.jpg";
  const default_img3 = "/images/misc/default_company_3.jpg";
  const default_img4 = "/images/misc/default_company_4.jpg";
  const default_img5 = "/images/misc/default_company_5.jpg";

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
      img: default_img1,
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
      img: default_img3,
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
      img: default_img4,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const navigate = useNavigate();

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

  const handleDelete = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
    toast.success("Company deleted successfully");
  };

  const handleListGridToggler = (view: any) => {
    setView(view);
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
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
        </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      <NeurowelFilterHeader
        btn_title="Add Organization"
        view={view}
        open_model_handler={openModalHandler}
        click_function={handleListGridToggler}
      />

      {view === "list" && (
        <Card>
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
                          onClick={() =>
                            navigate(
                              `/master-panel/organization/details/${company.id}`
                            )
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/master-panel/organization/update/${company.id}`
                            )
                          }
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
        <MasterGrid data={companies} handleDelete={handleDelete} />
      )}

      <NeurowelModal
        is_open={isModalOpen}
        close_function={setIsModalOpen}
        size="large"
        title="Add New Company"
        desc="Enter company details to add"
      >
        <AddOrganizationForm
          companies={companies}
          setCompanies={setCompanies}
        />
      </NeurowelModal>
    </div>
  );
};
