
import { 
  Users, Brain, BarChart3, Settings, LogOut, Shield, Crown, Home,
  Calendar, Book, MessageSquare, FileText, Bell, Clock, Headphones,
  User, Search, CheckCheck, CreditCard, Ticket
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: "admin" | "therapist" | "master" | "patient";
  onRoleChange: () => void;
}

export const AdminSidebar = ({ currentView, onViewChange, userRole, onRoleChange }: AdminSidebarProps) => {
  const getMenuItems = () => {
    // Base items for all roles
    const baseItems = [
      { id: "dashboard", title: "Dashboard", icon: Home },
    ];

    // Patient/User role items
    if (userRole === "patient") {
      return [
        ...baseItems,
        { id: "therapists", title: "Find Therapists", icon: Search },
        { id: "sessions", title: "My Sessions", icon: Calendar },
        { id: "journal", title: "Journal", icon: Book },
        { id: "resources", title: "Resources", icon: FileText },
        { id: "mood", title: "Mood Tracker", icon: BarChart3 },
        { id: "billing", title: "Billing", icon: CreditCard },
        { id: "support", title: "Support", icon: Ticket },
      ];
    }

    // Therapist role items
    if (userRole === "therapist") {
      return [
        ...baseItems,
        { id: "calendar", title: "My Calendar", icon: Calendar },
        { id: "clients", title: "My Clients", icon: Users },
        { id: "sessions", title: "Sessions", icon: Headphones },
        { id: "notes", title: "Session Notes", icon: FileText },
        { id: "messages", title: "Messages", icon: MessageSquare },
        { id: "earnings", title: "Earnings", icon: CreditCard },
      ];
    }

    // Admin role items
    if (userRole === "admin") {
      return [
        ...baseItems,
        { id: "users", title: "User Management", icon: Users },
        { id: "therapists", title: "Therapist Management", icon: Brain },
        { id: "content", title: "Content Moderation", icon: FileText },
        { id: "settings", title: "System Settings", icon: Settings },
        { id: "reports", title: "Analytics", icon: BarChart3 },
        { id: "support", title: "Support Tickets", icon: Ticket },
      ];
    }

    // Master (B2B) role items
    if (userRole === "master") {
      return [
        ...baseItems,
        { id: "organizations", title: "Organizations", icon: Users },
        { id: "groups", title: "Group Sessions", icon: Users },
        { id: "reports", title: "Analytics & Reports", icon: BarChart3 },
        { id: "billing", title: "Billing & Invoicing", icon: CreditCard },
        { id: "customization", title: "Customization", icon: Settings },
        { id: "support", title: "Enterprise Support", icon: Ticket },
      ];
    }

    return baseItems;
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case "admin": return Shield;
      case "therapist": return Brain;
      case "patient": return User;
      case "master": return Crown;
    }
  };

  const getRoleName = () => {
    switch (userRole) {
      case "admin": return "Admin Panel";
      case "therapist": return "Therapist Portal";
      case "patient": return "Patient Portal";
      case "master": return "Master Panel";
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <RoleIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{getRoleName()}</h2>
            <p className="text-sm text-gray-500">Mental Health Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    isActive={currentView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={onRoleChange}
          className="w-full justify-start text-gray-600 hover:text-gray-900"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Switch Role
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
