import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <BrowserRouter>
          <Routes>
            <Route path="/index" element={<Index />} />
            <Route path="/" element={<Login />} />
            <Route path="/therapist-login" element={<Login />} />
            <Route path="/patient-login" element={<Login />} />
            <Route path="/organization-login" element={<Login />} />
            <Route path="/master-login" element={<Login />} />
            <Route path="/tenant-login" element={<Login />} />
            {/* <Route path="/tenant-login" element={<TenantLogin />} /> */}
            {/* <Route path="/master-login" element={<MasterLogin />} /> */}
            <Route path="/master-panel" element={<MasterPanel />} />
            <Route path="/therapist" element={<TherapistPanel />} />
            <Route path="/patient" element={<PatientPanel />} />
            <Route path="/organization" element={<OrganizationPanel />} />
            <Route path="/forms/:formId" element={<FormViewer />} />
            <Route path="/video-session" element={<VideoSession />} />
            <Route path="/waiting-room" element={<WaitingRoom />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
