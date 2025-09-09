import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, User } from "lucide-react";
import { clearNeurowelUserInfo } from "@/helper/storage";
import { masterMenus, masterOnboardingMenus } from "@/helper/mock/master";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const AppSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearNeurowelUserInfo();
    navigate("/auth/master-login");
    toast.success("Logged out successfully");
  };

  const logo_icon = "/images/icons/neurowel_icon.svg";

  const [collapsed, setCollapsed] = useState(false);

  const isActive = (route: string) => location.pathname === route;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2 pb-5 border-b border-gray-200">
          <div className="w-16 h-16 shadow-xl border-2 border-gray-200 flex items-center justify-center p-1 rounded-full">
            <img src={logo_icon} alt="" />
          </div>
          <div>
            <h2 className="font-semibold">Master Panel</h2>
            <p className="text-sm text-muted-foreground">
              System Administration
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {masterMenus.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Button
                    key={item.id}
                    variant={"ghost"}
                    className={cn(
                      "justify-start w-full",
                      isActive(item.route) &&
                        "bg-purple-600 text-white hover:bg-purple-700 hover:text-white"
                    )}
                    onClick={() => navigate(item.route)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {!collapsed && <span>{item.label}</span>}
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Onboarding</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {masterOnboardingMenus.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      navigate(item.route);
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
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
