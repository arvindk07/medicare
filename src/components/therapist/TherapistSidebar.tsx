
import { useState } from "react";
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
  Brain
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
  SidebarTrigger
} from "@/components/ui/sidebar";

interface TherapistSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const TherapistSidebar = ({ currentView, onViewChange }: TherapistSidebarProps) => {
  const isMobile = useIsMobile();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "calendar", label: "My Calendar", icon: Calendar },
    { id: "clients", label: "My Clients", icon: Users },
    { id: "sessions", label: "Sessions", icon: Clock },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "notes", label: "Session Notes", icon: FileText },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "profile", label: "My Profile", icon: User },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 px-4 py-6">
        <div className="flex items-center px-2">
          <div className="relative h-8 w-8 mr-2">
            <div className="h-full w-full rounded-full bg-blue-600 flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Therapist Portal</h2>
            <p className="text-sm text-muted-foreground">Dr. Michael Chen</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4">
        <nav className="grid gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              className={cn(
                "justify-start",
                currentView === item.id
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                  : ""
              )}
              onClick={() => onViewChange(item.id)}
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
