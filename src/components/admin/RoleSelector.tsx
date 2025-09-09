
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Brain, Crown, User, Building } from "lucide-react";
import { Link } from "react-router-dom";

interface RoleSelectorProps {
  onRoleSelect: (role: "admin" | "therapist" | "master" | "patient") => void;
}

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: "admin" as const,
      title: "Administrator",
      description: "Full access to system management and user oversight",
      icon: Shield,
      color: "bg-red-500",
      features: ["User Management", "Content Moderation", "System Settings", "Analytics"]
    },
    {
      id: "therapist" as const,
      title: "Therapist",
      description: "Manage patients and access therapeutic tools",
      icon: Brain,
      color: "bg-green-500",
      features: ["Client Management", "Session Calendar", "Notes & Tools", "Resources"]
    },
    {
      id: "patient" as const,
      title: "Patient Portal",
      description: "Access your therapy sessions and wellness tools",
      icon: User,
      color: "bg-blue-500",
      features: ["Book Sessions", "Self-help Tools", "Journal", "Resources"]
    },
    {
      id: "master" as const,
      title: "Master Panel",
      description: "Comprehensive system management for institutions",
      icon: Crown,
      color: "bg-purple-500",
      features: ["Global Analytics", "Multi-Organization", "Advanced Reports", "System Admin"]
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Platform</h1>
          <p className="text-xl text-gray-600 mb-6">Select your role to access the appropriate dashboard</p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Already have an account? Log in
              </Button>
            </Link>
            <Link to="/organization">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Building className="w-4 h-4 mr-2" />
                Organization Portal
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => onRoleSelect(role.id)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-4 text-sm text-gray-600">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center mb-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => onRoleSelect(role.id)}
                  >
                    Access {role.title}
                  </Button>
                  <Link to="/login" className="w-full">
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Log In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Building className="w-6 h-6 mr-2 text-purple-600" />
                Enterprise & Organizations
              </CardTitle>
              <CardDescription>
                Manage employee wellness programs with advanced tools and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/organization">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                  Access Organization Portal
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
