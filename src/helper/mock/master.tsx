import {
  LayoutDashboard,
  Building2,
  MapPin,
  UserCheck,
  Users,
  Shield,
  BarChart3,
  Globe,
  Workflow,
  Database,
} from "lucide-react";

export const masterMenus = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/master-panel",
  },
  {
    id: "organization",
    label: "Organization",
    icon: Building2,
    route: "/master-panel/organization",
  },
  {
    id: "venues",
    label: "Venues",
    icon: MapPin,
    route: "/master-panel/venues",
  },
  {
    id: "therapists",
    label: "Therapists",
    icon: UserCheck,
    route: "/master-panel/therapists",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    route: "/master-panel/users",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    icon: Shield,
    route: "/master-panel/roles",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    route: "/master-panel/analytics",
  },
  {
    id: "crm",
    label: "CRM & Website",
    icon: Globe,
    route: "/master-panel/crm",
  },
];

export const masterOnboardingMenus = [
  {
    id: "onboarding",
    label: "Flow Overview",
    icon: Workflow,
    route: "/master-panel/flow-overview",
  },
  {
    id: "onboarding-crud",
    label: "Manage Records",
    icon: Database,
    route: "/master-panel/onboarding",
  },
];
