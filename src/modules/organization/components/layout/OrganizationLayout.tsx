import { SidebarProvider } from "@/components/ui/sidebar";
import { OrganizationSidebar } from "../sidebar/OrganizationSidebar";

interface AppLayoutProps {
  children: any;
}

export const OrganizationLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 to-indigo-100">
        <OrganizationSidebar />
        <main className="flex-1 p-3 md:p-6 overflow-auto">
          <div className="max-w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};
