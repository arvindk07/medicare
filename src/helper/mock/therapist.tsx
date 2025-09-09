import {
  Calendar,
  Users,
  FileText,
  Settings,
  MessageSquare,
  BarChart3,
  User,
  LogOut,
  Home,
  Clock,
  DollarSign,
  Brain,
} from "lucide-react";

export const oraganizationMenus = [
  { id: "dashboard", label: "Dashboard", icon: Home, route: "/therapist" },
  {
    id: "calendar",
    label: "My Calendar",
    icon: Calendar,
    route: "/therapist/clients",
  },
  {
    id: "clients",
    label: "My Clients",
    icon: Users,
    route: "/therapist/patients",
  },
  {
    id: "sessions",
    label: "Sessions",
    icon: Clock,
    route: "/therapist/sessions",
  },
  // {
  //   id: "appointments",
  //   label: "Appointments",
  //   icon: Calendar,
  //   route: "/therapist/appointments",
  // },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    route: "/therapist/messages",
  },
  {
    id: "notes",
    label: "Session Notes",
    icon: FileText,
    route: "/therapist/notes",
  },
  {
    id: "earnings",
    label: "Earnings",
    icon: DollarSign,
    route: "/therapist/earnings",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    route: "/therapist/analytics",
  },
  {
    id: "profile",
    label: "My Profile",
    icon: User,
    route: "/therapist/profile",
  },
];
