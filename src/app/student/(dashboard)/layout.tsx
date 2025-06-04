"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        console.log("🪪 Декодлогдсон токен:", decoded);
      } catch (error) {
        console.error("🔴 Токен декод хийхэд алдаа гарлаа:", error);
      }
    }

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
