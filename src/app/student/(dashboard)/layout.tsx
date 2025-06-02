import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>

      <AppSidebar />
      <main className="w-screen h-screen pt-20">{children}</main>
    </SidebarProvider>
  );
}
