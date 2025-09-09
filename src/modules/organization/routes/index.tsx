import { NotFound } from "@/modules/misc";
import { Route, Routes } from "react-router-dom";
import OrganizationPanel from "../pages/OrganizationPanel";
import { OrganizationEmployees } from "../pages/OrganizationEmployees";
import { OrganizationRoles } from "../pages/OrganizationRoles";
import { OrganizationSessions } from "../pages/OrganizationSessions";
import { OrganizationBilling } from "../pages/OrganizationBilling";
import { OrganizationReports } from "../pages/OrganizationReports";
import { OrganizationSettings } from "../pages/OrganizationSettings";
import { OrganizationDashboard } from "../pages/OrganizationDashboard";

export const OrganizationPanelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OrganizationDashboard />} />
      <Route path="/employees" element={<OrganizationEmployees />} />
      <Route path="/roles" element={<OrganizationRoles />} />
      <Route path="/sessions" element={<OrganizationSessions />} />
      <Route path="/billing" element={<OrganizationBilling />} />
      <Route path="/reports" element={<OrganizationReports />} />
      <Route path="/settings" element={<OrganizationSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
