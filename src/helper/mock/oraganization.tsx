import {
  Home,
  Users,
  Shield,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
} from "lucide-react";

export const organizationMenus = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    route: "/organization",
  },
  {
    id: "employees",
    label: "Employees",
    icon: Users,
    route: "/organization/employees",
  },
  {
    id: "roles",
    label: "Role Management",
    icon: Shield,
    route: "/organization/roles",
  },
  {
    id: "sessions",
    label: "Sessions",
    icon: Calendar,
    route: "/organization/sessions",
  },
  {
    id: "billing",
    label: "Billing",
    icon: DollarSign,
    route: "/organization/billing",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    route: "/organization/reports",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    route: "/organization/settings",
  },
];
