"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

export default function ClassStudentsPage({
  params,
}: {
  params: { classId: string };
}) {
  const { classId } = params;
  const router = useRouter();
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}class/${classId}/students`
        );
        setClassName(response.data.className);
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 md:ml-64 mt-[100px]">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Буцах
      </button>

      <h1 className="text-2xl font-bold mb-4">Анги: {className}</h1>
      <h2 className="text-xl font-semibold mb-4">Сурагчид</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="py-2 px-4 border dark:border-gray-600">Нэр</th>
              <th className="py-2 px-4 border dark:border-gray-600">Имэйл</th>
              <th className="py-2 px-4 border dark:border-gray-600">Утас</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-2 px-4 border dark:border-gray-600">
                  {student.firstName} {student.lastName}
                </td>
                <td className="py-2 px-4 border dark:border-gray-600">
                  {student.email || "-"}
                </td>
                <td className="py-2 px-4 border dark:border-gray-600">
                  {student.phoneNumber || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
