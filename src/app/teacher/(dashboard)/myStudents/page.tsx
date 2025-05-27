"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emergencyNumber: string;
  img?: string;
  parent?: {
    name: string;
    phone: string;
    email: string;
  };
}
export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setIsLoading] = useState(true);
  console.log(students);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Suragch harah hesegiin token", token);
        if (!token) throw new Error("No token found");
        console.log("yes1");
        const res = await fetch(
          "https://dojoback.onrender.com/api/v1/student/withStudents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("yes2");
        console.log(res);
        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }
        console.log("yes3");
        const data = await res.json();
        setStudents(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);
  if (loading) return <p className="p-10 text-center">⏳ Уншиж байна...</p>;
  return (
    <div className="px-10 py-10 w-full bg-gray-100">
      <div className="flex flex-col gap-10">
        <Card>
          <CardContent>
            <CardHeader className="text-2xl font-bold leading-7 text-center">
              11А ангийн сурагчдын жагсаалт
            </CardHeader>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"></div>
      </div>
    </div>
  );
}
