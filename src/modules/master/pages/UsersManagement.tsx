import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Mail, Calendar, Building2, Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "@/components/ui/sonner";
import GridView from "@/components/common/grid-view/GridView";
import NeurowelModal from "@/components/common/modal/NeurowelModal";
import AddUserForm from "./user/AddUserForm";
import NeurowelFilterHeader from "@/components/common/filter-header/NeurowelFilterHeader";
import UserGridView from "./user/user-grid-view/UserGridView";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Patient" | "Therapist" | "Admin" | "Organization";
  company: string;
  status: "Active" | "Inactive" | "Suspended";
  joinDate: string;
  lastActive: string;
  image: string;
}

export const UsersManagement = () => {
  const default_img = "/images/misc/therapist_1.jpg";
  const user_1 = "/images/misc/therapist_6.jpg";
  const user_2 = "/images/misc/therapist_2.jpg";
  const user_3 = "/images/misc/therapist_3.jpg";
  const user_4 = "/images/misc/therapist_4.jpg";
  const user_5 = "/images/misc/therapist_5.jpg";
  const [view, setView] = useState("list");
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@techcorp.com",
      role: "Patient",
      company: "TechCorp Inc",
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2024-12-01",
      image: user_1,
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@therapy.com",
      role: "Therapist",
      company: "Independent",
      status: "Active",
      joinDate: "2023-11-22",
      lastActive: "2024-12-01",
      image: user_2,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@startupxyz.io",
      role: "Admin",
      company: "StartupXYZ",
      status: "Active",
      joinDate: "2024-03-10",
      lastActive: "2024-11-30",
      image: user_3,
    },
    {
      id: 4,
      name: "Lisa Davis",
      email: "lisa.d@megacorp.com",
      role: "Organization",
      company: "MegaCorpLtd",
      status: "Suspended",
      joinDate: "2024-02-28",
      lastActive: "2024-11-25",
      image: user_4,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Patient" as User["role"],
    company: "",
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User removed successfully");
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
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              8{/* {companies.filter((c) => c.status === "Active").length} */}
            </div>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              2 {/* {companies.reduce((sum, c) => sum + c.employees, 0)} */}
            </div>
            <p className="text-xs text-muted-foreground">Deactive Users</p>
          </CardContent>
        </Card>
      </div>

      <NeurowelFilterHeader
        btn_title="Add user"
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
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {user.company}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active"
                            ? "default"
                            : user.status === "Suspended"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {user.joinDate}
                      </div>
                    </TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/master-panel/users/details/${user.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigate(`/master-panel/users/update/${user.id}`);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
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
        <UserGridView
          data={users}
          handleEdit={handleEdit}
          title="Users Overview"
          handleDelete={handleDelete}
          desc="All registered users across the platform"
        />
      )}

      <NeurowelModal
        is_open={isModalOpen}
        close_function={setIsModalOpen}
        size="large"
        title="Add New User"
        desc="Add a new user to the platform"
      >
        <AddUserForm
          users={users}
          setUsers={setUsers}
          handle_cancel={closeModalHandler}
        />
      </NeurowelModal>
    </div>
  );
};
