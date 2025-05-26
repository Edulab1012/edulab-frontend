import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";
import SectionHeader from "@/app/student/(dashboard)/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SectionHeader></SectionHeader>
      <AppSidebar />

      <main className="w-screen h-screen bg-teal-400">{children}</main>
    </SidebarProvider>
  );
}
