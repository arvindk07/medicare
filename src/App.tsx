import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { getTenantType } from "@/utils/subdomainUtils";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import TenantLogin from "./pages/TenantLogin";
import MasterLogin from "./pages/MasterLogin";
import MasterPanel from "./pages/MasterPanel";
import TherapistPanel from "./pages/TherapistPanel";
import PatientPanel from "./pages/PatientPanel";
import OrganizationPanel from "./pages/OrganizationPanel";
import FormViewer from "./pages/FormViewer";
import VideoSession from "./pages/VideoSession";
import WaitingRoom from "./pages/WaitingRoom";
import { AppRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  const tenantType = getTenantType();

  useEffect(() => {
    // Handle subdomain routing
    if (tenantType !== "main" && window.location.pathname === "/") {
      window.location.href = "/tenant-login";
    }
  }, [tenantType]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
