import { NotFound } from "@/modules/misc";
import { Route, Routes } from "react-router-dom";
import { Organization } from "../pages/Organization";
import { CRMManagement } from "../pages/CRMManagement";
import { MasterDashboard } from "../pages/MasterDashboard";
import { UsersManagement } from "../pages/UsersManagement";
import { RolesPermissions } from "../pages/RolesPermissions";
import { VenuesManagement } from "../pages/VenuesManagement";
import { AnalyticsDashboard } from "../pages/AnalyticsDashboard";
import { TherapistsManagement } from "../pages/TherapistsManagement";
import { AppLayout } from "@/components/layouts/app-layout/AppLayout";
import { AddOrganization } from "../pages/organization/add-organization/AddOrganization";
import { OrganizationDetails } from "../pages/organization/organization-details/OrganizationDetails";
import { UpdateTherapist } from "../pages/therapist/update-therapist/UpdateTherapist";
import { TherapistDetails } from "../pages/therapist/therapist-details/TherapistDetails";
import VenusesDetails from "../pages/venues/venues-details/VenusesDetails";
import { UpdateVenues } from "../pages/venues/update-vanues/UpdateVenues";
import { UpdateUser } from "../pages/user/update-user/UpdateUser";
import { UserDetails } from "../pages/user/user-details/UserDetails";
import OnBoarding from "../pages/onboarding/OnBoarding";

export const MasterPanelRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<MasterDashboard />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/organization/update/:id" element={<AddOrganization />} />
        <Route
          path="/organization/details/:id"
          element={<OrganizationDetails />}
        />
        <Route path="/venues" element={<VenuesManagement />} />
        <Route path="/venues/update/:id" element={<UpdateVenues />} />
        <Route path="/venues/details/:id" element={<VenusesDetails />} />
        <Route path="/therapists/update/:id" element={<UpdateTherapist />} />
        <Route path="/therapists/details/:id" element={<TherapistDetails />} />
        <Route path="/therapists" element={<TherapistsManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/users/details/:id" element={<UserDetails />} />
        <Route path="/roles" element={<RolesPermissions />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/crm" element={<CRMManagement />} />
        <Route path="/flow-overview" element={<OnBoarding />} />
        <Route path="/onboarding" element={<UsersManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};
