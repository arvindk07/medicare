
import { useState } from "react";
import { TherapistSidebar } from "@/components/therapist/TherapistSidebar";
import { TherapistDashboard } from "@/components/therapist/TherapistDashboard";
import { TherapistPatients } from "@/components/therapist/TherapistPatients";
import { TherapistAppointments } from "@/components/therapist/TherapistAppointments";
import { TherapistMessages } from "@/components/therapist/TherapistMessages";
import { TherapistNotes } from "@/components/therapist/TherapistNotes";
import { TherapistProfile } from "@/components/therapist/TherapistProfile";
import { TherapistAnalytics } from "@/components/therapist/TherapistAnalytics";
import { TherapistCalendar } from "@/components/therapist/TherapistCalendar";
import { TherapistClients } from "@/components/therapist/TherapistClients";
import { TherapistSessions } from "@/components/therapist/TherapistSessions";
import { TherapistEarnings } from "@/components/therapist/TherapistEarnings";
import { SidebarProvider } from "@/components/ui/sidebar";

const TherapistPanel = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <TherapistDashboard userRole="therapist" />;
      case "calendar":
        return <TherapistCalendar />;
      case "clients":
        return <TherapistClients />;
      case "patients":
        return <TherapistPatients />;
      case "sessions":
        return <TherapistSessions userRole="therapist" />;
      case "appointments":
        return <TherapistAppointments />;
      case "messages":
        return <TherapistMessages />;
      case "notes":
        return <TherapistNotes />;
      case "earnings":
        return <TherapistEarnings />;
      case "profile":
        return <TherapistProfile />;
      case "analytics":
        return <TherapistAnalytics />;
      default:
        return <TherapistDashboard userRole="therapist" />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <TherapistSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TherapistPanel;
