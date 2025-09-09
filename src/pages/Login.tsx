import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, User, Building } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import LoginForm from "@/components/forms/login-form/LoginForm";

const Login = () => {
  const location = useLocation();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [therapistData, setTherapistData] = useState({
    email: "",
    password: "",
  });
  const [patientData, setPatientData] = useState({ email: "", password: "" });
  const [organizationData, setOrganizationData] = useState({
    email: "",
    password: "",
  });
  const [masterData, setMasterData] = useState({ email: "", password: "" });

  const loginRole = useMemo(() => {
    if (location.pathname === "/therapist-login") return "therapist";
    if (location.pathname === "/patient-login") return "patient";
    if (location.pathname === "/organization-login") return "organization";
    if (location.pathname === "/master-login") return "master";
    return "user";
  }, [location.pathname]);

  const { data, setData } = useMemo(() => {
    switch (loginRole) {
      case "therapist":
        return { data: therapistData, setData: setTherapistData };
      case "patient":
        return { data: patientData, setData: setPatientData };
      case "organization":
        return { data: organizationData, setData: setOrganizationData };
      case "master":
        return { data: masterData, setData: setMasterData };
      default:
        return { data: userData, setData: setUserData };
    }
  }, [
    loginRole,
    therapistData,
    patientData,
    organizationData,
    masterData,
    userData,
  ]);

  const handleLogin = () => {
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(`Logged in as ${loginRole}`);
    switch (loginRole) {
      case "therapist":
        window.location.href = "/therapist";
        break;
      case "patient":
        window.location.href = "/patient";
        break;
      case "organization":
        window.location.href = "/organization";
        break;
      case "master":
        window.location.href = "/master-panel";
        break;
      default:
        window.location.href = "/master-panel";
    }
  };

  const icon =
    loginRole === "therapist"
      ? Brain
      : loginRole === "organization"
      ? Building
      : User;

  const title = loginRole.charAt(0).toUpperCase() + loginRole.slice(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardContent>
            <LoginForm
              role={loginRole}
              icon={icon}
              title={title}
              data={data}
              setData={setData}
              onLogin={handleLogin}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
