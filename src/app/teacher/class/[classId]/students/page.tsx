"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";
import { motion } from "framer-motion";
import Image from "next/image";

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e1aa77]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 md:ml-64 mt-[100px]">
      <motion.button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-[#2C3A4A] text-white dark:bg-[#e1aa77] dark:text-[#2C3A4A] rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Image
          src="/myclass/back.png"
          width={16}
          height={16}
          alt="Back"
          className="dark:invert"
        />
        Буцах
      </motion.button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2C3A4A] dark:text-[#e1aa77] mb-2">
          {className}
        </h1>
        <div className="w-20 h-1 bg-[#e1aa77] dark:bg-[#2C3A4A] rounded-full"></div>
      </div>

      <div className="bg-white dark:bg-[#2C3A4A] rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-[#e1aa77]/20">
          <h2 className="text-xl font-semibold text-[#2C3A4A] dark:text-[#e1aa77] flex items-center gap-2">
            <Image
              src="/myclass/panda-bear.png"
              width={24}
              height={24}
              alt="Students"
              className="dark:invert"
            />
            Сурагчид ({students.length})
          </h2>
        </div>

        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Image
              src="/myclass"
              width={64}
              height={64}
              alt="No students"
              className="mx-auto mb-4 dark:invert"
            />
            Сурагч бүртгэгдээгүй байна
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f5f5] dark:bg-[#3a4a5a] text-left">
                  <th className="p-4 text-[#2C3A4A] dark:text-[#e1aa77] font-medium">
                    Сурагч
                  </th>
                  <th className="p-4 text-[#2C3A4A] dark:text-[#e1aa77] font-medium">
                    Имэйл
                  </th>
                  <th className="p-4 text-[#2C3A4A] dark:text-[#e1aa77] font-medium">
                    Утас
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    className={`border-b border-[#e1aa77]/10 ${
                      index % 2 === 0
                        ? "bg-white dark:bg-[#2C3A4A]"
                        : "bg-[#f9f9f9] dark:bg-[#3a4a5a]"
                    }`}
                    whileHover={{ backgroundColor: "rgba(225, 170, 119, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="p-4 text-[#2C3A4A] dark:text-white font-medium">
                      <Image
                        src="/myclass/panda.png"
                        width={40}
                        height={40}
                        alt="Actions"
                        className=""
                      />
                    </td>
                    <td className="p-4 text-white dark:text-gray-300">
                      {student.email || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-white dark:text-gray-300">
                      {student.phoneNumber || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        table {
          border-collapse: separate;
          border-spacing: 0;
        }
        th:first-child {
          border-top-left-radius: 0.5rem;
        }
        th:last-child {
          border-top-right-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}
