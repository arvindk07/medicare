import { useState } from "react";
import { OrganizationSidebar } from "@/components/organization/OrganizationSidebar";
import { OrganizationDashboard } from "@/components/organization/OrganizationDashboard";
import { OrganizationEmployees } from "@/components/organization/OrganizationEmployees";
import { OrganizationRoles } from "@/components/organization/OrganizationRoles";
import { OrganizationSessions } from "@/components/organization/OrganizationSessions";
import { OrganizationBilling } from "@/components/organization/OrganizationBilling";
import { OrganizationReports } from "@/components/organization/OrganizationReports";
import { OrganizationSettings } from "@/components/organization/OrganizationSettings";
import { SidebarProvider } from "@/components/ui/sidebar";

const OrganizationPanel = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <OrganizationDashboard />;
      case "employees":
        return <OrganizationEmployees />;
      case "roles":
        return <OrganizationRoles />;
      case "sessions":
        return <OrganizationSessions />;
      case "billing":
        return <OrganizationBilling />;
      case "reports":
        return <OrganizationReports />;
      case "settings":
        return <OrganizationSettings />;
      default:
        return <OrganizationDashboard />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 to-pink-100">
        <OrganizationSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </SidebarProvider>
  );
};

export default OrganizationPanel;
