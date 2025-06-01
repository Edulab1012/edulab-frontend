"use client";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/constants/baseurl";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddClass from "./allclass/AddClass";

interface Class {
  id: string;
  name: string;
  promoCode?: string;
  createdAt: string;
  students: Student[];
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

export default function TeacherDashboard() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const teacherId = localStorage.getItem("teacherId");
  console.log("classes", classes);
  useEffect(() => {
    if (!teacherId) {
      router.push("/login");
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}class/teacher/${teacherId}`
        );
        setClasses(response.data);
      } catch (err) {
        setError("Ангиудыг авахад алдаа гарлаа");
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [teacherId, router]);

  const handleClassClick = (classId: string) => {
    router.push(`/teacher/class/${classId}/students`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 md:ml-64">
      <div className="flex flex-col gap-4 mt-[100px]">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">
          Миний ангиуд
        </h1>
        <div className="flex flex-col space-x-2">
          <AddClass />
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Анги олдсонгүй. Шинэ анги үүсгэх үү?
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="border p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition-shadow bg-white dark:bg-gray-800"
              onClick={() => handleClassClick(cls.id)}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {cls.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Үүссэн: {new Date(cls.createdAt).toLocaleDateString()}
              </p>
              {cls.promoCode && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Код: {cls.promoCode}
                </p>
              )}
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Сурагчид: {cls.students?.length || 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
