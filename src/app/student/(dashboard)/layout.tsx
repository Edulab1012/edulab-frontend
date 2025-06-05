"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserAndPost } from "@/lib/googleUserData";
import { BASE_URL } from "@/constants/baseurl";
import { toast } from "sonner";
import axios from "axios";
import { useStudentStore } from "@/hooks/useStudentStore";
import supabase from "@/lib/supabase";


export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setStudent = useStudentStore((state) => state.setStudent);

  useEffect(() => {
    console.log("🚀 Student Layout mounted");

    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.log("❌ Supabase auth error:", error);
        toast("Нэвтрэхэд алдаа гарлаа", { duration: 3000 });
        router.push("/login");
      }
    };

    const fetchStudentData = async () => {
      const studentId = localStorage.getItem("studentId");
      const classId = localStorage.getItem("classId");

      try {
        getUserAndPost(`${BASE_URL}auth/testUser`, "student", classId);

      } catch (err) {
        console.log("❌ Error fetching student:", err);

      }
    };

    fetchUser();
    fetchStudentData()

    setTimeout(() => {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        toast.dismiss("Бүртгэлтэй байна нэвтрэнэ үү");
        router.push("/login")
      }
    }, 5000);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen pt-18">{children}</main>
    </SidebarProvider>
  );
}