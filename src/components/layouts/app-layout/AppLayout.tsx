import { AppSidebar } from "../sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getNeurowelLanguage } from "@/helper/storage";
import { languages } from "../../../localisation/HeaderFormJSON";
import { useTranslation } from "react-i18next";

interface AppLayoutProps {
  children: any;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const neurowel_globe = "/images/icons/neurowel_globe.svg";

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(neurowel_globe);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("hello");
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  // const route = window.location.href.split("app/")[1].split("/")[0];

  useEffect(() => {
    const currentLanguage = getNeurowelLanguage();
    console.log(currentLanguage);
    if (currentLanguage) {
      const language = languages.find(
        (item: any) => item?.store === currentLanguage
      );
      if (language && language?.label) {
        const lng_img = language.icon;
        setSelectedIcon(lng_img);
        console.log(language);
        setSelectedLanguage(language?.label);
        // i18n.changeLanguage(language?.store);
      }
    }
  }, []);

  const handleDropdownOpenChange = (open: boolean) => {
    if (!open && buttonRef.current) {
      buttonRef.current.blur(); // remove focus from button
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 to-indigo-100">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="bg-white py-3 flex justify-end px-6 border-b border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-[10rem] outline-none border-none flex justify-center items-center"
                >
                  <img src={neurowel_globe} alt="sdfsh" />
                  English
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Master Admin</p>
                <p className="text-xs text-muted-foreground">
                  admin@master.com
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-full  p-3 md:p-6 ">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};
