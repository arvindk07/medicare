import { useState } from "react";
import {
  Calendar,
  FileText,
  MessageSquare,
  User,
  Activity,
  BookOpen,
  LogOut,
  Home,
  Search,
  Heart,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { clearNeurowelUserInfo } from "@/helper/storage";

interface PatientSidebarProps {}

export const PatientSidebar = ({}: PatientSidebarProps) => {
  const isMobile = useIsMobile();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, route: "/patient" },
    {
      id: "find-therapists",
      label: "Find Therapists",
      icon: Search,
      route: "/patient/find-therapists",
    },
    {
      id: "appointments",
      label: "My Sessions",
      icon: Calendar,
      route: "/patient/appointments",
    },
    {
      id: "journal",
      label: "Journal",
      icon: FileText,
      route: "/patient/journal",
    },
    {
      id: "resources",
      label: "Resources",
      icon: BookOpen,
      route: "/patient/resources",
    },
    {
      id: "mood-tracker",
      label: "Mood Tracker",
      icon: Heart,
      route: "/patient/mood-tracker",
    },
    {
      id: "billing",
      label: "Billing",
      icon: DollarSign,
      route: "/patient/billing",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      route: "/patient/messages",
    },
    {
      id: "progress",
      label: "My Progress",
      icon: Activity,
      route: "/patient/progress",
    },
    {
      id: "support",
      label: "Support",
      icon: HelpCircle,
      route: "/patient/support",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      route: "/patient/profile",
    },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    clearNeurowelUserInfo();
    navigate("/auth/patient-login");
    toast.success("Logged out successfully");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 px-4 py-6">
        <div className="flex items-center px-2">
          <div className="relative h-8 w-8 mr-2">
            <div className="h-full w-full rounded-full bg-green-600 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Patient Portal</h2>
            <p className="text-sm text-muted-foreground">Sarah Johnson</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <nav className="grid gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              // variant={currentView === item.id ? "default" : "ghost"}
              variant={"ghost"}
              className={cn(
                "justify-start"
                // currentView === item.id
                //   ? "bg-green-600 text-white hover:bg-green-700 hover:text-white"
                //   : ""
              )}
              onClick={() => navigate(item.route)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-border/40">
        <div className="grid gap-1">
          <Button
            variant="outline"
            className="justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log Out</span>
          </Button>

          <SidebarTrigger className="h-9 w-9 mt-2">
            <span className="sr-only">Toggle Sidebar</span>
          </SidebarTrigger>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
