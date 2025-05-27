"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";
import { useEffect } from "react";
import { getUserAndPost } from "@/lib/CreateTestUser";
import { BASE_URL, LOCAL_BASE_URL } from "@/constants/baseurl";


export default function Layout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    console.log("🚀 StudentHomePage loaded");
    getUserAndPost(`${BASE_URL}auth/testUser`, "student")
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-screen h-screen bg-gray-200">

        {children}
      </main>
    </SidebarProvider>
  );
}
