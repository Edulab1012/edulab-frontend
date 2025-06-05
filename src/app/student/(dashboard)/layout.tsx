'use client'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./student-sidebar";


import { BASE_URL } from "@/constants/baseurl";
import axios from "axios";
import { useEffect } from "react";
import { useStudentStore } from "@/hooks/useStudentStore";


export default function Layout({ children }: { children: React.ReactNode }) {

  const setStudent = useStudentStore((state) => state.setStudent);

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const studentId = localStorage.getItem("studentId");
        if (!studentId) return;

        const res = await axios.get(`${BASE_URL}student/${studentId}`);
        setStudent(res.data); // ✅ Zustand-д хадгалж байна
        console.log("🎉 Student stored in Zustand:", res.data);
      } catch (err) {
        console.error("❌ Failed to fetch student:", err);
      }
    };

    getStudentData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen pt-18">{children}</main>
    </SidebarProvider>
  );
}