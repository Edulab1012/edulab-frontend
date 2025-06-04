'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { supabase } from "@/lib/supabase";
import { getUserAndPost } from "@/lib/googleUserData";
import { BASE_URL } from "@/constants/baseurl";

export default function Layout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    console.log("🚀 StudentHomePage loaded");

    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log(user);
    };

    fetchUser();
    const classId = localStorage.getItem("classId")
    getUserAndPost(`${BASE_URL}auth/testUser`, "student", classId);
  }, [])


  const router = useRouter()

  useEffect(() => {
    // const studentId = localStorage.getItem("studentId");
    // if (!studentId) {
    //   router.push("/login");
    // }
    // const token = localStorage.getItem("token");
    // if (token) {
    //   const decoded = jwtDecode(token);
    //   console.log(decoded);
    // }
  }, [router]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen pt-18">{children}</main>
    </SidebarProvider>
  );
}
