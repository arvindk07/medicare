
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, Edit, Trash2, Users, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  status: "Active" | "Inactive";
}

interface Permission {
  id: string;
  name: string;
  category: string;
}

export const RolesPermissions = () => {
  const availablePermissions: Permission[] = [
    { id: "users.create", name: "Create Users", category: "User Management" },
    { id: "users.read", name: "View Users", category: "User Management" },
    { id: "users.update", name: "Edit Users", category: "User Management" },
    { id: "users.delete", name: "Delete Users", category: "User Management" },
    { id: "sessions.create", name: "Create Sessions", category: "Sessions" },
    { id: "sessions.read", name: "View Sessions", category: "Sessions" },
    { id: "sessions.update", name: "Edit Sessions", category: "Sessions" },
    { id: "sessions.delete", name: "Delete Sessions", category: "Sessions" },
    { id: "reports.read", name: "View Reports", category: "Analytics" },
    { id: "reports.export", name: "Export Reports", category: "Analytics" },
    { id: "settings.update", name: "Modify Settings", category: "System" },
    { id: "billing.read", name: "View Billing", category: "Financial" },
    { id: "billing.update", name: "Manage Billing", category: "Financial" }
  ];

  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "Super Admin", description: "Full system access", userCount: 2, permissions: availablePermissions.map(p => p.id), status: "Active" },
    { id: 2, name: "Organization Admin", description: "Company-level administration", userCount: 15, permissions: ["users.create", "users.read", "users.update", "sessions.read", "reports.read"], status: "Active" },
    { id: 3, name: "Therapist", description: "Therapy session management", userCount: 45, permissions: ["sessions.create", "sessions.read", "sessions.update", "users.read"], status: "Active" },
    { id: 4, name: "Patient", description: "Basic patient access", userCount: 512, permissions: ["sessions.read", "users.read"], status: "Active" },
    { id: 5, name: "HR Manager", description: "Human resources access", userCount: 8, permissions: ["users.read", "reports.read", "reports.export"], status: "Inactive" }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "", description: "", permissions: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...formData, status: "Active" as const }
          : role
      ));
      toast.success("Role updated successfully");
    } else {
      const newRole: Role = {
        id: roles.length + 1,
        ...formData,
        userCount: 0,
        status: "Active"
      };
      setRoles([...roles, newRole]);
      toast.success("Role created successfully");
    }
    setIsDialogOpen(false);
    setEditingRole(null);
    setFormData({ name: "", description: "", permissions: [] });
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
    toast.success("Role deleted successfully");
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2" />
            Roles & Permissions
          </h2>
          <p className="text-muted-foreground">Manage user roles and access permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRole(null);
              setFormData({ name: "", description: "", permissions: [] });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRole ? "Edit Role" : "Create New Role"}</DialogTitle>
              <DialogDescription>
                {editingRole ? "Update role information and permissions" : "Define a new role with specific permissions"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter role name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the role's purpose"
                  required
                />
              </div>
              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 max-h-60 overflow-y-auto">
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm text-purple-600">{category}</h4>
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={formData.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(permission.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={permission.id} className="text-sm">
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRole ? "Update" : "Create"} Role
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roles Overview</CardTitle>
          <CardDescription>All system roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-muted-foreground">{role.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {role.userCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permissionId) => {
                        const permission = availablePermissions.find(p => p.id === permissionId);
                        return permission ? (
                          <Badge key={permissionId} variant="outline" className="text-xs">
                            {permission.name}
                          </Badge>
                        ) : null;
                      })}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={role.status === "Active" ? "default" : "secondary"}>
                      {role.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(role)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {role.name !== "Super Admin" && (
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(role.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
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
