import { NotFound } from "@/modules/misc";
import { Route, Routes } from "react-router-dom";
import PatientPanel from "../pages/PatientPanel";
import { PatientJournal } from "../pages/PatientJournal";
import { PatientBilling } from "../pages/PatientBilling";
import { PatientProfile } from "../pages/PatientProfile";
import { PatientSupport } from "../pages/PatientSupport";
import { PatientMessages } from "../pages/PatientMessages";
import { PatientProgress } from "../pages/PatientProgress";
import { PatientResources } from "../pages/PatientResources";
import { PatientMoodTracker } from "../pages/PatientMoodTracker";
import { PatientAppointments } from "../pages/PatientAppointments";
import { PatientFindTherapists } from "../pages/PatientFindTherapists";
import { PatientDashboard } from "../pages/PatientDashboard";

export const PatientPanelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientDashboard userRole="patient" />} />
      <Route path="/find-therapists" element={<PatientFindTherapists />} />
      <Route
        path="/appointments"
        element={<PatientAppointments userRole="patient" />}
      />
      <Route path="/journal" element={<PatientJournal />} />
      <Route path="/resources" element={<PatientResources />} />
      <Route path="/mood-tracker" element={<PatientMoodTracker />} />
      <Route path="/billing" element={<PatientBilling />} />
      <Route path="/messages" element={<PatientMessages />} />
      <Route path="/progress" element={<PatientProgress />} />
      <Route path="/support" element={<PatientSupport />} />
      <Route path="/profile" element={<PatientProfile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
