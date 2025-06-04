'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

  const router = useRouter()

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      router.push("/login");
    }
  }, [router]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen pt-18">{children}</main>
    </SidebarProvider>
  );
}
