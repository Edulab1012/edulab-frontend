"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_URL } from "@/constants/baseurl";
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emergencyNumber: string;
  gender: string;
  teacher?: {
    firstName: string;
    lastName: string;
  };
  group?: {
    name: string;
  };
  grade?: {
    name: string;
  };
  img?: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  console.log(students);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch(
          "http://localhost:8000/api/v1/student/withStudents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          // Try to parse error as JSON, fallback to text if it fails
          const errorData = await res.json().catch(() => res.text());
          throw new Error(
            typeof errorData === "object"
              ? errorData.message || JSON.stringify(errorData)
              : errorData
          );
        }

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p className="p-10 text-center">⏳ Уншиж байна...</p>;
  if (error)
    return <p className="p-10 text-center text-red-500">❗ Алдаа: {error}</p>;

  return (
    <div className="px-10 py-10 w-full bg-gray-100">
      <div className="flex flex-col gap-10">
        <Card>
          <CardContent>
            <CardHeader className="text-2xl font-bold leading-7 text-center">
              Миний ангийн сурагчдын жагсаалт
            </CardHeader>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {students.map((student) => (
            <Card
              key={student.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p>И-мэйл: {student.email}</p>
                  <p>Утас: {student.phoneNumber}</p>
                  <p>Яаралтай холбоо: {student.emergencyNumber}</p>
                  {student.group && <p>Бүлэг: {student.group.name}</p>}
                  {student.grade && <p>Анги: {student.grade.name}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
