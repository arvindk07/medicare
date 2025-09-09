import { publicRoutes } from "./public";
import { getNeurowelToken } from "@/helper/storage";
import { Suspense, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useRoutes } from "react-router-dom";
import {
  protectedMasterRoutes,
  protectedOrganizationRoutes,
  protectedPatientRoutes,
  protectedTherapistRoutes,
} from "./protected";

export const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getNeurowelToken();
  const userDetails = token ? JSON.parse(token) : null;
  const role = userDetails?.role;

  const roleBasedRoutes = useMemo(() => {
    if (!role) return [];

    switch (role) {
      case "master":
        return protectedMasterRoutes;
      case "therapist":
        return protectedTherapistRoutes;
      case "patient":
        return protectedPatientRoutes;
      case "organization":
        return protectedOrganizationRoutes;
      default:
        return [];
    }
  }, [role]);

  const routes = token && role ? roleBasedRoutes : publicRoutes;
  const element = useRoutes(routes);

  useEffect(() => {
    if (!token || !role) {
      if (!location.pathname.startsWith("/auth")) {
        navigate("/auth/login", { replace: true });
      }
    } else if (location.pathname === "/") {
      // Redirect from "/" to respective dashboard based on role
      switch (role) {
        case "master":
          navigate("/master-panel", { replace: true });
          break;
        case "therapist":
          navigate("/therapist", { replace: true });
          break;
        case "patient":
          navigate("/patient", { replace: true });
          break;
        case "organization":
          navigate("/organization", { replace: true });
          break;
        default:
          navigate("/auth/login", { replace: true });
      }
    }
  }, [token, role, location.pathname, navigate]);

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};
