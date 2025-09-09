import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Search, Plus, Edit, Trash2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { OrganizationLayout } from "../components/layout/OrganizationLayout";

export const OrganizationEmployees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const mockEmployees = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@acme.com",
      department: "Engineering",
      role: "Senior Developer",
      status: "Active",
      joinDate: "2023-01-15",
      sessionsCompleted: 8,
      lastSession: "2024-01-10",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@acme.com",
      department: "Marketing",
      role: "Marketing Manager",
      status: "Active",
      joinDate: "2023-03-20",
      sessionsCompleted: 12,
      lastSession: "2024-01-12",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@acme.com",
      department: "Finance",
      role: "Financial Analyst",
      status: "Inactive",
      joinDate: "2023-06-01",
      sessionsCompleted: 3,
      lastSession: "2023-12-15",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@acme.com",
      department: "HR",
      role: "HR Specialist",
      status: "Active",
      joinDate: "2023-02-10",
      sessionsCompleted: 15,
      lastSession: "2024-01-14",
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex.rodriguez@acme.com",
      department: "Engineering",
      role: "DevOps Engineer",
      status: "Active",
      joinDate: "2023-04-15",
      sessionsCompleted: 6,
      lastSession: "2024-01-08",
    },
  ];

  const departments = [
    "Engineering",
    "Marketing",
    "Finance",
    "HR",
    "Sales",
    "Operations",
  ];

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      Engineering: "bg-blue-100 text-blue-800",
      Marketing: "bg-purple-100 text-purple-800",
      Finance: "bg-green-100 text-green-800",
      HR: "bg-orange-100 text-orange-800",
      Sales: "bg-red-100 text-red-800",
      Operations: "bg-gray-100 text-gray-800",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  return (
    <OrganizationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employee Management
            </h1>
            <p className="text-gray-600">
              Manage your organization's employees and their wellness
              participation
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Employee Directory
            </CardTitle>
            <CardDescription>
              View and manage all employees in your organization
            </CardDescription>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Employee
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Department
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Sessions
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Last Session
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {employee.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={getDepartmentColor(employee.department)}
                        >
                          {employee.department}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {employee.role}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {employee.sessionsCompleted}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {employee.lastSession}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No employees found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departments.map((dept) => {
                  const count = mockEmployees.filter(
                    (emp) => emp.department === dept
                  ).length;
                  return (
                    <div
                      key={dept}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-600">{dept}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Active Employees
                  </span>
                  <span className="text-sm font-medium">
                    {
                      mockEmployees.filter((emp) => emp.status === "Active")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Avg Sessions/Employee
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      mockEmployees.reduce(
                        (sum, emp) => sum + emp.sessionsCompleted,
                        0
                      ) / mockEmployees.length
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Participation Rate
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      (mockEmployees.filter((emp) => emp.sessionsCompleted > 0)
                        .length /
                        mockEmployees.length) *
                        100
                    )}
                    %
                  </span>
                </div>
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
                  Bulk Import Employees
                </Button>
                <Button className="w-full" size="sm" variant="outline">
                  Send Wellness Invitation
                </Button>
                <Button className="w-full" size="sm" variant="outline">
                  Export Employee Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </OrganizationLayout>
  );
};
