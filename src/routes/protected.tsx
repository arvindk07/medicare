import { NotFound } from "../modules/misc";
import { lazyImport } from "@/helper/lazyImport";

const { MasterPanelRoutes }: any = lazyImport(
  () => import("../modules/master"),
  "MasterPanelRoutes"
);
const { TherapistPanelRoutes }: any = lazyImport(
  () => import("../modules/therapist"),
  "TherapistPanelRoutes"
);
const { PatientPanelRoutes }: any = lazyImport(
  () => import("../modules/patient"),
  "PatientPanelRoutes"
);
const { OrganizationPanelRoutes }: any = lazyImport(
  () => import("../modules/organization"),
  "OrganizationPanelRoutes"
);

export const protectedMasterRoutes = [
  { path: "/master-panel/*", element: <MasterPanelRoutes /> },
  { path: "*", element: <NotFound /> },
];

export const protectedTherapistRoutes = [
  { path: "/therapist/*", element: <TherapistPanelRoutes /> },
  { path: "*", element: <NotFound /> },
];

export const protectedPatientRoutes = [
  { path: "/patient/*", element: <PatientPanelRoutes /> },
  { path: "*", element: <NotFound /> },
];

export const protectedOrganizationRoutes = [
  { path: "/organization/*", element: <OrganizationPanelRoutes /> },
  { path: "*", element: <NotFound /> },
];
