
import { useState } from "react";
import { PatientSidebar } from "@/components/patient/PatientSidebar";
import { PatientDashboard } from "@/components/patient/PatientDashboard";
import { PatientFindTherapists } from "@/components/patient/PatientFindTherapists";
import { PatientAppointments } from "@/components/patient/PatientAppointments";
import { PatientMessages } from "@/components/patient/PatientMessages";
import { PatientJournal } from "@/components/patient/PatientJournal";
import { PatientProfile } from "@/components/patient/PatientProfile";
import { PatientProgress } from "@/components/patient/PatientProgress";
import { PatientResources } from "@/components/patient/PatientResources";
import { PatientMoodTracker } from "@/components/patient/PatientMoodTracker";
import { PatientBilling } from "@/components/patient/PatientBilling";
import { PatientSupport } from "@/components/patient/PatientSupport";
import { SidebarProvider } from "@/components/ui/sidebar";

const PatientPanel = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <PatientDashboard userRole="patient" />;
      case "find-therapists":
        return <PatientFindTherapists />;
      case "appointments":
        return <PatientAppointments userRole="patient" />;
      case "messages":
        return <PatientMessages />;
      case "journal":
        return <PatientJournal />;
      case "profile":
        return <PatientProfile />;
      case "progress":
        return <PatientProgress />;
      case "resources":
        return <PatientResources />;
      case "mood-tracker":
        return <PatientMoodTracker />;
      case "billing":
        return <PatientBilling />;
      case "support":
        return <PatientSupport />;
      default:
        return <PatientDashboard userRole="patient" />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <PatientSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PatientPanel;
