
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Settings, Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export const OrganizationRoles = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 1,
      name: "HR Manager",
      description: "Full access to employee management and wellness programs",
      permissions: ["View All Employees", "Manage Sessions", "View Reports", "Billing Access"],
      userCount: 3,
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 2,
      name: "Department Manager",
      description: "Manage employees within their department",
      permissions: ["View Department Employees", "Schedule Team Sessions", "View Department Reports"],
      userCount: 12,
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      name: "Wellness Coordinator",
      description: "Coordinate wellness activities and sessions",
      permissions: ["Manage Sessions", "View Participation Reports", "Send Notifications"],
      userCount: 5,
      color: "bg-green-100 text-green-800"
    },
    {
      id: 4,
      name: "Employee",
      description: "Basic access to personal wellness resources",
      permissions: ["View Personal Sessions", "Book Sessions", "Access Resources"],
      userCount: 1227,
      color: "bg-gray-100 text-gray-800"
    }
  ];

  const permissions = [
    { category: "Employee Management", items: ["View All Employees", "View Department Employees", "Add Employees", "Edit Employee Info", "Remove Employees"] },
    { category: "Session Management", items: ["Manage Sessions", "Schedule Team Sessions", "View Session History", "Cancel Sessions"] },
    { category: "Reports & Analytics", items: ["View Reports", "View Department Reports", "View Participation Reports", "Export Data"] },
    { category: "System Access", items: ["Billing Access", "System Settings", "User Management", "Send Notifications"] },
    { category: "Personal Access", items: ["View Personal Sessions", "Book Sessions", "Access Resources", "Update Profile"] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600">Define and manage user roles and permissions</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Organization Roles
              </CardTitle>
              <CardDescription>
                Manage roles and their associated permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div 
                    key={role.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.name ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole(selectedRole === role.name ? null : role.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={role.color}>{role.name}</Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {role.userCount} users
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    
                    {selectedRole === role.name && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Permissions:</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Permission Categories</CardTitle>
              <CardDescription>Available system permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {permissions.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="font-medium text-gray-900 mb-2">{category.category}</h4>
                    <div className="space-y-1">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roles.map((role) => (
                <div key={role.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{role.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{role.userCount}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((role.userCount / 1247) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" size="sm" variant="outline">
                <Users className="w-3 h-3 mr-2" />
                Assign Bulk Roles
              </Button>
              <Button className="w-full" size="sm" variant="outline">
                <Settings className="w-3 h-3 mr-2" />
                Role Templates
              </Button>
              <Button className="w-full" size="sm" variant="outline">
                <Eye className="w-3 h-3 mr-2" />
                Audit Permissions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-gray-900">New HR Manager added</p>
                <p className="text-gray-500">Sarah Johnson assigned HR Manager role</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Permissions updated</p>
                <p className="text-gray-500">Department Manager role permissions modified</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
