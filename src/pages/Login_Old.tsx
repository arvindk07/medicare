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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Shield, Crown, User, Building } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";

const Login = () => {
  const [therapistData, setTherapistData] = useState({
    email: "",
    password: "",
  });
  const [patientData, setPatientData] = useState({ email: "", password: "" });
  const [organizationData, setOrganizationData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (role: string, email: string, password: string) => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(`Logged in as ${role}`);

    // Redirect based on role
    switch (role) {
      case "therapist":
        window.location.href = "/therapist";
        break;
      case "patient":
        window.location.href = "/patient";
        break;
      case "organization":
        window.location.href = "/organization";
        break;
      default:
        window.location.href = "/";
    }
  };

  const LoginForm = ({
    role,
    icon: Icon,
    title,
    data,
    setData,
  }: {
    role: string;
    icon: any;
    title: string;
    data: { email: string; password: string };
    setData: (data: { email: string; password: string }) => void;
  }) => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-xl font-semibold">{title} Login</h3>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input
          id={`${role}-password`}
          type="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <Button
        className="w-full"
        onClick={() => handleLogin(role, data.email, data.password)}
      >
        Sign In
      </Button>
      <div className="text-center">
        <Button variant="link" className="text-sm">
          Forgot password?
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login to Your Account</CardTitle>
            <CardDescription>Choose your role and sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="therapist" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="therapist">Therapist</TabsTrigger>
                <TabsTrigger value="patient">Patient</TabsTrigger>
                <TabsTrigger value="organization">Organization</TabsTrigger>
              </TabsList>

              <TabsContent value="therapist">
                <LoginForm
                  role="therapist"
                  icon={Brain}
                  title="Therapist"
                  data={therapistData}
                  setData={setTherapistData}
                />
              </TabsContent>

              <TabsContent value="patient">
                <LoginForm
                  role="patient"
                  icon={User}
                  title="Patient"
                  data={patientData}
                  setData={setPatientData}
                />
              </TabsContent>

              <TabsContent value="organization">
                <LoginForm
                  role="organization"
                  icon={Building}
                  title="Organization"
                  data={organizationData}
                  setData={setOrganizationData}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        {/* Access Examples */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Access Panel Examples:</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Master Panel:</strong>{" "}
              <code>localhost:8080?tenant=master</code> or{" "}
              <code>/master-login</code>
            </div>
            <div>
              <strong>Organization:</strong>{" "}
              <code>localhost:8080?tenant=organization</code>
            </div>
            <div>
              <strong>Patient:</strong>{" "}
              <code>localhost:8080?tenant=patient</code>
            </div>
            <div>
              <strong>Therapist:</strong>{" "}
              <code>localhost:8080?tenant=therapist</code>
            </div>
            <div>
              <strong>Forms:</strong> <code>/forms/intake-form</code> or{" "}
              <code>/forms/consent-form</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
