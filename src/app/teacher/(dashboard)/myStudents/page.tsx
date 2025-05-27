"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Phone } from "lucide-react";
import Image from "next/image";
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
        console.log("GET HESEGIIN TOKEN");
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

  if (loading)
    return (
      <p className="p-10 ml-[60px]  mt-[5 0px] text-white">⏳ Уншиж байна...</p>
    );
  if (error)
    return <p className="p-10 text-center text-red-500">❗ Алдаа: {error}</p>;

  return (
    <div className="w-[1160px] ml-[100px] mt-[100px] h-full items-center justify-center">
      <div className="flex flex-col gap-10 pl-[30px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {students.map((student, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 rounded-2xl border border-gray-200 bg-white"
            >
              <CardContent className="flex flex-col items-center p-5 text-center space-y-4">
                <div className="w-28 h-28 relative">
                  <Image
                    src={"/em.jpg"}
                    alt={`${student.firstName}-profile`}
                    width={112}
                    height={112}
                    className="object-cover rounded-full border-4 border-white shadow"
                  />
                </div>

                {/* Student Info */}
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {student.firstName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Утас: {student.phoneNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    Имэйл: {student.email}
                  </div>
                </div>
                <div className="mt-4 w-full">
                  <button
                    onClick={() =>
                      (window.location.href = `tel:${student.emergencyNumber}`)
                    }
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-500 hover:text-white transition"
                  >
                    <Phone className="w-5 h-5" />
                    Яаралтай залгах
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
