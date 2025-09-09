import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, User, Building } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import LoginForm from "@/components/forms/login-form/LoginForm";
import { users } from "@/helper/users";
import { setNeurowelUserInfo } from "@/helper/storage";

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

  const [loginRole, setLoginRole] = useState(() => {
    if (location.pathname === "/therapist-login") return "therapist";
    if (location.pathname === "/patient-login") return "patient";
    if (location.pathname === "/organization-login") return "organization";
    if (location.pathname === "/master-login") return "master";
    return "user";
  });

  // Role detection from email on generic /login route
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/") {
      const matchedUser = users.find(
        (u) =>
          String(u.email).toLowerCase().trim() ===
          String(userData.email).toLowerCase().trim()
      );
      if (matchedUser && matchedUser.role !== loginRole) {
        setLoginRole(matchedUser.role);
      }
    }
  }, [userData.email, location.pathname]);

  // Role-specific data/state
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

  // Login logic
  const handleLogin = () => {
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const email = String(data.email).toLowerCase().trim();
    const password = String(data.password).trim();

    // First check if email exists
    const userByEmail = users.find(
      (user) => String(user.email).toLowerCase().trim() === email
    );

    if (!userByEmail) {
      toast.error("No account found with this email.");
      return;
    }

    // Now check if password matches
    if (String(userByEmail.password).trim() !== password) {
      toast.error("Incorrect password.");
      return;
    }

    // If user is on generic login page, update loginRole based on matched user
    if (location.pathname === "/login" || location.pathname === "/") {
      setLoginRole(userByEmail.role);
    }

    // Save to local storage
    setNeurowelUserInfo(
      JSON.stringify({
        email: userByEmail.email,
        password: userByEmail.password,
        role: userByEmail.role,
      })
    );

    toast.success(`Logged in as ${userByEmail.role}`);

    switch (userByEmail.role) {
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
        window.location.href = "/";
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
