import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./teacher-sidebar";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {




  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex flex-col  bg-[#8ED6F0] dark:bg-gradient-to-br dark:from-[#2C3A4A] dark:to-[#1A2636]  w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
