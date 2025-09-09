import { NotFound } from "@/modules/misc";
import { Route, Routes } from "react-router-dom";
import { TherapistNotes } from "../pages/TherapistNotes";
import { TherapistProfile } from "../pages/TherapistProfile";
import { TherapistClients } from "../pages/TherapistClients";
import { TherapistEarnings } from "../pages/TherapistEarnings";
import { TherapistMessages } from "../pages/TherapistMessages";
import { TherapistSessions } from "../pages/TherapistSessions";
import { TherapistCalendar } from "../pages/TherapistCalendar";
import { TherapistPatients } from "../pages/TherapistPatients";
import { TherapistAnalytics } from "../pages/TherapistAnalytics";
import { TherapistAppointments } from "../pages/TherapistAppointments";
import { TherapistDashboard } from "../pages/TherapistDashboard";
import FormViewer from "@/pages/FormViewer";
import VideoSession from "@/pages/VideoSession";
import WaitingRoom from "@/pages/WaitingRoom";

export const TherapistPanelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TherapistDashboard userRole="therapist" />} />
      <Route path="/calendar" element={<TherapistCalendar />} />
      <Route path="/clients" element={<TherapistClients />} />
      <Route path="/patients" element={<TherapistPatients />} />
      <Route
        path="/sessions"
        element={<TherapistSessions userRole="therapist" />}
      />
      {/* <Route path="/appointments" element={<TherapistAppointments />} /> */}
      <Route path="/messages" element={<TherapistMessages />} />
      <Route path="/notes" element={<TherapistNotes />} />
      <Route path="/earnings" element={<TherapistEarnings />} />
      <Route path="/profile" element={<TherapistProfile />} />
      <Route path="/analytics" element={<TherapistAnalytics />} />
      <Route path="/forms/:formId" element={<FormViewer />} />
      <Route path="/sessions/:sessionsId" element={<VideoSession />} />
      <Route path="/waiting-room" element={<WaitingRoom />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
