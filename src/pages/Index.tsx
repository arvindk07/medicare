
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { UserManagement } from "@/components/admin/UserManagement";
import { TherapistManagement } from "@/components/admin/TherapistManagement";
import { ContentModeration } from "@/components/admin/ContentModeration";
import { SystemSettings } from "@/components/admin/SystemSettings";
import { Analytics } from "@/components/admin/Analytics";
import { SupportTickets } from "@/components/admin/SupportTickets";
import { MasterPanel } from "@/components/master/MasterPanel";
import { RoleSelector } from "@/components/admin/RoleSelector";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PatientDashboard } from "@/components/patient/PatientDashboard";
import { TherapistDashboard } from "@/components/therapist/TherapistDashboard";
import { MasterDashboard } from "@/components/master/MasterDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [userRole, setUserRole] = useState<"admin" | "therapist" | "master" | "patient" | null>(null);

  if (!userRole) {
    return <RoleSelector onRoleSelect={setUserRole} />;
  }

  const renderContent = () => {
    // Always show the dashboard as the default view
    if (currentView === "dashboard") {
      if (userRole === "admin") {
        return <DashboardOverview userRole={userRole} />;
      } else if (userRole === "therapist") {
        return <TherapistDashboard userRole={userRole} />;
      } else if (userRole === "patient") {
        return <PatientDashboard userRole={userRole} />;
      } else if (userRole === "master") {
        return <MasterDashboard userRole={userRole} />;
      }
    }

    // Master panel views (merged with admin features)
    if (userRole === "master") {
      switch (currentView) {
        case "users":
          return <MasterPanel userRole={userRole} currentView="users" />;
        case "therapists":
          return <MasterPanel userRole={userRole} currentView="therapists" />;
        case "support":
          return <MasterPanel userRole={userRole} currentView="support" />;
        case "content":
          return <ContentModeration userRole={userRole} />;
        case "settings":
          return <SystemSettings userRole={userRole} />;
        case "reports":
          return <Analytics userRole={userRole} />;
        default:
          return <MasterDashboard userRole={userRole} />;
      }
    }

    // Admin specific views
    if (userRole === "admin") {
      switch (currentView) {
        case "users":
          return <UserManagement userRole={userRole} />;
        case "therapists":
          return <TherapistManagement userRole={userRole} />;
        case "content":
          return <ContentModeration userRole={userRole} />;
        case "settings":
          return <SystemSettings userRole={userRole} />;
        case "reports":
          return <Analytics userRole={userRole} />;
        case "support":
          return <SupportTickets userRole={userRole} />;
        default:
          return <DashboardOverview userRole={userRole} />;
      }
    }

    // Therapist specific views
    if (userRole === "therapist") {
      return <TherapistDashboard userRole={userRole} />;
    }

    // Patient specific views
    if (userRole === "patient") {
      return <PatientDashboard userRole={userRole} />;
    }

    // Fallback
    return <DashboardOverview userRole={userRole} />;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <AdminSidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          userRole={userRole}
          onRoleChange={() => setUserRole(null)}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
