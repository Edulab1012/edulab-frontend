import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./teacher-sidebar";
import SectionHeader from "./home/section-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SectionHeader></SectionHeader>
      <main className="flex flex-col bg-teal-400 w-full">{children}</main>
    </SidebarProvider>
  );
}
