
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Edit, Trash2, Mail, Calendar, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Patient" | "Therapist" | "Admin" | "Organization";
  company: string;
  status: "Active" | "Inactive" | "Suspended";
  joinDate: string;
  lastActive: string;
}

export const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Smith", email: "john.smith@techcorp.com", role: "Patient", company: "TechCorp Inc", status: "Active", joinDate: "2024-01-15", lastActive: "2024-12-01" },
    { id: 2, name: "Dr. Sarah Wilson", email: "sarah.wilson@therapy.com", role: "Therapist", company: "Independent", status: "Active", joinDate: "2023-11-22", lastActive: "2024-12-01" },
    { id: 3, name: "Mike Johnson", email: "mike.j@startupxyz.io", role: "Admin", company: "StartupXYZ", status: "Active", joinDate: "2024-03-10", lastActive: "2024-11-30" },
    { id: 4, name: "Lisa Davis", email: "lisa.d@megacorp.com", role: "Organization", company: "MegaCorpLtd", status: "Suspended", joinDate: "2024-02-28", lastActive: "2024-11-25" }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", role: "Patient" as User["role"], company: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData, status: "Active" as const }
          : user
      ));
      toast.success("User updated successfully");
    } else {
      const newUser: User = {
        id: users.length + 1,
        ...formData,
        status: "Active",
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      toast.success("User added successfully");
    }
    setIsDialogOpen(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "Patient", company: "" });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User removed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Users className="mr-2" />
            Users Management
          </h2>
          <p className="text-muted-foreground">Manage all platform users and their roles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingUser(null);
              setFormData({ name: "", email: "", role: "Patient", company: "" });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {editingUser ? "Update user information" : "Add a new user to the platform"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@company.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value as User["role"]})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Patient">Patient</SelectItem>
                    <SelectItem value="Therapist">Therapist</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingUser ? "Update" : "Add"} User
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users Overview</CardTitle>
          <CardDescription>All registered users across the platform</CardDescription>
        </CardHeader>
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
                    <Badge variant={user.status === "Active" ? "default" : user.status === "Suspended" ? "destructive" : "secondary"}>
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
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
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
