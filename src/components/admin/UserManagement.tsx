
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, Edit, Trash2 } from "lucide-react";

interface UserManagementProps {
  userRole: "admin" | "therapist" | "master";
}

export const UserManagement = ({ userRole }: UserManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Patient", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Patient", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Dr. Wilson", email: "wilson@example.com", role: "Therapist", status: "Active", joinDate: "2023-12-01" },
    { id: 4, name: "Alice Johnson", email: "alice@example.com", role: "Patient", status: "Inactive", joinDate: "2024-03-10" },
    { id: 5, name: "Bob Brown", email: "bob@example.com", role: "Patient", status: "Active", joinDate: "2024-01-25" },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Therapist": return "bg-blue-100 text-blue-800";
      case "Patient": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users and their access permissions</p>
        </div>
        {(userRole === "admin" || userRole === "master") && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            User Directory
          </CardTitle>
          <CardDescription>
            View and manage all registered users in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Join Date</th>
                  {(userRole === "admin" || userRole === "master") && (
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                    {(userRole === "admin" || userRole === "master") && (
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
