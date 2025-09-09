import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Mail, Phone, Star, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "@/components/ui/sonner";
import AddTherapistForm from "./therapist/AddTherapistForm";
import GridView from "@/components/common/grid-view/GridView";
import NeurowelModal from "@/components/common/modal/NeurowelModal";
import NeurowelFilterHeader from "@/components/common/filter-header/NeurowelFilterHeader";
import TherapistGridView from "./therapist/therapist-grid-view/TherapistGridView";
import { useNavigate } from "react-router-dom";

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
  img: any;
}

export const TherapistsManagement = () => {
  const [view, setView] = useState("list");

  const default_img = "/images/misc/therapist_1.jpg";
  const therapist_1 = "/images/misc/therapist_6.jpg";
  const therapist_2 = "/images/misc/therapist_2.jpg";
  const therapist_3 = "/images/misc/therapist_3.jpg";
  const therapist_4 = "/images/misc/therapist_4.jpg";
  const therapist_5 = "/images/misc/therapist_5.jpg";

  const [therapists, setTherapists] = useState<Therapist[]>([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah@therapy.com",
      phone: "+1-555-1001",
      specialization: "Anxiety & Depression",
      experience: 8,
      rating: 4.9,
      status: "Active",
      licenseNumber: "LIC-001",
      img: therapist_1,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "michael@therapy.com",
      phone: "+1-555-1002",
      specialization: "Family Therapy",
      experience: 12,
      rating: 4.8,
      status: "Active",
      licenseNumber: "LIC-002",
      img: therapist_2,
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      email: "emily@therapy.com",
      phone: "+1-555-1003",
      specialization: "Trauma Recovery",
      experience: 6,
      rating: 4.7,
      status: "Pending",
      licenseNumber: "LIC-003",
      img: therapist_3,
    },
    {
      id: 4,
      name: "Dr. David Brown",
      email: "david@therapy.com",
      phone: "+1-555-1004",
      specialization: "Addiction Recovery",
      experience: 15,
      rating: 4.9,
      status: "Inactive",
      licenseNumber: "LIC-004",
      img: therapist_4,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: 0,
    licenseNumber: "",
  });

  const handleEdit = (therapist: Therapist) => {
    setEditingTherapist(therapist);
    setFormData({
      name: therapist.name,
      email: therapist.email,
      phone: therapist.phone,
      specialization: therapist.specialization,
      experience: therapist.experience,
      licenseNumber: therapist.licenseNumber,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setTherapists(therapists.filter((therapist) => therapist.id !== id));
    toast.success("Therapist removed successfully");
  };

  const handleListGridToggler = (view: any) => {
    setView(view);
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            {/* <div className="text-2xl font-bold">{companies.length}</div> */}
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Total Therapists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              5{/* {companies.filter((c) => c.status === "Active").length} */}
            </div>
            <p className="text-xs text-muted-foreground">Active Therapists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              6{/* {companies.reduce((sum, c) => sum + c.employees, 0)} */}
            </div>
            <p className="text-xs text-muted-foreground">Deactive Therapists</p>
          </CardContent>
        </Card>
      </div>
      <NeurowelFilterHeader
        btn_title="Add Therapist"
        view={view}
        open_model_handler={openModalHandler}
        click_function={handleListGridToggler}
      />

      {view === "list" ? (
        <Card>
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
                        <div className="text-sm text-muted-foreground">
                          {therapist.licenseNumber}
                        </div>
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
                      <Badge
                        variant={
                          therapist.status === "Active"
                            ? "default"
                            : therapist.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {therapist.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/master-panel/therapists/details/${therapist.id}`
                            )
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/master-panel/therapists/update/${therapist.id}`
                            )
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(therapist.id)}
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
        <TherapistGridView
          data={therapists}
          handleEdit={handleEdit}
          title="Therapists Overview"
          handleDelete={handleDelete}
          desc="All registered therapists on the platform"
        />
      )}

      <NeurowelModal
        is_open={isModalOpen}
        close_function={setIsModalOpen}
        size="extra_large"
        title="Add New Therapist"
        desc="Add a new therapist to the platform"
      >
        <AddTherapistForm
          setTherapists={setTherapists}
          therapists={therapists}
          handle_cancel={closeModalHandler}
        />
      </NeurowelModal>
    </div>
  );
};
