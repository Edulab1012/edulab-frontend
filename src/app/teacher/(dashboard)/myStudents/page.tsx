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
          {students.map((student, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-gray-200 bg-white"
            >
              <CardContent className="flex flex-col items-center p-5 text-center space-y-4">
                {/* Avatar */}
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

                {/* Parent Info */}
                {/* <div className="w-full text-left border-t pt-3 text-sm text-gray-600">
                  <div className="font-medium text-gray-700 mb-1">
                    👨‍👩‍👧 Эцэг эхийн мэдээлэл:
                  </div>
                  <p>Нэр: {student}</p>
                  <p>Утас: {student.parent.phone}</p>
                  <p>Имэйл: {student.parent.email}</p>
                </div> */}

                {/* Emergency Button */}
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
