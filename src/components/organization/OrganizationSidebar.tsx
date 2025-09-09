import { useState } from "react";
import { 
  Home, 
  Users, 
  Shield, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building
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

interface OrganizationSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const OrganizationSidebar = ({ currentView, onViewChange }: OrganizationSidebarProps) => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "employees", label: "Employees", icon: Users },
    { id: "roles", label: "Role Management", icon: Shield },
    { id: "sessions", label: "Sessions", icon: Calendar },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
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
            <div className="h-full w-full rounded-full bg-purple-600 flex items-center justify-center">
              <Building className="h-4 w-4 text-white" />
            </div>
          </div>
          {!collapsed && (
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Organization Portal</h2>
              <p className="text-sm text-muted-foreground">Acme Corporation</p>
            </div>
          )}
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
                  ? "bg-purple-600 text-white hover:bg-purple-700 hover:text-white"
                  : ""
              )}
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {!collapsed && <span>{item.label}</span>}
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
            {!collapsed && <span>Log Out</span>}
          </Button>
          
          <SidebarTrigger className="h-9 w-9 mt-2">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </SidebarTrigger>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
