
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  Building2, 
  Users, 
  MapPin, 
  UserCheck, 
  Workflow, 
  Shield, 
  Globe, 
  BarChart3, 
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  Database,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MasterSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const MasterSidebar = ({ currentView, onViewChange }: MasterSidebarProps) => {
  console.log("MasterSidebar - current view:", currentView);
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "venues", label: "Venues", icon: MapPin },
    { id: "therapists", label: "Therapists", icon: UserCheck },
    { id: "users", label: "Users", icon: Users },
    { id: "roles", label: "Roles & Permissions", icon: Shield },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "crm", label: "CRM & Website", icon: Globe },
  ];

  const onboardingItems = [
    { id: "onboarding", label: "Flow Overview", icon: Workflow },
    { id: "onboarding-crud", label: "Manage Records", icon: Database },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">Master Panel</h2>
            <p className="text-sm text-muted-foreground">System Administration</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentView === item.id}
                    onClick={() => {
                      console.log("MasterSidebar - menu item clicked:", item.id);
                      onViewChange(item.id);
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Onboarding</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {onboardingItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentView === item.id}
                    onClick={() => {
                      console.log("MasterSidebar - onboarding item clicked:", item.id);
                      onViewChange(item.id);
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Master Admin</p>
            <p className="text-xs text-muted-foreground">admin@master.com</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
