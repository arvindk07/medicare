import { useState } from "react";
import { MasterSidebar } from "@/components/master/MasterSidebar";
import { MasterDashboard } from "@/components/master/MasterDashboard";
import { CompaniesManagement } from "@/components/master/CompaniesManagement";
import { VenuesManagement } from "@/components/master/VenuesManagement";
import { TherapistsManagement } from "@/components/master/TherapistsManagement";
import { UsersManagement } from "@/components/master/UsersManagement";
import { OnboardingFlow } from "@/components/master/OnboardingFlow";
import { OnboardingCRUD } from "@/components/master/OnboardingCRUD";
import { RolesPermissions } from "@/components/master/RolesPermissions";
import { CRMManagement } from "@/components/master/CRMManagement";
import { AnalyticsDashboard } from "@/components/master/AnalyticsDashboard";
import { AuditLogs } from "@/components/shared/AuditLogs";
import { SidebarProvider } from "@/components/ui/sidebar";

const MasterPanel = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  console.log("MasterPanel - current view:", currentView);

  const renderContent = () => {
    console.log("MasterPanel - rendering content for view:", currentView);

    switch (currentView) {
      case "companies":
        console.log("Rendering CompaniesManagement");
        return <CompaniesManagement />;
      case "venues":
        console.log("Rendering VenuesManagement");
        return <VenuesManagement />;
      case "therapists":
        console.log("Rendering TherapistsManagement");
        return <TherapistsManagement />;
      case "users":
        console.log("Rendering UsersManagement");
        return <UsersManagement />;
      case "onboarding":
        console.log("Rendering OnboardingFlow");
        return <OnboardingFlow />;
      case "onboarding-crud":
        console.log("Rendering OnboardingCRUD");
        return <OnboardingCRUD />;
      case "roles":
        console.log("Rendering RolesPermissions");
        return <RolesPermissions />;
      case "crm":
        console.log("Rendering CRMManagement");
        return <CRMManagement />;
      case "analytics":
        console.log("Rendering AnalyticsDashboard");
        return <AnalyticsDashboard />;
      case "audit-logs":
        console.log("Rendering AuditLogs");
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                System Audit Logs
              </h1>
              <p className="text-gray-600">
                Monitor all system activities and user actions
              </p>
            </div>
            <AuditLogs userRole="master" />
          </div>
        );
      default:
        console.log("Rendering MasterDashboard (default)");
        return <MasterDashboard userRole="master" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 to-indigo-100">
        <MasterSidebar
          currentView={currentView}
          onViewChange={(newView) => {
            console.log(
              "MasterPanel - view changing from",
              currentView,
              "to",
              newView
            );
            setCurrentView(newView);
          }}
        />
        <main className="flex-1 p-3 md:p-6 overflow-auto">
          <div className="max-w-full">{renderContent()}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MasterPanel;
